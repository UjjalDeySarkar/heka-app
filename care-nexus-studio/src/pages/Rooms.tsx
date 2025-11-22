import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

export default function Rooms() {
  const columns = [
    { key: "id", label: "Room ID" },
    { key: "type", label: "Room Type" },
    { key: "floor", label: "Floor" },
    { key: "capacity", label: "Capacity" },
    { key: "equipment", label: "Equipment" },
    { key: "status", label: "Status" },
  ];

  const data = [
    {
      id: "R101",
      type: "ICU",
      floor: "1st Floor",
      capacity: "1 Patient",
      equipment: "Ventilator, Monitor",
      status: <Badge variant="destructive">Occupied</Badge>,
    },
    {
      id: "R205",
      type: "Private Ward",
      floor: "2nd Floor",
      capacity: "1 Patient",
      equipment: "Basic Monitoring",
      status: <Badge className="bg-green-500">Available</Badge>,
    },
    {
      id: "R312",
      type: "General Ward",
      floor: "3rd Floor",
      capacity: "4 Patients",
      equipment: "Basic Care",
      status: <Badge variant="destructive">Occupied</Badge>,
    },
    {
      id: "R408",
      type: "Emergency Room",
      floor: "4th Floor",
      capacity: "2 Patients",
      equipment: "Emergency Care",
      status: <Badge className="bg-green-500">Available</Badge>,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Room Management</h1>
          <p className="text-muted-foreground text-lg">Manage hospital rooms and facilities</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Add Room
        </Button>
      </div>

      <div className="glass-card p-6 rounded-2xl shadow-elevated border border-border/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
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
