export interface EbookTheme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
    accent: string;
    muted: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono?: string;
  };
  spacing: {
    sectionGap: string;
    blockGap: string;
    pagePadding: string;
  };
}
