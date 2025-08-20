"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

import { createAuthClient } from "better-auth/client";

export function LoginForm({ className, ...props }) {
  const authClient = createAuthClient();
  const handleGithubLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Masuk dengan Akun</CardTitle>
          <CardDescription>
            Masuk dengan akun Google atau Github untuk melanjutkan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Button variant="default" className="w-full cursor-pointer">
                  Masuk dengan Google <IconBrandGoogle />
                </Button>
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={handleGithubLogin}
                >
                  Masuk dengan Github <IconBrandGithub />
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
