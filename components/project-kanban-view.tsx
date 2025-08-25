"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Calendar,
  CheckSquare,
  MessageSquare,
  Paperclip,
  Flag,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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

// Task stages
const taskStages = [
  { id: "backlog", title: "Backlog", color: "bg-gray-100 border-gray-200", count: 0 },
  { id: "todo", title: "To Do", color: "bg-blue-50 border-blue-200", count: 0 },
  { id: "in-progress", title: "In Progress", color: "bg-yellow-50 border-yellow-200", count: 0 },
  { id: "review", title: "Review", color: "bg-orange-50 border-orange-200", count: 0 },
  { id: "done", title: "Done", color: "bg-green-50 border-green-200", count: 0 },
]

// Mock tasks data
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

export function ProjectKanbanView() {
  const [tasks, setTasks] = useState(mockTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterProject, setFilterProject] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<any>(null)

  // Get unique projects for filter
  const projects = Array.from(new Set(tasks.map((task) => task.project)))

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = filterProject === "all" || task.project === filterProject
    return matchesSearch && matchesProject
  })

  // Group tasks by stage
  const tasksByStage = taskStages.reduce(
    (acc, stage) => {
      acc[stage.id] = filteredTasks.filter((task) => task.stage === stage.id)
      return acc
    },
    {} as Record<string, typeof tasks>,
  )

  // Calculate stage statistics
  const stageStats = taskStages.map((stage) => ({
    ...stage,
    count: tasksByStage[stage.id]?.length || 0,
  }))

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    if (source.droppableId === destination.droppableId) return

    const updatedTasks = tasks.map((task) =>
      task.id === draggableId ? { ...task, stage: destination.droppableId } : task,
    )

    setTasks(updatedTasks)
  }

  const handleCreateTask = () => {
    setIsCreateDialogOpen(true)
    setEditingTask(null)
  }

  const handleEditTask = (task: any) => {
    setEditingTask(task)
    setIsCreateDialogOpen(true)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
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

  const getCompletedChecklistItems = (checklist: any[]) => {
    return checklist.filter((item) => item.completed).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Project Kanban</h2>
          <p className="text-muted-foreground">Manage project tasks and workflows</p>
        </div>
        <Button onClick={handleCreateTask} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tasks, assignees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterProject} onValueChange={setFilterProject}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-5 gap-4 min-h-[600px]">
          {stageStats.map((stage) => (
            <div key={stage.id} className="space-y-4">
              {/* Stage Header */}
              <Card className={`${stage.color} border-2`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{stage.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {stage.count}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Droppable Area */}
              <Droppable droppableId={stage.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-3 min-h-[400px] p-2 rounded-lg transition-colors ${
                      snapshot.isDraggingOver ? "bg-muted/50" : ""
                    }`}
                  >
                    {tasksByStage[stage.id]?.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`cursor-grab active:cursor-grabbing transition-shadow ${
                              snapshot.isDragging ? "shadow-lg" : ""
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                {/* Task Header */}
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm line-clamp-2">{task.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                      {task.description}
                                    </p>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                        <MoreHorizontal className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleEditTask(task)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Task
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="text-destructive"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>

                                {/* Labels */}
                                <div className="flex flex-wrap gap-1">
                                  {task.labels.map((label) => (
                                    <Badge key={label} variant="outline" className="text-xs">
                                      {label}
                                    </Badge>
                                  ))}
                                  <Badge variant={getPriorityColor(task.priority)} className="text-xs ml-auto">
                                    <Flag className="h-3 w-3 mr-1" />
                                    {task.priority}
                                  </Badge>
                                </div>

                                {/* Progress */}
                                {task.checklist.length > 0 && (
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CheckSquare className="h-3 w-3" />
                                    <span>
                                      {getCompletedChecklistItems(task.checklist)}/{task.checklist.length}
                                    </span>
                                  </div>
                                )}

                                {/* Assignee */}
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs">
                                      {task.assignee
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-muted-foreground">{task.assignee}</span>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{task.dueDate}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    {task.comments > 0 && (
                                      <div className="flex items-center gap-1">
                                        <MessageSquare className="h-3 w-3" />
                                        <span>{task.comments}</span>
                                      </div>
                                    )}
                                    {task.attachments > 0 && (
                                      <div className="flex items-center gap-1">
                                        <Paperclip className="h-3 w-3" />
                                        <span>{task.attachments}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Create/Edit Task Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit Task" : "Create New Task"}</DialogTitle>
            <DialogDescription>
              {editingTask ? "Update task information" : "Add a new task to the project"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input id="task-title" placeholder="Design homepage mockups" defaultValue={editingTask?.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                placeholder="Task description and requirements..."
                defaultValue={editingTask?.description}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select defaultValue={editingTask?.project}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project} value={project}>
                        {project}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignee">Assignee</Label>
                <Input id="assignee" placeholder="Sarah Johnson" defaultValue={editingTask?.assignee} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-stage">Stage</Label>
                <Select defaultValue={editingTask?.stage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {taskStages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-priority">Priority</Label>
                <Select defaultValue={editingTask?.priority}>
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
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" defaultValue={editingTask?.dueDate} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="labels">Labels (comma-separated)</Label>
              <Input
                id="labels"
                placeholder="design, frontend, urgent"
                defaultValue={editingTask?.labels?.join(", ")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(false)}>{editingTask ? "Update Task" : "Create Task"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
