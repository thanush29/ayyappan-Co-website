import { create } from 'zustand';

type Page = 'home' | 'about' | 'services' | 'projects' | 'contact';

interface StoreState {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page }),
  selectedServiceId: null,
  setSelectedServiceId: (id) => set({ selectedServiceId: id }),
  selectedProjectId: null,
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),
  isMenuOpen: false,
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
}));
