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
  // {
  //   label: "P2P Management",
  //   icon: "ri:p2p-line",
  //   asSub: true,
  //   url: "/dashboard/p2p-management",
  //   submenus: [
  //     {
  //       label: "Recent Orders",
  //       url: "/dashboard/p2p-management/orders",
  //     },
  //     {
  //       label: "Recent Ads",
  //       url: "/dashboard/p2p-management/ads",
  //     },
  //   ],
  // },
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
  // {
  //   label: "Quick sell",
  //   icon: "carbon:sales-ops",
  //   asSub: false,
  //   url: "/dashboard/quick-sell",
  // },
  // {
  //   label: "Zend USD",
  //   icon: "mingcute:usd-coin-usdc-line",
  //   asSub: false,
  //   url: "/dashboard/zend-usd",
  // },
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
    className: "text-purple-800 bg-purple-100",
  },
  {
    label: "Active customers",
    icon: "solar:user-check-linear",
    key: "totalNumberOfActiveUsers",
    className: "text-green-800 bg-greenn-100",
  },
  {
    label: "Banned customers",
    icon: "hugeicons:user-block-01",
    key: "totalNumberOfBannedUsers",
    className: "text-red-800 bg-red-100",
  },
  {
    label: "Closed customers",
    icon: "icons8:remove-user",
    key: "totalNumberOfDeletedUsers",
    className: "text-yellow-800 bg-yellow-100",
  },
];

export const AssetsTab = [
  {
    label: "Total transactions (USD)",
    icon: "cil:swap-vertical",
    key: "totalTokenTransactionsUsd",
  },
  {
    label: "Total withdrawals (USD)",
    icon: "ph:hand-withdraw-light",
    key: "totalWithdrawalsUsd",
  },
  {
    label: "Total deposits (USD)",
    icon: "ph:hand-deposit-light",
    key: "totalDepositUsd",
  },
  {
    label: "Total swapped (USD)",
    icon: "ph:swap-light",
    key: "totalSwapsUsd",
  },
];
export const VerificationTab = [
  {
    label: "Address",
    icon: "mdi:address-marker-outline",
    key: "numberOfBusinessVerifications",
  },
  {
    label: "Email Address",
    icon: "line-md:email",
    key: "numberOfEmailAddressVerifications",
  },
  {
    label: "BVN",
    icon: "hugeicons:security",
    key: "numberOfBvnVerifications",
  },
  {
    label: "Government ID",
    icon: "teenyicons:id-outline",
    key: "numberOfGovernmentIdVerifications",
  },
  {
    label: "Phone number",
    icon: "basil:phone-out-outline",
    key: "numberOfPhoneNumberVerifications",
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
    icon: "ph:hand-deposit-light",
    key: "totalDeposits",
  },
  {
    label: "Total withdrawal",
    icon: "ph:hand-withdraw-light",
    key: "totalWithdrawals",
  },
  {
    label: "Total swap",
    icon: "ph:swap-light",
    key: "totalSwaps",
  },
];

