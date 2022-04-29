module.exports = {
  //对多模块的管控
  "/guide/": require("../guide/sidebar"), //懵逼指南
  "/python/django/": require("../python/django/sidebar"), //Python教程 -> django笔记
  "/python/flask/": require("../python/flask/sidebar"), //Python教程 -> flask笔记

  "/sundry/mysql/": require("../sundry/mysql/sidebar"), //杂项系列 -> mysql笔记
};
