const getters = {
    username: state => state.user.name,
    language: state => state.app.language,

    curRoute: state => state.page.pageInfo.curRoute,
    availableMoudles: state => state.page.availableMoudles,
    curResourceCode: state => state.page.curResourceCode,
    personalizedConfigVisible: state => state.page.personalizedConfigVisible
}

export default getters