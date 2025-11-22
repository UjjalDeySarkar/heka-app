import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

export default function Staff() {
  const columns = [
    { key: "id", label: "Staff ID" },
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "department", label: "Department" },
    { key: "shift", label: "Shift" },
    { key: "status", label: "Status" },
  ];

  const data = [
    {
      id: "ST001",
      name: "Sarah Johnson",
      role: "Nurse",
      department: "Emergency",
      shift: "Day Shift",
      status: <Badge className="bg-green-500">On Duty</Badge>,
    },
    {
      id: "ST002",
      name: "Michael Brown",
      role: "Technician",
      department: "Radiology",
      shift: "Day Shift",
      status: <Badge className="bg-green-500">On Duty</Badge>,
    },
    {
      id: "ST003",
      name: "Emily Davis",
      role: "Receptionist",
      department: "Front Desk",
      shift: "Morning",
      status: <Badge className="bg-yellow-500">Break</Badge>,
    },
    {
      id: "ST004",
      name: "David Wilson",
      role: "Pharmacist",
      department: "Pharmacy",
      shift: "Night Shift",
      status: <Badge className="bg-gray-500">Off Duty</Badge>,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Staff Management</h1>
          <p className="text-muted-foreground text-lg">Manage hospital staff and schedules</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Add Staff
        </Button>
      </div>

      <div className="glass-card p-6 rounded-2xl shadow-elevated border border-border/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search staff members..."
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
