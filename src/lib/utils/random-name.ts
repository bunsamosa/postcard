const adjectives = [
  'happy', 'sunny', 'bright', 'gentle', 'sweet', 'calm', 'warm', 'soft',
  'merry', 'golden', 'lovely', 'kind', 'fresh', 'pure', 'light', 'spring',
  'summer', 'autumn', 'winter', 'morning', 'evening', 'quiet', 'peaceful'
];

const nouns = [
  'flower', 'breeze', 'cloud', 'river', 'lake', 'star', 'moon', 'sun',
  'bird', 'tree', 'leaf', 'garden', 'meadow', 'forest', 'ocean', 'wave',
  'rain', 'snow', 'wind', 'sky', 'mountain', 'valley', 'field'
];

export function generateRandomName(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(Math.random() * 1000);
  
  return `${adjective}-${noun}-${randomNum}`;
} 