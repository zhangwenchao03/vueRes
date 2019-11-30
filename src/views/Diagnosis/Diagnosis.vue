<template>
    <div class="FlexRow Fill">
        <el-row type="Flex" class="FlexCol Fill">
            <el-col v-if="showQuickSearch" id="quickSearch" class="FlexRow shadow-r hFill">
                <el-row class="h70 shadow-b">
                    <p id="quickSearchTitle">快捷检索</p>
                </el-row>
                <el-row class="FlexRow Fill">
                    <el-form ref="quickSearchform" :model="form" class="FlexRow Fill spacing">
                        <component 
                            v-for="(item, index) in settings.quickSearch" v-bind:key="index"                           
                            :is="item.type" 
                            :name="item.name"
                            :title="item.label"
                            :rules="item.rules"
                            :defaultValue="item.defaultValue"
                            :placeholder="item.placeholder"
                            :options="patientTypes"
                            @onChange="reveice">
                        </component>
                    </el-form>
                    <el-form id="submitQuickSearch" ref="form" class="FlexCol shadow-t">
                        <el-form-item id="quickSearchBtns" class="FlexCol">
                            <el-button type="primary" @click="submitForm('quickSearchform')" class="btn primary">查询</el-button>
                            <el-button @click="resetForm('quickSearchform')" class="btn secondary">清空</el-button>
                        </el-form-item>                        
                    </el-form>
                </el-row>
            </el-col>
            <el-col id="patientAdmin" class="FlexRow Fill hFill">
                <el-row :span="24" class="FlexCol h70 shadow-b">
                    <el-col id="quickOperationBarContainer" class="FlexCol Fill">
                        <ul id="quickOperationBar" class="FlexCol wFill">
                            <ul id="availableIcons" class="FlexCol Fill" :class=" this.fitWidth ? 'fit' : ''">
                                <li v-for="(item, index) in iconOperations" v-bind:key="index" class="iconOperation">
                                    <span :class="item.class"></span>
                                </li>                                
                            </ul>
                            <li v-if="showOperationDropdown">
                                <el-dropdown id="iconsDropdown">
                                    <el-button><span class="icon-dapeng_main_cloud_pa73"></span></el-button>
                                    <el-dropdown-menu>
                                        <el-dropdown-item v-for="(item, index) in dropdownOperations" v-bind:key="index">{{ item.title }}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>                                
                            </li>
                            <li><el-divider direction="vertical" ></el-divider></li>
                            <li><span ref='toggleBtn' class="icon-dapeng_main_cloud_pa50" :class="transform" :title="toggleBtnTitle" @click="toggleContent" ></span></li>
                        </ul>
                    </el-col>
                    <el-col class="fit FlexRow">
                        <el-radio-group id="searchTabs" class="radioGroup">
                            <el-radio-button v-for="(tab, index) in searchTabs" v-bind:key="index" v-if="index < 3" :label="tab.name" class="normal">
                                {{ tab.name }} {{ tab.count }}
                            </el-radio-button>
                            <el-dropdown v-else-if="index === 3" trigger="click">
                                <el-button><span class="icon-dapeng_main_cloud_pa53"></span></el-button>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="(tab, index) in searchTabs" v-bind:key="index" v-if="index >= 3"> 
                                        {{ tab.name }} {{ tab.count }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row :span="24" id="tableContainer" class="Fill FlexRow">
                    <Table :columns="columns" :data="tableData" :singleSelect="true" :multipleSelect="false" :loading="table.loading" @showContextmenu="handleContextmenu">
                    </Table>
                    <div id="paginationContainer" class="FlexCol">
                        <el-pagination
                        layout="total, sizes"
                        @size-change="handlePageSizeChange"
                        :page-sizes="[25, 50, 100, 200, 300, 400]"
                        :page-size="25"
                        :total="1000">
                        </el-pagination>
                        <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="25"
                        :total="1000"
                        @current-change="handleCurrentPageChange"
                        :current-page="table.currentPage">
                        </el-pagination>                        
                    </div>
                </el-row>
                <el-row :span="24" v-if="showAttachInfo" id="moreContent" class="FlexRow">
                    <el-row id="tabBoxPage" :class="{'noBoxShadow': noBoxShadow}" >
                        <el-radio-group v-model="activeInfoTab" class="radioGroup" @change="handleAdditionalInfoTabs">
                            <el-radio-button label="reportSummary">报告摘要</el-radio-button>
                            <el-radio-button label="matched">已匹配列表</el-radio-button>
                            <el-radio-button label="unmatched">未匹配列表</el-radio-button>
                            <el-radio-button label="serial">序列信息</el-radio-button>
                            <el-radio-button label="myReport">我的报告</el-radio-button>
                        </el-radio-group>
                    </el-row>
                    <el-row class="FlexRow Fill">
                        <component v-bind:is="activeInfoTab"></component>
                    </el-row>
                </el-row>
            </el-col>
        </el-row>

        <!-- 列表右键菜单 -->
        <div id="contextmenu" v-show="table.contextmenuVisible">
            <ul class="menu">
                <li class="menu__item">新增</li>
                <li class="menu__item">重命名</li>
                <li class="menu__item">删除</li>
            </ul>
        </div>

        <!-- 个性化配置 -->
        <PersonalizedConfig></PersonalizedConfig>

        <!-- 弹窗组件 -->
        <!-- <component :is="dialog.type" :visible="dialog.visible" @closeDialog="hideDialog"  ></component> -->
        <Collect v-if="dialog.type == 'collect'" :visible="dialog.visible" @closeDialog="hideDialog" ></Collect>
        <Followup v-else-if="dialog.type == 'followup'" :visible="dialog.visible" @closeDialog="hideDialog" ></Followup>
        
    </div>
</template>


<script>

import Input from '../../components/Form/Input.vue'
import Select from '../../components/Form/Select.vue'
import Datepicker from '../../components/Form/Datepicker.vue'
import Table from '../../components/Table/Table.vue'

import PersonalizedConfig from '../../components/PersonalizedConfig/PersonalizedConfig.vue'

import Collect from '../../components/Collect/Collect.vue'
import Followup from '../../components/Followup/Followup.vue'

import ReportSummary from './ReportSummary/ReportSummary.vue'
import Matched from './Matched/Matched.vue'
import { setTimeout } from 'timers';

export default {
    data(){
        return {
            resizeTimer: null, //用于标志页面宽度监听事件
            fitWidth:false, //是否自适应内容宽度已达到折叠按钮靠左显示
            moduleOperations: [], //当前模块下需要显示的操作按钮
            iconOperationCount: 0, //可显示图标操作按钮的数量
            showOperationDropdown: false, //是否显示操作下拉菜单
            dialog:{
                visible: true,
                type:"",
                title:""
            },
            showQuickSearch: true, //是否显示快捷检索
            showAttachInfo: true, //是否显示折叠按钮
            table:{
                loading: false,
                contextmenuVisible: false,
                currentPage: 3
            },
            //指定默认附属信息页
            activeInfoTab: "matched",
            addRules:{
                name:[{ required: true, message: '必填', trigger: 'blur'}]
            },
            settings:{
                quickSearch:[
                    // {type:"Input1", name: "patientName", label: "病人姓名", src:"", defaultValue: "默认病人姓名", rules: [{ required: true, message: '不能为空' }], placeholder: "请输入病人姓名"},
                    {type:"Input", name: "doctorName", label: "检查医生姓名", src:"", defaultValue: "默认检查医生姓名1", rules: [{ required: true, message: '不能为空' }], placeholder: "请输入病人姓名"},
                    {type:"Select", name: "", label: "病人类型", src:"", defaultValue: "inPatient", placeholder: "请选择病人类型"},
                    {type:"Datepicker", name: "", label: "检查日期（从）", src:"", defaultValue: "2019-10-01", placeholder: "请选择"},
                    {type:"Datepicker", name: "", label: "检查日期（到）", src:"", defaultValue: "", placeholder: "请选择"}
                ]
            },
            // PA列表搜索tabs
            searchTabs:[
                {name:"查询结果", count: 5},
                {name:"(当天)已检查", count: 15},
                {name:"(当天)草稿", count: 25},
                {name:"(当天)已预约", count: 35},
                {name:"(当天)已诊断", count: 45}
            ],
            patientTypes:[
                {name: "住院", value: "inPatient"},
                {name: "门诊", value: "OutPatient"},
                {name: "体检", value: "Exam"},
                {name: "急诊", value: "Enmergency"}
            ],
            // 这里还需要实现根据请求返回的数据动态创建form里面的属性
            form:{
                patientName: "",
                doctorName:"",
                type:"testType",
                patientType: "",
                test: "11",
                age:"",
                currentModel:"",
                value:""
            },
            allOperations:[
                {name: "toggleQuickSearch", id:"toggleQuickSearch", class:"icon-dapeng_main_cloud_pa33", shown: true, disabled: false, title: "收起检索框", method: "", module: "Papr, Diagnosis"},
                {name: "refreshPA", id:"refreshPA", class:"icon-dapeng_main_cloud_pa34", shown: true, disabled: false, title: "刷新列表", method: "", module: "Papr, Diagnosis"},
                {name: "editPatient", id:"editPatient", class:"icon-bingrenbianji", shown: true, disabled: false, title: "编辑病人", method:"", module: "Papr, Diagnosis"},
                {name: "cancelRequestedProcedure", id:"cancelRequestedProcedure", class:"icon-quxiaojiancha1", shown: true, disabled: false, title: "取消检查", method:"", module: "Papr"},
                {name: "patientArrival", id:"patientArrival", class:"icon-yuyuedadao", shown: true, disabled: false, title: "预约到达", method:"", module: "Papr"},
                {name: "editReport", id:"editReport", class:"icon-bianjibaogao", shown: true, disabled: false, title: "编辑报告", method:"", module: "Diagnosis"},
                {name: "jointView", id:"jointView", class:"icon-xiezhuyuepian", shown: true, disabled: false, title: "协助阅片", method:"", module: "Diagnosis"},
                {name: "sendFlow", id:"sendFlow", class:"icon-dapeng_main_cloud_pa80", shown: true, disabled: false, title: "发送", method:"", module: "Diagnosis"},
                {name: "cancelSend", id:"cancelSend", class:"icon-quxiaofasong", shown: true, disabled: false, title: "取消发送", method:"", module: "Diagnosis"},
                {name: "advancedSearch", id:"advancedSearch", class:"icon-dapeng_main_cloud_pa15", shown: true, disabled: false, title: "高级搜索", method:"", module: "Papr, Diagnosis"},
                {name: "applyConsultation", id:"applyConsultation", class:"icon-shenqinghuizhen", shown: true, disabled: false, title: "申请会诊", method:"", module: "Diagnosis"},
                {name: "batchPrint", id:"batchPrint", class:"icon-dapeng_main_cloud_pa26", shown: true, disabled: false, title: "批量打印", method:"", module: "Papr"},
                {name: "collect", id:"collect", class:"icon-shoucangjia", shown: true, disabled: false, title: "收藏夹", method:"", module: "Diagnosis"},
                {name: "followUp", id:"followUp", class:"icon-biaojisuifang", shown: true, disabled: false, title: "标记随访", method:"", module: "Papr, Diagnosis"},
                {name: "printBarcode", id:"printBarcode", class:"icon-tiaomadayin", shown: true, disabled: false, title: "条码打印", method:"", module: "Papr, Diagnosis"},
                {name: "delayExam", id:"delayExam", class:"icon-tuichijiancha1", shown: true, disabled: false, title: "推迟检查", method:"", module: "Papr"},
                {name: "elecMedicalRecord", id:"elecMedicalRecord", class:"icon-dianzibingli", shown: true, disabled: false, title: "查看电子病例", method:"", module: "Diagnosis"},
                {name: "exportExcel", id:"exportExcel", class:"icon-dapeng_main_cloud_pa10", shown: true, disabled: false, title: "导出excel", method:"", module: "Papr, Diagnosis"},
                {name: "intelligenceApp", id:"intelligenceApp", class:"icon-zhinengyuepian", shown: true, disabled: false, title: "智能阅片", method:"", module: "Papr, Diagnosis"}
            ],
            columns:[
                {prop: "state", label: "状态", width:200},
                {prop: "patientID", label: "病人ID", width:200},
                {prop: "applyDate", label: "检查日期", width:200},
                {prop: "patientName", label: "病人姓名", width:200},
                {prop: "remoteState", label: "远程状态", width:200},
                {prop: "applyNumber", label: "检查号", width:200},
                {prop: "patientType", label: "病人类型", width:200},
                {prop: "modality", label: "检查设备", width:200},
                {prop: "modalityType", label: "设备类型", width:200},
                {prop: "procedureName", label: "检查项目", width:200},
                {prop: "reportDoctor", label: "初诊医生", width:200}
            ],
            tableData: [
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'},
                { state: '', patientID: '124321432434', applyDate: '2016-05-03', patientName: '王小虎', remoteState: '下级到中心发送成功', applyNumber: '201912412546', patientType:'门诊', address: '上海市普陀区金沙江路 1518 弄'}
                ]
            }
    },
    computed:{
        toggleBtnTitle: function(){
            return this.showAttachInfo ? "收起附属信息" : "展开附属信息"
        },
        //根据默认模块判断tabs是否有底部阴影
        noBoxShadow: {
            get: function(){
                return this.activeInfoTab === "matched" || this.activeInfoTab === "unmatched" || this.activeInfoTab === "myReport" ? true : false
            },
            set: function(){}
        },
        transform: function(){
            return this.showAttachInfo ? "transform" : ""
        },
        iconOperations: {
            get: function(){
                return this.moduleOperations.slice(0, this.iconOperationCount)
            },
            set: function(newVal){
                console.log(newVal);
            }
        },
        dropdownOperations: {
            get: function(){
                if(true){
                    this.showOperationDropdown = true
                }else{
                    this.showOperationDropdown = false
                }
                return this.moduleOperations.slice(this.iconOperationCount, this.totalIcons)
            },
            set: function(newVal){
                
            }
        }
    },
    mounted(){
        //根据模块过滤功能按钮
        this.allOperations.forEach((item, index) => {
            if(item.module.indexOf("Diagnosis") === -1){
                item.shown = false
            }else{
                this.moduleOperations.push(item)
            }
        })
        //根据宽度计算可显示的图标数量
        this.iconOperationCount = Math.floor(document.getElementById("availableIcons").clientWidth/46)
        //根据可显示的图标数量判断是否显示下拉菜单
        this.showOperationDropdown = this.moduleOperations.length > this.iconOperationCount ? true : false;
        this.fitWidth = true
        //页面宽度变化后重置功能条
        const that = this
        window.onresize = () => {
            if(!this.resizeTimer){
                this.fitWidth = false
                this.resizeTimer = setTimeout(() => {
                    this.iconOperationCount = Math.floor(document.getElementById("availableIcons").clientWidth/46)
                    this.showOperationDropdown = this.moduleOperations.length > this.iconOperationCount ? true : false;
                    //重置定时器
                    this.resizeTimer = null;
                    this.fitWidth = true
                },400)
            }else{
                clearTimeout(this.resizeTimer)
            }
        }
    },
    methods:{
        toggleQuickSearch: function(){
            this.showQuickSearch = !this.showQuickSearch
        },
        refreshPA: function(){
            this.table.loading = true
            const that = this
            setTimeout(function(){
                that.$notify({
                    message: '列表重新加载成功',
                    type: 'success',
                    offset: 50
                });
                that.table.loading = false
            },3000)
        },
        showDialog: function(type){
            const that = this
            
            if(type == "collect"){
                this.dialog.type = "collect"
            }else if(type == "followup"){
                this.dialog.type = "followup"
            }
            that.dialog.visible = true
            
        },
        hideDialog: function(){
            this.dialog.type = ""
            this.dialog.visible = false
        },
        toggleContent: function(){
            this.showAttachInfo = !this.showAttachInfo
        },
        reveice: function (model){
            this.form[model.property] = model.value
        },
        submitForm(form){
            console.log(this.form);
            this.$refs[form].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //列表右键菜单
        handleContextmenu(show, row, column, event){
            if(show){
                console.log(row)
                console.log(event)
                this.table.contextmenuVisible = true
                //右键菜单渲染完成后再计算显示位置
                this.$nextTick(() => {
                    var containerHeight = document.getElementById("tableContainer").clientHeight;
                    var contextmenuWidth = document.getElementById("contextmenu").clientWidth;
                    var contextmenuHeight = document.getElementById("contextmenu").clientHeight;
                    
                    //190 为列表上方两个导航条70+70=140，50位底部分页栏的高度
                    var positionX = document.getElementsByTagName("body")[0].clientWidth - event.clientX > contextmenuWidth ? event.clientX : event.clientX - contextmenuWidth;
                    var positionY = (containerHeight - 50) - (event.clientY - 140)  > contextmenuHeight ? event.clientY : event.clientY - contextmenuHeight;
                    
                    document.getElementById("contextmenu").style.left = positionX + "px";
                    document.getElementById("contextmenu").style.top = positionY + "px";                
                })                
            }else{
                this.table.contextmenuVisible = false
            }

        },
        //列表每页行数变化后回调函数
        handlePageSizeChange(val){

        },
        //列表当前页变化后回调函数
        handleCurrentPageChange(val){

        },
        handleAdditionalInfoTabs(tab){
            //根据当前tab页切换阴影样式
            if(tab === "matched" || tab === "unmatched" || tab === "myReport"){
                this.noBoxShadow = true
            }else{
                this.noBoxShadow = false
            }
        }
    },
    components:{
        "Collect": Collect,
        "Followup": Followup,
        "Input": Input,
        "Select": Select,
        "Datepicker": Datepicker,
        "Table": Table,
        "PersonalizedConfig": PersonalizedConfig,
        "ReportSummary": ReportSummary,
        "Matched": Matched
    }
}
</script>

<style lang="scss" scoped>
    #quickSearch{
        width: 310px;
    }

    #patientAdmin{
        width: 0;
    }

    #quickSearchTitle{
        line-height: 70px;
        font-size: 1.5rem;
        margin-left: 2.5rem;
    }

    #submitQuickSearch{
        height: 76px;
    }

    #quickSearchBtns,
    #quickSearchBtns /deep/ div{
        display: flex;
        width: 100%;
        margin: auto 0;
        justify-content: space-evenly;
    }

    /* 标签组样式 */
    .radioGroup{
        margin: 20px 30px 20px 0;
    }

    /* PA列表tabs标签 */
    #searchTabs{
        white-space: nowrap;
        margin: auto 30px;
        /deep/ .normal .el-radio-button__inner{
            width: 120px;
            padding: 12px 0;
        }
        .el-dropdown {
            vertical-align: bottom;
            .el-button{
                width: 42px;
                height: 40px;
                padding: 0;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0; 
                border-left: 0;
            }
        }
    }
    

    /* 分割线 */
    .el-divider--vertical{
        font-size: 1.6em;
    }

    /* PA列表上方图标栏 */
    #quickOperationBarContainer{
        overflow: hidden;
        #quickOperationBar{
            list-style: none;
            ul{
                list-style: none;
                overflow: hidden;
            }
            li{
                height: 70px;
                line-height: 70px;
                cursor: pointer;
                padding: 0 10px;
                > span[class^='icon-']{
                    font-size: 26px;
                }
            }
        }
        #iconsDropdown{
            line-height: 17px;
            vertical-align: middle;
        }        
    }

    #iconsDropdown{
        .el-button{
            border: none;
            padding: 0;
        }
    }

    /* 展开收起附属信息 */
    .transform{
        display: block;
        transform: rotate(180deg);
    }

    #tableContainer{
        overflow: auto;
    }

    #moreContent{
        height: 434px;
        background-color: #f0f1f2;
    }
    #tabBoxPage{
        padding: 0 30px;
        box-shadow: inset 0 -1px 0 0 #D1D8DE;
    }
</style>


