/**
 * WaveCoverBackground — sweeping wave for main covers.
 *
 * Composition:
 *   - Dark primary base fills the full page
 *   - A decorative arc peeks from the top-right corner
 *   - A large organic wave of secondary color flows across the lower half
 *   - A lighter accent wave sits above the bottom edge
 */
export default function WaveCoverBackground() {
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

      {/* Decorative arc peeking from top-right corner */}
      <ellipse
        cx="92"
        cy="-4"
        rx="34"
        ry="22"
        style={{ fill: "var(--ebook-bg-secondary)", opacity: 0.22 }}
      />

      {/* Main wave — secondary region sweeps across lower ~45% */}
      <path
        d="M-2,58 C16,48 40,68 66,54 C82,46 94,50 102,48 L102,102 L-2,102 Z"
        style={{ fill: "var(--ebook-bg-secondary)", opacity: 0.92 }}
      />

      {/* Accent layer — thin organic band near bottom */}
      <path
        d="M-2,76 C20,68 46,82 72,70 C88,64 97,66 102,64 L102,102 L-2,102 Z"
        style={{ fill: "var(--ebook-bg-accent)", opacity: 0.32 }}
      />

      {/* Accent line at the very bottom */}
      <rect
        x="-2"
        y="97"
        width="104"
        height="1.5"
        style={{ fill: "var(--ebook-bg-accent)", opacity: 0.55 }}
      />
    </svg>
  );
}
