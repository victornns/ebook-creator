import type { Ebook } from "@/ebook-engine/types/ebook";
import imageCover from "./assets/cover-image.png";

// ── Cover Showcase ─────────────────────────────────────────────────────────
// Each section renders only a chapterCover — no content blocks.
// Purpose: visually test every combination of layout × background variant.
//
// Cover layouts:   horizontal | centered | vertical | right
// Chapter layouts: horizontal | centered | vertical | minimal
// Backgrounds:     wave-cover | split-wave | organic | diagonal | layered | corner-wave

export const coversShowcaseEbook: Ebook = {
  id: "covers-showcase",
  title: "Covers Showcase",
  subtitle: "All layout × background combinations in one place",
  author: "Ebook Engine",

  // ── Main cover: layout "right" ────────────────────────────────────────────
  cover: {
    layout: "right",
    textColor: "#ffffff",
    background: { variant: "wave-cover" },
  },

  sections: [
    // ── Main cover layout variants ────────────────────────────────────────
    // (using chapter covers to cycle through the 4 EbookCover layout names
    //  as visual reference — chapter covers share the same aesthetic)

    {
      id: "cover-horizontal",
      title: "Cover — Horizontal",
      blocks: [],
      chapterCover: {
        chapterNumber: 1,
        description: "layout: horizontal  ·  background: layered",
        image: { src: imageCover, alt: "Cover horizontal" },
        layout: "horizontal",
        background: { variant: "layered" },
      },
    },
    {
      id: "cover-centered",
      title: "Cover — Centered",
      blocks: [],
      chapterCover: {
        chapterNumber: 2,
        description: "layout: centered  ·  background: split-wave",
        image: { src: imageCover, alt: "Cover centered" },
        layout: "centered",
        background: { variant: "split-wave" },
      },
    },
    {
      id: "cover-vertical",
      title: "Cover — Vertical",
      blocks: [],
      chapterCover: {
        chapterNumber: 3,
        description: "layout: vertical  ·  background: diagonal",
        image: { src: imageCover, alt: "Cover vertical" },
        layout: "vertical",
        background: { variant: "diagonal" },
      },
    },
    {
      id: "cover-minimal",
      title: "Cover — Minimal",
      blocks: [],
      chapterCover: {
        chapterNumber: 4,
        description: "layout: minimal  ·  background: organic",
        layout: "minimal",
        background: { variant: "organic" },
      },
    },

    // ── Background variant gallery (horizontal layout) ────────────────────

    {
      id: "bg-wave-cover",
      title: "Background — Wave Cover",
      blocks: [],
      chapterCover: {
        chapterNumber: 5,
        description: "background: wave-cover  ·  layout: horizontal",
        image: { src: imageCover, alt: "wave-cover" },
        layout: "horizontal",
        background: { variant: "wave-cover" },
      },
    },
    {
      id: "bg-split-wave",
      title: "Background — Split Wave",
      blocks: [],
      chapterCover: {
        chapterNumber: 6,
        description: "background: split-wave  ·  layout: centered",
        image: { src: imageCover, alt: "split-wave" },
        layout: "centered",
        background: { variant: "split-wave" },
      },
    },
    {
      id: "bg-organic",
      title: "Background — Organic",
      blocks: [],
      chapterCover: {
        chapterNumber: 7,
        description: "background: organic  ·  layout: horizontal",
        image: { src: imageCover, alt: "organic" },
        layout: "horizontal",
        background: { variant: "organic" },
      },
    },
    {
      id: "bg-diagonal",
      title: "Background — Diagonal",
      blocks: [],
      chapterCover: {
        chapterNumber: 8,
        description: "background: diagonal  ·  layout: vertical",
        image: { src: imageCover, alt: "diagonal" },
        layout: "vertical",
        background: { variant: "diagonal" },
      },
    },
    {
      id: "bg-layered",
      title: "Background — Layered",
      blocks: [],
      chapterCover: {
        chapterNumber: 9,
        description: "background: layered  ·  layout: minimal",
        layout: "minimal",
        background: { variant: "layered" },
      },
    },
    {
      id: "bg-corner-wave",
      title: "Background — Corner Wave",
      blocks: [],
      chapterCover: {
        chapterNumber: 10,
        description: "background: corner-wave  ·  layout: horizontal",
        image: { src: imageCover, alt: "corner-wave" },
        layout: "horizontal",
        background: { variant: "corner-wave" },
      },
    },
  ],
};
