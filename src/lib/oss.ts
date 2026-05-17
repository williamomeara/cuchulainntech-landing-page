export type OssProject = {
  id: string;
  name: string;       // display name
  description: string; // one sentence
  href: string;       // github.com URL
};

export const OSS_PROJECTS: readonly OssProject[] = [
  {
    id: "blindfold-env",
    name: "blindfold-env",
    description:
      "Manage .env secrets from the CLI without exposing values to AI assistants.",
    href: "https://github.com/williamomeara/blindfold-env",
  },
  {
    id: "craobh",
    name: "Craobh",
    description:
      "Searchable family tree of Ireland, built from public historical records.",
    href: "https://github.com/williamomeara/craobh",
  },
  {
    id: "did-i-do-good",
    name: "did-i-do-good",
    description:
      "MCP server: GitHub Copilot adversarially reviews Claude's plans.",
    href: "https://github.com/williamomeara/did-i-do-good",
  },
] as const;
