<!-- 个人资料 -->
<template>
    <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <!-- profile - 用户资料 -->
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{ profile.username }}</h4>
          <p>
            {{ profile.bio }}
          </p>
          <button class="btn btn-sm btn-outline-secondary action-btn" :class="{active: profile.following}" v-if="isLogin && !isLoginer" @click="()=>{onFollow(profile)}">
            <i class="ion-plus-round"></i>
            &nbsp;
            {{ profile.following?'unFollow':'Follow' }} {{ profile.username }}
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <!-- 文章 - tab -->
      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link class="nav-link" exact :class="{active: tab === 'my'}" :to="{path:`${profile.username}`,query:{tab: 'my'} }">My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" exact :class="{active: tab === 'favorited'}" :to="{path:`${profile.username}`,query:{tab: 'favorited'} }">Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>

        <!-- 文章 - 列表 -->
        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{name:'profile', params: {username: article.author.username}}"><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link :to="{name:'profile', params: {username: article.author.username}}" class="author">{{ article.author.username }}</nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active: article.favorited }" @click.prevent="()=>{onFavorite(article)}">
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link :to="{path:`/article/${article.slug}`}" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.body }}</p>
            <span>Read more...</span>
            <ul class="tag-list">
              <li class="tag-default tag-pill tag-outline" v-for="(tag, index) in article.tagList" :key="index">{{ tag }}</li>
            </ul>
          </nuxt-link>
        </div>


      </div>

    </div>
  </div>

</div>
</template>

<script>
import  { getArticles, deleteFavorite, addFavorite } from '@/api/article'
import { getProfile, followProfile, unFollowProfile } from '@/api/user'

export default {
    name: 'UserProfile',
    watchQuery: ['tab'],
    async asyncData ({params, store, query}) {
      // 用户资料
      const {data: {profile}} = await getProfile(params.username)
      // 登录用户
      const isLogin = store.state.user // 是否登录
      const isLoginer = isLogin && store.state.user.username === params.username // 是否本人
      let tab = query.tab || 'my'
      // 获取文章列表
      let articleParams = {}
      if(tab === 'favorited') articleParams.favorited = profile.username
      else articleParams.author = profile.username
      const {data: {articles}} = await getArticles(articleParams)

      return {
        profile, // 用户资料
        isLogin, // 是否已登录
        isLoginer, // 是否登录用户
        tab, // 文章 tab
        articles, // 文章列表
      }
    },
    methods: {
      /** 关注用户 */
      async onFollow (profile) {
        const {data} = await (profile.following ? unFollowProfile : followProfile )(profile.username)
      },
      /** 点赞 */
      async onFavorite (article) {
        if(!this.isLogin) {
          this.$router.push('/login')
          return
        } 
        article.favoriteDisabled = true
        if(article.onFavorited) {
          // 取消点赞
          await deleteFavorite(article.slug)
          article.favorited = false
          article.favoritesCount += -1
        } else {
          // 点赞
          await addFavorite(article.slug)
          article.favorited = true
          article.favoritesCount += 1
        }
        article.favoriteDisabled = false
      }
    }
}
</script>