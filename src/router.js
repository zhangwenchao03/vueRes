import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect: '/Login',
      name: 'Main'
    },
    {
      path:'/Login',
      name:'Login',
      component: () => import('./views/Login/Login.vue')
    },
    {
      path:'/MainFrame',
      component: () => import('./views/MainFrame/MainFrame.vue'),
      children:[
        {
          path:'',
          name:'MainPic',
          component: () => import('./views/MainPic/MainPic.vue')
        },
        {
          path:'Papr',
          name:'Papr',
          component: () => import('./views/Papr/Papr.vue')
        },
        {
          path:'Diagnosis',
          component: () => import('./views/Diagnosis/Diagnosis.vue')
        },
        {
          path:'SystemConfig',
          name:'SystemConfig',
          component: () => import('./views/SystemConfig/SystemConfig.vue'),
          redirect: '/MainFrame/SystemConfig/baseConfig',
          children:[
            {
              path:'baseConfig',
              name:'baseConfig',
              component: () => import('./views/SystemConfig/ConfigItems/BaseConfig.vue'),
            },
            {
              path:'reportConfig',
              name:'reportConfig',
              component: () => import('./views/SystemConfig/ConfigItems/ReportConfig.vue'),
            },
            {
              path:'idGenerateConfig',
              name:'idGenerateConfig',
              component: () => import('./views/SystemConfig/ConfigItems/IdGenerateConfig.vue'),
            },
            {
              path:'risConfigCenter',
              name:'risConfigCenter',
              component: () => import('./views/SystemConfig/ConfigItems/RisConfigCenter.vue'),
            },
            {
              path:'sensitiveWords',
              name:'sensitiveWords',
              component: () => import('./views/SystemConfig/ConfigItems/SensitiveWords.vue'),
            },
            {
              path:'test',
              name:'test',
              component: () => import('./views/SystemConfig/ConfigItems/Test.vue'),
            }
            
          ]
        },
        {
          path: 'basicManager',
          name: 'basicManager',
          component: () => important()
        }
      ]
    }
  ]
})

// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }
