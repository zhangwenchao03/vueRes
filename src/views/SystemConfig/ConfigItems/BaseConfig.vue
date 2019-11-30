<template>
  <div style="width:100%;height:100%;">
    <el-form ref="form" :model="form">
      <el-row class="Fill shadow-b header">
        <span>常规配置</span>
      </el-row>
      <el-row style="margin-bottom:76px;">
        <el-col id="rightContent" :span="12" class="shadow-r">
          <el-row class="Fill shadow-b contentTitle">设置院内报告时间</el-row>
          <el-row type="flex" class="Fill subContentTop">
            <ul class="ul">
              <li class="li">
                <Input name="aaa" title="急诊报告时间" defaultValue="1" placeholder="1" />
              </li>
              <li class="li">
                <Select
                  name
                  title
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li class="li">
                <el-form-item prop="color1">
                  <span class="colorSelectorTitle" style="display:block;">报警颜色</span>
                  <el-dropdown @command="changeShowColor" trigger="click" class="colorDrop">
                    <div class="colorSelectorContainer el-dropdown-link">
                      <div :style="{background: selectedColor}"></div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(item,index) in colorPan"
                        :key="index"
                        class="dropDownItem"
                        :command="item.color"
                      >
                        <span>
                          <div class="colorStyle" :style="{background: item.color}"></div>
                          <span class="dropColorFont">{{item.title}}</span>
                        </span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form-item>
              </li>
            </ul>
          </el-row>
          <el-row type="flex" class="Fill shadow-b subContentBottom">
            <ul class="ul">
              <li class="li">
                <Input name="aaa" title="急诊报告时间" defaultValue="1" placeholder="1" />
              </li>
              <li class="li">
                <Select
                  name
                  title
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li class="li">
                <el-form-item prop="color1" label="报警颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>
          <el-row type="flex" class="Fill subContentTop">
            <ul class="ul">
              <li class="li">
                <Input name="aaa" title="急诊报告时间" defaultValue="1" placeholder="1" />
              </li>
              <li class="li">
                <Select
                  name
                  title
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li class="li">
                <el-form-item prop="color1" label="报警颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>
          <el-row type="flex" class="Fill shadow-b subContentBottom">
            <ul class="ul">
              <li class="li">
                <Input name="aaa" title="急诊报告时间" defaultValue="1" placeholder="1" />
              </li>
              <li class="li">
                <Select
                  name
                  title
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li class="li">
                <el-form-item prop="color1" label="报警颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>

          <el-row class="Fill shadow-b contentTitle">设置区域报告时间</el-row>
          <el-row type="flex" class="Fill subContentTop">
            <ul class="ul">
              <li class="li">
                <Input name="aaa" title="急诊报告时间" defaultValue="1" placeholder="1" />
              </li>
              <li class="li">
                <Select
                  name
                  title
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li class="li">
                <el-form-item prop="color1" label="报警颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>
          <el-row type="flex" class="Fill shadow-b subContentBottom">
            <ul class="ul">
              <li class="li">
                <Input name="aaa" title="急诊报告时间" defaultValue="1" placeholder="1" />
              </li>
              <li class="li">
                <Select
                  name
                  title
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li class="li">
                <el-form-item prop="color1" label="报警颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>
          <el-row type="flex" class="Fill subContentTop">
            <ul class="ul">
              <li class="li">
                <Input name="aaa" title="急诊报告时间" defaultValue="1" placeholder="1" />
              </li>
              <li class="li">
                <Select
                  name
                  title
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li class="li">
                <el-form-item prop="color1" label="报警颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>
          <el-row type="flex" class="Fill shadow-b subContentBottom">
            <ul class="ul">
              <li class="li">
                <Input name="aaa" title="急诊报告时间" defaultValue="1" placeholder="1" />
              </li>
              <li class="li">
                <Select
                  name
                  title
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li class="li">
                <el-form-item prop="color1" label="报警颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>
          <el-row type="flex" class="Fill subContentTop">
            <ul class="ul">
              <li class="li">
                <Input name="aaa" title="急诊报告时间" defaultValue="1" placeholder="1" />
              </li>
              <li class="li">
                <Select
                  name
                  title
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li class="li">
                <el-form-item prop="color1" label="报警颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>
          <el-row type="flex" class="Fill shadow-b subContentBottom">
            <ul class="ul">
              <li class="li">
                <Input name="aaa" title="急诊报告时间" defaultValue="1" placeholder="1" />
              </li>
              <li class="li">
                <Select
                  name
                  title
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li class="li">
                <el-form-item prop="color1" label="报警颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>
          <el-row type="flex" class="Fill shadow-b subContentBottom">
            <ul class="ul">
              <li class="li">
                <Input name="aaa" title="急诊报告时间" defaultValue="1" placeholder="1" />
              </li>
              <li class="li">
                <Select
                  name
                  title
                  defaultValue
                  placeholder="小时"
                  :options="options"
                  :multiple="false"
                ></Select>
              </li>
              <li class="li">
                <el-form-item prop="color1" label="报警颜色">
                  <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
                </el-form-item>
              </li>
            </ul>
          </el-row>

          <el-row class="Fill shadow-b contentTitle">提示音场景配置</el-row>
          <el-row type="flex" justify="end" class="MT20 MB20 PLR30">
            <el-checkbox-group v-model="checkList">
              <div>
                <el-checkbox label="上级发送报告至本机构"></el-checkbox>
                <el-image class="musicIcon" fit="fill" :src="uploadSound"></el-image>
                <el-image class="musicIcon" fit="fill" :src="listenSound"></el-image>
              </div>
              <div>
                <el-checkbox label="夜间急诊报告审核"></el-checkbox>
                <el-image class="musicIcon" fit="fill" :src="uploadSound"></el-image>
                <el-image class="musicIcon" fit="fill" :src="listenSound"></el-image>
              </div>
              <div>
                <el-checkbox label="上级驳回报告"></el-checkbox>
                <el-image class="musicIcon" fit="fill" :src="uploadSound"></el-image>
                <el-image class="musicIcon" fit="fill" :src="listenSound"></el-image>
              </div>
            </el-checkbox-group>
          </el-row>
        </el-col>
        <el-col id="rightContent" :span="12">
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <Select name title="医疗机构" defaultValue placeholder :options="options" :multiple="false"></Select>
          </el-row>
          <el-row class="PLR30" type="flex" justify="start">
            <el-checkbox label="检查号自动匹配"></el-checkbox>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <Input name title="时间控制（小时）" defaultValue="1" placeholder="1"></Input>
          </el-row>
          <el-row class="MT20 PLR30">
            <el-checkbox label="预约登记显示匹配列表"></el-checkbox>
          </el-row>
          <el-row class="MT20 PLR30">
            <el-checkbox label="允许手工输入检查号"></el-checkbox>
          </el-row>
          <el-row class="MT20 PLR30">
            <el-checkbox label="允许审核/复审自己的报告"></el-checkbox>
          </el-row>
          <el-row class="MT20 PLR30">
            <el-checkbox label="开启免登记流程"></el-checkbox>
          </el-row>
          <el-row class="MT20 PLR30">
            <el-checkbox label="新老报告兼容"></el-checkbox>
          </el-row>
          <el-row class="MT20 PLR30">
            <el-form-item>
              <div class="formLabel">编辑报告起始状态</div>
              <el-radio v-model="reportStartState" label="已分诊">已分诊</el-radio>
              <el-radio v-model="reportStartState" label="已检查">已检查</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30">
            <el-form-item>
              <div class="formLabel">账户登录配置</div>
              <el-radio v-model="userLoginConfigState" label="仅允许在单一客户端登录">仅允许在单一客户端登录</el-radio>
              <el-radio v-model="userLoginConfigState" label="允许在多个客户端同时登陆">允许在多个客户端同时登陆</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30">
            <el-checkbox label="自动刷新页面列表" v-model="autofreshCheckbox"></el-checkbox>
          </el-row>
          <el-row class="PLR30" type="flex" justify="start">
            <el-form-item label="时间间隔（秒）">
              <el-input v-model="input" :disabled="!autofreshCheckbox" placeholder></el-input>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="报告打印纸张尺寸">
              <el-select v-model="value" placeholder="A4">
                <el-option
                  v-for="item in paperSizes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30">
            <el-form-item>
              <div class="formLabel">报告归档条件</div>
              <el-radio v-model="reportArchiveState" label="已初诊">已初诊</el-radio>
              <el-radio v-model="reportArchiveState" label="已审核">已审核</el-radio>
              <el-radio v-model="reportArchiveState" label="已复审">已复审</el-radio>
              <el-radio v-model="reportArchiveState" label="已打印">已打印</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30">
            <el-form-item>
              <div class="formLabel">报告存储格式</div>
              <el-radio v-model="reportStorageState" label="PDF">PDF</el-radio>
              <el-radio v-model="reportStorageState" label="JPEG">JPEG</el-radio>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="报告存储路径">
              <el-input v-model="input" placeholder></el-input>
            </el-form-item>
          </el-row>
          <el-row class="PLR30">
            <span>如本地: c:\Report\ 或FTP: ftp://username:password@ip:port/Report/</span>
          </el-row>
          <el-row class="MT20 PLR30" type="flex" justify="start">
            <el-form-item label="云胶片IP">
              <el-input v-model="IpInput" placeholder="例如:http://ip:port/film"></el-input>
            </el-form-item>
          </el-row>
          <el-row class="MT20 PLR30">
            <el-checkbox label="已检查后打印二维码"></el-checkbox>
            <el-checkbox label="使用精简版云胶片"></el-checkbox>
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
      colorPan:[
        {title:'红色',color:'red'},
        {title:'红色',color:'red'},
        {title:'红色',color:'red'},
        {title:'红色',color:'red'}
      ],
      options: [
        { name: "小时", value: "inHours" },
        { name: "分钟", value: "inMins" }
      ],
      uploadSound: require("../../../assets/svg/dapeng_main_cloud_pacs_icon_shangchuan.svg"),
      listenSound: require("../../../assets/svg/dapeng_main_cloud_pacs_icon_erji.svg"),
      checkList: [],
      selectedColor: "rgba(255, 69, 0, 0.68)",
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
      reportStartState: "已分诊",
      userLoginConfigState: "仅允许在单一客户端登录",
      autofreshCheckbox: false,
      paperSizes: [
        {
          value: "A4",
          label: "A4"
        },
        {
          value: "A5",
          label: "A5"
        },
        {
          value: "B5",
          label: "B5"
        }
      ],
      reportArchiveState: "已初诊",
      reportStorageState: "PDF",
      IpInput: ""
    };
  },
  computed: {},
  components: {
    Input,
    Select
  },
  methods: {
    handleClick() {
      console.log(111111);
    },
    changeShowColor(command){
      console.log(command)
      this.selectedColor = command;
    }
  }
};
</script>
<style scoped>
#rightContent .MT20 {
  margin-top: 20px;
}

