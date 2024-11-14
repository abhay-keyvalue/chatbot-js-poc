import type Preact from 'preact';
import { useEffect } from 'preact/hooks';

export const useOutsideClickAlerter = (
  ref: Preact.RefObject<HTMLElement>,
  onOutSideClick: () => void,
  modalOpenerRef: Preact.RefObject<HTMLElement> | null = null
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !ref?.current?.contains(event.target as Node) &&
        (!modalOpenerRef || !modalOpenerRef?.current?.contains(event.target as Node))
      )
        onOutSideClick();
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, modalOpenerRef, onOutSideClick]);
};
