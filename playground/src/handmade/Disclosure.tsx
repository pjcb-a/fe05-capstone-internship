import { useId, useState, type ReactNode } from 'react'

type DisclosureProps = {
  label: string
  children: ReactNode
}

export function Disclosure({ label, children }: DisclosureProps) {
  const [expanded, setExpanded] = useState(false)
  const contentId = useId()

  return (
    <div className="disclosure">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded((value) => !value)}
      >
        <span aria-hidden="true">{expanded ? '▾' : '▸'}</span>
        {label}
      </button>
      <div id={contentId} hidden={!expanded}>
        {children}
      </div>
    </div>
  )
}
