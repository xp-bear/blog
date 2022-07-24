module.exports = {
  title: "想走过亚洲的熊",
  description: "记录、思考、生活",
  dest: "./dist", //默认在.vuepress目录下
  port: "7777",
  head: [
    ["meta", { name: "keywords", content: "熊仔笔记,想走过亚洲的熊" }],
    ["meta", { name: "baidu-site-verification", content: "code-nuyZxH5QdZ" }],
    ["meta", { name: "wlhlauth", content: "076e7e2b75875b4e0523733b107713ec" }],
    ["meta", { name: "wlhlauth", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" }],
    ["link", { rel: "icon", href: "/img/favicon.ico" }],
    ["link", { rel: "stylesheet", href: "/css/style.css" }],
    ["script", { charset: "utf-8", src: "/js/canvas-particle.js" }],
    ["script", { charset: "utf-8", src: "/js/main.js" }],
    ["script", { src: "/js/jquery3.3.js" }],
    ["script", { src: "/js/fancybox.js" }],
    ["link", { rel: "stylesheet", type: "text/css", href: "/css/fancybox.css" }],
  ],
  markdown: {
    lineNumbers: true, //显示行号
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },
    extendMarkdown: (md) => {
      // 使用更多的 markdown-it 插件!
      md.use(require("markdown-it"));
    },
  },
  themeConfig: {
    nav: require("./nav.js"),
    sidebar: require("./sidebar.js"),
    sidebarDepth: 2,
    lastUpdated: "上次更新时间",
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
    [
      "vuepress-plugin-helper-live2d",
      {
        // 是否开启控制台日志打印(default: false)
        log: false,
        live2d: {
          // 是否启用(关闭请设置为false)(default: true)
          enable: false,
          // 模型名称(default: hibiki)>>>取值请参考：
          // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
          model: "haru/01",
          display: {
            position: "left", // 显示位置：left/right(default: 'right')
            width: 150, // 模型的长度(default: 135)
            height: 300, // 模型的高度(default: 300)
            hOffset: 285, //  水平偏移(default: 65)
            vOffset: 0, //  垂直偏移(default: 0)
          },
          mobile: {
            show: false, // 是否在移动设备上显示(default: false)
          },
          react: {
            opacity: 1, // 模型透明度(default: 0.8)
          },
        },
      },
    ],
  ],
};
