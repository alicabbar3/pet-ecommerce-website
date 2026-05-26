import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";
import turkeyData from "./turkeyData";
import { CATEGORIES } from "./categories";
import CategoryPage, {
  ProductListingCard,
} from "./CategoryPage";
import ProductPage from './ProductPage';
import CheckoutPage from './CheckoutPage';
import { TryOnModal } from './components/TryOnModal';
import { motion, AnimatePresence } from "motion/react";
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
  Menu,
  Check,
  ShieldAlert,
  ShieldCheck,
  PawPrint,
  SlidersHorizontal,
  Star,
  ShoppingCart
} from "lucide-react";

const BubblesIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="16" r="3" />
    <circle cx="9" cy="10" r="2" />
    <circle cx="15" cy="7" r="1.5" />
    <circle cx="13" cy="4" r="1" />
  </svg>
);

import { Lang, LangContext, useLang, t } from "./i18n";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Data
const CONTACT = {
  phone: "05365264966",
  whatsapp: "05365264966",
  email: "info@viviapet.com",
};

const WA_LINK = `https://wa.me/905365264966`;

const SERVICES = [
  {
    id: "dog",
    title: "Dog",
    icon: <Bone className="w-6 h-6" />,
    items: [
      "Premium Nutrition",
      "Comfort Collars",
      "Training Treats",
      "Orthopedic Beds",
      "Interactive Toys",
      "Healthcare",
    ],
  },
  {
    id: "cat",
    title: "Cat",
    icon: <Cat className="w-6 h-6" />,
    items: [
      "Grain-Free Diet",
      "Odorless Litter",
      "Cozy Beds",
      "Scratching Posts",
      "Feather Toys",
      "Malt Pastes",
      "Water Fountains",
    ],
  },
  {
    id: "avian",
    title: "Avian",
    icon: <Bird className="w-6 h-6" />,
    items: [
      "Seed Mixes",
      "Spacious Cages",
      "Natural Perches",
      "Smart Feeders",
      "Bell Swings",
      "Baths",
    ],
  },
  {
    id: "fish",
    title: "Fish",
    icon: <Fish className="w-6 h-6" />,
    items: [
      "Flake Food",
      "Glass Aquariums",
      "Silent Filtration",
      "Decorations",
      "Water Care",
    ],
  },
  {
    id: "rodent",
    title: "Rodent",
    icon: <Rat className="w-6 h-6" />,
    items: [
      "Pellet Mix",
      "Multi-level Cages",
      "Running Wheels",
      "Chew Toys",
      "Wooden Huts",
    ],
  },
  {
    id: "reptile",
    title: "Reptile",
    icon: <Turtle className="w-6 h-6" />,
    items: [
      "Live/Dried Food",
      "Glass Terrariums",
      "UVB Lamps",
      "Thermostats",
      "Hygrometers",
    ],
  },
];

import { MAPPED_DOG_PRODUCTS } from "./data/mappedDogProducts";
import { MAPPED_CAT_PRODUCTS } from "./data/mappedCatProducts";
import { MAPPED_BIRD_PRODUCTS } from "./data/mappedBirdProducts";
import { MAPPED_FISH_PRODUCTS } from "./data/mappedFishProducts";
import { MAPPED_RODENT_PRODUCTS } from "./data/mappedRodentProducts";
import { MAPPED_REPTILE_PRODUCTS } from "./data/mappedReptileProducts";

export const GLOBAL_PRODUCTS_DATABASE: any[] = [
  ...MAPPED_DOG_PRODUCTS,
  ...MAPPED_CAT_PRODUCTS,
  ...MAPPED_BIRD_PRODUCTS,
  ...MAPPED_FISH_PRODUCTS,
  ...MAPPED_RODENT_PRODUCTS,
  ...MAPPED_REPTILE_PRODUCTS
];

const HighlightText = ({ text }: { text: string, query?: string }) => {
  return <>{text}</>;
};

