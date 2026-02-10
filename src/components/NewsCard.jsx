import { Link } from "react-router-dom";

export default function NewsCard({ item, variant = "default" }) {
  const cover = item?.images?.[0];
  const isHero = variant === "hero";

  return (
    <Link to={`/news/${item.id}`} className="group block w-full">
      <div className="relative overflow-hidden bg-gray-50 mb-5 aspect-[16/10] rounded-[2px]">
        {cover ? (
          <img
            src={`https://panel.gokhankozak.com${cover}`}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.2, 1, 0.3, 1) group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 group-hover:text-black transition-colors">
            {item.category || "Genel"}
          </span>
          <span className="h-[1px] flex-1 bg-gray-100 opacity-50"></span>
        </div>

        <h3
          className={`
          text-black font-semibold leading-[1.2] tracking-tight transition-colors duration-300
          ${isHero ? "text-2xl md:text-4xl" : "text-lg md:text-xl"}
        `}
        >
          {item.title}
        </h3>

        {isHero && item.description && (
          <p className="text-gray-500 line-clamp-2 text-base leading-relaxed max-w-2xl">
            {item.description}
          </p>
        )}

        <div className="pt-2 flex items-center text-[12px] font-bold uppercase tracking-widest text-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          <span>Haberi Oku</span>
          <svg
            className="ml-2 w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
