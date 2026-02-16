export type ExpansionType = "Upsell" | "Cross-sell" | "Upgrade" | "Add-on" | "";
export type ExpansionStage = "Identified" | "Qualified" | "Proposed" | "Committed" | "";

export interface ExpansionOpportunity {
  type: ExpansionType;
  stage: ExpansionStage;
  estimatedValue: string;
  trigger: string;
  notes: string;
}

export interface Account {
  id: string;
  companyName: string;
  industry: string;
  renewalDate: string;
  desiredOutcome: string;
  primaryMetric: string;
  executiveSponsor: string;
  reviewCadence: "Monthly" | "Quarterly" | "None" | "";
  confidenceLevel: number;
  expansion: ExpansionOpportunity;
}

export type AlignmentStatus = "green" | "yellow" | "red";

export function getAlignmentStatus(account: Account): AlignmentStatus {
  const filled =
    account.desiredOutcome.trim() !== "" &&
    account.primaryMetric.trim() !== "" &&
    account.executiveSponsor.trim() !== "" &&
    account.reviewCadence !== "" &&
    account.reviewCadence !== "None";

  if (!filled) return "red";
  if (account.confidenceLevel < 3) return "yellow";
  return "green";
}

export function isExpansionReady(account: Account): boolean {
  return getAlignmentStatus(account) === "green" && account.expansion.type !== "";
}

const emptyExpansion: ExpansionOpportunity = {
  type: "",
  stage: "",
  estimatedValue: "",
  trigger: "",
  notes: "",
};

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: "1",
    companyName: "Acme Corp",
    industry: "Technology",
    renewalDate: "2026-06-15",
    desiredOutcome: "Reduce churn by 20%",
    primaryMetric: "Net Revenue Retention",
    executiveSponsor: "Jane Smith, VP CS",
    reviewCadence: "Monthly",
    confidenceLevel: 4,
    expansion: {
      type: "Upsell",
      stage: "Qualified",
      estimatedValue: "$45,000",
      trigger: "Exceeded adoption targets in Q1",
      notes: "Champion interested in premium tier",
    },
  },
  {
    id: "2",
    companyName: "GlobalTech Inc",
    industry: "Finance",
    renewalDate: "2026-04-01",
    desiredOutcome: "Improve onboarding speed",
    primaryMetric: "Time to first value",
    executiveSponsor: "",
    reviewCadence: "Quarterly",
    confidenceLevel: 2,
    expansion: { ...emptyExpansion },
  },
  {
    id: "3",
    companyName: "HealthFirst",
    industry: "Healthcare",
    renewalDate: "2026-09-30",
    desiredOutcome: "",
    primaryMetric: "",
    executiveSponsor: "",
    reviewCadence: "",
    confidenceLevel: 1,
    expansion: { ...emptyExpansion },
  },
  {
    id: "4",
    companyName: "EduLearn Platform",
    industry: "Education",
    renewalDate: "2026-07-20",
    desiredOutcome: "Increase user engagement by 30%",
    primaryMetric: "Daily Active Users",
    executiveSponsor: "Tom Lee, CTO",
    reviewCadence: "Monthly",
    confidenceLevel: 5,
    expansion: {
      type: "Cross-sell",
      stage: "Identified",
      estimatedValue: "$20,000",
      trigger: "Team expanded to 3 new departments",
      notes: "",
    },
  },
];
