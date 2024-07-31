import { createContext } from "react";

export const UserContext = createContext<{
  userData: any;
  loading: boolean;
}>({
  userData: null,
  loading: false
});
