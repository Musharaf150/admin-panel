import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full font-inter">
      <div className="flex-none fixed top-0 left-0 h-screen">
        <SideBar />
      </div>
      <div className="flex-grow w-full 2xl:ml-[310px] md:ml-[140px] xl:ml-[200px] sm:w-full">
        {children}
      </div>
    </main>
  );}
// }md:ml-[140px] xl:ml-[200] sm:w-full