#rightContent .MB20 {
  margin-bottom: 20px;
}

#rightContent .PLR30 {
  padding: 0 30px;
}

#rightContent >>> .el-form-item {
  margin-bottom: 0;
}

#rightContent >>> .el-form-item__content {
  line-height: 0;
}

.musicIcon {
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
}

.header {
  height: 45px;
  line-height: 45px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #354552;
  padding: 0 30px;
}
.contentTitle {
  height: 54px;
  line-height: 54px;
  color: #85bf67;
  font-size: 12px;
  padding: 0 30px;
}

.subContentTop {
  padding: 20px 30px 0 30px;
}
.subContentBottom {
  padding: 0 30px 20px 30px;
}
.ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.li {
  margin-right: 10px;
  justify-content: flex-end;
  margin-bottom: 0;
  list-style: none;
  font-weight: bold;
  color: #697c8b;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.colorSelectorTitle {
  font-size: 12px;
  color: #787993;
  line-height: 14px;
  margin: 2px 0 6px;
}

.colorSelectorContainer {
  margin-top: 10px;
  width: 50px;
  height: 20px;
  box-shadow: inset 0 0 0 1px #d1d8de;
  padding: 4px;
  border-radius: 2px;
  cursor: pointer;
}

.colorSelectorContainer div {
  width: 100%;
  height: 100%;
  /* background:green; */
}

.dropColorFont {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #787993;
  text-align: left;
}

.dropDownItem {
  width: 120px;
  height: 40px;
}

.colorStyle {
  vertical-align: middle;
  width: 18px;
  height: 18px;
  background: red;
  display: inline-block;
  border-radius: 2px;
  margin-right: 10px;
}
</style>