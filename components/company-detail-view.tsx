"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, User, Building2, DollarSign, FileText, Users, Mail, Phone, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for a company detail
const mockCompanyDetail = {
  id: 1,
  name: "Test Company 7427",
  initials: "T",
  avatar: "",
  color: "#8b5cf6",
  salesOwner: "Sales Owner",
  adminUser: "Admin User",
  contacts: [
    { id: 1, name: "Tamara Orn", title: "Internal Solutions Supervisor", stage: "Churned", avatar: "/placeholder-user.jpg" },
    { id: 2, name: "Orville Streich", title: "Investor Communications Representative", stage: "Won", avatar: "/placeholder-user.jpg" },
    { id: 3, name: "Edgar Howell", title: "Internal Applications Engineer", stage: "Churned", avatar: "/placeholder-user.jpg" },
  ] as Array<{ name: string; title: string; stage?: string; avatar: string; id: number }>,
  deals: [] as Array<{ title: string; stage?: string; amount: number; probability: number; id: number }>,
  quotes: [
    { id: 1, title: "Intelligent Steel Shirt", amount: 12708.60, stage: "Draft", participants: ["/placeholder-user.jpg", "/placeholder-user.jpg"] },
    { id: 2, title: "Oriental Bronze Chair", amount: 8496.00, stage: "Accepted", participants: ["/placeholder-user.jpg", "/placeholder-user.jpg"] },
    { id: 3, title: "Elegant Frozen Towels", amount: 9746.80, stage: "Draft", participants: ["/placeholder-user.jpg", "/placeholder-user.jpg"] },
    { id: 4, title: "Luxurious Metal Pizza", amount: 5215.60, stage: "Sent", participants: ["/placeholder-user.jpg", "/placeholder-user.jpg"] },
    { id: 5, title: "Awesome Steel Mouse", amount: 4578.40, stage: "Accepted", participants: ["/placeholder-user.jpg", "/placeholder-user.jpg"] },
  ] as Array<{ title: string; stage?: string; amount: number; participants: string[]; id: number }>,
  notes: [
    { id: 1, author: "Creed Bratton", content: "Laborum nemo sunt perferendis molestiae quidem. Praesentium sint praesentium. Atque perspiciatis unde ex ut architecto architecto ratione.", timestamp: "October 17, 2024 - 6:55pm", avatar: "/placeholder-user.jpg" },
    { id: 2, author: "Ryan Howard", content: "Itaque modi eum molestias laudantium maiores ipsum. Suscipit dolores placeat odit justo ab minima pariatur necessitatibus minus.", timestamp: "September 23, 2024 - 2:43am", avatar: "/placeholder-user.jpg" },
    { id: 3, author: "Toby Flenderson", content: "Earum quis architecto soluta.", timestamp: "September 22, 2024 - 2:56pm", avatar: "/placeholder-user.jpg" },
  ] as Array<{ author: string; content: string; timestamp: string; avatar: string; id: number }>,
  companyInfo: {
    size: "",
    totalRevenue: "",
    industry: "",
    businessType: "",
    country: "",
    website: ""
  }
};

interface CompanyDetailViewProps {
  company?: typeof mockCompanyDetail;
  onBack?: () => void;
  onNavigateToSalesPipeline?: () => void;
  onNavigateToQuotes?: () => void;
}

