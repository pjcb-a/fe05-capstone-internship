import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

type TabItem = {
  label: string
  content: ReactNode
}

type TabsProps = {
  label: string
  items: readonly TabItem[]
}

export function Tabs({ label, items }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const id = useId()

  if (items.length === 0) return null

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % items.length
        break
      case 'ArrowLeft':
        nextIndex = (index - 1 + items.length) % items.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = items.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    setActiveIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="handmade-tabs">
      <div role="tablist" aria-label={label}>
        {items.map((item, index) => (
          <button
            key={index}
            ref={(element) => { tabRefs.current[index] = element }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={activeIndex === index}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          tabIndex={activeIndex === index ? 0 : -1}
          hidden={activeIndex !== index}
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}
