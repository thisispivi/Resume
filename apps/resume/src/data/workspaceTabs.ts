/** The three editing surfaces of the workspace panel. */
export type WorkspaceTab = "content" | "design" | "export";

/** Workspace tabs in the order they appear, shared by the desktop and mobile bars. */
export const WORKSPACE_TABS: { id: WorkspaceTab; labelKey: string }[] = [
  { id: "content", labelKey: "workspace.content" },
  { id: "design", labelKey: "workspace.design" },
  { id: "export", labelKey: "workspace.export" },
];
