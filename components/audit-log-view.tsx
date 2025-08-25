"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, Calendar, User, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock audit log data
const mockAuditLogs = [
  {
    id: 1,
    timestamp: "2024-02-15 14:30:25",
    user: "John Admin",
    action: "CREATE",
    resource: "Contact",
    resourceId: "contact_123",
    details: "Created new contact: Sarah Johnson",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 121.0.0.0",
    severity: "info",
  },
  {
    id: 2,
    timestamp: "2024-02-15 14:25:10",
    user: "Jane Manager",
    action: "UPDATE",
    resource: "Deal",
    resourceId: "deal_456",
    details: "Updated deal status from 'Proposal' to 'Negotiation'",
    ipAddress: "192.168.1.101",
    userAgent: "Firefox 122.0",
    severity: "info",
  },
  {
    id: 3,
    timestamp: "2024-02-15 14:20:45",
    user: "System",
    action: "DELETE",
    resource: "Company",
    resourceId: "company_789",
    details: "Deleted company: Old Corp (automated cleanup)",
    ipAddress: "127.0.0.1",
    userAgent: "System Process",
    severity: "warning",
  },
  {
    id: 4,
    timestamp: "2024-02-15 14:15:30",
    user: "Bob Sales",
    action: "LOGIN",
    resource: "Authentication",
    resourceId: "auth_001",
    details: "User logged in successfully",
    ipAddress: "192.168.1.102",
    userAgent: "Safari 17.2",
    severity: "info",
  },
  {
    id: 5,
    timestamp: "2024-02-15 14:10:15",
    user: "Unknown",
    action: "LOGIN_FAILED",
    resource: "Authentication",
    resourceId: "auth_002",
    details: "Failed login attempt for user: admin@company.com",
    ipAddress: "203.0.113.1",
    userAgent: "curl/7.68.0",
    severity: "error",
  },
  {
    id: 6,
    timestamp: "2024-02-15 14:05:00",
    user: "Alice Support",
    action: "EXPORT",
    resource: "Report",
    resourceId: "report_001",
    details: "Exported sales report for Q1 2024",
    ipAddress: "192.168.1.103",
    userAgent: "Chrome 121.0.0.0",
    severity: "info",
  },
]

const actionTypes = ["ALL", "CREATE", "UPDATE", "DELETE", "LOGIN", "LOGIN_FAILED", "EXPORT"]
const severityTypes = ["ALL", "info", "warning", "error"]

export function AuditLogView() {
  const [logs, setLogs] = useState(mockAuditLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState("ALL")
  const [filterSeverity, setFilterSeverity] = useState("ALL")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAction = filterAction === "ALL" || log.action === filterAction
    const matchesSeverity = filterSeverity === "ALL" || log.severity === filterSeverity
    return matchesSearch && matchesAction && matchesSeverity
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "destructive"
      case "warning":
        return "secondary"
      case "info":
      default:
        return "default"
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "CREATE":
        return "bg-green-100 text-green-800"
      case "UPDATE":
        return "bg-blue-100 text-blue-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      case "LOGIN":
        return "bg-purple-100 text-purple-800"
      case "LOGIN_FAILED":
        return "bg-red-100 text-red-800"
      case "EXPORT":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Audit Log</h2>
          <p className="text-muted-foreground">Track all system activities and changes</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.filter((l) => l.action === "LOGIN_FAILED").length}</div>
            <p className="text-xs text-muted-foreground">Security alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Changes</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {logs.filter((l) => ["CREATE", "UPDATE", "DELETE"].includes(l.action)).length}
            </div>
            <p className="text-xs text-muted-foreground">CRUD operations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logs.filter((l) => l.user !== "System").map((l) => l.user)).size}
            </div>
            <p className="text-xs text-muted-foreground">Unique users today</p>
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
                placeholder="Search logs by user, action, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action === "ALL" ? "All Actions" : action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {severityTypes.map((severity) => (
                  <SelectItem key={severity} value={severity}>
                    {severity === "ALL" ? "All Severity" : severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            {filteredLogs.length} of {logs.length} events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{log.timestamp.split(" ")[0]}</p>
                      <p className="text-muted-foreground">{log.timestamp.split(" ")[1]}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {log.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getActionColor(log.action)}`}>{log.action}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{log.resource}</p>
                      <p className="text-muted-foreground text-xs">{log.resourceId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm max-w-md truncate" title={log.details}>
                      {log.details}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(log.severity)} className="capitalize">
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{log.ipAddress}</p>
                      <p className="text-muted-foreground text-xs truncate max-w-24" title={log.userAgent}>
                        {log.userAgent}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
