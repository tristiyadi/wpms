/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Plus, Search, Filter, Loader2, Edit2, Trash2, MoreVertical, Package, AlertCircle } from "lucide-react";
import { usePackageStore, WellnessPackage } from "@/store/usePackageStore";
import { getPackages, deletePackage, createPackage as apiCreatePackage, updatePackage as apiUpdatePackage } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { PackageModal } from "@/components/PackageModal";
import { toast } from "sonner";

export default function PackagesPage() {
  const { packages, setPackages, addPackage, updatePackage, removePackage, isLoading, setLoading, error, setError } = usePackageStore();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<WellnessPackage | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (err) {
        setError("Network Error: Make sure the NestJS backend is running at http://localhost:3000");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [setPackages, setLoading, setError]);

  const handleOpenCreateModal = () => {
    setEditingPackage(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (pkg: WellnessPackage) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data: any) => {
    try {
      if (editingPackage) {
        const updated = await apiUpdatePackage(editingPackage.id, data);
        updatePackage(editingPackage.id, updated);
        toast.success("Package updated successfully");
      } else {
        const created = await apiCreatePackage(data);
        addPackage(created);
        toast.success("New package created successfully");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Internal server error";
      toast.error(`Operation failed: ${errorMessage}`);
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    toast.warning("Are you sure you want to delete this package?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deletePackage(id);
            removePackage(id);
            toast.success("Package deleted successfully");
          } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Failed to delete package";
            toast.error(errorMessage);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      // Using custom class for destructive action button
      classNames: {
        actionButton: "!bg-destructive !text-destructive-foreground hover:!bg-destructive/90",
      }
    });
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout title="Packages Management">
      <div className="flex flex-col space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-4 rounded-lg border border-border shadow-2xs">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter by name..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 bg-background border border-input text-sm font-bold rounded-md text-foreground hover:bg-accent transition-all shadow-2xs">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
            <button 
              onClick={handleOpenCreateModal}
              className="inline-flex items-center px-4 py-2 bg-primary border border-primary text-sm font-bold rounded-md text-primary-foreground hover:opacity-90 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Package
            </button>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-card rounded-lg border border-border shadow-xs">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground font-semibold">Synchronizing with system...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center bg-destructive/10 border border-destructive/20 rounded-lg shadow-sm">
            <div className="bg-destructive text-destructive-foreground p-3 w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center">
               <AlertCircle className="h-6 w-6" />
            </div>
            <p className="text-destructive font-bold mb-2">Backend Connection Failed</p>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-card border border-border rounded-md text-foreground font-bold hover:bg-accent transition-colors shadow-sm"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 bg-card rounded-lg border border-border border-dashed shadow-2xs">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-4 text-muted-foreground">
              <Package className="h-10 w-10" />
            </div>
            <p className="text-foreground font-bold text-lg">No Results Found</p>
            <p className="text-muted-foreground text-sm mt-1">Try a different search term or create a new entry.</p>
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Package Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Pricing (IDR)</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Duration</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Last Updated</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {filteredPackages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-accent/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-foreground group-hover:text-primary transition-colors">{pkg.name}</div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-[300px]">{pkg.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-foreground">
                          {formatCurrency(pkg.price)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center space-x-2">
                           <span className="text-foreground font-semibold">{pkg.duration_minutes}</span>
                           <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-tighter">Minutes</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs font-medium">
                        {new Date(pkg.updated_at || pkg.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button 
                            onClick={() => handleOpenEditModal(pkg)}
                            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                           <button 
                             onClick={() => handleDelete(pkg.id)}
                             className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-all shadow-2xs"
                           >
                             <Trash2 className="h-4 w-4" />
                           </button>
                          <button className="p-2 text-muted-foreground hover:bg-accent rounded-md transition-all">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-muted/10 px-6 py-3 border-t border-border flex items-center justify-between">
               <span className="text-xs text-muted-foreground font-semibold">Showing {filteredPackages.length} packages</span>
               <div className="flex items-center space-x-4">
                  <span className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-widest">WPMS Global Store</span>
               </div>
            </div>
          </div>
        )}
      </div>

      <PackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingPackage}
        title={editingPackage ? "Edit Package" : "Add New Package"}
      />
    </PageLayout>
  );
}
