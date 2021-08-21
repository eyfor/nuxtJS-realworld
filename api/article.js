import { request } from '@/plugins/request'

/** api - 文章列表 (tag: 标签, author: 作者, favorited: 收藏) */
export const getArticles = params => request({
    method: 'GET',
    url: '/api/articles',
    params
})

/** api - 获取关注用户列表 */
export const getFeedArticles = params => request({
    method: 'GET',
    url: '/api/articles/feed',
    params
})

/** api - 添加点赞 */
export const addFavorite = slug => request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
})

/** api - 取消点赞 */
export const deleteFavorite = slug => request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
})

/** api - 文章详情 */
export const getArticle = slug => request({
    method: 'GET',
    url: `/api/articles/${slug}`
})

/** api - 获取文章评论 */
export const getComments = slug => request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
})

// ---------------------
/** api - 创建文章 */
export const addArticles = data => request({
    method: 'POST',
    url: '/api/articles',
    data
})

/** api - 更新文章 */
export const editArticles = data => request({
    method: 'PUT',
    url: `/api/articles/${data.slug}`,
    data
})

/** api - 删除文章 */
export const delArticles = slug => request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
})

/** api - 为文章添加评论 */
export const addComment = (slug,data) => request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
})

/** api - 删除评论 */
export const delComment = (slug,id) => request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
})

/** api - 收藏文章 */
export const favoriteArticle = slug => request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
})

/** api - 不喜欢文章 */
export const unLikeArticle = (slug) => request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
})