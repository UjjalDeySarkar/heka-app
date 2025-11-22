import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

export default function Emergency() {
  const columns = [
    { key: "id", label: "Case ID" },
    { key: "patient", label: "Patient Name" },
    { key: "type", label: "Emergency Type" },
    { key: "severity", label: "Severity" },
    { key: "location", label: "Location" },
    { key: "status", label: "Status" },
  ];

  const data = [
    {
      id: "E001",
      patient: "John Doe",
      type: "Cardiac Arrest",
      severity: <Badge variant="destructive">Critical</Badge>,
      location: "Building A, Floor 2",
      status: <Badge className="bg-yellow-500">In Progress</Badge>,
    },
    {
      id: "E002",
      patient: "Jane Smith",
      type: "Accident",
      severity: <Badge variant="destructive">High</Badge>,
      location: "Emergency Room 3",
      status: <Badge className="bg-green-500">Stable</Badge>,
    },
    {
      id: "E003",
      patient: "Robert Brown",
      type: "Respiratory Distress",
      severity: <Badge className="bg-orange-500">Medium</Badge>,
      location: "ICU Ward",
      status: <Badge className="bg-yellow-500">Under Care</Badge>,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Emergency Services</h1>
          <p className="text-muted-foreground text-lg">Manage emergency cases and response teams</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Report Emergency
        </Button>
      </div>

      <div className="glass-card p-6 rounded-2xl shadow-elevated border border-border/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search emergency cases..."
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
