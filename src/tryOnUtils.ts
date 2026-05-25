export const isTryOnCompatible = (cat: string | undefined | null, productName?: string) => {
  const s = `${cat || ''} ${productName || ''}`.toLowerCase();
  if (!s.trim()) return false;
  
  // Explicitly excluded categories
  if (s.includes("food") || s.includes("treats") || s.includes("vitamins") || 
      s.includes("supplements") || s.includes("hygiene") || s.includes("health") || 
      s.includes("shampoo") || s.includes("cleaning") || s.includes("litter") || 
      s.includes("grooming") || s.includes("bowls") || s.includes("feeders") ||
      s.includes("conditioners") || s.includes("filters") || s.includes("heaters") ||
      s.includes("medicine") || s.includes("mama") || s.includes("ödül") || s.includes("kum") ||
      s.includes("tuvalet") || s.includes("şampuan") || s.includes("bakım") || s.includes("krem")) {
    return false;
  }

  // Included categories
  if (s.includes("clothes") || s.includes("clothing") || s.includes("accessories") || s.includes("kıyafet") || s.includes("mont") || s.includes("kazak") || s.includes("tişört") || s.includes("yağmurluk") || s.includes("elbise")) return true;
  if (s.includes("collar") || s.includes("harness") || s.includes("tasma") || s.includes("göğüslük") || s.includes("boyunluk")) return true;
  if (s.includes("bed") || s.includes("carrier") || s.includes("travel") || s.includes("yatak") || s.includes("çanta") || s.includes("taşıma")) return true;
  if (s.includes("toy") || s.includes("perch") || s.includes("wheel") || s.includes("oyuncak") || s.includes("tünek") || s.includes("çark")) return true;
  if (s.includes("cage") || s.includes("terrarium") || s.includes("aquarium") || s.includes("tank") || s.includes("kafes") || s.includes("akvaryum") || s.includes("teraryum")) return true;
  if (s.includes("decor") || s.includes("layout") || s.includes("vest") || s.includes("sweater") || s.includes("coat") || s.includes("raincoat") || s.includes("dekor")) return true;
  
  return false;
};
