<template>
    <el-form-item :prop="name" :label="title" :rules="rules"  v-on:listen='handData'>
        <el-input v-model="patientName" :placeholder="placeholder" @input="onChange($event)">
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
        'parentModel',
        'validateType',
        'rules'
    ],
    data: function(){
        return {
            // model:{
            //     property: "",
            //     type: this.parentModel
            // }
            patientName: 'name1111'
            // currentModel:{}
        }    
    },
    watch:{
        parentModel:function(newVal, oldVal){
            console.log(newVal);
            console.log(oldVal);
            console.log(this);
        }
    },
    created(){
        console.log(this.parentModel);
        console.log(this);
        // this.set(test:"test");
    },
    methods:{
        handData(){
            console.log("hand");
        },
        onChange($event){
            console.log($event);
            
            // this.$emit("update:type", this.model.type);
            this.$emit("onChange", this.patientName);
        }
    }
}
</script>
