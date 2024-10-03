import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="fixed w-full flex justify-end py-9 px-16 bg-slate-600">
      <button
        className="px-4 py-2 bg-black text-white"
        onClick={() => (data ? signOut() : signIn())}
      >
        {data ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
};

export default Navbar;
