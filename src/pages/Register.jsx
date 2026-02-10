import { useState } from "react";
import http from "../api/http";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const { data } = await http.post("/user_register.php", {
      name,
      email,
      password,
    });

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Kayıt başarılı, giriş yapabilirsin");
    navigate("/login");
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-10 space-y-4">
      <h1 className="text-xl font-semibold">Kayıt Ol</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="Ad Soyad"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2 rounded"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-black text-white py-2 rounded"
      >
        Kayıt Ol
      </button>
    </div>
  );
}
