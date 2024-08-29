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

import typography from 'npm:@tailwindcss/typography';

const site = lume();

site.use(toml());
site.use(remark());
site.use(sass());
site.use(
  tailwindcss({
    options: {
      plugins: [typography],
    },
  })
);
site.use(postcss());

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

site.use(inline());
site.use(minifyHTML());

export default site;
