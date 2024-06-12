import "@/styles/global.css";

export const metadata = {
  title: "Tevhidi Mütercim"
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
