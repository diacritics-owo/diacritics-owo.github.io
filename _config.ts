import lume from 'lume/mod.ts';
import sass from 'lume/plugins/sass.ts';
import inline from 'lume/plugins/inline.ts';
import minifyHTML from 'lume/plugins/minify_html.ts';
import tailwindcss from 'lume/plugins/tailwindcss.ts';
import postcss from 'lume/plugins/postcss.ts';
import remark from 'lume/plugins/remark.ts';
import readingInfo from 'lume/plugins/reading_info.ts';
import sitemap from 'lume/plugins/sitemap.ts';
import robots from 'lume/plugins/robots.ts';
import date from 'lume/plugins/date.ts';
import feed from 'lume/plugins/feed.ts';
import toml from 'lume/plugins/toml.ts';
import nav from 'lume/plugins/nav.ts';
import metas from 'lume/plugins/metas.ts';
import shiki from 'https://deno.land/x/lume_shiki@0.0.16/mod.ts';

import typography from 'npm:@tailwindcss/typography';
import remarkMath from 'https://esm.sh/remark-math@6.0.0';
import rehypeKatex from 'https://esm.sh/rehype-katex@7.0.1';
import rehypeSlug from 'https://esm.sh/rehype-slug@6.0.0';
import { rehypeHeaderLinks, toc } from './_plugins.ts';

const site = lume();

site.use(toml());
site.use(
  remark({
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeSlug, rehypeHeaderLinks],
  })
);
site.use(sass());
site.use(
  tailwindcss({
    options: {
      plugins: [typography],
    },
  })
);
site.use(postcss());

site.use(toc());
site.use(readingInfo());
site.use(date());
site.use(nav());

site.use(sitemap());
site.use(robots());
site.use(
  feed({
    output: ['/posts.rss', '/posts.json'],
    query: 'type=post',
    sort: 'date=desc',
    info: {
      title: '=site.title',
      description: '=site.description',
    },
    items: {
      title: '=title',
      published: '=date',
    },
  })
);
site.use(
  feed({
    output: ['/projects.rss', '/projects.json'],
    query: 'type=project',
    sort: 'date=desc',
    info: {
      title: '=site.title',
      description: '=site.description',
    },
    items: {
      title: '=title',
      published: '=date',
      description: '=description',
    },
  })
);
site.use(metas());

site.use(
  shiki({
    theme: 'vitesse-light',
  })
);
site.use(inline());
site.use(minifyHTML());

export default site;
