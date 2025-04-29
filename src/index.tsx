import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import { appStore } from './store/appStore.ts';
import Example from './components/Example/';
import { SelectProvider } from './shared/Select/context/SelectContext.tsx';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <ReduxProvider store={appStore}>
    <SelectProvider>
      <Example />
    </SelectProvider>
  </ReduxProvider>
);
