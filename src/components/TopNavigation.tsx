type TopNavigationProps = {
  activeTab: 'sizes' | 'global';
  onTabChange: (tab: 'sizes' | 'global') => void;
};

export function TopNavigation({ activeTab, onTabChange }: TopNavigationProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 px-1 py-1 flex items-center gap-1">
      <button
        onClick={() => onTabChange('Creative')}
        className={`text-xs px-5 py-1.5 rounded-full transition-all ${
          activeTab === 'Creative'
            ? 'bg-gray-900 text-white'
            : 'bg-transparent text-gray-600 hover:bg-gray-100'
        }`}
      >
        Creative view
      </button>
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
