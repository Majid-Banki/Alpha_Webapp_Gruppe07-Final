import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// Tabell for brukere (USERS)
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: text('created_at').notNull().default(new Date().toISOString()),
});

// Tabell for produktkategorier (CATEGORIES)
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),
});

// Tabell for produkter (PRODUCTS)
export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(), // Pris i øre for å unngå desimaltall-problemer
  imageUrl: text('image_url').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
});

// Tabell for produktvarianter (PRODUCT_VARIANTS)
export const productVariants = sqliteTable('product_variants', {
  id: integer('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id),
  size: text('size').notNull(),
  color: text('color').notNull(),
  stockQuantity: integer('stock_quantity').notNull().default(0),
});

// Tabell for ordre (ORDERS)
export const orders = sqliteTable('orders', {
    id: integer('id').primaryKey(),
    userId: integer('user_id').references(() => users.id), // Kan være NULL for gjestekjøp
    customerEmail: text('customer_email').notNull(),
    shippingAddress: text('shipping_address').notNull(),
    totalPrice: integer('total_price').notNull(),
    status: text('status').notNull().default('pending'), // f.eks. 'pending', 'shipped', 'delivered'
    createdAt: text('created_at').notNull().default(new Date().toISOString()),
});

// Tabell for ordrelinjer (ORDER_ITEMS)
export const orderItems = sqliteTable('order_items', {
    id: integer('id').primaryKey(),
    orderId: integer('order_id').notNull().references(() => orders.id),
    variantId: integer('variant_id').notNull().references(() => productVariants.id),
    quantity: integer('quantity').notNull(),
    priceAtPurchase: integer('price_at_purchase').notNull(), // Prisen på varen da den ble kjøpt
});


// DEFINERER RELASJONER (Viktig for Drizzle for å forstå sammenhenger)
export const productRelations = relations(products, ({ one, many }) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id],
	}),
	variants: many(productVariants),
}));

export const variantRelations = relations(productVariants, ({ one }) => ({
	product: one(products, {
		fields: [productVariants.productId],
		references: [products.id],
	}),
}));

export const orderRelations = relations(orders, ({ many }) => ({
	items: many(orderItems),
}));