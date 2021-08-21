import { request } from '@/plugins/request'

/** api - 标签列表 */
export const getTags = params => request({
    method: 'GET',
    url: '/api/tags',
    params
})