import { StatCard } from "@/components/admin/StatCard";
import { DataTable } from "@/components/admin/DataTable";
import { 
  Building2, 
  Users, 
  Calendar, 
  Activity,
  TrendingUp,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const recentAppointments = [
  { id: "A001", patient: "John Doe", doctor: "Dr. Smith", time: "10:30 AM", status: "Confirmed" },
  { id: "A002", patient: "Jane Smith", doctor: "Dr. Johnson", time: "11:00 AM", status: "Pending" },
  { id: "A003", patient: "Robert Brown", doctor: "Dr. Williams", time: "2:00 PM", status: "Confirmed" },
  { id: "A004", patient: "Emily Davis", doctor: "Dr. Jones", time: "3:30 PM", status: "Cancelled" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">Dashboard Overview</h1>
          <p className="text-base text-muted-foreground">Welcome back! Here's your comprehensive system overview.</p>
        </div>
        <Button className="bg-gradient-primary text-white shadow-glow hover:shadow-elevated hover:scale-105 transition-all rounded-xl h-11 px-6 font-semibold">
          <TrendingUp className="w-5 h-5 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Hospitals"
          value="156"
          icon={Building2}
          trend="+12%"
          trendUp={true}
          gradient="bg-gradient-primary"
        />
        <StatCard
          title="Active Patients"
          value="2,847"
          icon={Users}
          trend="+8%"
          trendUp={true}
          gradient="bg-gradient-accent"
        />
        <StatCard
          title="Appointments Today"
          value="89"
          icon={Calendar}
          trend="-3%"
          trendUp={false}
          gradient="bg-gradient-success"
        />
        <StatCard
          title="Emergency Calls"
          value="24"
          icon={Activity}
          trend="+15%"
          trendUp={true}
          gradient="bg-gradient-warning"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Recent Appointments</h2>
              <p className="text-sm text-muted-foreground">Latest patient appointments and schedules</p>
            </div>
            <Button variant="ghost" className="text-primary hover:bg-primary/10 rounded-xl font-semibold">
              View All →
            </Button>
          </div>
          <DataTable
            columns={[
              { key: "id", label: "ID" },
              { key: "patient", label: "Patient" },
              { key: "doctor", label: "Doctor" },
              { key: "time", label: "Time", render: (value) => (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {value}
                </div>
              )},
              { 
                key: "status", 
                label: "Status",
                render: (value) => (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    value === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    value === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {value}
                  </span>
                )
              },
            ]}
            data={recentAppointments}
            onEdit={() => {}}
            onView={() => {}}
          />
        </div>

        <div className="space-y-6">
          <div className="enterprise-card hover-glass">
            <h3 className="text-xl font-bold text-foreground mb-5">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-gradient-primary text-white shadow-glow hover:shadow-elevated hover:scale-[1.02] transition-all rounded-xl h-12 font-semibold">
                <Building2 className="w-5 h-5 mr-3" />
                Add Hospital
              </Button>
              <Button className="w-full justify-start bg-gradient-accent text-white shadow-glow hover:shadow-elevated hover:scale-[1.02] transition-all rounded-xl h-12 font-semibold">
                <Users className="w-5 h-5 mr-3" />
                Register Patient
              </Button>
              <Button className="w-full justify-start bg-gradient-success text-white shadow-glow hover:shadow-elevated hover:scale-[1.02] transition-all rounded-xl h-12 font-semibold">
                <Calendar className="w-5 h-5 mr-3" />
                Book Appointment
              </Button>
            </div>
          </div>

          <div className="enterprise-card hover-glass">
            <h3 className="text-xl font-bold text-foreground mb-5">System Status</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-success/5 border border-success/20">
                <span className="text-sm font-semibold text-foreground">Server Status</span>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></div>
                  <span className="text-sm font-bold text-success">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-success/5 border border-success/20">
                <span className="text-sm font-semibold text-foreground">Database</span>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></div>
                  <span className="text-sm font-bold text-success">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-success/5 border border-success/20">
                <span className="text-sm font-semibold text-foreground">API Status</span>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></div>
                  <span className="text-sm font-bold text-success">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
