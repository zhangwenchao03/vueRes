<template>
  <div id="pageContainer" class="FlexRow" @contextmenu.prevent >
    <Header></Header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>  
  </div>
</template>


<script>
import Header from "../../components/Header/Header.vue";

export default {
  beforeMount(){
    const moudles = [
        {
          name: "预约登记",
          src: require("../../assets/svg/icon_yuyuedengji.svg"),
          active: true,
          path: "/MainFrame/Papr"
        },
        {
          name: "诊断阅片",
          resCode: "Diagnosis",
          src: require("../../assets/svg/icon_zhenduanyuepian.svg"),
          active: true,
          path: "/MainFrame/Diagnosis"
        },
        {
          name: "系统配置",
          src: require("../../assets/svg/icon_xitongpeizhi.svg"),
          active: true,
          path: "/MainFrame/SystemConfig"
        },
        {
          name: "统计分析",
          src: require("../../assets/svg/icon_tongjifenxi.svg"),
          active: true,
          path: ""
        },
        {
          name: "基础管理",
          src: require("../../assets/svg/icon_jichuguanli.svg"),
          active: true,
          path: ""
        },
        {
          name: "报告模板",
          src: require("../../assets/svg/icon_baogaomoban.svg"),
          active: true,
          path: ""
        },
        {
          name: "数据锁",
          src: require("../../assets/svg/icon_shujusuo.svg"),
          active: true,
          path: ""
        },
        {
          name: "任务管理",
          src: require("../../assets/svg/icon_renwuguanli.svg"),
          active: true,
          path: ""
        },
        {
          name: "叫号管理",
          src: require("../../assets/svg/icon_jiaohaoguanli.svg"),
          active: true,
          path: ""
        }
      ]
    this.$store.dispatch('page/setAvailableMoudles', moudles)
  },
  mounted(){
  },
  components: {
    Header
  }
};
</script>

<style scoped>
  #pageContainer{
    height: 100%;
    overflow: hidden;
  }
</style>
