import { Link, useNavigate, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

export default function PasswordReset() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getUserId() {
      const response = await fetch(
        `http://localhost:8000/reset/${params.token}`
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setUserId(result.userId);
      }
    }
    getUserId();
  }, []);

  async function handleResetPassword(e) {
    e.preventDefault();
    console.log(userId, params.token);
    const response = await fetch(`http://localhost:8000/new-password`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        "CSRF-TOKEN": Cookie.get("CSRF-TOKEN"),
      },
      body: JSON.stringify({
        password: e.target.password.value,
        userId: userId,
        passwordToken: params.token,
      }),
    });
    if (response.ok) {
      navigate("/login");
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleResetPassword}
              method="POST"
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
