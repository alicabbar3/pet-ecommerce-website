import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight,
  ShoppingBag,
  Heart,
  Search,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Bone,
  Cat,
  Fish,
  Bird,
  Bug,
  Turtle,
  Rat,
  X,
  Plus,
  Minus,
  CreditCard,
  Lock,
  ChevronRight,
  Sparkles
} from 'lucide-react';

type Lang = 'EN' | 'TR';

const LangContext = createContext<{ lang: Lang, setLang: (l: Lang) => void }>({ lang: 'TR', setLang: () => {} });
const useLang = () => useContext(LangContext);

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
  "Smart Sub: Active": "Akıllı Abonelik: Aktif",
  "Water Fountain Filters": "Su Pınarı Filtreleri",
  "Ready for pickup tomorrow": "Yarın teslim alınmaya hazır",

  // Services Catalog
  "Complete Care Catalog": "Kapsamlı Bakım Kataloğu",
  "Dog": "Köpek",
  "Cat": "Kedi",
  "Bird": "Kuş",
  "Fish": "Balık",
  "Rodent": "Kemirgen",
  "Reptile": "Sürüngen",
  "Arthropod": "Eklembacaklı",
  
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

  "Specialized Diet": "Özel Diyet",
  "Acrylic Housing": "Akrilik Barınaklar",
  "Misting Bottles": "Sisleme Şişeleri",
  "Coconut Fiber": "Hindistan Cevizi Torfu",
  "Cork Bark": "Mantar Kabuğu",

  // Trust Section
  "Why shop with Vivia?": "Neden Vivia'yı seçmelisiniz?",
  "Fast & Accessible": "Hızlı ve Ulaşılabilir",
  "Wide Ranging Expertise": "Geniş Uzmanlık Alanı",
  "Direct Communication": "Doğrudan İletişim",
  "Always Online": "Her Zaman Çevrimiçi",
  "Shop Now": "Alışverişe Başla",

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

  // Footer
  "Terms": "Şartlar",
  "Privacy": "Gizlilik",

  // Modals
  "Who are we shopping for?": "Kimin için alışveriş yapıyoruz?",
  "Set up a profile to get tailored recommendations and automatic filtering.": "Size özel tavsiyeler ve otomatik filtreleme için profilinizi oluşturun.",
  "Continue": "Devam",
  "Profile Created!": "Profil Oluşturuldu!",
  "Your shopping experience is now tailored for your ": "Alışveriş deneyiminiz artık şunun için özelleştirildi: ",
  "Smart subscriptions are enabled.": "Akıllı abonelikler devrede.",
  "Start Shopping": "Alışverişe Başla",
  "Continue shopping": "Alışverişe devam et",
  "Estimated total via WhatsApp": "Tahmini toplam (WhatsApp ile iletilecektir)",
  "Confirm with Store": "Mağaza ile Onaylayınız",
  "Checkout Securely": "Güvenle Siparişi Tamamla",
  "Order Received!": "Sipariş Alındı!",
  "Back to Catalog": "Kataloğa Dön"
};

const t = (text: string, lang: Lang) => lang === 'TR' ? (TR_DICT[text] || text) : text;

// Data
const CONTACT = {
  phone: "05365264966",
  whatsapp: "05365264966",
  email: "info@viviapet.com"
};

const WA_LINK = `https://wa.me/905365264966`;

