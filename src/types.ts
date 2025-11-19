/**
 * Configuration options for the auto sidebar generator
 */
export interface Options {
  /**
   * Root directory of your VitePress documentation
   * @default '/'
   */
  contentRoot?: string;

  /**
   * Array of directories to index within contentRoot
   * Can be strings (directory paths) or ContentDir objects with custom titles
   * @default ['/']
   */
  contentDirs?: (string | ContentDir)[];

  /**
   * Whether sidebar groups can be collapsed/expanded
   * @default true
   */
  collapsible?: boolean;

  /**
   * Whether sidebar groups are initially collapsed
   * @default true
   */
  collapsed?: boolean;

  /**
   * Whether to use frontmatter titles from markdown files
   * @default false
   */
  useFrontmatter?: boolean;
}

/**
 * Content directory configuration with optional custom title
 */
export interface ContentDir {
  /**
   * Path to the directory
   */
  path: string;

  /**
   * Custom title for this directory in the sidebar
   */
  title?: string;
}

/**
 * VitePress sidebar item structure
 */
export interface SidebarItem {
  /**
   * Display text for the sidebar item
   */
  text: string;

  /**
   * Link path for file items (relative to content root)
   */
  link?: string;

  /**
   * Whether this group can be collapsed (for directory items)
   */
  collapsible?: boolean;

  /**
   * Whether this group is initially collapsed (for directory items)
   */
  collapsed?: boolean;

  /**
   * Nested sidebar items (for directory items)
   */
  items?: SidebarItem[];
}
