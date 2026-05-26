import * as fs from 'fs';
const code = fs.readFileSync('src/App.tsx', 'utf8');
const start = "function CheckoutModal(";
const end = "export const getBasePriceFromName = (name: string) => {";
const startIndex = code.indexOf(start);
const endIndex = code.indexOf(end);
if (startIndex !== -1 && endIndex !== -1) {
  const newCode = code.substring(0, startIndex) + code.substring(endIndex);
  fs.writeFileSync('src/App.tsx', newCode, 'utf8');
  console.log("Success");
} else {
  console.log("Failed");
}
