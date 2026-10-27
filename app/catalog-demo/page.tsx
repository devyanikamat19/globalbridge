import { getCatalogOverview, createCategoryAction, createProductAction, adjustInventoryAction } from "@/lib/catalog-actions";

export default async function CatalogDemoPage() {
  const result = await getCatalogOverview();
  const { categories, products, error } = result;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-ink-950 dark:text-paper font-body">
      {/* Header */}
      <div className="mb-10 border-b border-ink-700/10 dark:border-paper/10 pb-6">
        <p className="eyebrow mb-2">Experiment 6</p>
        <h1 className="text-3xl font-display font-medium text-ink-950 dark:text-white">
          E-Commerce Catalog Tracking with MongoDB & Mongoose
        </h1>
        <p className="text-sm text-ink-950/70 dark:text-paper/70 mt-2 max-w-2xl">
          Operational catalog schema connecting Next.js with MongoDB through Mongoose. Demonstrates relational category referencing, indexed SKU enforcement, inventory tracking methods, and pre-save lifecycle hooks.
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-sm">
          <p className="font-medium">MongoDB Connection Notice:</p>
          <p className="font-mono text-xs mt-1">{error}</p>
          <p className="mt-2 text-xs opacity-80">
            If running locally, verify your MongoDB instance is reachable via <code className="font-mono">MONGODB_URI</code> in <code className="font-mono">.env</code>.
          </p>
        </div>
      )}

      {/* Grid: Creation Forms */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Form 1: Category Creation */}
        <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-display font-medium mb-1 text-ink-950 dark:text-white">
            1. Add Catalog Category
          </h2>
          <p className="text-xs text-ink-950/60 dark:text-paper/60 mb-5">
            Creates a Mongoose category document with an auto-slugified identifier.
          </p>

          <form action={createCategoryAction} className="space-y-3 text-sm">
            <div>
              <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                Category Name
              </label>
              <input
                name="name"
                defaultValue="Study Abroad Prep Kits"
                required
                className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                Description
              </label>
              <input
                name="description"
                defaultValue="Essential digital and physical preparation materials."
                className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-harbor-600 hover:bg-harbor-500 text-white rounded font-medium transition-colors text-sm"
            >
              Save Category Document
            </button>
          </form>
        </div>

        {/* Form 2: Product Creation */}
        <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-display font-medium mb-1 text-ink-950 dark:text-white">
            2. Add Product to Catalog
          </h2>
          <p className="text-xs text-ink-950/60 dark:text-paper/60 mb-5">
            Operational product schema with SKU index, inventory stock, and auto-computed status.
          </p>

          <form action={createProductAction} className="space-y-3 text-sm">
            <div>
              <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                Product Title
              </label>
              <input
                name="title"
                defaultValue="IELTS Master Prep Bundle"
                required
                className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                  SKU (Unique Index)
                </label>
                <input
                  name="sku"
                  defaultValue={`SKU-PREP-${Math.floor(100 + Math.random() * 900)}`}
                  required
                  className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950 font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue="149"
                  required
                  className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  defaultValue="12"
                  required
                  className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-ink-950/60 dark:text-paper/60 mb-1">
                  Category Reference
                </label>
                <select
                  name="categoryId"
                  required
                  className="w-full px-3 py-2 rounded border border-ink-700/20 dark:border-paper/20 bg-paper dark:bg-ink-950 text-xs"
                >
                  {categories.length === 0 ? (
                    <option value="">Create a category first</option>
                  ) : (
                    categories.map((cat: any) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={categories.length === 0}
              className="w-full py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white rounded font-medium transition-colors text-sm"
            >
              Register Catalog Product
            </button>
          </form>
        </div>
      </div>

      {/* Catalog Tracking Inventory Table */}
      <div className="bg-white dark:bg-ink-900 border border-ink-700/10 dark:border-paper/10 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-display font-medium text-ink-950 dark:text-white">
            Operational Inventory Tracker ({products.length} Products)
          </h3>
          <span className="text-xs font-mono text-ink-950/50 dark:text-paper/50">
            Pre-save hooks auto-classify stock status
          </span>
        </div>

        {products.length === 0 ? (
          <p className="text-sm text-ink-950/50 dark:text-paper/50 italic py-6 text-center">
            No products in catalog yet. Add a category above and register your first product.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ink-700/10 dark:border-paper/10 text-ink-950/50 dark:text-paper/50 font-mono">
                  <th className="pb-3 font-medium">SKU</th>
                  <th className="pb-3 font-medium">Title & Category</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Stock</th>
                  <th className="pb-3 font-medium">Computed Status</th>
                  <th className="pb-3 font-medium text-right">Inventory Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p: any) => (
                  <tr
                    key={p._id}
                    className="border-b border-ink-700/5 dark:border-paper/5 last:border-0 hover:bg-ink-900/5 dark:hover:bg-paper/5"
                  >
                    <td className="py-3 font-mono font-medium text-ink-950 dark:text-paper">
                      {p.sku}
                    </td>
                    <td className="py-3">
                      <p className="font-medium text-ink-950 dark:text-paper">{p.title}</p>
                      <p className="text-[11px] text-harbor-600 dark:text-harbor-400">
                        {p.category?.name || "Uncategorized"}
                      </p>
                    </td>
                    <td className="py-3 text-ink-950 dark:text-paper">${p.price}</td>
                    <td className="py-3 font-mono font-bold">{p.stockQuantity}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                          p.status === "IN_STOCK"
                            ? "bg-harbor-500/20 text-harbor-600 dark:text-harbor-400"
                            : p.status === "LOW_STOCK"
                            ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                            : "bg-red-500/20 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex gap-1.5">
                        <form action={adjustInventoryAction.bind(null, p._id, -1)}>
                          <button
                            type="submit"
                            title="Decrement stock (Simulate Sale)"
                            className="px-2 py-1 bg-ink-900/10 dark:bg-paper/10 hover:bg-red-500/20 text-xs rounded"
                          >
                            -1 Sale
                          </button>
                        </form>
                        <form action={adjustInventoryAction.bind(null, p._id, 5)}>
                          <button
                            type="submit"
                            title="Restock inventory"
                            className="px-2 py-1 bg-ink-900/10 dark:bg-paper/10 hover:bg-harbor-500/20 text-xs rounded"
                          >
                            +5 Restock
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
