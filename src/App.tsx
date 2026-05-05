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
  Clock,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Bone,
  Cat,
  Fish,
  Bird,
  Turtle,
  Rat,
  Dog,
  Rabbit,
  X,
  Plus,
  Minus,
  CreditCard,
  Lock,
  ChevronRight,
  Sparkles,
  Moon,
  Sun,
  Package,
  Truck,
  Loader2,
  User,
  LogOut,
  Bell,
  CheckCircle2,
  Eye,
  EyeOff
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
  "Smart subscriptions are enabled.": "Akıllı abonelikler devrede.",
  "Start Shopping": "Alışverişe Başla",
  "Continue shopping": "Alışverişe devam et",
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
];

const MOCK_PRODUCTS = [
  { id: 1, name: { EN: "Premium Dog Food", TR: "Premium Köpek Maması" }, category: { EN: "Dogs", TR: "Köpekler" } },
  { id: 2, name: { EN: "Glass Terrarium 40 Gallon", TR: "Cam Teraryum 40 Galon" }, category: { EN: "Reptiles", TR: "Sürüngenler" } },
  { id: 3, name: { EN: "Automatic Cat Feeder", TR: "Otomatik Kedi Besleyici" }, category: { EN: "Cats", TR: "Kediler" } },
  { id: 4, name: { EN: "UVB Lamp 10.0", TR: "UVB Lamba 10.0" }, category: { EN: "Reptiles", TR: "Sürüngenler" } },
  { id: 5, name: { EN: "Aquarium Filter Pro", TR: "Akvaryum Filtresi Pro" }, category: { EN: "Fish", TR: "Balıklar" } },
  { id: 6, name: { EN: "Interactive Laser Toy", TR: "İnteraktif Lazer Oyuncak" }, category: { EN: "Cats", TR: "Kediler" } },
  { id: 7, name: { EN: "Orthopedic Dog Bed", TR: "Ortopedik Köpek Yatağı" }, category: { EN: "Dogs", TR: "Köpekler" } },
  { id: 8, name: { EN: "Thermostat Controller", TR: "Termostat Kontrol Cihazı" }, category: { EN: "Reptiles", TR: "Sürüngenler" } },
];

