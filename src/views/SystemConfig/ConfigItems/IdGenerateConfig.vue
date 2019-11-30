<template>
  <div style="width:100%;height:100%;display:flex;">
    <el-row class="FlexCol Fill">
      <el-col class="leftContent Fill shadow-r">
        <el-row class="title">ID生成规则</el-row>
        <el-row
          class="leftLabel"
          :class="{'selected': currentIndex === 1}"
          @click.native="changeSelected(1)"
        >检查号生成规则</el-row>
        <el-row
          class="leftLabel"
          :class="{'selected': currentIndex === 2}"
          @click.native="changeSelected(2)"
        >病人ID生成规则</el-row>
        <el-row
          class="leftLabel"
          :class="{'selected': currentIndex === 3}"
          @click.native="changeSelected(3)"
        >批量注册病人</el-row>
      </el-col>
      <el-col class="Fill FlexRow">
        <div v-if="currentIndex === 1">
          <el-row :span="24">
            <div class="shadow-b FlexCol topButton">
              <el-button class="btn primary">新增</el-button>
            </div>
          </el-row>
          <el-row :span="24" id="tableContainer" class="FlexRow">
            <el-table
              :data="tableData"
              stripe
              size="mini"
              height="250"
              highlight-current-row
              @current-change="handleCurrentChange"
            >
              <el-table-column
                v-for="(item,index) in itemsForTable"
                :key="index"
                :prop="item.name"
                :label="item.label"
                v-if="item.name!=='Preview'"
              ></el-table-column>
            </el-table>
          </el-row>
          <el-row :span="24" class="FlexRow Fill">
            <el-form ref="IdRulesform" :model="form">
              <ul id="pr_SearchConditionMenu" class="FlexCol">
                <li
                  :class="index>3?'previewHeight':''"
                  v-for="(item,index) in itemsForTable"
                  :key="index"
                >
                  <component
                    :is="item.type"
                    :class="item.rules?'boldClass':''"
                    :name="item.name"
                    :title="item.label"
                    :rules="item.rules"
                    :defaultValue="item.name==='Preview'?previewDefaultValue:item.defaultValue"
                    :placeholder="item.placeholder"
                    :disabled="item.disabled"
                    :options="item.options"
                    @onChange="reveice"
                  ></component>
                  <el-checkbox
                    v-show="item.name==='Preview'"
                    v-model="timeStickChecked"
                    @change="handleTimeSpanChanged"
                  >时间戳</el-checkbox>
                </li>
              </ul>
            </el-form>
          </el-row>
        </div>

        <div
          v-else-if="currentIndex === 2"
          class="Fill FlexRow"
          style="height:100%;margin-bottom:76px;"
        >
          <el-form ref="patientRuleForm" :model="form" style="height:100%;">
            <div style="overflow:auto;height:100%;" class="FlexRow">
              <el-row
                style="width:300px;padding:10px 30px;"
                v-for="(myitem,index) in patientFormData"
                :key="index"
              >
                <component
                  :is="myitem.type"
                  :class="myitem.rules?'boldClass':''"
                  :name="myitem.name"
                  :title="myitem.label"
                  :rules="myitem.rules"
                  :defaultValue="myitem.name==='Preview'?previewDefaultValue:myitem.defaultValue"
                  :placeholder="myitem.placeholder"
                  :disabled="myitem.disabled"
                  @onChange="reveice"
                ></component>
                <el-checkbox v-show="myitem.name==='pre'" v-model="timeStickChecked"
                    @change="handleTimeSpanChanged">时间戳</el-checkbox>
              </el-row>
            </div>
          </el-form>
        </div>

        <div
          v-else-if="currentIndex === 3"
          class="Fill FlexRow"
          style="height:100%;margin-bottom:76px;"
        >
          <el-form ref="batchRuleForm" :model="form" style="height:100%;">
            <div style="overflow:auto;height:100%;" class="FlexRow">
              <el-row
                style="width:300px;padding:10px 30px;"
                v-for="(myitem,index) in patientFormData"
                :key="index"
              >
                <component
                  :is="myitem.type"
                  :class="myitem.rules?'boldClass':''"
                  :name="myitem.name"
                  :title="myitem.label"
                  :rules="myitem.rules"
                  :defaultValue="myitem.name==='Preview'?previewDefaultValue:myitem.defaultValue"
                  :placeholder="myitem.placeholder"
                  :disabled="myitem.disabled"
                  @onChange="reveice"
                ></component>
                <el-checkbox v-show="myitem.name==='pre'">时间戳</el-checkbox>
              </el-row>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import InputTag from "@/components/Form/Input";
import Select from "@/components/Form/Select";

var TestNumComponent = {
  template: `
    <div><div>11111</div></div>
    `
};

