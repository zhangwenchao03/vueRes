<template>
    <div id="loginFormContainer">
        <el-form id="loginForm" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
            <el-form-item prop="username">
                <el-input tabindex="1" type="text" ref="username" name="username" v-model="loginForm.username" @keydown.native="keydown"></el-input>
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="bottom-end" manual>
                <el-form-item prop="password">
                    <el-input tabindex="2" :type="passwordType" ref="password" name="password" 
                    v-model="loginForm.password"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin"
                    ></el-input>
                </el-form-item>
            </el-tooltip>
            <el-form-item>
                <el-button tabindex="3" @click="handleLogin" :loading="loading" class="btn secondary">{{$t('Login.Submit')}}</el-button>
            </el-form-item>
        </el-form>

        <div v-if="showLoginBottom" id="loginBottom">
            {{$t('Login.ProductVersion')}} R002 ©{{$t('Login.ProductModel')}} uHIT-U+TeleMed | 
            <a>{{ $t('Login.UserLicence') }}</a>
        </div>
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import Cookies from 'js-cookie'


export default {
    props:[
        "defaultUsername",
        "defaultPassword",
        "unlockScreen",
        "loginBottom"
    ],
    data() {
        const validateUsername = (rule, value, callback) => {
            if(!value){
                callback(new Error(this.$i18n.t('Login.EnterUserName')))
            } else if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if(!value){
                callback(new Error(this.$i18n.t('Login.EnterPwd')))
            } else if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: this.defaultUsername,
                password: ''
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showLoginBottom: this.loginBottom

        }
    },
    mounted() {
        if(this.$route.query.lang)
        {
            this.$store.dispatch('app/setLanguage',this.$route.query.lang);
        }
        this.$i18n.locale = Cookies.get('language');
    },
    methods: {
        keydown(){
            this.$refs['loginForm'].validateField('username')
        },
        checkCapslock({ shiftKey, key } = {}) {
            if (key && key.length === 1) {
            if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                this.capsTooltip = true
            } else {
                this.capsTooltip = false
            }
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false
            }
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {    
                if (valid) {
                    this.loading = true
                    this.$store.dispatch("user/login", this.loginForm)                        
                    .then(() => {
                        this.loginForm.password = ''
                        if(this.unlockScreen){
                            this.$emit("unlock")
                        }else{
                            this.$store.dispatch('page/setCurRoute','MainPic');
                            this.$router.push({ path: "/MainFrame" })
                        }
                        this.loading = false
                    })
                    .catch((e) => {
                        this.loading = false
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style scoped>
    #loginFormContainer {
        width: 720px;
        height: 360px;
        background: white url(../../../assets/img/login_bg.png) repeat center center;
        background-size: cover;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%) !important;
        box-shadow: 0 0 50px -10px rgba(0, 0, 0, 0.5);
        display: inline-block;
        margin-left: auto;
        margin-right: auto;
        border-radius: 4px;
    }

    #loginForm{
        margin: 90px 80px 0 380px;
        text-align: left;
    }

    #loginForm >>> .el-form-item{
        margin-bottom: 0;
        outline: none;
    }

    #loginForm >>> input {
        margin-top: 30px;
        padding: 0;
        border: none;
        border-radius: 0;
        box-shadow: inset 0 -1px 0 0 #d1d8de;
    }

    #loginForm >>> input:focus{
        box-shadow: #4d5f6e 0 -2px 0 0 inset;
    }

    #loginForm button{
        margin-top: 24px;
    }

    #loginBottom{
        line-height: 20px;
        font-size: 12px;
        color: #7b8994;
        position: absolute;
        bottom: -35px;
        left: 0;
        right: 0;
    }

    #loginBottom>a{
        color: #85bf67;
    }
</style>


