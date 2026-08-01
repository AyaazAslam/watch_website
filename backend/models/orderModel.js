import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      trim: true,
    },
    customer: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    product: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    productRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    channel: {
      type: String,
      enum: ['whatsapp', 'walk-in', 'web'],
      default: 'whatsapp',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        ret.id = ret.orderId || ret._id.toString();
        delete ret._id;
        delete ret.__v;
        if (ret.date instanceof Date) {
          ret.date = ret.date.toISOString().slice(0, 10);
        }
        return ret;
      },
    },
  },
);

orderSchema.pre('save', async function setOrderId(next) {
  if (this.orderId) return next();
  const count = await mongoose.model('Order').countDocuments();
  this.orderId = `ORD-${1040 + count}`;
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
