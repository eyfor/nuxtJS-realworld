import { request } from '@/plugins/request'

/** api - 登录 */
export const login = data => request({
    method: 'POST',
    url: '/api/users/login',
    data
})

/** api - 注册 */
export const register = data =>  request({
    method: 'POST',
    url: '/api/users',
    data
})

// -----------------------
/** api - 获取当前用户 */
export const getUser = () => request({
    method: 'GET',
    url: '/api/user'
})

/** api - 更新用户 */
export const editUser = (data) => request({
    method: 'PUT',
    url: '/api/user',
    data
})

/** api - 获取个人资料 */
export const getProfile = (username) => request({
    method: 'GET',
    url: `/api/profiles/${username}`
})

/** api - 关注用户 */
export const followProfile = (username) => request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
})

/** api - 取消关注用户 */
export const unFollowProfile = (username) => request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
})

