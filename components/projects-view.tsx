"use client"

import { useState } from "react"
import {
  Folder,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  User,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ProjectDetailView } from "@/components/project-detail-view"

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: "Website Redesign",
    description: "Complete overhaul of company website with modern design and improved UX",
    status: "in-progress",
    priority: "high",
    owner: "Sarah Johnson",
    startDate: "2024-01-01",
    endDate: "2024-03-15",
    progress: 65,
    budget: 50000,
    spent: 32500,
    tasks: 24,
    completedTasks: 16,
    team: ["Sarah Johnson", "Mike Wilson", "Lisa Chen"],
    client: "Internal",
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Native iOS and Android app for customer portal",
    status: "planning",
    priority: "high",
    owner: "David Brown",
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    progress: 15,
    budget: 120000,
    spent: 18000,
    tasks: 45,
    completedTasks: 7,
    team: ["David Brown", "Emily Davis", "Tom Wilson", "Anna Lee"],
    client: "Acme Corp",
  },
  {
    id: 3,
    title: "Data Migration",
    description: "Migrate legacy data to new cloud infrastructure",
    status: "completed",
    priority: "medium",
    owner: "Lisa Chen",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    progress: 100,
    budget: 25000,
    spent: 23500,
    tasks: 12,
    completedTasks: 12,
    team: ["Lisa Chen", "Robert Kim"],
    client: "Global Tech Inc",
  },
  {
    id: 4,
    title: "Security Audit",
    description: "Comprehensive security assessment and vulnerability testing",
    status: "on-hold",
    priority: "medium",
    owner: "Tom Wilson",
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    progress: 30,
    budget: 15000,
    spent: 4500,
    tasks: 8,
    completedTasks: 2,
    team: ["Tom Wilson", "Mike Wilson"],
    client: "Startup.io",
  },
  {
    id: 5,
    title: "API Integration",
    description: "Integrate third-party APIs for enhanced functionality",
    status: "in-progress",
    priority: "low",
    owner: "Emily Davis",
    startDate: "2024-01-20",
    endDate: "2024-04-15",
    progress: 40,
    budget: 35000,
    spent: 14000,
    tasks: 18,
    completedTasks: 7,
    team: ["Emily Davis", "Anna Lee", "Robert Kim"],
    client: "Innovate Co",
  },
]

export function ProjectsView() {
  const [projects, setProjects] = useState(mockProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [detailProject, setDetailProject] = useState<any>(null)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleCreateProject = () => {
    setIsCreateDialogOpen(true)
    setEditingProject(null)
  }

  const handleEditProject = (project: any) => {
    setEditingProject(project)
    setIsCreateDialogOpen(true)
  }

  const handleDeleteProject = (projectId: number) => {
    setProjects(projects.filter((p) => p.id !== projectId))
  }

  const handleViewDetails = (project: any) => {
    // Transform to the shape expected by ProjectDetailView
    const summary = {
      id: project.id,
      title: project.title,
      description: project.description,
      status: project.status,
      priority: project.priority,
      owner: project.owner,
      startDate: project.startDate,
      endDate: project.endDate,
      progress: project.progress,
      budget: project.budget,
      spent: project.spent,
      client: project.client,
    }
    setDetailProject(summary)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "planning":
        return "outline"
      case "on-hold":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "in-progress":
        return Clock
      case "planning":
        return Eye
      case "on-hold":
        return AlertCircle
      default:
        return Clock
    }
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

  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0)
  const totalSpent = projects.reduce((sum, project) => sum + project.spent, 0)
  const activeProjects = projects.filter((p) => p.status === "in-progress").length
  const completedProjects = projects.filter((p) => p.status === "completed").length

  // Show detail view if selected
  if (detailProject) {
    return (
      <ProjectDetailView
        project={detailProject}
        onBack={() => setDetailProject(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Projects</h2>
          <p className="text-muted-foreground">Manage your project portfolio</p>
        </div>
        <Button onClick={handleCreateProject} className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Project Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">{activeProjects} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">
              {((completedProjects / projects.length) * 100).toFixed(1)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}% of budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects, clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project List</CardTitle>
          <CardDescription>
            {filteredProjects.length} of {projects.length} projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Owner & Team</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => {
                const StatusIcon = getStatusIcon(project.status)
                return (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Folder className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                          <p className="text-xs text-muted-foreground">Client: {project.client}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StatusIcon className="h-4 w-4" />
                        <Badge variant={getStatusColor(project.status)} className="capitalize">
                          {project.status.replace("-", " ")}
                        </Badge>
                        <Badge variant={getPriorityColor(project.priority)} className="text-xs capitalize">
                          {project.priority}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{project.progress}%</span>
                          <span className="text-muted-foreground">
                            {project.completedTasks}/{project.tasks} tasks
                          </span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <p className="font-medium text-sm">{project.owner}</p>
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="h-6 w-6 border-2 border-background">
                              <AvatarFallback className="text-xs">
                                {member
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">+{project.team.length - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">${project.budget.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Spent: ${project.spent.toLocaleString()}</p>
                        <div className="w-full bg-muted rounded-full h-1">
                          <div
                            className="bg-primary h-1 rounded-full"
                            style={{ width: `${(project.spent / project.budget) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{project.startDate}</p>
                        <p className="text-sm text-muted-foreground">{project.endDate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(project)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditProject(project)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Project Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
            <DialogDescription>
              {editingProject ? "Update project information" : "Add a new project to your portfolio"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-title">Project Title</Label>
                <Input id="project-title" placeholder="Website Redesign" defaultValue={editingProject?.title} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input id="client" placeholder="Acme Corp" defaultValue={editingProject?.client} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Project description and objectives..."
                defaultValue={editingProject?.description}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={editingProject?.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue={editingProject?.priority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">Project Owner</Label>
                <Input id="owner" placeholder="Sarah Johnson" defaultValue={editingProject?.owner} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" defaultValue={editingProject?.startDate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" defaultValue={editingProject?.endDate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" type="number" placeholder="50000" defaultValue={editingProject?.budget} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(false)}>
              {editingProject ? "Update Project" : "Create Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
