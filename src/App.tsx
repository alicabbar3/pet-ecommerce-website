import React, { useState, useEffect, createContext, useContext } from 'react';
import turkeyData from './turkeyData';
import { CATEGORIES } from './categories';
import CategoryPage, { ProductListingCard, generateDummyProducts } from './CategoryPage';
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
  ChevronDown,
  Sparkles,
  Moon,
  Sun,
  Package,
  Truck,
  Loader2,
  User,
  LogOut,
  Bell,
  Eye,
  EyeOff,
  Trash2,
  Camera,
  Folder,
  FolderOpen,
  FolderPlus,
  Bookmark,
  Menu
} from 'lucide-react';

const BubblesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="16" r="3" />
    <circle cx="9" cy="10" r="2" />
    <circle cx="15" cy="7" r="1.5" />
    <circle cx="13" cy="4" r="1" />
  </svg>
);

import { Lang, LangContext, useLang, t } from './i18n';

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
  { id: 'avian', title: 'Avian', icon: <Bird className="w-6 h-6" />, items: ['Seed Mixes', 'Spacious Cages', 'Natural Perches', 'Smart Feeders', 'Bell Swings', 'Baths'] },
  { id: 'aquatic', title: 'Aquatic', icon: <BubblesIcon className="w-6 h-6" />, items: ['Flake Food', 'Glass Aquariums', 'Silent Filtration', 'Decorations', 'Water Care'] },
  { id: 'rodent', title: 'Rodent', icon: <Rat className="w-6 h-6" />, items: ['Pellet Mix', 'Multi-level Cages', 'Running Wheels', 'Chew Toys', 'Wooden Huts'] },
  { id: 'reptile', title: 'Reptile', icon: <Turtle className="w-6 h-6" />, items: ['Live/Dried Food', 'Glass Terrariums', 'UVB Lamps', 'Thermostats', 'Hygrometers'] },
];

const MOCK_PRODUCTS = [
  { id: 1, name: { EN: "Premium Dog Food", TR: "Premium Köpek Maması" }, category: { EN: "Dogs", TR: "Köpekler" } },
  { id: 2, name: { EN: "Glass Terrarium 40 Gallon", TR: "Cam Teraryum 40 Galon" }, category: { EN: "Reptiles", TR: "Sürüngenler" } },
  { id: 3, name: { EN: "Automatic Cat Feeder", TR: "Otomatik Kedi Besleyici" }, category: { EN: "Cats", TR: "Kediler" } },
  { id: 4, name: { EN: "UVB Lamp 10.0", TR: "UVB Lamba 10.0" }, category: { EN: "Reptiles", TR: "Sürüngenler" } },
  { id: 5, name: { EN: "Aquarium Filter Pro", TR: "Akvaryum Filtresi Pro" }, category: { EN: "Aquatic", TR: "Sucul Canlılar" } },
  { id: 6, name: { EN: "Interactive Laser Toy", TR: "İnteraktif Lazer Oyuncak" }, category: { EN: "Cats", TR: "Kediler" } },
  { id: 7, name: { EN: "Orthopedic Dog Bed", TR: "Ortopedik Köpek Yatağı" }, category: { EN: "Dogs", TR: "Köpekler" } },
  { id: 8, name: { EN: "Thermostat Controller", TR: "Termostat Kontrol Cihazı" }, category: { EN: "Reptiles", TR: "Sürüngenler" } },
];

