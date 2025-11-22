import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

export default function HomeCare() {
  const columns = [
    { key: "id", label: "Service ID" },
    { key: "patient", label: "Patient Name" },
    { key: "caregiver", label: "Caregiver" },
    { key: "serviceType", label: "Service Type" },
    { key: "schedule", label: "Schedule" },
    { key: "status", label: "Status" },
  ];

  const data = [
    {
      id: "HC001",
      patient: "Mary Johnson",
      caregiver: "Nurse Emily",
      serviceType: "Post-Surgery Care",
      schedule: "Daily, 9:00 AM",
      status: <Badge className="bg-green-500">Active</Badge>,
    },
    {
      id: "HC002",
      patient: "James Wilson",
      caregiver: "Nurse Sarah",
      serviceType: "Physical Therapy",
      schedule: "3x per week",
      status: <Badge className="bg-green-500">Active</Badge>,
    },
    {
      id: "HC003",
      patient: "Patricia Davis",
      caregiver: "Nurse Michael",
      serviceType: "Medication Management",
      schedule: "Daily, 8:00 AM",
      status: <Badge className="bg-yellow-500">Pending</Badge>,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Home Care Services</h1>
          <p className="text-muted-foreground text-lg">Manage home healthcare services and caregivers</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Schedule Service
        </Button>
      </div>

      <div className="glass-card p-6 rounded-2xl shadow-elevated border border-border/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search home care services..."
              className="pl-12 h-12 glass border-border/50 focus:border-primary/50 rounded-xl"
            />
          </div>
          <Button variant="outline" className="h-12 px-6 rounded-xl glass hover:bg-sidebar-accent border-border/50">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </Button>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