export default {
  data() {
    return {
      currentIndex: 1,
      inputValue1: "",
      leftSelectRule: "TestNumComponent",
      timeStickChecked: false,
      currentRow: null,
      itemsForTable: [
        {
          type: "Select",
          name: "hospitalInstitution",
          label: "医疗机构",
          src: "",
          defaultValue: "inInstitution",
          rules: [{ required: true, message: "此项为必填项" }],
          placeholder: "请选择",
          options: [{name: "112233", value: "1"},
                {name: "223344", value: "2"},
                {name: "334455", value: "3"},
                {name: "445566", value: "4"}],
        },
        {
          type: "InputTag",
          name: "pre",
          label: "前缀",
          src: "",
          defaultValue: "联影医院",
          placeholder: "联影医院"
        },
        {
          type: "InputTag",
          name: "streamNum",
          label: "流水号位数",
          src: "",
          defaultValue: "",
          rules: [{ required: true, message: "此项为必填项" }],
          placeholder: "流水号位数"
        },
        {
          type: "Select",
          name: "modalityType",
          label: "设备类型",
          src: "",
          defaultValue: "inInstitution",
          placeholder: "请选择",
          multiple: true
        },
        {
          type: "InputTag",
          name: "streamNumCur",
          label: "流水号当前值",
          src: "",
          defaultValue: "",
          rules: [{ required: true, message: "此项为必填项" }],
          placeholder: ""
        },
        {
          type: "InputTag",
          name: "last",
          label: "后缀",
          src: "",
          defaultValue: "",
          placeholder: ""
        },
        {
          type: "Select",
          name: "modality",
          label: "设备",
          src: "",
          defaultValue: "inInstitution",
          rules: [{ required: true, message: "此项为必填项" }],
          placeholder: "请选择",
          multiple: true
        },
        {
          type: "InputTag",
          name: "Preview",
          label: "预览",
          src: "",
          defaultValue: "",
          placeholder: "",
          disabled: 'true'
        }
      ],
      form: {
        hospitalInstitution: "",
        pre: "",
        streamNum: "",
        modalityType: "",
        streamNumCur: "111",
        last: "",
        modality: "",
        Preview: ""
      },
      tableData: [
        {
          hospitalInstitution: "联影医疗1",
          pre: "",
          streamNum: "10",
          modalityType: "CT",
          streamNumCur: "11111",
          last: "",
          modality: "uCT",
          Preview: "111"
        },
        {
          hospitalInstitution: "联影医疗2",
          pre: "",
          streamNum: "11",
          modalityType: "CT",
          streamNumCur: "11111",
          last: "",
          modality: "uCT",
          Preview: "111"
        },
        {
          hospitalInstitution: "联影医疗3",
          pre: "",
          streamNum: "12",
          modalityType: "CT",
          streamNumCur: "11111",
          last: "",
          modality: "uCT",
          Preview: "111"
        },
        {
          hospitalInstitution: "联影医疗4",
          pre: "",
          streamNum: "13",
          modalityType: "CT",
          streamNumCur: "11111",
          last: "",
          modality: "uCT",
          Preview: "111"
        },
        {
          hospitalInstitution: "联影医疗5",
          pre: "",
          streamNum: "14",
          modalityType: "CT",
          streamNumCur: "2222222",
          last: "",
          modality: "uCT",
          Preview: "111"
        },
        {
          hospitalInstitution: "联影医疗6",
          pre: "",
          streamNum: "15",
          modalityType: "CT",
          streamNumCur: "11111",
          last: "",
          modality: "uCT",
          Preview: "111"
        },
        {
          hospitalInstitution: "联影医疗7",
          pre: "",
          streamNum: "16",
          modalityType: "CT",
          streamNumCur: "11111",
          last: "",
          modality: "uCT",
          Preview: "111"
        },
        {
          hospitalInstitution: "联影医疗8",
          pre: "",
          streamNum: "17",
          modalityType: "CT",
          streamNumCur: "11111",
          last: "",
          modality: "uCT",
          Preview: "111"
        },
        {
          hospitalInstitution: "联影医疗9",
          pre: "",
          streamNum: "18",
          modalityType: "CT",
          streamNumCur: "11111",
          last: "",
          modality: "uCT",
          Preview: "111"
        },
        {
          hospitalInstitution: "联影医疗10",
          pre: "",
          streamNum: "19",
          modalityType: "CT",
          streamNumCur: "11111",
          last: "",
          modality: "uCT",
          Preview: "111"
        }
      ],

      patientFormData: [
        {
          type: "Select",
          name: "hospitalInstitution",
          label: "医疗机构",
          src: "",
          defaultValue: "inInstitution",
          rules: [{ required: true, message: "此项为必填项" }],
          placeholder: "请选择"
        },
        {
          type: "InputTag",
          name: "pre",
          label: "前缀",
          src: "",
          defaultValue: "联影医院",
          placeholder: "联影医院"
        },
        {
          type: "InputTag",
          name: "streamNum",
          label: "流水号位数",
          src: "",
          defaultValue: "",
          rules: [{ required: true, message: "此项为必填项" }],
          placeholder: "流水号位数"
        },
        {
          type: "InputTag",
          name: "streamNumCur",
          label: "流水号当前值",
          src: "",
          defaultValue: "",
          rules: [{ required: true, message: "此项为必填项" }],
          placeholder: ""
        },
        {
          type: "InputTag",
          name: "last",
          label: "后缀",
          src: "",
          defaultValue: "",
          placeholder: ""
        },
        {
          type: "InputTag",
          name: "Preview",
          label: "预览",
          src: "",
          defaultValue: "",
          placeholder: "",
          disabled: 'true'
        }
      ]
    };
  },
  computed: {
    previewDefaultValue: function() {
      console.log(this.timeStickChecked);
      if (this.timeStickChecked) {
        var date = new Date();
        var predate =
          date.getFullYear().toString() +
          (date.getMonth() + 1).toString() +
          date.getDate().toString();
        console.log(this.itemsForTable[4].defaultValue);
        return predate + this.itemsForTable[4].defaultValue;
      } else {
        console.log(this.itemsForTable[4].defaultValue);
        return this.itemsForTable[4].defaultValue.toString();
      }
    }
  },
  previewDefaultValueID: function(){
      if (this.timeStickChecked) {
        var date = new Date();
        var predate =
          date.getFullYear().toString() +
          (date.getMonth() + 1).toString() +
          date.getDate().toString();
        return predate + this.patientFormData[3].defaultValue;
      } else {
        console.log(this.patientFormData[3].defaultValue);
        return this.patientFormData[3].defaultValue.toString();
      }
  },
  components: {
    TestNumComponent,
    InputTag,
    Select
  },
  methods: {
    changeSelected(index) {
      this.currentIndex = index;
    },
    reveice: function(model) {
      var itemsForTable = this.itemsForTable;
      this.form[model.property] = model.value;
    },
    submitForm(form) {
      console.log(this.form);

      this.$refs[form].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleTimeSpanChanged() {
      //console.log(this.timeStickChecked)
    },
    handleCurrentChange(val) {
      console.log(this.form);
      this.currentRow = val;
      for (var i = 0; i < this.itemsForTable.length; i++) {
        switch (this.itemsForTable[i].name) {
          case "Preview":
            this.itemsForTable[i].defaultValue = val.Preview;
            console.log(this.itemsForTable[i].defaultValue);
            break;
          case "hospitalInstitution":
            this.itemsForTable[i].defaultValue = val.hospitalInstitution;
            break;
          case "last":
            this.itemsForTable[i].defaultValue = val.last;
            console.log(this.itemsForTable[i].defaultValue);
            break;
          case "modality":
            this.itemsForTable[i].defaultValue = val.modality;
            console.log(this.itemsForTable[i].defaultValue);
            break;
          case "modalityType":
            this.itemsForTable[i].defaultValue = val.modalityType;
            console.log(this.itemsForTable[i].defaultValue);
            break;
          case "pre":
            this.itemsForTable[i].defaultValue = val.pre;
            console.log(this.itemsForTable[i].defaultValue);
            break;
          case "streamNum":
            this.itemsForTable[i].defaultValue = val.streamNum;
            console.log(this.itemsForTable[i].defaultValue);
            break;
          case "streamNumCur":
            this.itemsForTable[i].defaultValue = val.streamNumCur;
            console.log(this.itemsForTable[i].defaultValue);
            break;
          default:
            break;
        }
      }
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
$shallowGrey: #f7f9fa;
.boldClass {
  font-weight: bold;
}

#tableContainer {
  overflow: auto;
  height: 250px;
}

.leftContent {
  flex: 0 0 310px;
  color: #354552;
  font-family: Roboto-Regular;
  background-color: $shallowGrey;
  .title {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    box-shadow: inset 0 -1px 0 0 #d1d8de;
    padding-left: 30px;
  }
  .leftLabel {
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    padding-left: 30px;
    &:hover {
      background-color: #879cab;
      color: white;
    }
  }
  .selected {
    background-color: #879cab;
    color: white;
  }
}

.topButton {
  padding: 10px 30px;
  justify-content: flex-end;
}

#pr_SearchConditionMenu {
  border-radius: 2px;
  border: 0;
  background-color: #ffffff;
  justify-content: flex-start;
  flex-wrap: wrap;
  li {
    width: 20%;
    margin: 10px 2%;
    position: relative;
    line-height: 30px;
    padding: 0;
    height: 70px;
    font-family: Roboto-Regular;
    font-size: 14px;
    color: #354552;
    text-align: -webkit-match-parent;
    list-style: none;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}

.previewHeight {
  height: 100px !important;
}
</style>