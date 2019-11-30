import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
    const hasToken = getToken()

    if(to.path == from.path) return;

    if(hasToken){
        // if(to.path == '/login'){
        //     next({ path: '/' })
        // }else{
        //     next()
        // }
        next()
    }else{
        if(whiteList.indexOf(to.path) !== -1){
            next()
        }else{
            next('/login')
        }
    }
})