import type Preact from 'preact';
import { useEffect } from 'preact/hooks';

/**
 * Custom hook that detects clicks outside of a specified element and triggers a callback function.
 *
 * @param ref - The reference to the element that should trigger the callback when a click occurs outside of it.
 * @param onOutSideClick - The callback function to be executed when a click occurs outside of the specified element.
 * @param modalOpenerRef - (Optional) The reference to the element that opens a modal. If provided, the callback will not be triggered when a click occurs inside this element.
 */
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
