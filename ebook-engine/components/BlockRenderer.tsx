import type { Block as BlockType } from "@/ebook-engine/types/ebook";
import RichParagraph from "@/ebook-engine/components/renderers/RichParagraph";
import ImageWithCaption from "@/ebook-engine/components/renderers/ImageWithCaption";
import Highlight from "@/ebook-engine/components/renderers/Highlight";
import Callout from "@/ebook-engine/components/renderers/Callout";
import ActionBox from "@/ebook-engine/components/renderers/ActionBox";
import Table from "@/ebook-engine/components/renderers/Table";
import Heading from "@/ebook-engine/components/renderers/Heading";
import Quote from "@/ebook-engine/components/renderers/Quote";
import List from "@/ebook-engine/components/renderers/List";
import Divider from "@/ebook-engine/components/renderers/Divider";
import Code from "@/ebook-engine/components/renderers/Code";
import ItemList from "@/ebook-engine/components/renderers/ItemList";
import Steps from "@/ebook-engine/components/renderers/Steps";

// Central dispatcher: maps every block type to its renderer.
// To add a new block type: define the type in ebook.ts, create a component in
// ebook-engine/components/renderers/, then add a case here.
export default function Block({ block }: { block: BlockType }) {
  switch (block.type) {
    case "rich-paragraph":
      return <RichParagraph block={block} />;
    case "image-with-caption":
      return <ImageWithCaption block={block} />;
    case "highlight":
      return <Highlight block={block} />;
    case "note":
    case "warning":
      // Both share identical structure; Callout selects variant via block.type.
      return <Callout block={block} />;
    case "action-box":
      return <ActionBox block={block} />;
    case "table":
      return <Table block={block} />;
    case "heading":
      return <Heading block={block} />;
    case "quote":
      return <Quote block={block} />;
    case "list":
      return <List block={block} />;
    case "divider":
      return <Divider />;
    case "code":
      return <Code block={block} />;
    case "item-list":
      return <ItemList block={block} />;
    case "steps":
      return <Steps block={block} />;
    case "page-break":
      // Consumed by the paginator; nothing is rendered at the page level.
      return null;
    default:
      return null;
  }
}
