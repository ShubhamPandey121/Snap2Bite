import { Insight } from '../../types';

export const translate = (chemical: string): { simple: string; verdict: Insight['type']; explanation: string } => {
  const map: Record<string, any> = {
    'High-Fructose Corn Syrup': { simple: 'Added sugar', verdict: 'WATCH_OUT', explanation: 'Contains 12g per serving – limit for metabolic health.' },
    'Natural Colors': { simple: 'Plant-based dyes', verdict: 'GOOD_NEWS', explanation: 'No artificial dyes used here.' },
    // Expand as needed
  };
  return map[chemical] || { simple: chemical, verdict: 'INSIGHT', explanation: 'Generally safe; monitor intake.' };
};

export const generateDoodle = (insights: Insight[]): string => {
  const watchOuts = insights.filter(i => i.type === 'WATCH_OUT').length;
  return watchOuts > 0 
    ? "Here's my doodle notes! It's mostly okay, but keep an eye on sugar content if you're snacking a lot. 🦾" 
    : "All clear – enjoy! 🍎";
};