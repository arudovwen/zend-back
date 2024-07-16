export const navigations = [
  {
    label: "Overview",
    icon: "akar-icons:grid",
    asSub: false,
    url: "/dashboard",
  },
  {
    label: "Customers",
    icon: "grommet-icons:group",
    asSub: true,
    url: "/dashboard/customers",
  },
  {
    label: "Transactions",
    icon: "uil:transaction",
    asSub: true,
    url: "/dashboard/transactions",
  },
  {
    label: "Assets",
    icon: "streamline:coins-stack",
    asSub: false,
    url: "/dashboard/assets",
  },
  {
    label: "P2P Management",
    icon: "ri:p2p-line",
    asSub: false,
    url: "/dashboard/p2p-management",
  },
  {
    label: "Administrators",
    icon: "ic:outline-admin-panel-settings",
    asSub: false,
    url: "/dashboard/administrators",
  },
  {
    label: "Verification",
    icon: "hugeicons:user-id-verification",
    asSub: false,
    url: "/dashboard/administrators",
  },
  {
    label: "Referral Monitor",
    icon: "heroicons:trophy",
    asSub: false,
    url: "/dashboard/administrators",
  },
  {
    label: "Quick sell",
    icon: "carbon:sales-ops",
    asSub: false,
    url: "/dashboard/quick-sell",
  },
  {
    label: "Zend USD",
    icon: "mingcute:usd-coin-usdc-line",
    asSub: false,
    url: "/dashboard/zend-usd",
  },
];

export const bottomNavigations = [
  {
    label: "Settings",
    icon: "uil:cog",
    asSub: false,
    url: "/dashboard/settings",
  },
];

export const OverviewTabs = [
  {
    label: "Total customers",
    icon: "flowbite:users-group-outline",
    key: "total",
  },
  {
    label: "Active customers",
    icon: "grommet-icons:user-expert",
    key: "active",
  },
  {
    label: "Banned customers",
    icon: "hugeicons:user-block-01",
    key: "banned",
  },
  {
    label: "Closed customers",
    icon: "icons8:remove-user",
    key: "closed",
  },
];

export const AnalysisTab = [
  {
    label: "Total deposits",
    icon: "ph:hand-deposit-bold",
    key: "",
  },
  {
    label: "Total withdrawal",
    icon: "ph:hand-withdraw-bold",
    key: "",
  },
  {
    label: "Total swap",
    icon: "ph:swap-bold",
    key: "",
  },
];
