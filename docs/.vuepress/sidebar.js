module.exports = {
  //对多模块的管控
  "/guide/": require("../guide/sidebar"), //懵逼指南
  "/python/django/": require("../python/django/sidebar"), //Python教程 -> django笔记
  "/python/flask/": require("../python/flask/sidebar"), //Python教程 -> flask笔记
  "/python/spyder/": require("../python/spyder/sidebar"), //Python教程 -> flask笔记

  "/sundry/mysql/": require("../sundry/mysql/sidebar"), //杂项系列 -> mysql笔记
  "/vue3_ts/vue3/": require("../vue3_ts/vue3/sidebar"), //vue3+ts系列 -> vue3笔记
  "/CSS3/css/": require("../CSS3/css/sidebar"), //vue3+ts系列 -> vue3笔记
};
