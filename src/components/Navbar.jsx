import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUser, clearUser } from "../utils/storage";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(getUser());
  }, [location]); // Sayfa değiştiğinde kullanıcıyı kontrol et

  const handleLogout = () => {
    clearUser();
    setUser(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-gray-100 bg-white/70 backdrop-blur-xl antialiased">
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="group flex items-center gap-1 text-[13px] font-bold uppercase tracking-[0.2em] text-black"
            >
              <span>gokhankozak</span>
              <span className="h-1 w-1 rounded-full bg-blue-600 transition-transform group-hover:scale-[2.5]"></span>
            </Link>

            {/* Opsiyonel: Ana Navigasyon Linkleri */}
            <nav className="hidden md:flex items-center gap-8">
              {["Teknoloji", "Tasarım", "Gündem"].map((item) => (
                <Link
                  key={item}
                  to={`/category/${item.toLowerCase()}`}
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-8">
            {!user ? (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="relative inline-flex items-center justify-center px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white bg-black rounded-full overflow-hidden transition-all hover:bg-gray-800 active:scale-95"
                >
                  Kayıt Ol
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold border border-gray-200">
                    {user.name?.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-tight text-black">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                >
                  Çıkış
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
