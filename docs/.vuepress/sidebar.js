module.exports = {
  //对多模块的管控
  "/guide/": require("../guide/sidebar"), //懵逼指南
  "/vue/basic/": require("../vue/basic/sidebar"), //vue系列->vue基础
  "/python/django/": require("../python/django/sidebar"), //Python教程 -> django笔记
  "/database/mysql/": require("../database/mysql/sidebar"), //数据库系列 -> mysql笔记
  
};
