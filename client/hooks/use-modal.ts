import { useState, useCallback } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => setIsOpen(true), []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    openModal,
    closeModal
  };
};

const useModalManager = () => {
  const [isOpenModals, seIsOpenModals] = useState<string[]>([]);

  const showModal = useCallback((modalName: string) => {
    seIsOpenModals((prev) => [...prev, modalName]);
  }, []);

  const hideModal = useCallback((modalName: string) => {
    seIsOpenModals((prev) => prev.filter((modal) => modal !== modalName));
  }, []);

  return { showModal, hideModal, isOpenModals };
};

export { useModal, useModalManager };
