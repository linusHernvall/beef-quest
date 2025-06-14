"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(password);
      if (success) {
        toast.success("Inloggningen lyckades!");
        router.push("/");
        router.refresh();
      } else {
        toast.error("Ogiltligt lösenord");
      }
    } catch (error) {
      toast.error("Ett fel uppstod under inloggningen");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl py-10 px-4 md:py-20">
      <h1 className="text-4xl pb-8 font-bold">Logga in</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Skriv in lösenordet"
          required
        />
        <Button type="submit" className="cursor-pointer" disabled={isLoading}>
          {isLoading ? "Loggar in..." : "Logga in"}
        </Button>
      </form>
    </div>
  );
}
