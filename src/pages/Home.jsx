import { useEffect, useState } from "react";
import { getFeaturedNews, getNews } from "../api/news";
import NewsCard from "../components/NewsCard";
import SectionTitle from "../components/SectionTitle";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [f, n] = await Promise.all([getFeaturedNews(), getNews()]);
        const featuredData = f || [];
        const allNewsData = n || [];
        setFeatured(featuredData);
        const featuredIds = featuredData.map((item) => item.id);
        setNews(allNewsData.filter((item) => !featuredIds.includes(item.id)));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="h-8 w-48 bg-gray-100 animate-pulse mb-12"></div>
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-8 h-[500px] bg-gray-50 animate-pulse"></div>
          <div className="col-span-4 h-[500px] bg-gray-50 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {" "}
      {/* Hafif kırık beyaz arka plan derinlik katar */}
      <main className="max-w-screen-xl mx-auto px-6 py-12 lg:py-20 antialiased selection:bg-black selection:text-white">
        {/* Manşet Bölümü */}
        <section className="mb-24">
          <header className="flex items-baseline justify-between border-b border-gray-200 pb-4 mb-10">
            <SectionTitle className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
              Öne Çıkan Hikayeler
            </SectionTitle>
            <div className="hidden md:flex gap-4 text-[10px] font-bold text-gray-400">
              <span>
                {new Date().toLocaleDateString("tr-TR", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Büyük Hero Kartı */}
            <div className="md:col-span-8">
              {featured[0] && (
                <NewsCard item={featured[0]} variant="hero" shadow={true} />
              )}
            </div>

            {/* Yan Liste (Dolu göstermek için) */}
            <div className="md:col-span-4 space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-4">
                Editörün Notu
              </h3>
              {featured.slice(1, 3).map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-100 pb-6 last:border-0"
                >
                  <NewsCard item={item} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ana İçerik ve Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sol: Haber Akışı */}
          <section className="lg:col-span-8">
            <header className="border-b border-gray-200 pb-4 mb-10">
              <SectionTitle className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
                Son Haberler
              </SectionTitle>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Sağ: Sidebar (Boşluğu dolduran kısım) */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-white border border-gray-100 p-8 rounded-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
                Bültene Katıl
              </h4>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                En güncel haberlerden ilk siz haberdar olun.
              </p>
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full bg-gray-50 border border-gray-100 rounded-sm px-4 py-3 text-xs mb-3 focus:outline-none focus:border-black transition-all"
              />
              <button className="w-full bg-black text-white py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all">
                Abone Ol
              </button>
            </div>

            <div className="sticky top-10">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-black pb-2 inline-block">
                Popüler Haberler
              </h4>
              <div className="space-y-6 mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <span className="text-2xl font-serif italic text-gray-200 group-hover:text-black transition-colors">
                      0{i}
                    </span>
                    <p className="text-sm font-medium leading-snug group-hover:underline">
                      Apple'ın yeni M4 çiplerinin performansı hakkında her şey.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
