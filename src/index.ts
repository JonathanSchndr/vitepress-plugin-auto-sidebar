import { ContentDir, Options, SidebarItem } from './types';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const MD_EXTENSION = '.md';
const IGNORE_PREFIX = '_';

/**
 * Capitalize the first letter of a string and replace dashes with spaces
 * @param str - The string to format
 * @returns Formatted string with first letter capitalized and dashes replaced with spaces
 */
function formatTitle(str: string): string {
  return (str.charAt(0).toUpperCase() + str.slice(1)).replaceAll('-', ' ');
}

/**
 * Check if a path exists and is accessible
 * @param filePath - Path to check
 * @returns true if path exists and is accessible
 */
function pathExists(filePath: string): boolean {
  try {
    fs.accessSync(filePath, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely read file stats
 * @param filePath - Path to file
 * @returns fs.Stats object or null if error
 */
function safeStatSync(filePath: string): fs.Stats | null {
  try {
    return fs.statSync(filePath);
  } catch (error) {
    console.warn(`[vitepress-plugin-auto-sidebar] Cannot read stats for: ${filePath}`, error);
    return null;
  }
}

/**
 * Extract title from markdown frontmatter
 * @param filePath - Path to markdown file
 * @returns Title from frontmatter or undefined
 */
function extractFrontmatterTitle(filePath: string): string | undefined {
  try {
    const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const fm = matter(content);
    return fm.data?.title;
  } catch (error) {
    console.warn(
      `[vitepress-plugin-auto-sidebar] Cannot read frontmatter from: ${filePath}`,
      error
    );
    return undefined;
  }
}

/**
 * Generate sidebar items recursively from directory structure
 * @param dir - Array of directories or files to process
 * @param currentRoot - Current root directory path
 * @param root - Base root directory path
 * @param options - Plugin options
 * @returns Array of sidebar items
 */
function getSidebarItems(
  dir: (string | ContentDir)[],
  currentRoot: string,
  root: string,
  options: Options
): SidebarItem[] {
  return dir
    .filter(e => {
      const itemPath = typeof e === 'string' ? e : e.path;
      const resolvedPath = path.resolve(currentRoot, itemPath);

      if (!pathExists(resolvedPath)) {
        return false;
      }

      const stats = safeStatSync(resolvedPath);
      return stats && (itemPath.endsWith(MD_EXTENSION) || stats.isDirectory());
    })
    .map((entry: string | ContentDir): SidebarItem | null => {
      const entryPath = typeof entry === 'string' ? entry : entry.path;
      const childDir = path.resolve(currentRoot, entryPath);
      const stats = safeStatSync(childDir);

      if (!stats) {
        return null;
      }

      if (stats.isDirectory()) {
        try {
          const items = getSidebarItems(fs.readdirSync(childDir), childDir, root, options);

          if (items.length === 0) {
            return null;
          }

          const fileName = entryPath.split('/').pop() ?? '';
          const title =
            typeof entry !== 'string' && entry.title ? entry.title : formatTitle(fileName);

          return {
            text: title,
            collapsible: options.collapsible,
            collapsed: options.collapsed,
            items,
          };
        } catch (error) {
          console.warn(`[vitepress-plugin-auto-sidebar] Cannot read directory: ${childDir}`, error);
          return null;
        }
      } else if (entryPath.endsWith(MD_EXTENSION) && !entryPath.startsWith(IGNORE_PREFIX)) {
        let title: string | undefined;

        if (options.useFrontmatter) {
          title = extractFrontmatterTitle(childDir);
        }

        const defaultTitle = formatTitle(entryPath.slice(0, -MD_EXTENSION.length));

        return {
          text: title || defaultTitle,
          link: childDir.replace(root, ''),
        };
      }

      return null;
    })
    .filter((item): item is SidebarItem => item !== null);
}

/**
 * Generate VitePress sidebar configuration from folder structure
 * @param options - Plugin configuration options
 * @returns Sidebar configuration array
 *
 * @example
 * ```typescript
 * import { getSidebar } from 'vitepress-plugin-auto-sidebar'
 *
 * export default {
 *   themeConfig: {
 *     sidebar: getSidebar({
 *       contentRoot: '/',
 *       contentDirs: ['guide', 'api'],
 *       collapsible: true,
 *       collapsed: false
 *     })
 *   }
 * }
 * ```
 */
export function getSidebar(options: Options = {}): SidebarItem[] {
  const config: Required<Options> = {
    contentRoot: options.contentRoot ?? '/',
    contentDirs: options.contentDirs?.length ? options.contentDirs : ['/'],
    collapsible: options.collapsible ?? true,
    collapsed: options.collapsed ?? true,
    useFrontmatter: options.useFrontmatter ?? false,
  };

  // Use absolute path if provided, otherwise resolve relative to cwd
  const resolvedRoot = path.isAbsolute(config.contentRoot)
    ? config.contentRoot
    : path.join(process.cwd(), config.contentRoot);

  if (!pathExists(resolvedRoot)) {
    console.error(`[vitepress-plugin-auto-sidebar] Content root does not exist: ${resolvedRoot}`);
    return [];
  }

  return getSidebarItems(config.contentDirs, resolvedRoot, resolvedRoot, config);
}
