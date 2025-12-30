import type { EvaluationField } from './constants';

export type Weights = Record<EvaluationField, number>;

export interface Entry {
  id: string;
  name: string;
  values: Record<EvaluationField, number>;
}
