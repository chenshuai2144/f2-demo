import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Canvas from "react-native-canvas";

const F2 = require("@antv/f2/lib/core"); // 引入核心包

require("@antv/f2/lib/geom/"); // 几何标记对象
require("@antv/f2/lib/geom/adjust/"); // 数据调整

require("@antv/f2/lib/coord/polar"); // 极坐标系
require("@antv/f2/lib/component/axis/circle"); // 极坐标系下的弧长坐标轴

require("@antv/f2/lib/scale/time-cat"); // timeCat 类型的度量

require("@antv/f2/lib/component/guide"); // 加载 guide 组件
const Guide = require("@antv/f2/lib/plugin/guide"); // Guide 插件
const Legend = require("@antv/f2/lib/plugin/legend"); // Legend 插件
F2.Chart.plugins.register([Legend, Guide]); // 注册以上插件

const { width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    width: 0,
    height: 0
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>饼图</Text>
        <Canvas ref={this.handleCanvas} />
      </View>
    );
  }
  handleCanvas = canvas => {
    canvas.width = width;
    canvas.height = width;
    const data = [
      { name: "芳华", percent: 0.4, a: "1" },
      { name: "妖猫传", percent: 0.2, a: "1" },
      { name: "机器之血", percent: 0.18, a: "1" },
      { name: "心理罪", percent: 0.15, a: "1" },
      { name: "寻梦环游记", percent: 0.05, a: "1" },
      { name: "其他", percent: 0.02, a: "1" }
    ];
    this.setState({
      height: canvas.height
    });
    const chart = new F2.Chart({
      el: canvas,
      width: width,
      height: width,
      padding: [0, "auto", "auto"]
    });
    chart.source(data, {
      percent: {
        formatter(val) {
          return val * 100 + "%";
        }
      }
    });
    chart.legend({
      position: "right"
    });
    chart.coord("polar", {
      transposed: true,
      radius: 0.85
    });
    chart.axis(false);
    chart
      .interval()
      .position("a*percent")
      .color("name", [
        "#1890FF",
        "#13C2C2",
        "#2FC25B",
        "#FACC14",
        "#F04864",
        "#8543E0"
      ])
      .adjust("stack")
      .style({
        lineWidth: 1,
        stroke: "#fff",
        lineJoin: "round",
        lineCap: "round"
      });

    chart.render();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
