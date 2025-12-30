import { useState } from 'react';
import './App.css';
import WeightsInput from './components/WeightsInput';
import EntryForm from './components/EntryForm';
import ScoreChart from './components/ScoreChart';
import { EVALUATION_FIELDS } from './constants';
import type { Entry, Weights } from './types';

function App() {
  // Initialize weights to 100% by default or maybe 50%
  const [weights, setWeights] = useState<Weights>(
    EVALUATION_FIELDS.reduce((acc, field) => ({ ...acc, [field]: 100 }), {} as Weights)
  );

  const [entries, setEntries] = useState<Entry[]>([]);

  const handleWeightChange = (field: string, value: number) => {
    setWeights((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddEntry = (newEntryData: Omit<Entry, 'id'>) => {
    const newEntry: Entry = {
      ...newEntryData,
      id: crypto.randomUUID(),
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const handleRemoveEntry = (id: string) => {
    setEntries((prev) => prev.filter(e => e.id !== id));
  }

  return (
    <div className="App" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1>Decision Matrix</h1>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <WeightsInput weights={weights} onWeightChange={handleWeightChange} />
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <EntryForm onAddEntry={handleAddEntry} />

          {entries.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3>Current Options</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {entries.map(entry => (
                  <li key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #eee' }}>
                    <span>{entry.name}</span>
                    <button onClick={() => handleRemoveEntry(entry.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <ScoreChart entries={entries} weights={weights} />
    </div>
  );
}

export default App;
