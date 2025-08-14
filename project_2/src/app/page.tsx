import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-[1rem]">Backend Part of nextjs</h1>
      <Link className="text-rose-600 underline" href="/profile">Profile</Link>
      <Link className="text-rose-600 underline" href="/signup">Sign Up</Link>
      <Link className="text-rose-600 underline" href="/signin">Sign In</Link>
    </div>
  );
}
