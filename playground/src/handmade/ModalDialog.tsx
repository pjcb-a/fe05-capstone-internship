import { useLayoutEffect, useRef, useState, useId, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalDialogProps = {
  triggerLabel: string
  title: string
  description: string
  children: ReactNode
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getTabbableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => element.tabIndex >= 0 &&
      element.getClientRects().length > 0 &&
      getComputedStyle(element).visibility !== 'hidden' &&
      !element.closest('[inert]'),
  )
}

export function ModalDialog({ triggerLabel, title, description, children }: ModalDialogProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useLayoutEffect(() => {
    if (!open) return

    const dialog = dialogRef.current
    const trigger = triggerRef.current
    const appRoot = document.getElementById('root')
    if (!dialog || !appRoot) return

    const wasInert = appRoot.inert
    const previousOverflow = document.body.style.overflow
    appRoot.inert = true
    document.body.style.overflow = 'hidden'

    const focusFirst = () => (getTabbableElements(dialog)[0] ?? dialog).focus()
    focusFirst()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (event.key !== 'Tab') return
      const tabbable = getTabbableElements(dialog)
      if (tabbable.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = tabbable[0]
      const last = tabbable[tabbable.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
        event.preventDefault()
        first.focus()
      }
    }

    const onFocusIn = (event: FocusEvent) => {
      if (!dialog.contains(event.target as Node)) focusFirst()
    }

    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('focusin', onFocusIn, true)

    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('focusin', onFocusIn, true)
      appRoot.inert = wasInert
      document.body.style.overflow = previousOverflow
      if (trigger?.isConnected) trigger.focus()
    }
  }, [open])

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>
      {open && createPortal(
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false)
        }}>
          <div
            ref={dialogRef}
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
          >
            <div className="modal-heading">
              <div>
                <h3 id={titleId}>{title}</h3>
                <p id={descriptionId}>{description}</p>
              </div>
              <button type="button" aria-label="Close dialog" onClick={() => setOpen(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-actions">
              <button type="button" onClick={() => setOpen(false)}>Done</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
