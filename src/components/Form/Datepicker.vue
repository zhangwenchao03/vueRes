<template>
    <el-form-item :label="title">
        <el-date-picker 
            v-model="model.value" type="date" 
            :placeholder="placeholder"
            @change="onChange($event)" 
            class="wFill"></el-date-picker>
    </el-form-item>
</template>

<script>
export default {
    props:[
        'title',
        'placeholder',
        'inputValue'
    ],
    data(){
        return{
            model:{
                name: this.title,
                value: this.inputValue
            }
        }
    },
    methods:{
        onChange($event){
            console.log($event);
        }
    }
}
</script>

