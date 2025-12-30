import React from 'react';
import { EVALUATION_FIELDS } from '../constants';
import type { Weights } from '../types';

interface WeightsInputProps {
  weights: Weights;
  onWeightChange: (field: string, value: number) => void;
}

const WeightsInput: React.FC<WeightsInputProps> = ({ weights, onWeightChange }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3>Global Weights (%)</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
        {EVALUATION_FIELDS.map((field) => (
          <div key={field} style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{field}</label>
            <input
              type="number"
              min="0"
              max="100"
              value={weights[field]}
              onChange={(e) => onWeightChange(field, Number(e.target.value))}
              style={{ padding: '4px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightsInput;
