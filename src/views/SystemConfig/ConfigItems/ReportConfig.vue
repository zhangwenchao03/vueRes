<template>
  <div style="width:100%;height:100%;">
    <el-form ref="form" :model="form">
      <el-row class="Fill shadow-b header">
        <span>报告配置</span>
      </el-row>
      <el-row class="Fill FlexCol" style="margin-bottom:76px;">
        <el-col id="content" class="shadow-r W360">
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <Select
              name
              title="医疗机构"
              defaultValue
              placeholder="联影医院"
              :options="options"
              :multiple="false"
            ></Select>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item>
              <div class="formLabel">审核模式</div>
              <el-radio label="一级审核">一级审核</el-radio>
              <el-radio label="二级审核">二级审核</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="是否启用待复审">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="ICD10默认显示">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="ACR默认显示">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="阴阳性是否必填">
              <el-radio v-model="YinYangState" label="是">是</el-radio>
              <el-dropdown v-show="showYinYang" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link formLabel">
                  {{YinYang}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="pleaseSet">请选择</el-dropdown-item>
                  <el-dropdown-item command="setYin">阴性</el-dropdown-item>
                  <el-dropdown-item command="setYang">阳性</el-dropdown-item>
                  <el-dropdown-item command="setNoYinYang">未定性</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-radio v-model="YinYangState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="启用知识库检查方法">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="启用知识库临床诊断">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="影像质评是否必填">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link formLabel">
                  {{YinYang}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="pleaseSet">甲等</el-dropdown-item>
                  <el-dropdown-item command="setYin">乙等</el-dropdown-item>
                  <el-dropdown-item command="setYang">丙等</el-dropdown-item>
                  <el-dropdown-item command="setNoYinYang">废片</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="符合临床诊断是否必填">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="启用送检医师要求">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="报告质量是否默认显示">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="报告质量是否必填">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link formLabel">
                  {{YinYang}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="pleaseSet">优</el-dropdown-item>
                  <el-dropdown-item command="setYin">良</el-dropdown-item>
                  <el-dropdown-item command="setYang">中</el-dropdown-item>
                  <el-dropdown-item command="setNoYinYang">差</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="综合评价是否显示">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="启用报告内容首行缩进">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="启用传染病标记">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="危急值是否显示">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="是否自动弹出申请单">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30 shadow-b PB20" type="flex" justify="start">
            <el-form-item label="是否显示悬浮窗">
              <el-radio v-model="examinModeState" label="是">是</el-radio>
              <el-radio v-model="examinModeState" label="否">否</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="Fill shadow-b contentTitle">记录样式修改</el-row>
          <el-row class="Fill PLR30">
            <ul>
              <li>
                <Select
                  name
                  title="添加样式"
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li>
                <el-form-item prop="color1" label="添加颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>
          <el-row class="Fill PB20 PLR30">
            <ul>
              <li>
                <Select
                  name
                  title="删除样式"
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li>
                <el-form-item prop="color1" label="删除颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>
        </el-col>
        <el-col id="content" class="Fill">
          <el-row class="Fill PLR30 MT20 FlexCol">
            <el-col :span="6" style="box-shadow: 0 0 0 1px #D1D8DE;border-radius: 2px;text-align:center;">
              
                <div style="width:100%;">
                    <div style="width:100%;" class="listHead">设备类型</div>
                    <div class="listItemsParent">
                      <div style="width:100%;" class="listItems" :class="{backgroundgrey:index%2==1}" v-for="(item,index) in modalityTypes" :key="index" @click="changeModalityReport(item)">{{item}}</div>
                    </div>
                </div>
              
            </el-col>
            <el-col :span="18" class="Fill">
              <div class="Fill rightContent">
                <div class="rightContentBg MT20">
                  <div class="innerContent"></div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
            

<script>
import Input from "../../../components/Form/Input";
import Select from "../../../components/Form/Select";

export default {
  data() {
    return {
      options: [
        { name: "小时", value: "inHours" },
        { name: "分钟", value: "inMins" }
      ],
      YinYang: "请选择",
      YinYangState: "",
      color: "rgba(255, 69, 0, 0.68)",
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577"
      ],
      modalityTypes: ["CT", "MR", "DR", "DX","",""]
    };
  },
  computed: {
    showYinYang: function() {
      if (this.YinYangState === "是") {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    Input,
    Select
  },
  methods: {
    handleCommand(commond) {
      console.log(commond);

      if (commond === "pleaseSet") {
        this.YinYang = "请选择";
      } else if (commond === "setYin") {
        this.YinYang = "阴性";
      } else if (commond === "setYang") {
        this.YinYang = "阳性";
      } else if (commond === "setNoYinYang") {
        this.YinYang = "未定性";
      }
    },
    handleTabsClick(tab, event) {
      console.log(tab, event);
    },
    changeModalityReport(modalityName){
      switch (modalityName) {
        case 'CT':
          //请求的报告模板
          break;
        case 'MR':
          //请求的报告模板
          break;
        case 'DR':
          //请求的报告模板
          break;
        case 'DX':
          //请求的报告模板
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
#content .MT20 {
  margin-top: 20px;
}

#content .MB20 {
  margin-bottom: 20px;
}

#content .PLR30 {
  padding: 0 30px;
}

#content .PB20 {
  padding-bottom: 20px;
}

#content .PT20 {
  padding-top: 20px;
}

#content >>> .el-form-item {
  margin-bottom: 0;
}

#content >>> .el-form-item__content {
  line-height: 0;
}

.header {
  height: 45px;
  line-height: 45px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #354552;
  padding: 0 30px;
}
.W360 {
  width: 360px;
}

.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #879cab;
  color: white;
}

.contentTitle {
  height: 54px;
  line-height: 54px;
  color: #85bf67;
  font-size: 12px;
  padding: 0 30px;
}

ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

li {
  margin-right: 10px;
  justify-content: flex-end;
  margin-bottom: 0;
  list-style: none;
  color: #697c8b;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.listHead {
  padding-right: 30px;
  position: relative;
  padding: 17px 0px 17px 0px;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #7b8994;
  width:100%;
  background: #f7f9fa;
}

.listItems {
  padding-right: 30px;
  position: relative;
  padding: 17px 0px;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  width:100%;
  cursor: pointer;
}

.listItems:hover {
  background: #879CAB;
}

.backgroundgrey {
  background: #f7f9fa;
}

.rightContent{
    box-shadow: inset 0 0 0 1px #D1D8DE;
    border-radius: 2px;
    margin-left: 20px;
    padding: 20px;
    height: 1189px;
}
.rightContentBg {
    height: 1024px;
    background: #f0f1f2;
    padding: 60px;
}

.innerContent {
    height: 930px;
    background: #ffffff;
    padding: 60px;
}
</style>