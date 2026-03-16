"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Package, Users, TrendingUp, AlertCircle } from "lucide-react";
import { usePackageStore } from "@/store/usePackageStore";
import { getPackages } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

export default function Dashboard() {
  const { packages, setPackages } = usePackageStore();
  
  useEffect(() => {
    getPackages().then(setPackages).catch(console.error);
  }, [setPackages]);

  const stats = [
    { name: "Total Packages", value: packages.length, icon: Package, color: "bg-primary text-primary-foreground" },
    { name: "Total Users", value: "0", icon: Users, color: "bg-chart-2 text-white" },
    { name: "Avg. Duration", value: `${Math.round(packages.reduce((acc, p) => acc + p.duration_minutes, 0) / (packages.length || 1))}m`, icon: TrendingUp, color: "bg-chart-5 text-white" },
    { name: "Expiring soon", value: "0", icon: AlertCircle, color: "bg-destructive text-destructive-foreground" },
  ];

  return (
    <PageLayout title="Dashboard Overview">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-2.5 rounded-md shadow-sm`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                {/* <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 uppercase tracking-wider">
                  100%
                </span> */}
              </div>
              <h3 className="text-muted-foreground text-sm font-medium">{stat.name}</h3>
              <p className="text-2xl font-bold text-foreground font-sans mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick List */}
          <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
              <h3 className="font-bold text-foreground font-sans">Top Packages</h3>
              <Link href="/packages" className="text-xs font-bold text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="divide-y divide-border">
              {packages.slice(0, 5).map((pkg) => (
                <div key={pkg.id} className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground border border-border">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{pkg.name}</p>
                      <p className="text-xs text-muted-foreground">{pkg.duration_minutes} mins</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-foreground">{formatCurrency(pkg.price)}</span>
                </div>
              ))}
              {packages.length === 0 && (
                <div className="p-12 text-center text-muted-foreground/60 text-sm italic">
                  No packages initialized yet.
                </div>
              )}
            </div>
          </div>

          {/* Activity Placeholder */}
          <div className="bg-card rounded-lg border border-border shadow-sm p-6 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4 text-primary opacity-40">
               <TrendingUp className="h-10 w-10" />
             </div>
             <h3 className="font-bold text-foreground font-sans mb-2">Platform Activity</h3>
             <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
               Intelligent insights and customer acquisition trends will appear here as the system collects data.
             </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
