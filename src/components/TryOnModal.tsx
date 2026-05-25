import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Camera, Image as ImageIcon } from 'lucide-react';

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  userPets: any[];
  lang: 'EN' | 'TR';
}

export function TryOnModal({ isOpen, onClose, product, userPets, lang }: TryOnModalProps) {
  const [selectedPetForTryOn, setSelectedPetForTryOn] = useState<any>(null);
  const [tryOnImageObj, setTryOnImageObj] = useState<string | null>(null);
  const [tryOnStatus, setTryOnStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Handle Try-On image upload
  const handleTryOnImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTryOnImageObj(event.target?.result as string);
        setTryOnStatus('idle');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartTryOn = () => {
    setTryOnStatus('loading');
    setTimeout(() => {
      setTryOnStatus('success');
    }, 2500);
  };
  
  const handleCloseTryOn = () => {
    onClose();
    setTimeout(() => {
      setTryOnStatus('idle');
      setTryOnImageObj(null);
      setSelectedPetForTryOn(null);
    }, 300);
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="mt-auto mb-auto bg-card w-full max-w-4xl rounded-[32px] shadow-2xl border border-border/50 overflow-hidden flex flex-col md:flex-row relative z-50 my-8"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseTryOn}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-background border border-border transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Preview Area */}
            <div className="md:w-1/2 bg-secondary/30 relative flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-border min-h-[300px]">
              {tryOnStatus === 'idle' ? (
                tryOnImageObj || selectedPetForTryOn?.photo ? (
                  <img 
                    src={tryOnImageObj || selectedPetForTryOn?.photo} 
                    alt="Pet" 
                    className="w-full max-h-[80vh] object-cover rounded-2xl shadow-sm filter saturate-100 opacity-90 transition-all duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground opacity-60 text-center p-8">
                    <ImageIcon className="w-16 h-16 mb-4" />
                    <p className="font-medium text-lg">
                      {lang === 'TR' ? 'Önizleme Bekleniyor' : 'Awaiting Preview'}
                    </p>
                    <p className="mt-2 text-sm">
                      {lang === 'TR' 
                        ? 'Daha iyi sonuç için evcil hayvanınızın fotoğrafını yükleyin veya yapay zeka taslağı kullanmak için devam edin.' 
                        : 'Upload your pet\'s photo for the best results, or continue to use an AI generated silhouette.'}
                    </p>
                  </div>
                )
              ) : tryOnStatus === 'loading' ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-brand-teal border-t-transparent flex items-center justify-center rounded-full mb-6 relative"
                  >
                    <Sparkles className="absolute text-brand-teal w-6 h-6 animate-pulse" />
                  </motion.div>
                  <p className="font-bold text-foreground animate-pulse text-lg">
                    {lang === 'TR' ? 'Yapay Zeka Hazırlıyor...' : 'AI is Generating...'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    {lang === 'TR' ? 'Ürün evcil hayvanınız üzerinde taranıyor' : 'Scanning product onto your pet'}
                  </p>
                </div>
              ) : (
                <div className="w-full h-full relative group rounded-2xl overflow-hidden shadow-lg border border-border bg-black">
                  <img 
                    src={tryOnImageObj || selectedPetForTryOn?.photo || (selectedPetForTryOn?.type === 'Dog' ? 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=600' : selectedPetForTryOn?.type === 'Cat' ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600' : 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=600')} 
                    alt="Try on overlay" 
                    className="w-full h-full object-cover rounded-2xl opacity-50 sepia-[0.2]"
                  />
                  <img 
                    src={product.image} 
                    alt="Product" 
                    className="absolute inset-0 w-3/4 h-3/4 m-auto object-contain drop-shadow-2xl z-10 filter saturate-110"
                  />
                  <div className="absolute bottom-4 left-0 w-full text-center z-20">
                    <span className="bg-brand-teal/90 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-sm tracking-wide shadow-lg border border-brand-teal-light">
                      {lang === 'TR' ? 'Başarılı Önizleme' : 'Preview Complete'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Controls */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-card">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-sm mb-6 max-w-max border border-brand-teal/20">
                <Sparkles className="w-4 h-4" />
                {lang === 'TR' ? 'Yapay Zeka (Beta)' : 'AI Powered (Beta)'}
              </div>
              
              <h3 className="text-3xl font-black mb-2 tracking-tight">
                {lang === 'TR' ? 'Sanal Deneme Odası' : 'Virtual Try-On Room'}
              </h3>
              <p className="text-muted-foreground mb-8 text-sm">
                {lang === 'TR' 
                  ? 'Satın almadan önce ürünlerin evcil hayvanınızda nasıl duracağını görün.' 
                  : 'See how products look on your pet before you buy.'}
              </p>

              {tryOnStatus !== 'loading' && (
                <div className="space-y-6">
                  {userPets && userPets.length > 0 && (
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-foreground">
                        {lang === 'TR' ? 'Kayıtlı Dostunuzu Seçin' : 'Select Saved Pet'}
                      </label>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {userPets.map((pet) => (
                          <button
                            key={pet.id}
                            onClick={() => {
                              setSelectedPetForTryOn(pet);
                              setTryOnImageObj(null);
                              setTryOnStatus('idle');
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
                              selectedPetForTryOn?.id === pet.id && !tryOnImageObj
                                ? 'border-brand-teal bg-brand-teal/5 ring-1 ring-brand-teal shadow-sm'
                                : 'border-border hover:border-brand-teal/30 bg-secondary/50'
                            }`}
                          >
                            {pet.photo ? (
                              <img src={pet.photo} alt={pet.name || pet.type} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">{pet.type.charAt(0)}</div>
                            )}
                            <span className="font-bold whitespace-nowrap text-sm">{pet.name || pet.type}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground font-bold">{lang === 'TR' ? 'veya' : 'or'}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-foreground">
                      {lang === 'TR' ? 'Yeni Fotoğraf Yükle' : 'Upload New Photo'}
                    </label>
                    <label className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-border hover:border-brand-teal/50 bg-secondary/30 hover:bg-brand-teal/5 py-4 rounded-2xl cursor-pointer transition-all">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleTryOnImageUpload}
                      />
                      <Camera className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium text-foreground text-sm">
                        {lang === 'TR' ? 'Galeriden Seç' : 'Choose from Gallery'}
                      </span>
                    </label>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={handleStartTryOn}
                      disabled={!tryOnImageObj && !selectedPetForTryOn}
                      className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                        tryOnImageObj || selectedPetForTryOn
                          ? 'bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                          : 'bg-secondary text-muted-foreground cursor-not-allowed border border-border opacity-50'
                      }`}
                    >
                      <div className="relative flex items-center justify-center">
                        <Camera className="w-5 h-5" />
                        <Sparkles className="absolute -top-1.5 -right-1.5 w-3 h-3 text-yellow-400" />
                      </div>
                      {tryOnStatus === 'success' ? (lang === 'TR' ? 'Tekrar Dene' : 'Try Again') : (lang === 'TR' ? 'Önizlemeyi Başlat' : 'Generate Preview')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
