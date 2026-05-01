/**
 * OrganicBackground — layered blob shapes with an editorial feel.
 *
 * Composition:
 *   - Dark primary base
 *   - Large organic blob in the bottom-right — dominant secondary region
 *   - Smaller blob peeking from top-right
 *   - Accent blob bleeding in from the left
 *   - Central accent dot for visual focal balance
 */
export default function OrganicBackground() {
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

      {/* Large organic blob — bottom-right */}
      <path
        d="M56,66 C70,52 105,60 104,84 C103,100 86,110 68,102 C50,94 42,80 56,66 Z"
        style={{ fill: "var(--ebook-bg-secondary)", opacity: 0.82 }}
      />

      {/* Medium blob — top-right, partial */}
      <path
        d="M72,-2 C90,-8 110,6 108,24 C106,40 90,44 80,38 C70,32 62,18 72,-2 Z"
        style={{ fill: "var(--ebook-bg-secondary)", opacity: 0.48 }}
      />

      {/* Accent blob — left edge */}
      <path
        d="M-10,40 C-6,26 10,20 22,30 C34,40 30,60 18,64 C6,68 -14,54 -10,40 Z"
        style={{ fill: "var(--ebook-bg-accent)", opacity: 0.32 }}
      />

      {/* Central focal dot */}
      <circle
        cx="50"
        cy="50"
        r="3.5"
        style={{ fill: "var(--ebook-bg-accent)", opacity: 0.18 }}
      />
    </svg>
  );
}