export function CompanyDetailView({ 
  company = mockCompanyDetail, 
  onBack, 
  onNavigateToSalesPipeline, 
  onNavigateToQuotes 
}: CompanyDetailViewProps) {
  const [newNote, setNewNote] = useState("");
  const [companyInfo, setCompanyInfo] = useState(company.companyInfo || {
    size: "",
    totalRevenue: "",
    industry: "",
    businessType: "",
    country: "",
    website: ""
  });

  const getStageColor = (stage?: string) => {
    if (!stage) return "outline";
    switch (stage.toLowerCase()) {
      case "won": return "default";
      case "churned": return "destructive";
      case "accepted": return "default";
      case "draft": return "secondary";
      case "sent": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Companies
      </Button>

      {/* Company Header */}
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-lg flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: company.color }}>
          {company.initials}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{company.name}</h1>
          <div className="flex gap-4 mt-2">
            <Badge variant="secondary" className="gap-1">
              <User className="h-3 w-3" />
              {company.salesOwner}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Users className="h-3 w-3" />
              {company.adminUser}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contacts Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle>Contacts</CardTitle>
                <span className="text-sm text-muted-foreground">Total contacts: {company.contacts.length}</span>
              </div>
            </CardHeader>
            <CardContent>
              {company.contacts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No contacts yet</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add new contact
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="flex items-center gap-2">
                          Name <Search className="h-4 w-4 text-muted-foreground" />
                        </TableHead>
                        <TableHead className="flex items-center gap-2">
                          Title <Search className="h-4 w-4 text-muted-foreground" />
                        </TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(company.contacts || []).map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={contact.avatar} />
                                <AvatarFallback className="text-xs">
                                  {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{contact.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span>{contact.title}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStageColor(contact.stage)}>
                              {contact.stage}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-between items-center pt-2">
                    <Button variant="link" className="text-blue-600 p-0">
                      <Plus className="h-4 w-4 mr-1" />
                      Add new contact
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">←</Button>
                      <span className="text-sm">1</span>
                      <Button variant="outline" size="sm">→</Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Deals Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <CardTitle>Deals</CardTitle>
                <span className="text-sm text-muted-foreground">Total deal amount: $0.00</span>
              </div>
            </CardHeader>
            <CardContent>
              {(company.deals || []).length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No deals yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={onNavigateToSalesPipeline}
                  >
                    <Plus className="h-4 w-4" />
                    Add deals through sales pipeline
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {(company.deals || []).map((deal, idx) => (
                    <div key={idx} className="p-3 border rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{deal.title}</p>
                          <p className="text-sm text-muted-foreground">{deal.stage}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${deal.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{deal.probability}% probability</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quotes Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <CardTitle>Quotes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {(company.quotes || []).length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No quotes yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={onNavigateToQuotes}
                  >
                    <Plus className="h-4 w-4" />
                    Add quotes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="flex items-center gap-2">
                          Quote Title <Search className="h-4 w-4 text-muted-foreground" />
                        </TableHead>
                        <TableHead>Total amount</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(company.quotes || []).map((quote) => (
                        <TableRow key={quote.id}>
                          <TableCell>
                            <span className="font-medium">{quote.title}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">${quote.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStageColor(quote.stage)}>
                              {quote.stage}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex -space-x-2">
                              {quote.participants.map((participant, idx) => (
                                <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                                  <AvatarImage src={participant} />
                                  <AvatarFallback className="text-xs">U</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-between items-center pt-2">
                    <div></div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">←</Button>
                      <span className="text-sm">1</span>
                      <Button variant="outline" size="sm">→</Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add new note */}
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="text-xs">YU</AvatarFallback>
                </Avatar>
                <Input
                  placeholder="Add your note"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              {/* Notes timeline */}
              <div className="space-y-4">
                {(company.notes || []).map((note) => (
                  <div key={note.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={note.avatar} />
                      <AvatarFallback className="text-xs">
                        {note.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{note.author}</span>
                        <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Company Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Company size</label>
                <div className="mt-1">
                  {companyInfo.size ? (
                    <p className="text-sm">{companyInfo.size}</p>
                  ) : (
                    <Button variant="link" className="p-0 h-auto text-blue-600" size="sm">
                      Add Company size
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Total revenue</label>
                <div className="mt-1">
                  {companyInfo.totalRevenue ? (
                    <p className="text-sm">{companyInfo.totalRevenue}</p>
                  ) : (
                    <Button variant="link" className="p-0 h-auto text-blue-600" size="sm">
                      Add Total revenue
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Industry</label>
                <div className="mt-1">
                  {companyInfo.industry ? (
                    <p className="text-sm">{companyInfo.industry}</p>
                  ) : (
                    <Button variant="link" className="p-0 h-auto text-blue-600" size="sm">
                      Add Industry
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Business type</label>
                <div className="mt-1">
                  {companyInfo.businessType ? (
                    <p className="text-sm">{companyInfo.businessType}</p>
                  ) : (
                    <Button variant="link" className="p-0 h-auto text-blue-600" size="sm">
                      Add Business type
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Country</label>
                <div className="mt-1">
                  {companyInfo.country ? (
                    <p className="text-sm">{companyInfo.country}</p>
                  ) : (
                    <Button variant="link" className="p-0 h-auto text-blue-600" size="sm">
                      Add Country
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Website</label>
                <div className="mt-1">
                  {companyInfo.website ? (
                    <a href={companyInfo.website} className="text-sm text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                      {companyInfo.website}
                    </a>
                  ) : (
                    <Button variant="link" className="p-0 h-auto text-blue-600" size="sm">
                      Add Website
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
