import React, { useMemo } from 'react';
import { CATEGORIES } from './categories';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, FolderPlus, Package, Search } from 'lucide-react';
import { useLang, t, Lang } from './i18n'; 

export default function CategoryPage({ 
  categoryId, 
  userPets = [],
  selectedPets
}: { 
  categoryId: string, 
  onAddToCart: (name: string, quantity?: number, price?: number) => void,
  savedProductNames: string[],
  onSaveToFolder: (name: string) => void,
  userPets?: any[],
  selectedPets?: string[]
}) {
  const { lang } = useLang();
  
  // Find category info
  const subcategory = useMemo(() => {
    if (categoryId === 'personalized') {
      const activeFilters = selectedPets !== undefined
        ? selectedPets.map(p => p.toLowerCase())
        : userPets.filter(p => p.name && p.type).map(p => p.type.toLowerCase());
        
      const combinedPets = Array.from(new Set(activeFilters));
      
      const mapPetToCategory = (pet: string) => {
        if (pet === 'avian') return 'birds';
        if (pet === 'fish') return 'fish';
        if (pet === 'rodent') return 'rodents';
        if (pet === 'reptile') return 'reptiles';
        return pet.endsWith('s') ? pet : pet + 's';
      };

      const targetCategories = combinedPets.length > 0 
        ? combinedPets.map(mapPetToCategory)
        : ['dogs', 'cats', 'birds', 'fish', 'rodents', 'reptiles'];

      const relevantCategories = CATEGORIES.filter(c => targetCategories.includes(c.id.toLowerCase()));
      let recommendedFolders: any[] = [];
      for (const cat of relevantCategories) {
        recommendedFolders.push(...cat.subcategories.slice(0, Math.ceil(12 / relevantCategories.length)));
      }

      return {
        parent: { name: { EN: "Catalog", TR: "Katalog" } },
        sub: { name: { EN: "Your Personalized Catalog", TR: "Sizin İçin Özel Seçimler" } },
        isParent: true,
        subcategories: recommendedFolders.slice(0, 12)
      } as any;
    }
    
    // check if it's a parent category
    const parentCat = CATEGORIES.find(c => c.id === categoryId);
    if (parentCat) {
      return {
          parent: { name: { EN: "Catalog", TR: "Katalog" } },
          sub: { name: parentCat.name, id: parentCat.id },
          isParent: true,
          subcategories: parentCat.subcategories
      }
    }

    // check if it's a subcategory
    for (const cat of CATEGORIES) {
      const sub = cat.subcategories.find(s => s.id === categoryId);
      if (sub) return { parent: cat, sub, isParent: false };
    }

    return {
      parent: { name: { EN: "Catalog", TR: "Katalog" } },
      sub: { name: { EN: categoryId, TR: categoryId } },
      isParent: false
    } as any;
  }, [categoryId]);

  if (!subcategory) {
    return <div className="py-32 text-center">Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-secondary/30 pt-4 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }} className="hover:text-brand-teal transition-colors">Vivia</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{subcategory.parent.name[lang]}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-foreground">{subcategory.sub.name[lang]}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1">
              {subcategory.sub.name[lang]}
            </h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Main Content */}
          <div className="flex-1 w-full">
            {subcategory.isParent ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {subcategory.subcategories.map((sub: any) => (
                  <a 
                    href={`#/category/${sub.id}`} 
                    key={sub.id} 
                    className="group bg-card rounded-2xl p-6 border border-border hover:border-brand-teal/40 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-300 flex flex-col items-center justify-center text-center relative h-full"
                  >
                    <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-brand-teal/10 transition-all duration-300">
                      <FolderPlus className="w-8 h-8 text-muted-foreground group-hover:text-brand-teal group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug">{sub.name[lang]}</h3>
                  </a>
                ))}
             </div>
            ) : (
                <div className="bg-card border border-border rounded-2xl p-12 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{lang === 'TR' ? 'Ürün Bulunamadı' : 'No Products Found'}</h3>
                    <p className="text-muted-foreground text-sm max-w-md mt-2">
                    {lang === 'TR' ? 'Bu kategoride henüz ürün bulunmuyor. Gerçek satıcılar stoklarını güncellediğinde ürünler burada listelenecektir.' : 'There are no products in this category yet. When real merchants update their inventory, products will be listed here.'}
                    </p>
                    <a 
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
                    className="mt-6 font-bold text-brand-teal hover:underline"
                    >
                    {lang === 'TR' ? 'Ana Sayfaya Dön' : 'Back to Home'}
                    </a>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

