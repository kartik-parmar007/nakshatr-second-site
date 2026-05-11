import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Nakshatr Technologies | Drone Education From The Root',
  description: 'Hands-on drone education, drone courses, university partnerships, and practical drone learning from Bhavnagar to India.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
