import { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const hospitalsData = [
  { id: "H001", name: "City General Hospital", location: "Downtown", type: "General", beds: 250, status: "Active" },
  { id: "H002", name: "St. Mary's Medical Center", location: "Westside", type: "Specialized", beds: 180, status: "Active" },
  { id: "H003", name: "Children's Hospital", location: "Northside", type: "Pediatric", beds: 120, status: "Active" },
  { id: "H004", name: "Heart Care Institute", location: "Eastside", type: "Cardiac", beds: 90, status: "Active" },
  { id: "H005", name: "Regional Medical Center", location: "Suburb", type: "General", beds: 320, status: "Maintenance" },
];

export default function Hospitals() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Hospital Management</h1>
          <p className="text-muted-foreground">Manage and monitor all registered hospitals</p>
        </div>
        <Button className="bg-gradient-primary text-white shadow-glow hover:opacity-90 transition-opacity rounded-xl">
          <Plus className="w-4 h-4 mr-2" />
          Add Hospital
        </Button>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search hospitals..." 
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
            { key: "name", label: "Hospital Name" },
            { key: "location", label: "Location" },
            { 
              key: "type", 
              label: "Type",
              render: (value) => (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {value}
                </span>
              )
            },
            { key: "beds", label: "Total Beds" },
            { 
              key: "status", 
              label: "Status",
              render: (value) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  value === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {value}
                </span>
              )
            },
          ]}
          data={hospitalsData}
          onEdit={(row) => console.log("Edit", row)}
          onDelete={(row) => console.log("Delete", row)}
          onView={(row) => console.log("View", row)}
        />
      </div>
    </div>
  );
}
