import { DesignProvider, useDesign } from './design/DesignContext';
import { DesignSwitcher } from './components/DesignSwitcher';
import { TerminalDesign } from './design/terminal/TerminalDesign';
import { AuroraDesign } from './design/aurora/AuroraDesign';
import { EditorialDesign } from './design/editorial/EditorialDesign';

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
