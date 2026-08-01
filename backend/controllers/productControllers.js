import Product from '../models/productModel.js';
import { slugify } from '../utils/slugify.js';
import {
  uploadImageBuffer,
  destroyCloudinaryImage,
} from '../utils/cloudinaryUpload.js';

function parseBool(value, fallback = true) {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value === 'boolean') return value;
  return value === 'true' || value === '1';
}

function parseJsonField(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

async function resolveImage(file, fallbackUrl) {
  if (file) return uploadImageBuffer(file);
  return fallbackUrl || undefined;
}

async function replaceImage(previousUrl, file) {
  if (!file) return null;
  const nextUrl = await uploadImageBuffer(file);
  await destroyCloudinaryImage(previousUrl);
  return nextUrl;
}

/** GET /api/products */
export async function getProducts(req, res, next) {
  try {
    const {
      brand,
      gender,
      q,
      minPrice,
      maxPrice,
      onSale,
      inStock,
      sort = 'featured',
    } = req.query;

    const filter = {};
    const andConditions = [];

    if (brand) {
      const brands = String(brand)
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean);
      if (brands.length) {
        filter.brand = { $in: brands };
      }
    }

    if (gender) {
      const genders = String(gender)
        .split(',')
        .map((g) => g.trim().toLowerCase())
        .filter((g) => ['male', 'female', 'unisex'].includes(g));
      if (genders.length) {
        andConditions.push({
          $or: [
            { gender: { $in: genders } },
            { gender: 'unisex' },
            { gender: { $exists: false } },
          ],
        });
      }
    }

    if (q) {
      andConditions.push({
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { brand: { $regex: q, $options: 'i' } },
          { handle: { $regex: q, $options: 'i' } },
        ],
      });
    }

    if (andConditions.length) {
      filter.$and = andConditions;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (onSale === '1' || onSale === 'true') {
      filter.comparePrice = { $gt: 0 };
    }

    if (inStock === '1' || inStock === 'true') {
      filter.inStock = true;
    }

    let sortOption = { createdAt: -1 };
    switch (sort) {
      case 'price-asc':
        sortOption = { price: 1 };
        break;
      case 'price-desc':
        sortOption = { price: -1 };
        break;
      case 'name-asc':
        sortOption = { title: 1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const products = await Product.find(filter).sort(sortOption);
    res.json({ count: products.length, products });
  } catch (error) {
    next(error);
  }
}

/** GET /api/products/:id */
export async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const product =
      (await Product.findById(id).catch(() => null)) ||
      (await Product.findOne({ handle: id }));

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    next(error);
  }
}

/** POST /api/products */
export async function createProduct(req, res, next) {
  try {
    const {
      title,
      brand,
      gender,
      price,
      comparePrice,
      image: imageUrl,
      image2: image2Url,
      handle,
      inStock,
      badge,
      badgeType,
      variants,
      hasColors,
    } = req.body;

    const files = req.files || {};
    const image = await resolveImage(files.image?.[0], imageUrl);
    const image2 = (await resolveImage(files.image2?.[0], image2Url)) || '';

    if (!title || !brand || price === undefined || !image) {
      return res.status(400).json({
        message: 'Title, brand, price and image are required',
      });
    }

    const product = await Product.create({
      title,
      brand,
      gender: ['male', 'female', 'unisex'].includes(gender) ? gender : 'male',
      price: Number(price),
      comparePrice: comparePrice ? Number(comparePrice) : undefined,
      image,
      image2,
      handle: handle || slugify(title),
      inStock: parseBool(inStock, true),
      badge,
      badgeType: badgeType || undefined,
      variants: parseJsonField(variants, []),
      hasColors: parseBool(hasColors, false),
    });

    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
}

/** PUT /api/products/:id */
export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const files = req.files || {};

    if (req.body.title !== undefined) product.title = req.body.title;
    if (req.body.brand !== undefined) product.brand = req.body.brand;
    if (req.body.gender !== undefined) {
      product.gender = ['male', 'female', 'unisex'].includes(req.body.gender)
        ? req.body.gender
        : product.gender;
    }
    if (req.body.price !== undefined) product.price = Number(req.body.price);
    if (req.body.comparePrice !== undefined) {
      product.comparePrice = req.body.comparePrice
        ? Number(req.body.comparePrice)
        : undefined;
    }
    if (req.body.handle !== undefined) product.handle = req.body.handle;
    if (req.body.inStock !== undefined) {
      product.inStock = parseBool(req.body.inStock, product.inStock);
    }
    if (req.body.badge !== undefined) product.badge = req.body.badge;
    if (req.body.badgeType !== undefined) {
      product.badgeType = req.body.badgeType || undefined;
    }
    if (req.body.discount !== undefined) {
      product.discount = req.body.discount ? Number(req.body.discount) : undefined;
    }
    if (req.body.hasColors !== undefined) {
      product.hasColors = parseBool(req.body.hasColors, false);
    }
    if (req.body.variants !== undefined) {
      product.variants = parseJsonField(req.body.variants, product.variants);
    }

    const nextImage = await replaceImage(product.image, files.image?.[0]);
    if (nextImage) {
      product.image = nextImage;
    } else if (req.body.image !== undefined && req.body.image !== '') {
      product.image = req.body.image;
    }

    const nextImage2 = await replaceImage(product.image2, files.image2?.[0]);
    if (nextImage2) {
      product.image2 = nextImage2;
    } else if (req.body.image2 !== undefined) {
      product.image2 = req.body.image2;
    }

    if (!product.handle && product.title) {
      product.handle = slugify(product.title);
    }

    const updated = await product.save();
    res.json({ product: updated });
  } catch (error) {
    next(error);
  }
}

/** DELETE /api/products/:id */
export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Promise.all([
      destroyCloudinaryImage(product.image),
      destroyCloudinaryImage(product.image2),
    ]);

    await product.deleteOne();
    res.json({ message: 'Product deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
}
