import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import type { Streamer } from './streamersData';

interface StreamersCarouselProps {
  streamers: Streamer[];
}

const SCROLL_AMOUNT = 260;

const StreamersCarousel: React.FC<StreamersCarouselProps> = ({ streamers }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => {
    trackRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="dal-streamers-track flex justify-center gap-10 overflow-x-auto scroll-smooth px-2 py-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {streamers.map((streamer) => (
          <a
            key={streamer.name}
            href={streamer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="dal-streamer-card flex shrink-0 flex-col items-center gap-4"
            style={{ scrollSnapAlign: 'start', width: '10rem' }}
          >
            <img
              src={streamer.avatar}
              alt={streamer.name}
              className="h-24 w-24 rounded-full object-cover"
              style={{ border: '1px solid var(--line-2)' }}
              loading="lazy"
            />
            <span
              className="dal-streamer-name text-center text-base font-semibold leading-snug"
              style={{ color: 'var(--ink)' }}
            >
              {streamer.name}
            </span>
          </a>
        ))}
      </div>

      {streamers.length > 3 && (
        <>
          <button
            type="button"
            onClick={() => scrollBy(-SCROLL_AMOUNT)}
            aria-label="Previous"
            className="absolute -left-3 top-1/2 hidden -translate-y-1/2 h-8 w-8 items-center justify-center rounded-full text-xs sm:flex"
            style={{ background: 'rgba(10,13,22,0.72)', border: '1px solid var(--line-2)', color: 'var(--ink-3)', backdropFilter: 'blur(6px)' }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(SCROLL_AMOUNT)}
            aria-label="Next"
            className="absolute -right-3 top-1/2 hidden -translate-y-1/2 h-8 w-8 items-center justify-center rounded-full text-xs sm:flex"
            style={{ background: 'rgba(10,13,22,0.72)', border: '1px solid var(--line-2)', color: 'var(--ink-3)', backdropFilter: 'blur(6px)' }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </>
      )}
    </div>
  );
};

export default StreamersCarousel;
