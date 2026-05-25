export type Category = {
  id: string;
  name: { EN: string, TR: string };
  subcategories: Array<{
    id: string;
    name: { EN: string, TR: string };
  }>;
};

export const CATEGORIES: Category[] = [
  {
    id: 'dogs',
    name: { EN: 'Dogs', TR: 'Köpekler' },
    subcategories: [
      { id: 'dog-dry-food', name: { EN: 'Dog Dry Food', TR: 'Köpek Kuru Mama' } },
      { id: 'dog-wet-food', name: { EN: 'Dog Wet Food', TR: 'Köpek Konserve Mama' } },
      { id: 'dog-treats', name: { EN: 'Dog Treats & Rewards', TR: 'Köpek Ödül Maması' } },
      { id: 'dog-toys', name: { EN: 'Dog Toys', TR: 'Köpek Oyuncakları' } },
      { id: 'dog-collars', name: { EN: 'Dog Collars, Harnesses & Leashes', TR: 'Köpek Tasmaları, Göğüs Tasmaları & Kayışları' } },
      { id: 'dog-clothing', name: { EN: 'Dog Clothing', TR: 'Köpek Kıyafetleri' } },
      { id: 'dog-beds', name: { EN: 'Dog Beds', TR: 'Köpek Yatakları' } },
      { id: 'dog-grooming', name: { EN: 'Dog Grooming Products', TR: 'Köpek Tımar ve Bakım Ürünleri' } },
      { id: 'dog-shampoo', name: { EN: 'Dog Shampoo & Hygiene', TR: 'Köpek Şampuan ve Hijyen' } },
      { id: 'dog-vitamins', name: { EN: 'Dog Vitamins & Supplements', TR: 'Köpek Vitamin ve Takviyeleri' } },
      { id: 'dog-training', name: { EN: 'Dog Training Products', TR: 'Köpek Eğitim Ürünleri' } },
      { id: 'dog-carriers', name: { EN: 'Dog Carriers & Travel Products', TR: 'Köpek Taşıma & Seyahat Ürünleri' } },
      { id: 'dog-bowls', name: { EN: 'Dog Bowls & Feeders', TR: 'Köpek Mama ve Su Kapları' } },
      { id: 'dog-health', name: { EN: 'Dog Health Products', TR: 'Köpek Sağlık Ürünleri' } }
    ]
  },
  {
    id: 'cats',
    name: { EN: 'Cats', TR: 'Kediler' },
    subcategories: [
      { id: 'cat-dry-food', name: { EN: 'Cat Dry Food', TR: 'Kedi Kuru Mama' } },
      { id: 'cat-wet-food', name: { EN: 'Cat Wet Food', TR: 'Kedi Yaş Mama' } },
      { id: 'cat-treats', name: { EN: 'Cat Treats & Rewards', TR: 'Kedi Ödül Maması' } },
      { id: 'cat-toys', name: { EN: 'Cat Toys', TR: 'Kedi Oyuncakları' } },
      { id: 'cat-litter', name: { EN: 'Cat Litter', TR: 'Kedi Kumu' } },
      { id: 'cat-litter-boxes', name: { EN: 'Cat Litter Boxes', TR: 'Kedi Tuvaletleri' } },
      { id: 'cat-scratchers', name: { EN: 'Cat Scratchers', TR: 'Kedi Tırmalama Ürünleri' } },
      { id: 'cat-beds', name: { EN: 'Cat Beds', TR: 'Kedi Yatakları' } },
      { id: 'cat-grooming', name: { EN: 'Cat Grooming Products', TR: 'Kedi Tımar ve Bakım Ürünleri' } },
      { id: 'cat-vitamins', name: { EN: 'Cat Vitamins & Supplements', TR: 'Kedi Vitamin ve Takviyeleri' } },
      { id: 'cat-carriers', name: { EN: 'Cat Carriers & Travel Products', TR: 'Kedi Taşıma & Seyahat Ürünleri' } },
      { id: 'cat-bowls', name: { EN: 'Cat Bowls & Feeders', TR: 'Kedi Mama ve Su Kapları' } },
      { id: 'cat-health', name: { EN: 'Cat Health Products', TR: 'Kedi Sağlık Ürünleri' } }
    ]
  },
  {
    id: 'birds',
    name: { EN: 'Birds', TR: 'Kuşlar' },
    subcategories: [
      { id: 'bird-food', name: { EN: 'Bird Food', TR: 'Kuş Yemi' } },
      { id: 'bird-treats', name: { EN: 'Bird Treats', TR: 'Kuş Ödülleri' } },
      { id: 'bird-cages', name: { EN: 'Bird Cages', TR: 'Kuş Kafesleri' } },
      { id: 'bird-toys', name: { EN: 'Bird Toys', TR: 'Kuş Oyuncakları' } },
      { id: 'bird-perches', name: { EN: 'Bird Perches', TR: 'Kuş Tünekleri' } },
      { id: 'bird-feeders', name: { EN: 'Bird Feeders & Water Containers', TR: 'Kuş Yemlikleri ve Sulukları' } },
      { id: 'bird-vitamins', name: { EN: 'Bird Vitamins & Supplements', TR: 'Kuş Vitamin ve Takviyeleri' } },
      { id: 'bird-care', name: { EN: 'Bird Care Products', TR: 'Kuş Bakım Ürünleri' } },
      { id: 'bird-cage-accessories', name: { EN: 'Bird Cage Accessories', TR: 'Kuş Kafes Aksesuarları' } },
      { id: 'bird-hygiene', name: { EN: 'Bird Hygiene Products', TR: 'Kuş Hijyen Ürünleri' } }
    ]
  },
  {
    id: 'fish',
    name: { EN: 'Fish', TR: 'Balıklar' },
    subcategories: [
      { id: 'fish-food', name: { EN: 'Fish Food', TR: 'Balık Yemi' } },
      { id: 'aquariums', name: { EN: 'Aquariums', TR: 'Akvaryumlar' } },
      { id: 'aquarium-filters', name: { EN: 'Aquarium Filters', TR: 'Akvaryum Filtreleri' } },
      { id: 'aquarium-decorations', name: { EN: 'Aquarium Decorations', TR: 'Akvaryum Dekorasyonları' } },
      { id: 'aquarium-lighting', name: { EN: 'Aquarium Lighting', TR: 'Akvaryum Aydınlatma' } },
      { id: 'aquarium-cleaning', name: { EN: 'Aquarium Cleaning Products', TR: 'Akvaryum Temizlik Ürünleri' } },
      { id: 'water-conditioners', name: { EN: 'Water Conditioners', TR: 'Su Düzenleyiciler' } },
      { id: 'aquarium-heaters', name: { EN: 'Aquarium Heaters', TR: 'Akvaryum Isıtıcıları' } },
      { id: 'fish-health', name: { EN: 'Fish Health Products', TR: 'Balık Sağlık Ürünleri' } }
    ]
  },
  {
    id: 'rodents',
    name: { EN: 'Rodents', TR: 'Kemirgenler' },
    subcategories: [
      { id: 'rodent-food', name: { EN: 'Rodent Food', TR: 'Kemirgen Yemi' } },
      { id: 'rodent-treats', name: { EN: 'Rodent Treats', TR: 'Kemirgen Ödülleri' } },
      { id: 'rodent-cages', name: { EN: 'Rodent Cages', TR: 'Kemirgen Kafesleri' } },
      { id: 'rodent-bedding', name: { EN: 'Rodent Bedding', TR: 'Kemirgen Taban Malzemesi' } },
      { id: 'rodent-toys', name: { EN: 'Rodent Toys', TR: 'Kemirgen Oyuncakları' } },
      { id: 'rodent-wheels', name: { EN: 'Rodent Wheels & Exercise Products', TR: 'Kemirgen Çarkları ve Egzersiz Ürünleri' } },
      { id: 'rodent-feeders', name: { EN: 'Rodent Feeders & Water Bottles', TR: 'Kemirgen Yemlikleri ve Sulukları' } },
      { id: 'rodent-hygiene', name: { EN: 'Rodent Hygiene Products', TR: 'Kemirgen Hijyen Ürünleri' } },
      { id: 'rodent-care', name: { EN: 'Rodent Care Products', TR: 'Kemirgen Bakım Ürünleri' } }
    ]
  },
  {
    id: 'reptiles',
    name: { EN: 'Reptiles', TR: 'Sürüngenler' },
    subcategories: [
      { id: 'reptile-food', name: { EN: 'Reptile Food', TR: 'Sürüngen Yemi' } },
      { id: 'terrariums', name: { EN: 'Terrariums', TR: 'Teraryumlar' } },
      { id: 'uvb-lighting', name: { EN: 'UVB Lighting', TR: 'UVB Aydınlatma' } },
      { id: 'reptile-health', name: { EN: 'Reptile Health Products', TR: 'Sürüngen Sağlık Ürünleri' } },
      { id: 'reptile-care', name: { EN: 'Reptile Care Products', TR: 'Sürüngen Bakım Ürünleri' } }
    ]
  }
];
