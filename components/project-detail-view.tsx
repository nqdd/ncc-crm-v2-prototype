"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, DollarSign, Folder, Users } from "lucide-react"

type ProjectSummary = {
  id: number
  title: string
  description: string
  status: "planning" | "in-progress" | "on-hold" | "completed"
  priority?: "high" | "medium" | "low"
  owner: string
  startDate: string
  endDate: string
  progress: number
  budget: number
  spent: number
  client: string
}

type Account = {
  id: number
  name: string
  role: string
  startDate: string
  endDate: string
  rateType: "hourly" | "daily" | "monthly"
  rate: number
  currency: string
  otRate?: number
  budget?: number
}

type Comment = {
  id: number
  author: string
  content: string
  timestamp: string
}

export interface ProjectDetailViewProps {
  project: ProjectSummary
  accounts?: Account[]
  comments?: Comment[]
  onBack?: () => void
}

function getStatusColor(status: ProjectSummary["status"]) {
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

export function ProjectDetailView({ project, accounts, comments, onBack }: ProjectDetailViewProps) {
  // Fallback demo data for accounts/comments if not provided
  const derivedAccounts = useMemo<Account[]>(
    () =>
      accounts && accounts.length > 0
        ? accounts
        : [
            {
              id: 1,
              name: "Sarah Johnson",
              role: "Project Manager",
              startDate: project.startDate,
              endDate: project.endDate,
              rateType: "monthly",
              rate: 8000,
              currency: "USD",
              otRate: 0,
              budget: 96000,
            },
            {
              id: 2,
              name: "Mike Wilson",
              role: "Frontend Engineer",
              startDate: project.startDate,
              endDate: project.endDate,
              rateType: "daily",
              rate: 450,
              currency: "USD",
              otRate: 1.5,
              budget: 450 * 60,
            },
          ],
    [accounts, project.endDate, project.startDate]
  )

  const [commentInput, setCommentInput] = useState("")
  const [commentList, setCommentList] = useState<Comment[]>(
    comments && comments.length > 0
      ? comments
      : [
          {
            id: 1,
            author: "Sarah Johnson",
            content: "Kickoff completed. Next up: wireframes review.",
            timestamp: "2024-01-05 10:20",
          },
          {
            id: 2,
            author: "Mike Wilson",
            content: "Built initial UI components and layout structure.",
            timestamp: "2024-01-12 15:02",
          },
        ]
  )

  const remainingBudget = Math.max(project.budget - project.spent, 0)
  const budgetUsedPct = project.budget > 0 ? (project.spent / project.budget) * 100 : 0

  const addComment = () => {
    if (!commentInput.trim()) return
    setCommentList((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: "You",
        content: commentInput.trim(),
        timestamp: new Date().toLocaleString(),
      },
    ])
    setCommentInput("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-semibold text-foreground">Project Details</h2>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Folder className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>{project.title}</CardTitle>
              <p className="text-sm text-muted-foreground">Provider: {project.client}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusColor(project.status)} className="capitalize">
              {project.status.replace("-", " ")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-sm leading-6">{project.description}</p>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Progress</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" /> Budget
              </div>
              <div className="space-y-1">
                <p className="text-sm">
                  Total: <span className="font-medium">${project.budget.toLocaleString()}</span>
                </p>
                <p className="text-sm">
                  In-Used: <span className="font-medium">${project.spent.toLocaleString()}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Remaining: ${remainingBudget.toLocaleString()} ({budgetUsedPct.toFixed(1)}% used)
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" /> Timeline
              </div>
              <p className="text-sm">Start: <span className="font-medium">{project.startDate}</span></p>
              <p className="text-sm">End: <span className="font-medium">{project.endDate}</span></p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" /> Owner
              </div>
              <p className="text-sm">{project.owner}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Project Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>OT Rate</TableHead>
                <TableHead>Budget</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {derivedAccounts.map((acc) => (
                <TableRow key={acc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-xs">
                          {acc.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{acc.name}</div>
                        <div className="text-xs text-muted-foreground">{acc.currency}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{acc.role}</TableCell>
                  <TableCell>{acc.startDate}</TableCell>
                  <TableCell>{acc.endDate}</TableCell>
                  <TableCell>
                    {acc.rateType === "hourly" && `${acc.currency} ${acc.rate.toLocaleString()}/hr`}
                    {acc.rateType === "daily" && `${acc.currency} ${acc.rate.toLocaleString()}/day`}
                    {acc.rateType === "monthly" && `${acc.currency} ${acc.rate.toLocaleString()}/mo`}
                  </TableCell>
                  <TableCell>{acc.otRate ? `${acc.otRate}x` : "—"}</TableCell>
                  <TableCell>{acc.budget ? `${acc.currency} ${acc.budget.toLocaleString()}` : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Comments */}
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commentList.map((c) => (
              <div key={c.id} className="p-3 border rounded">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{c.author}</div>
                  <div className="text-xs text-muted-foreground">{c.timestamp}</div>
                </div>
                <p className="text-sm mt-1">{c.content}</p>
              </div>
            ))}
            <div className="space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={addComment}>Post Comment</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
