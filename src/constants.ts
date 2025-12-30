export const EVALUATION_FIELDS = [
  "Base Salary",
  "Stock Compensation",
  "Work From Home",
  "Boat",
  "Personal Growth",
  "Technical Growth",
  "Career Growth",
  "Exists in 3 years",
  "Exists in 10 years",
  "Prestige",
  "Agency",
  "Alignment with Values",
  "Alignment with Goals",
] as const;

export type EvaluationField = typeof EVALUATION_FIELDS[number];
