import Order from '../models/orderModel.js';

/** GET /api/orders */
export async function getOrders(req, res, next) {
  try {
    const { status, q } = req.query;
    const filter = {};

    if (status && status !== 'all') filter.status = status;

    if (q) {
      filter.$or = [
        { orderId: { $regex: q, $options: 'i' } },
        { customer: { $regex: q, $options: 'i' } },
        { product: { $regex: q, $options: 'i' } },
      ];
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ count: orders.length, orders });
  } catch (error) {
    next(error);
  }
}

/** GET /api/orders/:id */
export async function getOrderById(req, res, next) {
  try {
    const order =
      (await Order.findById(req.params.id).catch(() => null)) ||
      (await Order.findOne({ orderId: req.params.id }));

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order });
  } catch (error) {
    next(error);
  }
}

/** POST /api/orders */
export async function createOrder(req, res, next) {
  try {
    const { customer, product, productRef, amount, status, channel, date } =
      req.body;

    if (!customer || !product || amount === undefined) {
      return res.status(400).json({
        message: 'Customer, product and amount are required',
      });
    }

    const order = await Order.create({
      customer,
      product,
      productRef: productRef || null,
      amount: Number(amount),
      status: status || 'pending',
      channel: channel || 'whatsapp',
      date: date ? new Date(date) : new Date(),
    });

    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
}

/** PATCH /api/orders/:id/status */
export async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order =
      (await Order.findById(req.params.id).catch(() => null)) ||
      (await Order.findOne({ orderId: req.params.id }));

    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    const updated = await order.save();
    res.json({ order: updated });
  } catch (error) {
    next(error);
  }
}

/** PUT /api/orders/:id */
export async function updateOrder(req, res, next) {
  try {
    const order =
      (await Order.findById(req.params.id).catch(() => null)) ||
      (await Order.findOne({ orderId: req.params.id }));

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const fields = ['customer', 'product', 'productRef', 'amount', 'status', 'channel', 'date'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        order[field] = field === 'date' ? new Date(req.body[field]) : req.body[field];
      }
    });

    const updated = await order.save();
    res.json({ order: updated });
  } catch (error) {
    next(error);
  }
}

/** DELETE /api/orders/:id */
export async function deleteOrder(req, res, next) {
  try {
    const order =
      (await Order.findById(req.params.id).catch(() => null)) ||
      (await Order.findOne({ orderId: req.params.id }));

    if (!order) return res.status(404).json({ message: 'Order not found' });

    await order.deleteOne();
    res.json({ message: 'Order deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
}
