import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Entry, Weights } from '../types';
import { EVALUATION_FIELDS } from '../constants';

interface ScoreChartProps {
  entries: Entry[];
  weights: Weights;
}

// Generate distinct colors for the fields
const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F',
  '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57', '#8dd1e1', '#83a6ed', '#8e44ad'
];

const ScoreChart: React.FC<ScoreChartProps> = ({ entries, weights }) => {
  // Transform data for Recharts
  // We need to calculate the weighted score for each field for each entry
  const data = entries.map(entry => {
    const chartData: any = { name: entry.name };
    let totalScore = 0;

    EVALUATION_FIELDS.forEach(field => {
      // Score calculation: Value * Weight
      // Weight is entered as percentage (0-100), but we use the raw number as per plan
      // (or we could normalize, but consistancy is key)
      // If Weight=50 and Value=10, Result=500.
      // This is fine for comparison.
      const score = entry.values[field] * weights[field];
      chartData[field] = score;
      totalScore += score;
    });

    chartData.total = totalScore;
    return chartData;
  });

  if (entries.length === 0) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Add entries to see the comparison chart</div>;
  }

  return (
    <div style={{ height: '500px', width: '100%', marginTop: '2rem' }}>
      <h3>Comparison Chart (Stacked)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: any, name: any) => [value, name]}
            contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
          />
          <Legend />
          {EVALUATION_FIELDS.map((field, index) => (
            <Bar
              key={field}
              dataKey={field}
              stackId="a"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
