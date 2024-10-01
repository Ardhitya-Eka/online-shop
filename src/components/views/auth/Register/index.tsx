import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterView = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is already registered");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <h1 className="text-3xl">register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="rounded-lg shadow dark:border p-6 space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2 text-xl w-96">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="text"
              className="border mt-2 bg-gray-100 border-none p-2"
            />
          </div>
          <div className="flex flex-col mb-2 text-xl w-96">
            <label htmlFor="fullname">Fullname</label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              className="border mt-2 bg-gray-100 border-none p-2"
            />
          </div>
          <div className="flex flex-col mb-2 text-xl w-96">
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              id="phone"
              type="text"
              className="border mt-2 bg-gray-100 border-none p-2"
            />
          </div>
          <div className="flex flex-col mb-2 text-xl w-96">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className="border mt-2 bg-gray-100 border-none p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-lg"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p>
        Have an account? sign in{" "}
        <Link href="/auth/login" className="text-blue-500">
          here
        </Link>
      </p>
    </div>
  );
};
export default RegisterView;
