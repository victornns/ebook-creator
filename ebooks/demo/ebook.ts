import type { Ebook } from "@/ebook-engine/types/ebook";
import imageCover from "./assets/thumb-vertical.png";
import imageContent from "./assets/thumb-horizontal.jpg";

export const demoEbook: Ebook = {
  id: "demo",
  title: "Living Green",
  subtitle: "A practical guide to sustainability, conscious living, and building a better future for our planet",
  author: "Demo Author",
  cover: {
    backgroundColor: "#1a3a2a",
    image: { src: imageCover, alt: "Living Green" },
    textColor: "#e8f5e9",
    background: { variant: "corner-wave" },
  },
  sections: [
    // ── Introduction ─────────────────────────────────────────────────────────
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        { type: "heading", level: 1, content: "Introduction" },
        { type: "rich-paragraph", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        { type: "rich-paragraph", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui **officia deserunt** mollit anim id est laborum." },
        { type: "quote", content: "The Earth does not belong to us. We belong to the Earth. — Demo Author" },
        { type: "highlight", content: "Every choice we make — from what we eat to how we move — has an environmental consequence." },
        { type: "image-with-caption", src: imageContent, alt: "A sustainable landscape with wind turbines and green hills", caption: "Renewable energy now accounts for over 30% of global electricity generation." },
        { type: "rich-paragraph", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },

        // ── Exemplos de markdown ──────────────────────────────────────────────
        { type: "rich-paragraph", content: "**Negrito**, *itálico*, ~~tachado~~ e `código inline` funcionando via react-markdown." },
        { type: "rich-paragraph", content: "Combinações: ***negrito e itálico juntos***, `código` dentro de uma frase normal, e um [link externo](https://example.com) com texto personalizado." },
        { type: "rich-paragraph", content: "Escape de caracteres: \\*asterisco literal\\*, \\`backtick literal\\`, \\[colchete literal\\]." },
        { type: "rich-paragraph", content: "__Negrito com underline__, _itálico com underline_ — sintaxe alternativa do Markdown (via remark-gfm)." },
      ],
    },

    // ── How to Use ───────────────────────────────────────────────────────────
    {
      id: "how-to-use",
      title: "How to Use This Book",
      blocks: [
        { type: "heading", level: 1, content: "How to Use This Book" },
        { type: "rich-paragraph", content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt." },
        { type: "heading", level: 2, content: "General Guidelines" },
        { type: "list", items: ["Read each chapter in sequence for the best learning experience", "Apply one practice at a time before moving to the next", "Track your progress using the worksheets at the end of each chapter", "Share your journey with your community for greater impact"] },
        { type: "note", content: "Each chapter builds on the previous one. Take your time and let the ideas settle before moving forward." },
      ],
    },

    // ── Chapter 1 ────────────────────────────────────────────────────────────
    {
      id: "chapter-1",
      title: "Understanding Our Planet",
      blocks: [],
      chapterCover: {
        chapterNumber: 1,
        description: "Exploring the foundations of environmental science and why every action we take leaves a mark on our shared home.",
        backgroundColor: "var(--ebook-secondary)",
        image: { src: imageCover, alt: "Understanding Our Planet" },
        background: { variant: "layered" },
      },
    },

    // SHORT — fits one page
    {
      id: "the-living-system",
      title: "The Living System",
      blocks: [
        { type: "heading", level: 1, content: "The Living System" },
        { type: "rich-paragraph", content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident." },
        { type: "rich-paragraph", content: "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus." },
        { type: "list", items: ["Biodiversity as the foundation of resilience", "Ecosystem services we often take for granted", "The carbon cycle and its delicate balance", "Ocean systems and their role in climate regulation"] },
        { type: "note", content: "Roughly 80% of the Earth's biodiversity exists in tropical rainforests, which cover less than 6% of the planet's surface." },
        { type: "image-with-caption", src: imageContent, alt: "Green forest and natural ecosystem", caption: "Tropical forests are home to more than half of the world's terrestrial species." },
      ],
    },

    // LONG — spans 2+ pages
    {
      id: "climate-fundamentals",
      title: "Climate Fundamentals",
      blocks: [
        { type: "heading", level: 1, content: "Climate Fundamentals" },
        {
          type: "rich-paragraph",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
          type: "rich-paragraph",
          content:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        },
        { type: "heading", level: 2, content: "The Greenhouse Effect" },
        {
          type: "rich-paragraph",
          content:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
        },
        { type: "rich-paragraph", content: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus." },
        {
          type: "list",
          items: [
            "Carbon dioxide: primary driver of the enhanced greenhouse effect",
            "Methane: 28x more potent than CO2 over 100 years",
            "Nitrous oxide: released from agricultural and industrial activities",
            "Fluorinated gases: synthetic compounds with very high warming potentials",
            "Water vapor: the most abundant greenhouse gas and a key feedback mechanism",
          ],
        },
        {
          type: "table",
          caption: "Key greenhouse gases and their global warming potential (GWP) over 100 years.",
          headers: ["Gas", "Symbol", "GWP (100yr)", "Main source"],
          rows: [
            ["Carbon dioxide", "CO₂", "1", "Fossil fuels, deforestation"],
            ["Methane", "CH₄", "28", "Agriculture, natural gas, landfill"],
            ["Nitrous oxide", "N₂O", "265", "Fertilisers, livestock"],
            ["HFC-134a", "HFCs", "1,430", "Refrigeration, aerosols"],
          ],
        },
        { type: "heading", level: 2, content: "Tipping Points" },
        {
          type: "rich-paragraph",
          content: "Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.",
        },
        {
          type: "rich-paragraph",
          content: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.",
        },
        { type: "warning", label: "Critical threshold", content: "Scientists have identified at least 16 climate tipping points — thresholds beyond which changes become self-sustaining and largely irreversible. We have likely already crossed five." },
        { type: "heading", level: 2, content: "Observed Changes Since 1850" },
        { type: "rich-paragraph", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante." },
        {
          type: "item-list",
          label: "Key Indicators",
          items: [
            "Global average temperature +1.1 C above pre-industrial baseline",
            "Sea level rise of approximately 20 cm since 1900",
            "Arctic sea ice volume declined by ~75% since 1980",
            "Ocean acidity increased by 26% since the industrial revolution",
            "Frequency of extreme heat events doubled in the last 50 years",
            "Global glacier mass loss accelerating decade over decade",
          ],
        },
        {
          type: "rich-paragraph",
          content: "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet.",
        },
        {
          type: "rich-paragraph",
          content:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
        },
        { type: "quote", content: "We are the first generation to feel the impact of climate change and the last generation that can do something about it. — Lorem Ipsum" },
        {
          type: "rich-paragraph",
          content:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
        },
      ],
    },

    // ── Chapter 2 ────────────────────────────────────────────────────────────
    {
      id: "chapter-2",
      title: "Sustainable Practices",
      blocks: [],
      chapterCover: {
        chapterNumber: 2,
        description: "Practical habits, frameworks, and tools to reduce your environmental footprint and live more intentionally.",
        backgroundColor: "var(--ebook-secondary)",
        image: { src: imageCover, alt: "Sustainable Practices" },
        background: { variant: "split-wave" },
      },
    },

    // MEDIUM — about one page
    {
      id: "conscious-consumption",
      title: "Conscious Consumption",
      blocks: [
        { type: "heading", level: 1, content: "Conscious Consumption" },
        { type: "rich-paragraph", content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet." },
        { type: "rich-paragraph", content: "Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur." },
        { type: "heading", level: 2, content: "The 5 Rs Framework" },
        {
          type: "steps",
          label: "Apply in this order",
          items: [
            "Refuse — say no to what you do not need, especially single-use items and unnecessary packaging.",
            "Reduce — cut down on the things you do use, buying less and choosing quality over quantity.",
            "Reuse — opt for durable, repairable items and find creative second lives for things before discarding.",
            "Recycle — only after the first three Rs; sort and process materials correctly through local programs.",
            "Rot — compost organic matter to return nutrients to the soil and divert waste from landfills.",
          ],
        },
        { type: "note", content: "A single reusable water bottle can replace over 1,000 single-use plastic bottles in its lifetime." },
        { type: "rich-paragraph", content: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus." },
      ],
    },

    // LONG — spans 3+ pages
    {
      id: "energy-and-home",
      title: "Energy and Home",
      blocks: [
        { type: "heading", level: 1, content: "Energy and Home" },
        {
          type: "rich-paragraph",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
        },
        {
          type: "rich-paragraph",
          content:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
        },
        { type: "heading", level: 2, content: "Auditing Your Home Energy Use" },
        {
          type: "rich-paragraph",
          content:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
        },
        {
          type: "item-list",
          label: "Areas to Audit",
          items: [
            "Heating and cooling systems (typically 40-50% of home energy)",
            "Water heater and hot water usage patterns",
            "Lighting — LED replacement opportunity",
            "Kitchen appliances and standby power draw",
            "Insulation quality in walls, roof, and windows",
            "Renewable energy options available in your area",
            "Smart meter data and time-of-use tariffs",
            "Electric vehicle charging if applicable",
          ],
        },
        {
          type: "rich-paragraph",
          content:
            "Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        },
        { type: "heading", level: 2, content: "Switching to Renewables" },
        {
          type: "rich-paragraph",
          content: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
        },
        {
          type: "rich-paragraph",
          content: "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet.",
        },
        { type: "note", label: "Good to know", content: "Solar panel installations have dropped in cost by over 90% since 2010, making them accessible to more households than ever before." },
        { type: "warning", label: "Don't delay", content: "Postponing home energy upgrades typically costs more in the long run. Rising energy prices mean every year of delay increases both your bills and your lifetime carbon footprint." },
        { type: "image-with-caption", src: imageContent, alt: "Renewable energy and sustainable home", caption: "Rooftop solar combined with a home battery can eliminate grid dependence during daylight hours." },
        { type: "heading", level: 2, content: "Step-by-Step Home Transition Plan" },
        {
          type: "steps",
          items: [
            "Conduct a full home energy audit — use a smart meter or hire a professional assessor to identify your biggest consumption areas.",
            "Switch all remaining incandescent and halogen bulbs to LED — immediate savings with zero lifestyle change required.",
            "Improve insulation and seal air leaks around doors, windows, and the roof cavity to reduce heating and cooling demand.",
            "Install a smart thermostat to optimise heating and cooling schedules based on occupancy patterns.",
            "Research green energy tariffs from your electricity provider or install rooftop solar panels if feasible.",
            "Replace gas appliances with electric alternatives as they reach end of life — prioritise the cooktop, water heater, and space heating.",
            "Consider battery storage if you have solar, to maximise self-consumption and reduce grid dependence.",
            "Track monthly consumption and celebrate reductions to maintain motivation over the long term.",
          ],
        },
        {
          type: "rich-paragraph",
          content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        },
        { type: "rich-paragraph", content: "Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra." },
        { type: "heading", level: 2, content: "Water Conservation" },
        {
          type: "rich-paragraph",
          content:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit.",
        },
        {
          type: "item-list",
          label: "Quick Wins",
          items: [
            "Install low-flow showerheads — saves up to 40 litres per shower",
            "Fix dripping taps immediately — a slow drip wastes 10,000 litres per year",
            "Run dishwasher and washing machine only with full loads",
            "Collect rainwater for garden irrigation",
            "Use a broom instead of a hose to clean outdoor areas",
            "Choose drought-tolerant plants for landscaping",
          ],
        },
        {
          type: "rich-paragraph",
          content:
            "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
        },
        { type: "quote", content: "Small changes, consistently applied, accumulate into transformation. — Lorem Ipsum" },
        {
          type: "rich-paragraph",
          content:
            "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.",
        },
      ],
    },

    // ── Chapter 3 ────────────────────────────────────────────────────────────
    {
      id: "chapter-3",
      title: "Taking Action",
      blocks: [],
      chapterCover: {
        chapterNumber: 3,
        description: "From individual habits to collective movements — how to translate awareness into lasting, meaningful change.",
        backgroundColor: "var(--ebook-secondary)",
        image: { src: imageCover, alt: "Taking Action" },
        background: { variant: "organic" },
      },
    },

    // MEDIUM — about one page
    {
      id: "community-action",
      title: "Community Action",
      blocks: [
        { type: "heading", level: 1, content: "Community Action" },
        { type: "rich-paragraph", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
        { type: "rich-paragraph", content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est." },
        { type: "heading", level: 2, content: "Ways to Get Involved" },
        {
          type: "list",
          items: [
            "Join or start a local sustainability group",
            "Participate in community clean-up events",
            "Advocate for green policies at the local council level",
            "Support businesses with strong environmental commitments",
            "Mentor younger generations about ecological literacy",
            "Volunteer with reforestation or habitat restoration programmes",
          ],
        },
        { type: "highlight", content: "Individual action is amplified by a factor of 3–7× when done in a social or community context." },
        { type: "image-with-caption", src: imageContent, alt: "Community working together in nature", caption: "Collective action consistently delivers faster and more durable results than isolated individual efforts." },
        { type: "rich-paragraph", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
      ],
    },

    // LONG — spans 3+ pages
    {
      id: "measuring-your-impact",
      title: "Measuring Your Impact",
      blocks: [
        { type: "heading", level: 1, content: "Measuring Your Impact" },
        {
          type: "rich-paragraph",
          content:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
        },
        {
          type: "rich-paragraph",
          content:
            "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates.",
        },
        { type: "heading", level: 2, content: "Carbon Footprint Breakdown" },
        {
          type: "rich-paragraph",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
        },
        {
          type: "item-list",
          label: "Average Household Emissions by Category",
          items: [
            "Transport — 29% (car, flights, public transit)",
            "Home energy — 21% (electricity, gas, heating oil)",
            "Food — 17% (especially meat and dairy)",
            "Goods and products — 16% (clothing, electronics, household items)",
            "Services — 12% (healthcare, finance, recreation)",
            "Waste — 5% (landfill, wastewater treatment)",
          ],
        },
        {
          type: "rich-paragraph",
          content:
            "Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        },
        { type: "heading", level: 2, content: "Setting Personal Targets" },
        {
          type: "rich-paragraph",
          content: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.",
        },
        {
          type: "steps",
          label: "Goal-Setting Process",
          items: [
            "Calculate your current baseline footprint using a reputable online calculator (Project Drawdown or the UN).",
            "Identify your three highest-impact categories from the breakdown above.",
            "Set a 12-month reduction target for each — aim for 10-20% to keep goals realistic and motivating.",
            "Define one specific habit change for each category: e.g. reduce flights by one round trip or switch to a plant-based diet twice per week.",
            "Log progress monthly using a simple spreadsheet or sustainability app.",
            "Review and adjust targets every six months as your habits evolve.",
          ],
        },
        { type: "note", label: "Perspective", content: "The average person in a high-income country produces 10–15 tonnes of CO₂e per year. A sustainable level is around 2 tonnes by 2050." },
        { type: "heading", level: 2, content: "Offsetting vs Reducing" },
        {
          type: "rich-paragraph",
          content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
        },
        { type: "rich-paragraph", content: "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. At vero eos et accusamus et iusto odio dignissimos ducimus." },
        {
          type: "list",
          items: [
            "Prioritise reduction over offsetting whenever possible",
            "Choose offsets certified by Gold Standard or Verra VCS",
            "Focus on additionality — the project must not have happened without offset funding",
            "Prefer long-duration storage over temporary land-based credits",
            "Avoid aviation offsets as a substitute for flying less",
          ],
        },
        {
          type: "rich-paragraph",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.",
        },
        {
          type: "rich-paragraph",
          content: "Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci.",
        },
        { type: "quote", content: "We do not need a handful of people doing sustainability perfectly. We need millions doing it imperfectly. — Lorem Ipsum" },
        { type: "heading", level: 2, content: "Long-Term Mindset", breakBefore: true },
        {
          type: "rich-paragraph",
          content:
            "Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus.",
        },
        {
          type: "rich-paragraph",
          content:
            "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
        },
        { type: "highlight", content: "Sustainability is not a destination but a direction. Every step taken today shapes the world your children and grandchildren will inhabit." },
      ],
    },

    // ── Final Notes ──────────────────────────────────────────────────────────
    {
      id: "final-notes",
      title: "Final Notes",
      blocks: [
        { type: "heading", level: 1, content: "Final Notes" },
        { type: "rich-paragraph", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip." },
        { type: "heading", level: 2, content: "Summary" },
        { type: "list", items: ["Understand the systems you are part of", "Reduce before you offset", "Act in community, not just individually", "Measure, learn, and adapt continuously"] },
        { type: "divider" },
        { type: "rich-paragraph", content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident." },
        { type: "note", content: "Thank you for reading Living Green. The planet thanks you too." },
        { type: "cta", label: "Your next step", content: "Share one insight from this book with someone you care about. Small conversations are how big movements begin." },
      ],
    },
  ],

  acknowledgements: {
    id: "acknowledgements",
    title: "Acknowledgements",
    blocks: [
      { type: "heading", level: 1, content: "Acknowledgements" },
      { type: "rich-paragraph", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt." },
      { type: "rich-paragraph", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
    ],
  },
};
