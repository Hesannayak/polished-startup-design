export type Activity = {
  type: "BUY" | "SELL";
  amount: string;
  account: string;
  time: string;
};

export type Holder = {
  account: string;
  share: string;
  amount: string;
};

export type Token = {
  symbol: string;
  name: string;
  addressShort: string;
  addressFull: string;
  marketCap: string;
  price: string;
  holders: number;
  reserve: string;
  curvePct: string;
  curveProgress: number;
  createdAgo: string;
  description: string;
  priceHistory: number[];
  activity: Activity[];
  holdersList: Holder[];
};

export const GRADUATION_TARGET = "1,000 TON";

export const TOKENS: Token[] = [
  {
    symbol: "TEST",
    name: "test launch",
    addressShort: "0:ba…7fdd",
    addressFull: "0:a14f1c88e2b90d4c77a3f1e5b2d90c4a8f7e3d61",
    marketCap: "$247.60",
    price: "$2.476e-7",
    holders: 2,
    reserve: "0.88 TON",
    curvePct: "0.1%",
    curveProgress: 0.1,
    createdAgo: "1h",
    description: "test",
    priceHistory: [12, 18, 26, 24, 31, 28, 36, 42, 39, 48, 57, 66],
    activity: [
      { type: "BUY", amount: "1.46M TEST", account: "0:79ba…dc60", time: "43m ago" },
      { type: "BUY", amount: "2.44M TEST", account: "0:79ba…9e84", time: "1h ago" },
      { type: "BUY", amount: "489.8K TEST", account: "0:79c9…9e84", time: "1h ago" },
    ],
    holdersList: [
      { account: "0:79ba…dc60", share: "58.4%", amount: "1.46M TEST" },
      { account: "0:79c9…9e84", share: "41.6%", amount: "1.04M TEST" },
    ],
  },
  {
    symbol: "BULL",
    name: "bull",
    addressShort: "0:91…6c9d",
    addressFull: "0:91a3f7c2d84b1e6a90c3f5d27b8e41a6c9d0f3b2",
    marketCap: "$247.95",
    price: "$2.479e-7",
    holders: 2,
    reserve: "0.90 TON",
    curvePct: "0.1%",
    curveProgress: 0.1,
    createdAgo: "12h",
    description: "bull",
    priceHistory: [10, 14, 13, 19, 23, 21, 27, 25, 33, 38, 44, 52],
    activity: [
      { type: "BUY", amount: "1.02M BULL", account: "0:44af…21b7", time: "3h ago" },
      { type: "BUY", amount: "655.3K BULL", account: "0:9d17…40ce", time: "9h ago" },
      { type: "BUY", amount: "2.11M BULL", account: "0:9d17…40ce", time: "12h ago" },
    ],
    holdersList: [
      { account: "0:44af…21b7", share: "51.0%", amount: "1.02M BULL" },
      { account: "0:9d17…40ce", share: "49.0%", amount: "0.98M BULL" },
    ],
  },
];

export const BASE_FEE_TON = 1.0;
