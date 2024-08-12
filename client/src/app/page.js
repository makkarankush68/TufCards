import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-between p-24 h-[80vh]">
        <h1 className="text-4xl font-bold text-center italic">
          Welcome to <span className="text-blue-500 not-italic">TufCards</span>
        </h1>
        <div className="flex gap-6">
          <Link
            href={"/cards"}
            className="bg-blue-500 flex items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
          >
            Get Started
          </Link>
          <Link
            href={"/admin"}
            className="bg-blue-500 flex items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
          >
            Admin
          </Link>
        </div>
      </main>
    </>
  );
}
