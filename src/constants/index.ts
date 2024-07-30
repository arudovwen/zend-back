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
    asSub: true,
    url: "/dashboard/p2p-management",
    submenus: [
      {
        label: "Recent Orders",
        url: "/dashboard/p2p-management/orders",
      },
      {
        label: "Recent Ads",
        url: "/dashboard/p2p-management/ads",
      },
    ],
  },
  {
    label: "Administrators",
    icon: "ic:outline-admin-panel-settings",
    asSub: true,
    url: "/dashboard/administrators",
    submenus: [
      {
        label: "List",
        url: "/dashboard/administrators/list",
      },
      {
        label: "Activities",
        url: "/dashboard/administrators/activities",
      },
    ],
  },
  {
    label: "Verifications",
    icon: "hugeicons:user-id-verification",
    asSub: false,
    url: "/dashboard/verifications",
  },
  {
    label: "Referral Monitor",
    icon: "heroicons:trophy",
    asSub: false,
    url: "/dashboard/referrals",
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
    key: "totalNumberOfUsers",
  },
  {
    label: "Active customers",
    icon: "solar:user-check-linear",
    key: "totalNumberOfActiveUsers",
  },
  {
    label: "Banned customers",
    icon: "hugeicons:user-block-01",
    key: "totalNumberOfBannedUsers",
  },
  {
    label: "Closed customers",
    icon: "icons8:remove-user",
    key: "totalNumberOfDeletedUsers",
  },
];

export const AssetsTab = [
  {
    label: "Total assets",
    icon: "flowbite:users-group-outline",
    key: "total",
  },
  {
    label: "Total withdrawals (USD)",
    icon: "solar:user-check-linear",
    key: "active",
  },
  {
    label: "Total deposits (USD)",
    icon: "hugeicons:user-block-01",
    key: "banned",
  },
  {
    label: "Total swapped",
    icon: "icons8:remove-user",
    key: "closed",
  },
];
export const VerificationTab = [
  {
    label: "Business",
    icon: "flowbite:users-group-outline",
    key: "total",
  },
  {
    label: "Email Address",
    icon: "icons8:remove-user",
    key: "closed",
  },
  {
    label: "BVN",
    icon: "solar:user-check-linear",
    key: "active",
  },
  {
    label: "Government ID",
    icon: "hugeicons:user-block-01",
    key: "banned",
  },
  {
    label: "Phone number",
    icon: "icons8:remove-user",
    key: "closed",
  },
];

export const QuickSellOrdersTab = [
  {
    label: "Approved orders",
    icon: "flowbite:users-group-outline",
    key: "total",
  },
  {
    label: "Rejected orders",
    icon: "flowbite:users-group-outline",
    key: "total",
  },
  {
    label: "Pending orders",
    icon: "solar:user-check-linear",
    key: "active",
  },
  {
    label: "Total amount (BTC)",
    icon: "hugeicons:user-block-01",
    key: "banned",
  },
  {
    label: "Total amount (USDC)",
    icon: "icons8:remove-user",
    key: "closed",
  },
];

export const AnalysisTab = [
  {
    label: "Total deposits",
    icon: "ph:hand-deposit-bold",
    key: "totalDeposits",
  },
  {
    label: "Total withdrawal",
    icon: "ph:hand-withdraw-bold",
    key: "totalWithdrawals",
  },
  {
    label: "Total swap",
    icon: "ph:swap-bold",
    key: "totalSwaps",
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

const BankDetailData = [
  {
    label: "Account name",
    key: "",
  },
  {
    label: "Account number",
    key: "",
  },
  {
    label: "Bank name",
    key: "",
  },
];
const OrderDetailData = [
  {
    label: "Token type",
    key: "",
  },
  {
    label: "amount",
    key: "",
  },
  {
    label: "Value in USD",
    key: "",
  },
  {
    label: "Transaction ID",
    key: "",
  },
];
const RateDetailData = [
  {
    label: "Base currency",
    key: "",
  },
  {
    label: "Token type",
    key: "",
  },
  {
    label: "Rate",
    key: "",
  },
];
const MoreDetailData = [
  {
    label: "Status",
    key: "status",
  },
  {
    label: "Date & time",
    key: "",
  },
  {
    label: "Reason",
    key: "reason",
  },
];

export const OrderInformationData = [
  {
    label: "Details of Order",
    data: OrderDetailData,
  },
  {
    label: "Details of Rate",
    data: RateDetailData,
  },
  {
    label: "Bank details",
    data: BankDetailData,
  },
  {
    label: "More details",
    data: MoreDetailData,
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

export const AdminActivitiesData = [
  { label: "Sign in", value: "sign_in" },
  { label: "Sign out", value: "sign_out" },
  { label: "Create admin", value: "create_administrator" },
  { label: "Ban admin", value: "ban_administrator" },
  { label: "Unban admin", value: "unban_administrator" },
  { label: "Ban user", value: "ban_user" },
  { label: "Unban user", value: "unban_user" },
];