function Header({ 
  cartCount, 
  onOpenCart,
  isLoggedIn,
  onOpenAuth,
  onLogout
}: { 
  cartCount: number, 
  onOpenCart: () => void,
  isLoggedIn: boolean,
  onOpenAuth: (mode: 'login' | 'register') => void,
  onLogout: () => void
}) {
  const { lang, setLang } = useLang();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('vivia_theme');
      if (stored) return stored === 'dark';
    }
    return true; // Force dark-mode by default for the SaaS aesthetic
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const filteredSuggestions = MOCK_PRODUCTS.filter(product => 
    product.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category[lang].toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const handleSearchSelect = (val: string) => {
    setSearchQuery(val);
    setIsSearchFocused(false);
    setSearchHistory(prev => {
       const newHistory = prev.filter(item => item !== val);
       return [val, ...newHistory].slice(0, 5);
    });
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vivia_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vivia_theme', 'light');
    }
  }, [isDark]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      {/* Top Bar with Language and Promos */}
      <div className="bg-card border-b border-border text-foreground text-xs py-1.5 hidden lg:block">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-brand-teal transition-colors">🔥 {t("Deals", lang)}</a>
              <a href="#" className="hover:text-brand-teal transition-colors">✨ {t("New Products", lang)}</a>
              <a href="#contact" className="hover:text-brand-teal transition-colors">{t("Contact Information", lang)}</a>
            </div>
            <div className="flex items-center gap-2">
               <button onClick={() => setIsDark(!isDark)} className="flex items-center gap-1 px-2 py-0.5 rounded transition-colors hover:bg-secondary" aria-label="Toggle Dark Mode">
                 {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
               </button>
               <button onClick={() => setLang('TR')} className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${lang === 'TR' ? 'bg-secondary font-bold' : 'hover:bg-secondary/50'}`}><span>🇹🇷</span> TR</button>
               <button onClick={() => setLang('EN')} className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${lang === 'EN' ? 'bg-secondary font-bold' : 'hover:bg-secondary/50'}`}><span>🇬🇧</span> EN</button>
            </div>
         </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <div className="flex items-center justify-center text-brand-teal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[40px] h-[40px] mt-[1px] mb-[1px] mr-[1px] ml-[-1px] pb-0 pl-0 pr-0">
              <path d="M5 6l7 12 7-12" />
            </svg>
          </div>
          <span className="font-extrabold tracking-tight text-foreground text-[32px]">Vivia</span>
        </a>

        {/* Search Bar - hidden on small mobile, takes up remaining space otherwise */}
        <div className="hidden sm:flex flex-1 max-w-2xl relative">
           <input 
             type="text" 
             placeholder={t("Search...", lang)}
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             onFocus={() => setIsSearchFocused(true)}
             onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
             className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-background outline-none rounded-full py-2.5 px-6 pr-12 text-sm transition-all text-foreground"
           />
           <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-brand-teal rounded-full transition-colors">
              <Search className="w-4 h-4" />
           </button>

           <AnimatePresence>
             {isSearchFocused && (searchQuery.length > 0 || searchHistory.length > 0) && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 10 }}
                 className="absolute top-14 left-0 w-full bg-card rounded-2xl shadow-xl border border-border overflow-hidden z-50"
               >
                 {searchQuery.length > 0 ? (
                   filteredSuggestions.length > 0 ? (
                     <ul className="py-2">
                       {filteredSuggestions.map((product) => (
                         <li key={product.id}>
                           <button 
                             onClick={() => handleSearchSelect(product.name[lang])}
                             className="w-full text-left px-6 py-3 hover:bg-brand-teal-light/30 transition-colors flex flex-col"
                           >
                             <span className="font-medium text-foreground">{product.name[lang]}</span>
                             <span className="text-xs text-muted-foreground">{product.category[lang]}</span>
                           </button>
                         </li>
                       ))}
                     </ul>
                   ) : (
                     <div className="p-6 text-center text-muted-foreground text-sm">
                       {lang === 'TR' ? 'Sonuç bulunamadı' : 'No results found'}
                     </div>
                   )
                 ) : searchHistory.length > 0 ? (
                   <div className="py-2">
                     <div className="flex items-center justify-between px-6 py-2">
                       <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                         {lang === 'TR' ? 'Son Aramalar' : 'Recent Searches'}
                       </span>
                       <button 
                         onMouseDown={(e) => {
                           e.preventDefault();
                           setSearchHistory([]);
                         }}
                         className="text-xs font-semibold text-brand-teal hover:text-brand-teal-dark transition-colors"
                       >
                         {lang === 'TR' ? 'Temizle' : 'Clear History'}
                       </button>
                     </div>
                     <ul>
                       {searchHistory.map((item, index) => (
                         <li key={index}>
                           <button 
                             onMouseDown={(e) => {
                               e.preventDefault();
                               handleSearchSelect(item);
                             }}
                             className="w-full text-left px-6 py-2 hover:bg-brand-teal-light/30 transition-colors text-foreground flex items-center gap-2"
                           >
                             <Clock className="w-4 h-4 text-muted-foreground" />
                             {item}
                           </button>
                         </li>
                       ))}
                     </ul>
                   </div>
                 ) : null}
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 lg:gap-5 shrink-0">
          <div className="lg:hidden flex items-center bg-secondary rounded-full p-1 border border-border">
             <button onClick={() => setIsDark(!isDark)} className="p-1 rounded-full text-muted-foreground hover:text-muted-foreground transition-colors mr-1" aria-label="Toggle Dark Mode">
               {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button>
             <button onClick={() => setLang('TR')} className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${lang === 'TR' ? 'bg-card shadow-sm' : 'text-muted-foreground'}`}><span>🇹🇷</span> TR</button>
             <button onClick={() => setLang('EN')} className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${lang === 'EN' ? 'bg-card shadow-sm' : 'text-muted-foreground'}`}><span>🇬🇧</span> EN</button>
          </div>

          {/* Notifications Bell */}
          <div className="relative hidden md:block">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${isNotificationsOpen ? 'text-brand-teal' : 'text-muted-foreground hover:text-brand-teal'}`}
            >
               <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors relative ${isNotificationsOpen ? 'bg-brand-teal-light' : 'bg-secondary'}`}>
                 <Bell className="w-4 h-4" />
                 {isLoggedIn && (
                   <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-background"></span>
                 )}
               </div>
               <span className="text-[10px] font-bold uppercase tracking-wider">{lang === 'TR' ? 'Bildirim' : 'Alerts'}</span>
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  <motion.div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotificationsOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-1/2 translate-x-1/2 pt-2 z-50 min-w-[280px]"
                  >
                    <div className="bg-card rounded-xl shadow-xl border border-border overflow-hidden flex flex-col p-4 text-left">
                      <h3 className="font-bold text-sm text-foreground mb-3 pb-2 border-b border-border">
                        {lang === 'TR' ? 'Bildirimler' : 'Notifications'}
                      </h3>
                      {isLoggedIn ? (
                        <div className="space-y-4">
                           <div className="flex items-start gap-3 text-sm">
                             <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                               <Package className="w-4 h-4" />
                             </div>
                             <div>
                               <p className="font-semibold text-foreground m-0">{lang === 'TR' ? 'Siparişiniz yola çıktı!' : 'Order shipped!'}</p>
                               <p className="text-muted-foreground text-xs m-0">2 {lang === 'TR' ? 'saat önce' : 'hours ago'}</p>
                             </div>
                           </div>
                           <div className="flex items-start gap-3 text-sm">
                             <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                               <CheckCircle2 className="w-4 h-4" />
                             </div>
                             <div>
                               <p className="font-semibold text-foreground m-0">{lang === 'TR' ? 'Hoş geldiniz' : 'Welcome aboard'}</p>
                               <p className="text-muted-foreground text-xs m-0">1 {lang === 'TR' ? 'gün önce' : 'day ago'}</p>
                             </div>
                           </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground">{lang === 'TR' ? 'Bildirimleri görmek için giriş yapın.' : 'Log in to see notifications.'}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {isLoggedIn ? (
            <button 
              onClick={onLogout}
              className="hidden md:flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-brand-teal transition-colors"
            >
               <div className="w-8 h-8 rounded-full bg-brand-teal-light text-brand-teal flex items-center justify-center">
                 <LogOut className="w-4 h-4" />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-wider">{lang === 'TR' ? 'Çıkış' : 'Logout'}</span>
            </button>
          ) : (
            <div className="hidden md:block relative">
              <button 
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${isAccountMenuOpen ? 'text-brand-teal' : 'text-muted-foreground hover:text-brand-teal'}`}
              >
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isAccountMenuOpen ? 'bg-brand-teal-light' : 'bg-secondary'}`}>
                   <User className="w-4 h-4" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-wider">{lang === 'TR' ? 'Hesap' : 'Account'}</span>
              </button>

              <AnimatePresence>
                {isAccountMenuOpen && (
                  <>
                    <motion.div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsAccountMenuOpen(false)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-1/2 translate-x-1/2 pt-2 z-50 min-w-[120px]"
                    >
                      <div className="bg-card rounded-xl shadow-xl border border-border overflow-hidden flex flex-col">
                        <button 
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            onOpenAuth('login');
                          }}
                          className="w-full text-left px-4 py-3 text-sm font-semibold text-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-colors"
                        >
                          {lang === 'TR' ? 'Giriş Yap' : 'Log in'}
                        </button>
                        <button 
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            onOpenAuth('register');
                          }}
                          className="w-full text-left px-4 py-3 text-sm font-semibold text-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-colors border-t border-border"
                        >
                          {lang === 'TR' ? 'Üye Ol' : 'Sign In'}
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}

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
      <div className="border-t border-border overflow-x-auto no-scrollbar hidden sm:block">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-6 md:gap-10">
           {['Dog', 'Cat', 'Bird', 'Fish', 'Rodent', 'Reptile'].map(cat => (
             <a key={cat} href="#services" className="py-3 px-2 text-sm font-semibold text-muted-foreground hover:text-brand-teal border-b-2 border-transparent hover:border-brand-teal whitespace-nowrap transition-colors">
               {t(cat, lang)}
             </a>
           ))}
        </nav>
      </div>
    </header>
  );
}

