<template>
    <el-form-item :label="title" :rules="rules">
        <el-select v-model="model.value" :placeholder="placeholder" :multiple="multiple" class="wFill" @change="onChange($event)">
            <el-option 
                v-for="option in options" 
                v-bind:key="option.value"
                :label="option.name"
                :value="option.value">
            </el-option>
        </el-select>         
    </el-form-item>

</template>


<script>
export default {
    props: [
        'title',
        'inputValue',
        'placeholder',
        'options',
        'multiple',
        'rules'
    ],
    data: function(){
        return {
            model:{
                name: this.title,
                value: this.inputValue
            }    
        }
    },
    methods:{
        onChange($event){
            console.log(this);
            this.$emit("onChange", this.model)
        }
    }
}
</script>
<style>
/* elementUI全局样式 */
.el-form-item__label {
    font-family: Roboto-Regular;
    font-size: 12px;
    line-height: 30px;
    color: #879cab;
}
</style>
