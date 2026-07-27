import { NextResponse } from 'next/server';
import { getMongoDb } from '@/lib/mongodb';
import { INITIAL_PRODUCTS } from '@/lib/mockProducts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toLowerCase() || '';
  const minPrice = parseFloat(searchParams.get('min_price') || '0');
  const maxPrice = parseFloat(searchParams.get('max_price') || '9999999');

  try {
    const db = await getMongoDb('Products');
    const collectionsToSearch = [
      'apparel', 'fmcg', 'mobile_accessories', 'steel_work',
      'homeappliances', 'pharma', 'books', 'beauty', 'groceries', 'kids', 'furniture'
    ];

    let targetCols = collectionsToSearch;
    if (category) {
      targetCols = collectionsToSearch.filter(c => c.toLowerCase() === category || c.includes(category));
      if (targetCols.length === 0) targetCols = collectionsToSearch;
    }

    const fetchedProducts: any[] = [];

    for (const colName of targetCols) {
      try {
        const docs = await db.collection(colName).find({ is_hidden: { $ne: true } }).limit(20).toArray();
        docs.forEach((doc: any) => {
          const name = doc.name || doc.product_name || 'Unnamed Product';
          const price = Number(doc.price || doc.mrp || 0);
          
          if (q && !name.toLowerCase().includes(q)) return;
          if (price < minPrice || price > maxPrice) return;

          fetchedProducts.push({
            id: doc._id.toString(),
            name,
            price: price || 999,
            quantity: 1,
            image: doc.image || doc.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
            category: colName.replace('_', ' ').toUpperCase(),
            col_name: colName,
            description: doc.description || 'Quality product from verified marketplace supplier.',
            stock: doc.stock || 50
          });
        });
      } catch (err) {
        // Continue if a collection doesn't exist
      }
    }

    if (fetchedProducts.length > 0) {
      return NextResponse.json({ products: fetchedProducts, source: 'mongodb' });
    }
  } catch (mongoError) {
    console.warn('MongoDB query fallback to mock catalog:', mongoError);
  }

  // Fallback filtering on INITIAL_PRODUCTS
  const filteredMock = INITIAL_PRODUCTS.filter(p => {
    const matchesQ = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchesCat = !category || p.col_name.toLowerCase().includes(category) || p.category.toLowerCase().includes(category);
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchesQ && matchesCat && matchesPrice;
  });

  return NextResponse.json({ products: filteredMock, source: 'catalog_mock' });
}
