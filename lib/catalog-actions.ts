"use server";

import { connectToDatabase } from "./mongodb";
import { Category, Product } from "@/models/catalog";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || "";

  if (!name) return;

  try {
    await connectToDatabase();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    await Category.create({
      name,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      description,
    });

    revalidatePath("/catalog-demo");
  } catch (error: any) {
    console.error("Failed to create category:", error.message);
  }
}

export async function createProductAction(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const sku = formData.get("sku") as string;
  const price = Number(formData.get("price") || 0);
  const stockQuantity = Number(formData.get("stockQuantity") || 0);
  const categoryId = formData.get("categoryId") as string;

  if (!title || !sku || !categoryId) return;

  try {
    await connectToDatabase();

    await Product.create({
      title,
      sku: sku.toUpperCase().trim(),
      price,
      stockQuantity,
      category: categoryId,
    });

    revalidatePath("/catalog-demo");
  } catch (error: any) {
    console.error("Failed to create product:", error.message);
  }
}

export async function adjustInventoryAction(productId: string, quantityChange: number): Promise<void> {
  try {
    await connectToDatabase();

    const product = await Product.findById(productId);
    if (!product) return;

    if (quantityChange < 0) {
      await product.decrementInventory(Math.abs(quantityChange));
    } else {
      product.stockQuantity += quantityChange;
      await product.save();
    }

    revalidatePath("/catalog-demo");
  } catch (error: any) {
    console.error("Failed to adjust inventory:", error.message);
  }
}

export async function getCatalogOverview() {
  try {
    await connectToDatabase();

    const [categories, products] = await Promise.all([
      Category.find({ isActive: true }).sort({ createdAt: -1 }).lean(),
      Product.find().populate("category", "name slug").sort({ createdAt: -1 }).lean(),
    ]);

    return {
      success: true,
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to connect to MongoDB",
      categories: [],
      products: [],
    };
  }
}
