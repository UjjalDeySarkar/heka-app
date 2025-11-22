import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

export default function Hotels() {
  const columns = [
    { key: "id", label: "Hotel ID" },
    { key: "name", label: "Hotel Name" },
    { key: "location", label: "Location" },
    { key: "rooms", label: "Total Rooms" },
    { key: "available", label: "Available" },
    { key: "status", label: "Status" },
  ];

  const data = [
    {
      id: "H001",
      name: "HealthCare Inn",
      location: "Downtown, City Center",
      rooms: "120",
      available: "45",
      status: <Badge className="bg-green-500">Active</Badge>,
    },
    {
      id: "H002",
      name: "Medical Lodge",
      location: "Westside Medical District",
      rooms: "80",
      available: "22",
      status: <Badge className="bg-green-500">Active</Badge>,
    },
    {
      id: "H003",
      name: "Recovery Suites",
      location: "East Hospital Campus",
      rooms: "60",
      available: "18",
      status: <Badge className="bg-yellow-500">Maintenance</Badge>,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Patient Hotels</h1>
          <p className="text-muted-foreground text-lg">Manage accommodation facilities for patients and families</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Add Hotel
        </Button>
      </div>

      <div className="glass-card p-6 rounded-2xl shadow-elevated border border-border/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search hotels..."
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
