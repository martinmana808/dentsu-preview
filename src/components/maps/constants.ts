export const SIZES = [
  '2400×800',
  '5000×2000',
  '3000×1500',
  '4000×2500',
  '1200×800',
  '800×600',
  '400×300',
  '120×120',
  '180×180',
  '1080×1080',
  '900×900',
  '480×480',
  '1400×2000',
  '600×900',
  '1200×1800',
];

export const PROPERTIES = [
  'Headline',
  'Description',
  'Cover Image X-Offset',
  'Cover Image Y-Offset',
  'Cover Image Scale',
  'Photo Credits',
  'Bottom Right Logo',
  'Bottom Left Logo',
];

export const OVERRIDES_DATA: Record<string, Array<{ type: 'size' | 'range', sizes: string[] }>> = {
  'Headline': [],
  'Description': [
    { type: 'size', sizes: ['5000×2000'] },
    { type: 'size', sizes: ['180×180'] } 
  ],
  'Cover Image X-Offset': [
     { type: 'range', sizes: ['2400×800', '5000×2000', '3000×1500'] },
     { type: 'range', sizes: ['1400×2000', '600×900', '1200×1800'] }
  ],
  'Cover Image Y-Offset': [
     { type: 'size', sizes: ['900×900'] },
     { type: 'size', sizes: ['1400×2000'] }
  ],
  'Cover Image Scale': [
     { type: 'size', sizes: ['4000×2500'] },
     { type: 'size', sizes: ['180×180'] } 
  ],
  'Bottom Left Logo': [
     { type: 'range', sizes: ['4000×2500', '1200×800', '800×600', '400×300'] }
  ]
};

export const MOCK_RANGES = [
    { name: '>480 - 1200', sizes: ['2400×800', '5000×2000', '3000×1500', '4000×2500'] },
    { name: '1201 - 6000', sizes: ['1200×800', '800×600', '400×300'] },
    { name: '801 - 1200', sizes: ['120×120', '180×180', '1080×1080', '900×900', '480×480'] },
    { name: '>6001', sizes: ['1400×2000', '600×900', '1200×1800'] },
];

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

export function getAspectRatio(sizeStr: string): string {
    const parts = sizeStr.split('×');
    if (parts.length !== 2) return sizeStr;
    const width = parseInt(parts[0], 10);
    const height = parseInt(parts[1], 10);
    if (isNaN(width) || isNaN(height)) return sizeStr;
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
}
