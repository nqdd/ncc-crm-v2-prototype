"use client"

import { useState } from "react"
import {
  BarChart3,
  Building2,
  Calendar,
  ChevronDown,
  Contact,
  FileText,
  Home,
  Kanban,
  Settings,
  Shield,
  Users,
  Bell,
  Search,
  Plus,
  TrendingUp,
  DollarSign,
  Target,
  Clock,
  LogOut,
  User,
  MapPin,
  ArrowRight,
  CheckSquare,
} from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth/auth-provider"
import { ContactsView } from "@/components/contacts-view"
import { CompaniesView } from "@/components/companies-view"
import { SalesPipelineView } from "@/components/sales-pipeline-view"
import { ProjectsView } from "@/components/projects-view"
import { QuotesView } from "@/components/quotes-view"
import { ProjectKanbanView } from "@/components/project-kanban-view"
import { CalendarView } from "@/components/calendar-view"
import { AdminSettingsView } from "@/components/admin-settings-view"
import { AuditLogView } from "@/components/audit-log-view"
import { UserRolesView } from "@/components/user-roles-view"

const revenueDataDaily = [
  { period: "Mon", revenue: 8500 },
  { period: "Tue", revenue: 12300 },
  { period: "Wed", revenue: 9800 },
  { period: "Thu", revenue: 15200 },
  { period: "Fri", revenue: 11700 },
  { period: "Sat", revenue: 6900 },
  { period: "Sun", revenue: 4200 },
]

const revenueDataMonthly = [
  { period: "Jan", revenue: 45000 },
  { period: "Feb", revenue: 52000 },
  { period: "Mar", revenue: 48000 },
  { period: "Apr", revenue: 61000 },
  { period: "May", revenue: 55000 },
  { period: "Jun", revenue: 67000 },
  { period: "Jul", revenue: 72000 },
  { period: "Aug", revenue: 68000 },
  { period: "Sep", revenue: 75000 },
  { period: "Oct", revenue: 82000 },
  { period: "Nov", revenue: 78000 },
  { period: "Dec", revenue: 85000 },
]

const revenueDataYearly = [
  { period: "2020", revenue: 580000 },
  { period: "2021", revenue: 720000 },
  { period: "2022", revenue: 850000 },
  { period: "2023", revenue: 920000 },
  { period: "2024", revenue: 1050000 },
]

const dealsComparisonData = [
  { period: "Jan", lost: 8, won: 15 },
  { period: "Feb", lost: 12, won: 18 },
  { period: "Mar", lost: 6, won: 22 },
  { period: "Apr", lost: 15, won: 25 },
  { period: "May", lost: 9, won: 28 },
  { period: "Jun", lost: 11, won: 32 },
  { period: "Jul", lost: 7, won: 35 },
  { period: "Aug", lost: 13, won: 30 },
  { period: "Sep", lost: 10, won: 38 },
  { period: "Oct", lost: 8, won: 42 },
  { period: "Nov", lost: 14, won: 36 },
  { period: "Dec", lost: 12, won: 45 },
]

const pipelineData = [
  { stage: "Lead", value: 25, color: "#6366f1" },
  { stage: "Qualified", value: 35, color: "#4f46e5" },
  { stage: "Proposal", value: 20, color: "#4338ca" },
  { stage: "Negotiation", value: 15, color: "#3730a3" },
  { stage: "Closed", value: 5, color: "#312e81" },
]

const recentActivities = [
  { id: 1, type: "deal", title: "New deal created", description: "Acme Corp - $50,000", time: "2 hours ago" },
  {
    id: 2,
    type: "contact",
    title: "Contact updated",
    description: "John Smith - Updated phone number",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "meeting",
    title: "Meeting scheduled",
    description: "Product demo with TechStart Inc",
    time: "6 hours ago",
  },
  { id: 4, type: "quote", title: "Quote sent", description: "Q-2024-001 sent to Global Solutions", time: "1 day ago" },
]

const upcomingTasks = [
  { id: 1, title: "Follow up with Acme Corp", priority: "high", dueDate: "Today" },
  { id: 2, title: "Prepare proposal for TechStart", priority: "medium", dueDate: "Tomorrow" },
  { id: 3, title: "Review contract terms", priority: "low", dueDate: "This week" },
  { id: 4, title: "Update CRM data", priority: "medium", dueDate: "Next week" },
]

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Projects", icon: Kanban, url: "/projects" },
  { title: "Quotes", icon: FileText, url: "/quotes" },
  { title: "Contacts", icon: Contact, url: "/contacts" },
  { title: "Companies", icon: Building2, url: "/companies" },
]

