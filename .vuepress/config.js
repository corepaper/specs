module.exports = {
  title: "Core Paper",
  description: "Specification repository for Core Paper.",
  themeConfig: {
    repo: 'corepaper/specs',
    editLinks: true,
    smoothScroll: true,
    navbar: false,
    sidebar: false,
  },
  plugins: [
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404.html',
      },
    ],
    require("./redirects.js"),
  ],
};
