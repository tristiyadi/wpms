import { describe, it, expect, beforeEach } from 'vitest';
import { usePackageStore, WellnessPackage } from './usePackageStore';

const mockPackage: WellnessPackage = {
  id: '1',
  name: 'Test Package',
  description: 'Test Description',
  price: 1000,
  duration_minutes: 60,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe('usePackageStore', () => {
  beforeEach(() => {
    // Reset the store state before each test
    const { setPackages, setLoading, setError } = usePackageStore.getState();
    setPackages([]);
    setLoading(false);
    setError(null);
  });

  it('should have initial state', () => {
    const state = usePackageStore.getState();
    expect(state.packages).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should add a package', () => {
    const { addPackage } = usePackageStore.getState();
    addPackage(mockPackage);

    const state = usePackageStore.getState();
    expect(state.packages).toHaveLength(1);
    expect(state.packages[0]).toEqual(mockPackage);
  });

  it('should update a package', () => {
    const { addPackage, updatePackage } = usePackageStore.getState();
    addPackage(mockPackage);

    const updatedPackage = { ...mockPackage, name: 'Updated Name' };
    updatePackage('1', updatedPackage);

    const state = usePackageStore.getState();
    expect(state.packages[0].name).toBe('Updated Name');
  });

  it('should remove a package', () => {
    const { addPackage, removePackage } = usePackageStore.getState();
    addPackage(mockPackage);
    expect(usePackageStore.getState().packages).toHaveLength(1);

    removePackage('1');
    expect(usePackageStore.getState().packages).toHaveLength(0);
  });

  it('should set loading state', () => {
    const { setLoading } = usePackageStore.getState();
    setLoading(true);
    expect(usePackageStore.getState().isLoading).toBe(true);

    setLoading(false);
    expect(usePackageStore.getState().isLoading).toBe(false);
  });

  it('should set error message', () => {
    const { setError } = usePackageStore.getState();
    setError('Failed to fetch');
    expect(usePackageStore.getState().error).toBe('Failed to fetch');

    setError(null);
    expect(usePackageStore.getState().error).toBe(null);
  });
});
