import { setPageInfo, getPageInfo } from '@/utils/info'


const state = {
    pageInfo:{
        curRoute: getPageInfo('curRoute')
    },
    availableMoudles: '',
    curResourceCode: '',
    personalizedConfigVisible: false
}

const mutations = {
    SET_CURROUTE:(state, route) => {
        state.pageInfo.curRoute = route
    },
    SET_AVAILABLEMOUDLES:(state, moudles) => {
        state.availableMoudles = moudles
    },
    SET_CURRESOURCECODE:(state, resourceCode) => {
        state.curResourceCode = resourceCode
    },
    SET_PERSONLIZEDCONFIGVISIBLE:(state, visible) => {
        state.personalizedConfigVisible = visible
    }
}

const actions = {
    setCurRoute( {commit}, route ){
        commit("SET_CURROUTE", route)
        setPageInfo('curRoute', route)
    },
    setAvailableMoudles( {commit}, moudles ){
        commit("SET_AVAILABLEMOUDLES", moudles)
    },
    setPageResourceCode( {commit}, resourceCode ){
        commit("SET_CURRESOURCECODE", resourceCode)
    },
    setPersonalizedConfigVisible( {commit}, visible ){
        commit("SET_PERSONLIZEDCONFIGVISIBLE", visible)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}