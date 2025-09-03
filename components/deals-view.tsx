"use client"

import { useState } from "react"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  Flag,
  MessageSquare,
  Paperclip,
  DollarSign,
  Target,
  TrendingUp,
  User,
  MoreHorizontal,
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

// Mock deals data (enhanced from SalePipeline structure)
const mockDeals = [
  {
    id: "1",
    title: "Enterprise Software License",
    description: "Annual enterprise software license renewal",
    stage: "qualified",
    priority: "high",
    contact: "John Smith",
    owner: "Sarah Johnson",
    closeDate: "2024-02-15",
    project: "Software Licensing",
    comments: 3,
    attachments: 2,
    labels: ["enterprise", "renewal"],
    company: "Acme Corp",
    value: 50000,
    probability: 75,
  },
  {
    id: "2",
    title: "Cloud Migration Project",
    description: "Complete cloud infrastructure migration",
    stage: "proposal",
    priority: "high",
    contact: "Mike Wilson",
    owner: "David Brown",
    closeDate: "2024-02-28",
    project: "Cloud Migration",
    comments: 5,
    attachments: 3,
    labels: ["cloud", "migration"],
    company: "Global Tech Inc",
    value: 125000,
    probability: 60,
  },
  {
    id: "3",
    title: "Consulting Services",
    description: "6-month consulting engagement",
    stage: "lead",
    priority: "medium",
    contact: "Emily Davis",
    owner: "Lisa Chen",
    closeDate: "2024-03-10",
    project: "Consulting",
    comments: 1,
    attachments: 1,
    labels: ["consulting", "services"],
    company: "Startup.io",
    value: 25000,
    probability: 30,
  },
  {
    id: "4",
    title: "Security Audit",
    description: "Comprehensive security assessment",
    stage: "negotiation",
    priority: "medium",
    contact: "Michael Brown",
    owner: "Tom Wilson",
    closeDate: "2024-02-20",
    project: "Security",
    comments: 4,
    attachments: 1,
    labels: ["security", "audit"],
    company: "Innovate Co",
    value: 15000,
    probability: 85,
  },
  {
    id: "5",
    title: "Mobile App Development",
    description: "Native iOS and Android application",
    stage: "closed",
    priority: "high",
    contact: "Robert Kim",
    owner: "Emily Davis",
    closeDate: "2024-01-30",
    project: "Mobile Development",
    comments: 8,
    attachments: 5,
    labels: ["mobile", "development"],
    company: "Tech Startup",
    value: 80000,
    probability: 100,
  },
]

const stageOptions = [
  { value: "lead", label: "Lead" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal", label: "Proposal" },
  { value: "negotiation", label: "Negotiation" },
  { value: "closed", label: "Closed" },
]

export function DealsView() {
  const [deals, setDeals] = useState(mockDeals)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStage, setFilterStage] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterAssignee, setFilterAssignee] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDeal, setEditingDeal] = useState<any>(null)

  // Get unique owners for filter
  const assignees = Array.from(new Set(deals.map((deal) => deal.owner)))

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.contact.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = filterStage === "all" || deal.stage === filterStage
    const matchesPriority = filterPriority === "all" || deal.priority === filterPriority
    const matchesAssignee = filterAssignee === "all" || deal.owner === filterAssignee
    return matchesSearch && matchesStage && matchesPriority && matchesAssignee
  })

  // Calculate stats
  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const avgDealSize = totalPipelineValue / deals.length || 0
  const closedDeals = deals.filter((deal) => deal.stage === "closed")
  const conversionRate = (closedDeals.length / deals.length) * 100 || 0
  const avgProbability = deals.reduce((sum, deal) => sum + deal.probability, 0) / deals.length || 0

  const handleCreateDeal = () => {
    setIsDialogOpen(true)
    setEditingDeal(null)
  }

  const handleEditDeal = (deal: any) => {
    setEditingDeal(deal)
    setIsDialogOpen(true)
  }

  const handleDeleteDeal = (dealId: string) => {
    setDeals(deals.filter((d) => d.id !== dealId))
  }

  const handleDialogSave = () => {
    // Save or update deal
    setIsDialogOpen(false)
    setEditingDeal(null)
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "lead": return "outline"
      case "qualified": return "secondary" 
      case "proposal": return "default"
      case "negotiation": return "destructive"
      case "closed": return "default"
      default: return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "default"
      case "low": return "secondary"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Deals</h2>
          <p className="text-muted-foreground">Manage all deals in a list view</p>
        </div>
        <Button onClick={handleCreateDeal} className="gap-2">
          <Plus className="h-4 w-4" />
          New Deal
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
            <CardTitle className="text-sm font-medium">Avg Probability</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProbability.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {closedDeals.length} closed deals
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
                placeholder="Search deals, owners, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStage} onValueChange={setFilterStage}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stageOptions.map((stage) => (
                  <SelectItem key={stage.value} value={stage.value}>
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <Flag className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterAssignee} onValueChange={setFilterAssignee}>
              <SelectTrigger className="w-48">
                <User className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Owners" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Owners</SelectItem>
                {assignees.map((assignee) => (
                  <SelectItem key={assignee} value={assignee}>
                    {assignee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Deal List</CardTitle>
          <CardDescription>
            {filteredDeals.length} of {deals.length} deals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Deal Owner</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <div className="font-medium">{deal.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{deal.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{deal.company}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${deal.value?.toLocaleString() || 'N/A'}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStageColor(deal.stage)} className="capitalize">{deal.stage.replace("-", " ")}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(deal.priority)} className="capitalize text-xs">
                      {deal.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{deal.probability || 'N/A'}%</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{deal.contact}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-xs">{deal.owner.split(" ").map((n: string) => n[0]).join("").toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{deal.owner}</span>
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
                        <DropdownMenuItem onClick={() => handleEditDeal(deal)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteDeal(deal.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Create/Edit Deal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                    <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                    <SelectItem value="David Brown">David Brown</SelectItem>
                    <SelectItem value="Lisa Chen">Lisa Chen</SelectItem>
                    <SelectItem value="Tom Wilson">Tom Wilson</SelectItem>
                    <SelectItem value="Mike Davis">Mike Davis</SelectItem>
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
                    {stageOptions.map((stage) => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDialogSave}>
              {editingDeal ? "Update Deal" : "Create Deal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
