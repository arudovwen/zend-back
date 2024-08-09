import { createContext } from "react";

export const UserContext = createContext<{
  userData: any;
  loading: boolean;
  getUserData: any;

}>({
  userData: null,
  loading: false,
  getUserData: null,

});

export const PageContext = createContext<{
  colormode: any;
  setColormode: any;
}>({
  colormode: "light",
  setColormode: () => {},
});
