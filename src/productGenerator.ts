import { CATEGORIES } from './categories';
import { Product } from './CategoryPage';

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function pickRandom<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

const BRAND_POOLS = {
  dogs: ['Royal Canin', 'Pro Plan', 'Acana', 'Orijen', "Hill's Science Diet", 'Taste of the Wild', 'Blue Buffalo', 'KONG', 'Ruffwear', 'Chuckit!', 'Julius-K9', 'Nylabone', 'Eukanuba', 'Pedigree', 'Brit Care', 'N&D'],
  cats: ['Royal Canin', 'Pro Plan', 'N&D', 'Whiskas', 'Gimcat', 'Catit', 'Felix', 'Orijen', 'Tidy Cats', 'Ever Clean', 'Sanicat', 'Bozita', 'Meow Mix', 'Purina ONE', 'Hills'],
  birds: ['Versele-Laga', 'Hagen', 'ZuPreem', 'Kaytee', 'Vitakraft', 'Penn-Plax', 'Prevue Hendryx', 'Living World', 'Harrison\'s Bird Foods', 'Lafeber'],
  fish: ['Fluval', 'Tetra', 'Hikari', 'Seachem', 'API', 'Eheim', 'Aqueon', 'JBL', 'Sera', 'AquaClear', 'MarineLand', 'Omega One'],
  rodents: ['Oxbow', 'Supreme Petfoods', 'Mazuri', 'Kaytee', 'Living World', 'Ferplast', 'Vitakraft', 'Rosewood', 'CareFresh', 'Tiny Friends Farm'],
  reptiles: ['Exo Terra', 'Zoo Med', 'Fluker\'s', 'Repashy', 'Zilla', 'Arcadia', 'Pangea', 'Komodo', 'Repti Planet', 'Nature\'s Ocean'],
};

