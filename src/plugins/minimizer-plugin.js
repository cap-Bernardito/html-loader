import { minify } from 'html-minifier-terser';

export default (options) =>
  function process(html, result) {
    const minimizeOptions =
      typeof options.minimize === 'boolean' ||
      typeof options.minimize === 'undefined'
        ? {
            collapseWhitespace: true,
            conservativeCollapse: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyJS: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          }
        : options.minimize;

    try {
      // eslint-disable-next-line no-param-reassign
      html = minify(html, minimizeOptions);
    } catch (error) {
      result.messages.push({ type: 'error', value: error });
    }

    return html;
  };
