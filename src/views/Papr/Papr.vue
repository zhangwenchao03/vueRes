<template>
  <div class="FlexRow Fill">
    <el-row type="Flex" class="FlexCol Fill HF">
      <el-col class="FlexRow shadow-r-out prLeft">
        <el-row class="h70 shadow-b">
          <el-dropdown trigger="click" class="dropDown">
            <span class="el-dropdown-link">
              分诊列表
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in paDropDownData" :key="index">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="Icon">
            <a class="icon-dapeng_main_cloud_pa23 Icon-item" title="查询条件" @click="showFilter"></a>
            <a class="icon-dapeng_main_cloud_pa22 Icon-item" title="取消检查"></a>
            <a class="icon-dapeng_main_cloud_pa49 Icon-item" title="预约到达"></a>
          </div>
          <div id="filterRow" v-show="filterShow">
            <ul id="pr_SearchConditionMenu">
              <el-form ref="form" :model="form">
                <li v-for="(item,index) in filterItems" :key="index">
                  <component
                    :is="item.type"
                    :name="item.name"
                    :title="item.label"
                    :rules="item.rules"
                    :defaultValue="item.defaultValue"
                    :placeholder="item.placeholder"
                    :options="patientTypes"
                    :multiple="item.multiple"
                    @onChange="reveice"
                  ></component>
                </li>
                <li>
                  <el-button class="btn primary" @click="beginSearch">确 定</el-button>
                </li>
              </el-form>
            </ul>
          </div>
        </el-row>
        <el-row class="shadow-b Fill overAuto FlexRow">
          <el-table stripe style="width: 100%" height="250">
            <el-table-column
              v-for="(column, index) in columns"
              v-bind:key="index"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
            ></el-table-column>
          </el-table>
        </el-row>
        <el-row class="h76">
          <p>显示信息</p>
        </el-row>
      </el-col>
      <el-col class="Fill FlexRow overAuto">
        <el-row class="FlexCol h70 shadow-b rightBtn">
          <el-col class="Fill">
            <a>病人注册</a>
          </el-col>
          <el-checkbox class="check_1" @change="handleCheck"></el-checkbox>
          <el-select :disabled="IsSelectActive" v-model="SelectValue" class="select_1">
            <el-option label="登记完成自动扫描上传" value="A"></el-option>
            <el-option label="登记完成弹出扫描界面" value="M"></el-option>
          </el-select>
          <el-button class="btn primary new">
            <span class="icon-dapeng_main_cloud_pa46"></span>新建
          </el-button>
          <el-button class="btn secondary bulk new" @click="showPatchRegister">
            <span class="icon-dapeng_main_cloud_pa20"></span>批量登记
          </el-button>
        </el-row>
        <el-row class="FlexRow Fill overAuto">
          <patient-edit @showAndSelectCheckItemsP="showPopPage"></patient-edit>
        </el-row>
        <el-row class="h76 footBtn shadow-t">
          <el-button class="btn primary">保存</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-form ref="checkItems" :model="checkItemsform">
      <Dialog
        @hiddeDialog="hiddeDialog"
        :dialogVisible="dialogOptions.dialogVisible"
        :title="dialogOptions.title"
        :dialogType="dialogOptions.dialogType"
        :requestData="dialogOptions.requestData"
        @truncateCheckItemsValue="truncateCheckItemsValue"
      >
        <div slot="dialogContent">
          <!-- <component :is="dialogComponent"></component> -->
          <tree-transfer
            :title="title"
            :from_data="fromData"
            :to_data="toData"
            :defaultProps="{label:'label'}"
            @addBtn="add"
            @removeBtn="remove"
            :mode="mode"
            height="300px"
            filter
            openAll
          ></tree-transfer>
          <Input title="检查费用" disabled='true' :defaultValue="checkItemsSelected.toString()"></Input>
        </div>
      </Dialog>
    </el-form>
    <div id="dialog">
    <el-dialog title="批量登记" :visible.sync="showPatchRegisterDialog" :before-close="handleClose" top="0">
      <el-divider></el-divider>
      
      <!-- 提示框 -->
      <span slot="footer" class="dialog-footer">
        <el-button class="btn primary" type="primary" @click="submit">清空</el-button>
        <el-button class="btn primary" type="primary" @click="submit">增加行</el-button>
        <el-button class="btn primary" type="primary" @click="submit">提交</el-button>
        <el-button class="btn primary" type="primary" @click="submit">生成行</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>
