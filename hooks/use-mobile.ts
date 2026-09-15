import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Tri-state: `undefined` until the viewport is measured on the client. Pages
// that switch whole layouts (MobileShell vs sidebar) should render nothing
// while undefined, instead of flashing the desktop tree on phones — the
// server can't know the viewport, so SSR and the first client render agree
// on "unknown".
export function useIsMobileState() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}

export function useIsMobile() {
  return !!useIsMobileState()
}
