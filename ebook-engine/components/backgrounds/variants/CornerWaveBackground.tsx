/**
 * CornerWaveBackground — vertical accent strip on the left + wave rising from the bottom.
 *
 * Composition:
 *   - Primary base fills the full page
 *   - Left accent column tapers organically toward the bottom-right
 *   - A secondary wave sweeps up from the lower portion of the page
 */
export default function CornerWaveBackground() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 140"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <rect
        width="100"
        height="140"
        style={{ fill: "var(--ebook-bg-primary)" }}
      />

      <path
        d="M0 95 C25 80 45 110 70 92 C85 82 95 78 100 82 V140 H0 Z"
        style={{ fill: "var(--ebook-bg-secondary)" }}
      />

      <path
        d="M0 0 H35 C25 25 28 50 40 70 C52 92 48 110 35 140 H0 Z"
        style={{ fill: "var(--ebook-bg-accent)" }}
      />
    </svg>
  );
}
