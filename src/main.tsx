import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[HerbWise PWA] New version available, reloading in background');
  },
  onOfflineReady() {
    console.log('[HerbWise PWA] Application cached and ready for offline use');
  },
});

createRoot(document.getElementById('root')!).render(<App />);
