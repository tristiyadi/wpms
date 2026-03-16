import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function PageLayout({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={title} />
        <main className="p-8 animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