function Header({
  cartCount,
  onOpenCart,
  onOpenFolders,
  isLoggedIn,
  onOpenAuth,
  onLogout,
  userPets,
  onOpenPetProfile,
  selectedPetsFilter,
  onAddToCart,
}: {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFolders: () => void;
  isLoggedIn: boolean;
  onOpenAuth: (mode: "login" | "register") => void;
  onLogout: () => void;
  userPets?: any[];
  onOpenPetProfile?: (id: string) => void;
  selectedPetsFilter?: string[];
  onAddToCart?: (name: string, quantity: number, price: number) => void;
}) {
  const { lang, setLang } = useLang();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("vivia_theme");
      if (stored) return stored === "dark";
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

  // If selectedPetsFilter is explicitly provided, use ONLY that. Otherwise use userPets.
  const activeFilters =
    selectedPetsFilter !== undefined
      ? selectedPetsFilter.map((p) => p.toLowerCase())
      : (userPets || [])
          .filter((p) => p.name && p.type)
          .map((p) => p.type.toLowerCase());

  const searchFilterPets = Array.from(new Set(activeFilters));

  const { results: searchResults, fallback, fallbackTokens } = useMemo(() => {
    if (!searchQuery) return { results: [], fallback: false, fallbackTokens: [] };
    const query = searchQuery.toLowerCase();
    const res = GLOBAL_PRODUCTS_DATABASE.filter(p => 
      p.name?.EN?.toLowerCase().includes(query) || p.name?.TR?.toLowerCase().includes(query)
    ).map(p => ({ product: p, score: 1 }));
    return { results: res, fallback: false, fallbackTokens: [] };
  }, [searchQuery, lang, searchFilterPets]);
  
  const filteredSuggestions = searchResults.slice(0, 7).map(item => item.product);

  const personalizedPreview = useMemo(() => {
    return GLOBAL_PRODUCTS_DATABASE.slice(0, 4);
  }, [searchFilterPets, lang]);

  const popularSearches = lang === "TR" 
    ? ["Kısırlaştırılmış Kedi Maması", "Köpek Ödül Maması", "Büyük Irk", "Tahılsız Mama"] 
    : ["Sterilized Cat Food", "Dog Treats", "Large Breed", "Grain Free"];

  const handleSearchSelect = (val: string, productId?: string) => {
    setSearchQuery(val);
    setIsSearchFocused(false);
    setSearchHistory((prev) => {
      const newHistory = prev.filter((item) => item !== val);
      return [val, ...newHistory].slice(0, 5);
    });
    if (productId) {
      window.location.hash = `#/product/${productId}`;
    }
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("vivia_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("vivia_theme", "light");
    }
  }, [isDark]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      {/* Top Bar with Promos */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white w-full overflow-hidden relative font-medium tracking-wide shadow-sm py-2">
        <div className="flex whitespace-nowrap overflow-hidden w-full">
          <motion.div 
            className="flex items-center w-max"
            animate={{ x: ["0%", "-50%"] }} 
            initial={{ x: "0%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center px-8 font-bold flex-shrink-0 text-xs sm:text-sm drop-shadow-sm border-r border-white/20 last:border-r-0">
                <span className="mr-3 text-lg">📢</span> 
                {lang === "TR" 
                  ? "1500TL+ ALIŞVERİŞLERDE %15 İNDİRİM! — 2500TL+ ALIŞVERİŞLERDE %20 İNDİRİM! — 5000TL+ ALIŞVERİŞLERDE %30 İNDİRİM!" 
                  : "15% OFF ON ORDERS OVER 1500TL! — 20% OFF ON ORDERS OVER 2500TL! — 30% OFF ON ORDERS OVER 5000TL!"}
              </div>
            ))}
          </motion.div>
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
          <a
            href="#"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = "";
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src="/logo.png"
              alt="Vivia Logo"
              className="w-[72px] h-[72px] -mb-1.5 object-contain rounded-xl drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
            <span className="font-extrabold tracking-tight text-foreground text-[32px] -ml-2.5 pl-0.5 pt-0.5 mb-1.5 hidden sm:block">
              Vivia
            </span>
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
            className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-background outline-none rounded-full py-2.5 px-6 pr-20 text-sm transition-all text-foreground"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
             <label className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-brand-teal rounded-full transition-all duration-300 cursor-pointer">
               <Camera className="w-4 h-4" />
               <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                 if (e.target.files && e.target.files[0]) {
                   // Mock visual search
                   setSearchQuery("Royal Canin " + (userPets.length > 0 ? userPets[0].type : "Dog"));
                   setIsSearchFocused(true);
                 }
               }}/>
             </label>
             <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-brand-teal rounded-full transition-all duration-300">
               <Search className="w-4 h-4" />
             </button>
          </div>

          <AnimatePresence>
            {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-14 left-0 w-full min-w-[300px] md:min-w-[700px] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden z-50 p-5 max-h-[70vh] overflow-y-auto"
                >
                  {searchQuery.length > 0 ? (
                    filteredSuggestions.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {fallback && (
                          <div className="px-4 py-2 border-b border-border/50 text-sm text-muted-foreground">
                            {lang === 'TR' ? `"${searchQuery}" için tam eşleşme bulunamadı. Bunları mı demek istediniz?` : `No exact match for "${searchQuery}". Did you mean these?`}
                          </div>
                        )}
                        <ul className="py-1">
                          {filteredSuggestions.map((product) => {
                            const isOutOfStock = product.stock === 0;
                            return (
                            <li key={product.id}>
                              <a
                                href={!isOutOfStock ? `#/product/${product.id}` : '#'}
                                onClick={(e) => { 
                                   if (isOutOfStock) e.preventDefault();
                                   else setIsSearchFocused(false);
                                }}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary'}`}
                              >
                                <div className="flex flex-col gap-0.5">
                                  <span className={`font-semibold transition-colors flex items-center gap-2 ${isOutOfStock ? 'text-muted-foreground' : 'text-foreground group-hover:text-brand-teal'}`}>
                                    <HighlightText text={product.name[lang as 'EN'|'TR']} query={fallback ? "" : searchQuery.trim()} />
                                    {isOutOfStock && (
                                       <span className="text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded-sm font-bold ml-1 uppercase">
                                         {lang === 'TR' ? 'Tükendi' : 'Out of Stock'}
                                       </span>
                                    )}
                                  </span>
                                  <span className="text-xs flex items-center gap-1.5 text-muted-foreground border-slate-700">
                                    <HighlightText text={product._categoryLabel[lang as 'EN'|'TR']} query={fallback ? "" : searchQuery.trim()} /> • <HighlightText text={product.brand} query={fallback ? "" : searchQuery.trim()} />
                                  </span>
                                </div>
                                {!isOutOfStock && <ArrowRight className="w-4 h-4 text-brand-teal opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />}
                              </a>
                            </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : (
                      <div className="p-8 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3">
                           <Search className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <p className="text-foreground font-semibold">
                          {lang === "TR" ? "Sonuç bulunamadı" : "No results found"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 max-w-[250px]">
                          {lang === "TR" ? "Lütfen farklı bir kelime ile tekrar arayın." : "Please try searching with a different term."}
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-full md:w-5/12 flex flex-col gap-6">
                          {searchHistory.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                    {lang === "TR" ? "Son Aramalar" : "Recent Searches"}
                                  </h4>
                                  <button
                                    onMouseDown={(e) => { e.preventDefault(); setSearchHistory([]); }}
                                    className="text-[11px] font-semibold text-brand-teal hover:underline"
                                  >
                                    {lang === "TR" ? "Temizle" : "Clear"}
                                  </button>
                                </div>
                                <ul className="flex flex-wrap gap-2">
                                  {searchHistory.map((item, index) => (
                                    <li key={index}>
                                      <button
                                        onMouseDown={(e) => { e.preventDefault(); handleSearchSelect(item); }}
                                        className="text-xs font-medium bg-secondary hover:bg-brand-teal/10 hover:text-brand-teal text-foreground px-3 py-1.5 rounded-lg transition-all"
                                      >
                                        {item}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                            </div>
                          )}

                          <div>
                             <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                                {lang === "TR" ? "Popüler Aramalar" : "Popular Searches"}
                             </h4>
                             <ul className="flex flex-col gap-1">
                                {popularSearches.map((item, index) => (
                                  <li key={index}>
                                    <button
                                      onMouseDown={(e) => { e.preventDefault(); handleSearchSelect(item); }}
                                      className="text-sm font-medium text-left w-full text-foreground hover:text-brand-teal py-2 flex items-center gap-3 group transition-colors rounded-lg hover:bg-secondary px-2 -ml-2"
                                    >
                                      <Search className="w-4 h-4 text-muted-foreground group-hover:text-brand-teal" />
                                      {item}
                                    </button>
                                  </li>
                                ))}
                             </ul>
                          </div>
                      </div>

                      <div className="flex-1 md:border-l border-border md:pl-8">
                          <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                             <Sparkles className="w-4 h-4 text-[#F4A261]" />
                             {lang === "TR" ? "Sizin İçin Önerilenler" : "Recommended For You"}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                             {personalizedPreview.map(product => (
                                <a 
                                  key={product.id}
                                  href={`#/product/${product.id}`}
                                  onClick={() => setIsSearchFocused(false)}
                                  className="text-left bg-secondary/30 hover:bg-secondary border border-transparent hover:border-border rounded-xl p-3 flex items-start gap-3 transition-all active:scale-95 group h-full block"
                                >
                                  <div className="w-14 h-14 shrink-0 bg-background border border-border rounded-lg flex items-center justify-center relative overflow-hidden">
                                    {product.image ? (
                                       <img src={product.image} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" alt={product.name[lang as 'EN'|'TR']} />
                                    ) : (
                                       <Package className="w-7 h-7 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-500" />
                                    )}
                                     {product.discount !== undefined && product.discount > 0 && (
                                       <span className="absolute top-0 right-0 bg-[#E27D60] text-white text-[9px] font-black px-1.5 py-0.5 rounded-bl shadow-sm z-10">
                                         -{product.discount}%
                                       </span>
                                     )}
                                  </div>
                                  <div className="flex flex-col gap-1 overflow-hidden h-full">
                                    <span className="text-xs font-bold text-foreground line-clamp-2 leading-snug group-hover:text-brand-teal transition-colors">
                                      {product.name[lang as 'EN'|'TR']}
                                    </span>
                                    <div className="flex items-center gap-1.5 mt-auto">
                                       <span className="text-sm font-extrabold text-foreground tracking-tight">₺{product.price.toFixed(2)}</span>
                                       {product.oldPrice && <span className="text-[10px] sm:text-xs font-medium text-muted-foreground line-through">₺{product.oldPrice.toFixed(2)}</span>}
                                    </div>
                                  </div>
                                </a>
                             ))
                           }
                          </div>
                      </div>
                    </div>
                  )}
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 lg:gap-5 shrink-0">
          <div className="flex items-center bg-secondary rounded-full p-1 border border-border">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1 rounded-full text-muted-foreground hover:text-foreground active:scale-90 transition-all duration-200 hover:rotate-12 mr-1"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setLang("TR")}
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full active:scale-95 transition-all duration-200 ${lang === "TR" ? "bg-card shadow-sm scale-105" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span>🇹🇷</span> TR
            </button>
            <button
              onClick={() => setLang("EN")}
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full active:scale-95 transition-all duration-200 ${lang === "EN" ? "bg-card shadow-sm scale-105" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span>🇬🇧</span> EN
            </button>
          </div>

          <div className="relative hidden md:block">
            <Tooltip
              text={lang === "TR" ? "Klasörlerim" : "My Folders"}
              position="bottom"
            >
              <button
                onClick={onOpenFolders}
                className={`group flex flex-col items-center justify-center gap-1 transition-all duration-300 text-muted-foreground hover:text-brand-teal`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95 relative bg-secondary`}
                >
                  <Folder className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {lang === "TR" ? "Klasör" : "Folders"}
                </span>
              </button>
            </Tooltip>
          </div>

          {/* Notifications Bell */}
          <div className="relative hidden md:block">
            <Tooltip
              text={
                lang === "TR" ? "Bildirimleri Görüntüle" : "View Notifications"
              }
              position="bottom"
            >
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`group flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isNotificationsOpen ? "text-brand-teal" : "text-muted-foreground hover:text-brand-teal"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95 relative ${isNotificationsOpen ? "bg-brand-teal-light" : "bg-secondary"}`}
                >
                  <Bell className="w-4 h-4 group-hover:rotate-[15deg] transition-transform duration-300" />
                  {isLoggedIn && (
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-background"></span>
                  )}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {lang === "TR" ? "Bildirim" : "Alerts"}
                </span>
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
                        {lang === "TR" ? "Bildirimler" : "Notifications"}
                      </h3>
                      {isLoggedIn ? (
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 text-sm">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                              <Package className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground m-0">
                                {lang === "TR"
                                  ? "Siparişiniz yola çıktı!"
                                  : "Order shipped!"}
                              </p>
                              <p className="text-muted-foreground text-xs m-0">
                                2 {lang === "TR" ? "saat önce" : "hours ago"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 text-sm">
                            <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground m-0">
                                {lang === "TR"
                                  ? "Hoş geldiniz"
                                  : "Welcome aboard"}
                              </p>
                              <p className="text-muted-foreground text-xs m-0">
                                1 {lang === "TR" ? "gün önce" : "day ago"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground">
                            {lang === "TR"
                              ? "Bildirimleri görmek için giriş yapın."
                              : "Log in to see notifications."}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block relative">
            <Tooltip
              text={
                lang === "TR" ? "Hesabınızı Yönetin" : "Manage your account"
              }
              position="bottom"
            >
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isAccountMenuOpen ? "text-brand-teal" : "text-muted-foreground hover:text-brand-teal"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${(isAccountMenuOpen || isLoggedIn) ? "bg-brand-teal-light text-brand-teal" : "bg-secondary"}`}
                >
                  <User className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {lang === "TR" ? "Hesap" : "Account"}
                </span>
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
                    className="absolute top-full right-1/2 translate-x-1/2 pt-2 z-50 min-w-[320px]"
                  >
                    <div className="bg-card rounded-xl shadow-xl border border-border overflow-hidden flex flex-col">
                      {isLoggedIn ? (
                        <>
                          <div className="bg-secondary/40 px-4 py-4 border-b border-border">
                            <span className="text-sm font-bold block text-foreground">{lang === "TR" ? "Merhaba, Kullanıcı!" : "Hello, User!"}</span>
                            <span className="text-xs text-muted-foreground block">{lang === "TR" ? "Hesabınıza Hoş Geldiniz" : "Welcome to your account"}</span>
                          </div>
                          
                          {/* Order History Section */}
                          <div className="flex flex-col border-b border-border">
                            <div className="px-4 py-2 border-b border-border bg-secondary/20">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{lang === "TR" ? "Sipariş Geçmişi" : "Order History"}</h4>
                            </div>
                            <div className="flex flex-col">
                              {/* MOCK ORDER 1 */}
                              <div className="flex flex-col gap-2 p-4 border-b border-border hover:bg-secondary/20 transition-colors">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center shrink-0">
                                      <Package className="w-4 h-4 text-brand-teal" />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-sm text-foreground line-clamp-1">Royal Canin Maxi Adult</span>
                                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                                        {lang === "TR" ? "Teslim Edildi - 12 May 2026" : "Delivered - May 12, 2026"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs font-bold font-mono">₺2500.00</span>
                                  <button 
                                    className="text-[10px] bg-secondary text-foreground hover:bg-brand-teal hover:text-white px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors flex items-center gap-1"
                                    onClick={() => { onAddToCart?.('Royal Canin Maxi Adult (15 Kg)', 1, 2500); setIsAccountMenuOpen(false); onOpenCart(); }}
                                  >
                                    <ShoppingBag className="w-3 h-3" />
                                    {lang === "TR" ? "Tekrar Al" : "Reorder"}
                                  </button>
                                </div>
                              </div>

                              {/* MOCK ORDER 2 */}
                              <div className="flex flex-col gap-2 p-4 border-b border-border hover:bg-secondary/20 transition-colors">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center shrink-0">
                                      <Package className="w-4 h-4 text-brand-teal" />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-sm text-foreground line-clamp-1">Pro Plan Puppy Somonlu</span>
                                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <Truck className="w-3 h-3 text-blue-500" />
                                        {lang === "TR" ? "Kargoya Verildi - 24 May 2026" : "Shipped - May 24, 2026"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs font-bold font-mono">₺1850.00</span>
                                  <button 
                                    className="text-[10px] bg-secondary text-foreground hover:bg-brand-teal hover:text-white px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors flex items-center gap-1"
                                    onClick={() => { onAddToCart?.('Pro Plan Puppy Somonlu (12 Kg)', 1, 1850); setIsAccountMenuOpen(false); onOpenCart(); }}
                                  >
                                    <ShoppingBag className="w-3 h-3" />
                                    {lang === "TR" ? "Tekrar Al" : "Reorder"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setIsAccountMenuOpen(false);
                              onLogout();
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                          >
                            <LogOut className="w-4 h-4" />
                            {lang === "TR" ? "Çıkış Yap" : "Log out"}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setIsAccountMenuOpen(false);
                              onOpenAuth("login");
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-semibold text-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300"
                          >
                            {lang === "TR" ? "Giriş Yap" : "Log in"}
                          </button>
                          <button
                            onClick={() => {
                              setIsAccountMenuOpen(false);
                              onOpenAuth("register");
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-semibold text-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300 border-t border-border"
                          >
                            {lang === "TR" ? "Üye Ol" : "Sign Up"}
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Button */}
          <Tooltip
            text={
              lang === "TR"
                ? "Sepetinizi Görüntüleyin"
                : "View your shopping cart"
            }
            position="bottom"
          >
            <button
              onClick={onOpenCart}
              aria-label={`Open Cart with ${cartCount} items`}
              className="flex items-center gap-2 relative bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white pl-4 pr-5 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-brand-teal/20"
            >
              <ShoppingBag className="w-5 h-5 p-0.5" />
              <span className="font-bold text-sm tracking-wide">
                {t("Cart", lang)}
              </span>
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
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-8"
          onMouseLeave={handleMouseLeaveCategory}
        >
          {CATEGORIES.map((category) => (
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
                className={`py-3 px-2 text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1 group ${activeCategory === category.id ? "text-brand-teal" : "text-muted-foreground hover:text-brand-teal"}`}
              >
                {category.name[lang]}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${activeCategory === category.id ? "rotate-180 text-brand-teal" : "text-muted-foreground group-hover:text-brand-teal"}`}
                />
              </button>
            </div>
          ))}
        </nav>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
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
                    {lang === "TR" ? "Öne Çıkanlar" : "Featured"}
                  </h3>
                  <div className="bg-brand-teal/10 rounded-xl p-6 border border-brand-teal/20 text-center flex flex-col items-center justify-center h-48 group cursor-pointer hover:bg-brand-teal/20 transition-colors">
                    <Sparkles className="w-8 h-8 text-brand-teal mb-3 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-brand-teal">
                      {lang === "TR" ? "Yeni Gelenler" : "New Arrivals"}
                    </span>
                  </div>
                </div>

                <div className="w-3/4 pl-8 grid grid-cols-3 gap-y-6 gap-x-8">
                  {CATEGORIES.find(
                    (c) => c.id === activeCategory,
                  )?.subcategories.map((sub) => (
                    <a
                      key={sub.id}
                      href={`#/category/${sub.id}`}
                      className="text-sm font-medium text-muted-foreground hover:text-brand-teal transition-colors flex items-center group"
                    >
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
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-background shadow-2xl z-[110] lg:hidden flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <a
                  href="#"
                  className="flex items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = "";
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="Vivia Logo"
                    className="w-10 h-10 object-contain rounded-lg"
                  />
                  <span className="font-extrabold tracking-tight text-foreground text-xl">
                    Vivia
                  </span>
                </a>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-secondary rounded-full text-foreground hover:bg-secondary-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar p-4">
                <nav className="flex flex-col gap-2 relative">
                  {CATEGORIES.map((category) => (
                    <div
                      key={category.id}
                      className="border border-border rounded-xl bg-card overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === category.id ? null : category.id,
                          )
                        }
                        className="w-full text-left px-4 py-4 flex items-center justify-between text-base font-semibold text-foreground"
                      >
                        {category.name[lang]}
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${mobileExpanded === category.id ? "rotate-180 text-brand-teal" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === category.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-secondary/30"
                          >
                            <div className="flex flex-col py-2">
                              {category.subcategories.map((sub) => (
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

function Hero({
  onStartOnboarding,
  onStartPetProfile,
  userPets,
  onAddToCart,
}: {
  onStartOnboarding: () => void;
  onStartPetProfile: () => void;
  userPets: any[];
  onAddToCart?: (name: string, quantity?: number, price?: number) => void;
}) {
  const { lang } = useLang();
  const [showBirthdayCard, setShowBirthdayCard] = useState<string | null>(null);

  const activePetsCount = userPets.filter((p) => p.name).length;

  const today = new Date();
  const todayStr = `${today.getMonth() + 1}-${today.getDate()}`;
  const birthdayPets = userPets.filter((p) => {
    if (!p.birthday || !p.name) return false;
    const [y, m, d] = p.birthday.split("-");
    return `${parseInt(m)}-${parseInt(d)}` === todayStr;
  });

  return (
    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[40vh] relative z-10 w-full overflow-hidden shrink-0">
      <AnimatePresence>
        {showBirthdayCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setShowBirthdayCard(null)}
          >
            <div
              className="bg-gradient-to-br from-[#E27D60] to-[#E2A660] w-full max-w-md rounded-[2rem] shadow-2xl p-8 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <button
                onClick={() => setShowBirthdayCard(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-3xl font-extrabold text-white mb-2 font-display">
                  {lang === "TR" ? "İyi ki Doğdun" : "Happy Birthday"}
                </h2>
                <h3 className="text-4xl font-extrabold text-[#FFFDF2] mb-6">
                  {showBirthdayCard}!
                </h3>
                <p className="text-white/90 font-medium mb-8 text-lg">
                  {lang === "TR"
                    ? "Bugün senin özel günün! Sana harika bir doğum günü hediyesi hazırladık. Bu hediye sepetinize özel eklenmiştir."
                    : "Today is your special day! We prepared a wonderful birthday gift for you. It has been specially added to your cart."}
                </p>
                <button
                  onClick={() => {
                    if (onAddToCart)
                      onAddToCart(
                        `Birthday Cake Bonus for ${showBirthdayCard}`,
                        1,
                        0,
                      );
                    setShowBirthdayCard(null);
                  }}
                  className="bg-white text-[#E27D60] px-8 py-3 rounded-full font-extrabold shadow-xl hover:scale-105 active:scale-95 transition-all w-full text-lg"
                >
                  {lang === "TR" ? "Hediyeyi Al" : "Claim Gift"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center max-w-4xl mx-auto mb-16 relative z-10 w-full shrink-0">
        {birthdayPets.length > 0 && (
          <div
            onClick={() => setShowBirthdayCard(birthdayPets[0].name)}
            className="cursor-pointer inline-flex items-center gap-3 mb-6 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 hover:from-yellow-400/30 hover:to-orange-400/30 text-yellow-700 border border-yellow-400/50 rounded-full font-bold shadow-sm transition-all animate-pulse hover:animate-none hover:scale-105"
          >
            <span className="text-xl">🎉</span>
            <span>
              {lang === "TR"
                ? `Bugün ${birthdayPets.map((p: any) => p.name).join(", ")}'in doğum günü! Hediyen için tıkla!`
                : `Today is ${birthdayPets.map((p: any) => p.name).join(", ")}'s birthday! Click for your gift!`}
            </span>
            <span className="text-xl">🎂</span>
          </div>
        )}

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          {lang === "TR" ? "Dostlarınız için" : "Nutrition perfected for"}
          <br />
          <span className="text-brand-teal">
            {lang === "TR" ? "mükemmel beslenme." : "your best friends."}
          </span>
        </h1>
        <p className="text-lg text-muted-foreground font-medium mb-8 max-w-2xl mx-auto">
          {lang === "TR"
            ? "Bilimsel olarak formüle edilmiş, yüksek kaliteli içeriklerle dolu."
            : "Scientifically formulated, packed with high-quality ingredients."}
        </p>
        <div className="flex gap-4 justify-center">
          <Tooltip
            text={
              lang === "TR"
                ? "Hemen ürünlere göz atın"
                : "Browse products immediately"
            }
          >
            <button
              onClick={() => {
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full px-8 h-12 bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white text-base font-semibold transition-all duration-300 shadow-lg shadow-brand-teal/20"
            >
              {t("Shop Now", lang)}
            </button>
          </Tooltip>
          <Tooltip
            text={
              lang === "TR"
                ? "Kişiselleştirme ekranını açın"
                : "Open personalization settings"
            }
          >
            <button
              onClick={onStartPetProfile}
              className="rounded-full px-8 h-12 border-2 border-brand-teal/50 bg-brand-teal/5 hover:bg-brand-teal/10 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-brand-teal-dark flex items-center justify-center gap-2 text-base font-semibold transition-all duration-300 shadow-sm"
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {activePetsCount > 0
                ? lang === "TR"
                  ? "Profilinizi Düzenleyin"
                  : "Edit Pet Profile"
                : lang === "TR"
                  ? "Dostunuzu Ekleyin"
                  : "Personalize for your Pet"}
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-[32px]">
        {/* Feature - Dogs */}
        <a 
          href="#/category/dogs"
          className="block relative rounded-[32px] overflow-hidden min-h-[300px] md:min-h-[400px] border border-border group bg-card hover:shadow-xl hover:border-brand-teal/30 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 transition-all cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop"
            alt="Dog"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
          <div className="absolute bottom-0 left-0 p-8 w-full z-10 text-left transition-transform duration-300 group-hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center justify-between">
              {lang === "TR" ? "Köpek Temel İhtiyaçları" : "Dog Essentials"}
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-teal-light" />
            </h3>
            <p className="text-white/80">
              {lang === "TR"
                ? "Aktif dostlarınıza özel formüller."
                : "Active lifestyle formulas."}
            </p>
          </div>
        </a>
        {/* Smaller feature - Cats */}
        <a 
          href="#/category/cats"
          className="block relative rounded-[32px] overflow-hidden min-h-[300px] md:min-h-[400px] border border-border group bg-card hover:shadow-xl hover:border-brand-teal/30 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 transition-all cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop"
            alt="Cat"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
          <div className="absolute bottom-0 left-0 p-8 w-full z-10 text-left transition-transform duration-300 group-hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center justify-between">
              {lang === "TR" ? "Kedilerin Favorileri" : "Feline Favorites"}
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-teal-light" />
            </h3>
            <p className="text-white/80">
              {lang === "TR"
                ? "Premium balık ve kümes hayvanı karışımları."
                : "Premium fish and poultry blends."}
            </p>
          </div>
        </a>
        {/* Smaller feature - Birds */}
        <a 
          href="#/category/birds"
          className="block relative rounded-[32px] overflow-hidden min-h-[300px] md:min-h-[400px] border border-border group bg-card hover:shadow-xl hover:border-brand-teal/30 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 transition-all cursor-pointer"
        >
          <img
            src="/cockatiel_category.png"
            alt="Avian"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
          <div className="absolute bottom-0 left-0 p-8 w-full z-10 text-left transition-transform duration-300 group-hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center justify-between">
              {lang === "TR" ? "Kuş Bakımı" : "Avian Care"}
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-teal-light" />
            </h3>
            <p className="text-white/80">
              {lang === "TR"
                ? "Besin dolu tohum karışımları."
                : "Nutrient-packed seed mixes."}
            </p>
          </div>
        </a>
        {/* Smaller feature - Fish */}
        <a 
          href="#/category/fish"
          className="block relative rounded-[32px] overflow-hidden min-h-[300px] md:min-h-[400px] border border-border group bg-card hover:shadow-xl hover:border-brand-teal/30 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 transition-all cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1000&auto=format&fit=crop"
            alt="Fish"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
          <div className="absolute bottom-0 left-0 p-8 w-full z-10 text-left transition-transform duration-300 group-hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center justify-between">
              {lang === "TR" ? "Akvaryum" : "Aquariums"}
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-teal-light" />
            </h3>
            <p className="text-white/80">
              {lang === "TR"
                ? "Tertemiz sular ve sağlıklı balıklar."
                : "Crystal clear water & healthy fish."}
            </p>
          </div>
        </a>
        {/* Smaller feature - Rodents */}
        <a 
          href="#/category/rodents"
          className="block relative rounded-[32px] overflow-hidden min-h-[300px] md:min-h-[400px] border border-border group bg-card hover:shadow-xl hover:border-brand-teal/30 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 transition-all cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1000&auto=format&fit=crop"
            alt="Rodent"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
          <div className="absolute bottom-0 left-0 p-8 w-full z-10 text-left transition-transform duration-300 group-hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center justify-between">
              {lang === "TR" ? "Kemirgenler" : "Small Pets"}
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-teal-light" />
            </h3>
            <p className="text-white/80">
              {lang === "TR"
                ? "Sevimli dostlara büyük bakım."
                : "Big care for small companions."}
            </p>
          </div>
        </a>
        {/* Smaller feature - Reptiles */}
        <a 
          href="#/category/reptiles"
          className="block relative rounded-[32px] overflow-hidden min-h-[300px] md:min-h-[400px] border border-border group bg-card hover:shadow-xl hover:border-brand-teal/30 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 transition-all cursor-pointer"
        >
          <img
            src="/chameleon_category.png"
            alt="Reptile"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
          <div className="absolute bottom-0 left-0 p-8 w-full z-10 text-left transition-transform duration-300 group-hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center justify-between">
              {lang === "TR" ? "Sürüngenler" : "Reptiles"}
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-teal-light" />
            </h3>
            <p className="text-white/80">
              {lang === "TR"
                ? "Egzotik dostlarınız için özel alanlar."
                : "Specialized care for exotic pets."}
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}

function Services({
  onAddToCart,
  savedProductNames = [],
  onSaveToFolder = () => {},
  selectedPetsFilter,
  userPets = [],
  onTryOnProduct,
}: {
  onAddToCart: (item: string, quantity?: number) => void;
  savedProductNames?: string[];
  onSaveToFolder?: (item: string) => void;
  selectedPetsFilter?: string[];
  userPets?: PetProfileData[];
  onTryOnProduct?: (product: any) => void;
}) {
  const { lang } = useLang();

  // If selectedPetsFilter is explicitly provided (user manually filtered), use ONLY that.
  // Otherwise, fallback to the user's pet profile.
  const activeFilters =
    selectedPetsFilter !== undefined
      ? selectedPetsFilter.map((p) => p.toLowerCase())
      : userPets
          .filter((p) => p.name && p.type)
          .map((p) => p.type.toLowerCase());

  let recommendedProducts: any[] = [];
  const combinedPets = Array.from(new Set(activeFilters));

  if (combinedPets.length === 0) {
    recommendedProducts = GLOBAL_PRODUCTS_DATABASE.slice(0, 12);
  } else {
    // Collect products relevant to the selected/active pets
    let mixedProducts = GLOBAL_PRODUCTS_DATABASE.filter(p => {
      const pt = p._categoryLabel.EN.toLowerCase();
      return combinedPets.some(pet => {
        let petCat = pet.endsWith("s") ? pet : pet + "s";
        if (pet === "avian") petCat = "birds";
        if (pet === "fish") petCat = "fish";
        if (pet === "rodent") petCat = "rodents";
        if (pet === "reptile") petCat = "reptiles";
        return pt.includes(petCat) || pt === petCat || (pet === 'dog' && pt === 'dogs') || (pet === 'cat' && pt === 'cats');
      });
    });

    // Remove duplicates
    mixedProducts = mixedProducts.filter(
      (product, index, self) =>
        index === self.findIndex((t) => t.id === product.id),
    );

    // Apply allergy filtering - dont show products with known allergies
    const allAllergies = Array.from(
      new Set(
        userPets.flatMap(
          (p) => p.allergies?.map((a: string) => a.toLowerCase()) || [],
        ),
      ),
    );
    if (allAllergies.length > 0) {
      mixedProducts = mixedProducts.filter((p) => {
        const pName = p.name.EN.toLowerCase();
        const pFlavor = p.flavor?.toLowerCase() || "";
        return !allAllergies.some((allergy) => {
          const allergyTR =
            allergy === "chicken"
              ? "tavuk"
              : allergy === "grain"
                ? "tahıl"
                : allergy === "beef"
                  ? "sığır"
                  : allergy === "dairy"
                    ? "süt"
                    : allergy === "fish"
                      ? "balık"
                      : "toz";
          return (
            pName.includes(allergy) ||
            pName.includes(allergyTR) ||
            pFlavor.includes(allergy) ||
            pFlavor.includes(allergyTR)
          );
        });
      });
    }

    // Sort to prioritize items that match the pet's age/size
    mixedProducts = mixedProducts.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      for (const pet of userPets) {
        if (pet.type.toLowerCase() === "dog" && !a.brand) {
        } // generic check
        const petAgeNum = parseFloat(pet.age);
        let petAgeStage = "Adult";
        if (petAgeNum < 1) petAgeStage = "Puppy/Kitten";
        else if (petAgeNum >= 7) petAgeStage = "Senior";

        let petSizeStage = "All Sizes";
        const petWtNum = parseFloat(pet.weight || "0");
        if (petWtNum > 0 && petWtNum < 10) petSizeStage = "Small";
        else if (petWtNum > 25) petSizeStage = "Large";

        if (a.age === petAgeStage) scoreA += 5;
        if (b.age === petAgeStage) scoreB += 5;
        if (a.breedSize === petSizeStage) scoreA += 3;
        if (b.breedSize === petSizeStage) scoreB += 3;
      }
      return scoreB - scoreA;
    });

    recommendedProducts = mixedProducts.slice(0, 12);
  }

  return (
    <section id="services" className="py-20 bg-secondary/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            {lang === "TR" ? "Sizin İçin Seçtiklerimiz" : "Recommended For You"}
          </h2>
          <a
            href="#/category/personalized"
            className="flex items-center gap-1 text-sm font-semibold text-brand-teal hover:text-brand-teal-dark active:scale-95 transition-all"
          >
            {lang === "TR" ? "Tümünü Gör" : "View All"}{" "}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {recommendedProducts.map((p) => (
            <ProductListingCard
              key={p.id}
              product={p}
              lang={lang}
              onAddToCart={onAddToCart}
              isSaved={savedProductNames.includes(p.name.EN)}
              onSaveToFolder={onSaveToFolder}
              onTryOnProduct={onTryOnProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderTrackingSection() {
  const { lang } = useLang();
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<
    "IDLE" | "LOADING" | "PROCESSING" | "SHIPPED" | "DELIVERED"
  >("IDLE");
  const [error, setError] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError(t("Please enter a valid order ID.", lang as Lang));
      setStatus("IDLE");
      return;
    }
    setError("");
    setStatus("LOADING");

    setTimeout(() => {
      const len = orderId.trim().length;
      if (len < 5) {
        setStatus("PROCESSING");
      } else if (len >= 5 && len < 9) {
        setStatus("SHIPPED");
      } else {
        setStatus("DELIVERED");
      }
    }, 1200);
  };

  return (
    <section
      id="tracking"
      className="py-20 bg-card relative border-t border-border"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-[2rem] p-8 sm:p-12 shadow-xl border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-brand-teal-light text-brand-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-2">
              {t("Track Your Order", lang as Lang)}
            </h2>
            <p className="text-muted-foreground">
              {t("Enter your order ID (e.g., VIVIA-123)", lang as Lang)}
            </p>
          </div>

          <form
            onSubmit={handleTrack}
            className="flex flex-col sm:flex-row gap-3 relative z-10 w-full"
          >
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="VIVIA-..."
              className="flex-1 bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 font-mono uppercase transition-all duration-300"
            />
            <button
              type="submit"
              disabled={status === "LOADING"}
              className="bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white font-bold transition-all duration-300 py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
            >
              {status === "LOADING" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              {t("Track Order", lang as Lang)}
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
          )}

          <AnimatePresence mode="wait">
            {status !== "IDLE" && status !== "LOADING" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-10 pt-10 border-t border-border relative z-10"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-1">
                      {t("Order ID", lang as Lang)}
                    </p>
                    <p className="text-lg font-mono font-bold text-foreground uppercase">
                      {orderId}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-1">
                      {t("Status:", lang as Lang)}
                    </p>
                    <div className="inline-flex items-center gap-1.5 bg-brand-teal-light text-brand-teal-dark px-3 py-1 rounded-full text-sm font-bold">
                      {status === "PROCESSING" && (
                        <Package className="w-4 h-4" />
                      )}
                      {status === "SHIPPED" && <Truck className="w-4 h-4" />}
                      {status === "DELIVERED" && (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      {status === "PROCESSING" && t("Processing", lang as Lang)}
                      {status === "SHIPPED" && t("Shipped", lang as Lang)}
                      {status === "DELIVERED" && t("Delivered", lang as Lang)}
                    </div>
                  </div>
                </div>

                <div className="relative pt-4">
                  <div className="absolute top-6 left-0 w-full h-1 bg-secondary rounded-full" />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        status === "PROCESSING"
                          ? "15%"
                          : status === "SHIPPED"
                            ? "50%"
                            : "100%",
                    }}
                    className="absolute top-6 left-0 h-1 bg-brand-teal rounded-full"
                  />

                  <div className="flex justify-between relative z-10">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full border-4 flex shrink-0 ${status === "PROCESSING" || status === "SHIPPED" || status === "DELIVERED" ? "bg-brand-teal border-brand-teal-light" : "bg-muted border-background"}`}
                      />
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${status === "PROCESSING" || status === "SHIPPED" || status === "DELIVERED" ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {t("Processing", lang as Lang)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full border-4 flex shrink-0 ${status === "SHIPPED" || status === "DELIVERED" ? "bg-brand-teal border-brand-teal-light" : "bg-muted border-background"}`}
                      />
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${status === "SHIPPED" || status === "DELIVERED" ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {t("Shipped", lang as Lang)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-right">
                      <div
                        className={`w-5 h-5 rounded-full border-4 flex shrink-0 ${status === "DELIVERED" ? "bg-brand-teal border-brand-teal-light" : "bg-muted border-background"}`}
                      />
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${status === "DELIVERED" ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {t("Delivered", lang as Lang)}
                      </span>
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {t("Why shop with Vivia?", lang)}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
            {lang === "TR"
              ? "Sadece evcil hayvanlarınızın esenliğine odaklanan bir pazar yeriyiz. İster bir köpeğe bakıyor olun, ister özel bir teraryum kuruyor olun, tam olarak ihtiyacınız olan ürünleri sunuyoruz."
              : "We are a dedicated marketplace, focused entirely on the well-being of your pets. Whether you are caring for a dog or setting up a specialized terrarium, we provide the exact products you need."}
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">
                  {t("Fast & Accessible", lang)}
                </h4>
                <p className="text-primary-foreground/70 text-base">
                  {lang === "TR"
                    ? "Acil ihtiyaçlarınıza hızlı ve güvenilir bir şekilde yardımcı olmaya hazırız."
                    : "Ready to assist your immediate needs quickly and reliably."}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">
                  {t("Wide Ranging Expertise", lang)}
                </h4>
                <p className="text-primary-foreground/70 text-base">
                  {lang === "TR"
                    ? "Yaygın evcil hayvanlardan sürüngenlere kadar özel zorunlu ihtiyaçları stoklarımızda bulunduruyoruz."
                    : "From common pets to reptiles, we stock specialized essentials."}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">
                  {t("Direct Communication", lang)}
                </h4>
                <p className="text-primary-foreground/70 text-base">
                  {lang === "TR"
                    ? "Karmaşık prosedürler yok. Bize sadece WhatsApp'tan yazın ve sorularınızı yanıtlayalım."
                    : "No complex procedures. Just message us on WhatsApp and get your questions answered."}
                </p>
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
              <h3 className="text-2xl font-bold mb-2 text-white">
                {t("Always Online", lang)}
              </h3>
              <p className="text-white/70 text-sm mb-6 max-w-xs mx-auto">
                {lang === "TR"
                  ? "Yüksek kaliteli ürünler her an elinizin altında."
                  : "High-quality supplies always at your fingertips."}
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
  };

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
          {t("Ready to order?", lang)}
        </h2>
        <p className="text-muted-foreground text-lg mb-12">
          {lang === "TR"
            ? "Stok durumunu onaylamak, tavsiye istemek veya sipariş vermek için doğrudan bizimle iletişime geçin. Yardımcı olmak için buradayız."
            : "Contact us directly to confirm stock, ask for recommendations, or place an order. We are here to help."}
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
              <div
                className="w-8 text-muted-foreground shrink-0"
                aria-hidden="true"
              >
                ✉️
              </div>
              <button
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="text-muted-foreground text-base hover:text-brand-teal transition-all duration-300 flex items-center gap-2"
              >
                {CONTACT.email}
                {copied && (
                  <span className="text-sm font-semibold text-brand-teal bg-brand-teal-light px-3 py-1 rounded-full">
                    {t("Copied!", lang)}
                  </span>
                )}
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
            <img
              src="/logo.png"
              alt="Vivia Logo"
              className="w-8 h-8 object-contain rounded-md"
            />
            <span className="font-bold text-lg text-foreground tracking-tight">
              Vivia Pet
            </span>
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Visit our Instagram"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Visit our X (Twitter)"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Visit our Facebook"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Visit our Youtube"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-brand-teal-light hover:text-brand-teal transition-all duration-300"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Vivia Marketplace.{" "}
            {lang === "TR" ? "Tüm hakları saklıdır." : "All rights reserved."}
          </p>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <a
              href="#"
              className="hover:text-brand-teal transition-all duration-300"
            >
              {t("Terms", lang)}
            </a>
            <a
              href="#"
              className="hover:text-brand-teal transition-all duration-300"
            >
              {t("Privacy", lang)}
            </a>
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
  weight: string;
  allergies: string[];
  dietaryPreferences: string[];
  sterilized: boolean;
  activityLevel: "low" | "normal" | "high";
  birthday: string;
  weightHistory: { date: string; weight: number }[];
  reminders: {
    id: string;
    type: string;
    dueDate: string;
    resolved: boolean;
    name?: string;
  }[];
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
  onAddToCart,
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
  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState("");
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  if (!isOpen) return null;

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    if (folders.length >= 10) return;

    setFolders([
      ...folders,
      { id: Date.now().toString(), name: newFolderName, items: [] },
    ]);
    setNewFolderName("");
    setIsCreating(false);
  };

  const handleRenameFolder = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!editFolderName.trim()) return;
    setFolders(
      folders.map((f) => (f.id === id ? { ...f, name: editFolderName } : f)),
    );
    setEditingFolderId(null);
  };

  const handleDeleteFolder = (id: string) => {
    setFolders(folders.filter((f) => f.id !== id));
    if (activeFolderId === id) setActiveFolderId(null);
  };

  const handleRemoveProduct = (folderId: string, itemName: string) => {
    setFolders(
      folders.map((f) =>
        f.id === folderId
          ? { ...f, items: f.items.filter((i) => i !== itemName) }
          : f,
      ),
    );
  };

  const handleAddProduct = (itemName: string) => {
    if (!activeFolderId) return;
    setFolders(
      folders.map((f) =>
        f.id === activeFolderId ? { ...f, items: [...f.items, itemName] } : f,
      ),
    );
  };

  // Build a list of possible products to add.
  // We map MOCK_PRODUCTS to strings that look like the ones generated by ProductCard
  const allPossibleProducts = SERVICES.flatMap((s) =>
    s.items.map((i) => `${t(s.title, lang as any)} - ${t(i, lang as any)}`),
  );

  const activeFolder = folders.find((f) => f.id === activeFolderId);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darker/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-card flex flex-col rounded-[32px] overflow-hidden max-w-3xl w-full h-[85vh] shadow-2xl relative"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex-shrink-0 p-6 sm:p-8 pb-4 border-b border-border/50 bg-card relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 flex items-center gap-2">
                <Bookmark className="w-6 h-6 sm:w-8 sm:h-8 text-brand-teal" />
                {lang === "TR" ? "Klasörlerim" : "My Folders"}
              </h2>
              <p className="text-muted-foreground text-sm">
                {lang === "TR"
                  ? "Sık aldığınız ürünleri kaydedin ve hızlıca sepete ekleyin."
                  : "Save frequently purchased products and quickly add them to your cart."}
              </p>
            </div>
            <button
              aria-label="Close"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary active:scale-90 transition-all duration-300 z-10 text-muted-foreground hover:text-foreground hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar - Folder List */}
            <div className="w-[35%] sm:w-64 border-r border-border/50 flex flex-col bg-secondary/20">
              <div className="p-3 sm:p-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar flex-1">
                {folders.map((folder) => (
                  <div key={folder.id} className="group relative">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setActiveFolderId(folder.id);
                        setIsAddingProduct(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setActiveFolderId(folder.id);
                          setIsAddingProduct(false);
                        }
                      }}
                      className={`w-full text-left px-2 sm:px-3 py-2 sm:py-3 rounded-xl flex flex-col gap-1 transition-all cursor-pointer ${activeFolderId === folder.id ? "bg-brand-teal/10 text-brand-teal ring-1 ring-brand-teal/30 shadow-sm" : "hover:bg-secondary text-muted-foreground hover:text-foreground"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs sm:text-sm truncate pr-2 sm:pr-6">
                          {folder.name}
                        </span>
                        {/* Only show delete if they hover to avoid misclicks, or on active */}
                        {activeFolderId === folder.id && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteFolder(folder.id);
                            }}
                            className="absolute right-1 sm:right-2 top-2 sm:top-3 p-1 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        )}
                      </div>
                      <span className="text-[10px] font-medium opacity-70">
                        {folder.items.length} {lang === "TR" ? "ürün" : "items"}
                      </span>
                    </div>
                    {activeFolderId === folder.id &&
                      editingFolderId !== folder.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingFolderId(folder.id);
                            setEditFolderName(folder.name);
                          }}
                          className="absolute right-6 sm:right-10 top-2 sm:top-3 p-1 rounded-md text-muted-foreground hover:text-brand-teal hover:bg-brand-teal/10 transition-colors"
                        >
                          {/* We can use another icon for edit, text for now or simple styling */}
                          <div className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center font-bold text-[10px] sm:text-xs">
                            ✎
                          </div>
                        </button>
                      )}

                    {editingFolderId === folder.id && (
                      <form
                        onSubmit={(e) => handleRenameFolder(folder.id, e)}
                        className="absolute inset-0 bg-card rounded-xl shadow-md border border-brand-teal/30 p-1 sm:p-2 flex items-center z-10"
                      >
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
                  <form
                    onSubmit={handleCreateFolder}
                    className="flex flex-col gap-2"
                  >
                    <input
                      autoFocus
                      placeholder={lang === "TR" ? "Ad..." : "Name..."}
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="w-full px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-border bg-card text-xs sm:text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                    />
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => setIsCreating(false)}
                        className="flex-1 py-1 sm:py-2 text-[10px] sm:text-xs font-semibold rounded-lg bg-secondary text-muted-foreground hover:text-foreground"
                      >
                        {lang === "TR" ? "İptal" : "Cancel"}
                      </button>
                      <button
                        type="submit"
                        disabled={!newFolderName.trim()}
                        className="flex-1 py-1 sm:py-2 text-[10px] sm:text-xs font-semibold rounded-lg bg-brand-teal text-white hover:bg-brand-teal-dark disabled:opacity-50"
                      >
                        {lang === "TR" ? "Kaydet" : "Save"}
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
                    <span className="truncate">
                      {lang === "TR" ? "Yeni Klasör" : "New Folder"}
                    </span>
                  </button>
                )}
                {folders.length >= 10 && (
                  <p className="text-[9px] sm:text-[10px] text-center text-muted-foreground mt-2">
                    {lang === "TR"
                      ? "Maksimum 10 klasör ekleyebilirsiniz."
                      : "You can add a maximum of 10 folders."}
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
                      {lang === "TR" ? "Ürün Ekle" : "Add Products"}
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {isAddingProduct ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-lg">
                            {lang === "TR"
                              ? "Katalogdan Seç"
                              : "Select from Catalog"}
                          </h4>
                          <button
                            onClick={() => setIsAddingProduct(false)}
                            className="text-sm text-muted-foreground hover:text-foreground underline"
                          >
                            {lang === "TR" ? "Geri Dön" : "Back"}
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
                              <span className="text-sm font-medium line-clamp-2 pr-2">
                                {p}
                              </span>
                              {!activeFolder.items.includes(p) && (
                                <Plus className="w-4 h-4 text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {activeFolder.items.length === 0 ? (
                          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                            <FolderOpen className="w-16 h-16 mb-4 text-muted-foreground" />
                            <p className="text-lg font-semibold">
                              {lang === "TR"
                                ? "Bu klasör boş."
                                : "This folder is empty."}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {lang === "TR"
                                ? "Kaydetmek istediğiniz ürünleri ekleyin."
                                : "Add products you want to save."}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {activeFolder.items.map((item, idx) => {
                              const match = GLOBAL_PRODUCTS_DATABASE.find(p => p.name.EN === item || p.name.TR === item);
                              return (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-border bg-card group hover:shadow-sm transition-all hover:border-brand-teal/30"
                              >
                                {match ? (
                                  <a href={`#/product/${match.id}`} onClick={() => onClose()} className="font-medium text-sm sm:text-base hover:text-brand-teal transition-colors truncate pr-4">
                                    {item}
                                  </a>
                                ) : (
                                  <span className="font-medium text-sm sm:text-base truncate pr-4">
                                    {item}
                                  </span>
                                )}
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      handleRemoveProduct(activeFolder.id, item)
                                    }
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
                                    {lang === "TR"
                                      ? "Sepete Ekle"
                                      : "Add to Cart"}
                                  </button>
                                </div>
                              </div>
                            );
                           })}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 p-6">
                  <Bookmark className="w-16 h-16 mb-4 text-muted-foreground" />
                  <p className="text-lg font-semibold">
                    {lang === "TR" ? "Klasör Seçin" : "Select a Folder"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    {lang === "TR"
                      ? "Görüntülemek için soldan bir klasör seçin veya yeni bir tane oluşturun."
                      : "Select a folder from the left or create a new one to view items."}
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
function SaveToFolderModal({
  isOpen,
  onClose,
  productName,
  folders,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  productName: string | null;
  folders: SavedFolder[];
  onSave: (folderId: string) => void;
}) {
  const { lang } = useLang();

  if (!isOpen || !productName) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-darker/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-card flex flex-col rounded-[24px] overflow-hidden max-w-sm w-full shadow-2xl relative"
        >
          <div className="p-4 sm:p-5 pb-3 border-b border-border/50 bg-card relative flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-brand-teal" />
              {lang === "TR" ? "Klasöre Kaydet" : "Save to Folder"}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto custom-scrollbar flex flex-col gap-2">
            {folders.map((folder) => {
              const isAlreadyAdded = folder.items.includes(productName);
              return (
                <button
                  key={folder.id}
                  onClick={() => {
                    if (!isAlreadyAdded) {
                      onSave(folder.id);
                      onClose();
                    }
                  }}
                  disabled={isAlreadyAdded}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all ${isAlreadyAdded ? "bg-secondary/50 text-muted-foreground cursor-default" : "hover:bg-brand-teal/10 hover:text-brand-teal border border-transparent hover:border-brand-teal/30 cursor-pointer"}`}
                >
                  <span className="font-semibold text-sm">{folder.name}</span>
                  {isAlreadyAdded && (
                    <Check className="w-4 h-4 text-brand-teal" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PetProfileModal({
  isOpen,
  onClose,
  pets,
  setPets,
  focusedPetId,
}: {
  isOpen: boolean;
  onClose: () => void;
  pets: PetProfileData[];
  setPets: React.Dispatch<React.SetStateAction<PetProfileData[]>>;
  focusedPetId?: string | null;
}) {
  const { lang, setLang } = useLang();

  const [isSaved, setIsSaved] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const [activePetId, setActivePetId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"profile" | "health">("profile");
  const [newWeightDate, setNewWeightDate] = useState("");
  const [newWeightValue, setNewWeightValue] = useState("");
  const [newReminder, setNewReminder] = useState({
    type: "Vaccine",
    date: "",
    name: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (focusedPetId) {
        setActivePetId(focusedPetId);
      } else if (pets.length > 0) {
        setActivePetId(pets[0].id);
      }
    }
  }, [isOpen, focusedPetId, pets.length]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 2000);
  };

  const addPet = () => {
    const newId = Date.now().toString();
    const generatedReminders = generatePeriodicCareReminders({
      type: "Dog",
    }).map((r) => {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + r.days);
      return {
        id: Date.now().toString() + Math.random(),
        type: r.type,
        name: lang === "TR" ? r.titleTR : r.titleEN,
        dueDate: dueDate.toISOString().split("T")[0],
        resolved: false,
      };
    });
    setPets([
      ...pets,
      {
        id: newId,
        type: "Dog",
        name: "",
        age: "",
        breed: "",
        gender: "",
        healthInfo: "",
        photo: null,
        weight: "",
        allergies: [],
        dietaryPreferences: [],
        sterilized: false,
        activityLevel: "normal",
        birthday: "",
        weightHistory: [],
        reminders: generatedReminders,
      },
    ]);
    setActivePetId(newId);
  };

  const removePet = (id: string) => {
    const updatedPets = pets.filter((p) => p.id !== id);
    setPets(updatedPets);
    if (activePetId === id) {
      setActivePetId(updatedPets.length > 0 ? updatedPets[0].id : null);
    }
  };

  const updatePet = (
    id: string,
    field: keyof PetProfileData,
    value: string,
  ) => {
    setPets(pets.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handlePhotoUpload = (
    petId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setPhotoError(
        lang === "TR"
          ? "Sadece JPG, PNG ve WEBP formatları desteklenmektedir."
          : "Only JPG, PNG and WEBP formats are supported.",
      );
      setTimeout(() => setPhotoError(null), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      updatePet(petId, "photo", e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const getPetProfileLabel = (pet: PetProfileData) => {
    if (pet.name.trim() !== "") return pet.name;
    const petsOfSameType = pets.filter((p) => p.type === pet.type);
    const translatedType = t(pet.type, lang);
    if (petsOfSameType.length > 1) {
      const typeIndex = petsOfSameType.findIndex((p) => p.id === pet.id) + 1;
      return `${translatedType} • ${typeIndex}`;
    }
    return translatedType;
  };

  const activePet = pets.find((p) => p.id === activePetId) || pets[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darker/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-card flex flex-col rounded-[32px] overflow-hidden max-w-2xl w-full max-h-[90vh] shadow-2xl relative"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex-shrink-0 p-6 sm:p-8 pb-4 border-b border-border/50 bg-card relative z-10">
              <div className="absolute top-6 left-6 flex bg-secondary/80 rounded-full p-1 z-10">
                <button
                  onClick={() => setLang("TR")}
                  className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === "TR" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-muted-foreground"}`}
                >
                  <span>🇹🇷</span> TR
                </button>
                <button
                  onClick={() => setLang("EN")}
                  className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === "EN" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-muted-foreground"}`}
                >
                  <span>🇬🇧</span> EN
                </button>
              </div>
              <button
                aria-label="Close"
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary active:scale-90 transition-all duration-300 z-10 text-muted-foreground hover:text-foreground hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mt-12 pb-2">
                <div className="w-16 h-16 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 fill-current" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {lang === "TR" ? "Evcil Hayvan Yönetimi" : "Pet Management"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "TR"
                    ? "Profil, sağlık ve tüketim detaylarınızı düzenleyin."
                    : "Manage profiles, health, and consumption details."}
                </p>
              </div>
            </div>

            {/* Form Body */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 custom-scrollbar flex flex-col">
              {photoError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-center text-sm font-medium shrink-0">
                  {photoError}
                </div>
              )}

              {!isSaved ? (
                <>
                  {/* Tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-4 shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b border-border/50 mb-4">
                    {pets.map((pet) => (
                      <button
                        key={pet.id}
                        onClick={() => setActivePetId(pet.id)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all border ${activePetId === pet.id ? "bg-brand-teal text-white border-brand-teal shadow-md" : "bg-secondary border-border text-muted-foreground hover:bg-secondary-dark"}`}
                      >
                        {getPetProfileLabel(pet)}
                      </button>
                    ))}
                    <button
                      onClick={addPet}
                      className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all border border-dashed border-border bg-card text-muted-foreground hover:border-brand-teal hover:text-brand-teal flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />{" "}
                      {lang === "TR" ? "Ekle" : "Add"}
                    </button>
                  </div>

                  {activePet && (
                    <div className="flex gap-4 mb-4">
                      <button
                        type="button"
                        onClick={() => setViewMode("profile")}
                        className={`flex-1 py-2 border-b-2 font-bold transition-all ${viewMode === "profile" ? "border-brand-teal text-brand-teal" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                      >
                        {lang === "TR" ? "Profil" : "Profile"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("health")}
                        className={`flex-1 py-2 border-b-2 font-bold transition-all ${viewMode === "health" ? "border-brand-teal text-brand-teal" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                      >
                        {lang === "TR"
                          ? "Sağlık & Tüketim"
                          : "Health & Consumption"}
                      </button>
                    </div>
                  )}

                  <form
                    id="pet-registration-form"
                    onSubmit={handleSave}
                    className="space-y-8 flex-1"
                  >
                    {activePet && viewMode === "profile" && (
                      <motion.div
                        key={activePet.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="p-5 sm:p-6 rounded-2xl border border-border/60 bg-secondary/30 relative space-y-6"
                      >
                        {pets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePet(activePet.id)}
                            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                            aria-label="Delete Pet"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}

                        <div className="flex items-center gap-4">
                          {/* Photo Upload */}
                          <input
                            type="file"
                            accept="image/jpeg, image/png, image/webp"
                            className="hidden"
                            ref={(el) =>
                              (fileInputRefs.current[activePet.id] = el!)
                            }
                            onChange={(e) => handlePhotoUpload(activePet.id, e)}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              fileInputRefs.current[activePet.id]?.click()
                            }
                            className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-brand-teal hover:bg-brand-teal/5 transition-colors text-muted-foreground hover:text-brand-teal overflow-hidden relative"
                          >
                            {activePet.photo ? (
                              <img
                                src={activePet.photo}
                                alt={activePet.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <>
                                <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                                <span className="text-[10px] sm:text-xs font-medium px-1 text-center leading-none">
                                  {lang === "TR" ? "Fotoğraf" : "Add Photo"}
                                </span>
                              </>
                            )}
                          </button>
                          <div>
                            <h3 className="font-bold text-lg sm:text-xl">
                              {getPetProfileLabel(activePet)}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {activePet.name ||
                                (lang === "TR" ? "İsimsiz" : "Unnamed")}
                            </p>
                          </div>
                        </div>

                        {/* Pet Type */}
                        <div className="space-y-3">
                          <label className="block text-sm font-semibold text-foreground">
                            {lang === "TR" ? "Türü" : "Species"}
                          </label>
                          <div className="grid grid-cols-3 sm:flex bg-secondary p-1 gap-1 sm:gap-0 rounded-xl w-full">
                            {[
                              "Dog",
                              "Cat",
                              "Avian",
                              "Rodent",
                              "Fish",
                              "Reptile",
                            ].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() =>
                                  updatePet(activePet.id, "type", type)
                                }
                                className={`sm:flex-1 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition-all rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 min-w-[70px] ${activePet.type === type ? "bg-card text-foreground shadow-sm ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground hover:bg-secondary-dark"}`}
                              >
                                {type === "Dog" && <Dog className="w-4 h-4" />}
                                {type === "Cat" && <Cat className="w-4 h-4" />}
                                {type === "Avian" && (
                                  <Bird className="w-4 h-4" />
                                )}
                                {type === "Rodent" && (
                                  <Rat className="w-4 h-4" />
                                )}
                                {type === "Fish" && (
                                  <Fish className="w-4 h-4" />
                                )}
                                {type === "Reptile" && (
                                  <Turtle className="w-4 h-4" />
                                )}
                                <span className="block sm:inline max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 sm:px-0 truncate">
                                  {t(type, lang)}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-sm font-semibold text-foreground">
                              {lang === "TR" ? "Adı" : "Name"}
                            </label>
                            <input
                              required
                              type="text"
                              value={activePet.name}
                              onChange={(e) =>
                                updatePet(activePet.id, "name", e.target.value)
                              }
                              placeholder={
                                lang === "TR" ? "Örn: Tarçın" : "e.g. Max"
                              }
                              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-sm font-semibold text-foreground">
                              {lang === "TR" ? "Yaşı" : "Age"}
                            </label>
                            <input
                              required
                              type="number"
                              value={activePet.age}
                              onChange={(e) =>
                                updatePet(activePet.id, "age", e.target.value)
                              }
                              placeholder={
                                lang === "TR" ? "Yıl olarak" : "In years"
                              }
                              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-sm font-semibold text-foreground">
                              {lang === "TR" ? "Cinsiyeti" : "Gender"}
                            </label>
                            <div className="flex gap-2">
                              {["Male", "Female"].map((g) => (
                                <button
                                  key={g}
                                  type="button"
                                  onClick={() =>
                                    updatePet(activePet.id, "gender", g)
                                  }
                                  className={`flex-1 py-3 px-4 rounded-xl border font-medium text-sm transition-all ${activePet.gender === g ? "bg-brand-teal/10 border-brand-teal text-brand-teal-dark font-semibold" : "bg-card border-border text-muted-foreground hover:border-brand-teal/50"}`}
                                >
                                  {lang === "TR"
                                    ? g === "Male"
                                      ? "Erkek"
                                      : "Dişi"
                                    : g}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-sm font-semibold text-foreground">
                              {lang === "TR"
                                ? "Kısırlaştırılmış mı?"
                                : "Sterilized?"}
                            </label>
                            <div className="flex gap-2">
                              {[true, false].map((val) => (
                                <button
                                  key={val.toString()}
                                  type="button"
                                  onClick={() =>
                                    updatePet(
                                      activePet.id,
                                      "sterilized",
                                      val as any,
                                    )
                                  }
                                  className={`flex-1 py-3 px-4 rounded-xl border font-medium text-sm transition-all ${activePet.sterilized === val ? "bg-brand-teal/10 border-brand-teal text-brand-teal-dark font-semibold" : "bg-card border-border text-muted-foreground hover:border-brand-teal/50"}`}
                                >
                                  {lang === "TR"
                                    ? val
                                      ? "Evet"
                                      : "Hayır"
                                    : val
                                      ? "Yes"
                                      : "No"}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="block text-sm font-semibold text-foreground">
                              {lang === "TR"
                                ? "Irkı (İsteğe bağlı)"
                                : "Breed (Optional)"}
                            </label>
                            <input
                              type="text"
                              value={activePet.breed}
                              onChange={(e) =>
                                updatePet(activePet.id, "breed", e.target.value)
                              }
                              placeholder={
                                activePet.type === "Dog"
                                  ? lang === "TR"
                                    ? "Örn: Golden Retriever"
                                    : "e.g. Golden Retriever"
                                  : lang === "TR"
                                    ? "Örn: Tekir"
                                    : "e.g. Siamese"
                              }
                              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-sm font-semibold text-foreground">
                              {lang === "TR" ? "Kilosu (kg)" : "Weight (kg)"}
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={activePet.weight}
                              onChange={(e) =>
                                updatePet(
                                  activePet.id,
                                  "weight",
                                  e.target.value,
                                )
                              }
                              placeholder="0.0"
                              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-sm font-semibold text-foreground">
                              {lang === "TR" ? "Doğum Tarihi" : "Birthday"}
                            </label>
                            <input
                              type="date"
                              value={activePet.birthday}
                              onChange={(e) =>
                                updatePet(
                                  activePet.id,
                                  "birthday",
                                  e.target.value,
                                )
                              }
                              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-semibold text-foreground">
                            {lang === "TR"
                              ? "Aktivite Seviyesi"
                              : "Activity Level"}
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {["low", "normal", "high"].map((level) => (
                              <button
                                key={level}
                                type="button"
                                onClick={() =>
                                  updatePet(
                                    activePet.id,
                                    "activityLevel",
                                    level as any,
                                  )
                                }
                                className={`py-2 px-3 rounded-xl border font-medium text-xs sm:text-sm transition-all ${activePet.activityLevel === level ? "bg-brand-teal/10 border-brand-teal text-brand-teal-dark font-semibold" : "bg-card border-border text-muted-foreground hover:border-brand-teal/50"}`}
                              >
                                {lang === "TR"
                                  ? level === "low"
                                    ? "Düşük"
                                    : level === "normal"
                                      ? "Orta"
                                      : "Yüksek"
                                  : level === "low"
                                    ? "Low"
                                    : level === "normal"
                                      ? "Normal"
                                      : "High"}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-semibold text-foreground">
                            {lang === "TR"
                              ? "Alerjiler ve Hassasiyetler"
                              : "Allergies & Sensitivities"}
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Chicken",
                              "Grain",
                              "Beef",
                              "Dairy",
                              "Fish",
                              "Dust",
                            ].map((allergy) => {
                              const tx =
                                lang === "TR"
                                  ? allergy === "Chicken"
                                    ? "Tavuk"
                                    : allergy === "Grain"
                                      ? "Tahıl"
                                      : allergy === "Beef"
                                        ? "Sığır"
                                        : allergy === "Dairy"
                                          ? "Süt/Süt Ürünleri"
                                          : allergy === "Fish"
                                            ? "Balık"
                                            : "Toz"
                                  : allergy;
                              const hasAllergy =
                                activePet.allergies.includes(allergy);
                              return (
                                <button
                                  key={allergy}
                                  type="button"
                                  onClick={() => {
                                    const newArr = hasAllergy
                                      ? activePet.allergies.filter(
                                          (a) => a !== allergy,
                                        )
                                      : [...activePet.allergies, allergy];
                                    updatePet(
                                      activePet.id,
                                      "allergies",
                                      newArr as any,
                                    );
                                  }}
                                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${hasAllergy ? "bg-red-500/10 border-red-500/30 text-red-600" : "bg-secondary border-border hover:bg-secondary-dark"}`}
                                >
                                  {tx}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-semibold text-foreground">
                            {lang === "TR"
                              ? "Özel Diyet İhtiyaçları"
                              : "Specific Dietary Needs"}
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Weight Control",
                              "Sensitive Digestion",
                              "Hypoallergenic",
                              "Renal Support",
                              "Skin & Coat",
                            ].map((diet) => {
                              const tx =
                                lang === "TR"
                                  ? diet === "Weight Control"
                                    ? "Kilo Kontrolü"
                                    : diet === "Sensitive Digestion"
                                      ? "Hassas Sindirim"
                                      : diet === "Hypoallergenic"
                                        ? "Hipoalerjenik"
                                        : diet === "Renal Support"
                                          ? "Böbrek Destekleyici"
                                          : "Deri ve Tüy Sağlığı"
                                  : diet;
                              const hasDiet =
                                activePet.dietaryPreferences.includes(diet);
                              return (
                                <button
                                  key={diet}
                                  type="button"
                                  onClick={() => {
                                    const newArr = hasDiet
                                      ? activePet.dietaryPreferences.filter(
                                          (a) => a !== diet,
                                        )
                                      : [...activePet.dietaryPreferences, diet];
                                    updatePet(
                                      activePet.id,
                                      "dietaryPreferences",
                                      newArr as any,
                                    );
                                  }}
                                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${hasDiet ? "bg-brand-teal/10 border-brand-teal/30 text-brand-teal" : "bg-secondary border-border hover:bg-secondary-dark"}`}
                                >
                                  {tx}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {activePet && viewMode === "health" && (
                      <motion.div
                        key={activePet.id + "_health"}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        {/* Weight Progress */}
                        <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                              <h4 className="font-bold text-lg">
                                {lang === "TR"
                                  ? "Kilo Takibi"
                                  : "Weight Tracking"}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {lang === "TR"
                                  ? "Evcil hayvanınızın gelişimini izleyin"
                                  : "Monitor your pet’s growth"}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="date"
                                value={newWeightDate}
                                onChange={(e) =>
                                  setNewWeightDate(e.target.value)
                                }
                                className="px-3 py-2 rounded-xl text-sm border border-border outline-none bg-secondary"
                              />
                              <input
                                type="number"
                                step="0.1"
                                value={newWeightValue}
                                onChange={(e) =>
                                  setNewWeightValue(e.target.value)
                                }
                                placeholder="0.0 kg"
                                className="w-20 px-3 py-2 rounded-xl text-sm border border-border outline-none bg-secondary"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newWeightValue && newWeightDate) {
                                    const updatedHistory = [
                                      ...(activePet.weightHistory || []),
                                      {
                                        date: newWeightDate,
                                        weight: parseFloat(newWeightValue),
                                      },
                                    ].sort(
                                      (a, b) =>
                                        new Date(a.date).getTime() -
                                        new Date(b.date).getTime(),
                                    );
                                    updatePet(
                                      activePet.id,
                                      "weightHistory",
                                      updatedHistory as any,
                                    );
                                    updatePet(
                                      activePet.id,
                                      "weight",
                                      newWeightValue,
                                    );
                                    setNewWeightValue("");
                                    setNewWeightDate("");
                                  }
                                }}
                                className="bg-brand-teal text-white p-2 rounded-xl active:scale-95 transition-all"
                              >
                                <Plus className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          {activePet.weightHistory &&
                          activePet.weightHistory.length > 0 ? (
                            <div className="h-48 w-full mr-2 mb-4">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={activePet.weightHistory}>
                                  <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#888"
                                    opacity={0.2}
                                  />
                                  <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12 }}
                                    tickMargin={10}
                                    stroke="#888"
                                  />
                                  <YAxis
                                    domain={["auto", "auto"]}
                                    tick={{ fontSize: 12 }}
                                    tickMargin={10}
                                    stroke="#888"
                                    width={30}
                                  />
                                  <RechartsTooltip
                                    contentStyle={{
                                      borderRadius: "12px",
                                      border: "1px solid #e2e8f0",
                                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                    }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="weight"
                                    stroke="#2DD4BF"
                                    strokeWidth={3}
                                    dot={{
                                      r: 4,
                                      fill: "#2DD4BF",
                                      strokeWidth: 2,
                                    }}
                                    activeDot={{ r: 6 }}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          ) : (
                            <div className="h-32 flex items-center justify-center border-2 border-dashed border-border rounded-xl mb-4">
                              <p className="text-muted-foreground text-sm">
                                {lang === "TR"
                                  ? "Henüz kilo verisi eklenmedi"
                                  : "No weight data added yet"}
                              </p>
                            </div>
                          )}

                          {/* Smart AI recommendation based on weight */}
                          {activePet.weightHistory?.length > 1 &&
                            (() => {
                              const lastW = parseFloat(
                                activePet.weightHistory[
                                  activePet.weightHistory.length - 1
                                ].weight as any,
                              );
                              const prevW = parseFloat(
                                activePet.weightHistory[
                                  activePet.weightHistory.length - 2
                                ].weight as any,
                              );
                              const isPuppyKitten =
                                parseFloat(activePet.age) < 1;

                              if (!isPuppyKitten && lastW > prevW * 1.05) {
                                return (
                                  <div className="mt-4 p-4 rounded-xl bg-[#E27D60]/10 border border-[#E27D60]/30 flex flex-col gap-2">
                                    <div className="flex gap-3 items-start">
                                      <ShieldCheck className="w-5 h-5 text-[#E27D60] mt-0.5 shrink-0" />
                                      <p className="text-sm font-medium text-[#E27D60]">
                                        {lang === "TR"
                                          ? `Akıllı Analiz: Son ölçümlerde hızlı bir kilo artışı (+${((lastW / prevW - 1) * 100).toFixed(1)}%) tespit ettik. Sağlıklı bir diyet için Kilo Kontrol (Light) formüllere geçişi düşünebilirsiniz.`
                                          : `Smart Analysis: We detected rapid weight gain (+${((lastW / prevW - 1) * 100).toFixed(1)}%). Consider transitioning to "Weight Control" formulas for optimal health.`}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        window.location.hash = "catalog";
                                        onClose();
                                      }}
                                      className="self-end text-xs font-bold text-[#E27D60] hover:underline px-2"
                                    >
                                      {lang === "TR"
                                        ? "Light Ürünleri İncele"
                                        : "Browse Light Products"}
                                    </button>
                                  </div>
                                );
                              } else if (
                                !isPuppyKitten &&
                                lastW < prevW * 0.95
                              ) {
                                return (
                                  <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex flex-col gap-2">
                                    <div className="flex gap-3 items-start">
                                      <ShieldCheck className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                                      <p className="text-sm font-medium text-blue-600">
                                        {lang === "TR"
                                          ? `Akıllı Analiz: Kilo kaybı (-${((1 - lastW / prevW) * 100).toFixed(1)}%) tespit edildi. Yüksek proteinli gıdalar veya uzman bir veteriner desteği gerekebilir.`
                                          : `Smart Analysis: Weight loss detected (-${((1 - lastW / prevW) * 100).toFixed(1)}%). High-protein diets or veterinary support may be needed.`}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        window.location.hash = "catalog";
                                        onClose();
                                      }}
                                      className="self-end text-xs font-bold text-blue-600 hover:underline px-2"
                                    >
                                      {lang === "TR"
                                        ? "Performans Ürünlerini İncele"
                                        : "Browse Performance Products"}
                                    </button>
                                  </div>
                                );
                              }
                              return null;
                            })()}
                        </div>

                        {/* Reminders / Consumption */}
                        <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                          <h4 className="font-bold text-lg mb-1">
                            {lang === "TR"
                              ? "Tüketim Tahmini & Hatırlatıcılar"
                              : "Consumption & Reminders"}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-6">
                            {lang === "TR"
                              ? "Mama süresi hesaplamaları ve sağlık döngüleri"
                              : "Food duration estimates and health cycles"}
                          </p>

                          <div className="space-y-4 mb-6">
                            {activePet.reminders &&
                            activePet.reminders.length > 0 ? (
                              activePet.reminders.map((rem: any) => (
                                <div
                                  key={rem.id}
                                  className={`flex flex-col p-4 rounded-xl border transition-all ${rem.resolved ? "bg-secondary/50 border-border opacity-60" : "bg-background border-brand-teal/30 shadow-sm"} mb-3`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newR = activePet.reminders.map(
                                            (r: any) =>
                                              r.id === rem.id
                                                ? {
                                                    ...r,
                                                    resolved: !r.resolved,
                                                  }
                                                : r,
                                          );
                                          updatePet(
                                            activePet.id,
                                            "reminders",
                                            newR as any,
                                          );
                                        }}
                                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${rem.resolved ? "bg-brand-teal border-brand-teal text-white" : "border-muted-foreground"}`}
                                      >
                                        {rem.resolved && (
                                          <Check className="w-3 h-3" />
                                        )}
                                      </button>
                                      <div>
                                        <p
                                          className={`font-semibold text-sm ${rem.resolved ? "line-through text-muted-foreground" : "text-foreground"}`}
                                        >
                                          {rem.type === "Food"
                                            ? lang === "TR"
                                              ? "Mama Bitiş Tahmini"
                                              : "Food Depletion Estimate"
                                            : rem.type}
                                          {rem.name && (
                                            <span className="opacity-70 ml-1">
                                              ({rem.name})
                                            </span>
                                          )}
                                        </p>
                                        <p
                                          className={`text-xs ${rem.resolved ? "text-muted-foreground" : "text-brand-teal font-medium"}`}
                                        >
                                          {new Date(
                                            rem.dueDate,
                                          ).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    {!rem.resolved && rem.type === "Food" && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const matchedProduct = GLOBAL_PRODUCTS_DATABASE.find(p => p.name.EN === rem.name || p.name.TR === rem.name);
                                          if (matchedProduct) {
                                            window.location.hash = `#/product/${matchedProduct.id}`;
                                          } else {
                                            window.location.hash = "catalog";
                                          }
                                          onClose();
                                        }}
                                        className="text-xs font-bold bg-brand-teal/10 text-brand-teal hover:bg-brand-teal hover:text-white transition-colors px-3 py-1.5 rounded-lg"
                                      >
                                        {lang === "TR"
                                          ? "Sipariş Ver"
                                          : "Reorder"}
                                      </button>
                                    )}
                                  </div>
                                  {!rem.resolved &&
                                    (rem.type === "Parasite" ||
                                      rem.type === "Grooming" ||
                                      rem.type
                                        .toLowerCase()
                                        .includes("care")) && (
                                      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground font-medium">
                                          {lang === "TR"
                                            ? "Önerilen Ürünler:"
                                            : "Recommended Products:"}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            window.location.hash = "catalog";
                                            onClose();
                                          }}
                                          className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1"
                                        >
                                          {lang === "TR"
                                            ? "Kataloğa Git"
                                            : "Browse Catalog"}{" "}
                                          <ArrowRight className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground text-center py-4 border border-dashed border-border rounded-xl">
                                {lang === "TR"
                                  ? "Aktif hatırlatıcı yok"
                                  : "No active reminders"}
                              </p>
                            )}
                          </div>

                          <div className="flex gap-2 p-3 bg-secondary rounded-xl border border-border items-center">
                            <select
                              value={newReminder.type}
                              onChange={(e) =>
                                setNewReminder({
                                  ...newReminder,
                                  type: e.target.value,
                                })
                              }
                              className="bg-transparent text-sm font-medium outline-none"
                            >
                              <option value="Vaccine">
                                {lang === "TR"
                                  ? "Aşı/Parazit"
                                  : "Vaccine/Parasite"}
                              </option>
                              <option value="Grooming">
                                {lang === "TR" ? "Kuaför" : "Grooming"}
                              </option>
                              <option value="Food">
                                {lang === "TR" ? "Mama Alımı" : "Food Purchase"}
                              </option>
                              <option value="Custom">
                                {lang === "TR" ? "Özel" : "Custom"}
                              </option>
                            </select>
                            <input
                              type="text"
                              value={newReminder.name}
                              onChange={(e) =>
                                setNewReminder({
                                  ...newReminder,
                                  name: e.target.value,
                                })
                              }
                              placeholder={lang === "TR" ? "Açıklama" : "Note"}
                              className="flex-1 bg-transparent px-2 text-sm outline-none border-l border-border pl-2 border-r"
                            />
                            <input
                              type="date"
                              value={newReminder.date}
                              onChange={(e) =>
                                setNewReminder({
                                  ...newReminder,
                                  date: e.target.value,
                                })
                              }
                              className="bg-transparent text-sm font-medium outline-none px-2"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newReminder.date) {
                                  const rId = Date.now().toString();
                                  const nr = [
                                    ...(activePet.reminders || []),
                                    {
                                      id: rId,
                                      type: newReminder.type,
                                      name: newReminder.name,
                                      dueDate: newReminder.date,
                                      resolved: false,
                                    },
                                  ];
                                  updatePet(
                                    activePet.id,
                                    "reminders",
                                    nr as any,
                                  );
                                  setNewReminder({
                                    type: "Vaccine",
                                    date: "",
                                    name: "",
                                  });
                                }
                              }}
                              className="bg-foreground text-background p-1.5 rounded-lg active:scale-95"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </>
              ) : (
                <div className="text-center py-12 mt-4 flex flex-col items-center justify-center h-full">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {lang === "TR" ? `Profil güncellendi!` : `Profile updated!`}
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    {lang === "TR"
                      ? "Mağaza deneyiminiz yenileniyor..."
                      : "Personalizing your store experience..."}
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
                  {lang === "TR"
                    ? "Tüm Profilleri Kaydet"
                    : "Save All Profiles"}
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
function OnboardingModal({
  isOpen,
  onClose,
  selectedPets,
  onSelectionChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedPets: string[];
  onSelectionChange: (pets: string[]) => void;
}) {
  const { lang, setLang } = useLang();

  const togglePet = (pet: string) => {
    if (selectedPets.includes(pet)) {
      onSelectionChange(selectedPets.filter((p) => p !== pet));
    } else {
      onSelectionChange([...selectedPets, pet]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darker/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-card rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-title"
          >
            <div className="absolute top-6 left-6 flex bg-secondary/80 rounded-full p-1 z-10">
              <button
                onClick={() => setLang("TR")}
                aria-pressed={lang === "TR"}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === "TR" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-muted-foreground"}`}
              >
                <span>🇹🇷</span> TR
              </button>
              <button
                onClick={() => setLang("EN")}
                aria-pressed={lang === "EN"}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full transition-all ${lang === "EN" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-muted-foreground"}`}
              >
                <span>🇬🇧</span> EN
              </button>
            </div>

            <button
              aria-label="Close filter modal"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary hover:rotate-90 active:scale-90 transition-all duration-300 z-10"
            >
              <X className="w-6 h-6 text-muted-foreground" />
            </button>

            <div className="text-center">
              <div className="flex justify-center mx-auto mb-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 flex items-center justify-center mt-8 mb-2">
                  <SlidersHorizontal className="w-8 h-8 text-brand-teal" />
                </div>
              </div>
              <h2
                id="filter-title"
                className="text-2xl sm:text-3xl font-bold text-foreground mb-2"
              >
                {lang === "TR" ? "Kategorileri Filtrele" : "Filter Categories"}
              </h2>
              <p className="text-muted-foreground text-base mb-8">
                {lang === "TR"
                  ? "Alışveriş deneyiminizi evcil hayvanlarınıza göre özelleştirin."
                  : "Tailor your shopping experience to your pets."}
              </p>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
                {["Dog", "Cat", "Avian", "Fish", "Rodent", "Reptile"].map(
                  (pet) => (
                    <button
                      key={pet}
                      onClick={() => togglePet(pet)}
                      aria-pressed={selectedPets.includes(pet)}
                      aria-label={`Select ${t(pet, lang)}`}
                      className={`w-[46%] sm:w-[30%] p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center gap-2 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] active:scale-[0.98] active:translate-y-0 active:shadow-sm
                    ${selectedPets.includes(pet) ? "border-brand-teal bg-brand-teal/5 text-brand-teal-dark shadow-[0_0_20px_rgba(45,212,191,0.25)] ring-1 ring-brand-teal/30 scale-[1.02]" : "border-border hover:border-brand-teal/30 hover:bg-secondary/50 text-muted-foreground"}
                  `}
                    >
                      <span className="text-3xl sm:text-4xl" aria-hidden="true">
                        {pet === "Dog"
                          ? "🐕"
                          : pet === "Cat"
                            ? "🐈"
                            : pet === "Avian"
                              ? "🦜"
                              : pet === "Fish"
                                ? "🫧"
                                : pet === "Rodent"
                                  ? "🐹"
                                  : pet === "Reptile"
                                    ? "🦎"
                                    : "🕷️"}
                      </span>
                      <span className="font-semibold text-xs sm:text-sm text-center leading-tight break-words w-[90px]">
                        {t(pet, lang)}
                      </span>
                    </button>
                  ),
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onSelectionChange([])}
                  className="w-1/3 bg-secondary text-foreground rounded-full py-4 font-semibold text-lg hover:bg-secondary-dark transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
                >
                  {lang === "TR" ? "Sıfırla" : "Reset"}
                </button>
                <button
                  onClick={onClose}
                  className="w-2/3 bg-primary text-white rounded-full py-4 font-semibold text-lg transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-brand-dark hover:shadow-[0_8px_24px_rgba(45,212,191,0.3)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] active:shadow-md flex items-center justify-center gap-2"
                >
                  {lang === "TR" ? "Filtreleri Uygula" : "Apply Filters"}
                </button>
              </div>
            </div>
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
  onCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}) {
  const { lang } = useLang();

  if (!isOpen) return null;

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  let discountRate = 0;
  if (totalPrice >= 5000) discountRate = 30;
  else if (totalPrice >= 2500) discountRate = 20;
  else if (totalPrice >= 1500) discountRate = 15;
  
  const discountAmount = (totalPrice * discountRate) / 100;
  const finalPrice = Math.max(0, totalPrice - discountAmount);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex justify-end bg-brand-darker/40 backdrop-blur-sm"
      >
        <div
          className="absolute inset-0"
          onClick={onClose}
          aria-label="Close modal overlay"
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="bg-card w-full max-w-md h-full shadow-2xl flex flex-col relative z-10"
        >
          <div className="p-6 border-b border-border flex justify-between items-center bg-card">
            <h2
              id="cart-title"
              className="text-2xl font-bold text-foreground flex items-center gap-3"
            >
              {t("For Your Companion", lang)}{" "}
              <span className="bg-brand-teal px-3 py-1 rounded-full text-white text-sm">
                {totalCount}
              </span>
            </h2>
            <button
              aria-label="Close cart"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary active:scale-95 transition-all duration-300"
            >
              <X className="w-6 h-6 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-card">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center">
                <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">
                  {lang === "TR"
                    ? "Dostunuzun sepeti boş."
                    : "Your companion's basket is empty."}
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 text-brand-teal text-lg font-medium hover:underline p-2"
                >
                  {t("Continue shopping", lang)}
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-secondary p-4 rounded-2xl border border-border gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <a
                        href={`#/product/${GLOBAL_PRODUCTS_DATABASE.find(p => p.name.EN === item.name || p.name.TR === item.name)?.id || ''}`}
                        onClick={onClose}
                        className="font-medium text-foreground text-sm sm:text-base block truncate hover:text-brand-teal transition-colors"
                        title={item.name}
                      >
                        {item.name}
                      </a>
                      <span className="text-sm font-semibold text-brand-teal">
                        ₺{item.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 rounded bg-card text-muted-foreground hover:text-foreground border border-border flex items-center justify-center w-7 h-7 font-bold text-lg active:scale-95 transition-all"
                      >
                        -
                      </button>
                      <span className="font-semibold text-sm w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 rounded bg-card text-muted-foreground hover:text-foreground border border-border flex items-center justify-center w-7 h-7 font-bold text-lg active:scale-95 transition-all"
                      >
                        +
                      </button>
                    </div>
                    <button
                      aria-label={`Remove from cart`}
                      onClick={() => onRemoveItem(item.id)}
                      className="text-muted-foreground hover:text-red-500 transition-all duration-300 p-2 rounded-full hover:bg-destructive/10 hover:rotate-12 active:scale-90 flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-border bg-card">
              <div className="space-y-2 mb-4 text-base">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {lang === "TR" ? "Ara Toplam" : "Subtotal"}
                  </span>
                  <span className="text-foreground">
                    ₺{totalPrice.toFixed(2)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-sm text-brand-teal font-medium">
                    <span>
                      {lang === "TR" ? `İndirim (%${discountRate})` : `Discount (${discountRate}%)`}
                    </span>
                    <span>-₺{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
                  <span className="text-muted-foreground font-medium">
                    {lang === "TR" ? "Ödenecek Tutar" : "Total"}
                  </span>
                  <span className="font-bold text-foreground text-2xl">
                    ₺{finalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                aria-label={
                  lang === "TR" ? "Güvenli Ödeme Yap" : "Secure Checkout"
                }
                className="w-full bg-primary text-white rounded-full py-4 text-lg font-semibold hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-3 shadow-lg mb-3"
              >
                <Lock className="w-5 h-5" />{" "}
                {lang === "TR" ? "Güvenli Ödeme Yap" : "Secure Checkout"}
              </button>
              <button
                onClick={onClearCart}
                className="w-full text-muted-foreground hover:text-red-500 hover:bg-red-50/50 py-3 rounded-xl transition-all font-medium text-sm text-center"
              >
                {lang === "TR" ? "Sepeti Temizle" : "Clear Cart"}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CheckoutSuccessModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { lang } = useLang();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-darker/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
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

          <h2 className="text-2xl font-bold text-foreground mb-2 relative z-10">
            {lang === "TR" ? "Sipariş Alındı!" : "Order Received!"}
          </h2>
          <p className="text-muted-foreground text-sm mb-8 relative z-10">
            {lang === "TR"
              ? "Tebrikler! Siparişiniz başarıyla oluşturuldu. Dostunuz buna bayılacak! Kargo detayları e-posta adresinize gönderildi."
              : "Great job! Your order has been placed successfully. Your companion will love this! Shipping details have been sent to your email."}
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
  onChangeMode,
}: {
  mode: "login" | "register" | "forgot-password" | "reset-password" | null;
  onClose: () => void;
  onLogin: (remember: boolean, email: string) => void;
  onChangeMode?: (
    mode: "login" | "register" | "forgot-password" | "reset-password" | null,
  ) => void;
}) {
  const { lang } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [remember, setRemember] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetTokenError, setResetTokenError] = useState("");

  // Internal switch state if they want to swap mode within modal
  const [currentMode, setCurrentMode] = useState<
    "login" | "register" | "forgot-password" | "reset-password"
  >("login");

  useEffect(() => {
    if (mode) {
      setCurrentMode(mode);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhone("");
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-brand-darker/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative my-auto"
        >
          <button
            aria-label="Close auth modal"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary hover:rotate-90 active:scale-90 transition-all duration-300 z-10"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>

          {success && currentMode === "register" ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t("Account created successfully!", lang)}
              </h2>
              <p className="text-muted-foreground mb-6">
                {lang === "TR"
                  ? "Artık giriş yapabilirsiniz."
                  : "You can now log in."}
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setCurrentMode("login");
                }}
                className="w-full bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white font-bold transition-all duration-300 py-3.5 rounded-xl transition-all duration-300"
              >
                {t("Login", lang)}
              </button>
            </div>
          ) : success && currentMode === "forgot-password" ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {lang === "TR" ? "E-posta Gönderildi!" : "Email Sent!"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {lang === "TR"
                  ? "Şifre sıfırlama bağlantısını e-posta adresinize gönderdik. Lütfen gelen kutunuzu kontrol edin."
                  : "We've sent a password reset link to your email. Please check your inbox."}
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setCurrentMode("reset-password");
                }}
                className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold py-3.5 rounded-xl transition-all mb-4"
              >
                {lang === "TR"
                  ? "Simüle Et: Bağlantıya Tıklandı"
                  : "Simulate: Link Clicked"}
              </button>
              <button
                onClick={() => {
                  setSuccess(false);
                  setCurrentMode("login");
                }}
                className="w-full text-muted-foreground font-semibold hover:text-brand-teal transition-all"
              >
                {lang === "TR" ? "Giriş Ekranına Dön" : "Back to Login"}
              </button>
            </div>
          ) : success && currentMode === "reset-password" ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {lang === "TR" ? "Şifre Güncellendi" : "Password Updated"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {lang === "TR"
                  ? "Yeni şifrenizle giriş yapabilirsiniz."
                  : "You can now log in with your new password."}
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setCurrentMode("login");
                }}
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
                  {currentMode === "login"
                    ? t("Login", lang)
                    : currentMode === "register"
                      ? t("Sign Up", lang)
                      : currentMode === "forgot-password"
                        ? lang === "TR"
                          ? "Şifremi Unuttum"
                          : "Forgot Password"
                        : lang === "TR"
                          ? "Yeni Şifre Belirle"
                          : "Reset Password"}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {currentMode === "login"
                    ? t("Sign in to your account", lang)
                    : currentMode === "register"
                      ? t("Create a new account", lang)
                      : currentMode === "forgot-password"
                        ? lang === "TR"
                          ? "E-posta adresinizi girin, sıfırlama bağlantısı gönderelim"
                          : "Enter your email and we'll send a reset link"
                        : lang === "TR"
                          ? "Lütfen yeni şifrenizi oluşturun"
                          : "Please create your new password"}
                </p>
              </div>

              {(currentMode === "login" || currentMode === "register") && (
                <div className="flex bg-secondary p-1 rounded-xl mb-6">
                  <button
                    onClick={() => setCurrentMode("login")}
                    className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${currentMode === "login" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
                  >
                    {t("Login", lang)}
                  </button>
                  <button
                    onClick={() => setCurrentMode("register")}
                    className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${currentMode === "register" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
                  >
                    {t("Sign Up", lang)}
                  </button>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  setTimeout(() => {
                    setIsSubmitting(false);
                    if (currentMode === "login") {
                      if (email && password) {
                        onLogin(remember, email);
                        onClose();
                      }
                    } else if (currentMode === "register") {
                      if (
                        email &&
                        password &&
                        firstName &&
                        lastName &&
                        agreedPrivacy
                      ) {
                        setSuccess(true);
                        fetch("/api/email", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            to: email,
                            type: "REGISTER",
                            data: { firstName, lastName },
                          }),
                        }).catch(console.error);

                        // Also automatically log in after short delay, but for now wait for user to click
                        localStorage.setItem("vivia_user_email", email);
                      }
                    } else if (currentMode === "forgot-password") {
                      if (email) {
                        fetch("/api/email", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            to: email,
                            type: "PASSWORD_RESET",
                          }),
                        }).catch(console.error);
                        setSuccess(true);
                        setResetTokenError(""); // Clear any previous errors
                      }
                    } else if (currentMode === "reset-password") {
                      if (
                        password &&
                        confirmPassword &&
                        password === confirmPassword
                      ) {
                        setSuccess(true);
                        // In a real app we'd update the db here.
                      } else if (password !== confirmPassword) {
                        setResetTokenError(
                          lang === "TR"
                            ? "Şifreler eşleşmiyor."
                            : "Passwords do not match.",
                        );
                      }
                    }
                  }, 1000); // Simulate network
                }}
                className="space-y-4"
              >
                {currentMode === "register" && (
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        {t("First Name", lang)}
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all duration-300"
                        placeholder={lang === "TR" ? "Ad" : "Name"}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        {t("Last Name", lang)}
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all duration-300"
                        placeholder={lang === "TR" ? "Soyad" : "Surname"}
                      />
                    </div>
                  </div>
                )}

                {currentMode !== "reset-password" && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {t("E-Mail", lang)}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all duration-300"
                      placeholder={lang === "TR" ? "E-Posta" : "E-Mail"}
                    />
                  </div>
                )}

                {currentMode === "register" && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {t("Phone Number", lang)}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all duration-300"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                )}

                {(currentMode === "login" ||
                  currentMode === "register" ||
                  currentMode === "reset-password") && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {currentMode === "reset-password"
                        ? lang === "TR"
                          ? "Yeni Şifre"
                          : "New Password"
                        : t("Password", lang)}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 pr-12 transition-all duration-300"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand-teal transition-all duration-300"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {currentMode === "reset-password" && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {lang === "TR" ? "Şifreyi Onayla" : "Confirm Password"}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 pr-12 transition-all duration-300"
                        placeholder="••••••••"
                      />
                    </div>
                    {resetTokenError && (
                      <p className="text-sm font-semibold text-red-500 mt-2">
                        {resetTokenError}
                      </p>
                    )}
                  </div>
                )}

                {currentMode === "login" && (
                  <div className="flex items-center justify-between pt-2 pb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="w-4 h-4 text-brand-teal focus:ring-brand-teal border-border rounded cursor-pointer"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-muted-foreground cursor-pointer select-none"
                      >
                        {t("Remember Me", lang)}
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentMode("forgot-password")}
                      className="text-sm font-semibold text-brand-teal hover:text-brand-teal-dark transition-all duration-300"
                    >
                      {lang === "TR" ? "Şifremi Unuttum" : "Forgot Password?"}
                    </button>
                  </div>
                )}

                {currentMode === "register" && (
                  <div className="space-y-3 pt-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="agreedPrivacy"
                        required
                        checked={agreedPrivacy}
                        onChange={(e) => setAgreedPrivacy(e.target.checked)}
                        className="mt-1 w-4 h-4 text-brand-teal focus:ring-brand-teal border-border rounded cursor-pointer shrink-0"
                      />
                      <label
                        htmlFor="agreedPrivacy"
                        className="cursor-pointer select-none leading-tight"
                      >
                        {t(
                          "I have read and agree to the KVKK Privacy Policy.",
                          lang,
                        )}
                      </label>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-teal hover:bg-brand-teal-dark hover:shadow-brand-teal/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-white font-bold transition-all duration-300 py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : null}
                  {currentMode === "login"
                    ? t("Login", lang)
                    : currentMode === "register"
                      ? t("Create Account", lang)
                      : currentMode === "forgot-password"
                        ? lang === "TR"
                          ? "Sıfırlama Bağlantısı Gönder"
                          : "Send Reset Link"
                        : lang === "TR"
                          ? "Şifreyi Sıfırla"
                          : "Reset Password"}
                </button>

                {currentMode === "forgot-password" && (
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentMode("login")}
                      className="text-sm font-semibold text-muted-foreground hover:text-brand-teal transition-all duration-300"
                    >
                      {lang === "TR"
                        ? "Giriş ekranına dön"
                        : "Cancel, back to login"}
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

function Tooltip({
  children,
  text,
  position = "top",
}: {
  children: React.ReactNode;
  text: string;
  position?: "top" | "right" | "bottom" | "left";
}) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[6px] border-t-foreground",
    bottom:
      "bottom-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-b-[6px] border-b-foreground",
    left: "left-full top-1/2 -translate-y-1/2 border-y-[5px] border-y-transparent border-l-[6px] border-l-foreground",
    right:
      "right-full top-1/2 -translate-y-1/2 border-y-[5px] border-y-transparent border-r-[6px] border-r-foreground",
  };

  return (
    <div className="relative group/tooltip inline-block">
      {children}
      <div
        className={`absolute ${positionClasses[position]} px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl`}
      >
        {text}
        <div className={`absolute ${arrowClasses[position]}`}></div>
      </div>
    </div>
  );
}
const TR_CITIES = Object.keys(turkeyData).sort((a, b) =>
  a.localeCompare(b, "tr"),
);

const getDistrictsForCity = (city: string) => {
  return (turkeyData as Record<string, string[]>)[city] || [];
};

export const getBasePriceFromName = (name: string) => {
  let englishName = name;

  for (const s of SERVICES) {
    const enTitle = s.title;
    const trTitle = t(s.title, "TR");

    for (const item of s.items) {
      const enItem = item;
      const trItem = t(item, "TR");

      const enStr = `${enTitle} - ${enItem}`;
      const trStr = `${trTitle} - ${trItem}`;

      if (name === enStr || name === trStr) {
        englishName = enStr;
        break;
      }
    }
  }

  // Deterministic mock base price using the English string
  const hash = englishName
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const isDogOrCat =
    englishName.toLowerCase().includes("dog") ||
    englishName.toLowerCase().includes("cat");
  let basePrice = isDogOrCat ? 400 + (hash % 600) : 150 + (hash % 300);
  basePrice += (hash % 99) / 100;
  return Math.round(basePrice * 100) / 100;
};

export const getPriceFromName = (name: string) => {
  const basePrice = getBasePriceFromName(name);
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hasDiscount = hash % 3 === 0;
  return hasDiscount ? Math.round(basePrice * 0.85 * 100) / 100 : basePrice;
};

export const predictFoodConsumptionDays = (
  itemName: string,
  pet: any,
): number | null => {
  const lowerName = itemName.toLowerCase();
  if (!lowerName.includes("food") && !lowerName.includes("mama")) return null;

  // Try to parse weight from the name (e.g. "Adult Dog Food 10 kg")
  let kgWeight = 1; // default to 1kg if unknown
  const match = lowerName.match(/(\d+(?:\.\d+)?)\s*(kg|g|lb)/);
  if (match) {
    const val = parseFloat(match[1]);
    if (match[2] === "kg") kgWeight = val;
    else if (match[2] === "g") kgWeight = val / 1000;
    else if (match[2] === "lb") kgWeight = val * 0.453592;
  }

  // Very rough daily consumption estimates in kg Based on pet weight & type
  let dailyConsumption = 0.1; // Default
  const petWeight = parseFloat(pet.weight) || 10;
  if (pet.type === "Dog") {
    if (petWeight < 5) dailyConsumption = 0.08;
    else if (petWeight < 15) dailyConsumption = 0.15;
    else if (petWeight < 30) dailyConsumption = 0.3;
    else dailyConsumption = 0.5;
  } else if (pet.type === "Cat") {
    if (petWeight < 3) dailyConsumption = 0.05;
    else dailyConsumption = 0.08;
  } else if (pet.type === "Bird") {
    dailyConsumption = 0.02;
  } else if (pet.type === "Fish") {
    dailyConsumption = 0.005;
  } else {
    dailyConsumption = 0.05;
  }

  // Adjust by activity level / serialization / age
  if (pet.activityLevel === "high") dailyConsumption *= 1.25;
  if (pet.activityLevel === "low") dailyConsumption *= 0.8;
  if (pet.sterilized) dailyConsumption *= 0.9;
  if (parseFloat(pet.age) < 1) dailyConsumption *= 1.5; // growing

  const days = Math.floor(kgWeight / dailyConsumption);
  return days > 0 ? days : 15;
};

export const generatePeriodicCareReminders = (
  pet: any,
): { type: string; days: number; titleEN: string; titleTR: string }[] => {
  const rs: any[] = [];
  if (pet.type === "Dog" || pet.type === "Cat") {
    rs.push({
      type: "Vaccine",
      days: 365,
      titleEN: "Annual Vaccination",
      titleTR: "Yıllık Aşı",
    });
    rs.push({
      type: "Parasite",
      days: 60,
      titleEN: "Flea & Tick Prevention",
      titleTR: "Pire ve Kene Önleme",
    });
    rs.push({
      type: "Parasite",
      days: 90,
      titleEN: "Worming Treatment",
      titleTR: "İç Parazit Tedavisi",
    });
    rs.push({
      type: "Grooming",
      days: 45,
      titleEN: "Grooming / Nail Trim",
      titleTR: "Tüy ve Tırnak Bakımı",
    });
  }
  return rs;
};

import SupportSystem from "./SupportWidget";

function PersistentPetButton({
  pets,
  onClick,
}: {
  pets: any[];
  onClick: (id: string) => void;
}) {
  const { lang } = useLang();
  const [isHovered, setIsHovered] = useState(false);

  const activePets = pets.filter(
    (p) => p.name.trim() !== "" || p.photo !== null,
  );
  if (activePets.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "Dog":
        return Dog;
      case "Cat":
        return Cat;
      case "Avian":
        return Bird;
      case "Rodent":
        return Rat;
      case "Fish":
        return Fish;
      case "Reptile":
        return Turtle;
      default:
        return Heart;
    }
  };

  const getPetLabel = (pet: any) => {
    if (pet.name.trim() !== "") return pet.name;
    const petsOfSameType = activePets.filter((p) => p.type === pet.type);
    const translatedType = t(pet.type, lang);
    if (petsOfSameType.length > 1) {
      const typeIndex = petsOfSameType.findIndex((p) => p.id === pet.id) + 1;
      return `${translatedType} • ${typeIndex}`;
    }
    return translatedType;
  };

  const maxVisible = 3;
  const isExpandable = activePets.length > maxVisible;
  const visiblePets = isHovered ? activePets : activePets.slice(0, maxVisible);
  const hiddenCount = activePets.length - maxVisible;

  return (
    <div
      className="flex flex-col items-center gap-2 pl-4 sm:pl-5 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        <div className="flex flex-col items-center gap-2 bg-card/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border/60 p-2 rounded-full max-h-[50vh] overflow-y-auto overflow-x-hidden transition-all duration-500 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {!isHovered && isExpandable && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onClick(activePets[0]?.id || "")}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-teal/10 border border-brand-teal/20 flex flex-col items-center justify-center rounded-full hover:bg-brand-teal/20 active:scale-95 transition-all text-brand-teal shrink-0 group select-none relative"
            >
              <span className="text-xs font-extrabold">+{hiddenCount}</span>
            </motion.button>
          )}

          {visiblePets.map((pet, index) => {
            const Icon = getIcon(pet.type);
            const petLabel = getPetLabel(pet);
            return (
              <motion.button
                key={pet.id}
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onClick(pet.id)}
                title={`Manage ${petLabel}`}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-background border border-border flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-all shrink-0 group hover:shadow-brand-teal/30 hover:border-brand-teal select-none relative overflow-hidden"
                aria-label={`Manage ${petLabel}`}
              >
                {pet.photo ? (
                  <img
                    src={pet.photo}
                    alt={petLabel}
                    className="w-full h-full object-cover transition-all group-hover:scale-110"
                  />
                ) : (
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-brand-teal transition-colors" />
                )}
                {/* Fallback tooltip for touch devices */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] font-bold tracking-tight text-center px-1">
                  {petLabel}
                </div>
              </motion.button>
            );
          })}
        </div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isPetProfileOpen, setIsPetProfileOpen] = useState(false);
  const [userPets, setUserPets] = useState<PetProfileData[]>([
    {
      id: "1",
      type: "Dog",
      name: "",
      age: "",
      breed: "",
      gender: "",
      healthInfo: "",
      photo: null,
      weight: "",
      allergies: [],
      dietaryPreferences: [],
      sterilized: false,
      activityLevel: "normal",
      birthday: "",
      weightHistory: [],
      reminders: generatePeriodicCareReminders({ type: "Dog" }).map((r) => {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + r.days);
        return {
          id: Date.now().toString() + Math.random(),
          type: r.type,
          name: r.titleEN,
          dueDate: dueDate.toISOString().split("T")[0],
          resolved: false,
        };
      }),
    },
  ]);
  const [isFoldersModalOpen, setIsFoldersModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedPetsFilter, setSelectedPetsFilter] = useState<
    string[] | undefined
  >(undefined);
  const [tryOnProduct, setTryOnProduct] = useState<any | null>(null);
  const [authMode, setAuthMode] = useState<
    "login" | "register" | "forgot-password" | "reset-password" | null
  >(null);
  const [currentHash, setCurrentHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : "",
  );
  const [focusedPetId, setFocusedPetId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0, 0); // Scroll to top when changing route
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vivia_cart");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return [];
  });
  const [folders, setFolders] = useState<SavedFolder[]>([]);
  const [selectedProductForFolder, setSelectedProductForFolder] = useState<
    string | null
  >(null);

  const savedProductNames = useMemo(
    () => folders.flatMap((f) => f.items),
    [folders],
  );
  const [lang, setLang] = useState<Lang>("TR");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cartTotalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    // Check if user chose to be remembered
    const rememberedLogin = localStorage.getItem("vivia_logged_in");
    const email = localStorage.getItem("vivia_user_email");
    if (rememberedLogin === "true") {
      setIsLoggedIn(true);
      if (email) setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vivia_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogin = (remember: boolean, email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("vivia_user_email", email);
    if (remember) {
      localStorage.setItem("vivia_logged_in", "true");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    localStorage.removeItem("vivia_logged_in");
    localStorage.removeItem("vivia_user_email");
  };

  // Start onboarding automatically after a short delay for new user feel
  useEffect(() => {
    const timer = setTimeout(() => setIsOnboardingOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const [pendingCartItem, setPendingCartItem] = useState<{
    name: string;
    quantity: number;
    price: number;
    warnings: { petName: string; allergy: string }[];
  } | null>(null);

  const handleAddToCart = (
    itemName: string,
    quantity = 1,
    price?: number,
    skipWarning = false,
  ) => {
    const finalPrice = price !== undefined ? price : getPriceFromName(itemName);

    if (!skipWarning) {
      const lowerName = itemName.toLowerCase();
      const warnings: { petName: string; allergy: string }[] = [];
      const activePets = userPets.filter(
        (p) => p.name.trim() !== "" || p.photo !== null,
      );

      activePets.forEach((pet) => {
        pet.allergies.forEach((allergy) => {
          const allergyTR =
            allergy === "Chicken"
              ? "tavuk"
              : allergy === "Grain"
                ? "tahıl"
                : allergy === "Beef"
                  ? "sığır"
                  : allergy === "Dairy"
                    ? "süt"
                    : allergy === "Fish"
                      ? "balık"
                      : "toz";
          if (
            lowerName.includes(allergy.toLowerCase()) ||
            lowerName.includes(allergyTR)
          ) {
            warnings.push({ petName: pet.name || pet.type, allergy });
          }
        });
      });

      if (warnings.length > 0) {
        setPendingCartItem({
          name: itemName,
          quantity,
          price: finalPrice,
          warnings,
        });
        return;
      }
    }

    setCartItems((prev) => {
      const existing = prev.find((p) => p.name === itemName);
      if (existing) {
        return prev.map((p) =>
          p.name === itemName ? { ...p, quantity: p.quantity + quantity } : p,
        );
      } else {
        return [
          ...prev,
          {
            id: Date.now().toString() + Math.random().toString(),
            name: itemName,
            price: finalPrice,
            quantity,
          },
        ];
      }
    });

    // Show toast
    setToastMessage(
      `${itemName} ` + (lang === "TR" ? "sepete eklendi." : "added to cart."),
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleSaveToFolderClick = (productName: string) => {
    if (folders.length === 0) {
      setToastMessage(
        lang === "TR"
          ? "Bu özellik için önce bir klasör oluşturmalısınız."
          : "You must create a folder first.",
      );
      setTimeout(() => setToastMessage(null), 3000);
      setIsFoldersModalOpen(true);
    } else {
      setSelectedProductForFolder(productName);
    }
  };

  const handleSaveToSpecificFolder = (folderId: string) => {
    if (!selectedProductForFolder) return;
    setFolders(
      folders.map((f) =>
        f.id === folderId
          ? { ...f, items: [...f.items, selectedProductForFolder] }
          : f,
      ),
    );
    setToastMessage(
      lang === "TR" ? "Ürün klasöre eklendi!" : "Product added to folder!",
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    window.location.hash = "checkout";
  };

  const handleProcessPayment = () => {
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);

    // Process predictive consumption tracking based on cart
    let petsUpdated = false;
    const nextUserPets = [...userPets];

    cartItems.forEach((item) => {
      const activePets = nextUserPets.filter(
        (p) => p.name && (p.name.trim() !== "" || p.photo !== null),
      );
      if (activePets.length === 0) return;

      const pet =
        activePets.length === 1
          ? activePets[0]
          : activePets.find((p) =>
              item.name.toLowerCase().includes(p.type.toLowerCase()),
            ) || activePets[0];

      const days = predictFoodConsumptionDays(item.name, pet);
      if (days !== null) {
        petsUpdated = true;
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + Math.max(1, days - 5)); // remind 5 days early

        pet.reminders = pet.reminders.filter(
          (r: any) => !(r.type === "Food" && !r.resolved),
        );
        pet.reminders.push({
          id: Date.now().toString() + Math.random(),
          type: "Food",
          name: item.name,
          dueDate: dueDate.toISOString().split("T")[0],
          resolved: false,
        });
      }
    });

    if (petsUpdated) {
      setUserPets(nextUserPets);
    }

    setCartItems([]);

    // Send email notification for checkout
    const email =
      localStorage.getItem("vivia_user_email") || "customer@example.com";
    fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        type: "CHECKOUT",
      }),
    }).catch(console.error);

    // Simulate a delayed shipping update
    setTimeout(() => {
      fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          type: "SHIPPING",
        }),
      }).catch(console.error);
    }, 10000); // 10 seconds later for demo purposes

    // In a real app, clear cart or process payment
    setCartItems([]);
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
    window.location.hash = "";
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
          userPets={userPets}
          onOpenPetProfile={(id) => {
            setFocusedPetId(id);
            setIsPetProfileOpen(true);
          }}
          selectedPetsFilter={selectedPetsFilter}
          onAddToCart={handleAddToCart}
        />

        {/* Left Side Floating Controls */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-start gap-4 pointer-events-none">
          <div className="pointer-events-auto">
            <Tooltip
              text={
                lang === "TR" ? "Kategorileri Filtrele" : "Filter Categories"
              }
              position="right"
            >
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="bg-brand-teal p-2 sm:p-3 rounded-r-2xl text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-brand-teal-dark hover:pl-4 active:scale-95 transition-all duration-300 group overflow-hidden"
                aria-label="Filter categories"
              >
                <PetCollageIcon className="w-9 h-9 sm:w-11 sm:h-11 group-hover:scale-110 transition-transform" />
              </button>
            </Tooltip>
          </div>

          <div className="pointer-events-auto">
            <PersistentPetButton
              pets={userPets}
              onClick={(id) => {
                setFocusedPetId(id);
                setIsPetProfileOpen(true);
              }}
            />
          </div>
        </div>

        {currentHash.startsWith("#/category/") ? (
          <CategoryPage
            categoryId={currentHash.replace("#/category/", "")}
            onAddToCart={handleAddToCart}
            savedProductNames={savedProductNames}
            onSaveToFolder={handleSaveToFolderClick}
            userPets={userPets}
            selectedPets={selectedPetsFilter}
            database={GLOBAL_PRODUCTS_DATABASE}
            onTryOnProduct={setTryOnProduct}
          />
        ) : currentHash.startsWith("#/product/") ? (
            <ProductPage
            productId={currentHash.replace("#/product/", "")}
            database={GLOBAL_PRODUCTS_DATABASE}
            lang={lang as 'EN'|'TR'}
            onAddToCart={handleAddToCart}
            onSaveToFolder={handleSaveToFolderClick}
            userPets={userPets}
            onTryOnProduct={setTryOnProduct}
          />
        ) : currentHash === "#checkout" ? (
          <CheckoutPage
            cartItems={cartItems}
            cartTotalPrice={cartTotalPrice}
            onProcessPayment={handleProcessPayment}
          />
        ) : (
          <main>
            <Hero
              onStartOnboarding={() => setIsOnboardingOpen(true)}
              onStartPetProfile={() => setIsPetProfileOpen(true)}
              userPets={userPets}
              onAddToCart={handleAddToCart}
            />
            <Services
              onAddToCart={handleAddToCart}
              savedProductNames={savedProductNames}
              onSaveToFolder={handleSaveToFolderClick}
              selectedPetsFilter={selectedPetsFilter}
              userPets={userPets}
              onTryOnProduct={setTryOnProduct}
            />
            <OrderTrackingSection />
            <TrustSection />
            <Contact />
          </main>
        )}

        <Footer />

        {/* Modals */}
        <AnimatePresence>
          {pendingCartItem && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPendingCartItem(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-border"
              >
                <div className="p-6">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <ShieldAlert className="w-8 h-8 text-red-500" />
                    <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">
                    {lang === "TR"
                      ? "Dikkat: Hassasiyet Uyarısı"
                      : "Warning: Sensitivity Alert"}
                  </h3>
                  <div className="text-center text-muted-foreground text-sm mb-6 space-y-2">
                    <p>
                      {lang === "TR"
                        ? "Bu ürün evcil hayvanınızın profiliyle uyumsuz olabilir:"
                        : "This product may conflict with your pet's profile:"}
                    </p>
                    {pendingCartItem.warnings.map((w, i) => (
                      <div
                        key={i}
                        className="font-semibold text-foreground/90 bg-secondary/50 py-2 px-3 rounded-lg border border-border"
                      >
                        {lang === "TR"
                          ? `${w.petName} isimli dostunuzun ${w.allergy} hassasiyeti var. Bu ürün ${w.allergy} içerebilir.`
                          : `You mentioned that ${w.petName} has a ${w.allergy} allergy. This product contains ${w.allergy}.`}
                      </div>
                    ))}
                    <p className="mt-2 text-xs opacity-70">
                      {lang === "TR"
                        ? "Yine de sepete eklemek istiyor musunuz?"
                        : "Do you want to add it to your cart anyway?"}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setPendingCartItem(null)}
                      className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-xl font-bold hover:bg-secondary-dark transition-all"
                    >
                      {lang === "TR" ? "İptal" : "Cancel"}
                    </button>
                    <button
                      onClick={() => {
                        handleAddToCart(
                          pendingCartItem.name,
                          pendingCartItem.quantity,
                          pendingCartItem.price,
                          true,
                        );
                        setPendingCartItem(null);
                        setToastMessage(
                          lang === "TR"
                            ? "Ürün uyarıya rağmen sepete eklendi"
                            : "Added to cart despite warning",
                        );
                        setTimeout(() => setToastMessage(null), 3000);
                      }}
                      className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-500/30 transition-all"
                    >
                      {lang === "TR" ? "Yine de Ekle" : "Add Anyway"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <SaveToFolderModal
          isOpen={selectedProductForFolder !== null}
          onClose={() => setSelectedProductForFolder(null)}
          productName={selectedProductForFolder}
          folders={folders}
          onSave={handleSaveToSpecificFolder}
        />
        <FoldersModal
          isOpen={isFoldersModalOpen}
          onClose={() => setIsFoldersModalOpen(false)}
          folders={folders}
          setFolders={setFolders}
          onAddToCart={handleAddToCart}
        />
        <PetProfileModal
          isOpen={isPetProfileOpen}
          onClose={() => {
            setIsPetProfileOpen(false);
            setFocusedPetId(null);
          }}
          pets={userPets}
          setPets={setUserPets}
          focusedPetId={focusedPetId}
        />
        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          selectedPets={
            selectedPetsFilter !== undefined
              ? selectedPetsFilter
              : userPets.filter((p) => p.name && p.type).map((p) => p.type)
          }
          onSelectionChange={setSelectedPetsFilter}
        />
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
          onClearCart={() => setCartItems([])}
          onCheckout={handleCheckout}
        />
        <CheckoutSuccessModal
          isOpen={isSuccessOpen}
          onClose={handleCloseSuccess}
        />
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onLogin={handleLogin}
          onChangeMode={setAuthMode}
        />
        <TryOnModal
          isOpen={tryOnProduct !== null}
          onClose={() => setTryOnProduct(null)}
          product={tryOnProduct}
          userPets={userPets}
          lang={lang as 'EN' | 'TR'}
        />

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
