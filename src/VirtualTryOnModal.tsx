import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, Sparkles, Loader2, Camera } from "lucide-react";
import { t, useLang } from "./i18n";
import { Product } from "./CategoryPage";

export default function VirtualTryOnModal({
  isOpen,
  onClose,
  product,
  onAddToCart,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (name: string, quantity?: number, price?: number) => void;
}) {
  const { lang } = useLang();
  const [photo, setPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Upload, 2: Process, 3: Result
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhoto(ev.target?.result as string);
        setStep(2);
        simulateProcessing();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsProcessing(false);
      // Generate a mock result image based on product type
      let mockResult = product?.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop";
      
      const pName = product?.name.EN.toLowerCase() || "";
      if (pName.includes("aquarium") || pName.includes("tank")) {
         mockResult = "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=800&auto=format&fit=crop";
      } else if (pName.includes("cage") || pName.includes("bird")) {
         mockResult = "https://images.unsplash.com/photo-1552728089-57168a6d21f8?q=80&w=800&auto=format&fit=crop"; 
      } else if (pName.includes("bed") || pName.includes("nest")) {
         mockResult = "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=800&auto=format&fit=crop";
      } else if (pName.includes("sweater") || pName.includes("clothing") || pName.includes("coat") || pName.includes("collar")) {
         mockResult = "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop";
      }
      setResultImage(mockResult);
      setStep(3);
    }, 4000);
  };

  const reset = () => {
    setPhoto(null);
    setResultImage(null);
    setStep(1);
    setIsProcessing(false);
  };

  const handleClose = () => {
    setTimeout(reset, 300);
    onClose();
  };

  if (!product) return null;

  const isSpacePlanner = product.name.EN.toLowerCase().match(/bed|cage|tank|aquarium|terrarium|scratcher|tree/);
  
  const title = isSpacePlanner 
      ? (lang === 'TR' ? 'Yapay Zeka ile Alan Planlayıcı' : 'AI Space Planner')
      : (lang === 'TR' ? 'Yapay Zeka Sanal Deneme' : 'AI Virtual Try-On');
  
  const subtitle = isSpacePlanner
      ? (lang === 'TR' ? 'Ürünün evinizde nasıl görüneceğini keşfedin.' : 'See how this fits in your home.')
      : (lang === 'TR' ? 'Küçük dostunuzun üzerinde nasıl duracak görün.' : 'See how this looks on your pet.');

  const uploadInstruction = isSpacePlanner
      ? (lang === 'TR' ? 'Bir Oda Fotoğrafı Yükle' : 'Upload a Room Photo')
      : (lang === 'TR' ? 'Evcil Hayvanınızın Fotoğrafını Yükleyin' : 'Upload a Pet Photo');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-card w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-border flex flex-col relative z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-card">
              <div className="flex items-center gap-3 relative">
                <div className="absolute -inset-2 bg-brand-teal/20 blur-xl rounded-full" />
                <Sparkles className="w-6 h-6 text-brand-teal relative z-10" />
                <h2 className="text-xl font-bold relative z-10">
                  {title}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground relative z-10 bg-card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row flex-1 overflow-auto bg-card">
              {/* Sidebar - Product Info */}
              <div className="w-full md:w-1/3 bg-secondary/30 p-6 flex flex-col border-b md:border-b-0 md:border-r border-border shrink-0">
                <div className="aspect-square rounded-2xl bg-white border border-border overflow-hidden mb-4 relative">
                  {product.image ? (
                     <img src={product.image} className="w-full h-full object-cover" alt={product.name[lang]} />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium border border-border text-foreground">
                    {lang === 'TR' ? 'Seçili Ürün' : 'Selected Item'}
                  </div>
                </div>
                <h3 className="font-bold text-lg leading-tight mb-2 text-foreground">
                  {product.name[lang]}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {subtitle}
                </p>

                <div className="mt-auto space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                     <span className="text-muted-foreground">{lang === 'TR' ? 'Fiyat' : 'Price'}</span>
                     <span className="font-bold text-xl text-foreground">{product.price.toFixed(2)} TL</span>
                  </div>
                  
                  {step === 3 && (
                     <button
                        onClick={() => {
                           onAddToCart(product.name.EN, 1, product.price);
                           handleClose();
                        }}
                        className="w-full py-3 bg-brand-teal text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-teal-dark transition-all active:scale-95"
                     >
                        {lang === 'TR' ? 'Sepete Ekle' : 'Add to Cart'}
                     </button>
                  )}
                </div>
              </div>

              {/* Main Arena */}
              <div className="w-full md:w-2/3 p-6 flex flex-col items-center justify-center min-h-[400px] relative">
                {/* Step 1: Upload */}
                {step === 1 && (
                  <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="w-full max-w-md"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-border hover:border-brand-teal rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-brand-teal/5 group bg-card"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-muted-foreground group-hover:text-brand-teal transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2 text-foreground">{uploadInstruction}</h3>
                      <p className="text-muted-foreground text-center text-sm">
                        {lang === 'TR' ? 'Sürükleyip bırakın veya seçmek için tıklayın' : 'Drag & drop or click to select'}
                      </p>
                      
                      <button className="mt-8 px-6 py-2.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-full font-medium transition-colors flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        {lang === 'TR' ? 'Fotoğraf Çek' : 'Take a Photo'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Processing */}
                {step === 2 && (
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="flex flex-col items-center justify-center w-full max-w-md"
                  >
                     <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-border shadow-xl mb-6 bg-card">
                        <img src={photo || ''} alt="Original" className="w-full h-full object-cover blur-sm opacity-50" />
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/20">
                           <div className="w-20 h-20 bg-background rounded-2xl shadow-2xl flex items-center justify-center mb-6 relative">
                              <div className="absolute inset-0 bg-brand-teal/20 rounded-2xl animate-ping" />
                              <Sparkles className="w-10 h-10 text-brand-teal animate-pulse relative z-10" />
                           </div>
                           <h3 className="text-xl font-bold text-center mb-2 text-foreground">
                              {lang === 'TR' ? 'Yapay Zeka Analiz Ediyor...' : 'AI is Analyzing...'}
                           </h3>
                           <p className="text-muted-foreground text-center">
                              {isSpacePlanner 
                                 ? (lang === 'TR' ? 'Derinlik, ışık ve ölçümleme yapılıyor' : 'Calculating depth, lighting, and scale')
                                 : (lang === 'TR' ? 'Duruş, boyut ve tüyler analiz ediliyor' : 'Analyzing posture, size, and fur texture')}
                           </p>

                           {/* AI Scanning Effect Line */}
                           <motion.div 
                              className="absolute left-0 right-0 h-1 bg-brand-teal shadow-[0_0_15px_rgba(20,184,166,0.5)]"
                              animate={{ top: ['0%', '100%', '0%'] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                           />
                        </div>
                     </div>
                  </motion.div>
                )}

                {/* Step 3: Result */}
                {step === 3 && resultImage && (
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="w-full flex-col items-center"
                  >
                     <div className="relative w-full rounded-3xl overflow-hidden border border-border shadow-2xl bg-card">
                        <img src={resultImage} alt="AI Result" className="w-full h-auto max-h-[60vh] object-contain" />
                        
                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur border border-border rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-black/10 text-brand-teal">
                           <Sparkles className="w-3.5 h-3.5" />
                           {lang === 'TR' ? 'Yapay Zeka Üretimi' : 'AI Generated'}
                        </div>

                        {/* Interactive Compare Tool (Mocked) */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-md border border-border rounded-full p-1 flex items-center gap-1 shadow-lg">
                           <button 
                              className="px-4 py-1.5 rounded-full bg-secondary text-foreground text-sm font-medium"
                              onPointerDown={(e) => {
                                 const img = e.currentTarget.parentElement?.parentElement?.querySelector('img');
                                 if (img && photo) img.src = photo;
                              }}
                              onPointerUp={(e) => {
                                 const img = e.currentTarget.parentElement?.parentElement?.querySelector('img');
                                 if (img && resultImage) img.src = resultImage;
                              }}
                              onPointerLeave={(e) => {
                                 const img = e.currentTarget.parentElement?.parentElement?.querySelector('img');
                                 if (img && resultImage) img.src = resultImage;
                              }}
                           >
                              {lang === 'TR' ? 'Orijinali Görmek İçin Basılı Tut' : 'Hold to View Original'}
                           </button>
                        </div>
                     </div>
                     
                     <div className="flex justify-center mt-6">
                        <button 
                           onClick={reset}
                           className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                        >
                           <Upload className="w-4 h-4" />
                           {lang === 'TR' ? 'Başka Fotoğraf Dene' : 'Try Another Photo'}
                        </button>
                     </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
