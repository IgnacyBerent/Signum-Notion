import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { useUserAuth } from "@/context/userAuthContext";
import { UserLogIn, InputField } from "@/features/auth";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

const initialValue: UserLogIn = {
  email: "",
  password: "",
};

const Login = () => {
  const { googleSignIn, logIn } = useUserAuth();
  const navigate = useNavigate();
  const [userLogInInfo, setuserLogInInfo] =
    React.useState<UserLogIn>(initialValue);

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/userDetails");
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("The user info is : ", userLogInInfo);
      await logIn(userLogInInfo.email, userLogInInfo.password);
      navigate("/userDetails");
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  return (
    <div className="bg-slate-900 w-full h-screen flex flex-col items-center justify-center">
      <div className="max-w-sm rounded-xl border bg-card text-card-foreground shadow-lg">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center mb-4">
                Signum Notion
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2 grid gap-4 w-xs">
              <div className="grid">
                <Button variant="outline" onClick={handleGoogleSignIn}>
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              <InputField
                id="email"
                label="Email address"
                type="email"
                placeholder="email@example.com"
                value={userLogInInfo.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setuserLogInInfo({
                    ...userLogInInfo,
                    email: e.target.value,
                  })
                }
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                placeholder="Password"
                value={userLogInInfo.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setuserLogInInfo({
                    ...userLogInInfo,
                    password: e.target.value,
                  })
                }
              />
            </CardContent>
            <CardFooter className="mt-6 flex flex-col">
              <Button className="w-full" type="submit">
                Login
              </Button>
              <p className="mt-3 text-sm text-center">
                Don't have an account ? <Link to="/register">Sign up</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
