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
import InputField from "@/components/ui/inputField";
import { useUserAuth } from "@/context/userAuthContext";
import { UserSignIn } from "@/types";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

const initialValue: UserSignIn = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const { googleSignIn, register } = useUserAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState<UserSignIn>(initialValue);
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
      console.log("The user info is : ", userInfo);
      await register(userInfo.email, userInfo.password);
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
                value={userInfo.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                placeholder="Password"
                value={userInfo.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
              />
              <InputField
                id="confirmpassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                value={userInfo.confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({
                    ...userInfo,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </CardContent>
            <CardFooter className="mt-6 flex flex-col">
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
              <p className="mt-3 text-sm text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