const scrumItems = [
  { title: "Sales Pipeline", icon: Target, url: "/scrum/sales" },
  { title: "Project Kanban", icon: Kanban, url: "/scrum/projects" },
]

const adminItems = [
  { title: "Settings", icon: Settings, url: "/admin/settings" },
  { title: "Audit Log", icon: Shield, url: "/admin/audit" },
  { title: "User Roles", icon: Users, url: "/admin/roles" },
]

const mockEvents = [
  {
    id: 1,
    title: "Product Demo - Acme Corp",
    description: "Demonstrate new features to potential client",
    date: "2024-02-15",
    time: "10:00",
    duration: 60,
    type: "meeting",
    priority: "high",
    location: "Conference Room A",
    attendees: ["John Smith", "Sarah Johnson"],
    status: "confirmed",
    relatedTo: "Acme Corp",
  },
  {
    id: 2,
    title: "Team Standup",
    description: "Daily team synchronization meeting",
    date: "2024-02-15",
    time: "09:00",
    duration: 30,
    type: "meeting",
    priority: "medium",
    location: "Virtual - Zoom",
    attendees: ["Development Team"],
    status: "confirmed",
    relatedTo: "Internal",
  },
  {
    id: 3,
    title: "Client Follow-up Call",
    description: "Follow up on proposal submission",
    date: "2024-02-16",
    time: "14:00",
    duration: 45,
    type: "call",
    priority: "high",
    location: "Phone",
    attendees: ["Mike Wilson"],
    status: "pending",
    relatedTo: "Global Tech Inc",
  },
  {
    id: 4,
    title: "Project Deadline",
    description: "Website redesign project completion",
    date: "2024-02-20",
    time: "17:00",
    duration: 0,
    type: "deadline",
    priority: "high",
    location: "N/A",
    attendees: ["Project Team"],
    status: "confirmed",
    relatedTo: "Website Redesign",
  },
]

const mockTasks = [
  {
    id: "1",
    title: "Design homepage mockups",
    description: "Create wireframes and high-fidelity mockups for the new homepage",
    stage: "in-progress",
    priority: "high",
    assignee: "Sarah Johnson",
    dueDate: "2024-02-15",
    project: "Website Redesign",
    checklist: [
      { id: 1, text: "Research competitor designs", completed: true },
      { id: 2, text: "Create wireframes", completed: true },
      { id: 3, text: "Design high-fidelity mockups", completed: false },
      { id: 4, text: "Get stakeholder approval", completed: false },
    ],
    comments: 3,
    attachments: 2,
    labels: ["design", "frontend"],
  },
  {
    id: "2",
    title: "Set up development environment",
    description: "Configure local development environment with all necessary tools",
    stage: "done",
    priority: "medium",
    assignee: "Mike Wilson",
    dueDate: "2024-02-10",
    project: "Website Redesign",
    checklist: [
      { id: 1, text: "Install Node.js and npm", completed: true },
      { id: 2, text: "Set up Git repository", completed: true },
      { id: 3, text: "Configure build tools", completed: true },
    ],
    comments: 1,
    attachments: 0,
    labels: ["setup", "development"],
  },
  {
    id: "3",
    title: "API endpoint documentation",
    description: "Document all API endpoints with examples and response formats",
    stage: "todo",
    priority: "medium",
    assignee: "David Brown",
    dueDate: "2024-02-20",
    project: "Mobile App Development",
    checklist: [
      { id: 1, text: "List all endpoints", completed: false },
      { id: 2, text: "Document request/response formats", completed: false },
      { id: 3, text: "Add code examples", completed: false },
    ],
    comments: 0,
    attachments: 1,
    labels: ["documentation", "api"],
  },
  {
    id: "4",
    title: "User authentication flow",
    description: "Implement secure user authentication with JWT tokens",
    stage: "review",
    priority: "high",
    assignee: "Lisa Chen",
    dueDate: "2024-02-18",
    project: "Mobile App Development",
    checklist: [
      { id: 1, text: "Design auth flow", completed: true },
      { id: 2, text: "Implement JWT handling", completed: true },
      { id: 3, text: "Add password reset", completed: true },
      { id: 4, text: "Write unit tests", completed: false },
    ],
    comments: 5,
    attachments: 0,
    labels: ["security", "backend"],
  },
  {
    id: "5",
    title: "Database schema design",
    description: "Design and implement the database schema for user data",
    stage: "backlog",
    priority: "low",
    assignee: "Tom Wilson",
    dueDate: "2024-03-01",
    project: "Data Migration",
    checklist: [
      { id: 1, text: "Analyze current data structure", completed: false },
      { id: 2, text: "Design new schema", completed: false },
      { id: 3, text: "Create migration scripts", completed: false },
    ],
    comments: 2,
    attachments: 3,
    labels: ["database", "migration"],
  },
]

