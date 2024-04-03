import { ContentDir, Options } from "./types";

import fs from "fs";
import path from "path";
import frontMatter from "front-matter";

function getSidebarItems(dir: (string | ContentDir)[], currentRoot: string | undefined, root: string | undefined, options: Options): object[] {
	return dir
    .filter(e => {
      const itemPath = typeof e === 'string' ? e : e.path
      return (itemPath.endsWith('.md') || fs.statSync(path.resolve(currentRoot ?? '/', itemPath)).isDirectory())
    })
    .map((entry: string | ContentDir) => {
      const e = typeof entry === 'string' ? entry : entry.path;
      const childDir = path.resolve(currentRoot ?? '/', e);
      if (fs.statSync(childDir).isDirectory()) {
        const items = getSidebarItems(fs.readdirSync(childDir), childDir, root, options)
        const fileName = e.split('/').pop() ?? ''

        let title: string;
        if (typeof entry !== 'string' && entry.title) {
          title = entry.title
        } else {
          title = ((fileName.charAt(0).toUpperCase() + fileName.slice(1))).replaceAll('-', ' ')
        }

        return items.length ?  {
          text: title,
          collapsible: options.collapsible,
          collapsed: options.collapsed,
          items
        } : null!;
      } else if (e.endsWith('.md') && e[0] !== '_') {
        let title: string | undefined;
        
        if (options.useFrontmatter) {
          const fm = frontMatter<{title: string}>(fs.readFileSync(path.resolve(currentRoot ?? '/', e), {encoding: 'utf-8'}));
          if (fm) {
            title = fm.attributes.title;
          }
        }

        return {
          text: title || ((e.charAt(0).toUpperCase() + e.slice(1)).slice(0, -3)).replaceAll('-', ' '),
          link: childDir.replace(root ?? '', '')
        };
      }
      return null!;
    })
    .filter(i => !!i);
};

export function getSidebar(options: Options = {}) {
  options.contentRoot = options?.contentRoot ?? '/';
  options.contentDirs = options?.contentDirs?.length ? options.contentDirs : ['/'];
  options.collapsible = options?.collapsible ?? true;
  options.collapsed = options?.collapsed ?? true;
  options.useFrontmatter = options?.useFrontmatter ?? false;

	options.contentRoot = path.join(process.cwd(), options.contentRoot)

	return getSidebarItems(options.contentDirs, options.contentRoot, options.contentRoot, options)
}
