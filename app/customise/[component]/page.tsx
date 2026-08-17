import CustomiseView from "../customise-view"

export default async function CustomiseComponentPage({
  params,
}: {
  params: Promise<{ component: string }>
}) {
  const { component } = await params
  return <CustomiseView active={component} />
}
