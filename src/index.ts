import { Options } from "./types";

import fs from "fs";
import path from "path";
import frontMatter from "front-matter";

function getSidebarItems(dir: string[], currentRoot: string | undefined, root: string | undefined, options: Options): object[] {
	return dir
    .filter(e => e.endsWith('.md') || fs.statSync(path.resolve(currentRoot ?? '/', e)).isDirectory())
    .map((e: string) => {
      const childDir = path.resolve(currentRoot ?? '/', e);
      if (fs.statSync(childDir).isDirectory()) {
        const items = getSidebarItems(fs.readdirSync(childDir), childDir, root, options)
        const fileName = e.split('/').pop() ?? ''
        return items.length ?  {
          text: ((fileName.charAt(0).toUpperCase() + fileName.slice(1))).replaceAll('-', ' '),
          collapsible: options.collapsible,
          collapsed: options.collapsed,
          items
        } : null!;
      } else if (e.endsWith('.md') && e[0] !== '_') {
        let title: string | undefined;

        if (options.useFrontMatter) {
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
  options.useFrontMatter = options?.useFrontMatter ?? false;

	options.contentRoot = path.join(process.cwd(), options.contentRoot)

	return getSidebarItems(options.contentDirs, options.contentRoot, options.contentRoot, options)
}