const SERVICES = [
  { id: 'dog', title: 'Dog', icon: <Bone className="w-6 h-6" />, items: ['Premium Nutrition', 'Comfort Collars', 'Training Treats', 'Orthopedic Beds', 'Interactive Toys', 'Healthcare'] },
  { id: 'cat', title: 'Cat', icon: <Cat className="w-6 h-6" />, items: ['Grain-Free Diet', 'Odorless Litter', 'Cozy Beds', 'Scratching Posts', 'Feather Toys', 'Malt Pastes', 'Water Fountains'] },
  { id: 'bird', title: 'Bird', icon: <Bird className="w-6 h-6" />, items: ['Seed Mixes', 'Spacious Cages', 'Natural Perches', 'Smart Feeders', 'Bell Swings', 'Baths'] },
  { id: 'fish', title: 'Fish', icon: <Fish className="w-6 h-6" />, items: ['Flake Food', 'Glass Aquariums', 'Silent Filtration', 'Decorations', 'Water Care'] },
  { id: 'rodent', title: 'Rodent', icon: <Rat className="w-6 h-6" />, items: ['Pellet Mix', 'Multi-level Cages', 'Running Wheels', 'Chew Toys', 'Wooden Huts'] },
  { id: 'reptile', title: 'Reptile', icon: <Turtle className="w-6 h-6" />, items: ['Live/Dried Food', 'Glass Terrariums', 'UVB Lamps', 'Thermostats', 'Hygrometers'] },
  { id: 'arthropod', title: 'Arthropod', icon: <Bug className="w-6 h-6" />, items: ['Specialized Diet', 'Acrylic Housing', 'Misting Bottles', 'Coconut Fiber', 'Cork Bark'] },
];

function Header({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) {
  const { lang, setLang } = useLang();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top Bar with Language and Promos */}
      <div className="bg-brand-darker text-white text-xs py-1.5 hidden lg:block">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-brand-teal transition-colors">🔥 {t("Deals", lang)}</a>
              <a href="#" className="hover:text-brand-teal transition-colors">✨ {t("New Products", lang)}</a>
              <a href="#contact" className="hover:text-brand-teal transition-colors">{t("Contact Information", lang)}</a>
            </div>
            <div className="flex items-center gap-2">
               <button onClick={() => setLang('TR')} className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${lang === 'TR' ? 'bg-white/20' : 'hover:bg-white/10'}`}><span>🇹🇷</span> TR</button>
               <button onClick={() => setLang('EN')} className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${lang === 'EN' ? 'bg-white/20' : 'hover:bg-white/10'}`}><span>🇬🇧</span> EN</button>
            </div>
         </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0 w-[104px] h-[46px]" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <div className="w-10 h-10 rounded-2xl bg-brand-teal text-white flex items-center justify-center font-bold text-xl leading-none">
            V
          </div>
          <span className="font-bold text-xl lg:text-2xl tracking-tight text-brand-darker">Vivia</span>
        </a>

        {/* Search Bar - hidden on small mobile, takes up remaining space otherwise */}
        <div className="hidden sm:flex flex-1 max-w-3xl relative">
           <input 
             type="text" 
             placeholder={t("Search...", lang)}
             className="w-full bg-gray-50 border-2 border-brand-teal/20 focus:border-brand-teal focus:bg-white focus:outline-none rounded-full py-3 px-6 pr-12 text-sm transition-all"
           />
           <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-brand-dark hover:text-brand-teal rounded-full transition-colors">
              <Search className="w-5 h-5" />
           </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 lg:gap-5 shrink-0">
          <div className="lg:hidden flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
             <button onClick={() => setLang('TR')} className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${lang === 'TR' ? 'bg-white shadow-sm' : 'text-gray-500'}`}><span>🇹🇷</span> TR</button>
             <button onClick={() => setLang('EN')} className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${lang === 'EN' ? 'bg-white shadow-sm' : 'text-gray-500'}`}><span>🇬🇧</span> EN</button>
          </div>

          <button className="hidden md:flex flex-col items-center justify-center gap-1 text-brand-dark hover:text-brand-teal transition-colors">
             <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
               <Lock className="w-4 h-4" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-wider">{t("Login", lang)}</span>
          </button>

          <button 
            onClick={onOpenCart}
            aria-label={`Open Cart with ${cartCount} items`}
            className="flex items-center gap-2 relative bg-brand-teal hover:bg-brand-teal-dark text-white pl-4 pr-5 py-2.5 rounded-full transition-colors shadow-lg shadow-brand-teal/20"
          >
            <ShoppingBag className="w-5 h-5 p-0.5" />
            <span className="font-bold text-sm tracking-wide">{t("Cart", lang)}</span>
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
      
      {/* Category Nav - Horizontal Scroll on Mobile */}
      <div className="border-t border-gray-100 overflow-x-auto no-scrollbar hidden sm:block">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-6 md:gap-10">
           {['Dog', 'Cat', 'Bird', 'Fish', 'Rodent', 'Reptile', 'Arthropod'].map(cat => (
             <a key={cat} href="#services" className="py-3 px-2 text-sm font-semibold text-brand-dark hover:text-brand-teal border-b-2 border-transparent hover:border-brand-teal whitespace-nowrap transition-colors">
               {t(cat, lang)}
             </a>
           ))}
        </nav>
      </div>
    </header>
  );
}

