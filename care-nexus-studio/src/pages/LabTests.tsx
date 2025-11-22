import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

export default function LabTests() {
  const columns = [
    { key: "id", label: "Test ID" },
    { key: "patient", label: "Patient Name" },
    { key: "testType", label: "Test Type" },
    { key: "doctor", label: "Ordered By" },
    { key: "date", label: "Test Date" },
    { key: "status", label: "Status" },
  ];

  const data = [
    {
      id: "LAB001",
      patient: "John Doe",
      testType: "Blood Test (CBC)",
      doctor: "Dr. Smith",
      date: "2024-01-25",
      status: <Badge className="bg-green-500">Completed</Badge>,
    },
    {
      id: "LAB002",
      patient: "Jane Smith",
      testType: "X-Ray Chest",
      doctor: "Dr. Johnson",
      date: "2024-01-26",
      status: <Badge className="bg-yellow-500">In Progress</Badge>,
    },
    {
      id: "LAB003",
      patient: "Robert Brown",
      testType: "MRI Scan",
      doctor: "Dr. Williams",
      date: "2024-01-27",
      status: <Badge className="bg-blue-500">Scheduled</Badge>,
    },
    {
      id: "LAB004",
      patient: "Emily Davis",
      testType: "Urine Analysis",
      doctor: "Dr. Jones",
      date: "2024-01-25",
      status: <Badge className="bg-green-500">Completed</Badge>,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Laboratory Tests</h1>
          <p className="text-muted-foreground text-lg">Manage lab tests and results</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Order Test
        </Button>
      </div>

      <div className="glass-card p-6 rounded-2xl shadow-elevated border border-border/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search lab tests..."
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