function Header({ 
  cartCount, 
  onOpenCart,
  onOpenFolders,
  isLoggedIn,
  onOpenAuth,
  onLogout
}: { 
  cartCount: number, 
  onOpenCart: () => void,
  onOpenFolders: () => void,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Stop closing mega menu immediately to allow cursor movement
  let debounceTimer: NodeJS.Timeout;

  const handleMouseEnterCategory = (id: string) => {
    clearTimeout(debounceTimer);
    setActiveCategory(id);
  };

  const handleMouseLeaveCategory = () => {
    debounceTimer = setTimeout(() => setActiveCategory(null), 150);
  };

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
              <a href="#" className="hover:text-brand-teal transition-all duration-300">🔥 {t("Deals", lang)}</a>
              <a href="#" className="hover:text-brand-teal transition-all duration-300">✨ {t("New Products", lang)}</a>
              <a href="#contact" className="hover:text-brand-teal transition-all duration-300">{t("Contact Information", lang)}</a>
            </div>
            <div className="flex items-center gap-2">
               <Tooltip text={lang === 'TR' ? 'Temayı Değiştir' : 'Toggle Theme'} position="bottom">
                 <button onClick={() => setIsDark(!isDark)} className="flex items-center gap-1 px-2 py-0.5 rounded transition-all duration-300 hover:bg-secondary" aria-label="Toggle Dark Mode">
                   {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                 </button>
               </Tooltip>
               <button onClick={() => setLang('TR')} className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all duration-300 ${lang === 'TR' ? 'bg-secondary font-bold' : 'hover:bg-secondary/50'}`}><span>🇹🇷</span> TR</button>
               <button onClick={() => setLang('EN')} className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all duration-300 ${lang === 'EN' ? 'bg-secondary font-bold' : 'hover:bg-secondary/50'}`}><span>🇬🇧</span> EN</button>
            </div>
         </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-1.5 -ml-2 text-foreground hover:bg-secondary rounded-xl transition-colors active:scale-95"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0" onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <img src="/logo.png" alt="Vivia Logo" className="w-[72px] h-[72px] -mb-1.5 object-contain rounded-xl drop-shadow-md hover:scale-105 transition-transform duration-300" />
            <span className="font-extrabold tracking-tight text-foreground text-[32px] -ml-2.5 pl-0.5 pt-0.5 mb-1.5 hidden sm:block">Vivia</span>
          </a>
        </div>

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
           <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-brand-teal rounded-full transition-all duration-300">
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
                             className="w-full text-left px-6 py-3 hover:bg-brand-teal-light/30 transition-all duration-300 flex flex-col"
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
                         className="text-xs font-semibold text-brand-teal hover:text-brand-teal-dark transition-all duration-300"
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
                             className="w-full text-left px-6 py-2 hover:bg-brand-teal-light/30 transition-all duration-300 text-foreground flex items-center gap-2"
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
             <button onClick={() => setIsDark(!isDark)} className="p-1 rounded-full text-muted-foreground hover:text-foreground active:scale-90 transition-all duration-200 hover:rotate-12 mr-1" aria-label="Toggle Dark Mode">
               {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button>
             <button onClick={() => setLang('TR')} className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full active:scale-95 transition-all duration-200 ${lang === 'TR' ? 'bg-card shadow-sm scale-105' : 'text-muted-foreground hover:text-foreground'}`}><span>🇹🇷</span> TR</button>
             <button onClick={() => setLang('EN')} className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full active:scale-95 transition-all duration-200 ${lang === 'EN' ? 'bg-card shadow-sm scale-105' : 'text-muted-foreground hover:text-foreground'}`}><span>🇬🇧</span> EN</button>
          </div>

          {/* Folders Button */}
          <div className="relative hidden md:block">
            <Tooltip text={lang === 'TR' ? 'Klasörlerim' : 'My Folders'} position="bottom">
              <button 
                onClick={onOpenFolders}
                className={`group flex flex-col items-center justify-center gap-1 transition-all duration-300 text-muted-foreground hover:text-brand-teal`}
              >
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95 relative bg-secondary`}>
                   <Folder className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-wider">{lang === 'TR' ? 'Klasör' : 'Folders'}</span>
              </button>
            </Tooltip>
          </div>

          {/* Notifications Bell */}
          <div className="relative hidden md:block">
            <Tooltip text={lang === 'TR' ? 'Bildirimleri Görüntüle' : 'View Notifications'} position="bottom">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`group flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isNotificationsOpen ? 'text-brand-teal' : 'text-muted-foreground hover:text-brand-teal'}`}
              >
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95 relative ${isNotificationsOpen ? 'bg-brand-teal-light' : 'bg-secondary'}`}>
                   <Bell className="w-4 h-4 group-hover:rotate-[15deg] transition-transform duration-300" />
                   {isLoggedIn && (
                     <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-background"></span>
                   )}
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-wider">{lang === 'TR' ? 'Bildirim' : 'Alerts'}</span>
              </button>
            </Tooltip>





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
            <Tooltip text={lang === 'TR' ? 'Hesaptan Çıkış Yap' : 'Log out of your account'} position="bottom">
              <button 
                onClick={onLogout}
                className="hidden md:flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-brand-teal transition-all duration-300"
              >
                 <div className="w-8 h-8 rounded-full bg-brand-teal-light text-brand-teal flex items-center justify-center">
                   <LogOut className="w-4 h-4" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-wider">{lang === 'TR' ? 'Çıkış' : 'Logout'}</span>
              </button>
            </Tooltip>
          ) : (
            <div className="hidden md:block relative">
              <Tooltip text={lang === 'TR' ? 'Hesabınızı Yönetin' : 'Manage your account'} position="bottom">
                <button 
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isAccountMenuOpen ? 'text-brand-teal' : 'text-muted-foreground hover:text-brand-teal'}`}
                >
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isAccountMenuOpen ? 'bg-brand-teal-light' : 'bg-secondary'}`}>
                     <User className="w-4 h-4" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-wider">{lang === 'TR' ? 'Hesap' : 'Account'}</span>
                </button>
              </Tooltip>

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
                          className="w-full text-left px-4 py-3 text-sm font-semibold text-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300"
                        >
                          {lang === 'TR' ? 'Giriş Yap' : 'Log in'}
                        </button>
                        <button 
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            onOpenAuth('register');
                          }}
                          className="w-full text-left px-4 py-3 text-sm font-semibold text-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300 border-t border-border"
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

          {/* Cart Button */}
          <Tooltip text={lang === 'TR' ? 'Sepetinizi Görüntüleyin' : 'View your shopping cart'} position="bottom">
            <button 
              onClick={onOpenCart}
              aria-label={`Open Cart with ${cartCount} items`}
              className="flex items-center gap-2 relative bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white pl-4 pr-5 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-brand-teal/20"
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
          </Tooltip>
        </div>
      </div>
      
      {/* Desktop Mega Menu Nav */}
      <div className="border-t border-border hidden lg:block bg-background relative z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-8" onMouseLeave={handleMouseLeaveCategory}>
          {CATEGORIES.map(category => (
            <div 
              key={category.id} 
              className="relative"
              onMouseEnter={() => handleMouseEnterCategory(category.id)}
            >
              <button 
                onClick={() => {
                  if (activeCategory === category.id) setActiveCategory(null);
                  else setActiveCategory(category.id);
                }}
                className={`py-3 px-2 text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1 group ${activeCategory === category.id ? 'text-brand-teal' : 'text-muted-foreground hover:text-brand-teal'}`}
              >
                {category.name[lang]}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeCategory === category.id ? 'rotate-180 text-brand-teal' : 'text-muted-foreground group-hover:text-brand-teal'}`} />
              </button>
            </div>
          ))}
        </nav>
        
        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-card border-b border-border shadow-2xl z-50 overflow-hidden"
              onMouseEnter={() => handleMouseEnterCategory(activeCategory)}
              onMouseLeave={handleMouseLeaveCategory}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex">
                <div className="w-1/4 pr-8 border-r border-border shrink-0">
                   {/* Left Feature Column */}
                   <h3 className="font-bold text-xl mb-4 text-foreground">
                     {lang === 'TR' ? 'Öne Çıkanlar' : 'Featured'}
                   </h3>
                   <div className="bg-brand-teal/10 rounded-xl p-6 border border-brand-teal/20 text-center flex flex-col items-center justify-center h-48 group cursor-pointer hover:bg-brand-teal/20 transition-colors">
                      <Sparkles className="w-8 h-8 text-brand-teal mb-3 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-brand-teal">
                         {lang === 'TR' ? 'Yeni Gelenler' : 'New Arrivals'}
                      </span>
                   </div>
                </div>
                
                <div className="w-3/4 pl-8 grid grid-cols-3 gap-y-6 gap-x-8">
                  {CATEGORIES.find(c => c.id === activeCategory)?.subcategories.map(sub => (
                    <a key={sub.id} href={`#/category/${sub.id}`} className="text-sm font-medium text-muted-foreground hover:text-brand-teal transition-colors flex items-center group">
                      <ChevronRight className="w-3.5 h-3.5 mr-1.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-brand-teal" />
                      {sub.name[lang]}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-background shadow-2xl z-[110] lg:hidden flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <a href="#" className="flex items-center gap-2" onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '';
                  setIsMobileMenuOpen(false);
                }}>
                  <img src="/logo.png" alt="Vivia Logo" className="w-10 h-10 object-contain rounded-lg" />
                  <span className="font-extrabold tracking-tight text-foreground text-xl">Vivia</span>
                </a>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-secondary rounded-full text-foreground hover:bg-secondary-dark transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar p-4">
                <nav className="flex flex-col gap-2 relative">
                  {CATEGORIES.map(category => (
                    <div key={category.id} className="border border-border rounded-xl bg-card overflow-hidden transition-colors">
                      <button 
                        onClick={() => setMobileExpanded(mobileExpanded === category.id ? null : category.id)}
                        className="w-full text-left px-4 py-4 flex items-center justify-between text-base font-semibold text-foreground"
                      >
                        {category.name[lang]}
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${mobileExpanded === category.id ? 'rotate-180 text-brand-teal' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === category.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-secondary/30"
                          >
                            <div className="flex flex-col py-2">
                              {category.subcategories.map(sub => (
                                <a 
                                  key={sub.id} 
                                  href={`#/category/${sub.id}`} 
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="py-2.5 px-6 text-sm font-medium text-muted-foreground hover:text-brand-teal hover:bg-brand-teal/5 transition-colors"
                                >
                                  {sub.name[lang]}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ onStartOnboarding, onStartPetProfile, userPets }: { onStartOnboarding: () => void, onStartPetProfile: () => void, userPets: any[] }) {
  const { lang } = useLang();
  
  const activePetsCount = userPets.filter(p => p.name).length;

  return (
    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          {lang === 'TR' ? 'Dostlarınız için' : 'Nutrition perfected for'}
          <br/>
          <span className="text-brand-teal">{lang === 'TR' ? 'mükemmel beslenme.' : 'your best friends.'}</span>
        </h1>
        <p className="text-lg text-muted-foreground font-medium mb-8 max-w-2xl mx-auto">
           {lang === 'TR' ? 'Bilimsel olarak formüle edilmiş, yüksek kaliteli içeriklerle dolu.' : 'Scientifically formulated, packed with high-quality ingredients.'}
        </p>
        <div className="flex gap-4 justify-center">
           <Tooltip text={lang === 'TR' ? 'Hemen ürünlere göz atın' : 'Browse products immediately'}>
             <button onClick={() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="rounded-full px-8 h-12 bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white text-base font-semibold transition-all duration-300 shadow-lg shadow-brand-teal/20">
               {t("Shop Now", lang)}
             </button>
           </Tooltip>
           <Tooltip text={lang === 'TR' ? 'Kişiselleştirme ekranını açın' : 'Open personalization settings'}>
             <button onClick={onStartPetProfile} className="rounded-full px-8 h-12 border-2 border-brand-teal/50 bg-brand-teal/5 hover:bg-brand-teal/10 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-brand-teal-dark flex items-center justify-center gap-2 text-base font-semibold transition-all duration-300 shadow-sm">
               <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
               {activePetsCount > 0 ? (lang === 'TR' ? 'Profilinizi Düzenleyin' : 'Edit Pet Profile') : (lang === 'TR' ? 'Dostunuzu Ekleyin' : 'Personalize for your Pet')}
             </button>
           </Tooltip>
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
           <img src="https://images.unsplash.com/photo-1522858547137-f1dcec554f55?q=80&w=1000&auto=format&fit=crop" alt="Avian" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
           <button onClick={() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="rounded-full px-6 h-10 border border-border hover:bg-card hover:shadow-sm hover:-translate-y-0.5 active:scale-95 text-foreground text-sm font-semibold transition-all duration-300 flex items-center">
             {lang === 'TR' ? 'Daha Fazla Bilgi' : 'Learn More'} <ArrowRight className="w-4 h-4 ml-2" />
           </button>
         </div>
      </div>
    </section>
  );
}

const ProductCard: React.FC<{ 
  service: any, 
  lang: string, 
  onAddToCart: (item: string, quantity?: number, price?: number) => void, 
  wishlistItems: string[], 
  onToggleWishlist: (item: string) => void 
}> = ({ 
  service, 
  lang, 
  onAddToCart, 
  wishlistItems, 
  onToggleWishlist 
}) => {
  const [quantity, setQuantity] = useState(1);
  const topItem = service.items[0];
  const productIdentifier = `${t(service.title, 'EN')} - ${t(topItem, 'EN')}`;
  
  // Create deterministic prices with fewer discounts
  const numericHash = productIdentifier.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const isDogOrCat = service.id === 'dog' || service.id === 'cat';
  let basePrice = isDogOrCat ? 400 + (numericHash % 600) : 150 + (numericHash % 300);
  
  const hasDiscount = numericHash % 3 === 0;
  const discountedPrice = hasDiscount ? Math.round(basePrice * 0.85 * 100) / 100 : basePrice;
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

      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl bg-secondary flex items-center justify-center mb-4 relative overflow-hidden group-hover:bg-brand-teal/10 transition-all duration-300">
        <div className="text-muted-foreground/30 group-hover:scale-110 group-hover:text-brand-teal/50 transition-all duration-500">
          {service.icon}
        </div>
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-[#E27D60] text-white text-[10px] font-bold px-2 py-0.5 rounded">
            %15
          </div>
        )}
      </div>
      
      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{t(service.title, lang as any)}</span>
      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 line-clamp-2 h-10 sm:h-12">{t(topItem, lang as any)}</h3>
      
      <div className="flex flex-col items-center gap-1 mb-4 flex-grow justify-center">
        {hasDiscount && (
          <span className="text-xs text-muted-foreground line-through">₺{basePrice.toFixed(2)}</span>
        )}
        <span className="text-lg sm:text-xl font-bold text-brand-teal">₺{discountedPrice.toFixed(2)}</span>
      </div>

      <div className="w-full flex flex-col gap-2 mt-auto">
        <div className="flex items-center justify-between border border-border rounded-xl overflow-hidden bg-background">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-brand-teal hover:bg-secondary active:scale-95 transition-all duration-300"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-semibold text-foreground">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-brand-teal hover:bg-secondary active:scale-95 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          aria-label={`Add ${t(topItem, lang as any)} to cart`}
          onClick={() => {
            onAddToCart(`${t(service.title, lang as any)} - ${t(topItem, lang as any)}`, quantity, discountedPrice);
            setQuantity(1);
          }}
          className="w-full bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white font-bold transition-all duration-300 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
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
  selectedPetsFilter = [],
  userPets = []
}: { 
  onAddToCart: (item: string, quantity?: number) => void,
  wishlistItems?: string[],
  onToggleWishlist?: (item: string) => void,
  selectedPetsFilter?: string[],
  userPets?: PetProfileData[]
}) {
  const { lang } = useLang();

  // Combine selectedPetsFilter and userPets into a unified view of what the user owns
  const combinedPets = Array.from(new Set([
    ...selectedPetsFilter.map(p => p.toLowerCase()),
    ...userPets.filter(p => p.name && p.type).map(p => p.type.toLowerCase())
  ]));

  const filteredServices = Object.values(SERVICES).filter(service => 
    combinedPets.length === 0 || hover_match(service.id, combinedPets)
  );

  function hover_match(serviceId: string, pets: string[]) {
    return pets.some(p => p.includes(serviceId) || serviceId.includes(p));
  }

  // Generate personalized products instead of showing categories if pets are selected
  let recommendedProducts: any[] = [];
  if (combinedPets.length > 0) {
    let mixedProducts: any[] = [];
    for (const pet of combinedPets) {
       const items = generateDummyProducts(pet + 's', Math.floor(8 / combinedPets.length));
       mixedProducts = [...mixedProducts, ...items];
    }
    recommendedProducts = mixedProducts.sort(() => 0.5 - Math.random());
  }

  return (
    <section id="services" className="py-20 bg-secondary/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{lang === 'TR' ? 'Dostunuz İçin Özel' : 'Special for Your Companion'}</h2>
            <a href="#/category/personalized" onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/category/personalized';
            }} className="hidden sm:flex items-center gap-1 text-sm font-bold text-brand-teal hover:text-brand-teal-dark transition-all duration-300">
              {lang === 'TR' ? 'Tümünü Gör' : 'View All'} <ChevronRight className="w-4 h-4" />
            </a>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {combinedPets.length > 0 ? (
              recommendedProducts.map((product) => (
                <ProductListingCard 
                  key={product.id} 
                  product={product as any} 
                  lang={lang as any} 
                  onAddToCart={onAddToCart} 
                  isWishlisted={wishlistItems.includes(product.name.EN)} 
                  onToggleWishlist={onToggleWishlist} 
                />
              ))
            ) : (
              filteredServices.slice(0, 4).map((service) => (
                <ProductCard 
                  key={service.id} 
                  service={service} 
                  lang={lang} 
                  onAddToCart={onAddToCart} 
                  wishlistItems={wishlistItems} 
                  onToggleWishlist={onToggleWishlist} 
                />
              ))
            )}
         </div>
         
         <div className="mt-8 text-center sm:hidden">
            <a href="#/category/personalized" onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/category/personalized';
            }} className="inline-flex items-center gap-1 text-sm font-bold text-brand-teal hover:text-brand-teal-dark transition-all duration-300 py-2 px-4 border text-center border-brand-teal rounded-full w-full justify-center">
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
              className="flex-1 bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 font-mono uppercase transition-all duration-300"
            />
            <button 
              type="submit"
              disabled={status === 'LOADING'}
              className="bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white font-bold transition-all duration-300 py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
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
                  className="inline-flex items-center gap-2 bg-card text-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-teal/20 hover:text-brand-teal transition-all duration-300"
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
                  className="text-muted-foreground text-base hover:text-brand-teal transition-all duration-300 flex items-center gap-2"
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
            <img src="/logo.png" alt="Vivia Logo" className="w-8 h-8 object-contain rounded-md" />
            <span className="font-bold text-lg text-foreground tracking-tight">Vivia Pet</span>
          </div>
          
          <div className="flex gap-4">
            <a href="#" aria-label="Visit our Instagram" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Visit our X (Twitter)" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" aria-label="Visit our Facebook" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Visit our Youtube" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Vivia Marketplace. {lang === 'TR' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
          </p>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-brand-teal transition-all duration-300">{t("Terms", lang)}</a>
            <a href="#" className="hover:text-brand-teal transition-all duration-300">{t("Privacy", lang)}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface PetProfileData {
  id: string;
  type: string;
  name: string;
  age: string;
  breed: string;
  gender: string;
  healthInfo: string;
  photo: string | null;
}

interface SavedFolder {
  id: string;
  name: string;
  items: string[];
}

function FoldersModal({ 
  isOpen, 
  onClose, 
  folders, 
  setFolders, 
  onAddToCart 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  folders: SavedFolder[]; 
  setFolders: React.Dispatch<React.SetStateAction<SavedFolder[]>>;
  onAddToCart: (item: string, quantity?: number, price?: number) => void;
}) {
  const { lang, setLang } = useLang();
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  if (!isOpen) return null;

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    if (folders.length >= 10) return;
    
    setFolders([...folders, { id: Date.now().toString(), name: newFolderName, items: [] }]);
    setNewFolderName('');
    setIsCreating(false);
  };

  const handleRenameFolder = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!editFolderName.trim()) return;
    setFolders(folders.map(f => f.id === id ? { ...f, name: editFolderName } : f));
    setEditingFolderId(null);
  };

  const handleDeleteFolder = (id: string) => {
    setFolders(folders.filter(f => f.id !== id));
    if (activeFolderId === id) setActiveFolderId(null);
  };

  const handleRemoveProduct = (folderId: string, itemName: string) => {
    setFolders(folders.map(f => 
      f.id === folderId ? { ...f, items: f.items.filter(i => i !== itemName) } : f
    ));
  };

  const handleAddProduct = (itemName: string) => {
    if (!activeFolderId) return;
    setFolders(folders.map(f => 
      f.id === activeFolderId ? { ...f, items: [...f.items, itemName] } : f
    ));
  };

  // Build a list of possible products to add. 
  // We map MOCK_PRODUCTS to strings that look like the ones generated by ProductCard
  const allPossibleProducts = SERVICES.flatMap(s => s.items.map(i => `${t(s.title, lang as any)} - ${t(i, lang as any)}`));

  const activeFolder = folders.find(f => f.id === activeFolderId);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darker/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-card flex flex-col rounded-[32px] overflow-hidden max-w-3xl w-full h-[85vh] shadow-2xl relative"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex-shrink-0 p-6 sm:p-8 pb-4 border-b border-border/50 bg-card relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 flex items-center gap-2">
                <Bookmark className="w-6 h-6 sm:w-8 sm:h-8 text-brand-teal" />
                {lang === 'TR' ? 'Klasörlerim' : 'My Folders'}
              </h2>
              <p className="text-muted-foreground text-sm">
                {lang === 'TR' ? 'Sık aldığınız ürünleri kaydedin ve hızlıca sepete ekleyin.' : 'Save frequently purchased products and quickly add them to your cart.'}
              </p>
            </div>
            <button aria-label="Close" onClick={onClose} className="p-2 rounded-full hover:bg-secondary active:scale-90 transition-all duration-300 z-10 text-muted-foreground hover:text-foreground hover:rotate-90">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar - Folder List */}
            <div className="w-[35%] sm:w-64 border-r border-border/50 flex flex-col bg-secondary/20">
              <div className="p-3 sm:p-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar flex-1">
                {folders.map(folder => (
                  <div key={folder.id} className="group relative">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setActiveFolderId(folder.id);
                        setIsAddingProduct(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveFolderId(folder.id);
                          setIsAddingProduct(false);
                        }
                      }}
                      className={`w-full text-left px-2 sm:px-3 py-2 sm:py-3 rounded-xl flex flex-col gap-1 transition-all cursor-pointer ${activeFolderId === folder.id ? 'bg-brand-teal/10 text-brand-teal ring-1 ring-brand-teal/30 shadow-sm' : 'hover:bg-secondary text-muted-foreground hover:text-foreground'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs sm:text-sm truncate pr-2 sm:pr-6">{folder.name}</span>
                        {/* Only show delete if they hover to avoid misclicks, or on active */}
                        {(activeFolderId === folder.id) && (
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder.id); }}
                             className="absolute right-1 sm:right-2 top-2 sm:top-3 p-1 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                           >
                             <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                           </button>
                        )}
                      </div>
                      <span className="text-[10px] font-medium opacity-70">
                        {folder.items.length} {lang === 'TR' ? 'ürün' : 'items'}
                      </span>
                    </div>
                    {activeFolderId === folder.id && editingFolderId !== folder.id && (
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           setEditingFolderId(folder.id);
                           setEditFolderName(folder.name);
                         }}
                         className="absolute right-6 sm:right-10 top-2 sm:top-3 p-1 rounded-md text-muted-foreground hover:text-brand-teal hover:bg-brand-teal/10 transition-colors"
                       >
                         {/* We can use another icon for edit, text for now or simple styling */}
                         <div className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center font-bold text-[10px] sm:text-xs">✎</div>
                       </button>
                    )}

                    {editingFolderId === folder.id && (
                      <form onSubmit={(e) => handleRenameFolder(folder.id, e)} className="absolute inset-0 bg-card rounded-xl shadow-md border border-brand-teal/30 p-1 sm:p-2 flex items-center z-10">
                        <input
                          autoFocus
                          value={editFolderName}
                          onChange={(e) => setEditFolderName(e.target.value)}
                          className="flex-1 bg-transparent text-xs sm:text-sm font-semibold text-foreground outline-none px-1 sm:px-2 w-full"
                        />
                      </form>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-3 sm:p-4 border-t border-border/50">
                {isCreating ? (
                  <form onSubmit={handleCreateFolder} className="flex flex-col gap-2">
                    <input
                      autoFocus
                      placeholder={lang === 'TR' ? "Ad..." : "Name..."}
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="w-full px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-border bg-card text-xs sm:text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                    />
                    <div className="flex gap-1 sm:gap-2">
                      <button type="button" onClick={() => setIsCreating(false)} className="flex-1 py-1 sm:py-2 text-[10px] sm:text-xs font-semibold rounded-lg bg-secondary text-muted-foreground hover:text-foreground">
                        {lang === 'TR' ? 'İptal' : 'Cancel'}
                      </button>
                      <button type="submit" disabled={!newFolderName.trim()} className="flex-1 py-1 sm:py-2 text-[10px] sm:text-xs font-semibold rounded-lg bg-brand-teal text-white hover:bg-brand-teal-dark disabled:opacity-50">
                        {lang === 'TR' ? 'Kaydet' : 'Save'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <button 
                    onClick={() => setIsCreating(true)}
                    disabled={folders.length >= 10}
                    className="w-full py-2 sm:py-3 rounded-xl border border-dashed border-border flex items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-semibold text-muted-foreground hover:text-brand-teal hover:border-brand-teal hover:bg-brand-teal/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed px-1"
                  >
                    <FolderPlus className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{lang === 'TR' ? 'Yeni Klasör' : 'New Folder'}</span>
                  </button>
                )}
                {folders.length >= 10 && (
                  <p className="text-[9px] sm:text-[10px] text-center text-muted-foreground mt-2">
                    {lang === 'TR' ? 'Maksimum 10 klasör ekleyebilirsiniz.' : 'You can add a maximum of 10 folders.'}
                  </p>
                )}
              </div>
            </div>

            {/* Main Content - Folder Details */}
            <div className="flex-1 flex flex-col bg-background relative">
              {activeFolder ? (
                <>
                  <div className="p-6 pb-2 flex items-center justify-between border-b border-border/30">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-brand-teal/70" />
                      {activeFolder.name}
                    </h3>
                    <button 
                      onClick={() => setIsAddingProduct(true)}
                      className="text-sm font-bold bg-secondary hover:bg-brand-teal/10 text-foreground hover:text-brand-teal px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      {lang === 'TR' ? 'Ürün Ekle' : 'Add Products'}
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {isAddingProduct ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-lg">{lang === 'TR' ? 'Katalogdan Seç' : 'Select from Catalog'}</h4>
                          <button onClick={() => setIsAddingProduct(false)} className="text-sm text-muted-foreground hover:text-foreground underline">
                            {lang === 'TR' ? 'Geri Dön' : 'Back'}
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {allPossibleProducts.map((p, i) => (
                            <button
                              key={i}
                              onClick={() => handleAddProduct(p)}
                              disabled={activeFolder.items.includes(p)}
                              className="text-left p-3 rounded-xl border border-border hover:border-brand-teal disabled:opacity-50 disabled:hover:border-border transition-colors flex justify-between items-center group"
                            >
                              <span className="text-sm font-medium line-clamp-2 pr-2">{p}</span>
                              {!activeFolder.items.includes(p) && <Plus className="w-4 h-4 text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {activeFolder.items.length === 0 ? (
                          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                            <FolderOpen className="w-16 h-16 mb-4 text-muted-foreground" />
                            <p className="text-lg font-semibold">{lang === 'TR' ? 'Bu klasör boş.' : 'This folder is empty.'}</p>
                            <p className="text-sm text-muted-foreground mt-1">{lang === 'TR' ? 'Kaydetmek istediğiniz ürünleri ekleyin.' : 'Add products you want to save.'}</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {activeFolder.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-border bg-card group hover:shadow-sm transition-all hover:border-brand-teal/30">
                                <span className="font-medium text-sm sm:text-base">{item}</span>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => handleRemoveProduct(activeFolder.id, item)}
                                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => {
                                      const price = getPriceFromName(item);
                                      onAddToCart(item, 1, price);
                                    }}
                                    className="px-4 py-2 bg-brand-teal hover:bg-brand-teal-dark text-white text-xs sm:text-sm font-bold rounded-lg transition-colors shadow-sm"
                                  >
                                    {lang === 'TR' ? 'Sepete Ekle' : 'Add to Cart'}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 p-6">
                  <Bookmark className="w-16 h-16 mb-4 text-muted-foreground" />
                  <p className="text-lg font-semibold">{lang === 'TR' ? 'Klasör Seçin' : 'Select a Folder'}</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    {lang === 'TR' ? 'Görüntülemek için soldan bir klasör seçin veya yeni bir tane oluşturun.' : 'Select a folder from the left or create a new one to view items.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Personalization Modal
function PetProfileModal({ isOpen, onClose, pets, setPets }: { isOpen: boolean, onClose: () => void, pets: PetProfileData[], setPets: React.Dispatch<React.SetStateAction<PetProfileData[]>> }) {
  const { lang, setLang } = useLang();
  
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 2000);
  };

  const addPet = () => {
    setPets([...pets, { id: Date.now().toString(), type: 'Dog', name: '', age: '', breed: '', gender: '', healthInfo: '', photo: null }]);
  };

  const removePet = (id: string) => {
    setPets(pets.filter(p => p.id !== id));
  };

  const updatePet = (id: string, field: keyof PetProfileData, value: string) => {
    setPets(pets.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darker/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-card flex flex-col rounded-[32px] overflow-hidden max-w-2xl w-full max-h-[90vh] shadow-2xl relative"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex-shrink-0 p-6 sm:p-8 pb-4 border-b border-border/50 bg-card relative z-10">
            <div className="absolute top-6 left-6 flex bg-secondary/80 rounded-full p-1 z-10">
               <button onClick={() => setLang('TR')} className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === 'TR' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-muted-foreground'}`}>
                 <span>🇹🇷</span> TR
               </button>
               <button onClick={() => setLang('EN')} className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === 'EN' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-muted-foreground'}`}>
                 <span>🇬🇧</span> EN
               </button>
            </div>
            <button aria-label="Close" onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary active:scale-90 transition-all duration-300 z-10 text-muted-foreground hover:text-foreground hover:rotate-90">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mt-12 pb-2">
              <div className="w-16 h-16 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {lang === 'TR' ? 'Dostlarınızı Tanıyın' : 'Tell us about your pets'}
              </h2>
              <p className="text-muted-foreground">
                {lang === 'TR' ? 'Özel öneriler için profil oluşturun.' : 'Create profiles for customized recommendations.'}
              </p>
            </div>
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-8 custom-scrollbar">
            {!isSaved ? (
              <form id="pet-registration-form" onSubmit={handleSave} className="space-y-8">
                {pets.map((pet, index) => (
                  <div key={pet.id} className="p-5 sm:p-6 rounded-2xl border border-border/60 bg-secondary/30 relative space-y-6">
                    {pets.length > 1 && (
                      <button type="button" onClick={() => removePet(pet.id)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                    
                    <div className="flex items-center gap-4">
                      {/* Photo Upload Simulation */}
                      <button type="button" className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-brand-teal hover:bg-brand-teal/5 transition-colors text-muted-foreground hover:text-brand-teal">
                        <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-[10px] sm:text-xs font-medium px-1 text-center leading-none">{lang === 'TR' ? 'Fotoğraf' : 'Add Photo'}</span>
                      </button>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl">{lang === 'TR' ? `Evcil Hayvan #${index + 1}` : `Pet #${index + 1}`}</h3>
                        <p className="text-sm text-muted-foreground">{pet.name || (lang === 'TR' ? 'İsimsiz' : 'Unnamed')}</p>
                      </div>
                    </div>

                    {/* Pet Type */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-foreground">
                        {lang === 'TR' ? 'Türü' : 'Species'}
                      </label>
                      <div className="grid grid-cols-3 sm:flex bg-secondary p-1 gap-1 sm:gap-0 rounded-xl w-full">
                        {['Dog', 'Cat', 'Avian', 'Rodent', 'Aquatic', 'Reptile'].map((type) => (
                          <button
                            key={type} type="button"
                            onClick={() => updatePet(pet.id, 'type', type)}
                            className={`sm:flex-1 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition-all rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 min-w-[70px] ${pet.type === type ? 'bg-card text-foreground shadow-sm ring-1 ring-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-secondary-dark'}`}
                          >
                            {type === 'Dog' && <Dog className="w-4 h-4" />}
                            {type === 'Cat' && <Cat className="w-4 h-4" />}
                            {type === 'Avian' && <Bird className="w-4 h-4" />}
                            {type === 'Rodent' && <Rat className="w-4 h-4" />}
                            {type === 'Aquatic' && <BubblesIcon className="w-4 h-4" />}
                            {type === 'Reptile' && <Turtle className="w-4 h-4" />}
                            <span className="block sm:inline max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 sm:px-0 truncate">{t(type, lang)}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-foreground">{lang === 'TR' ? 'Adı' : 'Name'}</label>
                        <input required type="text" value={pet.name} onChange={(e) => updatePet(pet.id, 'name', e.target.value)} placeholder={lang === 'TR' ? 'Örn: Tarçın' : 'e.g. Max'} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-foreground">{lang === 'TR' ? 'Yaşı' : 'Age'}</label>
                        <input required type="number" value={pet.age} onChange={(e) => updatePet(pet.id, 'age', e.target.value)} placeholder={lang === 'TR' ? 'Yıl olarak' : 'In years'} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-foreground">{lang === 'TR' ? 'Cinsiyeti' : 'Gender'}</label>
                        <div className="flex gap-2">
                          {['Male', 'Female'].map(g => (
                            <button
                              key={g} type="button"
                              onClick={() => updatePet(pet.id, 'gender', g)}
                              className={`flex-1 py-3 px-4 rounded-xl border font-medium text-sm transition-all ${pet.gender === g ? 'bg-brand-teal/10 border-brand-teal text-brand-teal-dark font-semibold' : 'bg-card border-border text-muted-foreground hover:border-brand-teal/50'}`}
                            >
                              {lang === 'TR' ? (g === 'Male' ? 'Erkek' : 'Dişi') : g}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {pet.type !== 'Avian' && pet.type !== 'Rodent' && pet.type !== 'Aquatic' && pet.type !== 'Reptile' ? (
                        <div className="space-y-1">
                          <label className="block text-sm font-semibold text-foreground">{lang === 'TR' ? 'Irkı (İsteğe bağlı)' : 'Breed (Optional)'}</label>
                          <input type="text" value={pet.breed} onChange={(e) => updatePet(pet.id, 'breed', e.target.value)} placeholder={pet.type === 'Dog' ? (lang === 'TR' ? 'Örn: Golden Retriever' : 'e.g. Golden Retriever') : (lang === 'TR' ? 'Örn: Tekir' : 'e.g. Siamese')} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none" />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <label className="block text-sm font-semibold text-foreground">{lang === 'TR' ? 'Sağlık Notları (İsteğe bağlı)' : 'Health Notes (Optional)'}</label>
                          <input type="text" value={pet.healthInfo} onChange={(e) => updatePet(pet.id, 'healthInfo', e.target.value)} placeholder={lang === 'TR' ? 'Alerjiler vb.' : 'Allergies, etc.'} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none" />
                        </div>
                      )}
                    </div>
                    
                    {/* If they had breed, still show health notes below */}
                    {(pet.type === 'Dog' || pet.type === 'Cat') && (
                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-foreground">{lang === 'TR' ? 'Sağlık Notları (İsteğe bağlı)' : 'Health Notes (Optional)'}</label>
                        <input type="text" value={pet.healthInfo} onChange={(e) => updatePet(pet.id, 'healthInfo', e.target.value)} placeholder={lang === 'TR' ? 'Belirli diyet veya alerjiler...' : 'Specific diets or allergies...'} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none" />
                      </div>
                    )}

                  </div>
                ))}

                <button 
                  type="button" 
                  onClick={addPet}
                  className="w-full py-4 border-2 border-dashed border-border rounded-xl font-semibold text-muted-foreground hover:text-brand-teal hover:border-brand-teal hover:bg-brand-teal/5 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {lang === 'TR' ? 'Başka Bir Evcil Hayvan Ekle' : 'Add Another Pet'}
                </button>
              </form>
            ) : (
              <div className="text-center py-12 mt-4 flex flex-col items-center justify-center h-full">
                 <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                   <CheckCircle2 className="w-10 h-10 text-green-500" />
                 </div>
                 <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                   {lang === 'TR' ? `${pets.length} profil eklendi!` : `${pets.length} profiles added!`}
                 </h2>
                 <p className="text-muted-foreground text-lg">
                   {lang === 'TR' ? 'Mağaza deneyiminiz güncelleniyor...' : 'Personalizing your store experience...'}
                 </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {!isSaved && (
            <div className="flex-shrink-0 p-6 sm:p-8 pt-4 border-t border-border/50 bg-card">
              <button 
                type="submit"
                form="pet-registration-form"
                className="w-full bg-brand-teal text-white rounded-xl py-4 font-bold text-lg hover:bg-brand-teal-dark hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-lg shadow-brand-teal/20 hover:shadow-brand-teal/40 flex items-center justify-center gap-2"
              >
                {lang === 'TR' ? 'Tüm Profilleri Kaydet' : 'Save All Profiles'}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
      )}
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

  return (
    <AnimatePresence>
      {isOpen && (
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

          <button aria-label="Close setup modal" onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary hover:rotate-90 active:scale-90 transition-all duration-300 z-10">
            <X className="w-6 h-6 text-muted-foreground" />
          </button>

          {step === 1 ? (
            <div className="text-center">
              <div className="flex justify-center mx-auto mb-6">
                <img src="/logo.png" alt="Vivia Logo" className="w-[128px] h-[128px] mt-[11px] -mb-[14px] object-contain rounded-xl drop-shadow-md" />
              </div>
              <h2 id="onboarding-title" className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{t("Who are we shopping for?", lang)}</h2>
              <p className="text-muted-foreground text-base mb-8">{t("Set up a profile to get tailored recommendations and automatic filtering.", lang)}</p>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
                {['Dog', 'Cat', 'Avian', 'Aquatic', 'Rodent', 'Reptile'].map(pet => (
                  <button 
                    key={pet} onClick={() => togglePet(pet)}
                    aria-pressed={selectedPets.includes(pet)}
                    aria-label={`Select ${t(pet, lang)}`}
                    className={`w-[46%] sm:w-[30%] p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center gap-2 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] active:scale-[0.98] active:translate-y-0 active:shadow-sm
                      ${selectedPets.includes(pet) ? 'border-brand-teal bg-brand-teal/5 text-brand-teal-dark shadow-[0_0_20px_rgba(45,212,191,0.25)] ring-1 ring-brand-teal/30 scale-[1.02]' : 'border-border hover:border-brand-teal/30 hover:bg-secondary/50 text-muted-foreground'}
                    `}
                  >
                    <span className="text-3xl sm:text-4xl" aria-hidden="true">{
                      pet === 'Dog' ? '🐕' : pet === 'Cat' ? '🐈' : pet === 'Avian' ? '🦜' : pet === 'Aquatic' ? '🫧' : pet === 'Rodent' ? '🐹' : pet === 'Reptile' ? '🦎' : '🕷️'
                    }</span>
                    <span className="font-semibold text-xs sm:text-sm text-center leading-tight break-words w-[90px]">{t(pet, lang)}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={selectedPets.length === 0}
                className="w-full bg-primary disabled:opacity-50 text-white rounded-full py-4 font-semibold text-lg transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-brand-dark hover:shadow-[0_8px_24px_rgba(45,212,191,0.3)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] active:shadow-md flex items-center justify-center gap-2"
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
                  className="w-full bg-brand-teal text-white rounded-full py-4 font-semibold text-lg hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
               >
                 {t("Start Shopping", lang)}
               </button>
            </div>
          )}
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

function CartModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity,
  onClearCart,
  onCheckout 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  cartItems: CartItem[], 
  onRemoveItem: (id: string) => void, 
  onUpdateQuantity: (id: string, quantity: number) => void,
  onClearCart: () => void,
  onCheckout: () => void 
}) {
  const { lang } = useLang();

  if (!isOpen) return null;

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex justify-end bg-brand-darker/40 backdrop-blur-sm"
      >
        <div className="absolute inset-0" onClick={onClose} aria-label="Close modal overlay" />
        <motion.div 
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="bg-card w-full max-w-md h-full shadow-2xl flex flex-col relative z-10"
        >
          <div className="p-6 border-b border-border flex justify-between items-center bg-card">
            <h2 id="cart-title" className="text-2xl font-bold text-foreground flex items-center gap-3">
              {t("For Your Companion", lang)} <span className="bg-brand-teal px-3 py-1 rounded-full text-white text-sm">{totalCount}</span>
            </h2>
            <button aria-label="Close cart" onClick={onClose} className="p-2 rounded-full hover:bg-secondary active:scale-95 transition-all duration-300">
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
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center bg-secondary p-4 rounded-2xl border border-border gap-4">
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-foreground text-sm sm:text-base block truncate" title={item.name}>{item.name}</span>
                      <span className="text-sm font-semibold text-brand-teal">₺{item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded bg-card text-muted-foreground hover:text-foreground border border-border flex items-center justify-center w-7 h-7 font-bold text-lg active:scale-95 transition-all">
                          -
                       </button>
                       <span className="font-semibold text-sm w-4 text-center">{item.quantity}</span>
                       <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded bg-card text-muted-foreground hover:text-foreground border border-border flex items-center justify-center w-7 h-7 font-bold text-lg active:scale-95 transition-all">
                          +
                       </button>
                    </div>
                    <button aria-label={`Remove from cart`} onClick={() => onRemoveItem(item.id)} className="text-muted-foreground hover:text-red-500 transition-all duration-300 p-2 rounded-full hover:bg-destructive/10 hover:rotate-12 active:scale-90 flex-shrink-0">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-border bg-card">
              <div className="flex justify-between items-center mb-4 text-base">
                 <span className="text-muted-foreground">{lang === 'TR' ? 'Toplam' : 'Total'}</span>
                 <span className="font-bold text-foreground text-2xl">₺{totalPrice.toFixed(2)}</span>
              </div>
              <button 
                onClick={onCheckout}
                aria-label={lang === 'TR' ? "Güvenli Ödeme Yap" : "Secure Checkout"}
                className="w-full bg-primary text-white rounded-full py-4 text-lg font-semibold hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-3 shadow-lg mb-3"
              >
                <Lock className="w-5 h-5" /> {lang === 'TR' ? "Güvenli Ödeme Yap" : "Secure Checkout"}
              </button>
              <button 
                onClick={onClearCart}
                className="w-full text-muted-foreground hover:text-red-500 hover:bg-red-50/50 py-3 rounded-xl transition-all font-medium text-sm text-center"
              >
                {lang === 'TR' ? 'Sepeti Temizle' : 'Clear Cart'}
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
          
          <h2 className="text-2xl font-bold text-foreground mb-2 relative z-10">{lang === 'TR' ? 'Sipariş Alındı!' : 'Order Received!'}</h2>
          <p className="text-muted-foreground text-sm mb-8 relative z-10">
            {lang === 'TR' ? 'Tebrikler! Siparişiniz başarıyla oluşturuldu. Dostunuz buna bayılacak! Kargo detayları e-posta adresinize gönderildi.' : 'Great job! Your order has been placed successfully. Your companion will love this! Shipping details have been sent to your email.'}
          </p>
          
          <button 
             onClick={onClose}
             className="w-full bg-card border border-border text-foreground rounded-full py-4 font-semibold hover:border-brand-teal hover:text-brand-teal transition-all duration-300 relative z-10"
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
  onLogin,
  onChangeMode
}: { 
  mode: 'login' | 'register' | 'forgot-password' | 'reset-password' | null, 
  onClose: () => void,
  onLogin: (remember: boolean, email: string) => void,
  onChangeMode?: (mode: 'login' | 'register' | 'forgot-password' | 'reset-password' | null) => void
}) {
  const { lang } = useLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [remember, setRemember] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedMarketing, setAgreedMarketing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetTokenError, setResetTokenError] = useState('');
  
  // Internal switch state if they want to swap mode within modal
  const [currentMode, setCurrentMode] = useState<'login' | 'register' | 'forgot-password' | 'reset-password'>('login');

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
          <button aria-label="Close auth modal" onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary hover:rotate-90 active:scale-90 transition-all duration-300 z-10">
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
                onClick={() => { setSuccess(false); setCurrentMode('login'); }}
                className="w-full bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white font-bold transition-all duration-300 py-3.5 rounded-xl transition-all duration-300"
              >
                {t("Login", lang)}
              </button>
            </div>
          ) : success && currentMode === 'forgot-password' ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{lang === 'TR' ? "E-posta Gönderildi!" : "Email Sent!"}</h2>
              <p className="text-muted-foreground mb-6">
                {lang === 'TR' 
                  ? "Şifre sıfırlama bağlantısını e-posta adresinize gönderdik. Lütfen gelen kutunuzu kontrol edin." 
                  : "We've sent a password reset link to your email. Please check your inbox."}
              </p>
              <button 
                onClick={() => { setSuccess(false); setCurrentMode('reset-password'); }}
                className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold py-3.5 rounded-xl transition-all mb-4"
              >
                {lang === 'TR' ? "Simüle Et: Bağlantıya Tıklandı" : "Simulate: Link Clicked"}
              </button>
              <button 
                onClick={() => { setSuccess(false); setCurrentMode('login'); }}
                className="w-full text-muted-foreground font-semibold hover:text-brand-teal transition-all"
              >
                {lang === 'TR' ? "Giriş Ekranına Dön" : "Back to Login"}
              </button>
            </div>
          ) : success && currentMode === 'reset-password' ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{lang === 'TR' ? "Şifre Güncellendi" : "Password Updated"}</h2>
              <p className="text-muted-foreground mb-6">{lang === 'TR' ? 'Yeni şifrenizle giriş yapabilirsiniz.' : 'You can now log in with your new password.'}</p>
              <button 
                onClick={() => { setSuccess(false); setCurrentMode('login'); }}
                className="w-full bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white font-bold transition-all duration-300 py-3.5 rounded-xl transition-all duration-300"
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
                  {currentMode === 'login' ? t("Login", lang) :
                   currentMode === 'register' ? t("Sign Up", lang) :
                   currentMode === 'forgot-password' ? (lang === 'TR' ? "Şifremi Unuttum" : "Forgot Password") :
                   (lang === 'TR' ? "Yeni Şifre Belirle" : "Reset Password")}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {currentMode === 'login' ? t("Sign in to your account", lang) : 
                   currentMode === 'register' ? t("Create a new account", lang) :
                   currentMode === 'forgot-password' ? (lang === 'TR' ? "E-posta adresinizi girin, sıfırlama bağlantısı gönderelim" : "Enter your email and we'll send a reset link") :
                   (lang === 'TR' ? "Lütfen yeni şifrenizi oluşturun" : "Please create your new password")}
                </p>
              </div>

              {(currentMode === 'login' || currentMode === 'register') && (
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
              )}

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
                  } else if (currentMode === 'register') {
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
                  } else if (currentMode === 'forgot-password') {
                    if (email) {
                      fetch('/api/email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ to: email, type: 'PASSWORD_RESET' })
                      }).catch(console.error);
                      setSuccess(true);
                      setResetTokenError(''); // Clear any previous errors
                    }
                  } else if (currentMode === 'reset-password') {
                    if (password && confirmPassword && (password === confirmPassword)) {
                      setSuccess(true);
                      // In a real app we'd update the db here.
                    } else if (password !== confirmPassword) {
                      setResetTokenError(lang === 'TR' ? 'Şifreler eşleşmiyor.' : 'Passwords do not match.');
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
                        className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all duration-300"
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
                        className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all duration-300"
                        placeholder={lang === 'TR' ? 'Soyad' : 'Surname'}
                      />
                    </div>
                  </div>
                )}

                {currentMode !== 'reset-password' && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">{t("E-Mail", lang)}</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all duration-300"
                      placeholder={lang === 'TR' ? 'E-Posta' : 'E-Mail'}
                    />
                  </div>
                )}

                {currentMode === 'register' && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">{t("Phone Number", lang)}</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all duration-300"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                )}

                {(currentMode === 'login' || currentMode === 'register' || currentMode === 'reset-password') && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">{currentMode === 'reset-password' ? (lang === 'TR' ? "Yeni Şifre" : "New Password") : t("Password", lang)}</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 pr-12 transition-all duration-300"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand-teal transition-all duration-300"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {currentMode === 'reset-password' && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">{lang === 'TR' ? "Şifreyi Onayla" : "Confirm Password"}</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 pr-12 transition-all duration-300"
                        placeholder="••••••••"
                      />
                    </div>
                    {resetTokenError && <p className="text-sm font-semibold text-red-500 mt-2">{resetTokenError}</p>}
                  </div>
                )}
                
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
                      onClick={() => setCurrentMode('forgot-password')}
                      className="text-sm font-semibold text-brand-teal hover:text-brand-teal-dark transition-all duration-300"
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
                  className="w-full bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white font-bold transition-all duration-300 py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {currentMode === 'login' ? t("Login", lang) :
                   currentMode === 'register' ? t("Create Account", lang) :
                   currentMode === 'forgot-password' ? (lang === 'TR' ? "Sıfırlama Bağlantısı Gönder" : "Send Reset Link") :
                   (lang === 'TR' ? "Şifreyi Sıfırla" : "Reset Password")}
                </button>
                
                {currentMode === 'forgot-password' && (
                  <div className="text-center mt-4">
                    <button 
                      type="button" 
                      onClick={() => setCurrentMode('login')}
                      className="text-sm font-semibold text-muted-foreground hover:text-brand-teal transition-all duration-300"
                    >
                      {lang === 'TR' ? 'Giriş ekranına dön' : 'Cancel, back to login'}
                    </button>
                  </div>
                )}
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

function Tooltip({ children, text, position = 'top' }: { children: React.ReactNode, text: string, position?: 'top' | 'right' | 'bottom' | 'left' }) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[6px] border-t-foreground",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-b-[6px] border-b-foreground",
    left: "left-full top-1/2 -translate-y-1/2 border-y-[5px] border-y-transparent border-l-[6px] border-l-foreground",
    right: "right-full top-1/2 -translate-y-1/2 border-y-[5px] border-y-transparent border-r-[6px] border-r-foreground"
  };

  return (
    <div className="relative group/tooltip inline-block">
      {children}
      <div className={`absolute ${positionClasses[position]} px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl`}>
        {text}
        <div className={`absolute ${arrowClasses[position]}`}></div>
      </div>
    </div>
  );
}
const TR_CITIES = Object.keys(turkeyData).sort((a, b) => a.localeCompare(b, 'tr'));

const getDistrictsForCity = (city: string) => {
  return (turkeyData as Record<string, string[]>)[city] || [];
};

function CheckoutModal({
  isOpen,
  onClose,
  onProcessPayment,
  totalPrice,
  onOpenLogin
}: {
  isOpen: boolean;
  onClose: () => void;
  onProcessPayment: () => void;
  totalPrice: number;
  onOpenLogin: () => void;
}) {
  const { lang } = useLang();
  
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [phone, setPhone] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('vivia_logged_in') === 'true' : false;

  useEffect(() => {
    if (!isOpen) {
      setCity('');
      setDistrict('');
      setPhone('');
      setPromoCode('');
      setIsPromoApplied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProcessPayment();
  };

  const districts = city ? getDistrictsForCity(city) : [];

  const subtotal = totalPrice;
  const isEligibleForLargeOrderDiscount = subtotal > 1500;
  const largeOrderDiscount = isEligibleForLargeOrderDiscount ? subtotal * 0.15 : 0;
  const promoDiscount = isPromoApplied ? subtotal * 0.10 : 0; // dummy 10% promo
  
  const totalDiscount = largeOrderDiscount + promoDiscount;
  const finalTotal = Math.max(0, subtotal - totalDiscount);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex justify-center items-center py-4 sm:py-8 backdrop-blur-sm bg-brand-darker/80 px-4"
      >
        <div className="absolute inset-0 z-0" onClick={onClose} aria-label="Close modal overlay" />
        
        <motion.div 
          initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-card w-full max-w-4xl max-h-full overflow-y-auto rounded-3xl shadow-2xl flex flex-col relative z-10"
        >
          {/* Watermark Logo */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center z-[-1] overflow-hidden"
            style={{ 
              backgroundImage: 'url(/logo.png)', 
              backgroundPosition: 'center', 
              backgroundRepeat: 'repeat', 
              backgroundSize: '300px auto' 
            }}
          />

          <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-card/95 backdrop-blur z-20">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {lang === 'TR' ? 'Güvenli Ödeme' : 'Secure Checkout'}
              </h2>
              <p className="text-muted-foreground text-sm font-medium">
                {lang === 'TR' ? 'Tüm alanların doldurulması zorunludur.' : 'All fields are required.'}
              </p>
            </div>
            <button aria-label="Close checkout" onClick={onClose} className="p-2 rounded-full bg-secondary hover:bg-secondary-dark active:scale-95 text-foreground transition-all duration-300 shadow-sm border border-border">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
            {!isLoggedIn && (
              <div className="mb-6 p-4 bg-brand-teal/10 border border-brand-teal/20 rounded-xl flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {lang === 'TR' ? 'Zaten bir hesabınız var mı?' : 'Already have an account?'}
                </span>
                <button 
                  onClick={onOpenLogin}
                  className="text-sm font-bold text-brand-teal hover:text-brand-teal-dark active:scale-95 transition-all"
                >
                  {lang === 'TR' ? 'Giriş Yap' : 'Log In'}
                </button>
              </div>
            )}

            <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
              
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">
                  {lang === 'TR' ? 'İletişim Bilgileri' : 'Contact Information'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="email">
                      {lang === 'TR' ? 'E-posta Adresi' : 'Email Address'} <span className="text-brand-teal">*</span>
                    </label>
                    <input 
                      id="email" type="email" required
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="phone">
                      {lang === 'TR' ? 'Telefon Numarası' : 'Phone Number'} <span className="text-brand-teal">*</span>
                    </label>
                    <div className="relative flex items-center bg-background border border-border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-brand-teal focus-within:border-transparent transition-all">
                      <span className="text-muted-foreground mr-2 select-none border-r border-border pr-2 font-medium">+90</span>
                      <input 
                        id="phone" 
                        type="tel" 
                        required 
                        pattern="5[0-9]{9}" 
                        value={phone}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.startsWith('0')) val = val.substring(1);
                          setPhone(val.substring(0, 10));
                        }}
                        className="w-full bg-transparent text-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="marketing" className="w-4 h-4 text-brand-teal rounded border-gray-300 focus:ring-brand-teal" />
                  <label htmlFor="marketing" className="text-sm text-foreground cursor-pointer">
                    {lang === 'TR' ? 'Haberler ve özel fırsatlardan haberdar olmak istiyorum.' : 'Keep me informed about news and special offers.'}
                  </label>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">
                  {lang === 'TR' ? 'Teslimat Adresi' : 'Delivery Address'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="firstName">
                      {lang === 'TR' ? 'Ad' : 'First Name'} <span className="text-brand-teal">*</span>
                    </label>
                    <input id="firstName" type="text" required className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="lastName">
                      {lang === 'TR' ? 'Soyad' : 'Last Name'} <span className="text-brand-teal">*</span>
                    </label>
                    <input id="lastName" type="text" required className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="address">
                      {lang === 'TR' ? 'Açık Adres' : 'Full Address'} <span className="text-brand-teal">*</span>
                    </label>
                    <textarea id="address" required rows={2} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="aptdetails">
                      {lang === 'TR' ? 'Apartman / Daire / Bina Bilgisi' : 'Apartment / Flat / Office / Building details'} <span className="text-brand-teal">*</span>
                    </label>
                    <input id="aptdetails" type="text" required className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="city">
                      {lang === 'TR' ? 'İl' : 'City'} <span className="text-brand-teal">*</span>
                    </label>
                    <div className="relative">
                      <select id="city" required value={city} onChange={(e) => { setCity(e.target.value); setDistrict(''); }} className="w-full bg-background border border-border rounded-xl px-4 py-3 appearance-none text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all">
                        <option value="" disabled>{lang === 'TR' ? 'Seçiniz' : 'Select City'}</option>
                        {TR_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="district">
                      {lang === 'TR' ? 'İlçe' : 'District'} <span className="text-brand-teal">*</span>
                    </label>
                    <div className="relative">
                      <select id="district" required value={district} onChange={(e) => setDistrict(e.target.value)} disabled={!city} className="w-full bg-background border border-border rounded-xl px-4 py-3 appearance-none text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all disabled:opacity-50">
                        <option value="" disabled>{lang === 'TR' ? 'Seçiniz' : 'Select District'}</option>
                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">
                  {lang === 'TR' ? 'Sipariş Notu' : 'Order Notes'}
                </h3>
                <textarea 
                  rows={2} 
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all resize-none" 
                />
              </div>

              {/* Payment Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">
                  {lang === 'TR' ? 'Ödeme Bilgileri' : 'Payment Information'}
                </h3>
                
                <div className="space-y-4 bg-background p-4 sm:p-5 rounded-2xl border border-border shadow-inner">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="cardName">
                      {lang === 'TR' ? 'Kart Üzerindeki İsim' : 'Cardholder Name'} <span className="text-brand-teal">*</span>
                    </label>
                    <input id="cardName" type="text" required className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="cardNumber">
                      {lang === 'TR' ? 'Kredi Kartı Numarası' : 'Credit Card Number'} <span className="text-brand-teal">*</span>
                    </label>
                    <div className="relative">
                      <input id="cardNumber" type="text" required pattern="\d{16}" maxLength={16} className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all font-mono tracking-widest" />
                      <CreditCard className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="expiry">
                        {lang === 'TR' ? 'Son Kullanma Tarihi' : 'Expiry Date'} <span className="text-brand-teal">*</span>
                      </label>
                      <input id="expiry" type="text" required pattern="(0[1-9]|1[0-2])\/?([0-9]{2})" maxLength={5} placeholder={lang === 'TR' ? 'AA/YY' : 'MM/YY'} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all font-mono" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="cvv">
                        CVV <span className="text-brand-teal">*</span>
                      </label>
                      <input id="cvv" type="text" required pattern="\d{3,4}" maxLength={4} placeholder="123" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all font-mono" />
                    </div>
                  </div>
                </div>
              </div>

            </form>
          </div>

          <div className="border-t border-border bg-card p-6 sm:p-8">
            {/* Promo Code */}
            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                aria-label={lang === 'TR' ? 'İndirim Kodu' : 'Promo Code'}
                className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
              />
              <button 
                type="button"
                onClick={() => {
                  if (promoCode) setIsPromoApplied(true);
                }}
                className="bg-secondary text-foreground font-semibold px-6 py-3 rounded-xl hover:bg-secondary-dark active:scale-95 transition-all"
              >
                {lang === 'TR' ? 'Uygula' : 'Apply'}
              </button>
            </div>

            {/* Price Summary */}
            <div className="space-y-2 mb-6 text-sm sm:text-base">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>{lang === 'TR' ? 'Ara Toplam' : 'Subtotal'}</span>
                <span>₺{subtotal.toFixed(2)}</span>
              </div>
              
              {isEligibleForLargeOrderDiscount && (
                <div className="flex justify-between items-center text-brand-teal font-medium">
                  <span>{lang === 'TR' ? 'Büyük Sipariş İndirimi (15%)' : 'Volume Discount (15%)'}</span>
                  <span>-₺{largeOrderDiscount.toFixed(2)}</span>
                </div>
              )}
              
              {isPromoApplied && (
                <div className="flex justify-between items-center text-brand-teal font-medium">
                  <span>{lang === 'TR' ? 'Promosyon İndirimi' : 'Promo Discount'}</span>
                  <span>-₺{promoDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center text-xl font-bold text-foreground pt-4 border-t border-border mt-2">
                <span>{lang === 'TR' ? 'Ödenecek Tutar' : 'Total to Pay'}</span>
                <span>₺{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              form="checkout-form"
              type="submit"
              className="w-full bg-brand-teal text-white rounded-xl py-4 text-lg font-bold hover:bg-brand-teal-dark active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
            >
              <Lock className="w-5 h-5" /> {lang === 'TR' ? "Siparişi Tamamla" : "Complete Order"}
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export const getBasePriceFromName = (name: string) => {
  let englishName = name;
  
  for (const s of SERVICES) {
    const enTitle = s.title;
    const trTitle = t(s.title, 'TR');
    
    for (const item of s.items) {
      const enItem = item;
      const trItem = t(item, 'TR');
      
      const enStr = `${enTitle} - ${enItem}`;
      const trStr = `${trTitle} - ${trItem}`;
      
      if (name === enStr || name === trStr) {
        englishName = enStr;
        break;
      }
    }
  }

// Deterministic mock base price using the English string
  const hash = englishName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const isDogOrCat = englishName.toLowerCase().includes('dog') || englishName.toLowerCase().includes('cat');
  let basePrice = isDogOrCat ? 400 + (hash % 600) : 150 + (hash % 300);
  basePrice += (hash % 99) / 100;
  return Math.round(basePrice * 100) / 100;
};

export const getPriceFromName = (name: string) => {
  const basePrice = getBasePriceFromName(name);
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hasDiscount = hash % 3 === 0;
  return hasDiscount ? Math.round(basePrice * 0.85 * 100) / 100 : basePrice;
};

import SupportSystem from './SupportWidget';

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isPetProfileOpen, setIsPetProfileOpen] = useState(false);
  const [userPets, setUserPets] = useState<PetProfileData[]>([
    { id: '1', type: 'Dog', name: '', age: '', breed: '', gender: '', healthInfo: '', photo: null }
  ]);
  const [isFoldersModalOpen, setIsFoldersModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedPetsFilter, setSelectedPetsFilter] = useState<string[]>([]);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot-password' | 'reset-password' | null>(null);
  const [currentHash, setCurrentHash] = useState(() => typeof window !== 'undefined' ? window.location.hash : '');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0, 0); // Scroll to top when changing route
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vivia_cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch(e) {}
      }
    }
    return [];
  });
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [folders, setFolders] = useState<SavedFolder[]>([]);
  const [lang, setLang] = useState<Lang>('TR');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cartTotalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    // Check if user chose to be remembered
    const rememberedLogin = localStorage.getItem('vivia_logged_in');
    const email = localStorage.getItem('vivia_user_email');
    if (rememberedLogin === 'true') {
      setIsLoggedIn(true);
      if (email) setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vivia_cart', JSON.stringify(cartItems));
  }, [cartItems]);

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

  const handleAddToCart = (itemName: string, quantity = 1, price?: number) => {
    const finalPrice = price !== undefined ? price : getPriceFromName(itemName);
    setCartItems(prev => {
      const existing = prev.find(p => p.name === itemName);
      if (existing) {
        return prev.map(p => p.name === itemName ? { ...p, quantity: p.quantity + quantity } : p);
      } else {
        return [...prev, { 
          id: Date.now().toString() + Math.random().toString(), 
          name: itemName, 
          price: finalPrice, 
          quantity 
        }];
      }
    });
    
    // Show toast
    setToastMessage(`${itemName} ` + (lang === 'TR' ? 'sepete eklendi.' : 'added to cart.'));
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleToggleWishlist = (item: string) => {
    setWishlistItems(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleProcessPayment = () => {
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
    setCartItems([]);
    
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
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          onOpenCart={() => setIsCartOpen(true)} 
          onOpenFolders={() => setIsFoldersModalOpen(true)}
          isLoggedIn={isLoggedIn}
          onOpenAuth={setAuthMode}
          onLogout={handleLogout}
        />
        
        {/* Floating Category Filter Button */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">
          <Tooltip text={lang === 'TR' ? 'Kategorileri Filtrele' : 'Filter Categories'} position="right">
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="bg-brand-teal p-2 sm:p-3 rounded-r-2xl text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-brand-teal-dark hover:pl-4 active:scale-95 transition-all duration-300 group overflow-hidden"
              aria-label="Filter categories"
            >
              <PetCollageIcon className="w-9 h-9 sm:w-11 sm:h-11 group-hover:scale-110 transition-transform" />
            </button>
          </Tooltip>
        </div>
        
        {currentHash.startsWith('#/category/') ? (
          <CategoryPage 
            categoryId={currentHash.replace('#/category/', '')} 
            onAddToCart={handleAddToCart}
            wishlistItems={wishlistItems}
            onToggleWishlist={handleToggleWishlist}
            userPets={userPets}
            selectedPets={selectedPetsFilter}
          />
        ) : (
          <main>
            <Hero onStartOnboarding={() => setIsOnboardingOpen(true)} onStartPetProfile={() => setIsPetProfileOpen(true)} userPets={userPets} />
            <Services onAddToCart={handleAddToCart} wishlistItems={wishlistItems} onToggleWishlist={handleToggleWishlist} selectedPetsFilter={selectedPetsFilter} userPets={userPets} />
            <OrderTrackingSection />
            <TrustSection />
            <Contact />
          </main>
        )}
        
        <Footer />

        {/* Modals */}
        <FoldersModal isOpen={isFoldersModalOpen} onClose={() => setIsFoldersModalOpen(false)} folders={folders} setFolders={setFolders} onAddToCart={handleAddToCart} />
        <PetProfileModal isOpen={isPetProfileOpen} onClose={() => setIsPetProfileOpen(false)} pets={userPets} setPets={setUserPets} />
        <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} selectedPets={selectedPetsFilter} onSelectionChange={setSelectedPetsFilter} />
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} onClearCart={() => setCartItems([])} onCheckout={handleCheckout} />
        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} onProcessPayment={handleProcessPayment} totalPrice={cartTotalPrice} onOpenLogin={() => { setIsCheckoutOpen(false); setAuthMode('login'); }} />
        <CheckoutSuccessModal isOpen={isSuccessOpen} onClose={handleCloseSuccess} />
        <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onLogin={handleLogin} onChangeMode={setAuthMode} />

        {/* Global Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-[200] bg-brand-teal text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <p className="font-medium text-sm pr-2">{toastMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Support Widget */}
        <SupportSystem />

      </div>
    </LangContext.Provider>
  );
}
