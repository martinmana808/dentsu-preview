type Range = {
  name: string;
  formats: string[];
  color: string;
};

export function RangeVisualizer() {
  const ranges: Range[] = [
    {
      name: 'Super Tall',
      formats: ['300 × 600'],
      color: 'bg-purple-500',
    },
    {
      name: 'Tall',
      formats: ['300 × 250'],
      color: 'bg-blue-500',
    },
    {
      name: 'Wide',
      formats: ['728 × 90', '320 × 50'],
      color: 'bg-green-500',
    },
    {
      name: 'Super Wide',
      formats: ['1024 × 768'],
      color: 'bg-orange-500',
    },
  ];

  const allFormats = ['300 × 250', '320 × 50', '1024 × 768', '300 × 600', '728 × 90'];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-gray-900">Range Visualizer</h3>
        <span className="text-xs text-gray-500">Aspect Ratio Groups</span>
      </div>
      <div className="space-y-3">
        {/* Format Labels */}
        <div className="flex gap-2 pb-2 border-b border-gray-200">
          {allFormats.map((format) => (
            <div
              key={format}
              className="flex-1 text-xs text-center text-gray-700 px-2 py-1.5 bg-gray-50 rounded"
            >
              {format}
            </div>
          ))}
        </div>

        {/* Range Bars */}
        {ranges.map((range) => (
          <div key={range.name} className="space-y-1.5">
            <div className="text-xs text-gray-700">{range.name}</div>
            <div className="flex gap-2">
              {allFormats.map((format) => {
                const isInRange = range.formats.includes(format);
                return (
                  <div key={format} className="flex-1 h-8 rounded bg-gray-50">
                    {isInRange && (
                      <div
                        className={`h-full rounded ${range.color} opacity-80 flex items-center justify-center transition-all hover:opacity-100 hover:scale-105`}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}