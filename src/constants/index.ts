export const navigations = [
  {
    label: "Overview",
    icon: "akar-icons:grid",
    asSub: false,
    url: "/dashboard",
  },
  {
    label: "Customers",
    icon: "solar:users-group-two-rounded-linear",
    asSub: true,
    url: "/dashboard/customers",
    submenus: [
      {
        label: "List",
        url: "/dashboard/customers/list",
      },
      {
        label: "Activities",
        url: "/dashboard/customers/activities",
      },
      {
        label: "Sanctions",
        url: "/dashboard/customers/sanctions",
      },
    ],
  },
  {
    label: "Transactions",
    icon: "uil:transaction",
    asSub: false,
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
    icon: "solar:user-check-linear",
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

export const GenderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];
export const StatusOptions = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Disabled",
    value: "disabled",
  },
];

export const WalletBalanceOptions = [
  {
    label: "Wallet Balance",
    key: "balance",
    isCurrency: true,
  },
  {
    label: "Total Assets",
    key: "assets",
    isCurrency: false,
  },
];

export const PersonalInformationData = [
  {
    label: "Join date",
    key: "joinDate",
    value: "",
  },
  {
    label: "Last Seen",
    key: "lastSeen",
    value: "",
  },
  {
    label: "First name",
    key: "firstName",
    value: "",
  },
  {
    label: "Last name",
    key: "lastName",
    value: "",
  },
  {
    label: "Username",
    key: "username",
    value: "",
  },
  {
    label: "Phone number",
    key: "phoneNumber",
    value: "",
  },
  {
    label: "Gender",
    key: "gender",
    value: "",
  },
  {
    label: "Address",
    key: "address",
    value: "",
  },
  {
    label: "Country",
    key: "country",
    value: "",
  },

  {
    label: "Device info",
    key: "deviceInfo",
    value: "",
  },
];

export const KinData = [
  {
    label: "First name",
    key: "firstName",
    value: "",
  },
  {
    label: "Last name",
    key: "lastName",
    value: "",
  },
  {
    label: "Relationship",
    key: "relationship",
    value: "",
  },
  {
    label: "Email address",
    key: "emailAddress",
    value: "",
  },
  {
    label: "Phone number",
    key: "phoneNumber",
    value: "",
  },
  {
    label: "Address",
    key: "address",
    value: "",
  },
];

const DeviceInfoData = [
  {
    label: "name",
    key: "",
  },
  {
    label: "ip",
    key: "",
  },
  {
    label: "a",
    key: "",
  },
  {
    label: "name",
    key: "",
  },
  {
    label: "name",
    key: "",
  },
];
export const EmailTypes = [
  {
    label: "Announcement",
    value: "announcement",
  },
  {
    label: "Maintenance",
    value: "maintenance",
  },
  {
    label: "Swap update",
    value: "swap_update",
  },
  {
    label: "P2P update",
    value: "p2p_update",
  },
  {
    label: "ZendUsd update",
    value: "zend_usd_update",
  },
  {
    label: "Other",
    value: "other",
  },
];

export const NotifyTypes = [
  {
    label: "Email notification",
    value: "email",
  },
  {
    label: "Push notification",
    value: "push",
  },
];
