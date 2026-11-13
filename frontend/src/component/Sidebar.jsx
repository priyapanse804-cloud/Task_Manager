import React from "react";
import {
  LayoutDashboard,
  ListTodo,
  CheckCircle,
  Clock,
} from "lucide-react";

function Sidebar({ filter, setFilter }) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-1 border-b border-slate-200 bg-white px-3 py-4 md:h-full md:w-60 md:border-b-0 md:border-r md:py-6">
      <h3 className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
        Menu
      </h3>

      <button
        className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
          filter === "all"
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
        onClick={() => setFilter("all")}
      >
        <LayoutDashboard size={18} className="shrink-0" />
        All Tasks
      </button>

      <button
        className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
          filter === "pending"
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
        onClick={() => setFilter("Pending")}
      >
        <Clock size={18} className="shrink-0" />
        Pending
      </button>

      <button
        className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
          filter === "completed"
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
        onClick={() => setFilter("Completed")}
      >
        <CheckCircle size={18} className="shrink-0" />
        Completed
      </button>
    </aside>
  );
}

export default Sidebar;