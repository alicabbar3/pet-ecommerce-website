import { createContext, useContext } from 'react';

export type Lang = 'EN' | 'TR';

export const LangContext = createContext<{ lang: Lang, setLang: (l: Lang) => void }>({ lang: 'TR', setLang: () => {} });
export const useLang = () => useContext(LangContext);

const TR_DICT: Record<string, string> = {
  // Header / Navigation
  "Services": "Hizmetler",
  "About": "Hakkımızda",
  "Location": "Konum",
  "Cart": "Sepet",
  "Contact Us": "Bize Ulaşın",

  // Hero
  "Premium Services & Beyond": "Premium Hizmetler ve Ötesi",
  "Personalize Profile": "Profili Kişiselleştir",
  "Message WhatsApp": "WhatsApp'tan Yazın",
  "For Your Companion": "Dostunuz İçin",
  "Premium Nutrition": "Premium Beslenme",
  "Water Fountain Filters": "Su Pınarı Filtreleri",
  "Ready for pickup tomorrow": "Yarın teslim alınmaya hazır",

  // Services Catalog
  "Complete Care Catalog": "Kapsamlı Bakım Kataloğu",
  "Dog": "Köpek",
  "Cat": "Kedi",
  "Avian": "Kuş",
  "Fish": "Balık",
  "Rodent": "Kemirgen",
  "Reptile": "Sürüngen",
  
  "Comfort Collars": "Konforlu Tasmalar",
  "Training Treats": "Eğitim Ödülleri",
  "Orthopedic Beds": "Ortopedik Yataklar",
  "Interactive Toys": "İnteraktif Oyuncaklar",
  "Healthcare": "Sağlık ve Bakım",
  
  "Grain-Free Diet": "Tahılsız Diyet",
  "Odorless Litter": "Kokusuz Kum",
  "Cozy Beds": "Rahat Yataklar",
  "Scratching Posts": "Tırmalama Tahtaları",
  "Feather Toys": "Tüylü Oyuncaklar",
  "Malt Pastes": "Malt Macunları",
  "Water Fountains": "Su Pınarları",
  
  "Seed Mixes": "Yem Karışımları",
  "Spacious Cages": "Geniş Kafesler",
  "Natural Perches": "Doğal Tünekler",
  "Smart Feeders": "Akıllı Yemlikler",
  "Bell Swings": "Zilli Salıncaklar",
  "Baths": "Banyoluklar",
  
  "Flake Food": "Pul Yem",
  "Glass Aquariums": "Cam Akvaryumlar",
  "Silent Filtration": "Sessiz Filtreler",
  "Decorations": "Dekorasyonlar",
  "Water Care": "Su Bakımı",
  
  "Pellet Mix": "Pelet Karışımı",
  "Multi-level Cages": "Çok Katlı Kafesler",
  "Running Wheels": "Egzersiz Çarkları",
  "Chew Toys": "Kemirme Oyuncakları",
  "Wooden Huts": "Ahşap Kulübeler",

  "Live/Dried Food": "Canlı/Kuru Yem",
  "Glass Terrariums": "Cam Teraryumlar",
  "UVB Lamps": "UVB Lambalar",
  "Thermostats": "Termostatlar",
  "Hygrometers": "Higrometreler",

  // Flavors / Ingredients
  "Chicken": "Tavuk",
  "Salmon": "Somon",
  "Lamb": "Kuzu",
  "Beef": "Sığır Eti",
  "Turkey": "Hindi",
  "Ocean Fish": "Okyanus Balığı",
  "Vegetable": "Sebze",
  "Rabbit": "Tavşan",
  "Mixed Seeds": "Karışık Tohumlar",
  "Fruit": "Meyve",
  "Honey": "Bal",
  "Nut": "Fındık/Fıstık",
  "Eucalyptus": "Okaliptüs",
  "Algae": "Yosun",
  "Krill": "Krill",
  "Bloodworms": "Kan Kurdu",
  "Color Enhancing": "Renk Geliştirici",
  "Spirulina": "Spirulina",
  "Alfalfa": "Yonca",
  "Timothy Hay": "Çayır Otu",
  "Apple": "Elma",
  "Carrot": "Havuç",
  "Mixed Berries": "Orman Meyveleri",
  "Crickets": "Cırcır Böceği",
  "Mealworms": "Un Kurdu",
  "Calcium Coated": "Kalsiyum Kaplı",
  "Vegetable Blend": "Sebze Karışımı",
  "Standard": "Standart",

  // Ages
  "Puppy/Kitten": "Yavru",
  "Adult": "Yetişkin",
  "Senior": "Yaşlı",
  "All Life Stages": "Tüm Yaşam Evreleri",
  "Baby": "Yavru",
  "Juvenile": "Genç",
  "All": "Tümü",

  // Sizes
  "Small": "Küçük",
  "Medium": "Orta",
  "Large": "Büyük",
  "All Breeds": "Tüm Irklar",
  "Small Bird": "Küçük Kuş",
  "Medium Bird": "Orta Boy Kuş",
  "Parrot": "Papağan",
  "Small Pet": "Küçük Evcil Hayvan",
  "Hamster/Mouse": "Hamster/Fare",
  "Rabbit/Guinea Pig": "Tavşan/Gine Domuzu",

  // Materials
  "Plastic": "Plastik",
  "Stainless Steel": "Paslanmaz Çelik",
  "Ceramic": "Seramik",
  "Silicone": "Silikon",
  "Nylon": "Naylon",
  "Leather": "Deri",
  "Fleece": "Polar",
  "Wood": "Ahşap",
  "Metal": "Metal",
  "Cuttlebone": "Mürekkep Balığı Kemiği",
  "Natural Branch": "Doğal Dal",
  "Glass": "Cam",
  "Acrylic": "Akrilik",
  "Sponge": "Sünger",
  "Ceramic Rings": "Seramik Halkalar",
  "Paper": "Kağıt",
  "Corn Cob": "Mısır Koçanı",
  "Mesh": "File",
  "Resin": "Reçine",
  "Cork Bark": "Mantar Kabuğu",
  "Sand": "Kum",
  "Coco Husk": "Hindistan Cevizi Torfu",

  // Trust Section
  "Why shop with Vivia?": "Neden Vivia'yı seçmelisiniz?",
  "Fast & Accessible": "Hızlı ve Ulaşılabilir",
  "Wide Ranging Expertise": "Geniş Uzmanlık Alanı",
  "Direct Communication": "Doğrudan İletişim",
  "Always Online": "Her Zaman Çevrimiçi",
  "Shop Now": "Alışverişe Başla",
  "Continue shopping": "Alışverişe Devam Et",

  // Contact
  "Ready to order?": "Sipariş vermeye hazır mısınız?",
  "WhatsApp Us": "WhatsApp'tan Yazın",
  "Call directly": "Hemen Arayın",
  "Contact Information": "İletişim Bilgileri",
  "Copied!": "Kopyalandı!",

  // E-commerce
  "Search...": "Ürün, kategori veya marka ara...",
  "New Products": "Yeni Ürünler",
  "Deals": "Kampanyalar",
  "Login": "Giriş Yap",
  "Sign Up": "Üye Ol",
  "First Name": "Ad",
  "Last Name": "Soyad",
  "E-Mail": "E-Posta",
  "Phone Number": "Telefon Numarası",
  "Password": "Şifre",
  "Create Account": "Hesap Oluştur",
  "Sign in to your account": "Hesabınıza giriş yapın",
  "Create a new account": "Yeni bir hesap oluşturun",
  "Remember Me": "Beni Hatırla",
  "I have read and agree to the KVKK Privacy Policy.": "KVKK Aydınlatma Metni'ni okudum ve kabul ediyorum.",
  "I want to receive marketing emails and SMS about discounts and new products.": "Kampanya ve indirimlerden e-posta ve SMS ile haberdar olmak istiyorum.",
  "Account created successfully!": "Hesabınız başarıyla oluşturuldu!",

  // Footer
  "Terms": "Şartlar",
  "Privacy": "Gizlilik",

  // Modals
  "Who are we shopping for?": "Kimin için alışveriş yapıyoruz?",
  "Set up a profile to get tailored recommendations and automatic filtering.": "Size özel tavsiyeler ve otomatik filtreleme için profilinizi oluşturun.",
  "Continue": "Devam",
  "Profile Created!": "Profil Oluşturuldu!",
  "Your shopping experience is now tailored for your ": "Alışveriş deneyiminiz artık şunun için özelleştirildi: ",
  // Removed subscription string
  "Start Shopping": "Alışverişe Başla",
  "Estimated total via WhatsApp": "Tahmini toplam (WhatsApp ile iletilecektir)",
  "Confirm with Store": "Mağaza ile Onaylayınız",
  "Checkout Securely": "Güvenle Siparişi Tamamla",
  "Order Received!": "Sipariş Alındı!",
  "Back to Catalog": "Kataloğa Dön",

  // Order Tracking
  "Track Your Order": "Siparişinizi Takip Edin",
  "Order ID": "Sipariş Numarası",
  "Enter your order ID (e.g., VIVIA-123)": "Sipariş numaranızı girin (örn. VIVIA-123)",
  "Track Order": "Siparişi Sorgula",
  "Processing": "Hazırlanıyor",
  "Shipped": "Kargoya Verildi",
  "Delivered": "Teslim Edildi",
  "Expected Delivery:": "Tahmini Teslimat:",
  "Please enter a valid order ID.": "Lütfen geçerli bir sipariş numarası giriniz."
};

export function t(text: string, lang: Lang) {
  if (!text) return text;
  return lang === 'TR' ? (TR_DICT[text] || text) : text;
}
