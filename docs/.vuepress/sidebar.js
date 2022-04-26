module.exports = {
  //对多模块的管控
  "/guide/": require("../guide/sidebar"), //第一个模块下面的侧边栏

  "/baodian/zero": require("../baodian/zero/sidebar"), //第二个模块下面的侧边栏
  "/baodian/high": require("../baodian/high/sidebar"),

  "/front/zero/": require("../front/zero/sidebar"),
  "/front/mysql/": require("../front/mysql/sidebar"),
  
};