function Hero({ onStartOnboarding, onStartPetProfile }: { onStartOnboarding: () => void, onStartPetProfile: () => void }) {
  const { lang } = useLang();

  return (
    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center rounded-full border border-brand-teal/20 bg-brand-teal/10 px-4 py-1.5 text-xs font-semibold text-brand-teal mb-6">
          {lang === 'TR' ? 'Premium Evcil Hayvan Beslenmesi' : 'Premium Pet Nutrition'}
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          {lang === 'TR' ? 'Dostlarınız için' : 'Nutrition perfected for'}
          <br/>
          <span className="text-brand-teal">{lang === 'TR' ? 'mükemmel beslenme.' : 'your best friends.'}</span>
        </h1>
        <p className="text-lg text-muted-foreground font-medium mb-8 max-w-2xl mx-auto">
           {lang === 'TR' ? 'Bilimsel olarak formüle edilmiş, yüksek kaliteli içeriklerle dolu.' : 'Scientifically formulated, packed with high-quality ingredients.'}
        </p>
        <div className="flex gap-4 justify-center">
           <button onClick={() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="rounded-full px-8 h-12 bg-brand-teal hover:bg-brand-teal-dark text-white text-base font-semibold transition-colors shadow-lg shadow-brand-teal/20">
             {t("Shop Now", lang)}
           </button>
           <button onClick={onStartPetProfile} className="rounded-full px-8 h-12 border-2 border-brand-teal/50 bg-brand-teal/5 hover:bg-brand-teal/10 text-brand-teal-dark flex items-center justify-center gap-2 text-base font-semibold transition-all shadow-sm">
             <Heart className="w-5 h-5" />
             {lang === 'TR' ? 'Dostunuzu Ekleyin' : 'Personalize for your Pet'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-[32px]">
         {/* Large feature - Dogs */}
         <div className="md:col-span-2 relative rounded-[32px] overflow-hidden min-h-[400px] md:min-h-[500px] border border-border  group bg-card">
           <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2000&auto=format&fit=crop" alt="Dog" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
           <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full">
              <div className="inline-flex items-center rounded-full bg-[#E27D60]/90 text-white px-3 py-1 text-xs font-semibold mb-4 backdrop-blur-md">
                {lang === 'TR' ? 'En Çok Değerlendirilen' : 'Top Rated'}
              </div>
              <h3 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">{lang === 'TR' ? 'Köpek Temel İhtiyaçları' : 'Dog Essentials'}</h3>
              <p className="text-white/80 max-w-md text-lg">{lang === 'TR' ? 'Aktif yaşam tarzlarını protein açısından zengin, tahılsız formüllerimizle destekleyin.' : 'Fuel their active lifestyle with our protein-rich, grain-free formulas.'}</p>
           </div>
         </div>
         {/* Smaller feature - Cats */}
         <div className="relative rounded-[32px] overflow-hidden min-h-[300px] md:min-h-0 border border-border  group bg-card">
           <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop" alt="Cat" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
           <div className="absolute bottom-0 left-0 p-8 w-full z-10 text-left">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{lang === 'TR' ? 'Kedilerin Favorileri' : 'Feline Favorites'}</h3>
              <p className="text-white/80">{lang === 'TR' ? 'Premium balık ve kümes hayvanı karışımları.' : 'Premium fish and poultry blends.'}</p>
           </div>
         </div>
         {/* Smaller feature - Birds */}
         <div className="relative rounded-[32px] overflow-hidden min-h-[300px] md:min-h-0 border border-border  group bg-card">
           <img src="https://images.unsplash.com/photo-1522858547137-f1dcec554f55?q=80&w=1000&auto=format&fit=crop" alt="Bird" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
           <div className="absolute bottom-0 left-0 p-8 w-full z-10 text-left">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{lang === 'TR' ? 'Kuş Bakımı' : 'Avian Care'}</h3>
              <p className="text-white/80">{lang === 'TR' ? 'Besin dolu tohum karışımları.' : 'Nutrient-packed seed mixes.'}</p>
           </div>
         </div>
         {/* Stats/Promo */}
         <div className="md:col-span-2 relative rounded-[32px] overflow-hidden min-h-[250px] border border-border  bg-secondary  p-8 sm:p-12 flex flex-col justify-center items-start">
           <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
           <h3 className="text-3xl font-bold mb-4 text-foreground tracking-tight">{lang === 'TR' ? 'Abonelik ile %15 Tasarruf Edin' : 'Save 15% with subscriptions'}</h3>
           <p className="text-muted-foreground mb-6 max-w-lg text-lg">{lang === 'TR' ? 'Erzaksız kalmayın. Dostunuzun iştahına göre düzenlenmiş otomatik teslimatı ayarlayın.' : 'Never run out of food again. Set up auto-delivery tailored to your companion\'s appetite.'}</p>
           <button onClick={() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="rounded-full px-6 h-10 border border-border  hover:bg-card  text-foreground text-sm font-semibold transition-colors flex items-center">
             {lang === 'TR' ? 'Daha Fazla Bilgi' : 'Learn More'} <ArrowRight className="w-4 h-4 ml-2" />
           </button>
         </div>
      </div>
    </section>
  );
}

function ProductCard({ 
  service, 
  lang, 
  onAddToCart, 
  wishlistItems, 
  onToggleWishlist 
}: { 
  service: any, 
  lang: string, 
  onAddToCart: (item: string, quantity: number) => void, 
  wishlistItems: string[], 
  onToggleWishlist: (item: string) => void 
}) {
  const [quantity, setQuantity] = useState(1);
  const topItem = service.items[0];
  const productIdentifier = `${t(service.title, 'EN')} - ${t(topItem, 'EN')}`;
  const isWishlisted = wishlistItems.includes(productIdentifier);
  
  return (
    <div className="group bg-card rounded-2xl p-4 sm:p-5 border border-border hover:border-brand-teal/40 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-300 flex flex-col items-center text-center relative h-full">
      <button 
        onClick={() => onToggleWishlist(productIdentifier)}
        className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${isWishlisted ? 'bg-brand-teal/10 text-brand-teal' : 'bg-background text-muted-foreground hover:text-brand-teal hover:bg-brand-teal/10 shadow-sm border border-border'}`}
        aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-brand-teal' : ''}`} />
      </button>

      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl bg-secondary flex items-center justify-center mb-4 relative overflow-hidden group-hover:bg-brand-teal/10 transition-colors">
        <div className="text-muted-foreground/30 group-hover:scale-110 group-hover:text-brand-teal/50 transition-all duration-500">
          {service.icon}
        </div>
        <div className="absolute top-2 left-2 bg-[#E27D60] text-white text-[10px] font-bold px-2 py-0.5 rounded">
          %15
        </div>
      </div>
      
      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{t(service.title, lang as any)}</span>
      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 line-clamp-2 h-10 sm:h-12">{t(topItem, lang as any)}</h3>
      
      <div className="flex flex-col items-center gap-1 mb-4 flex-grow">
        <span className="text-xs text-muted-foreground line-through">1.250,00 TL</span>
        <span className="text-lg sm:text-xl font-bold text-brand-teal">1.062,50 TL</span>
      </div>

      <div className="w-full flex flex-col gap-2 mt-auto">
        <div className="flex items-center justify-between border border-border rounded-xl overflow-hidden bg-background">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-brand-teal hover:bg-secondary transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-semibold text-foreground">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-brand-teal hover:bg-secondary transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          aria-label={`Add ${t(topItem, lang as any)} to cart`}
          onClick={() => {
            onAddToCart(`${t(service.title, lang as any)} - ${t(topItem, lang as any)}`, quantity);
            setQuantity(1);
          }}
          className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          {lang === 'TR' ? 'Sepete Ekle' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

function Services({ 
  onAddToCart, 
  wishlistItems = [], 
  onToggleWishlist = () => {},
  selectedPetsFilter = []
}: { 
  onAddToCart: (item: string, quantity?: number) => void,
  wishlistItems?: string[],
  onToggleWishlist?: (item: string) => void,
  selectedPetsFilter?: string[]
}) {
  const { lang } = useLang();

  const filteredServices = SERVICES.filter(service => 
    selectedPetsFilter.length === 0 || selectedPetsFilter.map(p => p.toLowerCase()).includes(service.id.toLowerCase())
  );

  return (
    <section id="services" className="py-20 bg-secondary/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{t("Complete Care Catalog", lang)}</h2>
            <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-bold text-brand-teal hover:text-brand-teal-dark transition-colors">
              {lang === 'TR' ? 'Tümünü Gör' : 'View All'} <ChevronRight className="w-4 h-4" />
            </a>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredServices.map((service) => (
              <ProductCard 
                key={service.id} 
                service={service} 
                lang={lang} 
                onAddToCart={onAddToCart} 
                wishlistItems={wishlistItems} 
                onToggleWishlist={onToggleWishlist} 
              />
            ))}
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

function OrderTrackingSection() {
  const { lang } = useLang();
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED'>('IDLE');
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError(t("Please enter a valid order ID.", lang as Lang));
      setStatus('IDLE');
      return;
    }
    setError('');
    setStatus('LOADING');
    
    setTimeout(() => {
      const len = orderId.trim().length;
      if (len < 5) {
        setStatus('PROCESSING');
      } else if (len >= 5 && len < 9) {
        setStatus('SHIPPED');
      } else {
        setStatus('DELIVERED');
      }
    }, 1200);
  };

  return (
    <section id="tracking" className="py-20 bg-card relative border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-[2rem] p-8 sm:p-12 shadow-xl border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-brand-teal-light text-brand-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-2">{t("Track Your Order", lang as Lang)}</h2>
            <p className="text-muted-foreground">{t("Enter your order ID (e.g., VIVIA-123)", lang as Lang)}</p>
          </div>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 relative z-10 w-full">
            <input 
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="VIVIA-..."
              className="flex-1 bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 font-mono uppercase transition-colors"
            />
            <button 
              type="submit"
              disabled={status === 'LOADING'}
              className="bg-brand-teal hover:bg-brand-teal-dark text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
            >
              {status === 'LOADING' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {t("Track Order", lang as Lang)}
            </button>
          </form>

          {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}

          <AnimatePresence mode="wait">
            {status !== 'IDLE' && status !== 'LOADING' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-10 pt-10 border-t border-border relative z-10"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                   <div>
                     <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-1">{t("Order ID", lang as Lang)}</p>
                     <p className="text-lg font-mono font-bold text-foreground uppercase">{orderId}</p>
                   </div>
                   <div className="md:text-right">
                     <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-1">{t("Status:", lang as Lang)}</p>
                     <div className="inline-flex items-center gap-1.5 bg-brand-teal-light text-brand-teal-dark px-3 py-1 rounded-full text-sm font-bold">
                       {status === 'PROCESSING' && <Package className="w-4 h-4" />}
                       {status === 'SHIPPED' && <Truck className="w-4 h-4" />}
                       {status === 'DELIVERED' && <CheckCircle2 className="w-4 h-4" />}
                       {status === 'PROCESSING' && t("Processing", lang as Lang)}
                       {status === 'SHIPPED' && t("Shipped", lang as Lang)}
                       {status === 'DELIVERED' && t("Delivered", lang as Lang)}
                     </div>
                   </div>
                </div>

                <div className="relative pt-4">
                  <div className="absolute top-6 left-0 w-full h-1 bg-secondary rounded-full" />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: status === 'PROCESSING' ? '15%' : status === 'SHIPPED' ? '50%' : '100%' }}
                    className="absolute top-6 left-0 h-1 bg-brand-teal rounded-full" 
                  />
                  
                  <div className="flex justify-between relative z-10">
                    <div className="flex flex-col items-center gap-2">
                       <div className={`w-5 h-5 rounded-full border-4 flex shrink-0 ${status === 'PROCESSING' || status === 'SHIPPED' || status === 'DELIVERED' ? 'bg-brand-teal border-brand-teal-light' : 'bg-muted border-background'}`} />
                       <span className={`text-[11px] font-bold uppercase tracking-wider ${status === 'PROCESSING' || status === 'SHIPPED' || status === 'DELIVERED' ? 'text-foreground' : 'text-muted-foreground'}`}>{t("Processing", lang as Lang)}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <div className={`w-5 h-5 rounded-full border-4 flex shrink-0 ${status === 'SHIPPED' || status === 'DELIVERED' ? 'bg-brand-teal border-brand-teal-light' : 'bg-muted border-background'}`} />
                       <span className={`text-[11px] font-bold uppercase tracking-wider ${status === 'SHIPPED' || status === 'DELIVERED' ? 'text-foreground' : 'text-muted-foreground'}`}>{t("Shipped", lang as Lang)}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-right">
                       <div className={`w-5 h-5 rounded-full border-4 flex shrink-0 ${status === 'DELIVERED' ? 'bg-brand-teal border-brand-teal-light' : 'bg-muted border-background'}`} />
                       <span className={`text-[11px] font-bold uppercase tracking-wider ${status === 'DELIVERED' ? 'text-foreground' : 'text-muted-foreground'}`}>{t("Delivered", lang as Lang)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const { lang } = useLang();

  return (
    <section id="about" className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{t("Why shop with Vivia?", lang)}</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
            {lang === 'TR' ? 'Sadece evcil hayvanlarınızın esenliğine odaklanan bir pazar yeriyiz. İster bir köpeğe bakıyor olun, ister özel bir teraryum kuruyor olun, tam olarak ihtiyacınız olan ürünleri sunuyoruz.' : 'We are a dedicated marketplace, focused entirely on the well-being of your pets. Whether you are caring for a dog or setting up a specialized terrarium, we provide the exact products you need.'}
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">{t("Fast & Accessible", lang)}</h4>
                <p className="text-primary-foreground/70 text-base">{lang === 'TR' ? 'Acil ihtiyaçlarınıza hızlı ve güvenilir bir şekilde yardımcı olmaya hazırız.' : 'Ready to assist your immediate needs quickly and reliably.'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">{t("Wide Ranging Expertise", lang)}</h4>
                <p className="text-primary-foreground/70 text-base">{lang === 'TR' ? 'Yaygın evcil hayvanlardan sürüngenlere kadar özel zorunlu ihtiyaçları stoklarımızda bulunduruyoruz.' : 'From common pets to reptiles, we stock specialized essentials.'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">{t("Direct Communication", lang)}</h4>
                <p className="text-primary-foreground/70 text-base">{lang === 'TR' ? 'Karmaşık prosedürler yok. Bize sadece WhatsApp\'tan yazın ve sorularınızı yanıtlayalım.' : 'No complex procedures. Just message us on WhatsApp and get your questions answered.'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
           <div className="aspect-square max-w-md mx-auto relative rounded-[40px] overflow-hidden bg-brand-dark grid place-items-center">
             <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 to-transparent" />
             <div className="text-center p-8 z-10 relative">
                <div className="w-20 h-20 rounded-full bg-primary-foreground/10 mx-auto flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{t("Always Online", lang)}</h3>
                <p className="text-white/70 text-sm mb-6 max-w-xs mx-auto">
                  {lang === 'TR' ? 'Yüksek kaliteli ürünler her an elinizin altında.' : 'High-quality supplies always at your fingertips.'}
                </p>
                <a 
                  href="#services" 
                  className="inline-flex items-center gap-2 bg-card text-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-teal/20 hover:text-brand-teal transition-colors"
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
    <section id="contact" className="py-24 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-6">{t("Ready to order?", lang)}</h2>
        <p className="text-muted-foreground text-lg mb-12">
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
            className="flex items-center justify-center gap-3 bg-primary hover:bg-brand-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
          >
            <Phone className="w-6 h-6" />
            <span>{t("Call directly", lang)}</span>
          </a>
        </div>

        <div className="bg-card rounded-[32px] p-8 border border-border shadow-sm max-w-xl mx-auto text-left">
           <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
             <MessageCircle className="w-5 h-5 text-brand-teal" />
             {t("Contact Information", lang)}
           </h3>
           
           <div className="space-y-4">
             <div className="flex gap-3 items-center">
               <div className="w-8 text-muted-foreground shrink-0" aria-hidden="true">✉️</div>
               <button 
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="text-muted-foreground text-base hover:text-brand-teal transition-colors flex items-center gap-2"
               >
                 {CONTACT.email}
                 {copied && <span className="text-sm font-semibold text-brand-teal bg-brand-teal-light px-3 py-1 rounded-full">{t("Copied!", lang)}</span>}
               </button>
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
    <footer className="bg-card py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center text-brand-teal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M5 6l7 12 7-12" />
              </svg>
            </div>
            <span className="font-bold text-lg text-foreground tracking-tight">Vivia Pet</span>
          </div>
          
          <div className="flex gap-4">
            <a href="#" aria-label="Visit our Instagram" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Visit our X (Twitter)" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" aria-label="Visit our Facebook" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Visit our Youtube" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Vivia Marketplace. {lang === 'TR' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
          </p>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-brand-teal transition-colors">{t("Terms", lang)}</a>
            <a href="#" className="hover:text-brand-teal transition-colors">{t("Privacy", lang)}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Personalization Modal
function PetProfileModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { lang, setLang } = useLang();
  const [petType, setPetType] = useState('Dog');
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darker/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-card rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute top-6 left-6 flex bg-secondary/80 rounded-full p-1 z-10">
             <button 
                onClick={() => setLang('TR')}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === 'TR' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-muted-foreground'}`}
             >
               <span>🇹🇷</span> TR
             </button>
             <button 
                onClick={() => setLang('EN')}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === 'EN' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-muted-foreground'}`}
             >
               <span>🇬🇧</span> EN
             </button>
          </div>

          <button aria-label="Close" onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors z-10 text-muted-foreground hover:text-foreground">
            <X className="w-6 h-6" />
          </button>

          {!isSaved ? (
            <div className="mt-12">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 fill-current" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {lang === 'TR' ? 'Dostunuzu Tanıyın' : 'Tell us about your pet'}
                </h2>
                <p className="text-muted-foreground">
                  {lang === 'TR' ? 'Özel öneriler ve beslenme planı için profil oluşturun.' : 'Create a profile for customized recommendations and nutrition plans.'}
                </p>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    {lang === 'TR' ? 'Evcil Hayvan Türü' : 'Pet Type'}
                  </label>
                  <div className="flex bg-secondary p-1 rounded-xl w-full">
                    {['Dog', 'Cat', 'Bird', 'Rabbit'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPetType(type)}
                        className={`flex-1 py-3 text-sm font-semibold transition-all rounded-lg flex items-center justify-center gap-2 ${petType === type ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-secondary-dark'}`}
                      >
                        {type === 'Dog' && <Dog className="w-4 h-4" />}
                        {type === 'Cat' && <Cat className="w-4 h-4" />}
                        {type === 'Bird' && <Bird className="w-4 h-4" />}
                        {type === 'Rabbit' && <Rabbit className="w-4 h-4" />}
                        <span className="hidden sm:inline">{t(type, lang)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {lang === 'TR' ? 'Evcil Hayvanın Adı' : 'Pet Name'}
                    </label>
                    <input 
                      required
                      type="text" 
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder={lang === 'TR' ? 'Örn: Tarçın' : 'e.g. Max'}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {lang === 'TR' ? 'Yaşı' : 'Age'}
                    </label>
                    <input 
                      required
                      type="number" 
                      value={petAge}
                      onChange={(e) => setPetAge(e.target.value)}
                      placeholder={lang === 'TR' ? 'Yıl olarak' : 'In years'}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                {petType !== 'Bird' && petType !== 'Rabbit' && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {lang === 'TR' ? 'Irkı (İsteğe bağlı)' : 'Breed (Optional)'}
                    </label>
                    <input 
                      type="text" 
                      value={petBreed}
                      onChange={(e) => setPetBreed(e.target.value)}
                      placeholder={petType === 'Dog' ? (lang === 'TR' ? 'Örn: Golden Retriever' : 'e.g. Golden Retriever') : (lang === 'TR' ? 'Örn: Tekir' : 'e.g. Siamese')}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none"
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-brand-teal text-white rounded-xl py-4 font-bold text-lg hover:bg-brand-teal-dark transition-colors shadow-lg shadow-brand-teal/20"
                >
                  {lang === 'TR' ? 'Profili Kaydet' : 'Save Profile'}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-12 mt-8">
               <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 className="w-10 h-10 text-green-500" />
               </div>
               <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                 {lang === 'TR' ? `${petName || 'Evcil hayvan'} eklendi!` : `${petName || 'Pet'} has been added!`}
               </h2>
               <p className="text-muted-foreground text-lg">
                 {lang === 'TR' ? 'Mağaza deneyiminiz güncelleniyor...' : 'Personalizing your store experience...'}
               </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Interactivity Modals
function OnboardingModal({ isOpen, onClose, selectedPets, onSelectionChange }: { isOpen: boolean, onClose: () => void, selectedPets: string[], onSelectionChange: (pets: string[]) => void }) {
  const { lang, setLang } = useLang();
  const [step, setStep] = useState(1);

  const togglePet = (pet: string) => {
    if (selectedPets.includes(pet)) {
      onSelectionChange(selectedPets.filter(p => p !== pet));
    } else {
      onSelectionChange([...selectedPets, pet]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darker/40 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-title"
        >
          <div className="absolute top-6 left-6 flex bg-secondary/80 rounded-full p-1 z-10">
             <button 
                onClick={() => setLang('TR')}
                aria-pressed={lang === 'TR'}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === 'TR' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-muted-foreground'}`}
             >
               <span>🇹🇷</span> TR
             </button>
             <button 
                onClick={() => setLang('EN')}
                aria-pressed={lang === 'EN'}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === 'EN' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-muted-foreground'}`}
             >
               <span>🇬🇧</span> EN
             </button>
          </div>

          <button aria-label="Close setup modal" onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors z-10">
            <X className="w-6 h-6 text-muted-foreground" />
          </button>

          {step === 1 ? (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-brand-teal-light flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[50px] h-[50px] text-brand-teal">
                  <path d="M5 6l7 12 7-12" />
                </svg>
              </div>
              <h2 id="onboarding-title" className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{t("Who are we shopping for?", lang)}</h2>
              <p className="text-muted-foreground text-base mb-8">{t("Set up a profile to get tailored recommendations and automatic filtering.", lang)}</p>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
                {['Dog', 'Cat', 'Bird', 'Fish', 'Rodent', 'Reptile'].map(pet => (
                  <button 
                    key={pet} onClick={() => togglePet(pet)}
                    aria-pressed={selectedPets.includes(pet)}
                    aria-label={`Select ${t(pet, lang)}`}
                    className={`w-[46%] sm:w-[30%] p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2
                      ${selectedPets.includes(pet) ? 'border-brand-teal bg-brand-teal-light/30 text-brand-teal-dark shadow-sm' : 'border-border hover:border-brand-teal/30 hover:bg-secondary text-muted-foreground'}
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
                disabled={selectedPets.length === 0}
                className="w-full bg-primary disabled:opacity-50 text-white rounded-full py-4 font-semibold text-lg hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
              >
                {t("Continue", lang)} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
               <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6 text-4xl">
                 🎉
               </div>
               <h2 id="onboarding-title" className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{t("Profile Created!", lang)}</h2>
               <p className="text-muted-foreground text-base mb-10 leading-relaxed">
                 {t("Your shopping experience is now tailored for your ", lang)} 
                 <span className="font-bold text-brand-teal">{selectedPets.map(p => t(p, lang)).join(', ')}</span>. 
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
          className="bg-card w-full max-w-md h-full shadow-2xl flex flex-col"
        >
          <div className="p-6 border-b border-border flex justify-between items-center bg-card">
            <h2 id="cart-title" className="text-2xl font-bold text-foreground flex items-center gap-3">
              {t("For Your Companion", lang)} <span className="bg-brand-teal px-3 py-1 rounded-full text-white text-sm">{cartItems.length}</span>
            </h2>
            <button aria-label="Close cart" onClick={onClose} className="p-2 rounded-full hover:bg-secondary transition-colors">
              <X className="w-6 h-6 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-card">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center">
                <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">{lang === 'TR' ? 'Dostunuzun sepeti boş.' : 'Your companion\'s basket is empty.'}</p>
                <button onClick={onClose} className="mt-4 text-brand-teal text-lg font-medium hover:underline p-2">{t("Continue shopping", lang)}</button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-secondary p-4 rounded-2xl border border-border">
                    <span className="font-medium text-foreground text-base">{item}</span>
                    <button aria-label={`Remove from cart`} onClick={() => onRemoveItem(idx)} className="text-muted-foreground hover:text-red-500 transition-colors p-2 rounded-full hover:bg-destructive/10">
                      <Minus className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-border bg-card">
              <div className="flex justify-between mb-6 text-base">
                 <span className="text-muted-foreground">{t("Estimated total via WhatsApp", lang)}</span>
                 <span className="font-bold text-foreground">{t("Confirm with Store", lang)}</span>
              </div>
              <button 
                onClick={onCheckout}
                aria-label={t("Checkout Securely", lang)}
                className="w-full bg-primary text-white rounded-full py-4 text-lg font-semibold hover:bg-brand-dark transition-colors flex items-center justify-center gap-3 shadow-lg"
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
          className="bg-card rounded-[32px] p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
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
          
          <h2 className="text-2xl font-bold text-foreground mb-2 relative z-10">{t("Order Received!", lang)}</h2>
          <p className="text-muted-foreground text-sm mb-8 relative z-10">
            {lang === 'TR' ? 'Tebrikler! Dostunuz buna bayılacak. Teslimatı onaylamak için kısa süre içinde WhatsApp\'tan iletişime geçeceğiz.' : 'Great job! Your companion will love this. We\'ll send a WhatsApp message shortly to confirm delivery.'}
          </p>
          
          <button 
             onClick={onClose}
             className="w-full bg-card border border-border text-foreground rounded-full py-4 font-semibold hover:border-brand-teal hover:text-brand-teal transition-colors relative z-10"
          >
            {t("Back to Catalog", lang)}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function AuthModal({ 
  mode, 
  onClose,
  onLogin
}: { 
  mode: 'login' | 'register' | null, 
  onClose: () => void,
  onLogin: (remember: boolean, email: string) => void
}) {
  const { lang } = useLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [remember, setRemember] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedMarketing, setAgreedMarketing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Internal switch state if they want to swap mode within modal
  const [currentMode, setCurrentMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (mode) {
      setCurrentMode(mode);
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setPhone('');
      setRemember(false);
      setAgreedPrivacy(false);
      setAgreedMarketing(false);
      setSuccess(false);
      setIsSubmitting(false);
      setShowPassword(false);
    }
  }, [mode]);

  if (!mode) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-brand-darker/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div 
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative my-auto"
        >
          <button aria-label="Close auth modal" onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors z-10">
            <X className="w-6 h-6 text-muted-foreground" />
          </button>

          {success && currentMode === 'register' ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{t("Account created successfully!", lang)}</h2>
              <p className="text-muted-foreground mb-6">{lang === 'TR' ? 'Artık giriş yapabilirsiniz.' : 'You can now log in.'}</p>
              <button 
                onClick={() => setCurrentMode('login')}
                className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                {t("Login", lang)}
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6 pt-2">
                <div className="w-16 h-16 bg-brand-teal-light text-brand-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {currentMode === 'login' ? t("Login", lang) : t("Sign Up", lang)}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {currentMode === 'login' 
                    ? t("Sign in to your account", lang) 
                    : t("Create a new account", lang)}
                </p>
              </div>

              <div className="flex bg-secondary p-1 rounded-xl mb-6">
                <button 
                  onClick={() => setCurrentMode('login')}
                  className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${currentMode === 'login' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
                >
                  {t("Login", lang)}
                </button>
                <button 
                  onClick={() => setCurrentMode('register')}
                  className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${currentMode === 'register' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
                >
                  {t("Sign Up", lang)}
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setTimeout(() => {
                  setIsSubmitting(false);
                  if (currentMode === 'login') {
                    if (email && password) {
                      onLogin(remember, email);
                      onClose();
                    }
                  } else {
                    if (email && password && firstName && lastName && agreedPrivacy) {
                      setSuccess(true);
                      fetch('/api/email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          to: email,
                          type: 'REGISTER',
                          data: { firstName, lastName }
                        })
                      }).catch(console.error);
                      
                      // Also automatically log in after short delay, but for now wait for user to click
                      localStorage.setItem('vivia_user_email', email);
                    }
                  }
                }, 1000); // Simulate network
              }} className="space-y-4">
                
                {currentMode === 'register' && (
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-foreground mb-1.5">{t("First Name", lang)}</label>
                      <input 
                        type="text" 
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-colors"
                        placeholder={lang === 'TR' ? 'Ad' : 'Name'}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-foreground mb-1.5">{t("Last Name", lang)}</label>
                      <input 
                        type="text" 
                        required
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-colors"
                        placeholder={lang === 'TR' ? 'Soyad' : 'Surname'}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">{t("E-Mail", lang)}</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-colors"
                    placeholder={lang === 'TR' ? 'E-Posta' : 'E-Mail'}
                  />
                </div>

                {currentMode === 'register' && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">{t("Phone Number", lang)}</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-colors"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">{t("Password", lang)}</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 pr-12 transition-colors"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand-teal transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                {currentMode === 'login' && (
                  <div className="flex items-center justify-between pt-2 pb-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="remember"
                        checked={remember}
                        onChange={e => setRemember(e.target.checked)}
                        className="w-4 h-4 text-brand-teal focus:ring-brand-teal border-border rounded cursor-pointer"
                      />
                      <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none">
                        {t("Remember Me", lang)}
                      </label>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => {
                        if (email) {
                          fetch('/api/email', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ to: email, type: 'PASSWORD_RESET' })
                          }).catch(console.error);
                          alert(lang === 'TR' ? 'Şifre sıfırlama e-postası gönderildi.' : 'Password reset email sent.');
                        } else {
                          alert(lang === 'TR' ? 'Lütfen önce e-posta adresinizi girin.' : 'Please enter your email address first.');
                        }
                      }}
                      className="text-sm font-semibold text-brand-teal hover:text-muted-foreground transition-colors"
                    >
                      {lang === 'TR' ? 'Şifremi Unuttum' : 'Forgot Password?'}
                    </button>
                  </div>
                )}

                {currentMode === 'register' && (
                  <div className="space-y-3 pt-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="agreedPrivacy"
                        required
                        checked={agreedPrivacy}
                        onChange={e => setAgreedPrivacy(e.target.checked)}
                        className="mt-1 w-4 h-4 text-brand-teal focus:ring-brand-teal border-border rounded cursor-pointer shrink-0"
                      />
                      <label htmlFor="agreedPrivacy" className="cursor-pointer select-none leading-tight">
                        {t("I have read and agree to the KVKK Privacy Policy.", lang)}
                      </label>
                    </div>
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="agreedMarketing"
                        checked={agreedMarketing}
                        onChange={e => setAgreedMarketing(e.target.checked)}
                        className="mt-1 w-4 h-4 text-brand-teal focus:ring-brand-teal border-border rounded cursor-pointer shrink-0"
                      />
                      <label htmlFor="agreedMarketing" className="cursor-pointer select-none leading-tight">
                        {t("I want to receive marketing emails and SMS about discounts and new products.", lang)}
                      </label>
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold py-3.5 rounded-xl transition-colors mt-2 text-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {currentMode === 'login' ? t("Login", lang) : t("Create Account", lang)}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const PetCollageIcon = ({ className }: { className?: string }) => (
  <div className={`grid grid-cols-2 gap-0.5 ${className}`}>
    <Dog className="w-full h-full" strokeWidth={2.5} />
    <Cat className="w-full h-full" strokeWidth={2.5} />
    <Bird className="w-full h-full" strokeWidth={2.5} />
    <Rabbit className="w-full h-full" strokeWidth={2.5} />
  </div>
);

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isPetProfileOpen, setIsPetProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedPetsFilter, setSelectedPetsFilter] = useState<string[]>([]);
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [lang, setLang] = useState<Lang>('TR');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if user chose to be remembered
    const rememberedLogin = localStorage.getItem('vivia_logged_in');
    const email = localStorage.getItem('vivia_user_email');
    if (rememberedLogin === 'true') {
      setIsLoggedIn(true);
      if (email) setUserEmail(email);
    }
  }, []);

  const handleLogin = (remember: boolean, email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('vivia_user_email', email);
    if (remember) {
      localStorage.setItem('vivia_logged_in', 'true');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    localStorage.removeItem('vivia_logged_in');
    localStorage.removeItem('vivia_user_email');
  };

  // Start onboarding automatically after a short delay for new user feel
  useEffect(() => {
    const timer = setTimeout(() => setIsOnboardingOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item: string, quantity = 1) => {
    setCartItems(prev => {
      const newItems = [...prev];
      for (let i = 0; i < quantity; i++) {
        newItems.push(item);
      }
      return newItems;
    });
    setIsCartOpen(true);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleToggleWishlist = (item: string) => {
    setWishlistItems(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsSuccessOpen(true);
    
    // Send email notification for checkout
    const email = localStorage.getItem('vivia_user_email') || 'customer@example.com';
    fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        type: 'CHECKOUT'
      })
    }).catch(console.error);
    
    // Simulate a delayed shipping update
    setTimeout(() => {
      fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          type: 'SHIPPING'
        })
      }).catch(console.error);
    }, 10000); // 10 seconds later for demo purposes

    // In a real app, clear cart or process payment
    setCartItems([]);
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen mesh-bg selection:bg-brand-teal-light selection:text-brand-teal-dark overflow-x-hidden pt-20">
        <Header 
          cartCount={cartItems.length} 
          onOpenCart={() => setIsCartOpen(true)} 
          isLoggedIn={isLoggedIn}
          onOpenAuth={setAuthMode}
          onLogout={handleLogout}
        />
        
        {/* Floating Category Filter Button */}
        <button
          onClick={() => setIsOnboardingOpen(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-brand-teal p-2 sm:p-3 rounded-r-2xl text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-brand-teal-dark hover:pl-4 transition-all group overflow-hidden"
          aria-label="Filter categories"
        >
          <PetCollageIcon className="w-9 h-9 sm:w-11 sm:h-11 group-hover:scale-110 transition-transform" />
        </button>
        
        <main>
          <Hero onStartOnboarding={() => setIsOnboardingOpen(true)} onStartPetProfile={() => setIsPetProfileOpen(true)} />
          <Services onAddToCart={handleAddToCart} wishlistItems={wishlistItems} onToggleWishlist={handleToggleWishlist} selectedPetsFilter={selectedPetsFilter} />
          <OrderTrackingSection />
          <TrustSection />
          <Contact />
        </main>
        
        <Footer />

        {/* Modals */}
        <PetProfileModal isOpen={isPetProfileOpen} onClose={() => setIsPetProfileOpen(false)} />
        <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} selectedPets={selectedPetsFilter} onSelectionChange={setSelectedPetsFilter} />
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} onRemoveItem={handleRemoveItem} onCheckout={handleCheckout} />
        <CheckoutSuccessModal isOpen={isSuccessOpen} onClose={handleCloseSuccess} />
        <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onLogin={handleLogin} />
      </div>
    </LangContext.Provider>
  );
}
