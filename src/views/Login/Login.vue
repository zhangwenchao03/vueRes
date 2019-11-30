<template>
    <div id="loginContainer">
        <el-image id="logo" fit="fill"  :src=src></el-image>
        <loginForm :loginBottom="true"></loginForm>
    </div>
</template>


<script>
import LoginForm from './LoginForm/LoginForm.vue'

export default {
    name: 'Login',
    data() {
        return {
            src: require('../../assets/svg/icon_logoshense_normal.svg')
        }
    },
    components: {
        "LoginForm": LoginForm
    }
}
</script>


<style scoped>
    #loginContainer{
        background-color: #f5f7fa;
        height: 100%;
        text-align: center;
    }

    .el-image{
        position: absolute;
        top: 20px;
        right: 30px;
    }

</style>