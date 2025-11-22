import { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const patientsData = [
  { id: "P001", name: "John Doe", age: 45, gender: "Male", contact: "+1 234-567-8901", lastVisit: "2024-01-15", status: "Active" },
  { id: "P002", name: "Jane Smith", age: 32, gender: "Female", contact: "+1 234-567-8902", lastVisit: "2024-01-20", status: "Active" },
  { id: "P003", name: "Robert Brown", age: 58, gender: "Male", contact: "+1 234-567-8903", lastVisit: "2024-01-10", status: "Discharged" },
  { id: "P004", name: "Emily Davis", age: 28, gender: "Female", contact: "+1 234-567-8904", lastVisit: "2024-01-22", status: "Active" },
  { id: "P005", name: "Michael Wilson", age: 41, gender: "Male", contact: "+1 234-567-8905", lastVisit: "2024-01-18", status: "Active" },
];

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Patient Management</h1>
          <p className="text-muted-foreground">Manage patient records and medical history</p>
        </div>
        <Button className="bg-gradient-primary text-white shadow-glow hover:opacity-90 transition-opacity rounded-xl">
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search patients..." 
              className="pl-10 glass border-glass-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="glass border-glass-border rounded-xl hover:bg-sidebar-accent">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <DataTable
          columns={[
            { key: "id", label: "Patient ID" },
            { key: "name", label: "Full Name" },
            { key: "age", label: "Age" },
            { key: "gender", label: "Gender" },
            { key: "contact", label: "Contact" },
            { key: "lastVisit", label: "Last Visit" },
            { 
              key: "status", 
              label: "Status",
              render: (value) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  value === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {value}
                </span>
              )
            },
          ]}
          data={patientsData}
          onEdit={(row) => console.log("Edit", row)}
          onDelete={(row) => console.log("Delete", row)}
          onView={(row) => console.log("View", row)}
        />
      </div>
    </div>
  );
}
