export const toDarkMode = () => {
  if (typeof window === "undefined") return;
  localStorage.theme = "dark";
  updateTheme();
};

export const toLightMode = () => {
  if (typeof window === "undefined") return;
  localStorage.theme = "light";
  updateTheme();
};

export const currentTheme = () => {
  if (typeof window === "undefined") return;
 return  localStorage.theme;

};

export const toSystemMode = () => {
  if (typeof window === "undefined") return null;
  localStorage.theme = "system";
  updateTheme();
  return null;
};
export function updateTheme() {
  if (!("theme" in localStorage)) {
    localStorage.theme = "light";
  }
  switch (localStorage.theme) {
    case "system":
      if (window.matchMedia("(prefers-color-scheme: dark").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      document.documentElement.setAttribute("color-theme", "system");
      break;
    case "dark":
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("color-theme", "dark");
      break;
    case "light":
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("color-theme", "light");
      break;
  }
}
