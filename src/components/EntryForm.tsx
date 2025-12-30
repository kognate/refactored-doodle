import React, { useState } from 'react';
import { EVALUATION_FIELDS } from '../constants';
import type { Entry, Weights } from '../types';

interface EntryFormProps {
  onAddEntry: (entry: Omit<Entry, 'id'>) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onAddEntry }) => {
  const [name, setName] = useState('');
  const [values, setValues] = useState<Weights>(
    EVALUATION_FIELDS.reduce((acc, field) => ({ ...acc, [field]: 5 }), {} as Weights)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a name');
      return;
    }
    onAddEntry({ name, values });
    setName('');
    // Reset values to default 5
    setValues(EVALUATION_FIELDS.reduce((acc, field) => ({ ...acc, [field]: 5 }), {} as Weights));
  };

  const handleValueChange = (field: string, value: number) => {
    setValues((prev) => ({
      ...prev,
      [field]: Math.min(10, Math.max(1, value)), // Clamp between 1 and 10
    }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3>Add New Option</h3>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          placeholder="e.g. Company A"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '1rem' }}>
        {EVALUATION_FIELDS.map((field) => (
          <div key={field} style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{field} (1-10)</label>
            <input
              type="number"
              min="1"
              max="10"
              value={values[field]}
              onChange={(e) => handleValueChange(field, Number(e.target.value))}
              style={{ padding: '4px' }}
            />
          </div>
        ))}
      </div>

      <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        Add Option
      </button>
    </form>
  );
};

export default EntryForm;
