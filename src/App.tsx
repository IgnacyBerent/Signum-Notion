import { RouterProvider } from "react-router-dom";
import { router } from "./lib/routes";
import { UserAuthProvider } from "./context/userAuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/react-query";

const App = () => {
  return (
    <UserAuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserAuthProvider>
  );
};

export default App;