const NOUN_MAP: Record<string, { en: string, tr: string, isFood: boolean, flavorOrMat: string[], weights?: string[] }[]> = {
  // --- DOGS ---
  'dog-dry-food': [
    { en: 'Adult Dry Dog Food', tr: 'Yetişkin Kuru Köpek Maması', isFood: true, flavorOrMat: ['Chicken', 'Lamb', 'Salmon', 'Beef', 'Turkey'], weights: ['1 kg', '3 kg', '10 kg', '14 kg'] },
    { en: 'Puppy Formula Kibble', tr: 'Yavru Kuru Köpek Maması', isFood: true, flavorOrMat: ['Chicken & Rice', 'Lamb & Oatmeal'], weights: ['1.5 kg', '5 kg', '12 kg'] },
    { en: 'Senior Diet Dry Food', tr: 'Yaşlı Köpek Kuru Maması', isFood: true, flavorOrMat: ['Turkey & Venison', 'Chicken'], weights: ['2 kg', '7 kg'] },
    { en: 'Grain-Free Dry Food', tr: 'Tahılsız Kuru Mama', isFood: true, flavorOrMat: ['Salmon', 'Duck', 'Wild Boar'], weights: ['2 kg', '5 kg'] }
  ],
  'dog-wet-food': [
    { en: 'Wet Canned Food', tr: 'Konserve Köpek Maması', isFood: true, flavorOrMat: ['Beef Chunk', 'Chicken Pate', 'Lamb Cuts'], weights: ['400 g', '800 g'] },
    { en: 'Pouch Meal with Gravy', tr: 'Soslu Poşet Mama', isFood: true, flavorOrMat: ['Turkey in Gravy', 'Chicken with Vegetables'], weights: ['100 g', '150 g'] },
  ],
  'dog-treats': [
    { en: 'Chewy Training Treats', tr: 'Yumuşak Eğitim Ödülü', isFood: true, flavorOrMat: ['Beef', 'Chicken', 'Peanut Butter'], weights: ['100 g', '200 g'] },
    { en: 'Dental Cleaning Sticks', tr: 'Diş Temizleyici Çubuk', isFood: true, flavorOrMat: ['Mint', 'Chicken'], weights: ['7 pcs', '14 pcs', '28 pcs'] },
    { en: 'Natural Bones', tr: 'Doğal Kemik Ödülü', isFood: true, flavorOrMat: ['Smoked Beef', 'Bacon'], weights: ['1 pc', '2 pcs'] }
  ],
  'dog-toys': [
    { en: 'Indestructible Rubber Ball', tr: 'Parçalanmaz Kauçuk Top', isFood: false, flavorOrMat: ['Red Rubber', 'Blue Rubber'] },
    { en: 'Rope Tug Toy', tr: 'Çekişme İpi', isFood: false, flavorOrMat: ['Cotton', 'Hemp'] },
    { en: 'Squeaky Plush Toy', tr: 'Sesli Peluş Oyuncak', isFood: false, flavorOrMat: ['Fox', 'Bear', 'Squirrel'] },
    { en: 'Frisbee', tr: 'Frizbi', isFood: false, flavorOrMat: ['Plastic', 'Flexible Rubber'] }
  ],
  'dog-collars': [
    { en: 'Adjustable Nylon Collar', tr: 'Ayarlanabilir Naylon Tasma', isFood: false, flavorOrMat: ['Red', 'Blue', 'Black', 'Green'] },
    { en: 'Reflective No-Pull Harness', tr: 'Reflektörlü Göğüs Tasması', isFood: false, flavorOrMat: ['Orange', 'Yellow', 'Black'] },
    { en: 'Retractable Leash 5m', tr: 'Makaralı Gezdirme Tasması 5m', isFood: false, flavorOrMat: ['Grey', 'Black', 'Red'] }
  ],
  'dog-clothing': [
    { en: 'Waterproof Raincoat', tr: 'Su Geçirmez Yağmurluk', isFood: false, flavorOrMat: ['Yellow', 'Red', 'Transparent'] },
    { en: 'Winter Knitted Sweater', tr: 'Örgü Kışlık Kazak', isFood: false, flavorOrMat: ['Grey', 'Navy', 'Burgundy'] },
    { en: 'Cooling Vest', tr: 'Serinletici Yelek', isFood: false, flavorOrMat: ['Blue', 'Silver'] }
  ],
  'dog-beds': [
    { en: 'Orthopedic Memory Foam Bed', tr: 'Ortopedik Hafızalı Yatak', isFood: false, flavorOrMat: ['Grey', 'Beige', 'Brown'] },
    { en: 'Donut Cuddler Bed', tr: 'Yuvarlak Pofuduk Yatak', isFood: false, flavorOrMat: ['Cream', 'Dark Grey', 'Pink'] },
    { en: 'Waterproof Outdoor Bed', tr: 'Dış Mekan Yatağı', isFood: false, flavorOrMat: ['Black', 'Olive Green'] }
  ],
  'dog-grooming': [
    { en: 'Deshedding Brush', tr: 'Tüy Toplayıcı Fırça', isFood: false, flavorOrMat: ['Stainless Steel & Plastic'] },
    { en: 'Nail Clippers', tr: 'Tırnak Makası', isFood: false, flavorOrMat: ['Stainless Steel'] },
    { en: 'Grooming Scissors Set', tr: 'Kuaför Makas Seti', isFood: false, flavorOrMat: ['Silver'] }
  ],
  'dog-shampoo': [
    { en: 'Oatmeal Soothing Shampoo', tr: 'Yulaf Özlü Şampuan', isFood: false, flavorOrMat: ['Oatmeal & Aloe'], weights: ['400 ml', '1 L'] },
    { en: 'Flea & Tick Shampoo', tr: 'Pire ve Kene Karşıtı Şampuan', isFood: false, flavorOrMat: ['Neem Oil Extract'], weights: ['250 ml', '500 ml'] },
    { en: 'Waterless Paw Cleaner', tr: 'Köpük Patı Temizleyici', isFood: false, flavorOrMat: ['Lavender'], weights: ['150 ml'] }
  ],
  'dog-vitamins': [
    { en: 'Glucosamine Joint Support', tr: 'Eklem Koruyucu Glukozamin', isFood: true, flavorOrMat: ['Beef Flavored Tablets'], weights: ['60 Tablets', '120 Tablets'] },
    { en: 'Multivitamin Paste', tr: 'Multivitamin Macunu', isFood: true, flavorOrMat: ['Liver Flavor'], weights: ['100 g'] },
    { en: 'Salmon Oil', tr: 'Somon Yağı', isFood: true, flavorOrMat: ['Pure Salmon'], weights: ['250 ml', '500 ml', '1 L'] }
  ],
  'dog-training': [
    { en: 'Training Clicker', tr: 'Eğitim Klikeri', isFood: false, flavorOrMat: ['Red', 'Blue', 'Black'] },
    { en: 'Housebreaking Pad', tr: 'Çiş Pedi', isFood: false, flavorOrMat: ['Super Absorbent Core'], weights: ['10 pcs', '30 pcs', '100 pcs'] },
    { en: 'Agility Tunnel', tr: 'Çeviklik Tüneli', isFood: false, flavorOrMat: ['Nylon'] }
  ],
  'dog-carriers': [
    { en: 'Travel Carrier Cage', tr: 'Seyahat Taşıma Çantası', isFood: false, flavorOrMat: ['Grey plastic', 'Blue plastic'] },
    { en: 'Car Seat Cover', tr: 'Araç Koltuk Örtüsü', isFood: false, flavorOrMat: ['Black Waterproof Fabric'] },
    { en: 'Soft Sided Carrier', tr: 'Kumaş Taşıma Çantası', isFood: false, flavorOrMat: ['Grey', 'Black'] }
  ],
  'dog-bowls': [
    { en: 'Stainless Steel Non-slip Bowl', tr: 'Kaymaz Çelik Mama Kabı', isFood: false, flavorOrMat: ['Stainless Steel'] },
    { en: 'Slow Feeder Bowl', tr: 'Yavaş Yeme Kabı', isFood: false, flavorOrMat: ['Green Plastic', 'Blue Plastic'] },
    { en: 'Automatic Water Fountain', tr: 'Otomatik Su Pınarı', isFood: false, flavorOrMat: ['White Plastic', 'Stainless Steel'] }
  ],
  'dog-health': [
    { en: 'Wormer Tablets', tr: 'İç Parazit Tableti', isFood: true, flavorOrMat: ['Beef Flavor'], weights: ['2 Tabs', '4 Tabs'] },
    { en: 'First Aid Kit', tr: 'İlk Yardım Seti', isFood: false, flavorOrMat: ['Standard Kit'] },
    { en: 'Wound Spray', tr: 'Yara Bakım Spreyi', isFood: false, flavorOrMat: ['Aloe & Herbs'], weights: ['100 ml'] }
  ],
  
  // --- CATS ---
  'cat-dry-food': [
    { en: 'Indoor Adult Dry Cat Food', tr: 'Ev İçi Yetişkin Kedi Maması', isFood: true, flavorOrMat: ['Chicken', 'Salmon', 'Turkey'], weights: ['1.5 kg', '3 kg', '10 kg'] },
    { en: 'Sterilised Dry Food', tr: 'Kısırlaştırılmış Kuru Mama', isFood: true, flavorOrMat: ['Tuna', 'Duck', 'Chicken'], weights: ['1.5 kg', '5 kg', '10 kg'] },
    { en: 'Kitten Dry Formula', tr: 'Yavru Kuru Kedi Maması', isFood: true, flavorOrMat: ['Chicken & Rice'], weights: ['1.5 kg', '3 kg'] }
  ],
  'cat-wet-food': [
    { en: 'Wet Food in Gravy Pouch', tr: 'Soslu Yaş Mama Kesesi', isFood: true, flavorOrMat: ['Chicken', 'Salmon', 'Beef & Liver'], weights: ['85 g', '100 g'] },
    { en: 'Premium Pate Canned Food', tr: 'Premium Ezme Konserve Mama', isFood: true, flavorOrMat: ['Tuna', 'Ocean Fish'], weights: ['200 g', '400 g'] }
  ],
  'cat-treats': [
    { en: 'Crunchy Cat Treats', tr: 'Kıtır Kedi Ödülü', isFood: true, flavorOrMat: ['Cheese', 'Salmon', 'Tuna'], weights: ['60 g', '100 g'] },
    { en: 'Liquid Snack Sticks', tr: 'Sıvı Ödül Çubukları', isFood: true, flavorOrMat: ['Salmon', 'Chicken'], weights: ['4x15g', '8x15g'] }
  ],
  'cat-toys': [
    { en: 'Feather Wand Teaser', tr: 'Tüylü Kedi Oltası', isFood: false, flavorOrMat: ['Feather & Wood', 'Feather & Plastic'] },
    { en: 'Catnip Mice', tr: 'Kedi Otlu Fare Oyuncak', isFood: false, flavorOrMat: ['Plush'] },
    { en: 'Interactive Laser Pointer', tr: 'İnteraktif Lazer İşaretleyici', isFood: false, flavorOrMat: ['Plastic'] },
    { en: 'Catnip Ball', tr: 'Kedi Otu Topu', isFood: false, flavorOrMat: ['Natural Catnip'] }
  ],
  'cat-litter': [
    { en: 'Clumping Bentonite Litter', tr: 'Topaklanan Bentonit Kum', isFood: false, flavorOrMat: ['Lavender', 'Baby Powder', 'Unscented'], weights: ['5 L', '10 L', '20 L'] },
    { en: 'Flushable Tofu Litter', tr: 'Tuvalete Atılabilir Tofu Kum', isFood: false, flavorOrMat: ['Peach', 'Green Tea', 'Original'], weights: ['6 L', '18 L'] },
    { en: 'Silicate Crystal Litter', tr: 'Silika Kristal Kum', isFood: false, flavorOrMat: ['Unscented', 'Aloe'], weights: ['3.8 L', '7.6 L'] }
  ],
  'cat-litter-boxes': [
    { en: 'Closed Litter Box with Filter', tr: 'Filtreli Kapalı Kedi Tuvaleti', isFood: false, flavorOrMat: ['Grey', 'Blue', 'Pink'] },
    { en: 'Automatic Self-Cleaning Litter Box', tr: 'Otomatik Kedi Tuvaleti', isFood: false, flavorOrMat: ['White', 'Black'] },
    { en: 'High-Sided Open Litter Pan', tr: 'Yüksek Kenarlı Açık Tuvalet', isFood: false, flavorOrMat: ['Grey', 'Beige'] }
  ],
  'cat-scratchers': [
    { en: 'Corrugated Cardboard Scratcher', tr: 'Oluklu Karton Tırmalama', isFood: false, flavorOrMat: ['Cardboard'] },
    { en: 'Tall Sisal Scratching Post', tr: 'Uzun Sisal Tırmalama Direği', isFood: false, flavorOrMat: ['Sisal Rope & Wood'] },
    { en: 'Cat Tree Tower', tr: 'Kedi Tırmalama Ağacı Ev', isFood: false, flavorOrMat: ['Plush & Sisal'] }
  ],
  'cat-beds': [
    { en: 'Radiator Bed', tr: 'Kalorifer Yatağı', isFood: false, flavorOrMat: ['White Plush', 'Grey Fabric'] },
    { en: 'Window Hammock', tr: 'Cam Önü Hamak', isFood: false, flavorOrMat: ['Grey', 'Black Suction Cups'] },
    { en: 'Cave Hideout Bed', tr: 'Mağara Tipi Kapalı Yatak', isFood: false, flavorOrMat: ['Felt', 'Plush'] }
  ],
  'cat-grooming': [
    { en: 'Furminator Deshedding Tool', tr: 'Tüy Alıcı Furminator Fırça', isFood: false, flavorOrMat: ['Short Hair', 'Long Hair'] },
    { en: 'Massage Grooming Glove', tr: 'Tüy Toplayıcı Masaj Eldiveni', isFood: false, flavorOrMat: ['Blue', 'Red'] },
    { en: 'Cat Nail Clippers', tr: 'Kedi Tırnak Makası', isFood: false, flavorOrMat: ['Stainless Steel'] }
  ],
  'cat-vitamins': [
    { en: 'Hairball Anti-Hairball Malt Paste', tr: 'Tüy Yumağı Önleyici Malt Macun', isFood: true, flavorOrMat: ['Malt flavor'], weights: ['100 g', '200 g'] },
    { en: 'Multivitamin Paste', tr: 'Multivitamin Macun', isFood: true, flavorOrMat: ['Cheese flavor'], weights: ['100 g'] }
  ],
  'cat-carriers': [
    { en: 'Hard Sided Pet Carrier', tr: 'Sert Taşıma Çantası', isFood: false, flavorOrMat: ['Blue', 'Grey', 'Pink'] },
    { en: 'Airline Approved Soft Carrier', tr: 'Uçak Onaylı Kumaş Çanta', isFood: false, flavorOrMat: ['Black', 'Grey'] },
    { en: 'Astronaut Backpack Carrier', tr: 'Astronot Kedi Taşıma Sırt Çantası', isFood: false, flavorOrMat: ['Yellow', 'Red', 'Black'] }
  ],
  'cat-bowls': [
    { en: 'Elevated Double Ceramic Bowl', tr: 'Yükseltilmiş İkili Seramik Kap', isFood: false, flavorOrMat: ['White Ceramic & Wood'] },
    { en: 'Stainless Steel Saucer', tr: 'Paslanmaz Çelik Yayvan Kap', isFood: false, flavorOrMat: ['Steel'] },
    { en: 'Quiet Water Fountain 2L', tr: 'Sessiz Su Pınarı 2L', isFood: false, flavorOrMat: ['White Plastic', 'Stainless Steel'] }
  ],
  'cat-health': [
    { en: 'Feliway Calming Diffuser', tr: 'Feliway Sakinleştirici Difüzör', isFood: false, flavorOrMat: ['Pheromone Solution'] },
    { en: 'Eye & Ear Wipes', tr: 'Göz ve Kulak Temizleme Mendili', isFood: false, flavorOrMat: ['Aloe Vera'], weights: ['50 pcs'] }
  ],
  
  // --- BIRDS ---
  'bird-food': [
    { en: 'Budgie Seed Mix', tr: 'Muhabbet Kuşu Yemi', isFood: true, flavorOrMat: ['Seeds'], weights: ['500 g', '1 kg', '3 kg'] },
    { en: 'Parrot Complete Pellets', tr: 'Papağan Pelet Yemi', isFood: true, flavorOrMat: ['Fruit Flavor', 'Nut Flavor'], weights: ['1 kg', '2 kg'] },
    { en: 'Canary Seed Blend', tr: 'Kanarya Yemi', isFood: true, flavorOrMat: ['Mixed Seeds'], weights: ['500 g', '1 kg'] }
  ],
  'bird-treats': [
    { en: 'Honey Seed Sticks', tr: 'Ballı Kraker Ödülü', isFood: true, flavorOrMat: ['Honey & Fruit', 'Honey & Egg'], weights: ['2 pcs', '4 pcs'] },
    { en: 'Millet Sprays', tr: 'Daldarı', isFood: true, flavorOrMat: ['Yellow Millet', 'Red Millet'], weights: ['250 g', '500 g'] }
  ],
  'bird-cages': [
    { en: 'Large Flight Cage', tr: 'Geniş Uçuş Kafesi', isFood: false, flavorOrMat: ['White Wire', 'Black Wire'] },
    { en: 'Decorative Parakeet Cage', tr: 'Dekoratif Muhabbet Kafesi', isFood: false, flavorOrMat: ['Gold', 'White'] }
  ],
  'bird-toys': [
    { en: 'Wooden Chewing Blocks', tr: 'Ahşap Çiğneme Blokları', isFood: false, flavorOrMat: ['Colorful Wood'] },
    { en: 'Bell and Mirror Toy', tr: 'Zilli ve Aynalı Oyuncak', isFood: false, flavorOrMat: ['Plastic & Metal'] },
    { en: 'Coconut Fiber Foraging Toy', tr: 'Hindistan Cevizi Oyuncağı', isFood: false, flavorOrMat: ['Natural Fiber'] }
  ],
  'bird-perches': [
    { en: 'Natural Java Wood Branch', tr: 'Doğal Java Ağacı Tünek', isFood: false, flavorOrMat: ['Wood'] },
    { en: 'Mineral Nail Sanding Perch', tr: 'Tırnak Törpülü Mineral Tünek', isFood: false, flavorOrMat: ['Calcium Sand'] },
    { en: 'Cotton Rope Bungee', tr: 'Pamuk Halat Salıncak Tünek', isFood: false, flavorOrMat: ['Multi-color Cotton'] }
  ],
  'bird-feeders': [
    { en: 'Outside Seed Feeder', tr: 'Dıştan Takmalı Yemlik', isFood: false, flavorOrMat: ['Transparent Plastic'] },
    { en: 'Stainless Steel Coop Cup', tr: 'Kafes İçi Çelik Kap', isFood: false, flavorOrMat: ['Stainless Steel'] },
    { en: 'Automatic Water Tube', tr: 'Otomatik Suluk', isFood: false, flavorOrMat: ['Plastic'] }
  ],
  'bird-vitamins': [
    { en: 'Liquid Multivitamin Drops', tr: 'Sıvı Multivitamin Damla', isFood: true, flavorOrMat: ['Berry flavor'], weights: ['30 ml', '50 ml'] },
    { en: 'Cuttlebone Calcium Block', tr: 'Kalamar Kemiği ve Kalsiyum Bloğu', isFood: true, flavorOrMat: ['Natural'], weights: ['1 pc', '2 pcs'] }
  ],
  'bird-care': [
    { en: 'Nail and Beak Clipper', tr: 'Tırnak ve Gaga Makası', isFood: false, flavorOrMat: ['Steel'] }
  ],
  'bird-cage-accessories': [
    { en: 'Cage Cover', tr: 'Kafes Örtüsü', isFood: false, flavorOrMat: ['Dark Blue Fabric'] },
    { en: 'Cage Bottom Sand Paper', tr: 'Taban Kumu/Kağıdı', isFood: false, flavorOrMat: ['Sandpaper'], weights: ['10 pcs'] }
  ],
  'bird-hygiene': [
    { en: 'Mite & Lice Spray', tr: 'Bit ve Parazit Spreyi', isFood: false, flavorOrMat: ['Natural Oils'], weights: ['150 ml'] },
    { en: 'Bird Bath Shower Spray', tr: 'Kuş Banyosu Spreyi', isFood: false, flavorOrMat: ['Aloe Vera'], weights: ['200 ml'] }
  ],
  
  // --- FISH (formerly aquatic) ---
  'fish-food': [
    { en: 'Tropical Color Flakes', tr: 'Tropikal Renk Pul Yem', isFood: true, flavorOrMat: ['Algae & Shrimp'], weights: ['50 g', '200 g', '500 g'] },
    { en: 'Sinking Algae Wafers', tr: 'Batan Spirulina Tablet Yemi', isFood: true, flavorOrMat: ['Spirulina'], weights: ['100 g', '250 g'] },
    { en: 'Cichlid Floating Pellets', tr: 'Ciklet Yüzen Pelet Yem', isFood: true, flavorOrMat: ['Fish Meal'], weights: ['250 g', '1 kg'] },
    { en: 'Betta Enhancing Micro-Pellets', tr: 'Betta Renk Yemi', isFood: true, flavorOrMat: ['Krill'], weights: ['20 g', '50 g'] }
  ],
  'aquariums': [
    { en: 'Glass Aquarium Tank 50L', tr: 'Cam Akvaryum 50L', isFood: false, flavorOrMat: ['Glass'] },
    { en: 'Complete Nano Aquarium Kit 30L', tr: 'Nano Akvaryum Seti 30L', isFood: false, flavorOrMat: ['Glass & Plastic'] },
    { en: 'Large Curved Front Aquarium 200L', tr: 'Bombeli Büyük Akvaryum 200L', isFood: false, flavorOrMat: ['Glass & Wood Stand'] }
  ],
  'aquarium-filters': [
    { en: 'External Canister Filter 1000L/H', tr: 'Dış Filtre 1000L/S', isFood: false, flavorOrMat: ['Grey Plastic'] },
    { en: 'Internal Sponge Filter', tr: 'Pipo Sünger Filtre', isFood: false, flavorOrMat: ['Sponge'] },
    { en: 'Hang-On Back Power Filter', tr: 'Şelale Askı Filtre', isFood: false, flavorOrMat: ['Clear Plastic'] },
    { en: 'Filter Media Ceramic Rings', tr: 'Filtre Malzemesi Seramik Halka', isFood: false, flavorOrMat: ['Ceramic'], weights: ['500 g', '1 kg'] }
  ],
  'aquarium-decorations': [
    { en: 'Natural Driftwood Spider Wood', tr: 'Doğal Yati Kökü', isFood: false, flavorOrMat: ['Wood'] },
    { en: 'Dragon Stone Rocks Set', tr: 'Ejderha Taşı Kaya Seti', isFood: false, flavorOrMat: ['Stone'], weights: ['3 kg', '5 kg'] },
    { en: 'Resin Castle Ornament', tr: 'Reçine Şato Dekoru', isFood: false, flavorOrMat: ['Resin'] },
    { en: 'Silk Fake Aquarium Plants', tr: 'Yapay Akvaryum Bitkisi', isFood: false, flavorOrMat: ['Silk & Plastic'] }
  ],
  'aquarium-lighting': [
    { en: 'Full Spectrum LED Planted Light', tr: 'Bitkili Akvaryum LED Aydınlatma', isFood: false, flavorOrMat: ['Aluminum'] },
    { en: 'Submersible Color LED Tube', tr: 'Dalgıç Renkli LED Lamba', isFood: false, flavorOrMat: ['Glass Tube'] }
  ],
  'aquarium-cleaning': [
    { en: 'Gravel Siphon Vacuum Cleaner', tr: 'Dip Sifonu Akvaryum Süpürgesi', isFood: false, flavorOrMat: ['Plastic PVC'] },
    { en: 'Magnetic Glass Algae Scraper', tr: 'Mıknatıslı Akvaryum Cam Sileceği', isFood: false, flavorOrMat: ['Plastic / Magnets'] }
  ],
  'water-conditioners': [
    { en: 'Tap Water Dechlorinator Conditioner', tr: 'Musluk Suyu Klor Giderici', isFood: false, flavorOrMat: ['Liquid'], weights: ['100 ml', '250 ml', '500 ml'] },
    { en: 'Beneficial Bacteria Starter', tr: 'Bakteri Kültürü Başlatıcı', isFood: false, flavorOrMat: ['Liquid'], weights: ['250 ml'] }
  ],
  'aquarium-heaters': [
    { en: 'Submersible Adjustable Heater 100W', tr: 'Ayarlanabilir Isıtıcı 100W', isFood: false, flavorOrMat: ['Glass'] },
    { en: 'Submersible Adjustable Heater 300W', tr: 'Ayarlanabilir Isıtıcı 300W', isFood: false, flavorOrMat: ['Titanium'] }
  ],
  'fish-health': [
    { en: 'Ich & Parasite Treatment', tr: 'Beyaz Benek Tedavi İlacı', isFood: false, flavorOrMat: ['Liquid Application'], weights: ['100 ml'] },
    { en: 'Fungus Cure Drops', tr: 'Mantar İlacı', isFood: false, flavorOrMat: ['Liquid Application'], weights: ['50 ml'] }
  ],
  'aquarium-accessories': [
    { en: 'Air Pump Dual Outlet', tr: 'Çift Çıkışlı Hava Motoru', isFood: false, flavorOrMat: ['Plastic'] },
    { en: 'Air Stone Disc', tr: 'Hava Taşı Diski', isFood: false, flavorOrMat: ['Stone'] },
    { en: 'Digital Water Thermometer', tr: 'Dijital Su Termometresi', isFood: false, flavorOrMat: ['LCD Screen'] }
  ],
  
  // --- RODENTS ---
  'rodent-food': [
    { en: 'Guinea Pig Complete Pellets', tr: 'Ginepig Pelet Yemi', isFood: true, flavorOrMat: ['Alfalfa & Vitamin C'], weights: ['1 kg', '2.5 kg'] },
    { en: 'Hamster Seed & Nut Mix', tr: 'Hamster Yemi', isFood: true, flavorOrMat: ['Mixed Seeds'], weights: ['500 g', '1 kg'] },
    { en: 'Rabbit Timothy Hay', tr: 'Tavşan Timothy Otu', isFood: true, flavorOrMat: ['Sun-dried Hay'], weights: ['1 kg', '2 kg'] }
  ],
  'rodent-treats': [
    { en: 'Yogurt Drops', tr: 'Yoğurtlu Ödül Damlaları', isFood: true, flavorOrMat: ['Yogurt Flavor', 'Berry Flavor'], weights: ['50 g', '100 g'] },
    { en: 'Apple Wood Chew Sticks', tr: 'Elma Ağacı Kemirme Çubukları', isFood: true, flavorOrMat: ['Apple Wood'], weights: ['100 g'] }
  ],
  'rodent-cages': [
    { en: 'Large Multi-level Hamster Cage', tr: 'Katlı Büyük Hamster Kafesi', isFood: false, flavorOrMat: ['Wire & Plastic Base'] },
    { en: 'Guinea Pig Indoor Hutch', tr: 'Ginepig İç Mekan Kafesi', isFood: false, flavorOrMat: ['Wire', 'Wood'] }
  ],
  'rodent-bedding': [
    { en: 'Paper Odor Control Bedding', tr: 'Koku Kontrollü Kağıt Taban', isFood: false, flavorOrMat: ['Recycled Paper'], weights: ['10 L', '20 L'] },
    { en: 'Dust-free Wood Shavings', tr: 'Tozsuz Talaş Taban Malzemesi', isFood: false, flavorOrMat: ['Pine Wood'], weights: ['15 L', '60 L'] }
  ],
  'rodent-toys': [
    { en: 'Woven Grass Tunnel Hut', tr: 'Hasır Ot Tüneli', isFood: false, flavorOrMat: ['Woven Grass'] },
    { en: 'Wooden Hanging Chew Toy', tr: 'Ahşap Asılı Kemirme Oyuncağı', isFood: false, flavorOrMat: ['Wood'] }
  ],
  'rodent-wheels': [
    { en: 'Silent Spinner Exercise Wheel 20cm', tr: 'Sessiz Egzersiz Çarkı 20cm', isFood: false, flavorOrMat: ['Plastic'] },
    { en: 'Wooden Flying Saucer Wheel', tr: 'Ahşap Disk Çark', isFood: false, flavorOrMat: ['Wood'] }
  ],
  'rodent-feeders': [
    { en: 'Ceramic Heavy Food Bowl', tr: 'Devrilmez Seramik Yemlik', isFood: false, flavorOrMat: ['Ceramic'] },
    { en: 'Drip-proof Glass Water Bottle', tr: 'Damlama Yapmayan Suluk', isFood: false, flavorOrMat: ['Glass & Metal'] }
  ],
  'rodent-hygiene': [
    { en: 'Chinchilla Bathing Dust', tr: 'Çinçilla Banyo Kumu', isFood: false, flavorOrMat: ['Volcanic Ash'], weights: ['1 kg'] },
    { en: 'Small Animal Cage Cleaning Spray', tr: 'Kafes Temizleyici Sprey', isFood: false, flavorOrMat: ['Enzyme Base'], weights: ['500 ml'] }
  ],
  'rodent-care': [
    { en: 'Soft Bristle Grooming Brush', tr: 'Yumuşak Kıllı Fırça', isFood: false, flavorOrMat: ['Wood Handle'] }
  ],
  
  // --- REPTILES ---
  'reptile-food': [
    { en: 'Crested Gecko Diet Powder', tr: 'Tepeli Geko Toz Mama', isFood: true, flavorOrMat: ['Watermelon', 'Papaya'], weights: ['100 g', '225 g'] },
    { en: 'Dried Mealworms', tr: 'Kurutulmuş Unkurdu', isFood: true, flavorOrMat: ['Mealworms'], weights: ['50 g', '100 g'] },
    { en: 'Aquatic Turtle Floating Pellets', tr: 'Su Kaplumbağası Yüzen Yem', isFood: true, flavorOrMat: ['Fish & Shrimp'], weights: ['250 g', '1 kg'] },
    { en: 'Bearded Dragon Pellets', tr: 'Sakal Ejder Yemi', isFood: true, flavorOrMat: ['Vegetable Base'], weights: ['250 g'] }
  ],
  'terrariums': [
    { en: 'Front-Opening Glass Terrarium 30x30x45cm', tr: 'Önden Açılır Cam Teraryum', isFood: false, flavorOrMat: ['Glass & Mesh'] },
    { en: 'Screen Mesh Chameleon Enclosure', tr: 'File Bukalemun Kafesi', isFood: false, flavorOrMat: ['Flexible Mesh'] }
  ],
  'heating-lamps': [
    { en: 'Ceramic Heat Emitter 100W', tr: 'Işıksız Seramik Isıtıcı Ampul', isFood: false, flavorOrMat: ['Ceramic'] },
    { en: 'Basking Spot Bulb 75W', tr: 'Güneşlenme Isıtıcı Spot Lamba', isFood: false, flavorOrMat: ['Glass'] }
  ],
  'uvb-lighting': [
    { en: 'UVB 150 Compact Fluorescent Bulb 25W', tr: 'UVB 150 Kompakt Lamba', isFood: false, flavorOrMat: ['Glass'] },
    { en: 'T5 HO UVB Strip Light', tr: 'T5 UVB Floresan Tüp Lamba', isFood: false, flavorOrMat: ['Glass'] }
  ],
  'reptile-substrates': [
    { en: 'Coconut Husk Fiber Block', tr: 'Sıkıştırılmış Cocolith Torf', isFood: false, flavorOrMat: ['Coconut Fiber'], weights: ['600 g block'] },
    { en: 'Aspen Snake Bedding', tr: 'Yılan İçin Kavak Ağacı Tabanı', isFood: false, flavorOrMat: ['Aspen Wood'], weights: ['8 L', '24 L'] },
    { en: 'Reptile Desert Sand', tr: 'Çöl Kumu Sürüngen Tabanı', isFood: false, flavorOrMat: ['Red Sand', 'White Sand'], weights: ['4 kg', '10 kg'] }
  ],
  'reptile-decorations': [
    { en: 'Cork Bark Tube Hide', tr: 'Mantar Kabuğu Gizlenme Tüneli', isFood: false, flavorOrMat: ['Natural Cork'] },
    { en: 'Artificial Jungle Vine', tr: 'Bükülebilir Sarmaşık Dekoru', isFood: false, flavorOrMat: ['Foam & Wire'] },
    { en: 'Resin Skull Decor', tr: 'Reçine Kafatası Süs', isFood: false, flavorOrMat: ['Resin'] }
  ],
  'reptile-humidity': [
    { en: 'Automatic Reptile Fogger', tr: 'Otomatik Sisleyici Nemlendirici', isFood: false, flavorOrMat: ['Plastic Tank'] },
    { en: 'Digital Thermometer Hygrometer Combo', tr: 'Dijital Termometre & Higrometre', isFood: false, flavorOrMat: ['LCD Screen'] },
    { en: 'Heat Mat with Thermostat 14W', tr: 'Termostatlı Kalorifer Pedi', isFood: false, flavorOrMat: ['PVC'] }
  ],
  'reptile-feeding-accessories': [
    { en: 'Shallow Water Dish Rock Shaped', tr: 'Kaya Görünümlü Su Kabı', isFood: false, flavorOrMat: ['Resin'] },
    { en: 'Stainless Steel Feeding Tongs 25cm', tr: 'Besleme Cımbızı 25cm', isFood: false, flavorOrMat: ['Stainless Steel'] }
  ],
  'reptile-health': [
    { en: 'Calcium Powder with Vitamin D3', tr: 'D3 Vitaminli Kalsiyum Tozu', isFood: true, flavorOrMat: ['Calcium'], weights: ['100 g', '250 g'] },
    { en: 'Reptile Multivitamin Supplement', tr: 'Sürüngen Multivitamin', isFood: true, flavorOrMat: ['Powder'], weights: ['50 g'] }
  ],
  'reptile-care': [
    { en: 'Shedding Aid Spray', tr: 'Deri Değişim Kolaylaştırıcı Sprey', isFood: false, flavorOrMat: ['Liquid'], weights: ['250 ml'] }
  ]
};

