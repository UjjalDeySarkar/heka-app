import { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const doctorsData = [
  { id: "D001", name: "Dr. Sarah Johnson", specialization: "Cardiology", hospital: "City General Hospital", experience: "15 years", status: "Available" },
  { id: "D002", name: "Dr. Michael Chen", specialization: "Pediatrics", hospital: "Children's Hospital", experience: "10 years", status: "Busy" },
  { id: "D003", name: "Dr. Emily Williams", specialization: "Neurology", hospital: "Regional Medical Center", experience: "12 years", status: "Available" },
  { id: "D004", name: "Dr. James Brown", specialization: "Orthopedics", hospital: "St. Mary's Medical Center", experience: "18 years", status: "On Leave" },
  { id: "D005", name: "Dr. Lisa Anderson", specialization: "Dermatology", hospital: "City General Hospital", experience: "8 years", status: "Available" },
];

export default function Doctors() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Doctor Management</h1>
          <p className="text-muted-foreground">Manage doctor profiles and schedules</p>
        </div>
        <Button className="bg-gradient-primary text-white shadow-glow hover:opacity-90 transition-opacity rounded-xl">
          <Plus className="w-4 h-4 mr-2" />
          Add Doctor
        </Button>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search doctors..." 
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
            { key: "id", label: "ID" },
            { key: "name", label: "Doctor Name" },
            { 
              key: "specialization", 
              label: "Specialization",
              render: (value) => (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  {value}
                </span>
              )
            },
            { key: "hospital", label: "Hospital" },
            { key: "experience", label: "Experience" },
            { 
              key: "status", 
              label: "Status",
              render: (value) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  value === 'Available' ? 'bg-green-100 text-green-700' : 
                  value === 'Busy' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {value}
                </span>
              )
            },
          ]}
          data={doctorsData}
          onEdit={(row) => console.log("Edit", row)}
          onDelete={(row) => console.log("Delete", row)}
          onView={(row) => console.log("View", row)}
        />
      </div>
    </div>
  );
}
