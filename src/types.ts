export interface Options {
  contentRoot?: string;
  contentDirs?: string[] | ContentDir[] | null;
  collapsible?: boolean;
  collapsed?: boolean;
  useFrontmatter?: boolean;
}

export interface ContentDir {
  path: string,
  title?: string
}
