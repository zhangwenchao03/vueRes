<template>
    <el-dialog
    title="收藏夹管理"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    :before-close="handleClose">
    <div class="FlexCol">
        <div id="collectTreeContainer" class="FlexRow">
            <el-tree
            class="filter-tree Fill"
            lazy
            :props="defaultProps"
            :load="loadNode"
            show-checkbox
            @check-change="handleCheckChange"
            ref="tree">
            </el-tree>
            
            <div id="treeTools" class="FlexCol">
                <a id="addSiblingBtn" class="icon-dapeng_main_cloud_pa38" @click="addFolder(0)"></a>
                <a id="addChildBtn" class="icon-dapeng_main_cloud_pa39" @click="addFolder(1)"></a>
                <a id="deleteBtn" class="icon-dapeng_main_cloud_pa30" @click="deleteCollect"></a>
            </div>
        </div>
        <div id="collectInfoContainer" class="FlexRow">
            <div id="collectInfo" class="FlexRow">
                <label>病人ID: <span :title="collectInfo.patientID">{{ collectInfo.patientID }}</span> </label>
                <label>病人姓名: </label>
                <label>检查ID: </label>
                <label>设备类型: </label>
                <label>检查项目: </label>
                <label>检查所见: </label>
                <label>检查提示: </label>
            </div>
            <div id="collectForm">
                <el-form>
                    <el-form-item label="检查名称">
                        <el-input type="textarea" v-model="collectInfo.procedureName"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="collectInfo.description"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
    <span slot="footer" class="dialog-footer">
        <el-button class="btn primary" @click="handleClose">收藏</el-button>
    </span>
    </el-dialog>
</template>

<script>
export default {
    props:[ 'visible' ],
    data(){
        return{
            dialogVisible: this.visible,
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                        }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
                }, 
                {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
                }, 
                {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            count: 1,
            collectInfo:{
                patientID: "dasdas",
                procedureName: ""
            }
        }
    },
    watch:{
        visible: function(newVal, oldVal){
            this.dialogVisible = newVal
        }
    },
    methods:{
        handleClose(){
            this.dialogVisible = false
            this.$emit("closeDialog")
        },
        addFolder(){

        },
        deleteCollect(){

        },
        //树节点点击方法
        handleCheckChange(data, checked, indeterminate){
            console.log(data, checked, indeterminate);
        },
        handleNodeClick(data){
            console.log(data);
        },
        loadNode(node, resolve){
            console.log(node);
            if(node.level === 0){
                return resolve([{name:"region1"}, {name:"region2"}])
            }
            var hasChild
            if (node.data.name === 'region1'){
                hasChild = true
            } else if (node.data.name === 'region2'){
                hasChild = true
            } else {
                hasChild = Math.random() > 0.2
            }

            setTimeout(() => {
                var data;
                if(hasChild){
                    data = [
                        {name: 'zone' + this.count++},
                        {name: 'zone' + this.count++}
                    ]
                }else{
                    data = []
                }

                resolve(data)
            },500)
        }

    }
}
</script>

<style lang="scss" scoped>
    #collectTreeContainer{
        width: 250px;
        height: 480px;
        border: 1px solid #d1d8de;
        border-radius: 2px;
    }

    #treeTools{
        height: 50px;
        box-shadow: 0px 1px 0px 0px #d1d8de inset;
        padding: 0 10px;

        a{
            line-height: 50px;
            margin: 0 10px;
        }
    }

    #collectInfoContainer{
        width: 360px;
        margin-left: 30px;

        #collectInfo{
            label{
                font-size: 12px;
                line-height: 16px;
                color: #879cab;
                margin-bottom: 24px;

                span{
                    font-size: 14px;
                    color: #354552;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        #collectForm{

            .el-form-item{
                margin-bottom: 0;
            }

            /deep/ textarea.el-textarea__inner{
                height: 70px;
                border-radius: 2px;
                padding: 15px;
                font-size: 12px;
                text-align: justify;
                resize: none;
            }
        }
    }
</style>
