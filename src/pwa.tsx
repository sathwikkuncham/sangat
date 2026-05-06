import { useCallback, useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function registerServiceWorker(): void {
  if (typeof window === 'undefined') return;
  registerSW({
    immediate: true,
    onRegistered(registration) {
      if (registration && import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.info('[sakhi] service worker registered');
      }
    },
    onRegisterError(error) {
      // eslint-disable-next-line no-console
      console.warn('[sakhi] service worker registration failed', error);
    },
  });
}

export function usePwaInstall() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };
    const installed = () => setDeferred(null);
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', installed);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installed);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === 'accepted' || choice.outcome === 'dismissed') {
      setDeferred(null);
    }
  }, [deferred]);

  return { canInstall: deferred !== null, promptInstall };
}
