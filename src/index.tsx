import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import { appStore } from './store/appStore.ts';
import { SelectProvider } from './shared/Select/context/SelectContext.tsx';
import App from './components/App/index.tsx';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <ReduxProvider store={appStore}>
    <SelectProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SelectProvider>
  </ReduxProvider>
);
