# FE-05: Accessible component fundamentals

## Patterns used

The hand-built components live in `playground/src/handmade/`; no component library is imported there. The dialog follows the [APG modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/): it has a named `role="dialog"`, `aria-modal="true"`, an inert background, focus inside on open, a contained Tab sequence, Escape to close, and focus returned to the trigger. The tabs use the [APG automatic activation pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): one tab is in the page Tab order, Left/Right Arrow wrap, Home/End jump, and the selected panel follows the tab list. This choice works because all panels are already present. The disclosure uses a native button, `aria-expanded`, `aria-controls`, and hidden content as described by the [APG disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/); the button supplies Enter and Space behavior.

## What I missed compared with shadcn/ui

I generated `playground/src/components/ui/dialog.tsx` and `tabs.tsx` with the shadcn CLI using the Radix preset. Reading those files showed that shadcn's styling wrappers pass behavior to Radix primitives rather than implementing keyboard logic in the wrapper.

1. **Configurable dialog focus.** My modal always focuses its first tabbable control (the close button) and returns to its trigger. The generated `DialogContent` passes Radix content props through, including `onOpenAutoFocus` and `onCloseAutoFocus`. Those hooks allow a caller to choose a better initial target for long content or a different return target after a workflow. My API has no equivalent. See the [Radix dialog API](https://www.radix-ui.com/primitives/docs/components/dialog).
2. **More tabs modes.** My tabs implement only horizontal, automatic activation. The generated `Tabs` passes Radix root props through and has an `orientation` prop. Radix also supports `activationMode="manual"`, where arrow keys move focus and Enter/Space activates, plus vertical Up/Down Arrow behavior. I omitted those modes. See the [Radix tabs API](https://www.radix-ui.com/primitives/docs/components/tabs).
3. **Disabled tabs and text direction.** My tab items only have a label and content, so none can be disabled, and Left/Right Arrow navigation assumes left-to-right order. Radix `TabsTrigger` accepts `disabled`, and `Tabs.Root` accepts `dir`, which the generated wrappers retain through their typed props. I would add these before reusing my tabs in a broader app.

The generated dialog also provides a composable trigger, portal, overlay, title, description, and close button; my modal combines those into one component. The generated close control includes visually hidden “Close” text, while my icon button has an `aria-label`. Both have an accessible name.

## Verification

`npm run build` compiles the TypeScript. `npm test` passed three Chrome keyboard tests covering dialog focus wrap and return, tabs arrow/Home/End behavior and panel focus, and disclosure Space/Enter toggling. `npm run lint` reports only two Fast Refresh warnings in the unmodified generated shadcn files, because those files also export style helpers.
