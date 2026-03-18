import { Header } from "@/components/header"

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col gap-3 bg-background px-5 pt-3 pb-5">
      <Header />
      <main className="flex-1 overflow-auto rounded-2xl border border-border bg-background shadow-sm shadow-black/5 scrollbar-hide dark:shadow-black/20">
        {children}
      </main>
    </div>
  )
}
