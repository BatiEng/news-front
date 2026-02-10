import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Kurumsal",
      links: [
        { name: "Hakkımızda", href: "/about" },
        { name: "Ekibimiz", href: "/team" },
        { name: "Kariyer", href: "/careers" },
        { name: "İletişim", href: "/contact" },
      ],
    },
    {
      title: "Kategoriler",
      links: [
        { name: "Teknoloji", href: "/news?cat=teknoloji" },
        { name: "Yaşam", href: "/news?cat=yasam" },
        { name: "Spor", href: "/news?cat=spor" },
        { name: "Ekonomi", href: "/news?cat=ekonomi" },
      ],
    },
    {
      title: "Yasal",
      links: [
        { name: "Gizlilik Politikası", href: "/privacy" },
        { name: "Kullanım Şartları", href: "/terms" },
        { name: "Çerez Tercihleri", href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-100 bg-white pt-16 pb-8 antialiased">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo ve Bülten Kısmı */}
          <div className="col-span-2 space-y-6">
            <Link
              to="/"
              className="text-sm font-bold tracking-tighter uppercase"
            >
              gokhankozak<span className="text-blue-600">.</span>com
            </Link>
            <p className="text-gray-500 text-[13px] leading-relaxed max-w-xs">
              En güncel haberler ve teknoloji dünyasından gelişmelerle her gün
              yanınızdayız.
            </p>
            <div className="flex max-w-sm">
              <input
                type="email"
                placeholder="Bültene abone ol"
                className="w-full bg-gray-50 border border-gray-100 rounded-l-md px-4 py-2 text-xs focus:outline-none focus:border-black transition-colors"
              />
              <button className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-r-md hover:bg-gray-800 transition-colors">
                Katıl
              </button>
            </div>
          </div>

          {/* Dinamik Link Sütunları */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-black text-[13px] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Alt Bilgi Barı */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[11px] text-gray-400 font-medium tracking-tight">
            © {currentYear} gokhankozak.com. Tüm hakları saklıdır.
          </div>

          <div className="flex items-center gap-6">
            {/* Sosyal Medya İkonları (Placeholder) */}
            {["Twitter", "Instagram", "LinkedIn"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