function Hero({ onStartOnboarding }: { onStartOnboarding: () => void }) {
  const { lang } = useLang();

  return (
    <section className="pt-36 lg:pt-44 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Main Slider Area */}
        <div className="lg:col-span-2 relative z-10 bg-brand-teal-light rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col justify-center p-8 sm:p-12 min-h-[400px]">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-brand-teal-light via-brand-teal-light/90 to-transparent z-0" />
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white font-bold text-brand-teal-dark rounded text-xs mb-4 uppercase tracking-wider shadow-sm">
              %40 İndirim
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-darker leading-[1.1] tracking-tight mb-4">
              {lang === 'TR' ? 'Seçili Kedi Mamalarında' : 'On Selected Cat Foods'}
              <br/>
              <span className="text-brand-teal">{lang === 'TR' ? 'Büyük Kampanya' : 'Big Deals'}</span>
            </h1>
            
            <p className="text-brand-dark mb-8 font-medium">
              {lang === 'TR' 
                ? 'Stoklar bitmeden hemen alışverişe başlayın, aynı gün kargo fırsatını kaçırmayın.'
                : 'Start shopping before stocks run out, do not miss out on same-day delivery.'
              }
            </p>
            
            <button 
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg shadow-brand-teal/30"
            >
              <span>{t("Shop Now", lang)}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Side Banners */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 bg-brand-darker rounded-[24px] p-6 sm:p-8 flex items-center shadow-lg relative overflow-hidden group cursor-pointer">
             <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-darker opacity-50" />
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-teal/20 rounded-full blur-2xl group-hover:bg-brand-teal/40 transition-colors" />
             <div className="relative z-10">
                <span className="text-brand-teal-light text-xs font-bold uppercase tracking-wider mb-2 block">{t("New Products", lang)}</span>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {lang === 'TR' ? 'Yenilebilir' : 'Edible'}<br/>
                  <span className="text-brand-teal">{lang === 'TR' ? 'Kemikler' : 'Bones'}</span>
                </h3>
             </div>
          </div>
          
          <div className="flex-1 bg-brand-teal-light/50 border border-brand-teal/20 rounded-[24px] p-6 sm:p-8 flex items-center shadow-sm relative overflow-hidden group cursor-pointer">
             <div className="absolute -right-6 -bottom-6 text-9xl opacity-10 group-hover:scale-110 transition-transform">🐕</div>
             <div className="relative z-10">
                <span className="text-brand-teal text-xs font-bold uppercase tracking-wider mb-2 block">Dostunuz İçin</span>
                <h3 className="text-2xl font-bold text-brand-darker leading-tight mb-3">
                  {lang === 'TR' ? 'Profilinizi' : 'Personalize Your'}<br/>
                  <span className="text-brand-teal">{lang === 'TR' ? 'Oluşturun' : 'Profile'}</span>
                </h3>
                <button onClick={onStartOnboarding} className="text-sm font-bold text-brand-darker hover:text-brand-teal flex items-center gap-1 transition-colors">
                  İncele <ArrowRight className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

      </div>
      
      {/* Brands / Icons line */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-center gap-3 shadow-sm">
           <div className="w-10 h-10 rounded-full bg-brand-teal-light text-brand-teal flex items-center justify-center"><CheckCircle2 className="w-5 h-5"/></div>
           <span className="text-sm font-bold text-brand-darker">{lang === 'TR' ? '%100 Orijinal Ürün' : '100% Original'}</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-center gap-3 shadow-sm">
           <div className="w-10 h-10 rounded-full bg-brand-teal-light text-brand-teal flex items-center justify-center"><MapPin className="w-5 h-5"/></div>
           <span className="text-sm font-bold text-brand-darker">{lang === 'TR' ? 'Aynı Gün Teslimat' : 'Same Day Delivery'}</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-center gap-3 shadow-sm">
           <div className="w-10 h-10 rounded-full bg-brand-teal-light text-brand-teal flex items-center justify-center"><CreditCard className="w-5 h-5"/></div>
           <span className="text-sm font-bold text-brand-darker">{lang === 'TR' ? 'Güvenli Ödeme' : 'Secure Payment'}</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-center gap-3 shadow-sm">
           <div className="w-10 h-10 rounded-full bg-brand-teal-light text-brand-teal flex items-center justify-center"><Phone className="w-5 h-5"/></div>
           <span className="text-sm font-bold text-brand-darker">{lang === 'TR' ? 'Müşteri Destek' : 'Customer Support'}</span>
        </div>
      </div>
    </section>
  );
}

function Services({ onAddToCart }: { onAddToCart: (item: string) => void }) {
  const { lang } = useLang();

  return (
    <section id="services" className="py-20 bg-gray-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-darker tracking-tight">{t("Complete Care Catalog", lang)}</h2>
            <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-bold text-brand-teal hover:text-brand-teal-dark transition-colors">
              {lang === 'TR' ? 'Tümünü Gör' : 'View All'} <ChevronRight className="w-4 h-4" />
            </a>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SERVICES.map((service) => {
              // We simulate showing the first item of each category as a product card
              const topItem = service.items[0];
              
              return (
              <div key={service.id} className="group bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 hover:border-brand-teal/40 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl bg-gray-50 flex items-center justify-center mb-4 relative overflow-hidden group-hover:bg-brand-teal-light/50 transition-colors">
                  <div className="text-gray-300 group-hover:scale-110 group-hover:text-brand-teal-light transition-all duration-500">
                    {service.icon}
                  </div>
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    %15
                  </div>
                </div>
                
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{t(service.title, lang)}</span>
                <h3 className="text-sm sm:text-base font-semibold text-brand-darker mb-2 line-clamp-2 h-10 sm:h-12">{t(topItem, lang)}</h3>
                
                <div className="flex flex-col items-center gap-1 mb-4">
                  <span className="text-xs text-gray-400 line-through">1.250,00 TL</span>
                  <span className="text-lg sm:text-xl font-bold text-brand-teal-dark">1.062,50 TL</span>
                </div>

                <button 
                  aria-label={`Add ${t(topItem, lang)} to cart`}
                  onClick={() => onAddToCart(`${t(service.title, lang)} - ${t(topItem, lang)}`)}
                  className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors mt-auto"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {lang === 'TR' ? 'Sepete Ekle' : 'Add to Cart'}
                </button>
              </div>
            )})}
         </div>
         
         <div className="mt-8 text-center sm:hidden">
            <a href="#" className="inline-flex items-center gap-1 text-sm font-bold text-brand-teal hover:text-brand-teal-dark transition-colors py-2 px-4 border text-center border-brand-teal rounded-full w-full justify-center">
              {lang === 'TR' ? 'Tümünü Gör' : 'View All'} <ChevronRight className="w-4 h-4" />
            </a>
         </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const { lang } = useLang();

  return (
    <section id="about" className="py-24 bg-brand-darker text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{t("Why shop with Vivia?", lang)}</h2>
          <p className="text-brand-teal-light/80 text-lg mb-8 leading-relaxed">
            {lang === 'TR' ? 'Sadece evcil hayvanlarınızın esenliğine odaklanan bir pazar yeriyiz. İster bir köpeğe bakıyor olun, ister özel bir teraryum kuruyor olun, tam olarak ihtiyacınız olan ürünleri sunuyoruz.' : 'We are a dedicated marketplace, focused entirely on the well-being of your pets. Whether you are caring for a dog or setting up a specialized terrarium, we provide the exact products you need.'}
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-brand-teal-light" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">{t("Fast & Accessible", lang)}</h4>
                <p className="text-brand-teal-light/70 text-base">{lang === 'TR' ? 'Acil ihtiyaçlarınıza hızlı ve güvenilir bir şekilde yardımcı olmaya hazırız.' : 'Ready to assist your immediate needs quickly and reliably.'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-brand-teal-light" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">{t("Wide Ranging Expertise", lang)}</h4>
                <p className="text-brand-teal-light/70 text-base">{lang === 'TR' ? 'Yaygın evcil hayvanlardan sürüngenlere ve eklembacaklılara kadar özel zorunlu ihtiyaçları stoklarımızda bulunduruyoruz.' : 'From common pets to reptiles and arthropods, we stock specialized essentials.'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-brand-teal-light" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">{t("Direct Communication", lang)}</h4>
                <p className="text-brand-teal-light/70 text-base">{lang === 'TR' ? 'Karmaşık prosedürler yok. Bize sadece WhatsApp\'tan yazın ve sorularınızı yanıtlayalım.' : 'No complex procedures. Just message us on WhatsApp and get your questions answered.'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
           <div className="aspect-square max-w-md mx-auto relative rounded-[40px] overflow-hidden bg-brand-dark grid place-items-center">
             <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 to-transparent" />
             <div className="text-center p-8 z-10 relative">
                <div className="w-20 h-20 rounded-full bg-brand-teal/20 mx-auto flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-brand-teal-light" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t("Always Online", lang)}</h3>
                <p className="text-brand-teal-light/70 text-sm mb-6 max-w-xs mx-auto">
                  {lang === 'TR' ? 'Yüksek kaliteli ürünler her an elinizin altında.' : 'High-quality supplies always at your fingertips.'}
                </p>
                <a 
                  href="#services" 
                  className="inline-flex items-center gap-2 bg-white text-brand-darker px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-teal-light transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t("Shop Now", lang)}</span>
                </a>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="py-24 bg-brand-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-darker tracking-tight mb-6">{t("Ready to order?", lang)}</h2>
        <p className="text-brand-dark text-lg mb-12">
          {lang === 'TR' ? 'Stok durumunu onaylamak, tavsiye istemek veya sipariş vermek için doğrudan bizimle iletişime geçin. Yardımcı olmak için buradayız.' : 'Contact us directly to confirm stock, ask for recommendations, or place an order. We are here to help.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a 
            href={WA_LINK} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
            <span>{t("WhatsApp Us", lang)}</span>
          </a>
          <a 
            href={`tel:${CONTACT.phone}`} 
            className="flex items-center justify-center gap-3 bg-brand-darker hover:bg-brand-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
          >
            <Phone className="w-6 h-6" />
            <span>{t("Call directly", lang)}</span>
          </a>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm max-w-xl mx-auto text-left">
           <h3 className="font-bold text-brand-darker mb-6 flex items-center gap-2">
             <MessageCircle className="w-5 h-5 text-brand-teal" />
             {t("Contact Information", lang)}
           </h3>
           
           <div className="space-y-4">
             <div className="flex gap-3 items-center">
               <div className="w-8 text-brand-dark shrink-0" aria-hidden="true">✉️</div>
               <button 
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="text-brand-dark text-base hover:text-brand-teal transition-colors flex items-center gap-2"
               >
                 {CONTACT.email}
                 {copied && <span className="text-sm font-semibold text-brand-teal bg-brand-teal-light px-3 py-1 rounded-full">{t("Copied!", lang)}</span>}
               </button>
             </div>

             <div className="flex gap-4 pt-6 border-t border-gray-100 mt-6">
                <a href="#" aria-label="Visit our Instagram" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark hover:bg-brand-teal-light hover:text-brand-teal transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" aria-label="Visit our X (Twitter)" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark hover:bg-brand-teal-light hover:text-brand-teal transition-colors">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" aria-label="Visit our Facebook" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark hover:bg-brand-teal-light hover:text-brand-teal transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" aria-label="Visit our Youtube" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark hover:bg-brand-teal-light hover:text-brand-teal transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-teal text-white flex items-center justify-center font-bold text-sm">
            V
          </div>
          <span className="font-bold text-lg text-brand-darker tracking-tight">Vivia Pet</span>
        </div>
        
        <p className="text-sm text-brand-dark">
          &copy; {new Date().getFullYear()} Vivia Marketplace. {lang === 'TR' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
        </p>

        <div className="flex gap-6 text-sm text-brand-dark">
          <a href="#" className="hover:text-brand-teal transition-colors">{t("Terms", lang)}</a>
          <a href="#" className="hover:text-brand-teal transition-colors">{t("Privacy", lang)}</a>
        </div>
      </div>
    </footer>
  );
}

// Interactivity Modals
function OnboardingModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { lang, setLang } = useLang();
  const [step, setStep] = useState(1);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darker/40 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-title"
        >
          <div className="absolute top-6 left-6 flex bg-gray-100/80 rounded-full p-1 z-10">
             <button 
                onClick={() => setLang('TR')}
                aria-pressed={lang === 'TR'}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === 'TR' ? 'bg-white shadow-sm text-brand-darker' : 'text-gray-500 hover:text-brand-dark'}`}
             >
               <span>🇹🇷</span> TR
             </button>
             <button 
                onClick={() => setLang('EN')}
                aria-pressed={lang === 'EN'}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === 'EN' ? 'bg-white shadow-sm text-brand-darker' : 'text-gray-500 hover:text-brand-dark'}`}
             >
               <span>🇬🇧</span> EN
             </button>
          </div>

          <button aria-label="Close setup modal" onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10">
            <X className="w-6 h-6 text-brand-dark" />
          </button>

          {step === 1 ? (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-brand-teal-light flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-brand-teal" />
              </div>
              <h2 id="onboarding-title" className="text-2xl sm:text-3xl font-bold text-brand-darker mb-2">{t("Who are we shopping for?", lang)}</h2>
              <p className="text-brand-dark text-base mb-8">{t("Set up a profile to get tailored recommendations and automatic filtering.", lang)}</p>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
                {['Dog', 'Cat', 'Bird', 'Fish', 'Rodent', 'Reptile', 'Arthropod'].map(pet => (
                  <button 
                    key={pet} onClick={() => setSelectedPet(pet)}
                    aria-pressed={selectedPet === pet}
                    aria-label={`Select ${t(pet, lang)}`}
                    className={`w-[46%] sm:w-[30%] p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2
                      ${selectedPet === pet ? 'border-brand-teal bg-brand-teal-light/30 text-brand-teal-dark shadow-sm' : 'border-gray-100 hover:border-brand-teal/30 hover:bg-gray-50 text-brand-dark'}
                    `}
                  >
                    <span className="text-3xl sm:text-4xl" aria-hidden="true">{
                      pet === 'Dog' ? '🐕' : pet === 'Cat' ? '🐈' : pet === 'Bird' ? '🦜' : pet === 'Fish' ? '🐠' : pet === 'Rodent' ? '🐹' : pet === 'Reptile' ? '🦎' : '🕷️'
                    }</span>
                    <span className="font-semibold text-xs sm:text-sm text-center leading-tight break-words w-[90px]">{t(pet, lang)}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!selectedPet}
                className="w-full bg-brand-darker disabled:opacity-50 text-white rounded-full py-4 font-semibold text-lg hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
              >
                {t("Continue", lang)} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
               <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 text-4xl">
                 🎉
               </div>
               <h2 id="onboarding-title" className="text-2xl sm:text-3xl font-bold text-brand-darker mb-4">{t("Profile Created!", lang)}</h2>
               <p className="text-brand-dark text-base mb-10 leading-relaxed">
                 {t("Your shopping experience is now tailored for your ", lang)} 
                 <span className="font-bold text-brand-teal">{t(selectedPet!, lang)}</span>. 
                 <br/>
                 {t("Smart subscriptions are enabled.", lang)}
               </p>
               <button 
                  onClick={onClose}
                  className="w-full bg-brand-teal text-white rounded-full py-4 font-semibold text-lg hover:bg-brand-teal-dark transition-colors"
               >
                 {t("Start Shopping", lang)}
               </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CartModal({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }: { isOpen: boolean, onClose: () => void, cartItems: string[], onRemoveItem: (idx: number) => void, onCheckout: () => void }) {
  const { lang } = useLang();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex justify-end bg-brand-darker/40 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <h2 id="cart-title" className="text-2xl font-bold text-brand-darker flex items-center gap-3">
              {t("For Your Companion", lang)} <span className="bg-brand-teal px-3 py-1 rounded-full text-white text-sm">{cartItems.length}</span>
            </h2>
            <button aria-label="Close cart" onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-6 h-6 text-brand-dark" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-brand-dark text-center">
                <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">{lang === 'TR' ? 'Dostunuzun sepeti boş.' : 'Your companion\'s basket is empty.'}</p>
                <button onClick={onClose} className="mt-4 text-brand-teal text-lg font-medium hover:underline p-2">{t("Continue shopping", lang)}</button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <span className="font-medium text-brand-darker text-base">{item}</span>
                    <button aria-label={`Remove from cart`} onClick={() => onRemoveItem(idx)} className="text-brand-dark hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                      <Minus className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-brand-white">
              <div className="flex justify-between mb-6 text-base">
                 <span className="text-brand-dark">{t("Estimated total via WhatsApp", lang)}</span>
                 <span className="font-bold text-brand-darker">{t("Confirm with Store", lang)}</span>
              </div>
              <button 
                onClick={onCheckout}
                aria-label={t("Checkout Securely", lang)}
                className="w-full bg-brand-darker text-white rounded-full py-4 text-lg font-semibold hover:bg-brand-dark transition-colors flex items-center justify-center gap-3 shadow-lg"
              >
                <Lock className="w-5 h-5" /> {t("Checkout Securely", lang)}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CheckoutSuccessModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { lang } = useLang();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-darker/60 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
        >
          {/* Confetti / Success Visuals */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
             <div className="absolute top-10 left-10 w-2 h-2 bg-brand-teal rounded-full animate-ping" />
             <div className="absolute top-20 right-12 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" />
             <div className="absolute bottom-20 left-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
          </div>

          <div className="w-20 h-20 rounded-full bg-brand-teal border-4 border-brand-teal-light flex items-center justify-center mx-auto mb-6 relative z-10">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-brand-darker mb-2 relative z-10">{t("Order Received!", lang)}</h2>
          <p className="text-brand-dark text-sm mb-8 relative z-10">
            {lang === 'TR' ? 'Tebrikler! Dostunuz buna bayılacak. Teslimatı onaylamak için kısa süre içinde WhatsApp\'tan iletişime geçeceğiz.' : 'Great job! Your companion will love this. We\'ll send a WhatsApp message shortly to confirm delivery.'}
          </p>
          
          <button 
             onClick={onClose}
             className="w-full bg-brand-white border border-gray-200 text-brand-darker rounded-full py-4 font-semibold hover:border-brand-teal hover:text-brand-teal transition-colors relative z-10"
          >
            {t("Back to Catalog", lang)}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [lang, setLang] = useState<Lang>('TR');
  
  // Start onboarding automatically after a short delay for new user feel
  useEffect(() => {
    const timer = setTimeout(() => setIsOnboardingOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item: string) => {
    setCartItems(prev => [...prev, item]);
    setIsCartOpen(true);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsSuccessOpen(true);
    // In a real app, clear cart or process payment
    setCartItems([]);
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen mesh-bg selection:bg-brand-teal-light selection:text-brand-teal-dark overflow-x-hidden pt-20">
        <Header cartCount={cartItems.length} onOpenCart={() => setIsCartOpen(true)} />
        
        <main>
          <Hero onStartOnboarding={() => setIsOnboardingOpen(true)} />
          <Services onAddToCart={handleAddToCart} />
          <TrustSection />
          <Contact />
        </main>
        
        <Footer />

        {/* Modals */}
        <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} onRemoveItem={handleRemoveItem} onCheckout={handleCheckout} />
        <CheckoutSuccessModal isOpen={isSuccessOpen} onClose={handleCloseSuccess} />
      </div>
    </LangContext.Provider>
  );
}
