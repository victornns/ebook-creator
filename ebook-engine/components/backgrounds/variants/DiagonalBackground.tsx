/**
 * DiagonalBackground — bold geometric diagonal split.
 *
 * Composition:
 *   - Secondary color fills the right/bottom region
 *   - A wide primary diagonal band sweeps left-to-right
 *   - A thin accent stripe follows the leading edge
 */
export default function DiagonalBackground() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      {/* Base — secondary */}
      <rect
        width="100"
        height="100"
        style={{ fill: "var(--ebook-bg-secondary)" }}
      />

      {/* Primary diagonal band — sweeps from top-left to lower-right */}
      <path
        d="M-2,0 L72,0 L28,102 L-2,102 Z"
        style={{ fill: "var(--ebook-bg-primary)" }}
      />

      {/* Thin accent stripe on the leading diagonal edge */}
      <path
        d="M72,0 L78,0 L34,102 L28,102 Z"
        style={{ fill: "var(--ebook-bg-accent)", opacity: 0.72 }}
      />

      {/* Subtle secondary echo stripe for depth */}
      <path
        d="M-2,0 L12,0 L-2,38 Z"
        style={{ fill: "var(--ebook-bg-secondary)", opacity: 0.18 }}
      />
    </svg>
  );
}
