import lume from 'lume/mod.ts';
import sass from 'lume/plugins/sass.ts';
import inline from 'lume/plugins/inline.ts';
import minifyHTML from 'lume/plugins/minify_html.ts';
import tailwindcss from 'lume/plugins/tailwindcss.ts';
import postcss from 'lume/plugins/postcss.ts';
import remark from 'lume/plugins/remark.ts';

import typography from 'npm:@tailwindcss/typography';

const site = lume();

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
site.use(inline());
site.use(minifyHTML());

export default site;
