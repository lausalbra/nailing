export function Picture ({ image }) {
  const t = `block h-full bg-cover ${image} bg-no-repeat bg-center clear-both`
  return (
    <picture className={t} />

  )
}
