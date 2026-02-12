import { AdFormat } from '../App';

type FormatSelectorProps = {
  selectedFormat: AdFormat;
};

export function FormatSelector({ selectedFormat }: FormatSelectorProps) {
  const formats = [
    { width: 300, height: 250, label: '300 × 250' },
    { width: 320, height: 50, label: '320 × 50' },
    { width: 1024, height: 768, label: '1024 × 768' },
    { width: 300, height: 600, label: '300 × 600' },
    { width: 728, height: 90, label: '728 × 90' },
  ];

  // return (
  //   <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 px-2 py-2 flex items-center gap-1">
  //     {formats.map((format, index) => (
  //       <button
  //         key={index}
  //         className={`px-3 py-1.5 rounded-md transition-all text-sm ${
  //           selectedFormat.label === format.label
  //             ? 'bg-gray-900 text-white'
  //             : 'bg-transparent text-gray-600'
  //         }`}
  //       >
  //         {format.label}
  //       </button>
  //     ))}
  //   </div>
  // );
}
