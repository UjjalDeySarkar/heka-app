import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  gradient?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, gradient = "bg-gradient-primary" }: StatCardProps) {
  return (
    <div className="stat-card group cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">{title}</p>
          <h3 className="text-4xl font-bold text-foreground mb-3 tracking-tight">{value}</h3>
          {trend && (
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                trendUp 
                  ? 'bg-success/10 text-success' 
                  : 'bg-destructive/10 text-destructive'
              }`}>
                <span>{trendUp ? '↗' : '↘'}</span>
                <span>{trend}</span>
              </div>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}
