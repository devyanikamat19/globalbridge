import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Category, Product } from "@/models/catalog";

// GET: Fetch catalog with relational category population and filtering
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);

    const categorySlug = searchParams.get("category");
    const status = searchParams.get("status");

    const query: Record<string, any> = {};

    if (status) {
      query.status = status;
    }

    if (categorySlug) {
      const cat = await Category.findOne({ slug: categorySlug });
      if (cat) {
        query.category = cat._id;
      }
    }

    const [products, totalCount] = await Promise.all([
      Product.find(query).populate("category", "name slug").sort({ createdAt: -1 }),
      Product.countDocuments(query),
    ]);

    return NextResponse.json(
      {
        success: true,
        count: totalCount,
        data: products,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to query catalog" },
      { status: 500 }
    );
  }
}

// POST: Operational endpoint to add products or categories via API
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { type } = body;

    if (type === "category") {
      const slug = (body.name || "category").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const category = await Category.create({
        name: body.name,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        description: body.description,
      });
      return NextResponse.json({ success: true, data: category }, { status: 201 });
    }

    // Default: Product creation
    const product = await Product.create({
      title: body.title,
      sku: (body.sku || `SKU-${Date.now().toString().slice(-6)}`).toUpperCase(),
      price: body.price,
      costPrice: body.costPrice,
      stockQuantity: body.stockQuantity ?? 10,
      lowStockThreshold: body.lowStockThreshold ?? 5,
      category: body.categoryId,
      tags: body.tags || [],
      attributes: body.attributes || {},
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create catalog entry" },
      { status: 400 }
    );
  }
}

// PATCH: Adjust inventory quantity atomically
export async function PATCH(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { productId, change } = body;

    if (!productId || typeof change !== "number") {
      return NextResponse.json(
        { success: false, error: "productId and numeric change are required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    if (change < 0) {
      await product.decrementInventory(Math.abs(change));
    } else {
      product.stockQuantity += change;
      await product.save();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inventory updated successfully",
        data: {
          id: product._id,
          sku: product.sku,
          stockQuantity: product.stockQuantity,
          status: product.status,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to adjust inventory" },
      { status: 400 }
    );
  }
}
