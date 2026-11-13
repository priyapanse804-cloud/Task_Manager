import { useState } from "react";
import { Link, useNavigate } from "react-router";
import API from "../services/api";
import { toast } from "react-toastify";
const fieldClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 autofill:bg-white focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

function register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister =async (e) => {
    e.preventDefault();

         try {
            const res =await API.post(
                "/auth/register",
                form
            );

            toast.success(res.data.message || "Registration successful!");

            setForm({
        name: "",
        email: "",
        password: ""
      });
         navigate("/login");
        } catch (error) {
          console.log(error.response?.data || error);

      toast.error(
    error.response?.data?.message || "Registration failed!"
);        }

  };

  // return (
  //   <div className="mx-auto mt-16 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
  //     <h2 className="text-xl font-semibold tracking-tight text-slate-900">
  //       Register
  //     </h2>

  //     <form className="mt-5 space-y-3" onSubmit={handleRegister}>
  //       <input
  //         name="name"
  //         className={fieldClass}
  //         placeholder="Name"
  //         value={form.name}
  //         onChange={handleChange}
  //         required
  //       />

  //       <input
  //         name="email"
  //         type="email"
  //         className={fieldClass}
  //         placeholder="Email"
  //         value={form.email}
  //         onChange={handleChange}
  //         required
  //       />

  //       <input
  //         name="password"
  //         type="password"
  //         className={fieldClass}
  //         placeholder="Password"
  //         value={form.password}
  //         onChange={handleChange}
  //         required
  //       />

  //       <button
  //         type="submit"
  //         className="mt-2 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2 active:scale-[0.99]"
  //       >
  //         Register
  //       </button>
  //     </form>

  //     <p className="mt-5 text-center text-sm text-slate-500">
  //       Already have an account?
  //       <Link
  //         to="/login"
  //         className="font-medium text-indigo-600 underline-offset-2 hover:text-indigo-700 hover:underline"
  //       >
  //         {" "}Login
  //       </Link>
  //     </p>
  //   </div>
  // );


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
        Create your account
      </h3>
      <p className="mt-2 text-sm text-slate-500">
        Start managing your tasks more effectively.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleRegister}>
        <div>
          <label
            htmlFor="register-name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            className={fieldClass}
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:scale-[0.99]"
        >
          Create account
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 underline-offset-4 transition-colors hover:text-indigo-700 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}



export default register;