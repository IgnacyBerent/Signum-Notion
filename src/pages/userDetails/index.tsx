import { useDoesUserExist, useSaveUser } from "@/features/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { auth } from "@/config/firebaseConfig";
import { UserData, InputField } from "@/features/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValue: UserData = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  projects: [],
};

const UserDetails = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserData>(initialValue);
  const uid = auth.currentUser?.uid;
  const { data: userExists, isLoading: isLoadingUser } = useDoesUserExist(uid!);
  const { mutate: saveUser } = useSaveUser();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (userExists) {
      navigate("/projects");
    }
  }, [userExists, navigate]);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("The user info is : ", userInfo);
      if (auth.currentUser?.email) {
        userInfo.email = auth.currentUser.email;
        userInfo.id = uid!;
        saveUser(userInfo);
        navigate("/projects");
      }
    } catch (error) {
      console.log("Error : ", error);
    }
    setLoading(false);
  };

  if (isLoadingUser) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-900 w-full h-screen flex flex-col items-center justify-center">
      <div className="max-w-sm rounded-xl border bg-card text-card-foreground shadow-lg">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center mb-1">
                Signum Notion
              </CardTitle>
              <CardDescription className="text-center">
                Please enter your details
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4 grid gap-4 w-xs">
              <InputField
                id="firstName"
                label="First Name"
                type="text"
                placeholder="John"
                value={userInfo.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({ ...userInfo, firstName: e.target.value })
                }
              />
              <InputField
                id="lastName"
                label="Last Name"
                type="text"
                placeholder="Smith"
                value={userInfo.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({ ...userInfo, lastName: e.target.value })
                }
              />
            </CardContent>
            <CardFooter className="mt-6 flex flex-col">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Loading" : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UserDetails;
