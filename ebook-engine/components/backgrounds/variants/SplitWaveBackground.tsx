/**
 * SplitWaveBackground — vertical organic division between two color regions.
 *
 * Composition:
 *   - Left region: primary (fills ~60% of the width)
 *   - Right region: secondary — separated by a flowing S-curve
 *   - Thin accent stroke traces the separator
 *   - Subtle secondary dots scattered on the left for texture
 */
export default function SplitWaveBackground() {
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

      {/* Right panel with organic S-curve separator */}
      <path
        d="M62,0 C52,16 66,34 58,52 C50,70 64,84 59,102 L102,102 L102,0 Z"
        style={{ fill: "var(--ebook-bg-secondary)" }}
      />

      {/* Accent stroke along the separator curve */}
      <path
        d="M62,0 C52,16 66,34 58,52 C50,70 64,84 59,102"
        style={{
          fill: "none",
          stroke: "var(--ebook-bg-accent)",
          strokeWidth: 0.7,
          opacity: 0.75,
        }}
      />

      {/* Texture dots in left region */}
      <circle
        cx="22"
        cy="16"
        r="7"
        style={{ fill: "var(--ebook-bg-secondary)", opacity: 0.18 }}
      />
      <circle
        cx="32"
        cy="72"
        r="4"
        style={{ fill: "var(--ebook-bg-accent)", opacity: 0.14 }}
      />
      <circle
        cx="10"
        cy="48"
        r="3"
        style={{ fill: "var(--ebook-bg-secondary)", opacity: 0.12 }}
      />
    </svg>
  );
}
