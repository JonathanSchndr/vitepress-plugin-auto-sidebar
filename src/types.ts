export interface Options {
  contentRoot?: string;
  contentDirs?: string[] | ContentDir[] | null;
  collapsible?: boolean;
  collapsed?: boolean;
  useFrontMatter?: boolean;
}

export interface ContentDir {
  path: string,
  title?: string
}
