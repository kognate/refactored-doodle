export const EVALUATION_FIELDS = [
       "Compensation",
       "Tooling",
       "Autonomy",
       "Trust",
       "Process Efficiency",
       "Psychological Safety",
       "Social Connection",
       "Flow",
       "Meaning",
] as const;

export type EvaluationField = typeof EVALUATION_FIELDS[number];
