import FamilySectionCard from '@/components/FamilySectionCard';

export default function HomePage() {
  const families = [
    { slug: 'spilbergs', displayName: 'The Spilbergs', imageSrc: '/spilbergs_recipe.png' },
    { slug: 'kahanes', displayName: 'The Kahanes', imageSrc: '/kahane_recipes.png' },
    { slug: 'brookes', displayName: 'The Brookes', imageSrc: '/brookes_recipe.png' },
    { slug: 'nona-saba', displayName: 'Nona and Saba', imageSrc: '/nona_recipe.png' }
  ];

  return (
    <div className="space-y-8 md:space-y-8 animate-fadeIn">
      <section className="mt-10 sm:mt-4 md:mt-0 rounded-3xl bg-gradient-to-r from-primary/25 via-accent/25 to-secondary/25 p-4 sm:p-6 md:p-12 shadow relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'var(--paper-bg)', backgroundPosition: 'var(--paper-pos)', backgroundSize: 'var(--paper-size)' }} />
        <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-neutral mb-5 sm:mb-6" style={{ fontFamily: 'var(--font-lora)' }}>Our Family Recipes</h2>
        <p className="relative text-neutral/80 text-sm sm:text-base md:text-lg max-w-2xl">Simple, comforting dishes our family loves. Browse a recipe book below or add your own.</p>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-4 md:gap-6">
        {families.map((f) => (
          <FamilySectionCard key={f.slug} slug={f.slug} title={f.displayName} imageSrc={f.imageSrc} />
        ))}
      </div>
    </div>
  );
} 