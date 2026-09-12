import "./globals.css";

export const metadata = { title: "Medico | Care, closer to you", description: "Find trusted doctors and pharmacies near you." };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
