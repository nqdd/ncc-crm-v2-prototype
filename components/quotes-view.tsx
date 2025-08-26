"use client";

import { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuoteDetailView } from "./quote-detail-view";


// Mock companies (copied from CompaniesView for consistency)
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
];

const mockQuotes = [
  {
    id: 1,
    title: "Electronic Frozen Shoes",
    companyId: 1,
    amount: 7103.6,
    stage: "Sent",
    participants: [
      {
        participant: "Oliver Pool",
        avatar: "", // No avatar
        color: "#ef4444",
        "text-color": "#fff"
      },
      {
        participant: "Tina Olsen",
        avatar: "", // No avatar
        color: "#3b82f6",
        "text-color": "#fff"
      }
    ],
    createdAt: "10 months ago",
  },
  {
    id: 2,
    title: "Elegant Wooden Chair",
    companyId: 1,
    amount: 9310.2,
    stage: "Draft",
    participants: [
      {
        participant: "Paul Smith",
        avatar: "", // No avatar
        color: "#f59e42",
        "text-color": "#fff"
      },
      {
        participant: "Tina Olsen",
        avatar: "", // No avatar
        color: "#3b82f6",
        "text-color": "#fff"
      }
    ],
    createdAt: "10 months ago",
  },
  {
    id: 3,
    title: "Licensed Plastic Keyboard",
    companyId: 1,
    amount: 15835.6,
    stage: "Accepted",
    participants: [
      {
        participant: "Kate Miller",
        avatar: "", // No avatar
        color: "#10b981",
        "text-color": "#fff"
      },
      {
        participant: "Tina Olsen",
        avatar: "", // No avatar
        color: "#3b82f6",
        "text-color": "#fff"
      }
    ],
    createdAt: "10 months ago",
  },
  // ...add more as needed
];

const stageColors: Record<string, string> = {
  Sent: "secondary",
  Draft: "outline",
  Accepted: "default",
};

