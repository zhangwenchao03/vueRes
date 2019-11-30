<template>
  <div class="Fill FlexRow">
    <el-row class="h70 shadow-b">
      <router-link :to="item.link" v-for="(item,index) in systemTabNavs" :key="index">
        <span class="btn secondary">{{item.title}}</span>
      </router-link>
    </el-row>
    <el-row class="Fill FlexRow overAuto">
      <router-view></router-view>
    </el-row>
    <div class="submitBtn" v-if="footerItem==='saveFooter'">
      <el-button class="btn primary">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerItem: "",
      systemTabNavs: [
        { title: "常规", link: "/MainFrame/SystemConfig/baseConfig" },
        { title: "报告配置", link: "/MainFrame/SystemConfig/reportConfig" },
        { title: "ID生成规则", link: "/MainFrame/SystemConfig/idGenerateConfig"},
        { title: "Ris配置中心", link: "/MainFrame/SystemConfig/risConfigCenter"},
        { title: "敏感词维护", link: "/MainFrame/SystemConfig/sensitiveWords"},
        { title: "test", link: "/MainFrame/SystemConfig/test"}
      ]
    };
  },
  methods: {},
  mounted(){
  },
  beforeRouteUpdate(to,from,next){
    if(to.name === "baseConfig" || to.name === "reportConfig" || to.name === "idGenerateConfig" || to.name === "risConfigCenter"){
      this.footerItem = "saveFooter"
    }else{
      this.footerItem = ""
    }
    next()
  }
};
</script>

<style scoped>
.submitBtn {
  z-index: 1000;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 76px;
  border-top: 1px solid #d1d8de;
  box-shadow: rgb(209, 216, 222) 0px 0px 1px 0px inset;
}

.submitBtn button {
    float: right;
    margin: 20px 30px 0 50px;
}
</style>

<style>
.formLabel {
    font-family: Roboto-Regular;
    font-size: 12px;
    line-height: 30px;
    color: #879cab;
}
.overAuto {
  overflow: auto
}
</style>