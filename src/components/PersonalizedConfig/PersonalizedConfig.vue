<template>
    <el-drawer
        id="personalizedDrawer"
        title="个性化配置"
        :visible.sync="pageVisible"
        direction="ttb">
        <span>dasdasd</span>
    </el-drawer>
    <!-- <div></div> -->
</template>

<script>
export default {
    props:[
    ],
    data(){
        return {
        }
    },
    computed:{
        pageVisible:{
            get: function () {
                return this.$store.getters.personalizedConfigVisible
            },
            set: function (newValue){
                this.$store.state.page.personalizedConfigVisible = newValue
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #personalizedDrawer{
        margin-top: 70px;
        /deep/ .el-drawer{
            height:100% !important;
        }
    }
</style>


