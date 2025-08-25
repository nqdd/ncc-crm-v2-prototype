"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import {
  Building2,
  DollarSign,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  User,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

// Pipeline stages
const pipelineStages = [
  { id: "lead", title: "Lead", color: "bg-gray-100 border-gray-200", count: 0 },
  { id: "qualified", title: "Qualified", color: "bg-blue-50 border-blue-200", count: 0 },
  { id: "proposal", title: "Proposal", color: "bg-yellow-50 border-yellow-200", count: 0 },
  { id: "negotiation", title: "Negotiation", color: "bg-orange-50 border-orange-200", count: 0 },
  { id: "closed", title: "Closed", color: "bg-green-50 border-green-200", count: 0 },
]

// Mock deals data
const mockDeals = [
  {
    id: "1",
    title: "Enterprise Software License",
    company: "Acme Corp",
    value: 50000,
    contact: "John Smith",
    owner: "Sarah Johnson",
    stage: "qualified",
    priority: "high",
    closeDate: "2024-02-15",
    description: "Annual enterprise software license renewal",
    probability: 75,
  },
  {
    id: "2",
    title: "Cloud Migration Project",
    company: "Global Tech Inc",
    value: 125000,
    contact: "Mike Wilson",
    owner: "David Brown",
    stage: "proposal",
    priority: "high",
    closeDate: "2024-02-28",
    description: "Complete cloud infrastructure migration",
    probability: 60,
  },
  {
    id: "3",
    title: "Consulting Services",
    company: "Startup.io",
    value: 25000,
    contact: "Emily Davis",
    owner: "Lisa Chen",
    stage: "lead",
    priority: "medium",
    closeDate: "2024-03-10",
    description: "6-month consulting engagement",
    probability: 30,
  },
  {
    id: "4",
    title: "Security Audit",
    company: "Innovate Co",
    value: 15000,
    contact: "Michael Brown",
    owner: "Tom Wilson",
    stage: "negotiation",
    priority: "medium",
    closeDate: "2024-02-20",
    description: "Comprehensive security assessment",
    probability: 85,
  },
  {
    id: "5",
    title: "Training Program",
    company: "Tech Solutions",
    value: 8000,
    contact: "Anna Lee",
    owner: "Sarah Johnson",
    stage: "closed",
    priority: "low",
    closeDate: "2024-01-30",
    description: "Employee training program",
    probability: 100,
  },
  {
    id: "6",
    title: "API Integration",
    company: "Digital Corp",
    value: 35000,
    contact: "Robert Kim",
    owner: "David Brown",
    stage: "qualified",
    priority: "high",
    closeDate: "2024-03-05",
    description: "Custom API integration project",
    probability: 70,
  },
]

export function SalesPipelineView() {
  const [deals, setDeals] = useState(mockDeals)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOwner, setFilterOwner] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingDeal, setEditingDeal] = useState<any>(null)

  // Get unique owners for filter
  const owners = Array.from(new Set(deals.map((deal) => deal.owner)))

  // Filter deals
  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.contact.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOwner = filterOwner === "all" || deal.owner === filterOwner
    return matchesSearch && matchesOwner
  })

  // Group deals by stage
  const dealsByStage = pipelineStages.reduce(
    (acc, stage) => {
      acc[stage.id] = filteredDeals.filter((deal) => deal.stage === stage.id)
      return acc
    },
    {} as Record<string, typeof deals>,
  )

  // Calculate stage statistics
  const stageStats = pipelineStages.map((stage) => ({
    ...stage,
    count: dealsByStage[stage.id]?.length || 0,
    value: dealsByStage[stage.id]?.reduce((sum, deal) => sum + deal.value, 0) || 0,
  }))

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    if (source.droppableId === destination.droppableId) return

    const updatedDeals = deals.map((deal) =>
      deal.id === draggableId ? { ...deal, stage: destination.droppableId } : deal,
    )

    setDeals(updatedDeals)
  }

  const handleCreateDeal = () => {
    setIsCreateDialogOpen(true)
    setEditingDeal(null)
  }

  const handleEditDeal = (deal: any) => {
    setEditingDeal(deal)
    setIsCreateDialogOpen(true)
  }

  const handleDeleteDeal = (dealId: string) => {
    setDeals(deals.filter((d) => d.id !== dealId))
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

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const avgDealSize = totalPipelineValue / deals.length || 0
  const closedDeals = deals.filter((deal) => deal.stage === "closed")
  const conversionRate = (closedDeals.length / deals.length) * 100 || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Sales Pipeline</h2>
          <p className="text-muted-foreground">Manage your sales opportunities</p>
        </div>
        <Button onClick={handleCreateDeal} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Deal
        </Button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPipelineValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{deals.length} active deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(avgDealSize).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per opportunity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Closed won rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed This Month</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{closedDeals.length}</div>
            <p className="text-xs text-muted-foreground">
              ${closedDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()} value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search deals, companies, contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterOwner} onValueChange={setFilterOwner}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Owners</SelectItem>
                {owners.map((owner) => (
                  <SelectItem key={owner} value={owner}>
                    {owner}
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
                  <CardDescription className="text-xs">${stage.value.toLocaleString()}</CardDescription>
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
                    {dealsByStage[stage.id]?.map((deal, index) => (
                      <Draggable key={deal.id} draggableId={deal.id} index={index}>
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
                                {/* Deal Header */}
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm line-clamp-2">{deal.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{deal.company}</p>
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
                                      <DropdownMenuItem onClick={() => handleEditDeal(deal)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Deal
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => handleDeleteDeal(deal.id)}
                                        className="text-destructive"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>

                                {/* Deal Value */}
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-3 w-3 text-muted-foreground" />
                                  <span className="font-semibold text-sm">${deal.value.toLocaleString()}</span>
                                  <Badge variant={getPriorityColor(deal.priority)} className="text-xs ml-auto">
                                    {deal.priority}
                                  </Badge>
                                </div>

                                {/* Contact & Owner */}
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <User className="h-3 w-3" />
                                    <span>{deal.contact}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-5 w-5">
                                      <AvatarFallback className="text-xs">
                                        {deal.owner
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")
                                          .toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">{deal.owner}</span>
                                  </div>
                                </div>

                                {/* Close Date & Probability */}
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{deal.closeDate}</span>
                                  </div>
                                  <span>{deal.probability}%</span>
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

      {/* Create/Edit Deal Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingDeal ? "Edit Deal" : "Create New Deal"}</DialogTitle>
            <DialogDescription>
              {editingDeal ? "Update deal information" : "Add a new deal to your sales pipeline"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deal-title">Deal Title</Label>
                <Input id="deal-title" placeholder="Enterprise Software License" defaultValue={editingDeal?.title} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Corp" defaultValue={editingDeal?.company} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Deal Value</Label>
                <Input id="value" type="number" placeholder="50000" defaultValue={editingDeal?.value} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="probability">Probability (%)</Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="75"
                  defaultValue={editingDeal?.probability}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input id="contact" placeholder="John Smith" defaultValue={editingDeal?.contact} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">Deal Owner</Label>
                <Select defaultValue={editingDeal?.owner}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {owners.map((owner) => (
                      <SelectItem key={owner} value={owner}>
                        {owner}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stage">Stage</Label>
                <Select defaultValue={editingDeal?.stage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {pipelineStages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue={editingDeal?.priority}>
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
                <Label htmlFor="close-date">Expected Close Date</Label>
                <Input id="close-date" type="date" defaultValue={editingDeal?.closeDate} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Deal description and notes..."
                defaultValue={editingDeal?.description}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(false)}>{editingDeal ? "Update Deal" : "Create Deal"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
