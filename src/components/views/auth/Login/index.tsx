import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    console.log(callbackUrl);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <h1 className="text-3xl">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="rounded-lg shadow dark:border p-6 space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2 text-xl w-96">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
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
            {isLoading ? "Loading..." : "Login"}
          </button>
          <hr className="mb-3" />
          <button
            type="submit"
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className="mt-2 bg-blue-500 text-white w-full py-2 rounded-lg"
          >
            Login With Google
          </button>
        </form>
      </div>
      <p>
        Dont have an account? Sign up{" "}
        <Link href="/auth/register" className="text-blue-500">
          here
        </Link>
      </p>
    </div>
  );
};
export default LoginView;
