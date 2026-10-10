import "./components/ColorPicker";
import { registerServiceWorker } from "./pwa/serviceWorkerRegistration";
import { initInstallChip } from "./pwa/installPrompt";

registerServiceWorker();
initInstallChip();
