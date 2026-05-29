import * as fs from 'fs';

let code = fs.readFileSync('src/CheckoutPage.tsx', 'utf8');

// 1. Make all fields non-required by replacing span elements
code = code.replace(/ <span className="text-red-500">\*<\/span>/g, '');
code = code.replace(/ <span className="text-muted-foreground font-normal">\(\{lang === "TR" \? "İsteğe bağlı" : "Optional"\}\)<\/span>/g, '');

// 2. Change validateForm
const validateFormContent = `  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = lang === "TR" ? "Zorunlu" : "Required";
    if (!lastName.trim()) newErrors.lastName = lang === "TR" ? "Zorunlu" : "Required";
    if (!phone.trim()) newErrors.phone = lang === "TR" ? "Zorunlu" : "Required";
    if (!address.trim()) newErrors.address = lang === "TR" ? "Zorunlu" : "Required";
    if (!city) newErrors.city = lang === "TR" ? "Zorunlu" : "Required";
    if (!district) newErrors.district = lang === "TR" ? "Zorunlu" : "Required";
    if (!cardName.trim()) newErrors.cardName = lang === "TR" ? "Zorunlu" : "Required";
    if (!cardNumber.trim()) newErrors.cardNumber = lang === "TR" ? "Zorunlu" : "Required";
    if (!expiry.trim()) newErrors.expiry = lang === "TR" ? "Zorunlu" : "Required";
    if (!cvv.trim()) newErrors.cvv = lang === "TR" ? "Zorunlu" : "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };`;

const newValidateForm = `  const validateForm = () => {
    setErrors({});
    return true;
  };`;
code = code.replace(validateFormContent, newValidateForm);

// 3. Add isSuccess state
const stateInsert = `  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);`;
code = code.replace(`  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});`, stateInsert);

// 4. Update handleSubmit
const handleSubmitContent = `  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onProcessPayment();
    } else {
      // scroll to first error roughly
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };`;

const newHandleSubmit = `  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSuccess(true);
      onProcessPayment();
    }
  };`;
code = code.replace(handleSubmitContent, newHandleSubmit);

// 5. Success screen render logic
const successRender = `
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

`;

const returnContent = `  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">`;

code = code.replace(returnContent, successRender + returnContent);

fs.writeFileSync('src/CheckoutPage.tsx', code, 'utf8');
console.log("Success CheckoutPage updated!");
