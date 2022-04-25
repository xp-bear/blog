// window.onload = function () {
//   // let sidebar = document.querySelector(".sidebar");
//   // let img = document.createElement("img");
//   // img.setAttribute("id", "image");
//   // imgurl =
//   //   "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653364673&t=c00bb86519c63b71bde598789cc13bd0";
//   // img.setAttribute("src", imgurl);
//   // sidebar.appendChild(img);
//   // 给 body 加载滚动条
//   // let body = document.body;
//   // body.setAttribute("class", "test-5");
// };

window.onload = function () {
  let body = document.body;
  let div = document.createElement("div");
  div.setAttribute("id", "mydiv");
  body.appendChild(div);
  // 加载音乐背景插件
  const setAttributes = (element, attributes) => {
    for (let key in attributes) {
      if (Object.prototype.toString.call(attributes[key]) === "[object Object]") {
        setAttributes(element[key], attributes[key]);
      } else {
        element[key] = attributes[key];
      }
    }
  };
  let iframe = document.createElement("iframe");
  setAttributes(iframe, {
    id: "myaudio",
    frameborder: "no",
    border: "0",
    marginwidth: "0",
    width: "260",
    height: "80",
    src: "http://music.163.com/outchain/player?type=2&id=28403111&auto=1&height=66",
  });
  body.appendChild(iframe);

  //背景配置粒子
  var config = {
    vx: 4, //小球x轴速度,正为右，负为左
    vy: 4, //小球y轴速度
    height: 2, //小球高宽，其实为正方形，所以不宜太大
    width: 2,
    count: 200, //点个数
    // color: "121, 162, 185", //点颜色
    // stroke: "130,255,255", //线条颜色
    color: "30, 30, 30", //点颜色
    stroke: "79, 79, 79", //线条颜色
    dist: 6000, //点吸附距离
    e_dist: 20000, //鼠标吸附加速距离
    max_conn: 10, //点到点最大连接数
  };

  //调用
  CanvasParticle(config);
};
