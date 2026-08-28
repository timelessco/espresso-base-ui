"use client"

import * as React from "react"

// cmdk keeps its selected item visible with Element.scrollIntoView, which also
// scrolls every scrollable ancestor – so an inline command demo below the fold
// yanks the whole docs page down on mount. Wrap a demo in <ScrollScoped> to
// rewrite scrollIntoView on its cmdk items/headings so the scroll stays inside
// the demo's own [cmdk-list], leaving the component itself untouched.

const CMDK_SELECTOR = "[cmdk-item], [cmdk-group-heading]"

function scopeNode(node: Element) {
  ;(node as HTMLElement).scrollIntoView = () => {
    const list = node.closest("[cmdk-list]")
    if (!list) return
    const nodeRect = node.getBoundingClientRect()
    const listRect = list.getBoundingClientRect()
    if (nodeRect.top < listRect.top) {
      list.scrollTop += nodeRect.top - listRect.top
    } else if (nodeRect.bottom > listRect.bottom) {
      list.scrollTop += nodeRect.bottom - listRect.bottom
    }
  }
}

export function ScrollScoped({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)

  // Layout effect: runs after the demo's DOM exists but before cmdk's
  // scheduled scroll flushes, so the patch is in place in time.
  React.useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    root.querySelectorAll(CMDK_SELECTOR).forEach(scopeNode)

    // Filtering remounts items – patch nodes added later too.
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches(CMDK_SELECTOR)) scopeNode(node)
          node.querySelectorAll(CMDK_SELECTOR).forEach(scopeNode)
        })
      }
    })
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  )
}