<script>
import Input from "@/components/Form/Input.vue";
import Select from "@/components/Form/Select.vue";
import Datepicker from "@/components/Form/Datepicker.vue";
import Table from "@/components/Table/Table.vue";
import Dialog from "@/components/Dialog/Dialog";
import treeTransfer from "el-tree-transfer";

export default {
  name: "PaprView",
  components: {
    PatientEdit: () => import("@/components/PatientInfo/patientEdit.vue"),
    Input,
    Select,
    Datepicker,
    Table,
    Dialog,
    treeTransfer
  },
  data() {
    return {
      //start 树形穿梭框所需
      title: ["待选", "已选"],
      mode: "transfer", // transfer addressList
      fromData: [
        {
          id: "1",
          pid: 0,
          label: "头部",
          children: [
            {
              id: "1-1",
              pid: "1",
              label: "项目1",
              disabled: true,
              children: []
            },
            {
              id: "1-2",
              pid: "1",
              label: "项目2",
              children: [
                {
                  id: "1-2-1",
                  pid: "1-2",
                  children: [],
                  label: "项目2-1"
                },
                {
                  id: "1-2-2",
                  pid: "1-2",
                  children: [],
                  label: "项目2-2"
                }
              ]
            }
          ]
        }
      ],
      toData: [],
      checkItemsform: {},
      checkItemsSelected: [],
      //end
      dialogOptions: {
        title: "检查项目",
        dialogVisible: false,
        paprPageDialogDatas: [],
        dialogType: "checkItems",
        requestData: {
          url: "www.baidu.com",
          method: "get",
          options: {}
        }
      },
      showPopPageData: false,
      showPatchRegisterDialog: false,
      IsSelectActive: true,
      SelectValue: "A",
      paDropDownData: ["分诊列表0", "预约列表0"],
      filterShow: false,
      filterItems: [
        {
          type: "Select",
          name: "",
          label: "设备类型",
          src: "",
          defaultValue: "inModality",
          multiple: true,
          placeholder: "请选择"
        },
        {
          type: "Select",
          name: "",
          label: "检查设备",
          src: "",
          defaultValue: "inModality",
          multiple: true,
          placeholder: "请选择"
        },
        {
          type: "Input",
          name: "patientName",
          label: "病人姓名",
          src: "",
          defaultValue: "",
          placeholder: "请输入病人姓名"
        },
        {
          type: "Input",
          name: "doctorName",
          label: "申请单号",
          src: "",
          defaultValue: "",
          placeholder: "请输入病人姓名"
        },
        {
          type: "Select",
          name: "",
          label: "登记时间",
          src: "",
          defaultValue: "inDateTime",
          placeholder: "请选择"
        },
        {
          type: "Datepicker",
          name: "",
          label: "登记开始时间",
          src: "",
          defaultValue: "2019-10-01",
          placeholder: "2019-10-01"
        },
        {
          type: "Datepicker",
          name: "",
          label: "登记结束时间",
          src: "",
          defaultValue: "2019-10-01",
          placeholder: "2019-10-01"
        }
      ],
      patientTypes: [
        { name: "住院", value: "inPatient" },
        { name: "门诊", value: "OutPatient" },
        { name: "体检", value: "Exam" },
        { name: "急诊", value: "Enmergency" }
      ],
      form: {},
      columns: [
        { prop: "state", label: "状态", width: 70 },
        { prop: "patientID", label: "病人ID", width: 70 },
        { prop: "applyDate", label: "检查日期", width: 70 },
        { prop: "patientName", label: "病人姓名", width: 70 },
        { prop: "remoteState", label: "远程状态", width: 70 },
        { prop: "applyNumber", label: "检查号", width: 70 },
        { prop: "patientType", label: "病人类型", width: 70 },
        { prop: "modality", label: "检查设备", width: 70 },
        { prop: "modalityType", label: "设备类型", width: 70 },
        { prop: "procedureName", label: "检查项目", width: 70 },
        { prop: "reportDoctor", label: "初诊医生", width: 70 }
      ]
    };
  },
  methods: {
    showFilter() {
      this.filterShow = !this.filterShow;
    },
    reveice: function(model) {
      console.log(model.property);
      this.form[model.property] = model.value;
      console.log(this.form);
    },
    beginSearch() {
      //查询条件点击后的事件
    },
    handleCheck(v) {
      debugger;
      this.IsSelectActive = !v;
    },
    showPopPage() {
      this.dialogOptions.dialogVisible = true;
      console.log(this.showPopPageData);
    },
    hiddeDialog(val) {
      this.dialogOptions.dialogVisible = false;
    },
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode() {
      if (this.mode == "transfer") {
        this.mode = "addressList";
      } else {
        this.mode = "transfer";
      }
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
      for (var i = 0; i < obj.nodes.length; i++) {
        this.checkItemsSelected.push(obj.nodes[i].label);
      }
      console.log(this.checkItemsSelected.toString())
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
      for (var i = 0; i < obj.nodes.length; i++) {
        this.checkItemsSelected.pop(obj.nodes[i].label);
      }
      console.log(this.checkItemsSelected.toString())
    },
    truncateCheckItemsValue(){
      this.fromData = [{id: "1",pid: 0,label: "头部",children: [{id: "1-1",pid: "1",label: "项目1",disabled: true,children: []},{id: "1-2",pid: "1",label: "项目2",children: [ {id: "1-2-1", pid: "1-2",children: [],label: "项目2-1"},{id: "1-2-2",pid: "1-2",children: [],label: "项目2-2"}]}]}]
      this.toData = [];
      this.checkItemsSelected = [];
    },
    showPatchRegister(){
      this.showPatchRegisterDialog = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.select_1 {
  width: 376px;
  margin-right: 2rem;
}
.check_1 {
  line-height: 40px;
  margin-right: 15px;
}
.prLeft {
  width: 420px;
}
.rightBtn {
  padding: 15px;
}
.new {
  margin: 0 16px;
  border: 0px;
  span {
    margin: 11px 10px 11px 0;
  }
}
.HF {
  height: 100%;
}
.overAuto {
  overflow: auto;
}
.bulk {
  min-width: 160px;
  width: auto;
}
.shadow-r-out {
  box-shadow: 1px 0 0 0 #d1d8de;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.dropDown {
  font-size: 1.5rem;
  color: #ffffff;
  line-height: 70px;
  margin-left: 30px;
  cursor: default;
}
.Icon {
  float: right;
  height: 100%;
}
.Icon-item {
  line-height: 70px;
  margin-right: 2rem;
  cursor: pointer;
}

#filterRow {
  z-index: 1000;
  width: 360px;
  position: relative;
  left: 9%;
}

#pr_SearchConditionMenu {
  min-width: 360px;
  height: 366px;
  border-radius: 2px;
  -webkit-box-shadow: 0 0 12px 0 rgba(167, 168, 204, 0.5);
  box-shadow: 0 0 10px 0 rgba(116, 136, 150, 0.27);
  border: 0;
  position: absolute;
  z-index: 1000;
  background-color: #ffffff;
}

#pr_SearchConditionMenu li {
  width: 45%;
  margin: 10px 2%;
  position: relative;
  line-height: 30px;
  padding: 0;
  height: 70px;
  float: left;
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #354552;
  display: list-item;
  text-align: -webkit-match-parent;
  list-style: none;
}
#pr_SearchConditionMenu button {
  margin-top: 30px;
  margin-left: 60px;
}
.footBtn {
  padding: 18px 28px 18px 18px;
}
.footBtn {
  .btn {
    float: right;
  }
}
</style>





