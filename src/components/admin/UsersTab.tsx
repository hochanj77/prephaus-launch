import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Plus, Pencil, Key, Trash2, Shield, AlertCircle, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
}

async function adminUsersAction(action: string, payload: Record<string, unknown> = {}) {
  const { data, error } = await supabase.functions.invoke("admin-users", {
    body: { action, ...payload },
  });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data;
}

export default function UsersTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState<AuthUser | null>(null);
  const [passwordUser, setPasswordUser] = useState<AuthUser | null>(null);

  // Form state
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("user");
  const [editEmail, setEditEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  const { data: users = [], isLoading } = useQuery<AuthUser[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const result = await adminUsersAction("list");
      return result.users || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: () => adminUsersAction("create", { email: newEmail, password: newPassword, role: newRole }),
    onSuccess: () => {
      toast({ title: "User Created", description: `Account created for ${newEmail}` });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setCreateOpen(false);
      setNewEmail("");
      setNewPassword("");
      setNewRole("user");
    },
    onError: (err: Error) => toast({ variant: "destructive", title: "Error", description: err.message }),
  });

  const updateEmailMutation = useMutation({
    mutationFn: (params: { user_id: string; email: string }) => adminUsersAction("update_email", params),
    onSuccess: () => {
      toast({ title: "Email Updated" });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setEditUser(null);
    },
    onError: (err: Error) => toast({ variant: "destructive", title: "Error", description: err.message }),
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (params: { user_id: string; password: string }) => adminUsersAction("update_password", params),
    onSuccess: () => {
      toast({ title: "Password Updated" });
      setPasswordUser(null);
      setResetPassword("");
    },
    onError: (err: Error) => toast({ variant: "destructive", title: "Error", description: err.message }),
  });

  const toggleRoleMutation = useMutation({
    mutationFn: (params: { user_id: string; role: string; remove: boolean }) => adminUsersAction("update_role", params),
    onSuccess: () => {
      toast({ title: "Role Updated" });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (err: Error) => toast({ variant: "destructive", title: "Error", description: err.message }),
  });

  const deleteMutation = useMutation({
    mutationFn: (user_id: string) => adminUsersAction("delete", { user_id }),
    onSuccess: () => {
      toast({ title: "User Deleted" });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (err: Error) => toast({ variant: "destructive", title: "Error", description: err.message }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">User Accounts</h2>
          <p className="text-sm text-muted-foreground">Manage authentication accounts, emails, passwords, and roles</p>
        </div>

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Create User</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMutation.mutate();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Create Account
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {users.map((u) => (
          <Card key={u.id} className="border border-border">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{u.email}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {u.roles.length > 0 ? (
                      u.roles.map((r) => (
                        <Badge key={r} variant={r === "admin" ? "default" : "secondary"}>
                          {r}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline">No role</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      Last sign in: {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : "Never"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Edit Email */}
                  <Dialog
                    open={editUser?.id === u.id}
                    onOpenChange={(open) => {
                      if (open) {
                        setEditUser(u);
                        setEditEmail(u.email);
                      } else {
                        setEditUser(null);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Pencil className="h-3.5 w-3.5" />
                        Email
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Email</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateEmailMutation.mutate({ user_id: u.id, email: editEmail });
                        }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label>New Email</Label>
                          <Input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full" disabled={updateEmailMutation.isPending}>
                          {updateEmailMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Update Email
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Reset Password */}
                  <Dialog
                    open={passwordUser?.id === u.id}
                    onOpenChange={(open) => {
                      if (open) {
                        setPasswordUser(u);
                        setResetPassword("");
                      } else {
                        setPasswordUser(null);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Key className="h-3.5 w-3.5" />
                        Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset Password for {u.email}</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updatePasswordMutation.mutate({ user_id: u.id, password: resetPassword });
                        }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label>New Password</Label>
                          <Input type="password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} required minLength={6} />
                        </div>
                        <Button type="submit" className="w-full" disabled={updatePasswordMutation.isPending}>
                          {updatePasswordMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Reset Password
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Toggle Admin */}
                  <Button
                    variant={u.roles.includes("admin") ? "destructive" : "outline"}
                    size="sm"
                    className="gap-1.5"
                    onClick={() =>
                      toggleRoleMutation.mutate({
                        user_id: u.id,
                        role: "admin",
                        remove: u.roles.includes("admin"),
                      })
                    }
                    disabled={toggleRoleMutation.isPending}
                  >
                    <Shield className="h-3.5 w-3.5" />
                    {u.roles.includes("admin") ? "Remove Admin" : "Make Admin"}
                  </Button>

                  {/* Delete */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      if (confirm(`Delete user ${u.email}? This cannot be undone.`)) {
                        deleteMutation.mutate(u.id);
                      }
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
