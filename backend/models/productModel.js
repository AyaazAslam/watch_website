import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    comparePrice: Number,
    available: { type: Boolean, default: true },
    image: String,
    color: String,
  },
  { _id: true },
);

const productSchema = new mongoose.Schema(
  {
    handle: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'unisex'],
      default: 'male',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    comparePrice: {
      type: Number,
      min: 0,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    image2: {
      type: String,
      default: '',
    },
    badge: String,
    badgeType: {
      type: String,
      enum: ['sale', 'new', 'soldout', null],
      default: null,
    },
    discount: Number,
    inStock: {
      type: Boolean,
      default: true,
    },
    hasColors: {
      type: Boolean,
      default: false,
    },
    variants: [variantSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

productSchema.index({ title: 'text', brand: 'text', handle: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
