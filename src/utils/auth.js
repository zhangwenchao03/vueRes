import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken(){
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}


export function setUsername(name) {
    return Cookies.set('username', name)
}

export function getUsername(name) {
    return Cookies.get('username', name)
}