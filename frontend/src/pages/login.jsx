import { useState } from "react";
import { Link } from "react-router";
import API from "../services/api";
import { toast } from "react-toastify";
const fieldClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 autofill:bg-white focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

function login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]=useState("")
  const handleLogin = async(e) => {
    e.preventDefault();

     try {
            const res = await API.post(
                "/auth/login",
               {
        email,
        name,
        password
      }
            );

             toast.success(res.data.message || "Login successful!");

              const loggedInUser = {
    id: res.data.userId,
    name: res.data.name,
    email: email
};
console.log("Logged In User:", loggedInUser);

onLogin(loggedInUser);
        } catch (error) {
           console.log(error.response?.data || error);
            toast.error(
    error.response?.data?.message || "Login failed!"
);        }

    
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 11 3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            TaskManager
          </h2>
          <p className="text-xs text-slate-500">
            Organize your day, finish what matters
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold tracking-tight text-slate-900">
        Welcome back
      </h3>
      <p className="mt-2 text-sm text-slate-500">
        Sign in to continue managing your tasks.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleLogin}>
        <div>
          <label
            htmlFor="login-name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>
          <input
            id="login-name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            className={fieldClass}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:scale-[0.99]"
        >
          Sign in
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <p className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 underline-offset-4 transition-colors hover:text-indigo-700 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default login;