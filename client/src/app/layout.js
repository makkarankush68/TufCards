import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TufCards",
  description: "Made by Ankush Makkar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " custom-gradient"}>
        <nav className="flex p-4 justify-between">
          <Link
            href={"/"}
            className="text-lg text-blue-500 font-bold flex items-center"
          >
            TufCards
          </Link>
          <Link
            href={"/admin"}
            className="p-2 border border-slate-500 rounded-md active:bg-slate-800"
          >
            Admin
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
