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


const MOCK_RANGES = [
    { name: '>480 - 1200', sizes: ['2400×800', '5000×2000', '3000×1500', '4000×2500'] },
    { name: '1201 - 6000', sizes: ['1200×800', '800×600', '400×300'] },
    { name: '801 - 1200', sizes: ['120×120', '180×180', '1080×1080', '900×900', '480×480'] },
    { name: '>6001', sizes: ['1400×2000', '600×900', '1200×1800'] },
];

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

function getAspectRatio(sizeStr: string): string {
    const parts = sizeStr.split('×');
    if (parts.length !== 2) return sizeStr;
    const width = parseInt(parts[0], 10);
    const height = parseInt(parts[1], 10);
    if (isNaN(width) || isNaN(height)) return sizeStr;
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
}

const BaseMapTable = ({ children, rowHeaderLabel = "Properties" }: { children: React.ReactNode, rowHeaderLabel?: string }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const tableRef = React.useRef<HTMLTableElement>(null);
    const [scale, setScale] = React.useState(1);
    const [containerHeight, setContainerHeight] = React.useState('auto');
    const [showAspectRatio, setShowAspectRatio] = React.useState(false);

    React.useEffect(() => {
        const calculateScale = () => {
            if (containerRef.current && tableRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const tableWidth = tableRef.current.scrollWidth;
                const tableHeight = tableRef.current.scrollHeight;
                
                // If table is wider than container, scale down
                // If table is narrower, distinct requirement wasn't set, but "always be width" implies fitting. 
                // Let's assume we want to FIT (scale up or down).
                const newScale = containerWidth / tableWidth;
                
                setScale(newScale);
                setContainerHeight(`${tableHeight * newScale}px`);
            }
        };

        // Initial calc
        // We need a slight delay to ensure the table has re-rendered with new headers if toggled
        setTimeout(calculateScale, 0);

        // Observer
        const observer = new ResizeObserver(() => {
            calculateScale();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        // Also listen to window resize as a backup/trigger
        window.addEventListener('resize', calculateScale);

        return () => {
             observer.disconnect();
             window.removeEventListener('resize', calculateScale);
        };
    }, [children, showAspectRatio]); // Recalculate if children or view mode changes

    return (
        <div ref={containerRef} className="w-full relative origin-top-left" style={{ height: containerHeight }}>
             {/* Aspect Ratio Toggle - Positioned absolutely within the container but independent of scale? 
                 Actually, if we put it inside, it will be scaled. 
                 If we want it 'somewhere', maybe fixed? 
                 Let's put it on top-right of the container, NOT scaled. 
                 Wait, if container has overflow: hidden (implied by resizing logic?), absolute might be cut off.
                 But we removed overflow-auto.
             */}
             <div className="togglePixelRatio absolute top-[-3rem] z-50">
                 <button 
                    onClick={() => setShowAspectRatio(!showAspectRatio)}
                    className="bg-gray-100 border border-gray-300 hover:bg-accent hover:bg-blue-500/10 hover:bg-green-500/10 px-5 py-1.5 rounded-full text-xs transition-all"
                 >
                    {showAspectRatio ? "Show Pixel Sizes" : "Display Aspect Ratios"}
                 </button>
             </div>

             <div 
                style={{ 
                    transform: `scale(${scale})`, 
                    transformOrigin: 'top left',
                    width: 'max-content' // Ensure table takes full natural width for calculation
                }}
             >
                 <table ref={tableRef} className="w-max border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="sticky left-0 z-20 bg-gray-50 p-2 font-medium text-gray-700 text-left w-48 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                                 {rowHeaderLabel}
                            </th>
                            {SIZES.map(size => (
                                <th key={size} className="relative tableCell p-2 font-medium text-gray-600  border-gray-300 min-w-[100px] text-center whitespace-nowrap">
                                    <div className=" grid place-items-center">
                                        <span className={`col-start-1 row-start-1 transition-opacity duration-300 ${showAspectRatio ? 'opacity-0' : 'opacity-100'}`}>
                                            {size}
                                        </span>
                                        <span className={`sizesRatios col-start-1 row-start-1 transition-opacity duration-300 ${showAspectRatio ? 'opacity-100' : 'opacity-0'}`}>
                                            {getAspectRatio(size)}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                 </table>
             </div>
        </div>
    );
};

export function OverridesMap() {
    return (
        <div className=" rounded-lg    p-6 w-full">
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

                             const prevSize = colIndex > 0 ? SIZES[colIndex - 1] : null;
                             const nextSize = colIndex < SIZES.length - 1 ? SIZES[colIndex + 1] : null;

                             const isStart = rangeOverride && (!prevSize || !rangeOverride.sizes.includes(prevSize));
                             const isEnd = rangeOverride && (!nextSize || !rangeOverride.sizes.includes(nextSize));

                             // Styles for the range strip
                             let rangeStyle: React.CSSProperties = {};
                             if (rangeOverride) {
                                rangeStyle = {
                                    position: 'absolute',
                                    height: '1rem', // h-4
                                    backgroundColor: '#a855f7', // purple-500
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 10,
                                };

                                if (isStart && isEnd) {
                                    // Single cell range (if any)
                                    rangeStyle.left = '50%';
                                    rangeStyle.right = '50%';
                                    rangeStyle.width = '10px'; // Minimal width for visibility? Or 0?
                                    rangeStyle.marginLeft = '-5px'; // Center it
                                    rangeStyle.borderRadius = '100rem';
                                } else if (isStart) {
                                    rangeStyle.left = 'calc(50% - 8px)';
                                    rangeStyle.right = '-1px'; // Connect to right
                                    rangeStyle.borderTopLeftRadius = '100rem';
                                    rangeStyle.borderBottomLeftRadius = '100rem';
                                } else if (isEnd) {
                                    rangeStyle.left = '-1px'; // Connect to left
                                    rangeStyle.right = 'calc(50% - 8px)';
                                    rangeStyle.borderTopRightRadius = '100rem';
                                    rangeStyle.borderBottomRightRadius = '100rem';
                                } else {
                                    // Middle
                                    rangeStyle.left = '0';
                                    rangeStyle.right = '0';
                                    rangeStyle.marginInline = '-1px';
                                }
                             }

                             return (
                                 <td key={size} className="">
                                     <div className="w-full h-full flex items-center justify-center relative">
                                        
                                        {/* Range Strip */}
                                        {rangeOverride && (
                                            <div style={rangeStyle} />
                                        )}

                                        {/* Size Override (Circle) */}
                                        {sizeOverride && (
                                            <div className="w-4 h-4 bg-orange-500 rounded-full z-20 shadow-sm" title="Size Override" />
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
    return (
        <div className=" rounded-lg    p-6 w-full">
             <BaseMapTable rowHeaderLabel="Ranges">
                {MOCK_RANGES.map((range, rowIndex) => (
                    <tr key={`${range.name}-${rowIndex}`} className=" border-gray-100 hover:bg-gray-50/30 transition-colors">
                        <td className="propertyCell sticky left-0 z-10  p-3 font-medium text-gray-800 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] whitespace-nowrap">
                            {range.name}
                        </td>
                        {SIZES.map((size, colIndex) => {
                             // Check if THIS specific flattened range includes this size
                             const isInRange = range.sizes.includes(size);
                             
                             const prevSize = colIndex > 0 ? SIZES[colIndex - 1] : null;
                             const nextSize = colIndex < SIZES.length - 1 ? SIZES[colIndex + 1] : null;

                             const isStart = isInRange && (!prevSize || !range.sizes.includes(prevSize));
                             const isEnd = isInRange && (!nextSize || !range.sizes.includes(nextSize));

                             // Styles for the range strip
                             let rangeStyle: React.CSSProperties = {};
                             if (isInRange) {
                                rangeStyle = {
                                    position: 'absolute',
                                    height: '1rem', // h-4
                                    backgroundColor: '#a855f7', // purple-500
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 10,
                                };

                                if (isStart && isEnd) {
                                    rangeStyle.left = '50%';
                                    rangeStyle.right = '50%';
                                    rangeStyle.width = '10px';
                                    rangeStyle.marginLeft = '-5px';
                                    rangeStyle.borderRadius = '100rem';
                                } else if (isStart) {
                                    rangeStyle.left = 'calc(50% - 8px)';
                                    rangeStyle.right = '-1px';
                                    rangeStyle.borderTopLeftRadius = '100rem';
                                    rangeStyle.borderBottomLeftRadius = '100rem';
                                } else if (isEnd) {
                                    rangeStyle.left = '-1px';
                                    rangeStyle.right = 'calc(50% - 8px)';
                                    rangeStyle.borderTopRightRadius = '100rem';
                                    rangeStyle.borderBottomRightRadius = '100rem';
                                } else {
                                    // Middle
                                    rangeStyle.left = '0';
                                    rangeStyle.right = '0';
                                    rangeStyle.marginInline = '-1px';
                                }
                             }
                             
                             return (
                                 <td key={size} className="">
                                     <div className="w-full h-full flex items-center justify-center relative">
                                        {isInRange && (
                                            <div style={rangeStyle} />
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
