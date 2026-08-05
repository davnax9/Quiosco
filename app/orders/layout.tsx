import AdminSidebar from "@/components/admin/AdminSidebar";
import ToastNotification from "@/components/ui/ToastNotification";


export default async function OrdersLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="md:flex">

                <main className="md:flex-1 md:h-screen md:overflow-y-scroll p5">
                    { children }
                </main>
                
            </div>

            <ToastNotification />
        </>
    )
}