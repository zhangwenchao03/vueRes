<template>
    <div id="matched" class="FlexRow Fill">
        <div class="controls FlexCol shadow-b">
            <div>
                <p>检查日期</p>
                <el-date-picker
                v-model="value"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <div>
                <p>病人ID</p>
                <el-input v-model="input1" placeholder="请输入内容"></el-input>
            </div>
            <div>
                <p>姓名</p>
                <el-input v-model="input2" placeholder="请输入内容"></el-input>
            </div>
            <div>
                <p>性别</p>
                <el-select v-model="select1" placeholder="请选择">
                </el-select>
            </div>
            <div>
                <p>设备类型</p>
                <el-select v-model="select2" placeholder="请选择">
                </el-select>
            </div>
            <div>
                <p>检查号</p>
                <el-select v-model="select3" placeholder="请选择">
                </el-select>
            </div>
        </div>
        <div class="FlexCol Fill">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
                                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
                                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
                                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
                                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>
        </div>
        <div class="FlexCol submit shadow-t">
            <el-button class="btn primary">查询</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            value:"",
            input1:"",
            input2:"",
            select1:"",
            select2:"",
            select3:"",
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
    .controls{
        justify-content: space-between;
        padding: 0 30px 20px 30px;
    }
    .controls p{
        font-size: 12px;
        line-height: 16px;
        color: #7b8994;
    }
    .submit {
        height: 76px;
        flex-direction: row-reverse;
    }
    .submit > button {
        margin: auto 30px;
    }

</style>


