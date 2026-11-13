// import React from "react";
// import { Pencil, Trash2, Check } from "lucide-react";

// const priorityStyles = {
//   high: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
//   medium: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
//   low: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
// };

// function TaskCard({ task, onEdit, onDelete, onToggle }) {
//   const isCompleted = task.status === "Completed";
//   return (
//     <div
//       className={`group flex flex-col gap-4 rounded-xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:flex-row sm:items-start sm:justify-between ${
//         task.status === "completed"
//           ? "done border-slate-200/70 bg-slate-50/60 hover:border-slate-300"
//           : "border-slate-200 bg-white hover:border-slate-300"
//       }`}
//     >
//       <div className="min-w-0 flex-1">
//         <h3 className="truncate text-base font-semibold text-slate-900 [.done_&]:text-slate-400 [.done_&]:line-through">
//           {task.title}
//         </h3>

//         <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500">
//           {task.description || "No description"}
//         </p>

//         <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
//           <span
//             className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${
//               priorityStyles[task.priority?.toLowerCase()] ??
//               "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
//             }`}
//           >
//             {task.priority}
//           </span>

//           <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600 before:h-1.5 before:w-1.5 before:rounded-full before:bg-current">
//             {task.status === "completed" ? "Completed" : "Pending"}
//           </span>

//           {task.due_date && (
//             <span className="tabular-nums text-slate-500">
//               Due: {String(task.due_date).slice(0, 10)}
//             </span>
//           )}
//         </div>
//       </div>

//       <div className="flex shrink-0 items-center gap-1.5">
//         <button
//           className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 transition-colors duration-200 hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
//           onClick={() => onToggle(task)}
//           title="Change status"
//         >
//           <Check size={18} />
//         </button>

//         <button
//           className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
//           onClick={() => onEdit(task)}
//         >
//           <Pencil size={18} />
//         </button>

//         <button
//           className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors duration-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40"
//           onClick={() => onDelete(task.id)}
//         >
//           <Trash2 size={18} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TaskCard;





import React from "react";
import { Pencil, Trash2, Check } from "lucide-react";

const priorityStyles = {
  high: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  medium: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  low: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
};

function TaskCard({ task, onEdit, onDelete, onToggle }) {

  const isCompleted = task.status?.toLowerCase() === "completed";

  return (
    <div
      className={`group flex flex-col gap-4 rounded-xl border p-4 shadow-sm transition-all duration-200 sm:flex-row sm:items-start sm:justify-between ${
        isCompleted
          ? "border-slate-200 bg-slate-100"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <div className="min-w-0 flex-1">

        <h3
          className={`truncate text-base font-semibold ${
            isCompleted
              ? "text-slate-400 line-through"
              : "text-slate-900"
          }`}
        >
          {task.title}
        </h3>

        <p
          className={`mt-1 line-clamp-2 text-sm leading-relaxed ${
            isCompleted
              ? "text-slate-400 line-through"
              : "text-slate-500"
          }`}
        >
          {task.description || "No description"}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">

          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${
              priorityStyles[task.priority?.toLowerCase()] ??
              "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            {task.priority}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
            {isCompleted ? "Completed" : "Pending"}
          </span>

          {task.due_date && (
            <span className="tabular-nums text-slate-500">
              Due: {String(task.due_date).slice(0, 10)}
            </span>
          )}

        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">

        {/* Complete Button */}
        <button
          disabled={isCompleted}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
            isCompleted
              ? "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400"
              : "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
          }`}
          onClick={() => onToggle(task)}
          title="Change status"
        >
          <Check size={18} />
        </button>

        {/* Edit Button */}
        <button
          disabled={isCompleted}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
            isCompleted
              ? "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400"
              : "border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          <Pencil size={18} />
        </button>

        {/* Delete Button */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
}

export default TaskCard;