export function QuotesView() {
  const [quotes, setQuotes] = useState(mockQuotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editQuote, setEditQuote] = useState<typeof mockQuotes[0] | null>(null);
  const [detailQuote, setDetailQuote] = useState<typeof mockQuotes[0] | null>(null);

  const filteredQuotes = quotes.filter((q) => {
    const companyName = mockCompanies.find((c) => c.id === q.companyId)?.name || "";
    const matchesSearch =
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStage === "all" || q.stage === filterStage;
    return matchesSearch && matchesFilter;
  });

  const totalQuotes = quotes.length;
  const sentQuotes = quotes.filter((q) => q.stage === "Sent").length;
  const acceptedQuotes = quotes.filter((q) => q.stage === "Accepted").length;
  const draftQuotes = quotes.filter((q) => q.stage === "Draft").length;
  const totalAmount = quotes.reduce((sum, q) => sum + q.amount, 0);


  // Form state for dialog
  const [form, setForm] = useState({
    title: "",
    companyId: mockCompanies[0]?.id || 1,
    amount: "",
    stage: "Draft",
    participants: "",
    createdAt: ""
  });

  // Open dialog and set form state
  const openNewQuoteDialog = () => {
    setEditQuote(null);
    setForm({
      title: "",
      companyId: mockCompanies[0]?.id || 1,
      amount: "",
      stage: "Draft",
      participants: "",
      createdAt: ""
    });
    setModalOpen(true);
  };

  const openEditQuoteDialog = (q: typeof mockQuotes[0]) => {
    setEditQuote(q);
    setForm({
      title: q.title,
      companyId: q.companyId,
      amount: q.amount.toString(),
      stage: q.stage,
      participants: q.participants.map((p) => p.participant).join(", "),
      createdAt: q.createdAt
    });
    setModalOpen(true);
  };

  // Save handler (mock, does not persist)
  const handleSave = () => {
    setModalOpen(false);
    setEditQuote(null);
    // You can implement actual add/edit logic here
  };

  // Dialog component
  const renderModal = () => (
    <Dialog open={modalOpen} onOpenChange={(open) => { setModalOpen(open); if (!open) setEditQuote(null); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editQuote ? "Edit Quote" : "New Quote"}</DialogTitle>
          <DialogDescription>
            {editQuote ? "Update quote information" : "Add a new quote to your CRM"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="quote-title">Title</Label>
            <Input id="quote-title" placeholder="Quote title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Select value={form.companyId.toString()} onValueChange={v => setForm(f => ({ ...f, companyId: Number(v) }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                {mockCompanies.map(c => (
                  <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="0.00" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stage">Stage</Label>
            <Select value={form.stage} onValueChange={v => setForm(f => ({ ...f, stage: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Sent">Sent</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="participants">Participants</Label>
            <Input id="participants" placeholder="Comma separated names" value={form.participants} onChange={e => setForm(f => ({ ...f, participants: e.target.value }))} />
            <div className="text-xs text-muted-foreground">Example: John Doe, Jane Smith</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="createdAt">Created At</Label>
            <Input id="createdAt" placeholder="e.g. 2024-01-01 or 10 months ago" value={form.createdAt} onChange={e => setForm(f => ({ ...f, createdAt: e.target.value }))} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => { setModalOpen(false); setEditQuote(null); }}>Cancel</Button>
          <Button onClick={handleSave}>{editQuote ? "Update Quote" : "Create Quote"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (detailQuote) {
    // Compose detail data from quote and company
    const company = mockCompanies.find(c => c.id === detailQuote.companyId);
    const detailData = {
      id: detailQuote.id,
      title: detailQuote.title,
      company: {
        name: company?.name || "Unknown Company",
        country: company?.industry || "",
        website: company?.website || "",
        logo: "/placeholder-logo.png"
      },
      preparedBy: detailQuote.participants[0]?.participant || "",
      preparedFor: detailQuote.participants[1]?.participant || "",
      stages: ["Draft", "Sent", "Accepted"],
      currentStage: detailQuote.stage,
      products: [
        { title: "Intelligent Concrete Tuna", unitPrice: 1000, quantity: 10, discount: 13, total: 8700 },
        { title: "Intelligent Wooden Gloves", unitPrice: 1000, quantity: 8, discount: 41, total: 4720 },
      ],
      subtotal: 13420,
      salesTax: 18,
      total: 15835.6,
      notes: `Dolorum voluptatibus blanditiis ea. Quidem assumenda voluptates amet quo nam magni laboriosam praesentium. Eius distinctio reiciendis cum quibusdam.\nSuscipit repudiandae quos ea ab praesentium. Quam voluptates itaque rerum quis tempore labore dicta. Aperiam rerum deserunt vel ipsa culpa quod sint porro voluptatem.`
    };
    return <QuoteDetailView quote={detailData} onBack={() => setDetailQuote(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Quotes</h2>
          <p className="text-muted-foreground">Manage your sales quotes</p>
        </div>
        <Button className="gap-2" onClick={openNewQuoteDialog}>
          <Plus className="h-4 w-4" />
          New Quote
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuotes}</div>
            <p className="text-xs text-muted-foreground">${totalAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sentQuotes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acceptedQuotes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftQuotes}</div>
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
                placeholder="Search quotes, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="border rounded px-3 py-2 text-sm"
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
            >
              <option value="all">All Stages</option>
              <option value="Sent">Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quote List</CardTitle>
          <CardDescription>
            {filteredQuotes.length} of {quotes.length} quotes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[500px]">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-white">
                <TableRow>
                  <TableHead className="sticky top-0 bg-white">Title</TableHead>
                  <TableHead className="sticky top-0 bg-white">Company</TableHead>
                  <TableHead className="sticky top-0 bg-white">Total Amount</TableHead>
                  <TableHead className="sticky top-0 bg-white">Stage</TableHead>
                  <TableHead className="sticky top-0 bg-white">Participants</TableHead>
                  <TableHead className="sticky top-0 bg-white">Created at</TableHead>
                  <TableHead className="sticky top-0 bg-white">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((q) => (
                <TableRow key={q.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{q.title}</p>
                        <p className="text-xs text-muted-foreground">{
                          mockCompanies.find((c) => c.id === q.companyId)?.name || "Unknown Company"
                        }</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{mockCompanies.find((c) => c.id === q.companyId)?.name || "Unknown Company"}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">${q.amount.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={stageColors[q.stage] as any || "outline"} className="capitalize">
                      {q.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {q.participants.map((p, idx) => {
                        const names = p.participant.split(" ");
                        const initials = names.length >= 2
                          ? names[0][0] + names[names.length - 1][0]
                          : names[0][0];
                        return (
                          <div
                            key={idx}
                            className="relative group"
                            style={{ display: "inline-block" }}
                          >
                            {p.avatar ? (
                              <img
                                src={p.avatar}
                                alt={p.participant}
                                className="w-7 h-7 rounded-full object-cover border"
                                style={{ borderColor: p.color, background: p.color }}
                              />
                            ) : (
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border"
                                style={{ background: p.color, color: p["text-color"], borderColor: p.color }}
                              >
                                {initials}
                              </div>
                            )}
                            <div
                              className="absolute left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 z-10 whitespace-nowrap pointer-events-none"
                              style={{ top: "110%" }}
                            >
                              {p.participant}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{q.createdAt}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setDetailQuote(q)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditQuoteDialog(q)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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
          </div>
        </CardContent>
      </Card>
      {renderModal()}
    </div>
  );
}
