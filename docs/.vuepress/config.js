module.exports = {
  title: "想走过亚洲的熊",
  description: "记录、思考、生活",
  dest: "./dist", //默认在.vuepress目录下
  port: "7777",
  head: [
    ["link", { rel: "icon", href: "/img/favicon.ico" }],
    ["link", { rel: "stylesheet", href: "/css/style.css" }],
    ["script", { charset: "utf-8", src: "/js/canvas-particle.js" }],
    ["script", { charset: "utf-8", src: "/js/main.js" }],
    ["script", { src: "/js/jquery3.3.js" }],
    ["script", { src: "/js/fancybox.js" }],
    ["link", { rel: "stylesheet", type: "text/css", href: "/css/fancybox.css" }],
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    nav: require("./nav.js"),
    sidebar: require("./sidebar.js"),
    sidebarDepth: 2,
    lastUpdated: "Last Updated",
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: "有新的内容.",
        buttonText: "更新",
      },
    },
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页!",
  },
  plugins: [
    [
      "@vuepress/active-header-links",
      {
        sidebarLinkSelector: ".sidebar-link",
        headerAnchorSelector: ".header-anchor",
      },
    ],
    ["@vuepress/back-to-top"],
    ["@vuepress/nprogress"],
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require("moment");
          moment.locale(lang);
          // return moment(timestamp).fromNow();
          return moment(timestamp).format("YYYY年MM月DD日 HH:mm");
        },
        dateOptions: {
          hour12: false,
        },
      },
    ],
    [
      require("./vuepress-plugin-code-copy"),
      {
        copybuttonText: "复制",
        copiedButtonText: "已复制！",
      },
    ],
  ],
};
