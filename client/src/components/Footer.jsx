// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-3 mt-10">
      <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Online Judge</p>
    </footer>
  );
}
