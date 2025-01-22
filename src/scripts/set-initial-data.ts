import { eq } from 'drizzle-orm'
import { categories } from '../db/schema/categories'
import { products } from '../db/schema/product'
import { db } from '../db/setup'

export async function setInitialData() {
  const isCategoriesTableEmpty = !(await db.select().from(categories).where(eq(categories.id, 1)))[0]
  if (isCategoriesTableEmpty) {
    await db.insert(categories).values([
      { name: 'Геймпады' },
      { name: 'Мониторы' },
      { name: 'Клавиатуры' },
      { name: 'Ноутбуки' },
    ])
  }

  const isProductsTableEmpty = !(await db.select().from(products).where(eq(products.id, 1)))[0]
  if (isProductsTableEmpty) {
    await db.insert(products).values([
      { categoryId: 1, name: 'Геймпад Sony DualSense', imageUrl: '/public/products/geympad.jpg' },
      { categoryId: 2, name: 'Монитор ASUS TUF Gaming', imageUrl: '/public/products/monitor.jpg' },
      { categoryId: 3, name: 'Клавиатура Logitech K380', imageUrl: '/public/products/keyboard.jpg' },
      { categoryId: 4, name: 'Ноутбук MSI Katana', imageUrl: '/public/products/laptop.jpg' },
    ])
  }
}
