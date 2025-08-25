"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Shield, Users, Crown, UserCheck } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for users and roles
const mockUsers = [
  {
    id: 1,
    name: "John Admin",
    email: "john.admin@company.com",
    role: "Administrator",
    status: "active",
    lastLogin: "2024-02-15 14:30",
    permissions: ["all"],
  },
  {
    id: 2,
    name: "Jane Manager",
    email: "jane.manager@company.com",
    role: "Manager",
    status: "active",
    lastLogin: "2024-02-15 13:45",
    permissions: ["contacts", "companies", "deals", "projects"],
  },
  {
    id: 3,
    name: "Bob Sales",
    email: "bob.sales@company.com",
    role: "Sales Rep",
    status: "active",
    lastLogin: "2024-02-15 12:20",
    permissions: ["contacts", "companies", "deals"],
  },
  {
    id: 4,
    name: "Alice Support",
    email: "alice.support@company.com",
    role: "Support",
    status: "inactive",
    lastLogin: "2024-02-14 16:10",
    permissions: ["contacts", "companies"],
  },
]

const mockRoles = [
  {
    id: 1,
    name: "Administrator",
    description: "Full system access with all permissions",
    userCount: 1,
    permissions: ["all"],
    color: "destructive",
  },
  {
    id: 2,
    name: "Manager",
    description: "Management access to most features",
    userCount: 1,
    permissions: ["contacts", "companies", "deals", "projects", "reports"],
    color: "default",
  },
  {
    id: 3,
    name: "Sales Rep",
    description: "Sales-focused access to contacts and deals",
    userCount: 1,
    permissions: ["contacts", "companies", "deals"],
    color: "secondary",
  },
  {
    id: 4,
    name: "Support",
    description: "Limited access for customer support",
    userCount: 1,
    permissions: ["contacts", "companies"],
    color: "outline",
  },
]

const availablePermissions = [
  { id: "contacts", label: "Contacts Management", description: "Create, read, update, delete contacts" },
  { id: "companies", label: "Companies Management", description: "Manage company information" },
  { id: "deals", label: "Deals & Pipeline", description: "Access sales pipeline and deals" },
  { id: "projects", label: "Project Management", description: "Manage projects and tasks" },
  { id: "reports", label: "Reports & Analytics", description: "View reports and analytics" },
  { id: "calendar", label: "Calendar & Events", description: "Manage calendar and events" },
  { id: "admin", label: "Admin Settings", description: "System administration access" },
  { id: "users", label: "User Management", description: "Manage users and roles" },
]

export function UserRolesView() {
  const [users, setUsers] = useState(mockUsers)
  const [roles, setRoles] = useState(mockRoles)
  const [searchTerm, setSearchTerm] = useState("")
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [editingRole, setEditingRole] = useState<any>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateUser = () => {
    setIsUserDialogOpen(true)
    setEditingUser(null)
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setIsUserDialogOpen(true)
  }

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  const handleCreateRole = () => {
    setIsRoleDialogOpen(true)
    setEditingRole(null)
  }

  const handleEditRole = (role: any) => {
    setEditingRole(role)
    setIsRoleDialogOpen(true)
  }

  const handleDeleteRole = (roleId: number) => {
    setRoles(roles.filter((r) => r.id !== roleId))
  }

  const getRoleIcon = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case "administrator":
        return Crown
      case "manager":
        return Shield
      case "sales rep":
        return UserCheck
      default:
        return Users
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">User & Role Management</h2>
          <p className="text-muted-foreground">Manage users, roles, and permissions</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* User Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">Registered users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</div>
                <p className="text-xs text-muted-foreground">Currently active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Administrators</CardTitle>
                <Crown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.filter((u) => u.role === "Administrator").length}</div>
                <p className="text-xs text-muted-foreground">Admin users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Roles</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{roles.length}</div>
                <p className="text-xs text-muted-foreground">Defined roles</p>
              </CardContent>
            </Card>
          </div>

          {/* User Search and Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleCreateUser} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                {filteredUsers.length} of {users.length} users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const RoleIcon = getRoleIcon(user.role)
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <RoleIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{user.role}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"} className="capitalize">
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.permissions.includes("all") ? (
                              <Badge variant="destructive" className="text-xs">
                                All
                              </Badge>
                            ) : (
                              user.permissions.slice(0, 2).map((perm) => (
                                <Badge key={perm} variant="outline" className="text-xs">
                                  {perm}
                                </Badge>
                              ))
                            )}
                            {user.permissions.length > 2 && !user.permissions.includes("all") && (
                              <Badge variant="outline" className="text-xs">
                                +{user.permissions.length - 2}
                              </Badge>
                            )}
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
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-destructive">
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
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          {/* Role Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-end">
                <Button onClick={handleCreateRole} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Role
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Roles Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => {
              const RoleIcon = getRoleIcon(role.name)
              return (
                <Card key={role.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RoleIcon className="h-5 w-5" />
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditRole(role)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteRole(role.id)} className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Users</span>
                        <Badge variant="outline">{role.userCount}</Badge>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">Permissions</span>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.includes("all") ? (
                            <Badge variant="destructive" className="text-xs">
                              All Permissions
                            </Badge>
                          ) : (
                            role.permissions.slice(0, 3).map((perm) => (
                              <Badge key={perm} variant="outline" className="text-xs">
                                {perm}
                              </Badge>
                            ))
                          )}
                          {role.permissions.length > 3 && !role.permissions.includes("all") && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* User Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Create New User"}</DialogTitle>
            <DialogDescription>
              {editingUser ? "Update user information and permissions" : "Add a new user to the system"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-name">Full Name</Label>
                <Input id="user-name" placeholder="John Doe" defaultValue={editingUser?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" type="email" placeholder="john@company.com" defaultValue={editingUser?.email} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-role">Role</Label>
              <select className="w-full p-2 border rounded" defaultValue={editingUser?.role}>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsUserDialogOpen(false)}>{editingUser ? "Update User" : "Create User"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRole ? "Edit Role" : "Create New Role"}</DialogTitle>
            <DialogDescription>
              {editingRole ? "Update role information and permissions" : "Define a new role with specific permissions"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input id="role-name" placeholder="Sales Manager" defaultValue={editingRole?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>
              <Input
                id="role-description"
                placeholder="Manages sales team and processes"
                defaultValue={editingRole?.description}
              />
            </div>
            <div className="space-y-3">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-3">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-2">
                    <Checkbox id={permission.id} defaultChecked={editingRole?.permissions?.includes(permission.id)} />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor={permission.id} className="text-sm font-medium">
                        {permission.label}
                      </Label>
                      <p className="text-xs text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsRoleDialogOpen(false)}>{editingRole ? "Update Role" : "Create Role"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
