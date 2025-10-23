import { db } from '../src/lib/drizzle'
import { categories, products } from '../src/lib/schema'

async function main() {
  console.log('--- STARTING DATABASE SEEDING ---');

  // 1. Legg til kategorier
  const categoryResult = await db.insert(categories).values([
    { name: 'Hijab' },
    { name: 'Abaya' },
    { name: 'Gamis' },
  ]).returning({ id: categories.id, name: categories.name });

  console.log(`Seeded ${categoryResult.length} categories.`);

  // Finn ID-en for 'Hijab' for å koble produktene til riktig kategori
  const hijabCategory = categoryResult.find(c => c.name === 'Hijab');
  if (!hijabCategory) throw new Error("Hijab category ID not found after seeding.");
  const hijabCategoryId = hijabCategory.id;

  // 2. Legg til produkter basert på wireframes (Produktene på side 6)
  await db.insert(products).values([
    {
      name: 'Pashmina Satin Gold',
      description: 'En vakker og elegant pashmina i gullfarge.',
      price: 6900, // 69.00 KR
      imageUrl: 'https://via.placeholder.com/300x400.png?text=Pashmina+Gold',
      categoryId: hijabCategoryId,
    },
    {
      name: 'Pashmina Satin Black',
      description: 'En klassisk sort pashmina som passer til alt.',
      price: 6900, // 69.00 KR
      imageUrl: 'https://via.placeholder.com/300x400.png?text=Pashmina+Black',
      categoryId: hijabCategoryId,
    },
    {
      name: 'Young Pashmina Cream',
      description: 'En myk og deilig pashmina i kremfarge.',
      price: 6900, // 69.00 KR
      imageUrl: 'https://via.placeholder.com/300x400.png?text=Pashmina+Cream',
      categoryId: hijabCategoryId,
    },
    {
      name: 'Pashmina Satin Moss Green',
      description: 'En dyp, matt grønn pashmina for et elegant utseende.',
      price: 6900, // 69.00 KR
      imageUrl: 'https://via.placeholder.com/300x400.png?text=Pashmina+Green',
      categoryId: hijabCategoryId,
    },
  ]);
  console.log('Seeded initial products.');
  console.log('--- DATABASE SEEDING COMPLETE ---');
}

main().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});