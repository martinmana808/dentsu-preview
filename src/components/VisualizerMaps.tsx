import React from 'react';

// --- Constants ---

const SIZES = [
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

const PROPERTIES = [
  'Headline',
  'Description',
  'Cover Image X-Offset',
  'Cover Image Y-Offset',
  'Cover Image Scale',
  'Photo Credits',
  'Bottom Right Logo',
  'Bottom Left Logo',
];

// Data Structure for Overrides
// Key: Property Name
// Value: Array of override objects { type: 'size' | 'range', sizes: string[] }
// For 'range', we manually group the sizes that are visually contiguous/grouped in the HTML.
const OVERRIDES_DATA: Record<string, Array<{ type: 'size' | 'range', sizes: string[] }>> = {
  'Headline': [],
  'Description': [
    { type: 'size', sizes: ['5000×2000'] },
    { type: 'size', sizes: ['180×180'] } // Assuming J2 is 180x180 (column index 9)
    // HTML check: 
    // Col headers: A(2400), B(5000), C(3000), D(4000), E(1200), F(800), G(400), H(120), I(180), J(1080), K(900), L(480), M(1400), N(600), O(1200).
    // Wait, let's re-verify column headers from HTML.
    // HTML:
    // 0C0: A -> 2400x800
    // 0C1: B -> 5000x2000
    // 0C2: C -> 3000x1500
    // 0C3: D -> 4000x2500
    // 0C4: E -> 1200x800
    // 0C5: F -> 800x600
    // 0C6: G -> 400x300
    // 0C7: H -> 120x120
    // 0C8: I -> 180x180
    // 0C9: J -> 1080x1080
    // 0C10: K -> 900x900
    // 0C11: L -> 480x480
    // 0C12: M -> 1400x2000
    // 0C13: N -> 600x900
    // 0C14: O -> 1200x1800
    
    // Row 3 (Description): s2 (orange) at C1 (B -> 5000x2000) and C10 (K -> 900x900).
    // Wait, HTML says:
    // Row index 2 (Description):
    // td.s0 (2400)
    // td.freezebar
    // td (missing class? No, straightforward td)
    // td.s2 (This is 4th cell? No.)
    // Let's trace carefully.
    // Headers: Empty, A, Freeze, B, C, D...
    // The HTML structure is a bit weird with freeze bars.
    // "s2" is background-color: #f6b26b (Orange).
    // "s3" is background-color: #9900ff (Purple).
    
    // Row 3 (Description):
    // Cell 0: "Description" (s1)
    // Cell 1: Freezebar
    // Cell 2: (A - 2400) -> Empty
    // Cell 3: (B - 5000) -> s2 (Orange) -> YES
    // Cell 4: (C - 3000) -> Empty
    // ...
    // Cell 10: (I - 180) -> Empty
    // Cell 11: (J - 1080) -> s2 (Orange). Wait, let's count cells.
    // 0: Desc
    // 1: Freeze
    // 2: A
    // 3: B (Orange)
    // 4: C
    // 5: D
    // 6: E
    // 7: F
    // 8: G
    // 9: H
    // 10: I
    // 11: J (Orange) -> 1080x1080.
    // So Description overrides: 5000x2000, 1080x1080.
    
    // Row 4 ((Cover Image) X-Offset):
    // Purple (s3) at:
    // 2 (A - 2400)
    // 3 (B - 5000)
    // 4 (C - 3000)
    // ...
    // 14 (M - 1400) -> s3
    // 15 (N - 600) -> s3
    // 16 (O - 1200) -> s3
    // So Range 1: 2400, 5000, 3000. Range 2: 1400, 600, 1200.
    
    // Row 5 ((Cover Image) Y-Offset):
    // Orange at:
    // 12 (K - 900)
    // 14 (M - 1400)
    
    // Row 6 ((Cover Image) Scale):
    // Orange at:
    // 5 (D - 4000)
    // 10 (I - 180) -> Wait, let's recount.
    // D is index 5 (if 2 is A).
    // I is index 10.
    // K is index 12.
    // So Scale overrides: 4000x2500, 180x180.
    
    // Row 9 (Bottom Left Logo):
    // Purple at:
    // 5 (D - 4000)
    // 6 (E - 1200)
    // 7 (F - 800)
    // 8 (G - 400)
    
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

const BaseMapTable = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full overflow-auto  rounded-md shadow-sm">
             <table className="w-max border-collapse text-sm">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="sticky left-0 z-20 bg-gray-50 p-2 font-medium text-gray-700 text-left w-48 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                             Properties
                        </th>
                        {SIZES.map(size => (
                            <th key={size} className="tableCell p-2 font-medium text-gray-600  border-gray-300 min-w-[100px] text-center whitespace-nowrap">
                                {size}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
             </table>
        </div>
    );
};

export function OverridesMap() {
    return (
        <div className=" rounded-lg    p-6 w-full overflow-y-auto max-h-[80vh]">
            <BaseMapTable>
                {PROPERTIES.map((prop, rowIndex) => (
                    <tr key={prop} className=" border-gray-100 hover:bg-gray-50/30 transition-colors">
                         {/* Sticky Property Header */}
                        <td className="propertyCell sticky left-0 z-10  p-3 font-medium text-gray-800 border-gray-300 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] whitespace-nowrap">
                            {prop}
                        </td>
                        
                        {/* Data Cells */}
                        {SIZES.map((size, colIndex) => {
                             const overrides = OVERRIDES_DATA[prop] || [];
                             const rangeOverride = overrides.find(o => o.type === 'range' && o.sizes.includes(size));
                             const sizeOverride = overrides.find(o => o.type === 'size' && o.sizes.includes(size));

                             // Determine cell styles
                             // Visual hierarchy: Range strips (purple) are behind. Size circles (orange) are on top.
                             // Implementing strip: If adjacent cells are in the same range, we connect them visually?
                             // The prompt says "Draw a horizontal strip".
                             // We can just color the cell background purple for range items.
                             
                             return (
                                 <td key={size} className="">
                                     {/* Container for absolute positioning */}
                                     <div className="w-full h-full flex items-center justify-center relative">
                                        
                                        {/* Range Strip (Background) */}
                                        {rangeOverride && (
                                            <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                                                <div className="w-full h-4 bg-purple-500 absolute z-10" />
                                            </div>
                                        )}

                                        {/* Size Override (Circle) */}
                                        {sizeOverride && (
                                            <div className="w-4 h-4 bg-orange-500 rounded-full z-10 shadow-sm" title="Size Override" />
                                        )}
                                     </div>
                                 </td>
                             );
                        })}
                    </tr>
                ))}
            </BaseMapTable>
        </div>
    );
}

export function RangesMap() {
     // User said to use "Ignore the CSV." "use the information from this html".
     // HTML shows NO separate Ranges data.
     // But previous request said "Ranges Map ... only shows ranges that exist." "One strip per range."
     // I will reproduce the Overrides Map structure but ONLY showing the purple strips (Ranges).
     // Ideally, Ranges Map rows should be RANGES (as per logical structure), but if user wants "Based on the same Base Map",
     // and wants to use the HTML info which places ranges on PROPERTY rows... 
     // I will replicate the Overrides Map but hide the orange circles. This shows "where ranges apply".
     // BUT, the HTML shows "Cover Image X-Offset" has a range.
     // Is the range named "Cover Image X-Offset"? No, that's the property.
     // The "Range" concept seems to be: A set of sizes grouped together.
     // I will stick to showing the exact same grid as Overrides Map, but ONLY visualizing the purple strips.
     
    return (
        <div className=" rounded-lg    p-6 w-full overflow-y-auto max-h-[80vh]">
             <BaseMapTable>
                {PROPERTIES.map((prop, rowIndex) => (
                    <tr key={prop} className=" border-gray-100 hover:bg-gray-50/30 transition-colors">
                        <td className="propertyCell sticky left-0 z-10  p-3 font-medium text-gray-800 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] whitespace-nowrap">
                            {prop}
                        </td>
                        {SIZES.map((size, colIndex) => {
                             const overrides = OVERRIDES_DATA[prop] || [];
                             const rangeOverride = overrides.find(o => o.type === 'range' && o.sizes.includes(size));
                             
                             return (
                                 <td key={size} className="">
                                     <div className="w-full h-full flex items-center justify-center relative">
                                        {rangeOverride && (
                                            <div className="absolute inset-0 bg-purple-500/10 flex items-center justify-center">
                                                <div className="w-full h-4 bg-purple-500 absolute z-10" />
                                            </div>
                                        )}
                                     </div>
                                 </td>
                             );
                        })}
                    </tr>
                ))}
            </BaseMapTable>
        </div>
    );
}
