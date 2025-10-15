import { useState, useRef, MouseEvent } from "react";
import { ZoomIn } from "lucide-react";

interface ImageMagnifierProps {
  src: string;
  alt: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
}

export const ImageMagnifier = ({
  src,
  alt,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 2.5,
}: ImageMagnifierProps) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const imageRef = useRef<HTMLImageElement>(null);

  const mouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();

    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  };

  const mouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-lg border group cursor-zoom-in"
      onMouseEnter={mouseEnter}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
    >
      <div className="absolute top-3 left-3 z-10 bg-black/60 text-white p-2 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
        <ZoomIn className="h-4 w-4" />
      </div>

      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: "1",
          border: "2px solid #e5e7eb",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          borderRadius: "50%",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      />
    </div>
  );
};
