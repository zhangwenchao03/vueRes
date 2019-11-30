<template>
    <el-dialog
    title="标记随访"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    :fullscreen="true"
    width="30%"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
        <el-button class="btn primary" @click="handleClose">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
    </span>
    </el-dialog>
</template>

<script>
export default {
    props:[ 'visible' ],
    data(){
        return{
            dialogVisible: this.visible
        }
    },
    watch:{
        visible: function(newVal, oldVal){
            console.log(newVal)
            this.dialogVisible = newVal
        }
    },
    methods:{
        handleClose(){
            this.dialogVisible = false
            this.$emit("closeDialog")
        }
    }
}
</script>

<style scoped>

</style>


