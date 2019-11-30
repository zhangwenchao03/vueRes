<template>
  <nav id="Header" class="FlexCol h70">
    <el-col class="Fill leftNav"></el-col>
    <el-col class="fit rightNav">
      <el-row type="flex" justify="end">
        <el-col class="h70 fit">
            <Dropdown
              id="usernameDropdown"
              :text="username"
              trigger="click"
              placement="top"
              :options="userOptions"
              @logout="logout"
            ></Dropdown>
        </el-col>
        <el-col v-for="(item,index) in navPillsFilter" :key="index" class="pills">
            <Dropdown v-if="item.name == 'ModulesNav'"
              trigger="click"
              placement="top"
              :options="moudles"
              :iconClass="item.iconClass"
              @redirect="redirect"
            ></Dropdown>
            <el-badge v-else-if="item.name == 'Notification'" :value="notificationNumber" :max="20" type="primary" >
              <a :class="item.iconClass" @click="handleClick(item)" ></a>
            </el-badge>
            <a v-else :class="item.iconClass" @click="handleClick(item)"></a>            
        </el-col>
      </el-row>
    </el-col>
    <el-col class="fit FlexCol">
      <a class="separator"></a>
      <el-image fit="fill" :src="src"></el-image>
    </el-col>

    <!-- 锁屏弹窗  -->
    <el-dialog :visible.sync="dialogVisible" id="lockScreenDialog" :close-on-click-modal="false" >
      <LoginForm :loginBottom="false"
      :defaultUsername="username"
      :unlockScreen="true"
      @unlock="hideDialog"
      ></LoginForm>
    </el-dialog>
  </nav>
</template>


<script>
import Dropdown from '../../components/Dropdown/Dropdown.vue'
import LoginForm from '../../views/Login/LoginForm/LoginForm.vue'

export default {
  data() {
    return {
        username: this.$store.getters.username,
        notificationNumber: 23,

        //availableMoudles对应照片墙内容，可配置
        moudles: this.$store.getters.availableMoudles,
        src: require("../../assets/svg/icon_logoshense.svg"),
        navPills: [
          {name:"Notification" , iconClass: "icon-dapeng_main_cloud_pa43"},
          {name:"ModulesNav", iconClass: "icon-dapeng_main_cloud_pa55"},
          {name:"Settings", iconClass: "icon-dapeng_main_cloud_pa18"},
          {name:"Lock", iconClass: "icon-dapeng_main_cloud_pa35"},
          {name:"Home", iconClass: "icon-dapeng_main_cloud_pa58"}
        ],
        showAllNavPills: this.$store.getters.curRoute == 'MainPic' ? false : true,
        userOptions: [
          {name: "修改密码"},
          {name: "关于"},
          {name: "用户手册"},
          {name: "注销用户", command: "logout"}
        ],
        dialogVisible: false,
        personalizedConfig: false
    };
  },
  mounted(){
    this.moudles.forEach(moudle => {
      moudle.command = "redirect"
    })
  },
  computed:{
    navPillsFilter: function(){
      if(this.showAllNavPills){
        return [
          {name:"Notification" , iconClass: "icon-dapeng_main_cloud_pa43"},
          {name:"ModulesNav", iconClass: "icon-dapeng_main_cloud_pa55"},
          {name:"personalizedConfig", iconClass: "icon-dapeng_main_cloud_pa18"},
          {name:"LockScreen", iconClass: "icon-dapeng_main_cloud_pa35"},
          {name:"Home", iconClass: "icon-dapeng_main_cloud_pa58"}
        ]
      }else{
        return [{name:"LockScreen", iconClass: "icon-dapeng_main_cloud_pa35"}]
      }
    }
  },
  watch:{
    $route: {
      handler: function(val, oldVal){
        // console.log(val);
        if(val.name == "MainPic"){
          this.showAllNavPills = false
        }else{
          this.showAllNavPills = true
        }
        //将跳转后的页面设为当前页
        this.$store.dispatch('page/setCurRoute', val.name)
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    handleClick(item){
      if(item.name == "Home"){
        this.$router.push({ path: '/MainFrame' })
        .catch((e) => {})
      }else if(item.name == "LockScreen"){
        this.$store.dispatch('user/logout')
        .then(() => {
            this.dialogVisible = true
        })
        .catch((e) => {
            console.log(e);
        })
      }else if(item.name == "personalizedConfig"){
        this.$store.dispatch('page/setPersonalizedConfigVisible', true).then(() => {
          console.log(this.$store.getters.personalizedConfigVisible)
        })
      }
    },
    logout() {
      this.$store.dispatch('user/logout')
      .then(() => {
          this.$router.push({ path: "/Login" })
          .catch(err => {
          })
      })
      .catch((e) => {
          console.log(e);
      })
    },
    redirect(item) {
      console.log(item);
      this.$router.push({ path: item.path })
      .catch((e) => {})
    },
    hideDialog(){
      this.dialogVisible = false
    }
  },
  components:{
    "Dropdown": Dropdown,
    "LoginForm": LoginForm
  }
};
</script>

<style scoped>
  #Header {
    color: #ffffff;
    background-color: #4d5f6e;
    padding: 0 30px;
  }

  #Header > .el-col:last-child{
    margin-right: 20px;
  }

  #Header .rightNav .el-col.pills{
    width: 50px;
    text-align: center;
  }

  #Header #usernameDropdown{
    padding: 0 15px;
    width: auto;
  }

  #Header .el-dropdown {
    line-height: 70px;
    color: #ffffff;
    cursor: pointer;
    width: 100%;
  }

  #Header .el-dropdown >>> .el-dropdown-link{
    display: block;
    outline: none;
    color: #d1dee8;
  }

  #Header >>> a{
    font-size: 20px;
    color: #d1dee8;
    line-height: 70px;
    cursor: pointer;
  }

  #Header >>> .el-badge__content.is-fixed{
    top: 26px;
    background: #85bf67;
    min-width: 21px;
    height: 15px;
    font-size: 10px;
    color: #fff;
    text-align: center;
    line-height: 15px;
    border-radius: 11px;
    padding: 0 3px;
    border-width: 1px 0;
    border-color: transparent;
  }

  #Header a.separator {
    padding: 0;
    font-size: 2rem;
    box-shadow: -1px 0 0 0 rgba(255, 255, 255, 0.5);
    width: 1px;
    height: 30px;
    color: #ffffff;
    margin: 20px 20px 20px 0;
  }

  /* 锁屏弹出框样式 */
  #lockScreenDialog >>> .el-dialog{
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) !important;
  }

  #lockScreenDialog >>> .el-dialog__header,
  #lockScreenDialog >>> .el-dialog__body{
    padding: 0;
  }
</style>