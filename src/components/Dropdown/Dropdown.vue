<template>
    <el-dropdown 
        :class="[isActive ? 'active' : '']" 
        :trigger="trigger" 
        placement="top-start">
        <span v-if="text" class="el-dropdown-link" 
            @click="userNameClick"
            @blur="isActive = false">
            {{ name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 如果没有传入文本则显示图标 -->
        <span v-else
            class="el-dropdown-link icon"
            @click="userNameClick"
            @blur="isActive = false"
            :class="iconClass"
        ></span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in options" v-bind:key="index"
                :command="item.command" 
                @click.native="getItem(item)">
                {{ item.name }}
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    props: [
        'text', //下拉框文本
        'iconClass', //图标类名
        'trigger', //触发方式
        'placement', //下拉选项文职
        'options', //下拉选项值
        'className' //需要添加的类名
    ],
    data:function() {
        return {
            name: this.text,
            isActive: false,
            item: null
        }
    },
    methods:{
        userNameClick() {
            this.isActive = !this.isActive;
        },
        getItem(item){
            this.item = item
            this.$emit(item.command, this.item)
        }
    }
}
</script>

<style scoped>
    .active {
        background-color: #354552;
    }

    .icon{
        font-size: 20px;
    }
</style>

