import type { Ebook } from "@/ebook-engine/types/ebook";
import imageCover from "./assets/cover-image.png";
import imageContent from "./assets/sample-image.jpg";

export const demoEbook: Ebook = {
  id: "demo",
  title: "Demo",
  subtitle: "A practical guide to sustainability, conscious living, and building a better future for our planet",
  author: "Demo Author",
  cover: {
    image: { src: imageCover, alt: "Living Green" },
    textColor: "#e8f5e9",
    layout: "centered",
    background: { variant: "corner-wave" },
  },
  sections: [
    // ── Introduction — SHORT (fits ~1 page) ───────────────────────────────────
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        { type: "heading", level: 1, content: "Introduction" },
        { type: "rich-paragraph", content: "Every choice we make — from what we eat to how we move — leaves a mark on our shared home. This book is a practical starting point for anyone who wants to live more consciously without feeling overwhelmed." },
        { type: "quote", content: "The Earth does not belong to us. We belong to the Earth. — Chief Seattle" },
        { type: "list", items: ["Understand the systems you are part of", "Reduce before you offset", "Act in community, not just individually", "Measure, learn, and adapt continuously"] },
        { type: "note", content: "Each chapter builds on the previous one. Feel free to jump to the section most relevant to your life right now." },
      ],
    },

    // ── Chapter 1 ────────────────────────────────────────────────────────────
    {
      id: "chapter-1",
      title: "Understanding Our Planet",
      blocks: [],
      chapterCover: {
        chapterNumber: 1,
        description: "The science behind climate change and why the data demands urgent, collective action.",
        image: { src: imageCover, alt: "Understanding Our Planet" },
        layout: "horizontal",
        background: { variant: "layered" },
      },
    },

    // SHORT — fits ~1 page
    {
      id: "the-living-system",
      title: "The Living System",
      blocks: [
        { type: "heading", level: 1, content: "The Living System" },
        { type: "rich-paragraph", content: "Earth's biosphere is a single interconnected system. Every species, river, and soil microbe plays a role. When one part is disrupted, ripple effects reach the entire web of life." },
        { type: "highlight", content: "Roughly 80% of Earth's biodiversity exists in tropical rainforests, which cover less than 6% of the planet's surface." },
        { type: "image-with-caption", src: imageContent, alt: "Green forest and natural ecosystem", caption: "Tropical forests are home to more than half of the world's terrestrial species." },
      ],
    },

    // LONG — spans 3+ pages
    {
      id: "climate-data",
      title: "Climate Data",
      blocks: [
        { type: "heading", level: 1, content: "Climate Data" },
        { type: "rich-paragraph", content: "The scientific record on climate change is unambiguous. Global average temperatures have risen by 1.1 °C above pre-industrial levels, and every decade since the 1980s has been warmer than the one before it." },
        { type: "heading", level: 2, content: "Key Greenhouse Gases" },
        { type: "rich-paragraph", content: "Not all greenhouse gases are created equal. Their warming impact depends on both their concentration and how long they persist in the atmosphere." },
        {
          type: "table",
          caption: "Greenhouse gases and their global warming potential (GWP) over 100 years.",
          headers: ["Gas", "Symbol", "GWP (100yr)", "Main source"],
          rows: [
            ["Carbon dioxide", "CO₂", "1", "Fossil fuels, deforestation"],
            ["Methane", "CH₄", "28", "Agriculture, natural gas, landfill"],
            ["Nitrous oxide", "N₂O", "265", "Fertilisers, livestock"],
            ["HFC-134a", "HFCs", "1,430", "Refrigeration, aerosols"],
          ],
        },
        { type: "warning", label: "Tipping points", content: "Scientists have identified at least 16 climate tipping points — thresholds beyond which changes become self-sustaining and largely irreversible. We have likely already crossed five." },
        { type: "heading", level: 2, content: "Observed Changes Since 1850" },
        {
          type: "item-list",
          label: "Key Indicators",
          items: [
            "Global average temperature +1.1 °C above pre-industrial baseline",
            "Sea level rise of approximately 20 cm since 1900",
            "Arctic sea ice volume declined by ~75% since 1980",
            "Ocean acidity increased by 26% since the industrial revolution",
            "Frequency of extreme heat events doubled in the last 50 years",
          ],
        },
        { type: "heading", level: 2, content: "Tracking Emissions with Code" },
        { type: "rich-paragraph", content: "Open datasets allow anyone to query historical emissions data. Here is a minimal example using the Our World in Data CSV API:" },
        {
          type: "code",
          content: `fetch("https://ourworldindata.org/grapher/co2-emissions.csv")
  .then((res) => res.text())
  .then((csv) => {
    const rows = csv.split("\\n").slice(1);
    const totals = rows.map((row) => {
      const [country, , year, emissions] = row.split(",");
      return { country, year: Number(year), emissions: Number(emissions) };
    });
    console.log(totals.filter((r) => r.country === "World"));
  });`,
        },
        { type: "quote", content: "We are the first generation to feel the impact of climate change and the last generation that can do something about it. — Barack Obama" },
        { type: "rich-paragraph", content: "The data is freely available. The challenge is no longer awareness — it is translating knowledge into sustained, structural change at every level of society." },
      ],
    },

    // ── Chapter 2 ────────────────────────────────────────────────────────────
    {
      id: "chapter-2",
      title: "Sustainable Practices",
      blocks: [],
      chapterCover: {
        chapterNumber: 2,
        description: "Practical habits and frameworks to reduce your environmental footprint, starting today.",
        image: { src: imageCover, alt: "Sustainable Practices" },
        layout: "vertical",
        background: { variant: "split-wave" },
      },
    },

    // MEDIUM — spans ~2 pages
    {
      id: "conscious-consumption",
      title: "Conscious Consumption",
      blocks: [
        { type: "heading", level: 1, content: "Conscious Consumption" },
        { type: "rich-paragraph", content: "Most of our environmental impact is embedded in the things we buy. Shifting purchasing habits is one of the highest-leverage changes an individual can make." },
        { type: "heading", level: 2, content: "The 5 Rs — in Order" },
        {
          type: "steps",
          label: "Apply in this order",
          items: [
            "Refuse — say no to what you do not need, especially single-use items and unnecessary packaging.",
            "Reduce — buy less and choose quality over quantity.",
            "Reuse — find second lives for things before discarding them.",
            "Recycle — sort and process materials correctly through local programmes.",
            "Rot — compost organic matter to return nutrients to the soil.",
          ],
        },
        { type: "heading", level: 2, content: "Home Energy" },
        { type: "rich-paragraph", content: "Heating and cooling typically account for 40–50% of household energy use. Improving insulation and switching to a green energy tariff are the two highest-impact steps." },
        {
          type: "item-list",
          label: "Quick wins",
          items: ["Replace all remaining bulbs with LED", "Install a smart thermostat", "Seal air leaks around doors and windows", "Switch to a renewable electricity tariff"],
        },
        { type: "note", label: "Good to know", content: "Solar panel costs have dropped by over 90% since 2010, making rooftop installations accessible to more households than ever before." },
        { type: "image-with-caption", src: imageContent, alt: "Renewable energy and sustainable home", caption: "Rooftop solar combined with a home battery can eliminate grid dependence during daylight hours." },
        { type: "divider" },
        { type: "highlight", content: "A single reusable water bottle can replace over 1,000 single-use plastic bottles across its lifetime." },
      ],
    },

    // ── Chapter 3 ────────────────────────────────────────────────────────────
    {
      id: "chapter-3",
      title: "Taking Action",
      blocks: [],
      chapterCover: {
        chapterNumber: 3,
        description: "From individual habits to collective movements — how to translate awareness into lasting change.",
        layout: "minimal",
        background: { variant: "organic" },
      },
    },

    // SHORT — fits ~1 page
    {
      id: "community-action",
      title: "Community Action",
      blocks: [
        { type: "heading", level: 1, content: "Community Action" },
        { type: "rich-paragraph", content: "Individual action is amplified when it happens in community. Research shows that social context multiplies the impact of personal behaviour change by a factor of 3 to 7." },
        {
          type: "list",
          items: ["Join or start a local sustainability group", "Advocate for green policies at the local council level", "Support businesses with strong environmental commitments", "Volunteer with reforestation or habitat restoration programmes"],
        },
        { type: "heading", level: 2, content: "Setting Targets" },
        {
          type: "steps",
          label: "Goal-setting process",
          items: ["Calculate your current baseline footprint using a reputable online calculator.", "Identify your three highest-impact categories.", "Set a 12-month reduction target for each — aim for 10–20%.", "Log progress monthly and adjust every six months."],
        },
        { type: "quote", content: "We do not need a handful of people doing sustainability perfectly. We need millions doing it imperfectly. — Anne-Marie Bonneau" },
        { type: "cta", label: "Your next step", content: "Share one insight from this book with someone you care about. Small conversations are how big movements begin." },
      ],
    },
  ],
};
