import CustomiseView from "./customise-view"

// CustomiseView lives in the layout (not the page) so it persists across
// /customise/<component> navigation instead of remounting each time — it reads
// the active component from the URL. `children` renders the (empty) page, which
// also lets app/customise/page.tsx run its redirect.
export default function CustomiseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <CustomiseView />
    </>
  )
}
