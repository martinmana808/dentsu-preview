import { AdFormat } from '../App';
import { SelectedElement } from '../App';
import creativeImage from 'figma:asset/cfde5f9ca67357be1c660321a574dbff60409e08.png';

type AdCanvasProps = {
  format: AdFormat;
  onElementClick: (element: SelectedElement) => void;
};

export function AdCanvas({ format, onElementClick }: AdCanvasProps) {
  return (
    <>

    <div
      className="creative relative shadow-2xl overflow-hidden"
      style={{
        width: `${format.width}px`,
        height: `${format.height}px`,
        backgroundColor: '#000000',
      }}
    >
      {/* Headline Area - Top */}
      <div
        className="absolute top-0 left-0 right-0 h-20 cursor-pointer hover:bg-blue-500/10 transition-colors z-10"
        onClick={() => onElementClick('headline')}
        title="Click to edit headline"
      />

      {/* Cover Image - Center */}
      <div
        className="absolute top-20 left-0 right-0 bottom-40 cursor-pointer hover:bg-green-500/10 transition-colors z-10"
        onClick={() => onElementClick('coverImage')}
        title="Click to edit cover image"
      />

      {/* Description Area - Bottom middle */}
      <div
        className="absolute bottom-12 left-0 right-0 h-28 cursor-pointer hover:bg-purple-500/10 transition-colors z-10"
        onClick={() => onElementClick('description')}
        title="Click to edit description"
      />

      {/* Bottom Left Logo */}
      <div
        className="absolute bottom-2 left-2 w-20 h-8 cursor-pointer hover:bg-yellow-500/20 transition-colors z-10"
        onClick={() => onElementClick('logoBottomLeft')}
        title="Click to edit bottom left logo"
      />

      {/* Bottom Right Logo */}
      <div
        className="absolute bottom-2 right-2 w-20 h-8 cursor-pointer hover:bg-yellow-500/20 transition-colors z-10"
        onClick={() => onElementClick('logoBottomRight')}
        title="Click to edit bottom right logo"
      />

      {/* Actual Image */}
      <img
        src={creativeImage}
        alt="Ad Creative"
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
    </>
  );
}
