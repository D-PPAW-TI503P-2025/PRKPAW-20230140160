import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error("Token tidak valid:", err);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-6">
      {/* Container utama */}
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full transform transition-all hover:scale-[1.02]">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-indigo-600 mb-4 text-center">
            Dashboard Pengguna
          </h1>
          <div className="w-24 h-24 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full text-3xl font-bold shadow-md mb-4">
            {user?.nama ? user.nama.charAt(0).toUpperCase() : "?"}
          </div>

          {user ? (
            <>
              <p className="text-gray-700 text-center mb-2 text-lg">
                Selamat datang,{" "}
                <span className="font-semibold text-indigo-600">
                  {user.nama}
                </span>
                !
              </p>
              <p className="text-gray-500 text-sm text-center mb-6">
                Anda login sebagai{" "}
                <span className="capitalize font-medium text-indigo-500">
                  {user.role}
                </span>
              </p>
            </>
          ) : (
            <p className="text-gray-400 mb-6">Memuat data pengguna...</p>
          )}

          <div className="flex flex-col space-y-3 w-full">
            <button
              onClick={handleLogout}
              className="py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Praktikum PAW - Dashboard
      </p>
    </div>
  );
}

export default DashboardPage;
