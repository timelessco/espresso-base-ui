import { Header } from "@/components/header"

export default function ColorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <main className="flex h-[calc(100vh-48px)] overflow-auto">
        {children}
      </main>
    </div>
  )
}
