import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

export default function Ambulances() {
  const columns = [
    { key: "id", label: "Vehicle ID" },
    { key: "driver", label: "Driver Name" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "location", label: "Current Location" },
    { key: "lastService", label: "Last Service" },
  ];

  const data = [
    {
      id: "AMB001",
      driver: "Michael Johnson",
      type: "ALS",
      status: <Badge className="bg-green-500">Available</Badge>,
      location: "Station 1",
      lastService: "2024-01-15",
    },
    {
      id: "AMB002",
      driver: "Sarah Williams",
      type: "BLS",
      status: <Badge className="bg-yellow-500">On Call</Badge>,
      location: "En Route",
      lastService: "2024-01-10",
    },
    {
      id: "AMB003",
      driver: "David Martinez",
      type: "Critical Care",
      status: <Badge className="bg-red-500">In Service</Badge>,
      location: "Hospital A",
      lastService: "2024-01-20",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Ambulance Fleet</h1>
          <p className="text-muted-foreground text-lg">Monitor and manage ambulance vehicles</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Add Ambulance
        </Button>
      </div>

      <div className="glass-card p-6 rounded-2xl shadow-elevated border border-border/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search ambulances..."
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
