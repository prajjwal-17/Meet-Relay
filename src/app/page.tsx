"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";


export default function Home() {

  const { data : session } = authClient.useSession()

  // Sign-up form state
  const [signUpEmail, setSignUpEmail] = useState("")
  const [name, setName] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [isSigningUp, setIsSigningUp] = useState(false)

  // Sign-in form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const onSubmit = async () => {
    setIsSigningUp(true)
    await authClient.signUp.email({
      email: signUpEmail,
      name,
      password: signUpPassword,
    }, {
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
      onSuccess: () => {
        toast.success("Account created successfully!");
      },
    })
    setIsSigningUp(false)
  }

  const onLogin = async () => {
    setIsLoggingIn(true)
    await authClient.signIn.email({
      email: loginEmail,
      password: loginPassword,
    }, {
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
      onSuccess: () => {
        toast.success("Logged in successfully!");
      },
    })
    setIsLoggingIn(false)
  }

  const onSignOut = async () => {
    await authClient.signOut()
  }

  if (session){
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={onSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  return <div className="flex flex-col gap-y-10">
    <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
      <Input placeholder="password" type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
      <Button onClick={onSubmit} disabled={isSigningUp}>
        {isSigningUp ? "Creating..." : "Create User"}
      </Button>
    </div>

    <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
      <Input placeholder="password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
      <Button onClick={onLogin} disabled={isLoggingIn}>
        {isLoggingIn ? "Logging in..." : "Login"}
      </Button>
    </div>
  </div>
}
