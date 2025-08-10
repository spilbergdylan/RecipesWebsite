import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const families = [
    { slug: 'spilbergs', displayName: 'The Spilbergs' },
    { slug: 'kahanes', displayName: 'The Kahanes' },
    { slug: 'brookes', displayName: 'The Brookes' },
    { slug: 'nona-saba', displayName: 'Nona and Saba' }
  ];

  for (const f of families) {
    await prisma.family.upsert({
      where: { slug: f.slug },
      update: {},
      create: f
    });
  }

  const sampleRecipes = [
    {
      familySlug: 'spilbergs',
      title: 'Sunday Cinnamon French Toast',
      description: 'Cozy cinnamon-kissed toast perfect for lingering Sunday mornings.',
      tags: ['breakfast'],
      ingredients: ['Thick bread slices', 'Eggs', 'Milk', 'Cinnamon', 'Vanilla', 'Butter', 'Maple syrup'],
      instructions:
        'Whisk eggs, milk, cinnamon, and vanilla.\nDip bread and cook on buttered skillet until golden.\nServe warm with maple syrup.'
    },
    {
      familySlug: 'kahanes',
      title: 'Herbed Roast Chicken',
      description: 'Tender roast chicken with lemon and garden herbs.',
      tags: ['main'],
      ingredients: ['Whole chicken', 'Lemon', 'Garlic', 'Rosemary', 'Thyme', 'Olive oil', 'Salt', 'Pepper'],
      instructions:
        'Rub chicken with herbs, garlic, lemon, and oil.\nRoast at 425°F until juices run clear.\nRest before carving.'
    },
    {
      familySlug: 'brookes',
      title: 'Grandma’s Chocolate Chip Cookies',
      description: 'Soft centers, golden edges, and extra chocolatey.',
      tags: ['dessert'],
      ingredients: ['Flour', 'Butter', 'Brown sugar', 'Eggs', 'Vanilla', 'Chocolate chips', 'Salt', 'Baking soda'],
      instructions: 'Cream butter and sugars.\nBeat in eggs and vanilla.\nFold in dry ingredients and chips.\nBake at 350°F.'
    },
    {
      familySlug: 'nona-saba',
      title: 'Comforting Lentil Soup',
      description: 'Simple, hearty soup with warm spices.',
      tags: ['main'],
      ingredients: ['Lentils', 'Onion', 'Carrots', 'Celery', 'Tomato', 'Cumin', 'Bay leaf', 'Olive oil', 'Stock'],
      instructions: 'Sauté aromatics.\nAdd lentils, tomatoes, and stock.\nSimmer until tender.\nSeason to taste.'
    }
  ];

  for (const r of sampleRecipes) {
    const family = await prisma.family.findUnique({ where: { slug: r.familySlug } });
    if (!family) continue;
    const recipe = await prisma.recipe.create({
      data: {
        familyId: family.id,
        title: r.title,
        description: r.description,
        imageUrl: null,
        tags: JSON.stringify(r.tags),
        ingredients: JSON.stringify(r.ingredients),
        instructions: r.instructions
      }
    });

    await prisma.memory.create({
      data: {
        recipeId: recipe.id,
        author: 'Mom',
        text: 'We always made this together on rainy days — the house smelled amazing!'
      }
    });
  }

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 