const cookieparser = process.server ? require('cookieparser'): undefined

export const state = () => {
    return {
        user: null, // 登录用户
    }
}

export const mutations = {
    setUser (state, data) {
        state.user = data
    }
}

export const actions = {
    // 服务端自动调用 action : 用于初始化容器数据, 传递数据给客户端使用
    nuxtServerInit ({commit}, {req}) {
        let user = null
        if(req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try{
                user = JSON.parse(parsed.user)
            }catch(err) {}
        }
        commit('setUser', user)
    }
}