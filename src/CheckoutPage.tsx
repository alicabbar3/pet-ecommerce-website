import React, { useState, useEffect } from "react";
import { ArrowLeft, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import turkeyData from "./turkeyData";
import { useLang } from "./i18n";
import { CartItem } from "./App";
import { motion } from "motion/react";

const TR_CITIES = Object.keys(turkeyData).sort((a, b) =>
  a.localeCompare(b, "tr")
);

const getDistrictsForCity = (city: string) => {
  return (turkeyData as Record<string, string[]>)[city] || [];
};

export default function CheckoutPage({
  cartItems,
  cartTotalPrice,
  onProcessPayment,
}: {
  cartItems: CartItem[];
  cartTotalPrice: number;
  onProcessPayment: () => void;
}) {
  const { lang } = useLang();

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // Optional
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [orderNote, setOrderNote] = useState(""); // Optional
  
  // Payment State
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const [promoCode, setPromoCode] = useState(""); // Optional
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const districts = city ? getDistrictsForCity(city) : [];

  const subtotal = cartTotalPrice;
  let discountRate = 0;
  if (subtotal >= 5000) discountRate = 30;
  else if (subtotal >= 2500) discountRate = 20;
  else if (subtotal >= 1500) discountRate = 15;

  const largeOrderDiscount = (subtotal * discountRate) / 100;
  const promoDiscount = isPromoApplied ? subtotal * 0.1 : 0; // 10% promo
  const totalDiscount = largeOrderDiscount + promoDiscount;
  const finalTotal = Math.max(0, subtotal - totalDiscount);

  const shipping = finalTotal > 0 && finalTotal < 1000 ? 50 : 0;
  const orderTotal = finalTotal + shipping;

  const validateForm = () => {
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSuccess(true);
      onProcessPayment();
    }
  };


  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-8 max-w-md w-full shadow-lg text-center border border-border"
        >
          <div className="w-20 h-20 rounded-full bg-brand-teal/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-brand-teal" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {lang === "TR" ? "Siparişiniz Alındı!" : "Order Completed!"}
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            {lang === "TR"
              ? "Teşekkür ederiz. Siparişiniz başarıyla oluşturuldu ve en kısa sürede yola çıkacak."
              : "Thank you. Your order has been successfully placed and will be shipped soon."}
          </p>
          <button
            onClick={() => {
              window.location.hash = "";
            }}
            className="w-full bg-brand-teal text-white rounded-xl py-4 font-semibold hover:bg-brand-teal-dark active:scale-[0.98] transition-all duration-300"
          >
            {lang === "TR" ? "Anasayfaya Dön" : "Return to Homepage"}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => (window.location.hash = "")}
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {lang === "TR" ? "Alışverişe Dön" : "Back to Shopping"}
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 flex items-center gap-3">
          <Lock className="w-8 h-8 text-brand-teal" />
          {lang === "TR" ? "Güvenli Ödeme" : "Secure Checkout"}
        </h1>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Side: Forms */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Contact Information */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  {lang === "TR" ? "İletişim Bilgileri" : "Contact Information"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {lang === "TR" ? "Ad" : "First Name"}
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={`w-full bg-secondary border ${errors.firstName ? 'border-red-500' : 'border-border'} focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {lang === "TR" ? "Soyad" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={`w-full bg-secondary border ${errors.lastName ? 'border-red-500' : 'border-border'} focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {lang === "TR" ? "Telefon Numarası" : "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full bg-secondary border ${errors.phone ? 'border-red-500' : 'border-border'} focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all`}
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {lang === "TR" ? "E-posta Adresi" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  {lang === "TR" ? "Teslimat Adresi" : "Delivery Address"}
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        {lang === "TR" ? "İl" : "City"}
                      </label>
                      <div className="relative">
                        <select
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            setDistrict("");
                          }}
                          className={`w-full appearance-none bg-secondary border ${errors.city ? 'border-red-500' : 'border-border'} focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all`}
                        >
                          <option value="">{lang === "TR" ? "Seçiniz" : "Select"}</option>
                          {TR_CITIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        {lang === "TR" ? "İlçe" : "District"}
                      </label>
                      <div className="relative">
                        <select
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          disabled={!city}
                          className={`w-full appearance-none bg-secondary border ${errors.district ? 'border-red-500' : 'border-border'} focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all disabled:opacity-50`}
                        >
                          <option value="">{lang === "TR" ? "Seçiniz" : "Select"}</option>
                          {districts.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {lang === "TR" ? "Açık Adres" : "Full Address"}
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className={`w-full bg-secondary border ${errors.address ? 'border-red-500' : 'border-border'} focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all resize-none`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {lang === "TR" ? "Sipariş Notu" : "Order Note"}
                    </label>
                    <textarea
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      rows={2}
                      className="w-full bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-brand-teal" />
                  {lang === "TR" ? "Ödeme Bilgileri" : "Payment Details"}
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {lang === "TR" ? "Kart Üzerindeki İsim" : "Name on Card"}
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className={`w-full bg-secondary border ${errors.cardName ? 'border-red-500' : 'border-border'} focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      {lang === "TR" ? "Kart Numarası" : "Card Number"}
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      placeholder="XXXX XXXX XXXX XXXX"
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const formatted = val.replace(/(.{4})/g, "$1 ").trim();
                        setCardNumber(formatted);
                      }}
                      className={`w-full bg-secondary border ${errors.cardNumber ? 'border-red-500' : 'border-border'} focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all tracking-wider`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        {lang === "TR" ? "Son Kullanma Tarihi" : "Expiry Date"}
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          if (val.length >= 3) {
                            setExpiry(`${val.slice(0, 2)}/${val.slice(2, 4)}`);
                          } else {
                            setExpiry(val);
                          }
                        }}
                        className={`w-full bg-secondary border ${errors.expiry ? 'border-red-500' : 'border-border'} focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        CVV
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                        className={`w-full bg-secondary border ${errors.cvv ? 'border-red-500' : 'border-border'} focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all tracking-widest`}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">
                {lang === "TR" ? "Sipariş Özeti" : "Order Summary"}
              </h2>

              {/* Items Summary Snippet */}
              <div className="mb-6 max-h-48 overflow-y-auto no-scrollbar space-y-3">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{lang === "TR" ? "Sepetiniz boş" : "Your cart is empty"}</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 flex-1 min-w-0 pr-4">
                        <span className="font-semibold text-muted-foreground shrink-0">{item.quantity}x</span>
                        <span className="text-foreground truncate">{item.name}</span>
                      </div>
                      <span className="font-medium shrink-0">{(item.price * item.quantity).toFixed(2)} TL</span>
                    </div>
                  ))
                )}
              </div>
              
              <div className="h-px w-full bg-border my-6" />

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>{lang === "TR" ? "Ara Toplam" : "Subtotal"}</span>
                  <span className="font-medium text-foreground">{subtotal.toFixed(2)} TL</span>
                </div>
                {discountRate > 0 && (
                  <div className="flex justify-between text-brand-teal">
                    <span>
                      {lang === "TR" ? "Büyük Sipariş İndirimi" : "Large Order Discount"} (%{discountRate})
                    </span>
                    <span className="font-medium">-{largeOrderDiscount.toFixed(2)} TL</span>
                  </div>
                )}
                {isPromoApplied && (
                  <div className="flex justify-between text-brand-teal">
                    <span>{lang === "TR" ? "Kupon İndirimi" : "Promo Discount"} (%10)</span>
                    <span className="font-medium">-{promoDiscount.toFixed(2)} TL</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>{lang === "TR" ? "Kargo" : "Shipping"}</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? (lang === "TR" ? "Ücretsiz" : "Free") : `${shipping.toFixed(2)} TL`}
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-border my-6" />

              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-semibold text-foreground">
                  {lang === "TR" ? "Toplam" : "Total"}
                </span>
                <span className="text-3xl font-extrabold text-foreground">
                  {orderTotal.toFixed(2)} TL
                </span>
              </div>

              {/* Promo Code Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  {lang === "TR" ? "Kupon Kodu" : "Coupon Code"}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-secondary border border-border focus:border-brand-teal focus:bg-card focus:outline-none rounded-xl py-3 px-4 transition-all uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (promoCode.toUpperCase() === "VIVIA10") setIsPromoApplied(true);
                    }}
                    className="bg-secondary border border-border hover:border-brand-teal hover:bg-card rounded-xl px-4 font-bold text-sm transition-all"
                  >
                    {lang === "TR" ? "Uygula" : "Apply"}
                  </button>
                </div>
                {isPromoApplied && (
                  <p className="text-xs text-brand-teal mt-2 flex items-center font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    {lang === "TR" ? "Kupon başarıyla uygulandı" : "Coupon applied successfully"}
                  </p>
                )}
              </div>

              <button
                form="checkout-form"
                type="submit"
                disabled={cartItems.length === 0}
                className="w-full bg-brand-teal text-white rounded-xl py-4 text-lg font-bold hover:bg-brand-teal-dark active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="w-5 h-5" /> 
                {lang === "TR" ? "Siparişi Tamamla" : "Complete Order"}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4" />
                {lang === "TR" ? "256-bit SSL Güvenli Ödeme" : "256-bit SSL Secure Payment"}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
