import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import type { Streamer } from './streamersData';

interface StreamersCarouselProps {
  streamers: Streamer[];
}

const SCROLL_AMOUNT = 260;
const CARD_WIDTH_REM = 10;

const StreamersCarousel: React.FC<StreamersCarouselProps> = ({ streamers }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const scrollBy = (amount: number) => {
    trackRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const applyDepth = () => {
      frame = 0;
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.min(Math.abs(cardCenter - center) / (trackRect.width / 2), 1);
        const scale = 1 - distance * 0.3;
        const opacity = 1 - distance * 0.65;
        card.style.transform = `scale(${scale})`;
        card.style.opacity = String(opacity);
      });
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(applyDepth);
    };

    applyDepth();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [streamers]);

  return (
    <div className="relative mx-auto" style={{ maxWidth: '46rem' }}>
      <div
        ref={trackRef}
        className="dal-streamers-track flex gap-10 overflow-x-auto scroll-smooth py-2"
        style={{
          scrollSnapType: 'x mandatory',
          paddingLeft: `calc(50% - ${CARD_WIDTH_REM / 2}rem)`,
          paddingRight: `calc(50% - ${CARD_WIDTH_REM / 2}rem)`,
          WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 3rem, #000 calc(100% - 3rem), transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0, #000 3rem, #000 calc(100% - 3rem), transparent 100%)',
        }}
      >
        {streamers.map((streamer, index) => (
          <a
            key={streamer.name}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            href={streamer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="dal-streamer-card flex shrink-0 flex-col items-center gap-4 transition-transform duration-300 ease-out"
            style={{ scrollSnapAlign: 'center', width: `${CARD_WIDTH_REM}rem` }}
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
