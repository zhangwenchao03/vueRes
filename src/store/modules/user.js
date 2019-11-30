
import { getToken, setToken, removeToken, setUsername, getUsername } from '@/utils/auth'

const state = {
    token: getToken(),
    name: getUsername(),
    avatar: '',
    introduction: 'test',
    roles: []
}

const mutations = {
    SET_TOKEN:(state, token) => {
        state.token = token
    },
    SET_USERNAME: (state, name) => {
        state.name = name
    }
}

const actions = {
    login({ commit }, userInfo){
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            setTimeout(function(){
                if(password){
                    commit('SET_TOKEN', "dasdasdasdasdasdsad")
                    commit('SET_USERNAME', username)
                    setToken("dasdasdasdasdasdsad")
                    setUsername(username)
                    resolve();
                }else{
                    reject();
                }
                
            },60);
        })
    },
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}