// Return multiple products for a category
export function generateProductsByCategoryId(categoryId: string, parentCatId: string, count: number): Product[] {
  let mappedIds: string[] = [];
  
  if (categoryId === 'all') { // Fallback just mixing a bit of everything
    mappedIds = ['dog-dry-food', 'cat-dry-food', 'dog-toys', 'cat-toys', 'aquariums', 'reptile-food', 'bird-cages'];
  } else if (CATEGORY_PARENT_MAP[categoryId]) {
      // It is a parent category (like 'dogs', 'cats')
      mappedIds = CATEGORIES.find(c => c.id === categoryId)?.subcategories.map(s => s.id) || [categoryId];
  } else {
      // It is a specific subcategory
      mappedIds = [categoryId];
  }
  
  const products: Product[] = [];
  const imageContexts = CATEGORY_PARENT_MAP[parentCatId]?.imageContext || ['pet product'];
  
  for (let i = 0; i < count; i++) {
    const seed = i * Math.PI * 13.37 + categoryId.charCodeAt(0) * Math.E;
    
    // Pick subcategory
    const targetSubCat = pickRandom(mappedIds, seed);
    
    // Pick Brand from parent category
    const parentId = Object.keys(CATEGORY_PARENT_MAP).find(p => CATEGORIES.find(c => c.id === p)?.subcategories.some(s => s.id === targetSubCat)) || 'dogs';
    const brands = (BRAND_POOLS as any)[parentId] || BRAND_POOLS.dogs;
    const brand = pickRandom(brands, seed * 2) as string;
    
    // Nouns
    const nounList = NOUN_MAP[targetSubCat] || NOUN_MAP['dog-dry-food']; // fallback
    const nounInfo = pickRandom(nounList, seed * 3);
    
    const isEdible = nounInfo.isFood;
    const flavorOrMat = pickRandom(nounInfo.flavorOrMat, seed * 4);
    
    let weight, flavor, material;
    if (isEdible) {
      flavor = flavorOrMat;
      if (nounInfo.weights) {
        weight = pickRandom(nounInfo.weights, seed * 5);
      }
    } else {
      material = flavorOrMat;
      if (nounInfo.weights) {
        weight = pickRandom(nounInfo.weights, seed * 6);
      }
    }
    
    // Infer age & size
    const lowerEN = nounInfo.en.toLowerCase();
    let computedAge = 'All Stages';
    if (lowerEN.includes('puppy') || lowerEN.includes('kitten')) computedAge = 'Puppy/Kitten';
    else if (lowerEN.includes('senior')) computedAge = 'Senior';
    else if (lowerEN.includes('adult')) computedAge = 'Adult';
    
    let computedSize = 'All Sizes';
    if (lowerEN.includes('large')) computedSize = 'Large';
    else if (lowerEN.includes('small') || lowerEN.includes('nano')) computedSize = 'Small';
    
    // Build name
    let nameEN = `${brand} ${nounInfo.en}`;
    let nameTR = `${brand} ${nounInfo.tr}`;
    if (flavor && nounInfo.en.indexOf(flavor) === -1) {
       nameEN += ` - ${flavor}`;
       nameTR += ` - ${flavor}`;
    }
    if (weight) {
      nameEN += ` ${weight}`;
      nameTR += ` ${weight}`;
    }

    // Assign categories conceptually - CategoryPage uses it correctly
    // Price
    const basePrice = (Math.floor(seededRandom(seed * 7) * 250) + 10) * 10;
    const isDiscounted = seededRandom(seed * 8) > 0.7;
    const discountAmount = isDiscounted ? Math.floor(seededRandom(seed * 9) * 30) + 10 : 0;
    const discount = isDiscounted ? discountAmount : undefined;
    const price = isDiscounted ? Math.floor(basePrice * (1 - discountAmount / 100)) : basePrice;
    
    const sold = Math.floor(seededRandom(seed * 11) * 2000);
    const rating = null;
    const reviews = 0;
    
    // image
    const imageKeyword = encodeURIComponent(nounInfo.en);
    const categoryQuery = encodeURIComponent(imageContexts[0]);
    const image = `https://storage.googleapis.com/a11y-yogi/pet-store/products/${(Math.floor(seededRandom(seed * 10) * 8) + 1)}.jpg`;
    // We will just use the realistic image placeholder query instead of static 8 images to give more variety realistically. But wait, random unsplash is fine
    const realisticImage = `https://images.unsplash.com/photo-${1500000000000 + Math.floor(seededRandom(seed * 20) * 100000000)}?w=400&q=80`;
    // We'll stick to a clean UI logic: use generic placeholder from unsplash or generic URLs
    
    products.push({
      id: `${targetSubCat}-${i + 1}`,
      name: { EN: nameEN, TR: nameTR },
      brand,
      flavor,
      weight,
      material,
      age: computedAge,
      breedSize: computedSize,
      price,
      oldPrice: isDiscounted ? basePrice : undefined,
      discount,
      sold,
      rating,
      reviews,
      badges: isDiscounted ? ['SALE'] : (sold > 1000 ? ['BEST SELLER'] : []),
      image: `https://images.unsplash.com/photo-${1583337130417 + Math.floor(seededRandom(seed * 15) * 10000000)}?w=400&q=80` // generic pet vibe
    });
  }
  
  return products;
}

const CATEGORY_PARENT_MAP: Record<string, any> = {
  dogs: { imageContext: ['dog'] },
  cats: { imageContext: ['cat'] },
  birds: { imageContext: ['bird'] },
  fish: { imageContext: ['aquarium'] },
  rodents: { imageContext: ['hamster'] },
  reptiles: { imageContext: ['reptile'] }
}
