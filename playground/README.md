# FE-05 keyboard component playground

The hand-built React + TypeScript components are in `src/handmade/`. The generated shadcn/ui dialog and tabs source is in `src/components/ui/` and is shown on the same page for comparison.

```sh
npm install
npm run dev
```

Use only the keyboard to try the page:

- **Dialog:** Tab to “Open hand-built dialog”, then press Enter. Tab and Shift+Tab cycle among its controls. Escape closes it and returns focus to the trigger.
- **Tabs:** Tab to “Overview”. Left and Right Arrow switch tabs, wrapping at the edges; Home and End select the first and last tabs. Tab moves into the selected panel.
- **Disclosure:** Tab to “Show keyboard guidance”. Enter or Space toggles it.

The automated keyboard checks use an installed Chrome browser:

```sh
npm test
npm run build
npm run lint
```

See the repository's `NOTES.md` for the APG decisions and shadcn/ui comparison.
