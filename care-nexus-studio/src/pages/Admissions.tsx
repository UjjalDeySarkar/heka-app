import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

export default function Admissions() {
  const columns = [
    { key: "id", label: "Admission ID" },
    { key: "patient", label: "Patient Name" },
    { key: "doctor", label: "Attending Doctor" },
    { key: "room", label: "Room" },
    { key: "admissionDate", label: "Admission Date" },
    { key: "status", label: "Status" },
  ];

  const data = [
    {
      id: "ADM001",
      patient: "John Doe",
      doctor: "Dr. Smith",
      room: "R101",
      admissionDate: "2024-01-20",
      status: <Badge className="bg-green-500">Active</Badge>,
    },
    {
      id: "ADM002",
      patient: "Jane Smith",
      doctor: "Dr. Johnson",
      room: "R205",
      admissionDate: "2024-01-22",
      status: <Badge className="bg-green-500">Active</Badge>,
    },
    {
      id: "ADM003",
      patient: "Robert Brown",
      doctor: "Dr. Williams",
      room: "R312",
      admissionDate: "2024-01-19",
      status: <Badge className="bg-blue-500">Discharged</Badge>,
    },
    {
      id: "ADM004",
      patient: "Emily Davis",
      doctor: "Dr. Jones",
      room: "R408",
      admissionDate: "2024-01-25",
      status: <Badge className="bg-yellow-500">Pending</Badge>,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Hospital Admissions</h1>
          <p className="text-muted-foreground text-lg">Manage patient admissions and discharges</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all">
          <Plus className="w-5 h-5 mr-2" />
          New Admission
        </Button>
      </div>

      <div className="glass-card p-6 rounded-2xl shadow-elevated border border-border/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search admissions..."
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
