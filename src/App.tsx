import { DesignProvider, useDesign } from './design/DesignContext';
import { DesignSwitcher } from './components/DesignSwitcher';
import { TerminalDesign } from './design/terminal/TerminalDesign';
import { AuroraDesign } from './design/aurora/AuroraDesign';
import { EditorialDesign } from './design/editorial/EditorialDesign';

// All three designs ship in the main bundle (eager). Code-splitting the
// non-default variants was net-negative: switching to one meant an extra
// chunk round-trip behind a blank screen, which tanked FCP/LCP for Aurora
// and Editorial. Since every design needs to score well, eager wins.
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
      <ActiveDesign />
      <DesignSwitcher />
    </DesignProvider>
  );
}
