import { CATEGORIES } from "./categories";

export type Product = {
  id: string;
  name: { EN: string; TR: string };
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating?: number | null;
  reviews?: number | null;
  sold: number;
  stock: number;
  badges: string[];

  brand: string;
  flavor?: string;
  weight?: string;
  age?: string;
  breedSize?: string;
  material?: string;
  color?: string;
};

const BRANDS = {
  dogs: ["Royal Canin", "Pro Plan", "Hill's", "Acana", "Orijen", "N&D", "Mera", "Brit Care"],
  cats: ["Royal Canin", "Pro Plan", "Hill's", "Acana", "Orijen", "N&D", "Mera", "Brit Care"],
  birds: ["Versele-Laga", "Quik", "Vitakraft", "Jungle"],
  fish: ["Tetra", "JBL", "Sera", "Eheim"],
  rodents: ["Beaphar", "Ferplast", "Vitakraft", "Versele-Laga"],
  reptiles: ["Exo Terra", "Lucky Reptile", "Zoo Med", "Repti Planet"]
};

const PRODUCT_TEMPLATES: Record<string, { EN: string[], TR: string[] }> = {
  // DOGS
  "dog-dry-food": {
    EN: ["Dry Dog Food", "Grain Free Dog Food", "Sterilised Dog Food", "Hypoallergenic Dog Food", "Senior Dog Food", "Joint Support Dog Food", "Puppy Food"],
    TR: ["Kuru Köpek Maması", "Tahılsız Köpek Maması", "Kısırlaştırılmış Köpek Maması", "Hipoalerjenik Köpek Maması", "Yaşlı Köpek Maması", "Eklem Destekli Köpek Maması", "Yavru Köpek Maması"]
  },
  "dog-wet-food": {
    EN: ["Wet Dog Food", "Dog Food Pouch", "Canned Dog Food", "Gravy Wet Food"],
    TR: ["Soslu Yaş Mama", "Konserve Köpek Maması", "Jöleli Yaş Mama", "Ezme Püre Köpek Maması"]
  },
  "dog-treats": {
    EN: ["Dental Chews", "Training Treats", "Meat Strips", "Marrow Bones", "Calcium Bones"],
    TR: ["Dental Çiğneme Ödülü", "Eğitim Ödül Maması", "Etli Çubuk Ödül", "İlikli Kemik Ödül", "Kalsiyumlu Kemik Ödül"]
  },
  "dog-toys": {
    EN: ["Chew Toy", "Rope Toy", "Squeaky Toy", "Plush Toy", "Interactive Puzzle Toy"],
    TR: ["Çiğneme Oyuncağı", "Halı Saksı ve İp Oyuncak", "Sesli Oyuncak", "Peluş Oyuncak", "Zeka Geliştirici Oyuncak"]
  },
  "dog-collars": {
    EN: ["Adjustable Collar", "Training Leash", "Chest Harness", "Retractable Leash", "Leather Collar"],
    TR: ["Ayarlanabilir Boyun Tasması", "Eğitim Kayışı", "Göğüs Tasması", "Otomatik Sarmalı Tasma", "Deri Boyun Tasması"]
  },
  "dog-clothing": {
    EN: ["Winter Coat", "Raincoat", "Cotton T-Shirt", "Reflective Vest", "Fleece Sweater"],
    TR: ["Kışlık Mont", "Yağmurluk", "Pamuklu Tişört", "Reflektörlü Yelek", "Polar Kazak"]
  },
  "dog-beds": {
    EN: ["Orthopedic Bed", "Plush Donut Bed", "Cooling Mat", "Waterproof Mattress", "Raised Cot"],
    TR: ["Ortopedik Yatak", "Peluş Yuvarlak Yatak", "Serinletici Mat", "Su Geçirmez Minder", "Yerden Yüksek Yatak"]
  },
  "dog-grooming": {
    EN: ["Deshedding Brush", "Nail Clipper", "Slicker Brush", "Grooming Glove", "Undercoat Rake"],
    TR: ["Tüy Toplayıcı Fırça", "Tırnak Makası", "Tüy Tarama Fırçası", "Tımar Eldiveni", "Alt Tabaka Tarağı"]
  },
  "dog-shampoo": {
    EN: ["Puppy Shampoo", "Anti-Flea Shampoo", "Oatmeal Shampoo", "Dry Shampoo Foam", "Conditioning Shampoo"],
    TR: ["Yavru Köpek Şampuanı", "Pire Karşıtı Şampuan", "Yulaflı Hassas Deri Şampuanı", "Kuru Köpük Şampuan", "Kremli Şampuan"]
  },
  "dog-vitamins": {
    EN: ["Joint Supplement", "Multivitamin Paste", "Salmon Oil", "Calming Drops", "Probiotic Powder"],
    TR: ["Eklem Destekleyici Takviye", "Multivitamin Macun", "Somon Yağı", "Sakinleştirici Damla", "Probiyotik Toz"]
  },
  "dog-training": {
    EN: ["Training Pads", "Clicker", "Anti-Bark Collar", "Repellent Spray", "Potty Training Spray"],
    TR: ["Çiş Eğitim Pedi", "Eğitim Clicker'ı", "Havlama Önleyici Tasma", "Uzaklaştırıcı Sprey", "Tuvalet Eğitim Spreyi"]
  },
  "dog-carriers": {
    EN: ["Travel Crate", "Fabric Carrier Bag", "Car Seat Cover", "Airline Approved Carrier", "Backpack Carrier"],
    TR: ["Seyahat Taşıma Çantası (Plastik)", "Kumaş Taşıma Çantası", "Araç İçi Koltuk Örtüsü", "Uçuş Onaylı Taşıma Çantası", "Sırt Taşıma Çantası"]
  },
  "dog-bowls": {
    EN: ["Stainless Steel Bowl", "Slow Feeder Bowl", "Automatic Dispenser", "Ceramic Water Bowl", "Foldable Travel Bowl"],
    TR: ["Paslanmaz Çelik Mama Kabı", "Yavaş Yeme Kabı", "Otomatik Mama Makinesi", "Seramik Su Kabı", "Katlanabilir Seyahat Kabı"]
  },
  "dog-health": {
    EN: ["Flea Collar", "Tick Remover", "Deworming Tablets", "Wound Care Spray", "Ear Cleaner"],
    TR: ["Pire Tasması", "Kene Çıkarıcı", "İç Parazit Tableti", "Yara Bakım Spreyi", "Kulak Temizleme Solüsyonu"]
  },

  // CATS
  "cat-dry-food": {
    EN: ["Adult Cat Food", "Kitten Food", "Sterilised Cat Food", "Hairball Control Cat Food", "Urinary Care Cat Food", "Grain Free Cat Food"],
    TR: ["Yetişkin Kedi Maması", "Yavru Kedi Maması", "Kısırlaştırılmış Kedi Maması", "Tüy Yumağı Önleyici Kedi Maması", "Üriner Sistem Destekli Kedi Maması", "Tahılsız Kedi Maması"]
  },
  "cat-wet-food": {
    EN: ["Cat Food Pouches", "Canned Cat Food", "Gravy Cuts", "Pate Cat Food"],
    TR: ["Soslu Yaş Kedi Maması", "Konserve Kedi Maması", "Jöleli Et Parçacıkları", "Püre Kedi Maması"]
  },
  "cat-treats": {
    EN: ["Liquid Snack", "Crunchy Treats", "Freeze-Dried Treats", "Catnip Biscuits"],
    TR: ["Sıvı Ödül Maması (Stick)", "Kıtır Ödül Maması", "Dondurularak Kurutulmuş Ödül", "Kedi Otlu Bisküvi"]
  },
  "cat-toys": {
    EN: ["Feather Wand", "Laser Pointer", "Catnip Mouse", "Interactive Ball Track", "Kicker Toy"],
    TR: ["Tüylü Olta Oyuncak", "Lazer İşaretleyici", "Kedi Otlu Fare Oyuncak", "Zeka Topu ve Yolu", "Tırmalama Oyuncak"]
  },
  "cat-litter": {
    EN: ["Bentonite Clumping Litter", "Tofu Cat Litter", "Silica Gel Litter", "Activated Carbon Litter", "Wood Pellet Litter"],
    TR: ["İnce Taneli Bentonit Kedi Kumu", "Aktif Karbonlu Tofu Kedi Kumu", "Silika Kedi Kumu", "Aktif Karbonlu Kedi Kumu", "Çam Peleti Kedi Kumu"]
  },
  "cat-litter-boxes": {
    EN: ["Covered Litter Box", "Open Litter Pan", "Self-Cleaning Litter Box", "Top-Entry Litter Box", "Corner Litter Box"],
    TR: ["Kapalı Kedi Tuvaleti", "Açık Kedi Tuvaleti", "Otomatik Temizlenen Kedi Tuvaleti", "Üstten Girişli Kedi Tuvaleti", "Köşe Kedi Tuvaleti"]
  },
  "cat-scratchers": {
    EN: ["Scratching Post", "Cardboard Scratcher", "Scratching Tree", "Wall Mounted Scratcher", "Cat Condo"],
    TR: ["Tırmalama Tahtası (Silindir)", "Karton Tırmalama Matı", "Tırmalama Ağacı", "Duvara Monte Tırmalama", "Kedi Evi ve Tırmalama"]
  },
  "cat-beds": {
    EN: ["Igloo Bed", "Radiator Bed", "Plush Cave Bed", "Window Hammock", "Soft Mat"],
    TR: ["İgloo Kedi Yatağı", "Kalorifer Yatağı", "Peluş Mağara Yatak", "Cama Monte Hamak", "Yumuşak Minder"]
  },
  "cat-grooming": {
    EN: ["Deshedding Tool", "Slicker Brush", "Nail Clipper", "Cat Grooming Glove", "Massage Brush"],
    TR: ["Tüy Toplayıcı Tarak", "İnce Telli Tarak", "Tırnak Makası", "Tımar ve Masaj Eldiveni", "Masaj Fırçası"]
  },
  "cat-vitamins": {
    EN: ["Malt Paste", "Multivitamin Paste", "Salmon Oil", "Taurine Supplement", "Calming Paste"],
    TR: ["Tüy Yumağı Önleyici Malt Macun", "Multivitamin Macun", "Somon Yağı", "Taurin Takviyesi", "Sakinleştirici Macun"]
  },
  "cat-carriers": {
    EN: ["Plastic Carrier", "Transparent Backpack", "Fabric Travel Bag", "Airline Approved Bag", "Cardboard Carrier"],
    TR: ["Plastik Taşıma Çantası", "Şeffaf Astronot Sırt Çantası", "Kumaş Omuz Çantası", "Uçuş Onaylı Taşıma Çantası", "Karton Taşıma Kutusu"]
  },
  "cat-bowls": {
    EN: ["Elevated Ceramic Bowl", "Stainless Steel Bowl", "Automatic Water Fountain", "Double Bowl Set", "Anti-Vomit Bowl"],
    TR: ["Yükseltilmiş Seramik Mama Kabı", "Paslanmaz Çelik Kap", "Otomatik Su Şelalesi (Pınarı)", "İkili Mama ve Su Kabı", "Kusma Önleyici Mama Kabı"]
  },
  "cat-health": {
    EN: ["Flea Drops", "Deworming Paste", "Ear Mite Drops", "Dental Spray", "Wound Spray"],
    TR: ["Pire Damlası", "İç Parazit Macunu", "Kulak Uyuzu Damlası", "Ağız Bakım Spreyi", "Yara Bakım Solüsyonu"]
  },

  // BIRDS
  "bird-food": {
    EN: ["Parakeet Seed Mix", "Canary Seed", "Parrot Pellets", "Cockatiel Food", "Finch Seed Blend"],
    TR: ["Muhabbet Kuşu Yemi", "Kanarya Yemi", "Papağan Pelet Yemi", "Sultan Papağanı Yemi", "İspinoz Yemi"]
  },
  "bird-treats": {
    EN: ["Honey Seed Stick", "Fruit Crackers", "Millet Spray", "Nut and Seed Mix", "Conditioning Food"],
    TR: ["Ballı Kraker", "Meyveli Kraker", "Dal Darı", "Kuruyemiş ve Çekirdek Karışımı", "Kondisyon Maması"]
  },
  "bird-cages": {
    EN: ["Small Bird Cage", "Large Parrot Cage", "Breeding Cage", "Flight Cage", "Dome Top Cage"],
    TR: ["Küçük Boy Kuş Kafesi", "Büyük Boy Papağan Kafesi", "Çifthane (Üretim) Kafesi", "Geniş Uçuş Kafesi", "Kubbe Tavanlı Kafes"]
  },
  "bird-toys": {
    EN: ["Bell Toy", "Wooden Chewing Block", "Mirror Toy", "Rope Swing", "Foraging Toy"],
    TR: ["Çıngıraklı Oyuncak", "Ahşap Kemirme Bloğu", "Aynalı Oyuncak", "Tünekli Salıncak", "Zeka ve Arama Oyuncağı"]
  },
  "bird-perches": {
    EN: ["Natural Wood Perch", "Mineral Perch", "Rope Perch", "Plastic Perch", "Sand Covered Perch"],
    TR: ["Doğal Ahşap Tünek", "Mineral Taş Törpü Tünek", "Pamuk İp Tünek", "Plastik Tünek", "Kum Kaplı Tünek"]
  },
  "bird-feeders": {
    EN: ["Silo Feeder", "Stainless Steel Coop Cup", "Automatic Waterer", "Fruit Clip", "Inside-Cage Feeder"],
    TR: ["Akıllı Yemlik", "Paslanmaz Çelik Askılı Kap", "Otomatik Suluk", "Meyve ve Sebze Kıskacı", "Kafes İçi Yemlik"]
  },
  "bird-vitamins": {
    EN: ["Liquid Multivitamin", "Molting Supplement", "Calcium Drops", "Vitamin B Complex", "Probiotic Powder"],
    TR: ["Sıvı Multivitamin", "Tüy Dökümü Takviyesi", "Kalsiyum Damlası", "B Kompleks Vitamini", "Probiyotik Toz"]
  },
  "bird-care": {
    EN: ["Mineral Block", "Cuttlebone", "Bird Bath", "Beak Trimmer", "Feather Plucking Spray"],
    TR: ["Kuş Mineral Bloğu", "Mürekkep Balığı Kemiği (Kalamar)", "Kuş Banyosu", "Gaga Taşı", "Tüy Yolma Önleyici Sprey"]
  },
  "bird-cage-accessories": {
    EN: ["Cage Tray Liner", "Cage Cover", "Nesting Box", "Coconut Hide", "Cage Stand"],
    TR: ["Kafes Taban Örtüsü (Kumu)", "Kafes Örtüsü", "Üretim Yuvalığı", "Hindistan Cevizi Yuva", "Kafes Standı (Ayaklık)"]
  },
  "bird-hygiene": {
    EN: ["Cage Cleaning Spray", "Mite Spray", "Bird Shampoo", "Lice Powder", "Sanded Sheets"],
    TR: ["Kafes Temizleme Spreyi", "Bit ve Akarlara Karşı Sprey", "Kuş Banyo Şampuanı", "Bit Tozu", "Kumlu Kafes Kağıdı"]
  },

  // FISH
  "fish-food": {
    EN: ["Tropical Flakes", "Goldfish Granules", "Cichlid Pellets", "Bottom Feeder Tablets", "Betta Fish Food"],
    TR: ["Tropikal Balık Yemi (Pul)", "Japon Balığı Yemi (Granül)", "Cichlid Yemi (Pelet)", "Dip Yemi (Tablet)", "Betta Balığı Yemi"]
  },
  "aquariums": {
    EN: ["Starter Aquarium Kit", "Nano Cube Aquarium", "Bow Front Aquarium", "Betta Tank", "Large Glass Aquarium"],
    TR: ["Başlangıç Akvaryum Seti", "Nano Akvaryum (Küp)", "Bombeli Ön Cam Akvaryum", "Betta Akvaryumu", "Geniş Cam Akvaryum"]
  },
  "aquarium-filters": {
    EN: ["Internal Filter", "External Canister Filter", "Sponge Filter", "Hang-on-Back Filter", "Undergravel Filter"],
    TR: ["Akvaryum İç Filtre", "Akvaryum Dış Filtre", "Pipo Filtre (Sünger)", "Şelale Filtre", "Taban Filtresi"]
  },
  "aquarium-decorations": {
    EN: ["Resin Shipwreck", "Artificial Plants", "Driftwood", "Rock Cave", "Ceramic Decoration"],
    TR: ["Reçine Gemi Batığı Dekor", "Yapay İpek Bitkiler", "Doğal Yati Kökü", "Kaya Mağara Dekor", "Seramik Dekorlar"]
  },
  "aquarium-lighting": {
    EN: ["LED Strip Light", "Clip-on Aquarium Light", "RGB Plant Light", "Submersible LED Ring", "Day/Night Timer Light"],
    TR: ["LED Aydınlatma Armatürü", "Mandal Tipi LED Işık", "Bitki Gelişimi İçin RGB LED", "Dalgıç Tip LED", "Gündüz/Gece Zamanlayıcılı Işık"]
  },
  "aquarium-cleaning": {
    EN: ["Gravel Vacuum", "Algae Scraper", "Magnetic Glass Cleaner", "Cleaning Sponge", "Water Siphon"],
    TR: ["Dip Sifonu (Süpürgesi)", "Yosun Kazıyıcı", "Mıknatıslı Cam Sileceği", "Akvaryum Temizlik Süngeri", "Su Çekme Hortumu"]
  },
  "water-conditioners": {
    EN: ["Water Conditioner", "Beneficial Bacteria", "Liquid Carbon", "Algae Control", "Ph Adjuster"],
    TR: ["Su Düzenleyici (Klor Giderici)", "Yararlı Bakteri Kültürü", "Sıvı Karbon Takviyesi", "Yosun Giderici", "pH Düzenleyici Solüsyon"]
  },
  "aquarium-heaters": {
    EN: ["Submersible Heater", "Titanium Heater", "Mini Betta Heater", "External Inline Heater", "Heater Guard"],
    TR: ["Dalgıç Akvaryum Isıtıcısı", "Titanyum Çelik Isıtıcı", "Mini Betta Isıtıcısı", "Dış Filtre Uyumlu Isıtıcı", "Isıtıcı Koruma Kılıfı"]
  },
  "fish-health": {
    EN: ["Ich Treatment", "Fungal Cure", "Anti-Parasite Drops", "Vitamin C Drops", "Aquarium Salt"],
    TR: ["Beyaz Benek Damlası", "Mantar Tedavi Solüsyonu", "İç Parazit İlacı", "C Vitamini Takviyesi", "Akvaryum Kaya Tuzu"]
  },
  "aquarium-accessories": {
    EN: ["Air Pump", "Airstone", "Thermometer", "Check Valve", "Filter Media Rings"],
    TR: ["Hava Motoru", "Hava Taşı (Difüzör)", "Akvaryum Termometresi", "Geri Tepme Valfi(Check Valve)", "Seramik Filtre Halkaları"]
  },

  // RODENTS
  "rodent-food": {
    EN: ["Hamster Seed Mix", "Guinea Pig Pellets", "Rabbit Food", "Chinchilla Food", "Rat and Mouse Diet"],
    TR: ["Hamster Yemi", "Ginepig Yemi", "Tavşan Yemi", "Çinçilla Yemi", "Sıçan ve Fare Yemi"]
  },
  "rodent-treats": {
    EN: ["Yogurt Drops", "Alfalfa Hay Cubes", "Dried Fruit Mix", "Veggie Sticks", "Mineral Chew Treats"],
    TR: ["Yoğurtlu Drop Ödül", "Yonca (Alfalfa) Küpleri", "Kurutulmuş Meyve Karışımı", "Sebzeli Çubuk Ödül", "Mineral Kemirme Ödülü"]
  },
  "rodent-cages": {
    EN: ["Hamster Cage with Tubes", "Guinea Pig Enclosure", "Rabbit Hutch", "Multi-level Rat Cage", "Travel Carrier"],
    TR: ["Tünelli Hamster Kafesi", "Geniş Ginepig Yaşam Alanı", "Tavşan Kafesi", "Çok Katlı Kemirgen Kafesi", "Taşıma Kutusu"]
  },
  "rodent-bedding": {
    EN: ["Wood Shavings", "Paper Bedding", "Hemp Bedding", "Corn Cob Bedding", "Timothy Hay Bedding"],
    TR: ["Tozsuz Çam Talaşı Altlık", "Kağıt Taban Malzemesi", "Kenevir Altlık", "Mısır Koçanı Altlığı", "Kuru Ot (Timothy) Tabanlık"]
  },
  "rodent-toys": {
    EN: ["Wooden Tunnel", "Chew Toys Set", "Hanging Bridge", "Willow Branch Ball", "Hideout Igloo"],
    TR: ["Ahşap Tünel", "Ahşap Kemirme Seti", "Asma Köprü Oyuncağı", "Söğüt Dalı Topu", "Saklanma Evi (İgloo)"]
  },
  "rodent-wheels": {
    EN: ["Silent Spinner Wheel", "Flying Saucer Wheel", "Wooden Exercise Wheel", "Mesh Wheel", "Exercise Ball"],
    TR: ["Sessiz Çark", "Yatay Egzersiz Çarkı", "Ahşap Tekerlek", "Metal Egzersiz Çarkı", "Dolaşma Topu (Şeffaf)"]
  },
  "rodent-feeders": {
    EN: ["Glass Water Bottle", "Ceramic Food Bowl", "Hay Feeder Rack", "Anti-tip Bowl", "Auto Feeder"],
    TR: ["Cam Bilyeli Suluk", "Seramik Mama Kabı", "Ot Teli (Samanlık)", "Devrilmez Mama Kabı", "Otomatik Yemlik"]
  },
  "rodent-hygiene": {
    EN: ["Chinchilla Bathing Sand", "Pet Wipes", "Cage Deodorizer", "Small Animal Shampoo", "Nail Scissors"],
    TR: ["Çinçilla Banyo Kumu", "Temizleme Mendili", "Kafes Koku Giderici Sprey", "Kemirgen Şampuanı", "Tırnak Makası"]
  },
  "rodent-care": {
    EN: ["Vitamin C Drops", "Mineral Salt Lick", "Multivitamin Solution", "Probiotic Supplemnet", "Hairball Remedy"],
    TR: ["C Vitamini Damlası", "Mineral Tuz Taşı", "Sıvı Multivitamin", "Probiyotik Toz", "Tüy Yumağı Önleyici Macun"]
  },

  // REPTILES
  "reptile-food": {
    EN: ["Turtle Sticks", "Iguana Pellets", "Bearded Dragon Food", "Aqua Turtle Food", "Herbivore Gel Food"],
    TR: ["Su Kaplumbağası Yemi (Stick)", "İguana Yemi", "Sakal Ejderi Yemi", "Yavru Kaplumbağa Yemi", "Otçul Sürüngen Jel Mama"]
  },
  "terrariums": {
    EN: ["Desert Terrarium", "Rainforest Terrarium", "Glass Paludarium", "Turtle Tank", "Mesh Enclosure"],
    TR: ["Çöl Teraryumu", "Yağmur Ormanı Teraryumu", "Cam Paludaryum", "Nadir Boy Kaplumbağa Akvaryumu", "Havalandırmalı Kafes (Mesh)"]
  },
  "heating-lamps": {
    EN: ["Ceramic Heat Emitter", "Basking Spot Lamp", "Infrared Heat Lamp", "Heat Mat", "Heat Rock"],
    TR: ["Seramik Isıtıcı Ampul", "Güneşlenme (Basking) Lambası", "Kızılötesi Isıtıcı Lamba", "Teraryum Isıtıcı Mat", "Isıtıcı Kaya Dekor"]
  },
  "uvb-lighting": {
    EN: ["UVB 5.0 Compact Bulb", "UVB 10.0 Desert Tube", "Mercury Vapor Bulb", "LED Plant Growth Light", "Lamp Fixture"],
    TR: ["UVB 5.0 Kompakt Ampul (Orman)", "UVB 10.0 Çöl Tipi Floresan", "Cıva Buharlı Lamba", "LED Bitki Gelişim Işığı", "Seramik Duy ve Reflektör"]
  },
  "reptile-substrates": {
    EN: ["Coconut Husk Substrate", "Desert Sand", "Reptile Bark", "Sphagnum Moss", "Terrarium Carpet"],
    TR: ["Hindistan Cevizi Torfu (Humus)", "Kalsiyumlu Çöl Kumu", "Sürüngen Ağaç Kabuğu Tabanlığı", "Sphagnum Yosunu", "Teraryum Halısı"]
  },
  "reptile-decorations": {
    EN: ["Cork Bark Hide", "Jungle Vine", "Artificial Cactus", "Resin Skull Cave", "Water Waterfall"],
    TR: ["Mantar Kabuğu Saklanma Mağarası", "Orman Sarmaşığı", "Yapay Kaktüs Dekoru", "Reçine Kuru Kafa Mağarası", "Teraryum Şelalesi"]
  },
  "reptile-humidity": {
    EN: ["Digital Thermometer/Hygrometer", "Automatic Fogger", "Spray Misting Bottle", "Analog Gauge", "Rain System"],
    TR: ["Dijital Termometre / Higrometre", "Otomatik Sisleyici (Fogger)", "Basınçlı Püskürtme Şişesi", "Analog Isı ve Nem Ölçer", "Yağmurlama Sistemi"]
  },
  "reptile-feeding-accessories": {
    EN: ["Feeding Tweezers", "Worm Dish", "Water Rock", "Cricket Keeper", "Jelly Pot Holder"],
    TR: ["Canlı Yem Cımbızı", "Kurtçuk Kabı", "Kaya Görünümlü Su Kabı", "Cırcır Böceği Saklama Kabı", "Jel Meyve Kabı Tutucu"]
  },
  "reptile-health": {
    EN: ["Calcium Powder with D3", "Multivitamin Powder", "Eye Drops for Turtles", "Shedding Aid Spray", "Electrolyte Soak"],
    TR: ["D3 Vitaminli Kalsiyum Tozu", "Sürüngen Multivitamin Tozu", "Kaplumbağa Göz Damlası", "Deri Değişimine Yardımcı Sprey", "Elektrolit Banyosu"]
  },
  "reptile-care": {
    EN: ["Terrarium Cleaner", "Water Conditioner", "Turtle Shell Conditioner", "Hand Sanitizer", "Snake Hook"],
    TR: ["Teraryum Temizleme Spreyi", "Su Düzenleyici", "Kaplumbağa Kabuk Sertleştirici", "Sürüngen Sonrası El Dezenfektanı", "Yılan Kancası"]
  }
};

