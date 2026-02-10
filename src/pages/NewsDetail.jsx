import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsOne, getComments, addComment } from "../api/news";
import { getUser } from "../utils/storage";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const user = getUser();

  useEffect(() => {
    const load = async () => {
      try {
        const n = await getNewsOne(id);
        const c = await getComments(id);
        setNews(n);
        setComments(c);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const submitComment = async () => {
    if (!user) {
      alert("Yorum yapmak için giriş yapmalısın");
      return;
    }
    if (!comment.trim()) return;

    await addComment({
      news_id: id,
      user,
      comment,
    });

    setComment("");
    alert("Yorum onaya gönderildi");
    const c = await getComments(id);
    setComments(c);
  };

  if (loading) {
    return (
      <div className="max-w-screen-md mx-auto px-6 py-20 text-center animate-pulse text-gray-400 uppercase tracking-widest text-xs">
        İçerik Yükleniyor...
      </div>
    );
  }

  if (!news) {
    return (
      <div className="max-w-screen-md mx-auto px-6 py-20 text-center text-gray-500 font-medium">
        Haber bulunamadı.
      </div>
    );
  }

  const cover = news.images?.[0];

  return (
    <article className="max-w-screen-md mx-auto px-6 py-12 lg:py-24 antialiased selection:bg-black selection:text-white">
      {/* Üst Bilgi */}
      <header className="space-y-6 mb-12">
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
          <span>{news.category || "Genel"}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="text-gray-400 font-medium">
            {new Date(news.created_at).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-black">
          {news.title}
        </h1>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-8">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">
            GK
          </div>
          <div className="text-xs">
            <p className="font-semibold text-black">Gökhan Kozak</p>
            <p className="text-gray-400">@gokhankozak</p>
          </div>
        </div>
      </header>

      {/* Ana Görsel */}
      {cover && (
        <div className="mb-12">
          <img
            src={`https://panel.gokhankozak.com${cover}`}
            alt={news.title}
            className="w-full aspect-[16/9] object-cover rounded-sm bg-gray-50 shadow-sm"
          />
        </div>
      )}

      {/* İçerik */}
      <div className="prose prose-lg max-w-none prose-headings:text-black prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-black mb-20 font-serif">
        {news.description}
      </div>

      <hr className="border-gray-100 mb-16" />

      {/* Yorum Bölümü */}
      <section className="max-w-2xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-black">
            Yorumlar ({comments.length})
          </h2>
        </div>

        {/* Yorum Listesi */}
        <div className="space-y-8">
          {comments.length === 0 ? (
            <p className="text-gray-400 text-sm italic py-4 border-b border-gray-50">
              Henüz yorum yapılmamış. İlk yorumu siz yapın.
            </p>
          ) : (
            comments.map((c, i) => (
              <div
                key={i}
                className="group border-b border-gray-50 pb-8 last:border-0 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold uppercase tracking-tighter">
                    {c.name?.substring(0, 2) || "AN"}
                  </div>
                  <span className="text-sm font-semibold text-black">
                    {c.name}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px] pl-9">
                  {c.comment}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Yorum Formu */}
        <div className="bg-gray-50/50 p-8 rounded-lg border border-gray-100/50">
          <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-6">
            Düşüncelerini Paylaş
          </h3>
          <div className="space-y-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-md p-4 text-[15px] focus:outline-none focus:ring-1 focus:ring-black transition-all min-h-[120px] placeholder:text-gray-400"
              placeholder={
                user
                  ? "Bu konu hakkında ne düşünüyorsun?"
                  : "Yorum yapmak için giriş yapmalısınız."
              }
              disabled={!user}
            />
            <div className="flex justify-end">
              <button
                onClick={submitComment}
                className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-all disabled:opacity-20 active:scale-95"
                disabled={!user || !comment.trim()}
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
