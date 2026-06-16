import { lazy, Suspense } from 'react';
import { DesignProvider, useDesign } from './design/DesignContext';
import { DesignSwitcher } from './components/DesignSwitcher';
import { BackToTop } from './components/BackToTop';

// Each design is code-split so only the active variant's chunk loads. The
// shared chrome (DesignSwitcher, BackToTop) and all utilities stay in the
// main bundle. Named exports are mapped to `default` for React.lazy.
const TerminalDesign = lazy(() =>
  import('./design/terminal/TerminalDesign').then((m) => ({ default: m.TerminalDesign })),
);
const AuroraDesign = lazy(() =>
  import('./design/aurora/AuroraDesign').then((m) => ({ default: m.AuroraDesign })),
);
const EditorialDesign = lazy(() =>
  import('./design/editorial/EditorialDesign').then((m) => ({ default: m.EditorialDesign })),
);

function ActiveDesign() {
  const { design } = useDesign();
  switch (design) {
    case 'aurora':
      return <AuroraDesign />;
    case 'editorial':
      return <EditorialDesign />;
    default:
      return <TerminalDesign />;
  }
}

export default function App() {
  return (
    <DesignProvider>
      {/* DesignSwitcher/BackToTop live inside the boundary so they don't paint
          into an empty page and get shoved down when the lazy design chunk
          lands (which spikes CLS to ~1). They stay statically imported in the
          main bundle — Suspense just defers their first render until the
          active design has mounted, so everything paints in one frame. */}
      <Suspense fallback={null}>
        <ActiveDesign />
        <DesignSwitcher />
        <BackToTop />
      </Suspense>
    </DesignProvider>
  );
}
