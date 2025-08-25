"use client"

import { useState } from "react"
import {
  Building2,
  Globe,
  Mail,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Users,
  MapPin,
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
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for companies
const mockCompanies = [
  {
    id: 1,
    name: "Acme Corp",
    type: ["client"],
    industry: "Technology",
    size: "500-1000",
    address: "123 Business Ave, San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "contact@acmecorp.com",
    website: "https://acmecorp.com",
    owner: "John Smith",
    contacts: [
      { id: 1, name: "John Smith", title: "CEO" },
      { id: 2, name: "Jane Doe", title: "CTO" },
    ],
    deals: 5,
    totalValue: 125000,
    lastActivity: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Global Tech Inc",
    type: ["client", "partner"],
    industry: "Software",
    size: "1000+",
    address: "456 Tech Plaza, Austin, TX 78701",
    phone: "+1 (555) 987-6543",
    email: "hello@globaltech.com",
    website: "https://globaltech.com",
    owner: "Sarah Johnson",
    contacts: [
      { id: 3, name: "Sarah Johnson", title: "CTO" },
      { id: 4, name: "Mike Wilson", title: "VP Sales" },
    ],
    deals: 8,
    totalValue: 250000,
    lastActivity: "2024-01-12",
    status: "active",
  },
  {
    id: 3,
    name: "Innovate Co",
    type: ["prospect"],
    industry: "Healthcare",
    size: "100-500",
    address: "789 Innovation Dr, Boston, MA 02101",
    phone: "+1 (555) 456-7890",
    email: "info@innovate.co",
    website: "https://innovate.co",
    owner: "Michael Brown",
    contacts: [{ id: 5, name: "Michael Brown", title: "Product Manager" }],
    deals: 2,
    totalValue: 45000,
    lastActivity: "2024-01-10",
    status: "prospect",
  },
  {
    id: 4,
    name: "Startup.io",
    type: ["client"],
    industry: "Fintech",
    size: "10-50",
    address: "321 Startup Blvd, New York, NY 10001",
    phone: "+1 (555) 321-0987",
    email: "team@startup.io",
    website: "https://startup.io",
    owner: "Emily Davis",
    contacts: [{ id: 6, name: "Emily Davis", title: "Founder" }],
    deals: 3,
    totalValue: 75000,
    lastActivity: "2024-01-18",
    status: "active",
  },
]

export function CompaniesView() {
  const [companies, setCompanies] = useState(mockCompanies)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<any>(null)

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || company.type.includes(filterType)
    return matchesSearch && matchesFilter
  })

  const handleCreateCompany = () => {
    setIsCreateDialogOpen(true)
    setEditingCompany(null)
  }

  const handleEditCompany = (company: any) => {
    setEditingCompany(company)
    setIsCreateDialogOpen(true)
  }

  const handleDeleteCompany = (companyId: number) => {
    setCompanies(companies.filter((c) => c.id !== companyId))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "client":
        return "default"
      case "partner":
        return "secondary"
      case "prospect":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Companies</h2>
          <p className="text-muted-foreground">Manage your business relationships</p>
        </div>
        <Button onClick={handleCreateCompany} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Company
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.filter((c) => c.type.includes("client")).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partners</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.filter((c) => c.type.includes("partner")).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prospects</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.filter((c) => c.type.includes("prospect")).length}</div>
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
                placeholder="Search companies, industries, owners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="client">Clients</SelectItem>
                <SelectItem value="partner">Partners</SelectItem>
                <SelectItem value="prospect">Prospects</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Company List</CardTitle>
          <CardDescription>
            {filteredCompanies.length} of {companies.length} companies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Industry & Size</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Deals</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-32">{company.address.split(",")[1]}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {company.type.map((type) => (
                        <Badge key={type} variant={getTypeColor(type)} className="text-xs capitalize">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{company.industry}</p>
                      <p className="text-sm text-muted-foreground">{company.size} employees</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        <span className="truncate max-w-32">{company.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-3 w-3" />
                        <span className="truncate max-w-32">{company.website}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{company.owner}</p>
                      <p className="text-sm text-muted-foreground">{company.contacts.length} contacts</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{company.deals} deals</p>
                      <p className="text-sm text-muted-foreground">${company.totalValue.toLocaleString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{company.lastActivity}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditCompany(company)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Company
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteCompany(company.id)} className="text-destructive">
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

      {/* Create/Edit Company Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingCompany ? "Edit Company" : "Create New Company"}</DialogTitle>
            <DialogDescription>
              {editingCompany ? "Update company information" : "Add a new company to your CRM"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Acme Corp" defaultValue={editingCompany?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" placeholder="Technology" defaultValue={editingCompany?.industry} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Company Type</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="client" defaultChecked={editingCompany?.type.includes("client")} />
                  <Label htmlFor="client">Client</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="partner" defaultChecked={editingCompany?.type.includes("partner")} />
                  <Label htmlFor="partner">Partner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="prospect" defaultChecked={editingCompany?.type.includes("prospect")} />
                  <Label htmlFor="prospect">Prospect</Label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size">Company Size</Label>
                <Select defaultValue={editingCompany?.size}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="10-50">10-50 employees</SelectItem>
                    <SelectItem value="50-100">50-100 employees</SelectItem>
                    <SelectItem value="100-500">100-500 employees</SelectItem>
                    <SelectItem value="500-1000">500-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">Account Owner</Label>
                <Input id="owner" placeholder="John Smith" defaultValue={editingCompany?.owner} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="123 Business Ave, San Francisco, CA 94105"
                defaultValue={editingCompany?.address}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-email">Email</Label>
                <Input
                  id="company-email"
                  type="email"
                  placeholder="contact@company.com"
                  defaultValue={editingCompany?.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-phone">Phone</Label>
                <Input id="company-phone" placeholder="+1 (555) 123-4567" defaultValue={editingCompany?.phone} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" placeholder="https://company.com" defaultValue={editingCompany?.website} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(false)}>
              {editingCompany ? "Update Company" : "Create Company"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
