<template>
    <el-table 
        ref="table"
        stripe
        style="width: 100%"
        height="250"
        class="test"
        :highlight-current-row="ifSingleSelect"
        :data="data" 
        :colums="columns"
        :row-class-name="tableRowClassName"
        :loading="loading"
        v-loading="ifLoading"
        @current-change="handleCurrentChange"
        @row-contextmenu="handleContextmenu"
        @click.stop>
        <el-table-column v-for="(column, index) in computeColums" v-bind:key="index" 
            :fixed="column.fixed || false"
            :type="column.prop"
            :prop="column.prop" 
            :label="column.label"
            :width="column.width">
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props:{
        columns:null, //显示列
        data:null, //列表数据
        singleSelect:false, //单选
        multipleSelect:false, //多选
        loading: false
    },
    data: function(){
        return {
            ifLoading: this.loading,
            ifSingleSelect: this.singleSelect,
            ifMultipleSelect: this.multipleSelect,
            tableColumns: this.columns 
        }
    },
    computed:{
        computeColums: function(){
            if(this.ifMultipleSelect){
                this.tableColumns.unshift({prop: "selection", width:50, fixed:true})
            }
            return this.tableColumns
        }
    },
    watch:{
        loading: function(newVal, oldVal){
            console.log(newVal);
            this.ifLoading = newVal
        }
    },
    mounted(){
        document.body.addEventListener('click',()=>{
            this.$emit("showContextmenu", false)
        },false);
    },
    methods: {
        tableRowClassName({ row, rowIndex }){
            // console.log(row);
            if(rowIndex === 1){
                return 'warning-row'
            }
        },
        setCurrent(row) {
            
            this.$refs.table.setCurrentRow(row);
        },
        // 点击触发事件
        handleCurrentChange(val) {
            this.$emit("showContextmenu", false)
            this.currentRow = val;
        },
        handleContextmenu(row, column, event){
            console.log(this)
            
            this.setCurrent(row)
            this.$emit("showContextmenu", true, row, column, event)
        }
    }
}
</script>

<style scoped>

</style>