export const GenderOptions = [
  {
    label: "Default",
    value: "",
  },
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
    label: "Default",
    value: "",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Banned",
    value: "banned",
  },
  {
    label: "Locked",
    value: "locked",
  },
  {
    label: "Deleted",
    value: "deleted",
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
    label: "Date of birth",
    key: "dateOfBirth",
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
    key: "homeAddress",
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
  {
    label: "Banned by",
    key: "isBanned",
    value: "",
  },
  {
    label: "Last reason for ban",
    key: "bannedFor",
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

export const cryptoTokens = [
  { label: "Tether", value: "USDT", imageUrl:"/coins/tether.png" },
  { label: "Bitcoins", value: "BTC",imageUrl:"/coins/bitcoin.png" },
  { label: "USDC", value: "USDC",imageUrl:"/coins/usdc.png" },
  { label: "Tron", value: "TRX" ,imageUrl:"/coins/tron.png"},
  { label: "Ethereum", value: "ETH",imageUrl:"/coins/ethereum.png" },
  { label: "Sol ana", value: "SOL" ,imageUrl:"/coins/solana.png"},
  { label: "Ripple", value: "XRP",imageUrl:"/coins/ripple.png" },
  { label: "Algorand", value: "ALGO",imageUrl:"/coins/algorand.png" },
  { label: "Bitcoin Cash", value: "BCH",imageUrl:"/coins/bitcash.png" },
  { label: "Polygon", value: "MATIC" ,imageUrl:"/coins/polygon.png"},
  { label: "Avalanche", value: "AVAX",imageUrl:"/coins/avalanche.png" },
  { label: "Stellar", value: "XLM",imageUrl:"/coins/stellar.png" },
  { label: "Litecoin", value: "LTC",imageUrl:"/coins/litecoin.png" },
  { label: "DogeCoin", value: "DOGE",imageUrl:"/coins/Doge.png" },
  { label: "Binance Coin", value: "BNB",imageUrl:"/coins/bnb.png" },
];

export const CountryFilters = [
  {
    key: "ghana",
    label: "Ghana",
    value: "ghana",
  },
  {
    key: "nigeria",
    label: "Nigeria",
    value: "nigeria",
  },
  {
    key: "rwanda",
    label: "Rwanda",
    value: "rwanda",
  },
  {
    key: "south_africa",
    label: "South Africa",
    value: "south_africa",
  },
  {
    key: "kenya",
    label: "Kenya",
    value: "kenya",
  },
  {
    key: "uganda",
    label: "Uganda",
    value: "uganda",
  },
  {
    key: "cameroon",
    label: "Cameroon",
    value: "cameroon",
  },
];

export const currencies = [
  { label: "Default", value: "" },
  {
    value: "SOL",
    label: "Solana",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "ETH",
    label: "Ethereum",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "BTC",
    label: "Bitcoin",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "TRX",
    label: "Tron",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "ALGO",
    label: "Algorand",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "XRP",
    label: "XRP",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "BCH",
    label: "Bitcoin cash",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "XLM",
    label: "XLM",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "LTC",
    label: "Litecoin",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "AVAX",
    label: "AVAX",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "DOGE",
    key: "DOGE",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "USDC",
    label: "USDC",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "USDT",
    label: "USDT",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "OKB",
    label: "OKB",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "MATIC",
    label: "Polygon Matic",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "BNB",
    label: "Binance Coin",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "ADA",
    label: "Cardano",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
  {
    value: "DAI",
    label: "DAI",
    currentPrice: 0,
    percentagePrice: 0,
    percentageChange: 0,
  },
];

export const TransactionOptions = [
  {
    label: "Default",
    value: "",
  },
  {
    label: "Success",
    value: "success",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Failed",
    value: "failed",
  },
];

export const TypeData = [
  {
    label: "Default",
    value: "",
  },
  { label: "Withdraw", value: "withdraw" },
  { label: "Deposit", value: "deposit" },
];

export const VerifyTypeData = [
  {
    label: "Default",
    value: "",
  },
  { label: "BVN", value: "bvn" },
  { label: "Government Id", value: "government_id" },
  { label: "Phone number", value: "phone_number" },
  { label: "Email address", value: "email_address" },
  { label: "Address", value: "address" },
];
export const VerifyStatusData = [
  { label: "Default", value: "" },
  { label: "Pending", value: false },
  { label: "Approved", value: true },
];

export const DefaultCurrency = [
  {
      "currency": "XRP",
      "currentPrice": 0.6214,
      "percentagePrice": 0.010599999999999943,
      "percentageChange": 1.7354289456
  },
  {
      "currency": "USDT",
      "currentPrice": 1.00047,
      "percentagePrice": -0.00008000000000008001,
      "percentageChange": -0.0079956024
  },
  {
      "currency": "ETH",
      "currentPrice": 2669.7,
      "percentagePrice": 209.62999999999965,
      "percentageChange": 8.5213022394
  },
  {
      "currency": "USDC",
      "currentPrice": 0.9997,
      "percentagePrice": -0.00009999999999998899,
      "percentageChange": -0.0100020004
  },
  {
      "currency": "TRX",
      "currentPrice": 0.12679,
      "percentagePrice": 0.0014100000000000223,
      "percentageChange": 1.1245812729
  },
  {
      "currency": "SOL",
      "currentPrice": 159.87,
      "percentagePrice": 5.509999999999991,
      "percentageChange": 3.5695776108
  },
  {
      "currency": "BTC",
      "currentPrice": 61352,
      "percentagePrice": 3802,
      "percentageChange": 6.606429192
  },
  {
      "currency": "ALGO",
      "currentPrice": 0.1205,
      "percentagePrice": 0.005599999999999994,
      "percentageChange": 4.8738033072
  },
  {
      "currency": "BCH",
      "currentPrice": 356.8,
      "percentagePrice": 28,
      "percentageChange": 8.5158150852
  },
  {
      "currency": "MATIC",
      "currentPrice": 0.4273,
      "percentagePrice": 0.016900000000000026,
      "percentageChange": 4.1179337232
  },
  {
      "currency": "AVAX",
      "currentPrice": 22.38,
      "percentagePrice": 1.5,
      "percentageChange": 7.183908046
  },
  {
      "currency": "XLM",
      "currentPrice": 0.10241,
      "percentagePrice": 0.000060000000000004494,
      "percentageChange": 0.0586223742
  },
  {
      "currency": "LTC",
      "currentPrice": 60.84,
      "percentagePrice": 2.770000000000003,
      "percentageChange": 4.7701050456
  },
  {
      "currency": "DOGE",
      "currentPrice": 0.10574,
      "percentagePrice": 0.005320000000000005,
      "percentageChange": 5.2977494523
  },
  {
      "currency": "ADA",
      "currentPrice": 0.3526,
      "percentagePrice": 0.014800000000000035,
      "percentageChange": 4.3812907046
  },
  {
      "currency": "DAI",
      "currentPrice": 0.9998,
      "percentagePrice": -0.0005999999999999339,
      "percentageChange": -0.0599760096
  },
  {
      "currency": "BNB",
      "currentPrice": 514.5,
      "percentagePrice": 23.100000000000023,
      "percentageChange": 4.7008547009
  }
]