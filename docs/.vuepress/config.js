const moment = require("moment");
module.exports = {
  title: "想走过亚洲的熊",
  description: "记录、思考、生活",
  dest: "./dist", //默认在.vuepress目录下
  port: "7777",
  head: [
    ["link", { rel: "icon", href: "/img/favicon.ico" }],
    ["link", { rel: "stylesheet", href: "/css/style.css" }],
    ["script", { charset: "utf-8", src: "/js/main.js" }], //新加入
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
    editLinkText: "在 GitHub 上编辑此页 !",
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
    ['"@vuepress/nprogress"'],
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require("moment");
          moment.locale(lang);
          return moment(timestamp).fromNow();
        },
        dateOptions: {
          hour12: false,
        },
      },
    ],
  ],
};