const FLAVORS = {
  dogs: { EN: ["with Chicken", "with Lamb", "with Salmon", "with Beef", "with Turkey"], TR: ["Tavuklu", "Kuzulu", "Somonlu", "Sığırlı", "Hindili"] },
  cats: { EN: ["with Chicken", "with Salmon", "with Turkey", "with Duck", "with Ocean Fish"], TR: ["Tavuklu", "Somonlu", "Hindili", "Ördekli", "Deniz Balıklı"] },
};
const SIZES = ["1kg", "2.5kg", "5kg", "10kg", "15kg"];

export type ProductWithCategory = Product & { _categoryLabel: { EN: string; TR: string }, _categoryId: string, _subCategoryId: string };

export const ALL_MOCK_PRODUCTS: ProductWithCategory[] = CATEGORIES.flatMap(cat => 
  cat.subcategories.flatMap(sub => 
    generateProductsByCategoryId(sub.id, cat.id, 15, sub.name.EN, sub.name.TR).map((p, idx) => ({ 
      ...p, 
      id: `${sub.id}-${idx}`, 
      _categoryLabel: cat.name,
      _categoryId: cat.id,
      _subCategoryId: sub.id
    }))
  )
);

export function generateDummyProducts(categoryId: string, count: number): Product[] {
  if (categoryId === 'all' || !categoryId) return ALL_MOCK_PRODUCTS;

  const catIdLow = categoryId.toLowerCase();
  
  let filtered = ALL_MOCK_PRODUCTS.filter(p => {
    if (p._categoryId.toLowerCase() === catIdLow) return true;
    if (p._subCategoryId.toLowerCase() === catIdLow) return true;

    const labelLow = p._categoryLabel.EN.toLowerCase();
    if (labelLow === 'dogs' && catIdLow.includes('dog')) return true;
    if (labelLow === 'cats' && catIdLow.includes('cat')) return true;
    if (labelLow === 'birds' && catIdLow.includes('bird')) return true;
    if (labelLow === 'fish' && catIdLow.includes('fish')) return true;
    if (labelLow === 'rodents' && catIdLow.includes('rodent')) return true;
    if (labelLow === 'reptiles' && catIdLow.includes('reptile')) return true;
    
    return false;
  });

  return filtered;
}

