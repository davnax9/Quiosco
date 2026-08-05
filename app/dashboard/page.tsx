import Dashboard from "@/components/ui/Dashboard";
import Link from "next/link";

export default function page() {
  return (
    <>
        <h1 className="text-center mt-20 text-6xl font-black">Dashboard</h1>
        <div className="mt-3 flex justify-end">
          <Link href={`/order/cafe`} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer rounded-lg">
              Ir a menu
          </Link>
        </div>

        <Dashboard />
    </>
  )
}
