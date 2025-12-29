import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

export type PopupVariant = 'success' | 'error' | 'info' | 'warning';

export type PopupAction = {
  label: string;
  onPress: () => void;
};

export type PopupActions = {
  primary?: PopupAction;
  secondary?: PopupAction;
};

export type PopupOptions = {
  title?: string;
  message: string;
  variant?: PopupVariant;
  durationMs?: number; // 0 => stay until dismissed
  action?: PopupAction;
  actions?: PopupActions;
  closeLabel?: string;
};

export type PopupState = {
  visible: boolean;
  title?: string;
  message: string;
  variant: PopupVariant;
  action?: PopupAction;
  actions?: PopupActions;
  closeLabel?: string;
};

type PopupContextValue = {
  popup: PopupState;
  showPopup: (options: PopupOptions) => void;
  hidePopup: () => void;
};

const PopupContext = createContext<PopupContextValue | null>(null);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [popup, setPopup] = useState<PopupState>({
    visible: false,
    title: undefined,
    message: '',
    variant: 'info',
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hidePopup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPopup((prev) => ({ ...prev, visible: false }));
  }, []);

  const showPopup = useCallback(
    ({ title, message, variant = 'info', durationMs = 2200, action, actions, closeLabel }: PopupOptions) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      setPopup({
        visible: true,
        title,
        message,
        variant,
        action,
        actions,
        closeLabel,
      });

      if (durationMs > 0) {
        timerRef.current = setTimeout(() => {
          timerRef.current = null;
          setPopup((prev) => ({ ...prev, visible: false }));
        }, durationMs);
      }
    },
    []
  );

  const value = useMemo(() => ({ popup, showPopup, hidePopup }), [popup, showPopup, hidePopup]);

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>;
}

export function usePopup() {
  const ctx = useContext(PopupContext);
  if (!ctx) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return ctx;
}