export function CRMDashboard() {
  const [activeView, setActiveView] = useState("dashboard")
  const [revenueTimeFilter, setRevenueTimeFilter] = useState("monthly")
  const { user, logout, hasPermission } = useAuth()

  const getRevenueData = () => {
    switch (revenueTimeFilter) {
      case "daily":
        return revenueDataDaily
      case "yearly":
        return revenueDataYearly
      case "monthly":
      default:
        return revenueDataMonthly
    }
  }

  const getFilteredMenuItems = () => {
    return menuItems.filter((item) => {
      switch (item.title.toLowerCase()) {
        case "projects":
          return hasPermission("projects")
        case "quotes":
          return hasPermission("deals")
        case "contacts":
          return hasPermission("contacts")
        case "companies":
          return hasPermission("companies")
        default:
          return true
      }
    })
  }

  const getFilteredAdminItems = () => {
    if (!hasPermission("admin") && !hasPermission("all")) {
      return []
    }
    return adminItems
  }

  const getUpcomingEvents = () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return mockEvents
      .filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate >= today && eventDate <= nextWeek
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 4) // Show only first 4 events
  }

  const getTaskProgressData = () => {
    const tasksByStage = mockTasks.reduce(
      (acc, task) => {
        acc[task.stage] = (acc[task.stage] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const stageColors = {
      backlog: "#6b7280",
      todo: "#3b82f6",
      "in-progress": "#f59e0b",
      review: "#f97316",
      done: "#10b981",
    }

    const stageLabels = {
      backlog: "Backlog",
      todo: "To Do",
      "in-progress": "In Progress",
      review: "Review",
      done: "Done",
    }

    return Object.entries(tasksByStage).map(([stage, count]) => ({
      name: stageLabels[stage as keyof typeof stageLabels] || stage,
      value: count,
      color: stageColors[stage as keyof typeof stageColors] || "#6b7280",
    }))
  }

  const getEventTypeInfo = (type: string) => {
    const eventTypes = [
      { value: "meeting", label: "Meeting", color: "bg-blue-100 text-blue-800" },
      { value: "call", label: "Call", color: "bg-green-100 text-green-800" },
      { value: "deadline", label: "Deadline", color: "bg-red-100 text-red-800" },
      { value: "training", label: "Training", color: "bg-purple-100 text-purple-800" },
      { value: "social", label: "Social", color: "bg-orange-100 text-orange-800" },
    ]
    return eventTypes.find((t) => t.value === type) || eventTypes[0]
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "contacts":
        return hasPermission("contacts") ? (
          <ContactsView />
        ) : (
          <div className="p-6 text-center text-muted-foreground">Access denied</div>
        )
      case "companies":
        return hasPermission("companies") ? (
          <CompaniesView 
            onNavigateToSalesPipeline={() => setActiveView("sales pipeline")}
            onNavigateToQuotes={() => setActiveView("quotes")}
          />
        ) : (
          <div className="p-6 text-center text-muted-foreground">Access denied</div>
        )
      case "projects":
        return hasPermission("projects") ? (
          <ProjectsView />
        ) : (
          <div className="p-6 text-center text-muted-foreground">Access denied</div>
        )
      case "quotes":
        return hasPermission("deals") ? (
          <QuotesView />
        ) : (
          <div className="p-6 text-center text-muted-foreground">Access denied</div>
        )
      case "sales pipeline":
        return hasPermission("deals") ? (
          <SalesPipelineView />
        ) : (
          <div className="p-6 text-center text-muted-foreground">Access denied</div>
        )
      case "project kanban":
        return hasPermission("projects") ? (
          <ProjectKanbanView />
        ) : (
          <div className="p-6 text-center text-muted-foreground">Access denied</div>
        )
      case "calendar":
        return hasPermission("calendar") ? (
          <CalendarView />
        ) : (
          <div className="p-6 text-center text-muted-foreground">Access denied</div>
        )
      case "settings":
        return hasPermission("admin") || hasPermission("all") ? (
          <AdminSettingsView />
        ) : (
          <div className="p-6 text-center text-muted-foreground">Access denied</div>
        )
      case "audit log":
        return hasPermission("admin") || hasPermission("all") ? (
          <AuditLogView />
        ) : (
          <div className="p-6 text-center text-muted-foreground">Access denied</div>
        )
      case "user roles":
        return hasPermission("admin") || hasPermission("all") ? (
          <UserRolesView />
        ) : (
          <div className="p-6 text-center text-muted-foreground">Access denied</div>
        )
      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$328,000</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">456</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">378 won</span> • <span className="text-red-600">78 lost</span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.8%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2.1%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,527</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">-5.2%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Total Revenue</CardTitle>
                      <CardDescription>Revenue trends over time</CardDescription>
                    </div>
                    <Select value={revenueTimeFilter} onValueChange={setRevenueTimeFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getRevenueData()}>
                        <XAxis dataKey="period" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="var(--color-chart-1)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Deals</CardTitle>
                  <CardDescription>Lost vs Won deals comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      lost: {
                        label: "Lost",
                        color: "hsl(var(--destructive))",
                      },
                      won: {
                        label: "Won",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dealsComparisonData}>
                        <XAxis dataKey="period" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="lost"
                          stroke="hsl(var(--destructive))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--destructive))" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="won"
                          stroke="hsl(var(--chart-2))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--chart-2))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Activity and Tasks */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates across your CRM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>Your pending action items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{task.title}</p>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                task.priority === "high"
                                  ? "destructive"
                                  : task.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {task.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>Next 7 days</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveView("calendar")}
                      className="gap-1 text-xs"
                    >
                      View All
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getUpcomingEvents().length > 0 ? (
                      getUpcomingEvents().map((event) => {
                        const typeInfo = getEventTypeInfo(event.type)
                        return (
                          <div key={event.id} className="p-3 border rounded-lg space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm line-clamp-1">{event.title}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-1">{event.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Clock className="h-3 w-3" />
                              <span>
                                {event.date} at {event.time}
                              </span>
                              <Badge className={`text-xs ${typeInfo.color}`}>{typeInfo.label}</Badge>
                              <Badge variant={getPriorityColor(event.priority)} className="text-xs">
                                {event.priority}
                              </Badge>
                            </div>
                            {event.location !== "N/A" && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span className="line-clamp-1">{event.location}</span>
                              </div>
                            )}
                          </div>
                        )
                      })
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No upcoming events</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Task Progress</CardTitle>
                      <CardDescription>Project tasks by stage</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveView("project kanban")}
                      className="gap-1 text-xs"
                    >
                      View Kanban
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ChartContainer
                      config={{
                        tasks: {
                          label: "Tasks",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getTaskProgressData()}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {getTaskProgressData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <div className="space-y-2">
                      {getTaskProgressData().map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.name}</span>
                          </div>
                          <span className="font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <CheckSquare className="h-4 w-4" />
                          Total Tasks
                        </span>
                        <span className="font-bold">{mockTasks.length}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  const filteredMenuItems = getFilteredMenuItems()
  const filteredAdminItems = getFilteredAdminItems()

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-foreground">CRM System</h2>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => setActiveView(item.title.toLowerCase())}
                        isActive={activeView === item.title.toLowerCase()}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {(hasPermission("deals") || hasPermission("projects")) && (
              <SidebarGroup>
                <SidebarGroupLabel>Scrum Board</SidebarGroupLabel>
                <SidebarGroupContent>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <BarChart3 className="h-4 w-4" />
                        <span>Boards</span>
                        <ChevronDown className="ml-auto h-4 w-4" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {scrumItems.map((item) => {
                          const hasAccess =
                            item.title === "Sales Pipeline" ? hasPermission("deals") : hasPermission("projects")
                          return hasAccess ? (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton onClick={() => setActiveView(item.title.toLowerCase())}>
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ) : null
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {hasPermission("calendar") && (
              <SidebarGroup>
                <SidebarGroupLabel>Calendar</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton onClick={() => setActiveView("calendar")}>
                        <Calendar className="h-4 w-4" />
                        <span>Events</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {filteredAdminItems.length > 0 && (
              <SidebarGroup>
                <SidebarGroupLabel>Admin Area</SidebarGroupLabel>
                <SidebarGroupContent>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Settings className="h-4 w-4" />
                        <span>Administration</span>
                        <ChevronDown className="ml-auto h-4 w-4" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {filteredAdminItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton onClick={() => setActiveView(item.title.toLowerCase())}>
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="border-b bg-background px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-semibold text-foreground capitalize">
                  {activeView === "dashboard" ? "Dashboard" : activeView}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search..." className="w-64 pl-10" />
                </div>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  New
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                        <Badge variant="outline" className="w-fit text-xs">
                          {user?.role}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">{renderActiveView()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
