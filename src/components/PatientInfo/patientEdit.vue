<template>
  <div class="Fill FlexRow">
    <el-form :ref="prForm" :model="prForm" :label-positon='labelPosition' :rules="rules" class="FlexRow Fill">
      <el-row class="prRight">
          <el-col class="col1_3">
            <el-form-item label="病人ID">
                <el-input class="btn11" v-model="prForm.PatientId"></el-input>
                <el-button class="btn40">
                  <span class="icon-dapeng_main_cloud_pa75"></span>
                </el-button>
            </el-form-item>
          </el-col>
          <el-col class="col1_3 MLR">
            <el-form-item label="卡号">
              <el-input  v-model="prForm.SearchID"></el-input>
              <el-button class="btn40 btn41" >
                <span class="icon-dapeng_main_cloud_pa31"></span>
              </el-button>
            </el-form-item>
          </el-col>
          <el-col class="col1_3">
            <el-col class="col31">
              <el-form-item label="病人类型号">
                <el-select v-model="prForm.ClinicalIdType"  placeholder="请选择">
                  <el-option label="" value=""></el-option>
                  <el-option label="门诊" value="O"></el-option>
                  <el-option label="住院" value="I"></el-option>
                  <el-option label="体检" value="E"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="col32">
              <el-form-item>
                <el-input class="btn44" v-model="prForm.PatientNo"></el-input>
                <el-button class="btn40 btn41 btn44" >
                  <span class="icon-dapeng_main_cloud_pa31"></span>
                </el-button>
              </el-form-item>
            </el-col>
          </el-col>
      </el-row>
      <el-row class="prRight">
        <el-col class="col1_3">
          <el-form-item label="姓名" prop="PatientName">
            <el-input  v-model="prForm.PatientName"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="col1_3 MLR">
          <el-form-item label="拼音" prop="Spelling">
            <el-input  v-model="prForm.Spelling"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="col1_3">
          <el-form-item label="性别" prop="PatientSex">
            <el-select class="select" v-model="prForm.PatientSex"  placeholder="请选择">
              <el-option label="男" value="M"></el-option>
              <el-option label="女" value="F"></el-option>
              <el-option label="未说明" value="U"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="prRight">
        <el-col class="col1_3">
          <el-col class="half">
            <el-form-item label="年龄" prop="Age">
              <el-input  v-model="prForm.Age"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="half2">
            <el-form-item >
              <el-select class="select btn44" v-model="prForm.PatientSex"  placeholder="请选择">
                <el-option label="岁" value="Y"></el-option>
                <el-option label="月" value="M"></el-option>
                <el-option label="周" value="W"></el-option>
                <el-option label="天" value="D"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col class="col1_3 MLR">
          <el-form-item label="出生日期" prop="Birthday">
            <el-date-picker type="date" v-model="prForm.Birthday" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="col1_3">
          <el-form-item label="联系电话">
            <el-input  v-model="prForm.PhoneNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="prRight mbt">
        <el-col class="col1_2">
          <el-form-item label="病人类型" prop="ClinicalIdType2">
            <el-checkbox-group v-model="prForm.ClinicalIdType2" class="ck1" @change="ClinicalIdType2Change">
              <el-checkbox label="门诊"></el-checkbox>
              <el-checkbox label="住院"></el-checkbox>
              <el-checkbox label="体检"></el-checkbox>
              <el-checkbox label="急诊"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col class="col1_3">
          <el-checkbox class="ck2" @change='handleCkChange'></el-checkbox>
          <el-form-item label="预约">
            <el-date-picker 
            :disabled="isPrDataActive" 
            type="date"
            format="yyyy-MM-dd HH-MM-SS"
            v-model="prForm.ScheduledDateTime" 
            style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <hr style="margin: 0">
      <el-row class="prRight">
        <el-col class="col1_3">
          <el-form-item label="申请科室">
            <el-select class="select" v-model="prForm.ApplyOfficeCode"  placeholder="请选择">
              <el-option label="骨科" value="M"></el-option>
              <el-option label="放射" value="F"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="col1_3 MLR">
          <el-form-item label="申请医生">
            <el-select class="select" v-model="prForm.ApplyDoctorCode"  placeholder="请选择">
              <el-option label="骨科" value="M"></el-option>
              <el-option label="放射" value="F"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="col1_3">
          <el-form-item label="床号">
            <el-input  v-model="prForm.BedNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="prRight">
        <el-col class="col1_3">
          <el-form-item label="检查号">
            <el-input  v-model="prForm.AccessionNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="col1_3 MLR">
          <el-form-item label="设备类型" prop="ModalityType_Code">
            <el-select class="select" v-model="prForm.ModalityType_Code"  placeholder="请选择">
              <el-option label="骨科" value="M"></el-option>
              <el-option label="放射" value="F"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="col1_3">
          <el-form-item label="检查模板">
            <el-select class="select" v-model="prForm.ProcedureTemplate"  placeholder="请选择">
              <el-option label="骨科" value="M"></el-option>
              <el-option label="放射" value="F"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="prRight">
        <el-col class="col1_3">
          <el-form-item label="检查设备" prop="Modality_Code">
            <el-select class="select" v-model="prForm.Modality_Code"  placeholder="请选择">
              <el-option label="骨科" value="M"></el-option>
              <el-option label="放射" value="F"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="col1_3 MLR">
          <el-form-item label="费用类型">
            <el-select class="select" v-model="prForm.PayTypeCode"  placeholder="请选择">
              <el-option label="骨科" value="M"></el-option>
              <el-option label="放射" value="F"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="col1_3">
          <el-form-item label="检查费用">
            <el-input  v-model="prForm.Price"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="prRight mbt">
        <el-col class="col1_3">
            <el-form-item label="检查项目" prop="procedureName">
              <el-select class="select col35" v-model="prForm.procedureNameList"  placeholder="请选择">
                <el-option label="骨科" value="M"></el-option>
                <el-option label="放射" value="F"></el-option>
              </el-select>
              <el-button class="btn40" @click.native.stop="showAndSelectCheckItems">
                <span class="icon-dapeng_main_cloud_pa73"></span>
              </el-button>
            </el-form-item>
        </el-col>
        <el-col class="col1_3 MLR">
          <el-form-item label="设备预约量/总数">
            <el-input  v-model="prForm.ModalityUsage"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="col1_3">
          <el-form-item label="分诊队列">
            <el-select class="select" v-model="prForm.CallQueueId"  placeholder="请选择">
              <el-option label="骨科" value="M"></el-option>
              <el-option label="放射" value="F"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <hr style="margin: 0">
      <el-row>
        <el-table :data="procedureNameData">
          <el-table-column width="46">
            <template slot="header">
              <span class="icon-dapeng_main_cloud_pa30"></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ProcedureBodypart"
            label="检查部位"
            width= "85"
          >
          </el-table-column>
          <el-table-column
            prop="Name"
            label="检查项目"
            width="135"
          >
          </el-table-column>
          <el-table-column
            prop="StudyMethod_Name"
            label="检查方法"
            width="135"
          >
          </el-table-column>
          <el-table-column
            prop="ContrastMedium_Name"
            label="造影剂"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="ContrastMediumDose"
            label="造影剂量"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="CameraDirection_Name"
            label="摄影方向"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="CameraPosition_Name"
            label="摄影体位"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="ScanningLayers"
            label="扫描层数"
            width="135"
          >
          </el-table-column>
          <el-table-column
            prop="ExposureTimes"
            label="曝光次数"
            width="135"
          >
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <div class="paFloat" @click="showPaWindow">
      <el-image :src="floatImageSrc"></el-image>
    </div>
    <div class="paWindow" v-show="isPaWindowShow">
      <div class="hidePrFloatingwindowBtn" @click="hiddenPaWindow">
      </div>
      <div class="windowContent">
        <h4 class="h4">详细信息</h4>
        <el-form :ref="painfoForm" :model="painfoForm" :label-positon='labelPosition'>
          <el-row>
            <el-col class="col_32">
              <el-form-item label="身高(cm)">
                <el-input  v-model="painfoForm.PatientHeight"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="体重(kg)">
                <el-input  v-model="painfoForm.PatientWeight"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="国籍">
                <el-input  v-model="painfoForm.Nationnality"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="col_32">
              <el-form-item label="民族">
                <el-input  v-model="painfoForm.Race"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="婚姻状况">
                <el-select v-model="painfoForm.Married"  placeholder="请选择">
                  <el-option label="未婚" value="O"></el-option>
                  <el-option label="已婚" value="I"></el-option>
                  <el-option label="未说明" value="E"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="身份证号">
                <el-input  v-model="painfoForm.IdCardNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="col_32">
              <el-form-item label="护照">
                <el-input  v-model="painfoForm.Passport"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="驾照">
                <el-input  v-model="painfoForm.DriveLicense"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="工作单位">
                <el-input  v-model="painfoForm.CompanyAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="col_32">
              <el-form-item label="家庭住址">
                <el-input  v-model="painfoForm.HomeAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="出生地">
                <el-input  v-model="painfoForm.HomeTown"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="检查科室">
                <el-select v-model="painfoForm.Married"  placeholder="请选择">
                  <el-option label="" value=""></el-option>
                  <el-option label="未婚" value="O"></el-option>
                  <el-option label="已婚" value="I"></el-option>
                  <el-option label="未说明" value="E"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="col_32">
              <el-form-item label="检查房间">
                <el-input  v-model="painfoForm.ProcedureRoom"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="检查医生">
                <el-select v-model="painfoForm.ProcedureDoctorCode"  placeholder="请选择">
                  <el-option label="未婚" value="O"></el-option>
                  <el-option label="已婚" value="I"></el-option>
                  <el-option label="未说明" value="E"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="病区">
                <el-input  v-model="painfoForm.PatientArea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="col_32">
              <el-row>
                <el-form-item label="病人体征">
                  <el-input  v-model="painfoForm.ClinicalSymptom"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="病人历史">
                  <el-input  v-model="painfoForm.MedicalHisText"></el-input>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="临床诊断">
                <el-input type="textarea" class="H110" v-model="painfoForm.ClinicalDiagnosis"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="col_32">
              <el-form-item label="检查要求">
                <el-input type="textarea" class="H110" v-model="painfoForm.ProcedureRequirement"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PatientEdit',
  data () {
      var checkSpell = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('该项不能为空'));
        }
        var SValue = value.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, ''); //去除左右侧空格
        var pattern1 = /^[^\u4e00-\u9fa5]{0,200}$/i;  //不能输入汉字
        var pattern3 = /^[^\uff00-\uffff]{0,200}$/i;  //不能输入全角
        var pattern2 = /^[\u0000-\u00ff\uFF1E\uFF1C\uff41\uff21]{0,}$/i;   //只允许输入半角,允许使用全角尖括号
        if (!(pattern1.test(SValue) && pattern3.test(SValue) && pattern2.test(SValue))) {
          return callback(new Error('该输入项输入不合法（允许1-50字符，不能是中文）'));
        }
      }
      return {
          isPrDataActive: true,
          prForm :{
            PatientId: '',
            SearchID: '',
            ClinicalIdType: '',
            ClinicalIdType2: [],
            PatientNo: '',
            OutPatientNo: '',
            InPatientNo: '',
            ExamNo: '',
            PatientName: '',
            Spelling: '',
            PatientSex: '',
            Age: '',
            AgeUnit: '',
            Birthday: '',
            PhoneNumber: '',
            Scheduled: false,
            ScheduledDateTime: '',
            ApplyOfficeCode: '',
            ApplyDoctorCode: '',
            BedNo: '',
            AccessionNo: '',
            ModalityType_Code: '',
            ProcedureTemplate: '',
            Modality_Code: '',
            PayTypeCode: '',
            Price: '',
            procedureNameList: '',
            ModalityUsage: '',
            CallQueueId: ''
          },
          labelPosition: 'top',
          procedureNameData: [],
          rules: {
            PatientName:[{required: true, trigger: 'blur'}],
            Spelling:[{required: true, validator: checkSpell}],
            PatientSex: [{required: true}],
            Age: [{required: true}],
            Birthday: [{required: true}],
            ClinicalIdType2: [{required: true}],
            ModalityType_Code: [{required: true}],
            Modality_Code: [{required: true}],
            procedureNameList: [{required: true}]
          },
          floatImageSrc: require("@/assets/svg/dapeng_main_cloud_pacs_all_fuchuang.svg"),
          isPaWindowShow:false,
          painfoForm: {
            PatientHeight: '',
            PatientWeight: '',
            Nationnality: '',
            Race: '',
            Married: '',
            IdCardNo: '',
            Passport: '',
            DriveLicense: '',
            CompanyAddress: '',
            HomeAddress: '',
            HomeTown: '',
            ProcedureOfficeCode: '',
            ProcedureRoom: '',
            ProcedureDoctorCode: '',
            PatientArea: '',
            ClinicalSymptom: '',
            MedicalHisText: '',
            ClinicalDiagnosis: '',
            ProcedureRequirement: ''
          }
      }
  },
  methods: {
    handleCkChange (v) {
      this.isPrDataActive = !v
      if (v) {
        this.prForm.ScheduledDateTime = Date.now()
      } else {
        this.prForm.ScheduledDateTime = ''
      }
    },
    showPaWindow () {
      this.isPaWindowShow = true
    },
    hiddenPaWindow () {
      this.isPaWindowShow = false
    },
    ClinicalIdType2Change (value) {
      if (value.length > 0) {
        var tem = value[value.length-1]
        if (value.indexOf("急诊") < 0) {
          this.prForm.ClinicalIdType2 = [tem]
        } else if (tem !== "急诊") {
          this.prForm.ClinicalIdType2 = [tem,"急诊"]
        }
        if (tem === "门诊") {
          this.prForm.ClinicalIdType = "O"
        } else if (tem === "住院") {
          this.prForm.ClinicalIdType = "I"
        } else if (tem === "体检") {
          this.prForm.ClinicalIdType = "E"
        } else if (tem === "急诊" && value.length === 1) {
          this.prForm.ClinicalIdType = ''
        }
      } else {
        this.prForm.ClinicalIdType = ''
      }
    },
    showAndSelectCheckItems(){
      this.$emit("showAndSelectCheckItemsP")
    }
  }
}
</script>
<style scoped>
.FillH {
  height: 100%;
}
.select {
  width: 100%
}
.H110 {
 height: 110px
}
.H110 >>> .el-textarea__inner{
  height: 100%;
}
.mbt {
  margin-bottom: 20px
}
.half {
  width: 50%
}
.half2 {
  width: calc(50% - 5px);
  margin-left: 5px
}
.ck1 {
    position: absolute;
    display: flex;
    top: 20px;
    margin-left: 20px;
}
.ck2 {
    position: absolute;
    top: -5px;
    right: 20%;
}
.prRight {
  padding: 0 2%
}
.col1_2 {
  width: 68%;
  margin:10px 0
}
.col1_3 {
  width: 31%;
  margin:10px 0
}
.col31 {
  width: 100px
}
.col32 {
  width: calc(100% - 105px);
  margin-left: 5px
}
.col35 {
  width: calc(100% - 45px);
}
.MLR {
  margin: 10px 3%
}
.el-form-item {
  margin:0
}
.el-form-item >>> .el-form-item__label {
  line-height: 30px !important
}
.el-checkbox {
    height: 40px;
    line-height: 40px;
    margin: 10px 100px 10px 0;
}
.btn11 {
  width:calc(100% - 45px)
}
.btn40 {
    border: 1px solid #D1D8DE;
    border-radius: 2px;
    width: 40px;
    height: 40px;
    background-color: transparent;
    margin-left: 5px;
    text-align: center;
    padding: 0;
    line-height: 40px;
    position: absolute
}
.btn41 {
  right: 0;
  border: 0
}
.cliType {
  width: 100px;
  padding: 0
}
.btn43 {
  width: calc(100% - 105px);
}
.btn44 {
  position:absolute;
  bottom: -70px
}
.paFloat {
  position: absolute;
  top: 6px;
  right: 5px;
  cursor: pointer;
}
.paWindow {
    position: absolute;
    z-index: 2000;
    box-shadow: 0 0 12px 0 rgba(167, 168, 204, 0.5);
    width: 670px;
    top: 6px;
    overflow: hidden;
    right: 5px;
    background: rgb(105,124,139);
    border-radius: 2px;
}
.hidePrFloatingwindowBtn {
    width: 28px;
    height: 28px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}
.windowContent {
  max-height: 524px;
  overflow: auto;
  background: #FFFFFF;
  border: none;
  border-radius: 0 28px 0 0;
}
.col_32 {
  width: 29.3%;
  margin: 10px 2%;
  min-height: 40px;
  position: relative;
  float: left;
}
.h4 {
    color: #354552;
    font-size: 14px;
    font-weight: normal;
    box-shadow: inset 0 -1px 0 0 #D1D8DE;
    border-bottom: none;
    padding: 10px 0 0 0;
    margin: 0 20px;
    margin-bottom: 10px;
}
</style>
