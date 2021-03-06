import axios from 'axios'

export const request = axios.create({
    // baseURL: 'https://conduit.productionready.io',
    baseURL: 'http://realworld.api.fed.lagounews.com',
    timeout: 15000,
})

/** 插件机制获取上下文对象 */
export default ({store}) => {
    request.interceptors.request.use(function (config) {
        const {user} = store.state
        if(user && user.token){
            config.headers.Authorization = `Token ${user.token}`
        }
        return config
    }, function (error) {
        return Promise.reject(error)
    })
}
