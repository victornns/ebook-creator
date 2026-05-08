"use client";

import type React from "react";
import type { BackgroundConfig } from "@/ebook-engine/types/background";
import WaveCoverBackground from "./variants/WaveCoverBackground";
import SplitWaveBackground from "./variants/SplitWaveBackground";
import OrganicBackground from "./variants/OrganicBackground";
import DiagonalBackground from "./variants/DiagonalBackground";
import LayeredBackground from "./variants/LayeredBackground";
import CornerWaveBackground from "./variants/CornerWaveBackground";

interface Props {
  config: BackgroundConfig;
}

const VARIANT_MAP = {
  "wave-cover": WaveCoverBackground,
  "split-wave": SplitWaveBackground,
  organic: OrganicBackground,
  diagonal: DiagonalBackground,
  layered: LayeredBackground,
  "corner-wave": CornerWaveBackground,
} as const;

/**
 * Renders a full-page SVG decorative background.
 *
 * Must be placed as a direct child of a `position: relative` container.
 * Always renders behind content (z-index: 0).
 *
 * Colors cascade from CSS custom properties set by the ebook theme:
 *   --ebook-bg-primary, --ebook-bg-secondary, --ebook-bg-accent, --ebook-bg-neutral
 *
 * Per-page overrides can be provided via `config.colors`.
 */
export default function Background({ config }: Props) {
  const VariantComponent = VARIANT_MAP[config.variant];

  const colorOverrides: React.CSSProperties = {};
  if (config.colors?.primary) (colorOverrides as Record<string, string>)["--ebook-bg-primary"] = config.colors.primary;
  if (config.colors?.secondary) (colorOverrides as Record<string, string>)["--ebook-bg-secondary"] = config.colors.secondary;
  if (config.colors?.accent) (colorOverrides as Record<string, string>)["--ebook-bg-accent"] = config.colors.accent;
  if (config.colors?.neutral) (colorOverrides as Record<string, string>)["--ebook-bg-neutral"] = config.colors.neutral;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        ...colorOverrides,
      }}
    >
      {VariantComponent ? <VariantComponent /> : null}
    </div>
  );
}
