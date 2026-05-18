import { ProductWithCategory, ALL_MOCK_PRODUCTS } from './productGenerator';

// Basic Levenshtein distance for fuzzy matching/typo tolerance
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Synonyms Map
const SYNONYMS: Record<string, string[]> = {
  "cat food": ["kedi maması", "feline diet"],
  "kedi maması": ["cat food"],
  "dog food": ["köpek maması", "canine diet"],
  "köpek maması": ["dog food"],
  "grain free": ["tahılsız", "no grain"],
  "tahılsız": ["grain free"],
  "aquarium": ["fish tank", "akvaryum"],
  "akvaryum": ["aquarium", "fish tank"],
  "bird cage": ["kuş kafesi"],
  "kuş kafesi": ["bird cage"],
  "toy": ["oyuncak"],
  "oyuncak": ["toy"],
  "snack": ["ödül", "treat"],
  "ödül": ["treat", "snack"]
};

// Root Stemming Basics (Turkish/English)
function stem(word: string): string {
  let w = word.toLowerCase();
  
  // Basic Turkish plural/suffixes
  if (w.endsWith("ler") || w.endsWith("lar")) w = w.slice(0, -3);
  else if (w.endsWith("im") || w.endsWith("ın") || w.endsWith("in") || w.endsWith("un") || w.endsWith("ün")) w = w.slice(0, -2);
  else if (w.endsWith("ı") || w.endsWith("i") || w.endsWith("u") || w.endsWith("ü")) w = w.slice(0, -1);
  else if (w.endsWith("s")) w = w.slice(0, -1); // Basic English plural

  // Standardize some Turkish morphs
  if (w === "köpeğ") return "köpek";
  if (w === "kediğ") return "kedi";
  
  return w;
}

export type SearchResult = {
  product: ProductWithCategory;
  score: number;
};

export function advancedSearch(
  query: string, 
  lang: 'EN' | 'TR', 
  userPets: string[] = [] // ['dogs', 'cats'] etc
): { results: SearchResult[], fallback: boolean, fallbackTokens: string[] } {
  let q = query.toLowerCase().trim();
  if (!q) return { results: [], fallback: false, fallbackTokens: [] };

  const tokens = q.split(/\s+/).map(t => stem(t));
  
  // Expand synonyms
  const extendedTokens = [...tokens];
  for (const t of tokens) {
     for (const key of Object.keys(SYNONYMS)) {
        if (key.includes(t)) {
           extendedTokens.push(...SYNONYMS[key].map(stem));
        }
     }
  }

  const results = ALL_MOCK_PRODUCTS.map(product => {
    let score = 0;
    const nameEn = product.name.EN.toLowerCase();
    const nameTr = product.name.TR.toLowerCase();
    const brand = product.brand.toLowerCase();
    const catEn = product._categoryLabel.EN.toLowerCase();
    const catTr = product._categoryLabel.TR.toLowerCase();
    const flavor = (product.flavor || "").toLowerCase();
    const age = (product.age || "").toLowerCase();
    const weight = (product.weight || "").toLowerCase();
    const badges = product.badges.join(" ").toLowerCase();

    // 1. Exact Name match gets very high score
    if (nameEn === q || nameTr === q) score += 500;
    else if (nameEn.includes(q) || nameTr.includes(q)) score += 200;

    // 2. Token Matching (Weights)
    for (const t of extendedTokens) {
        if (t.length < 2) continue; // skip single letters

        // Title Matching (High Weight)
        if (nameEn.includes(t) || nameTr.includes(t)) score += 50;
        else {
           // Typo Tolerance (Levenshtein) - only if token is large enough
           if (t.length > 4) {
             const words = (nameEn + " " + nameTr).split(/\s+/);
             let minDist = 999;
             for (const w of words) {
               const dist = levenshteinDistance(t, w);
               if (dist < minDist) minDist = dist;
             }
             if (minDist === 1) score += 30; // Very close typo
             if (minDist === 2) score += 10;
           }
        }

        // Brand Match (Med Weight)
        if (brand === t || stem(brand) === t) score += 40;
        else if (brand.includes(t)) score += 20;
        
        // Category / Species Match (High Weight to ensure intent)
        if (catEn.includes(t) || catTr.includes(t)) score += 40;

        // Ingredient / Flavor / Age
        if (flavor.includes(t)) score += 30;
        if (age.includes(t)) score += 15;
        if (weight.includes(t)) score += 10;
        if (badges.includes(t)) score += 10;
    }

    // 3. Personalization Engine
    if (score > 0 && userPets.length > 0) {
      const isPersonalized = userPets.some(pet => {
         let p = pet.endsWith('s') ? pet : pet + 's';
         return catEn.includes(p) || p.includes(catEn);
      });
      if (isPersonalized) score += 50; // Boost relevant pet products
    }

    // 4. Dynamic Ranking Adjustments
    if (score > 0) {
       // Deprioritize out of stock
       if (product.stock === 0) score -= 100;
       
       // Popuarity boost
       score += Math.min(product.sold / 100, 20); // Cap popularity impact
       score += (product.rating || 0) * 3;
    }

    return { product, score };
  })
  .filter(item => item.score > 0);

  // Eliminate duplicates by unique EN name (deduplication)
  const uniqueNames = new Set<string>();
  const deduplicated = results.filter(item => {
     const n = item.product.name.EN;
     if (uniqueNames.has(n)) return false;
     uniqueNames.add(n);
     return true;
  });

  const sortedResults = deduplicated.sort((a, b) => b.score - a.score);

  if (sortedResults.length > 0) {
    return { results: sortedResults, fallback: false, fallbackTokens: extendedTokens };
  } else {
    // No results fallback
    // Let's recommend some bestsellers from personalization or in general
    let fallbackPool = ALL_MOCK_PRODUCTS;
    if (userPets.length > 0) {
        fallbackPool = fallbackPool.filter(p => {
            const catEn = p._categoryLabel.EN.toLowerCase();
            return userPets.some(pet => {
               let petC = pet.endsWith('s') ? pet : pet + 's';
               return catEn.includes(petC) || petC.includes(catEn);
            });
        });
    }

    return { 
       results: fallbackPool
         .sort((a,b) => b.sold - a.sold)
         .slice(0, 4)
         .map(p => ({ product: p, score: 1 })), 
       fallback: true,
       fallbackTokens: extendedTokens
    };
  }
}
