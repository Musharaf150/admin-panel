
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex-center min-h-screen w-full bg-slate-300">
          {children}
      </main>
    );
  }
  