window.onload = function () {
  let body = document.body;
  let div = document.createElement("div");
  div.setAttribute("id", "mydiv");
  body.appendChild(div);
  // 加载音乐背景插件
  // const setAttributes = (element, attributes) => {
  //   for (let key in attributes) {
  //     if (Object.prototype.toString.call(attributes[key]) === "[object Object]") {
  //       setAttributes(element[key], attributes[key]);
  //     } else {
  //       element[key] = attributes[key];
  //     }
  //   }
  // };
  // let iframe = document.createElement("iframe");
  // setAttributes(iframe, {
  //   id: "myaudio",
  //   frameborder: "no",
  //   border: "0",
  //   marginwidth: "0",
  //   width: "260",
  //   height: "80",
  //   src: "http://music.163.com/outchain/player?type=2&id=28403111&auto=1&height=66",
  // });
  // body.appendChild(iframe);

  // 添加音乐图片
  // let img = document.createElement("img");
  // img.setAttribute("id", "photo");
  // img.setAttribute("src", "http://pic.xxoutman.cn/img/music.png");
  // body.appendChild(img);

  // 监听按钮点击事件
  // let photo = document.getElementById("photo");
  // let myaudio = document.getElementById("myaudio");
  // photo.addEventListener("click", function (e) {
  //   photo.id = "animationOut";
  //   setTimeout(() => {
  //     myaudio.style.display = "block";
  //     myaudio.classList.add = "animationIn";
  //   }, 300);
  // });

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
