import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import TaskForm from "../component/TaskForm";
import TaskList from "../component/TaskList";
import API from "../services/api";
import { toast } from "react-toastify";
function dashboard({ user, onLogout }) {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [editingTask, setEditingTask] = useState(null);

const toggleTask = async (task) => {
    const newStatus =
         task.status === "Pending" ? "Completed" : "Pending";;

    await updateTaskStatus(task.id, newStatus);
};


const updateTaskStatus = async (id, status) => {
    try {
        const res = await API.patch(
            `/task/${id}/status`,
            { status }
        );

        toast.success(
                res.data.message || "Task status updated successfully!"
            );

        getTasks();

    } catch (error) {
        toast.error(
                error.response?.data?.message || "Status update failed"
            );
    }
};

    const getTasks = async () => {
        try {
            const res = await API.get("/task/get");
             console.log("Tasks Data:", res.data);
            setTasks(res.data.tasks || res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const createTask = async (taskData) => {
    try {
        const res = await API.post("/task/create", taskData);

         toast.success(res.data.message || "Task added successfully!");

        getTasks();

    } catch (error) {
         toast.error(
                error.response?.data?.message || "Task creation failed"
            );
    }
};

const updateTask = async (id, taskData) => {
    try {
        const res = await API.put(
            `/task/updateTask/${id}`,
            taskData
        );

         toast.success(res.data.message || "Task updated successfully!");


        getTasks();

         setEditingTask(null);

    } catch (error) {
         toast.error(
                error.response?.data?.message || "Task update failed"
            );
    }
};

const deleteTask = async (id) => {
    try {
        const res = await API.delete(`/task/deleteTask/${id}`);

         toast.success(res.data.message || "Task deleted successfully!");

        getTasks();

    } catch (error) {
        toast.error(
                error.response?.data?.message || "Task deletion failed"
            );
    }
};
const deleteAccount = async (id) => {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete your account? All your tasks will also be deleted."
    );

    if (!confirmDelete) return;

    try {
        const res = await API.delete(`/auth/delete/${id}`);

        toast.success(
                res.data.message || "Account deleted successfully!"
            );
        localStorage.clear();
        sessionStorage.clear();

        onLogout();

    } catch (error) {
         toast.error(
                error.response?.data?.message || "Account deletion failed"
            );
    }
};
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {

        const matchesFilter =
            filter === "all" || task.status === filter;

        const matchesSearch = (task.title || "")
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });
}, [tasks, filter, search]);

const completed = tasks.filter(
    (task) => task.status === "Completed"
).length;

const pending = tasks.filter(
    (task) => task.status === "Pending"
).length;
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />

      <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
        <Sidebar filter={filter} setFilter={setFilter} />

        <main className="min-w-0 flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
            Manage your daily tasks in one place.
        </p>
    </div>

    <button
        onClick={deleteAccount}
        className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition"
    >
        Delete Account
    </button>
</div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 border-l-4 border-l-indigo-500 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Total Tasks
              </h3>
              <h2 className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                {tasks.length}
              </h2>
            </div>

            <div className="rounded-xl border border-slate-200 border-l-4 border-l-amber-500 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Pending Tasks
              </h3>
              <h2 className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                {pending}
              </h2>
            </div>

            <div className="rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Completed Tasks
              </h3>
              <h2 className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                {completed}
              </h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <section>
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  My Tasks
                </h2>

                <input
                  type="search"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-64"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <TaskList
                tasks={filteredTasks}
                onEdit={setEditingTask}
                onDelete={deleteTask}
                onToggle={toggleTask}
              />
            </section>

            <section className="lg:sticky lg:top-20">
              <TaskForm
               onAddTask={createTask}
                editingTask={editingTask}
                onUpdateTask={updateTask}
                onCancel={() => setEditingTask(null)}
              />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default dashboard;