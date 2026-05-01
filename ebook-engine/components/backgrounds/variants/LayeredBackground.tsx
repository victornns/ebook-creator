/**
 * LayeredBackground — stacked horizontal waves fading toward the bottom.
 *
 * Composition:
 *   - Primary base across the full page
 *   - Four progressively denser wave layers in secondary, building rhythm
 *   - Light accent wave near the bottom edge
 */
export default function LayeredBackground() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      {/* Base — primary */}
      <rect
        width="100"
        height="100"
        style={{ fill: "var(--ebook-bg-primary)" }}
      />

      {/* Wave 1 — lightest, highest up */}
      <path
        d="M-2,38 Q28,30 58,40 T102,34 L102,102 L-2,102 Z"
        style={{ fill: "var(--ebook-bg-secondary)", opacity: 0.42 }}
      />

      {/* Wave 2 */}
      <path
        d="M-2,53 Q30,45 62,55 T102,49 L102,102 L-2,102 Z"
        style={{ fill: "var(--ebook-bg-secondary)", opacity: 0.58 }}
      />

      {/* Wave 3 */}
      <path
        d="M-2,67 Q32,60 64,70 T102,64 L102,102 L-2,102 Z"
        style={{ fill: "var(--ebook-bg-secondary)", opacity: 0.76 }}
      />

      {/* Wave 4 — densest secondary */}
      <path
        d="M-2,80 Q34,74 66,82 T102,76 L102,102 L-2,102 Z"
        style={{ fill: "var(--ebook-bg-secondary)", opacity: 0.9 }}
      />

      {/* Accent wave — floats above the bottom edge */}
      <path
        d="M-2,89 Q36,84 68,91 T102,86 L102,102 L-2,102 Z"
        style={{ fill: "var(--ebook-bg-accent)", opacity: 0.28 }}
      />
    </svg>
  );
}
