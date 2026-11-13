import React from "react";
import { LogOut, CheckSquare } from "lucide-react";

function Navbar({ user, onLogout }) {
  const handleLogout = async () => {
    try {
        const res = await API.post("/auth/logout");

        alert(res.data.message || "Logout successful");

        window.location.href = "/login";

    } catch (error) {
        alert(error.response?.data?.message || "Logout failed");
    }
};
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur-md shadow-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-2.5 text-indigo-600">
        <CheckSquare size={25} className="shrink-0" />
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          TaskFlow
        </h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <span className="hidden text-sm font-medium text-slate-500 sm:inline">
          Welcome, <span className="text-slate-800">{user?.name || "User"}</span>
        </span>

        <button
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 focus-visible:ring-offset-2 active:scale-[0.98]"
          onClick={onLogout}
        >
          <LogOut size={17} className="shrink-0" onClick={handleLogout }/>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;