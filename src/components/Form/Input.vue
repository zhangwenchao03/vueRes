<template>
    <el-form-item :prop="name" :label="title" :rules="rules" >
        <el-input v-model="currentModel.value" :disabled="disabled==='true'?true:false" :placeholder="placeholder" @input="onChange($event)">
        </el-input>
    </el-form-item>  
</template>

<script>
export default {
    props: [
        'name',
        'title',
        'placeholder',
        'type',
        'defaultValue',
        'rules',
        'disabled'
    ],
    data: function(){
        return {
            currentModel: {
                property: this.name,
                value: this.defaultValue
            }
        }    
    },
    watch:{
        defaultValue:function(newVal, oldVal){
            this.currentModel.value = newVal;
            this.$emit("onChange", this.currentModel);
        },
    },
    methods:{
        onChange($event){
            // console.log($event);
            // this.$emit("update:type", this.model.type);
            this.$emit("onChange", this.currentModel);
        }
    }
}
</script>
