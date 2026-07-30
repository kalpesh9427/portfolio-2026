/**
 * CircularText — Premium rotating text component
 *
 * Renders text in a circle using CSS transforms.
 * Each character is placed at an equal angular interval around the circle.
 *
 * ## Positioning Math
 *
 * Given N characters and a radius R:
 * - Each character i is rotated by `(360 / N) * i` degrees from the top (12-o'clock).
 * - The character's `<span>` wrapper has `transform-origin: bottom center`,
 *   `height: 50%` of the container, and `left: 50%`.
 * - A `rotate(angle)` on the wrapper swings the character to its position.
 * - The inner `<span>` receives a `translateY(-radius)` to push outward, but since
 *   we use height: 50% with transform-origin at bottom, the character naturally
 *   sits at the top edge when the radius matches half the container size.
 *
 * Only the parent `.circularText` div rotates via a CSS animation, so individual
 * characters share a single composited layer — no per-character repaints.
 */

"use client";

import React, { useMemo, useState, useCallback } from "react";
import styles from "./CircularText.module.css";

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface CircularTextProps {
  /** The string to display in a circle. Include spacing / separators as needed. */
  text: string;
  /** Radius of the text circle in pixels (desktop). Responsive overrides apply automatically. */
  radius?: number;
  /** Font size for each character in pixels. */
  fontSize?: number;
  /** Duration of one full rotation in seconds. */
  speed?: number;
  /** Rotate clockwise (default) or counter-clockwise. */
  clockwise?: boolean;
  /** Content to render at the center (image, icon, text, etc.). */
  centerContent?: React.ReactNode;
  /** Additional class name applied to the outermost wrapper. */
  className?: string;
  /** Show a subtle circular border ring. */
  showBorderRing?: boolean;
  /** Show a blur glow behind the center content. */
  showGlow?: boolean;
  /** Pause rotation on hover. */
  pauseOnHover?: boolean;
  /** Text color (any valid CSS color). */
  textColor?: string;
  /** Font family override. */
  fontFamily?: string;
  /** Font weight override. */
  fontWeight?: number | string;
  /** Letter spacing override (e.g. "0.2em"). */
  letterSpacing?: string;
  /** Size of the center content area in pixels. */
  centerSize?: number;
}

/* ── Component ──────────────────────────────────────────────────────────── */

const CircularText: React.FC<CircularTextProps> = ({
  text,
  radius = 95,
  fontSize = 14,
  speed = 18,
  clockwise = true,
  centerContent,
  className = "",
  showBorderRing = false,
  showGlow = false,
  pauseOnHover = true,
  textColor,
  fontFamily,
  fontWeight,
  letterSpacing,
  centerSize,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  /* Memoize character generation to avoid recalculating every render */
  const characters = useMemo(() => {
    const chars = text.split("");
    const total = chars.length;
    const angleStep = 360 / total;

    return chars.map((char, index) => ({
      char,
      angle: angleStep * index,
      key: `${char}-${index}`,
    }));
  }, [text]);

  /* Container size = 2 × radius (CSS will override via media queries) */
  const containerSize = radius * 2 + fontSize;

  /* Center content area defaults to ~45% of the container */
  const computedCenterSize = centerSize ?? Math.round(containerSize * 0.45);

  /* CSS custom property overrides */
  const containerStyle: React.CSSProperties = {
    "--ct-size": `${containerSize}px`,
    "--ct-speed": `${speed}s`,
    ...(textColor ? { "--ct-text-color": textColor } : {}),
    ...(fontFamily ? { "--ct-font-family": fontFamily } : {}),
    ...(fontWeight !== undefined
      ? { "--ct-font-weight": String(fontWeight) }
      : {}),
    ...(letterSpacing ? { "--ct-letter-spacing": letterSpacing } : {}),
  } as React.CSSProperties;

  /* Build class list for the rotating ring */
  const ringClasses = [
    styles.circularText,
    !clockwise ? styles.counterClockwise : "",
    pauseOnHover && isHovered ? styles.paused : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`${styles.circularTextContainer} ${className}`}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={text.trim()}
      role="img"
    >
      {/* Rotating text ring */}
      <div className={ringClasses} aria-hidden="true">
        {characters.map(({ char, angle, key }) => (
          <span
            key={key}
            className={styles.char}
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <span
              className={styles.charInner}
              style={{ fontSize: `${fontSize}px` }}
            >
              {char}
            </span>
          </span>
        ))}
      </div>

      {/* Optional glow */}
      {showGlow && <div className={styles.glow} aria-hidden="true" />}

      {/* Optional border ring */}
      {showBorderRing && (
        <div className={styles.borderRing} aria-hidden="true" />
      )}

      {/* Center content */}
      {centerContent && (
        <div
          className={styles.centerContent}
          style={{
            width: `${computedCenterSize}px`,
            height: `${computedCenterSize}px`,
          }}
        >
          {centerContent}
        </div>
      )}
    </div>
  );
};

export default CircularText;
