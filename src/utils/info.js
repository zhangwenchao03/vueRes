import Cookies from 'js-cookie'

// const TokenKey = 'pageInfo'

export function getPageInfo(key){
    return Cookies.get(key)
}

export function setPageInfo(key, value) {
    return Cookies.set(key, value)
}

export function removePageInfo(key) {
    return Cookies.remove(key)
}