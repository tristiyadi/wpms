"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WellnessPackage } from "@/store/usePackageStore";

const packageSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Package name is required" })
    .max(255, { message: "Name must be less than 255 characters" }),
  description: z
    .string()
    .max(1000, { message: "Description must be less than 1000 characters" })
    .optional()
    .or(z.literal("")),
  price: z.coerce
    .number()
    .int({ message: "Price must be a whole number" })
    .min(0, { message: "Price cannot be negative" }),
  duration_minutes: z.coerce
    .number()
    .int({ message: "Duration must be a whole number" })
    .min(1, { message: "Duration must be at least 1 minute" }),
});

type PackageFormValues = z.infer<typeof packageSchema>;

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PackageFormValues) => Promise<void>;
  initialData?: WellnessPackage | null;
  title: string;
}

export function PackageModal({ isOpen, onClose, onSubmit, initialData, title }: PackageModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration_minutes: 60,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description || "",
        price: initialData.price,
        duration_minutes: initialData.duration_minutes,
      });
    } else {
      reset({
        name: "",
        description: "",
        price: 0,
        duration_minutes: 60,
      });
    }
  }, [initialData, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
          <h3 className="text-xl font-bold font-sans text-foreground">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => onSubmit(data as PackageFormValues))} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Package Name</label>
            <input
              {...register("name")}
              placeholder="e.g. Traditional Balinese Massage"
              className={cn(
                "w-full px-4 py-2 bg-background border-2 rounded-md text-sm focus:outline-none focus:ring-2 transition-all",
                errors.name ? "border-destructive focus:ring-destructive/20" : "border-input focus:ring-primary/20"
              )}
            />
            {errors.name && <p className="text-xs text-destructive font-semibold">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Description (Optional)</label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Describe the wellness experience..."
              className="w-full px-4 py-2 bg-background border-2 border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Price (IDR)</label>
              <input
                {...register("price")}
                type="number"
                placeholder="0"
                className={cn(
                  "w-full px-4 py-2 bg-background border-2 rounded-md text-sm focus:outline-none focus:ring-2 transition-all",
                  errors.price ? "border-destructive focus:ring-destructive/20" : "border-input focus:ring-primary/20"
                )}
              />
              {errors.price && <p className="text-xs text-destructive font-semibold">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Duration (Mins)</label>
              <input
                {...register("duration_minutes")}
                type="number"
                placeholder="60"
                className={cn(
                  "w-full px-4 py-2 bg-background border-2 rounded-md text-sm focus:outline-none focus:ring-2 transition-all",
                  errors.duration_minutes ? "border-destructive focus:ring-destructive/20" : "border-input focus:ring-primary/20"
                )}
              />
              {errors.duration_minutes && <p className="text-xs text-destructive font-semibold">{errors.duration_minutes.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-background border border-input rounded-md text-sm font-bold text-foreground hover:bg-accent transition-colors shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-primary border border-primary rounded-md text-sm font-bold text-primary-foreground hover:opacity-90 transition-all shadow-sm flex items-center"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Save Changes" : "Create Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
