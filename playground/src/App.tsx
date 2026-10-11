import { Disclosure } from './handmade/Disclosure'
import { ModalDialog } from './handmade/ModalDialog'
import { Tabs as HandmadeTabs } from './handmade/Tabs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import './App.css'

const tabItems = [
  { label: 'Overview', content: <p>Overview explains the purpose of this small accessibility lab.</p> },
  { label: 'Keyboard', content: <p>Use Left and Right Arrow to switch tabs. Home and End jump to the edges.</p> },
  { label: 'Focus', content: <p>Only the selected tab is in the page Tab order. The panel is the next stop.</p> },
]

function App() {
  return (
    <main className="playground">
      <header className="page-header">
        <p className="eyebrow">FE-05 · Accessible component fundamentals</p>
        <h1>Keyboard component playground</h1>
        <p>Three components built by hand from the W3C ARIA Authoring Practices, with shadcn/ui source installed for comparison.</p>
      </header>

      <section className="component-section" aria-labelledby="handmade-heading">
        <div className="section-heading">
          <p className="eyebrow">01 · Built by hand</p>
          <h2 id="handmade-heading">Core patterns</h2>
        </div>

        <div className="component-grid">
          <article className="component-card">
            <h3>Modal dialog</h3>
            <p>Opens with focus inside, contains Tab and Shift+Tab, closes with Escape, and returns focus to its trigger.</p>
            <ModalDialog
              triggerLabel="Open hand-built dialog"
              title="Example modal dialog"
              description="Try Tab, Shift+Tab, and Escape before closing."
            >
              <label htmlFor="modal-name">Name</label>
              <input id="modal-name" type="text" placeholder="Type here" />
            </ModalDialog>
          </article>

          <article className="component-card">
            <h3>Tabs</h3>
            <p>Automatic activation. The selected tab is the single Tab stop in its tab list.</p>
            <HandmadeTabs label="Hand-built example tabs" items={tabItems} />
          </article>

          <article className="component-card">
            <h3>Disclosure</h3>
            <p>Use Enter or Space on the button to reveal or hide the content.</p>
            <Disclosure label="Show keyboard guidance">
              <p>The content is removed from the Tab order while collapsed. Press the button again to hide it.</p>
            </Disclosure>
          </article>
        </div>
      </section>

      <section className="component-section comparison" aria-labelledby="comparison-heading">
        <div className="section-heading">
          <p className="eyebrow">02 · Source comparison</p>
          <h2 id="comparison-heading">shadcn/ui dialog and tabs</h2>
          <p>These examples use the generated files in <code>src/components/ui/</code>, backed by Radix UI.</p>
        </div>
        <div className="component-grid comparison-grid">
          <article className="component-card">
            <h3>shadcn dialog</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open shadcn dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generated dialog</DialogTitle>
                  <DialogDescription>Inspect dialog.tsx and compare its Radix primitives with the hand-built behavior.</DialogDescription>
                </DialogHeader>
                <label htmlFor="shadcn-name">Name</label>
                <input id="shadcn-name" className="comparison-input" type="text" placeholder="Type here" />
              </DialogContent>
            </Dialog>
          </article>
          <article className="component-card">
            <h3>shadcn tabs</h3>
            <ShadcnTabs defaultValue="first">
              <TabsList aria-label="shadcn example tabs">
                <TabsTrigger value="first">First</TabsTrigger>
                <TabsTrigger value="second">Second</TabsTrigger>
              </TabsList>
              <TabsContent value="first">First panel from the generated component.</TabsContent>
              <TabsContent value="second">Second panel from the generated component.</TabsContent>
            </ShadcnTabs>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
