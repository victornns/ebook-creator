import type { Ebook } from "@/ebook-engine/types/ebook";
import coverImage from "./assets/cover-image.png";

export const demoEbook: Ebook = {
  id: "demo",
  title: "Demo Ebook",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  author: "Demo Author",
  cover: {
    backgroundColor: "#d95f3d",
    image: { src: coverImage, alt: "Demo Ebook" },
    textColor: "#ffffff",
  },
  sections: [
    // ── Introducao ───────────────────────────────────────────────────────────
    {
      id: "introducao",
      title: "Introducao",
      blocks: [
        { type: "heading", level: 1, content: "Introducao" },
        { type: "paragraph", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        { type: "paragraph", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident." },
        { type: "quote", content: "Sunt in culpa qui officia deserunt mollit anim id est laborum. — Demo Author" },
      ],
    },

    // ── Como usar ────────────────────────────────────────────────────────────
    {
      id: "como-usar",
      title: "Como usar este ebook",
      blocks: [
        { type: "heading", level: 1, content: "Como usar este ebook" },
        { type: "paragraph", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis." },
        { type: "heading", level: 2, content: "Orientacoes gerais" },
        { type: "list", items: ["Nemo enim ipsam voluptatem quia voluptas sit aspernatur", "Neque porro quisquam est qui dolorem ipsum", "Ut labore et dolore magnam aliquam quaerat voluptatem", "Quis autem vel eum iure reprehenderit"] },
        { type: "callout", content: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam." },
      ],
    },

    // ── Capitulo 1 ───────────────────────────────────────────────────────────
    {
      id: "capitulo-1",
      title: "A Base de Tudo",
      blocks: [],
      chapterCover: {
        chapterNumber: 1,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem.",
        backgroundColor: "var(--ebook-secondary)",
        image: { src: coverImage, alt: "A Base de Tudo" },
      },
    },
    {
      id: "fundamentos",
      title: "Fundamentos",
      blocks: [
        { type: "heading", level: 1, content: "Fundamentos" },
        { type: "paragraph", content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi." },
        { type: "paragraph", content: "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus." },
        { type: "list", items: ["Item lorem ipsum alpha", "Item lorem ipsum beta", "Item lorem ipsum gamma", "Item lorem ipsum delta"] },
      ],
    },
    {
      id: "tecnicas",
      title: "Tecnicas Essenciais",
      blocks: [
        { type: "heading", level: 1, content: "Tecnicas Essenciais" },
        { type: "paragraph", content: "Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae." },
        { type: "heading", level: 2, content: "Metodo A" },
        { type: "paragraph", content: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat." },
        { type: "heading", level: 2, content: "Metodo B" },
        { type: "paragraph", content: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur." },
        { type: "callout", content: "Dica: excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim." },
      ],
    },

    // ── Capitulo 2 ───────────────────────────────────────────────────────────
    {
      id: "capitulo-2",
      title: "Receitas do Dia a Dia",
      blocks: [],
      chapterCover: {
        chapterNumber: 2,
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        backgroundColor: "var(--ebook-secondary)",
      },
    },
    {
      id: "receita-lorem",
      title: "Receita Lorem",
      blocks: [
        { type: "heading", level: 1, content: "Receita Lorem" },
        { type: "paragraph", content: "Rendimento: 4 porcoes • Tempo total: 30 minutos" },
        { type: "paragraph", content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione sequi nesciunt." },
        {
          type: "ingredients",
          label: "Ingredientes",
          items: ["2 xicaras de lorem ipsum", "1 xicara de dolor sit amet", "3 colheres de sopa de consectetur", "1 colher de cha de adipiscing elit", "Sal e pimenta a gosto"],
        },
        { type: "image", src: "/ebooks/demo/assets/cover-image.png", alt: "Receita Lorem" },
        { type: "heading", level: 3, content: "Modo de preparo" },
        {
          type: "steps",
          items: [
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          ],
        },
        { type: "callout", content: "Como servir: at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium." },
      ],
    },
    {
      id: "receita-ipsum",
      title: "Receita Ipsum",
      blocks: [
        { type: "heading", level: 1, content: "Receita Ipsum" },
        { type: "paragraph", content: "Rendimento: 6 porcoes • Tempo total: 45 minutos" },
        { type: "paragraph", content: "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus." },
        {
          type: "ingredients",
          items: ["1.5 xicara de lorem ipsum", "0.75 xicara de dolor amet", "2 colheres de sopa de consectetur", "1 colher de cha de adipiscing"],
        },
        { type: "heading", level: 3, content: "Preparo" },
        {
          type: "steps",
          items: [
            "Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet.",
            "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias.",
            "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
            "Finalize com sal a gosto e sirva imediatamente.",
          ],
        },
        { type: "callout", content: "Pode ser armazenado na geladeira por ate 3 dias ou congelado por ate 1 mes." },
      ],
    },

    // ── Capitulo 3 ───────────────────────────────────────────────────────────
    {
      id: "capitulo-3",
      title: "Dicas Finais",
      blocks: [],
      chapterCover: {
        chapterNumber: 3,
        description: "Omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem.",
        backgroundColor: "var(--ebook-secondary)",
      },
    },
    {
      id: "dicas-finais",
      title: "Dicas Finais",
      blocks: [
        { type: "heading", level: 1, content: "Dicas Finais" },
        { type: "paragraph", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
        { type: "heading", level: 2, content: "Resumo" },
        { type: "list", items: ["Nemo enim ipsam voluptatem quia voluptas", "Neque porro quisquam est qui dolorem", "Ut labore et dolore magnam aliquam", "Quis nostrum exercitationem ullam corporis"] },
        { type: "divider" },
        { type: "paragraph", content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi occaecati." },
        { type: "callout", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      ],
    },
  ],
};
