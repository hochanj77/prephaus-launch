import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, User, Loader2, AlertCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

export default function Portal() {
  const navigate = useNavigate();
  const { user, loading, isAdmin, isStudent, isAdminLoading, signIn, signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Route logged-in users to the right place
  useEffect(() => {
    if (!loading && !isAdminLoading && user) {
      if (isAdmin) {
        navigate("/admin");
      } else if (isStudent) {
        navigate("/dashboard");
      }
    }
  }, [user, loading, isAdmin, isStudent, isAdminLoading, navigate]);

  const validateForm = () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return false;
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { error } = await signIn(email, password);

      if (error) {
        const msg = error.message?.includes("Email not confirmed")
          ? "Please verify your email address before signing in."
          : "Invalid credentials.";
        setError(msg);
        toast({ variant: "destructive", title: "Sign In Failed", description: msg });
      } else {
        toast({ title: "Signed In", description: "Redirecting..." });
      }
    } catch {
      const msg = "Sign in failed. Please check your connection and try again.";
      setError(msg);
      toast({ variant: "destructive", title: "Connection Error", description: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { error } = await signUp(email, password);

      if (error) {
        const msg = error.message?.includes("User already registered")
          ? "An account with this email already exists. Please sign in instead."
          : error.message || "Sign up failed. Please try again.";
        setError(msg);
        toast({ variant: "destructive", title: "Sign Up Failed", description: msg });
      } else {
        const msg = "Account created! Please check your email to verify your account before signing in.";
        setSuccess(msg);
        toast({ title: "Account Created", description: msg });
        setEmail("");
        setPassword("");
      }
    } catch {
      const msg = "Sign up failed. Please check your connection and try again.";
      setError(msg);
      toast({ variant: "destructive", title: "Sign Up Failed", description: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError("Google sign-in failed. Please try again.");
        toast({ variant: "destructive", title: "Google Sign In Failed", description: "Could not connect to Google. Please try again." });
        setIsGoogleLoading(false);
      }
      // On success, Supabase redirects to Google — no need to reset loading
    } catch {
      setError("Google sign-in failed. Please check your connection.");
      toast({ variant: "destructive", title: "Connection Error", description: "Could not connect to Google." });
      setIsGoogleLoading(false);
    }
  };

  if (loading || isAdminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // User is logged in but has no role
  if (user && !isAdmin && !isStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl p-8 shadow-2xl border border-border text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-secondary mb-2">Account Not Linked</h2>
            <p className="text-muted-foreground mb-4">
              Your account hasn't been linked to a student profile yet. Please contact PrepHaus administration to set up your access.
            </p>
            <Button variant="outline" onClick={() => navigate("/contact")}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="bg-card rounded-2xl p-8 shadow-2xl border border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Portal <span className="text-accent">{mode === "signin" ? "Login" : "Sign Up"}</span>
            </h1>
            <p className="text-muted-foreground">
              {mode === "signin"
                ? "Access your grades, resources, and reports"
                : "Create an account to get started"}
            </p>
          </div>

          {/* Google OAuth Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full mb-6"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isSubmitting}
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or continue with email</span>
            </div>
          </div>

          <form onSubmit={mode === "signin" ? handleSignIn : handleSignUp} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-accent bg-accent/10">
                <AlertDescription className="text-foreground">{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={mode === "signup" ? "At least 6 characters" : "Enter your password"}
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  required
                />
              </div>
            </div>

            <Button
              variant="accent"
              size="lg"
              className="w-full"
              type="submit"
              disabled={isSubmitting || isGoogleLoading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "signin" ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                mode === "signin" ? "Sign In" : "Create Account"
              )}
            </Button>
          </form>

          {/* Toggle between sign-in and sign-up */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "signin" ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-accent hover:underline font-medium"
                  onClick={() => { setMode("signup"); setError(null); setSuccess(null); }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-accent hover:underline font-medium"
                  onClick={() => { setMode("signin"); setError(null); setSuccess(null); }}
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