export function generateProductsByCategoryId(
  categoryId: string,
  parentCatId: string,
  count: number,
  subNameEN: string = "",
  subNameTR: string = ""
): Product[] {
  const products: Product[] = [];

  let hash = 0;
  for (let i = 0; i < categoryId.length; i++) {
    hash = categoryId.charCodeAt(i) + ((hash << 5) - hash);
  }

  const SIZES_VARIANT = ["Small", "Medium", "Large", "XL"];
  const COLORS = ["Red", "Blue", "Black", "Green", "Yellow"];

  for (let i = 0; i < count; i++) {
    const seed = Math.abs(hash + i * 12345);
    
    const catKey = (BRANDS as any)[parentCatId] ? parentCatId : "dogs";
    const brandList = (BRANDS as any)[catKey];
    const brand = brandList[seed % brandList.length];
    
    let baseNameEN = "";
    let baseNameTR = "";
    let isFood = categoryId.includes("food") || categoryId.includes("treat") || subNameEN.toLowerCase().includes("food") || subNameEN.toLowerCase().includes("treat") || subNameEN.toLowerCase().includes("seed");

    const templateData = PRODUCT_TEMPLATES[categoryId];

    if (templateData) {
        const nameListEN = templateData.EN;
        const nameListTR = templateData.TR;
        const nameIdx = seed % nameListEN.length;
        baseNameEN = `${brand} ${nameListEN[nameIdx]}`;
        baseNameTR = `${brand} ${nameListTR[nameIdx]}`;
    } else {
        // Fallback (should theoretically not trigger if all subcategories mapped)
        const genericEN = subNameEN || categoryId.replace("-", " ");
        const genericTR = subNameTR || genericEN;
        const variant = SIZES_VARIANT[seed % SIZES_VARIANT.length];
        
        if (categoryId.includes("toy") || categoryId.includes("collar") || categoryId.includes("bed")) {
            const color = COLORS[seed % COLORS.length];
            baseNameEN = `${brand} Premium ${genericEN} - ${color} ${variant}`;
            baseNameTR = `${brand} Premium ${genericTR} - ${color} ${variant}`;
        } else {
            baseNameEN = `${brand} Professional ${genericEN}`;
            baseNameTR = `${brand} Profesyonel ${genericTR}`;
        }
    }

    let flavor = "";
    if ((catKey === "dogs" || catKey === "cats") && isFood) {
        const flavorMap = (FLAVORS as any)[catKey];
        const flavorIdx = seed % flavorMap.EN.length;
        flavor = flavorMap.EN[flavorIdx]; 
        baseNameEN += ` ${flavorMap.EN[flavorIdx]}`;
        baseNameTR += ` ${flavorMap.TR[flavorIdx]}`;
    }

    const size = SIZES[seed % SIZES.length];
    const SIZES_NON_FOOD = ["Small", "Medium", "Large", "XL"];
    
    if (isFood || baseNameEN.includes("Litter") || baseNameEN.includes("Sand") || baseNameEN.includes("Kumu") || baseNameEN.includes("Altlık") || baseNameEN.includes("Taban") || baseNameEN.includes("Bedding")) {
       baseNameEN += ` - ${size}`;
       baseNameTR += ` - ${size}`;
    } else if (baseNameEN.includes("Collar") || baseNameEN.includes("Bed") || baseNameEN.includes("Cage") || baseNameEN.includes("Harness") || baseNameEN.includes("Clothing") || baseNameEN.includes("Coat") || baseNameEN.includes("Sweater")) {
       const nonFoodSize = SIZES_NON_FOOD[seed % SIZES_NON_FOOD.length];
       baseNameEN += ` - ${nonFoodSize}`;
       baseNameTR += ` - ${nonFoodSize}`;
    }

    let price = 100 + (seed % 900);
    let oldPrice = price * 1.2;
    let discount = 20;

    let stock = seed % 50; // Random stock 0 to 49

    if (seed % 3 === 0) {
      oldPrice = price; // no discount
      discount = 0;
    }

    let isDogOrCat = catKey === "dogs" || catKey === "cats";
    let isWearable = baseNameEN.includes("Collar") || baseNameEN.includes("Harness") || baseNameEN.includes("Clothing") || baseNameEN.includes("Coat") || baseNameEN.includes("Sweater") || baseNameEN.includes("Vest") || baseNameEN.includes("Raincoat");

    products.push({
      id: `${categoryId}-prod-${i}`,
      name: { EN: baseNameEN, TR: baseNameTR },
      image: "",
      price: price,
      oldPrice: discount > 0 ? oldPrice : undefined,
      discount: discount > 0 ? discount : undefined,
      rating: 4 + (seed % 10) / 10,
      reviews: seed % 500,
      sold: seed % 1000,
      stock: stock,
      badges: seed % 5 === 0 ? ["Bestseller"] : seed % 7 === 0 ? ["New"] : [],
      brand: brand,
      flavor: flavor ? flavor.replace("with ", "") : undefined,
      weight: isFood || baseNameEN.includes("Litter") || baseNameEN.includes("Sand") || baseNameEN.includes("Kumu") || baseNameEN.includes("Altlık") || baseNameEN.includes("Taban") || baseNameEN.includes("Bedding") ? size : undefined,
      age: (isDogOrCat && isFood) ? (seed % 2 === 0 ? "Adult" : "Puppy/Kitten") : undefined,
      breedSize: (isDogOrCat && (isFood || isWearable || baseNameEN.includes("Bed"))) ? (seed % 3 === 0 ? "All Sizes" : "Small") : undefined,
    });
  }

  return products;
}
