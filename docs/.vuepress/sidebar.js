module.exports = {
  //对多模块的管控
  "/guide/": require("../guide/sidebar"), //懵逼指南

  "/baodian/zero": require("../baodian/zero/sidebar"), //前端教程->html5
  "/baodian/high": require("../baodian/high/sidebar"),

  "/front/zero/": require("../front/zero/sidebar"),
  "/front/mysql/": require("../front/mysql/sidebar"),
};
