import { Root } from 'https://esm.sh/v135/@types/hast@3.0.4/index.d.ts';
import { visit } from 'https://esm.sh/unist-util-visit@5.0.0';
import { headingRank } from 'https://esm.sh/hast-util-heading-rank@3.0.0';
import Site from 'lume/core/site.ts';
import { merge } from 'lume/core/utils/object.ts';
import { MarkdownEngine } from 'lume/plugins/remark.ts';
import {
  rehypeRaw,
  rehypeSanitize,
  rehypeStringify,
  remarkGfm,
  remarkParse,
  remarkRehype,
  unified,
} from 'lume/deps/remark.ts';
import contents from 'npm:markdown-toc@1.2.0';

// rehype-autolink-headers wasn't working
export const rehypeHeaderLinks = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (
        headingRank(node) &&
        node.properties.id &&
        !node.properties.unlinked
      ) {
        node.children.unshift({
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#${node.properties.id}`,
            className: ['link-icon'],
          },
          children: [],
        });
      }
    });
  };
};

export type Header = {
  id: string;
  level: number;
  title: string;
};

export interface Options {
  extensions: string[];
  name: string;
}

export const toc = (userOptions?: Options) => {
  const options = merge(userOptions, {
    extensions: ['.html'],
    name: 'contents',
  })!;

  const remarkEngine = new MarkdownEngine(
    unified
      .unified()
      .use([
        remarkParse,
        remarkGfm,
        remarkRehype,
        rehypeRaw,
        rehypeSanitize,
        rehypeStringify,
      ])
  );

  return (site: Site) => {
    site.preprocess(options.extensions, (pages) => {
      pages.map(async (page) => {
        page.data[options.name] = await remarkEngine.render(
          contents(page.data.content).content
        );
      });
    });
  };
};
