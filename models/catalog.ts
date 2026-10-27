import mongoose, { Schema, Document, Model } from "mongoose";

// ==========================================
// 1. CATEGORY SCHEMA
// ==========================================
export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// ==========================================
// 2. PRODUCT SCHEMA (E-COMMERCE CATALOG)
// ==========================================
export type ProductStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export interface IProduct extends Document {
  title: string;
  sku: string;
  price: number;
  costPrice?: number;
  stockQuantity: number;
  lowStockThreshold: number;
  status: ProductStatus;
  category: mongoose.Types.ObjectId | ICategory;
  tags: string[];
  attributes: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  decrementInventory(amount: number): Promise<IProduct>;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      index: true,
    },
    sku: {
      type: String,
      required: [true, "Unique SKU identifier is required"],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    costPrice: {
      type: Number,
      min: [0, "Cost price cannot be negative"],
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Stock quantity cannot drop below zero"],
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
      min: [1, "Threshold must be at least 1"],
    },
    status: {
      type: String,
      enum: ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"],
      default: "IN_STOCK",
      index: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category reference is required"],
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    attributes: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

// Operational Middleware: Pre-save hook automatically determining operational stock status
ProductSchema.pre("save", function () {
  if (this.stockQuantity <= 0) {
    this.status = "OUT_OF_STOCK";
  } else if (this.stockQuantity <= this.lowStockThreshold) {
    this.status = "LOW_STOCK";
  } else {
    this.status = "IN_STOCK";
  }
});

// Operational Instance Method: Decrement inventory safely
ProductSchema.methods.decrementInventory = async function (amount: number): Promise<IProduct> {
  if (this.stockQuantity < amount) {
    throw new Error(`Insufficient stock for SKU ${this.sku}. Requested: ${amount}, Available: ${this.stockQuantity}`);
  }
  this.stockQuantity -= amount;
  return await this.save();
};

// Next.js hot-reload model re-compilation prevention
export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
