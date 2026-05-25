import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  Heart, 
  ChevronRight, 
  Star, 
  Truck, 
  ShieldCheck, 
  RefreshCcw,
  Check,
  Package,
  Minus,
  Plus,
  Sparkles,
  Upload,
  X,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { ProductListingCard } from './CategoryPage';

interface ProductPageProps {
  productId: string;
  database: any[];
  lang: 'EN' | 'TR';
  onAddToCart: (name: string, quantity?: number, price?: number) => void;
  onSaveToFolder: (name: string) => void;
  userPets?: any[];
  onTryOnProduct?: (product: any) => void;
}

import { isTryOnCompatible } from './tryOnUtils';

export default function ProductPage({ 
  productId, 
  database, 
  lang,
  onAddToCart,
  onSaveToFolder,
  userPets = [],
  onTryOnProduct
}: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description'|'shipping'|'details'>('description');
  const [isAdded, setIsAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  // Modal state lifted, removed local Try-On state
  
  const product = useMemo(() => database.find(p => p.id === productId), [database, productId]);
  
  // reset state on product change
  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
    setIsSaved(false);
    setImgError(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [productId]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return database
      .filter(p => p.id !== product.id && (p._categoryId === product._categoryId || p.brand === product.brand))
      .sort((a,b) => {
        // prefer same subcategory
        if (a._subCategoryId === product._subCategoryId && b._subCategoryId !== product._subCategoryId) return -1;
        if (a._subCategoryId !== product._subCategoryId && b._subCategoryId === product._subCategoryId) return 1;
        return 0;
      })
      .slice(0, 4);
  }, [product, database]);

  if (!product) {
    return (
      <div className="py-32 min-h-screen max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-black mb-4">Product Not Found</h1>
        <p className="text-muted-foreground"><a href="#/" className="hover:underline">Return to Home</a></p>
      </div>
    );
  }

  const productName = product.name[lang as 'EN'|'TR'] || product.name.EN || product.name;
  const categoryLabel = product._categoryLabel?.[lang as 'EN'|'TR'] || product._categoryId;
  const inStock = product.stock > 0;
  
  const handleAddToCart = () => {
    if (!inStock) return;
    onAddToCart(productName, quantity, product.price);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  
  const handleSave = () => {
    onSaveToFolder(productName);
    setIsSaved(true);
  };

  const getFullStars = () => Math.floor(product.rating || 4);
  const hasHalfStar = (product.rating || 4) % 1 >= 0.5;

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <a href="#/" className="hover:text-foreground transition-colors">{lang === 'TR' ? 'Ana Sayfa' : 'Home'}</a>
          <ChevronRight className="w-4 h-4" />
          <a href={`#/category/${product._categoryId}`} className="hover:text-foreground transition-colors capitalize">{categoryLabel}</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-md">{productName}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column - Images */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="aspect-square w-full rounded-3xl bg-secondary relative overflow-hidden group">
            {product.discount > 0 && (
              <div className="absolute top-6 left-6 z-10 bg-red-500 text-white font-black text-sm md:text-base px-4 py-1.5 rounded-full shadow-lg">
                -{product.discount}%
              </div>
            )}
            {product.image && !imgError ? (
              <img 
                src={product.image} 
                onError={() => setImgError(true)}
                alt={productName} 
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-32 h-32 text-muted-foreground/30" />
              </div>
            )}
          </div>
          {/* Thumbnails (mocked for effect) */}
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-secondary overflow-hidden border-2 border-transparent hover:border-foreground/20 cursor-pointer transition-colors relative">
                {product.image && !imgError ? (
                  <img src={product.image} onError={() => setImgError(true)} alt="" className="w-full h-full object-contain p-2 opacity-70 hover:opacity-100 transition-opacity" />
                ) : (
                 <div className="w-full h-full flex items-center justify-center"><Package className="w-8 h-8 text-muted-foreground/30" /></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Brand & Badges */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-sm font-bold text-brand-teal tracking-widest uppercase">{product.brand || 'Premium'}</span>
            {product.badges?.map((badge: string) => (
              <span key={badge} className="px-2 py-0.5 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-wide">
                {badge}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 leading-[1.1] tracking-tight">{productName}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1 text-[#F4A261]">
              {[...Array(getFullStars())].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              {hasHalfStar && <Star className="w-5 h-5 fill-current opacity-50" />}
              {[...Array(5 - getFullStars() - (hasHalfStar ? 1 : 0))].map((_, i) => <Star key={i} className="w-5 h-5 text-muted-foreground/30" />)}
            </div>
            <span className="text-muted-foreground font-medium text-sm">
              {product.rating} ({product.reviews || 0} {lang === 'TR' ? 'Değerlendirme' : 'Reviews'})
            </span>
          </div>

          <div className="flex gap-4 items-end mb-8">
            <span className="text-5xl font-black text-foreground tracking-tight">₺{product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-2xl font-medium text-muted-foreground line-through mb-1">₺{product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Action Area */}
          <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm mb-8 space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">{lang === 'TR' ? 'Stok Durumu' : 'Stock Status'}</span>
              {inStock ? (
                <span className="flex items-center gap-2 text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-full text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> {lang === 'TR' ? 'Stokta var' : 'In Stock'}
                </span>
              ) : (
                <span className="text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded-full text-sm">
                  {lang === 'TR' ? 'Stokta yok' : 'Out of Stock'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-secondary rounded-xl border border-border overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:bg-black/5 active:bg-black/10 transition-colors" disabled={!inStock}>
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-12 text-center font-bold text-lg">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="p-4 hover:bg-black/5 active:bg-black/10 transition-colors" disabled={!inStock}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${
                  !inStock 
                  ? 'bg-secondary text-muted-foreground/50 cursor-not-allowed border border-border'
                  : isAdded
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-brand-teal text-white hover:bg-brand-teal-dark active:scale-[0.98] shadow-[0_4px_14px_0_rgba(45,212,191,0.39)]'
                }`}
              >
                {isAdded ? <><Check className="w-5 h-5"/> {lang === 'TR' ? 'Eklendi' : 'Added'}</> : <><ShoppingCart className="w-5 h-5" /> {lang === 'TR' ? 'Sepete Ekle' : 'Add to Cart'}</>}
              </button>

              <button 
                onClick={handleSave}
                className={`p-4 rounded-xl border-2 transition-all active:scale-[0.8] ${isSaved ? 'border-red-500 text-red-500 bg-red-50' : 'border-border text-foreground hover:bg-secondary'}`}
              >
                <Heart className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Try-On Button */}
          {product && isTryOnCompatible(product._subCategoryId || product._categoryId, product.name?.EN) && (
            <button 
              onClick={() => onTryOnProduct?.(product)}
              className="w-full flex items-center justify-center gap-3 py-4 mb-8 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:opacity-90 transition-opacity active:scale-[0.98]"
            >
              <div className="relative flex items-center justify-center">
                <Camera className="w-6 h-6" />
                <Sparkles className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-yellow-300" />
              </div>
              {lang === 'TR' ? 'Sanal Deneme Odası' : 'Virtual Try-On Room'}
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/50">
              <Truck className="w-6 h-6 text-brand-teal mt-0.5" />
              <div>
                <h4 className="font-bold text-sm mb-1">{lang === 'TR' ? 'Hızlı Teslimat' : 'Fast Delivery'}</h4>
                <p className="text-xs text-muted-foreground">{lang === 'TR' ? '12:00\'den önceki siparişler aynı gün kargoda' : 'Orders before 12:00 PM ship same day'}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/50">
              <ShieldCheck className="w-6 h-6 text-brand-teal mt-0.5" />
              <div>
                <h4 className="font-bold text-sm mb-1">{lang === 'TR' ? 'Güvenilir Ürün' : 'Authentic Product'}</h4>
                <p className="text-xs text-muted-foreground">{lang === 'TR' ? '%100 Orijinal, faturalı ürünler' : '100% Genuine, certified products'}</p>
              </div>
            </div>
          </div>

          {/* Details / Tabs */}
          <div className="border-t border-border pt-6">
            <div className="flex gap-6 mb-6 overflow-x-auto pb-2 scrollbar-none font-medium">
              <button 
                onClick={() => setActiveTab('description')}
                className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'description' ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                {lang === 'TR' ? 'Ürün Açıklaması' : 'Description'}
              </button>
              <button 
                onClick={() => setActiveTab('details')}
                className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'details' ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                {lang === 'TR' ? 'Özellikler' : 'Specifications'}
              </button>
              <button 
                onClick={() => setActiveTab('shipping')}
                className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'shipping' ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                {lang === 'TR' ? 'Teslimat & İade' : 'Shipping & Returns'}
              </button>
            </div>

            <div className="min-h-[150px] text-muted-foreground text-sm leading-relaxed">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'description' && (
                    <p>{product.description || (lang === 'TR' ? 'Bu ürün için detaylı bir açıklama girilmemiş.' : 'No detailed description provided for this product.')}</p>
                  )}
                  {activeTab === 'details' && (
                    <ul className="space-y-4">
                      <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">Brand</span><span className="col-span-2 text-right">{product.brand || '-'}</span></li>
                      <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">Category</span><span className="col-span-2 text-right">{categoryLabel}</span></li>
                      <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">SKU</span><span className="col-span-2 text-right">{product.id.split('-').slice(-1)[0].padStart(8, '0')}</span></li>
                      
                      {product.birdSpecies && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Kuş Türü' : 'Bird Species'}</span><span className="col-span-2 text-right">{product.birdSpecies}</span></li>
                      )}
                      {product.feedType && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Yem Tipi' : 'Feed Type'}</span><span className="col-span-2 text-right">{product.feedType}</span></li>
                      )}
                      {product.cageSize && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Kafes Boyutu' : 'Cage Size'}</span><span className="col-span-2 text-right">{product.cageSize}</span></li>
                      )}
                      {product.material && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Materyal' : 'Material'}</span><span className="col-span-2 text-right">{product.material}</span></li>
                      )}
                      {product.weight && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Ağırlık' : 'Weight'}</span><span className="col-span-2 text-right">{product.weight}</span></li>
                      )}
                      {product.waterType && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Su Tipi' : 'Water Type'}</span><span className="col-span-2 text-right">{product.waterType}</span></li>
                      )}
                      {product.fishType && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Uygun Tür' : 'Suitable For'}</span><span className="col-span-2 text-right">{product.fishType}</span></li>
                      )}
                      {product.tankVolume && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Akvaryum Hacmi' : 'Tank Volume'}</span><span className="col-span-2 text-right">{product.tankVolume}</span></li>
                      )}
                      {product.smallPetSpecies && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Uygun Tür' : 'Suitable Species'}</span><span className="col-span-2 text-right">{product.smallPetSpecies}</span></li>
                      )}
                      {product.beddingMaterial && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Taban Malzemesi' : 'Bedding Material'}</span><span className="col-span-2 text-right">{product.beddingMaterial}</span></li>
                      )}
                      {product.reptileSpecies && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Uygun Tür' : 'Suitable Species'}</span><span className="col-span-2 text-right">{product.reptileSpecies}</span></li>
                      )}
                      {product.terrariumSize && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Teraryum Boyutu' : 'Terrarium Size'}</span><span className="col-span-2 text-right">{product.terrariumSize}</span></li>
                      )}
                      {product.wattage && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Güç (Watt)' : 'Wattage'}</span><span className="col-span-2 text-right">{product.wattage}</span></li>
                      )}
                      {product.substrateMaterial && (
                         <li className="grid grid-cols-3 gap-2 border-b border-border pb-2"><span className="font-bold text-foreground">{lang === 'TR' ? 'Zemin Malzemesi' : 'Substrate Material'}</span><span className="col-span-2 text-right">{product.substrateMaterial}</span></li>
                      )}
                    </ul>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-4">
                      <p><strong>{lang === 'TR' ? 'Teslimat' : 'Delivery'}</strong>: {lang === 'TR' ? 'Siparişleriniz en geç 1-3 iş günü içinde teslim edilir.' : 'Orders are delivered within 1-3 business days.'}</p>
                      <p><strong>{lang === 'TR' ? 'İade' : 'Returns'}</strong>: {lang === 'TR' ? 'Ürünü ambalajı bozulmadan 14 gün içerisinde iade edebilirsiniz.' : 'You can return the product in its original packaging within 14 days.'}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-32 border-t border-border pt-16">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-black">{lang === 'TR' ? 'İlginizi Çekebilir' : 'You May Also Like'}</h2>
            <div className="h-0.5 flex-1 bg-border rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => (
              <ProductListingCard 
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onSaveToFolder={onSaveToFolder}
                lang={lang}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
