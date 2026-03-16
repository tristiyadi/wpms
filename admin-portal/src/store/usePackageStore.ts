import { create } from "zustand";

export interface WellnessPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
  created_at: string;
  updated_at: string;
}

interface PackageState {
  packages: WellnessPackage[];
  isLoading: boolean;
  error: string | null;
  setPackages: (packages: WellnessPackage[]) => void;
  addPackage: (pkg: WellnessPackage) => void;
  updatePackage: (id: string, pkg: WellnessPackage) => void;
  removePackage: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePackageStore = create<PackageState>((set) => ({
  packages: [],
  isLoading: false,
  error: null,
  setPackages: (packages) => set({ packages }),
  addPackage: (pkg) => set((state) => ({ packages: [pkg, ...state.packages] })),
  updatePackage: (id, pkg) =>
    set((state) => ({
      packages: state.packages.map((p) => (p.id === id ? pkg : p)),
    })),
  removePackage: (id) =>
    set((state) => ({
      packages: state.packages.filter((p) => p.id !== id),
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
