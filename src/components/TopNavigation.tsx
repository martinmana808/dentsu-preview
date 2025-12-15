import { useState } from 'react';
import { AdFormat } from '../App';

type TopNavigationProps = {
  activeTab: 'Creative' | 'Overrides' | 'Ranges';
  onTabChange: (tab: 'Creative' | 'Overrides' | 'Ranges') => void;
  selectedFormat: AdFormat;
  onFormatChange: (format: AdFormat) => void;
};

const AVAILABLE_FORMATS: AdFormat[] = [
  { width: 300, height: 250, label: '300 × 250' },
  { width: 320, height: 50, label: '320 × 50' },
  { width: 1024, height: 768, label: '1024 × 768' },
  { width: 300, height: 600, label: '300 × 600' },
  { width: 728, height: 90, label: '728 × 90' },
];

export function TopNavigation({ activeTab, onTabChange, selectedFormat, onFormatChange }: TopNavigationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 px-1 py-1 flex items-center gap-1 z-50">
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => onTabChange('Creative')}
          className={`text-xs px-5 py-1.5 rounded-full transition-all ${
            activeTab === 'Creative'
              ? 'bg-gray-900 text-white'
              : 'bg-transparent text-gray-600 hover:bg-gray-100'
          }`}
        >
          {activeTab === 'Creative' ? selectedFormat.label : 'Creative view'}
        </button>

        {/* Dropdown Menu - Shows on hover */}
        {/* Using pt-2 instead of mt-2 to create a hoverable bridge */}
        <div 
          className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-32 transition-all duration-200 z-9999 ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-1 flex flex-col gap-0.5">
            {AVAILABLE_FORMATS.map((format) => (
              <button
                key={format.label}
                onClick={(e) => {
                  e.stopPropagation();
                  onFormatChange(format);
                  onTabChange('Creative');
                  setIsHovered(false);
                }}
                className={`text-xs px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                  selectedFormat.label === format.label ? 'font-medium text-gray-900 bg-gray-50' : 'text-gray-600'
                }`}
              >
                {format.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onTabChange('Overrides')}
        className={`text-xs px-5 py-1.5 rounded-full transition-all ${
          activeTab === 'Overrides'
            ? 'bg-gray-900 text-white'
            : 'bg-transparent text-gray-600 hover:bg-gray-100'
        }`}
      >
        Overrides map
      </button>
      <button
        onClick={() => onTabChange('Ranges')}
        className={`text-xs px-5 py-1.5 rounded-full transition-all ${
          activeTab === 'Ranges'
            ? 'bg-gray-900 text-white'
            : 'bg-transparent text-gray-600 hover:bg-gray-100'
        }`}
      >
        Ranges map
      </button>
    </div>
  );
}
