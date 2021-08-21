<template>
    <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <!-- home - tab -->
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link class="nav-link" exact :class="{active: tab === 'your_feed'}" :to="{name: 'home', query: {tab: 'your_feed'}}">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" exact :class="{active: tab === 'global_feed'}" :to="{name: 'home', query: {tab: 'global_feed'}}">Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link class="nav-link" exact :class="{active: tab === 'tag'}" :to="{name: 'home', query: {tab: 'tag',tag: tag}}">#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <!-- home - article - list -->
        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}"><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link  :to="{name: 'profile', params: {username: article.author.username}}" class="author">{{article.author.username}}</nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active: article.favorited}" @click.prevent="()=>{onFavorite(article)}">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{name: 'article', params: {slug: article.slug}}" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>

        <!-- 分页 -->
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{active: item === page}" v-for="item in totalPage" :key="item">
              <nuxt-link class="page-link" :to="{name: 'home', query: {page: item, tag: tag, tab: tab}}">{{item}}</nuxt-link>
            </li>
          </ul>
        </nav>

      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link :to="{name: 'home', query: {tab: 'tag', tag: item}}" class="tag-pill tag-default" v-for="(item, index) in tags" :key="index">{{item}}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tag'

export default {
    name: 'HomeIndex',
    watchQuery: ['page','tag', 'tab'],
    async asyncData ({ query, store }) {
      const page = Number.parseInt(query.page || 1)
      const limit = 20
      const { tag,tab = 'global_feed' } = query
      const loadArticles = (store.state.user && tab === 'your_feed') ? getFeedArticles : getArticles
      let articles,articlesCount,tagData
      try{
        [{data: {articles, articlesCount}}, {data: {tags: tagData}}] = await Promise.all([loadArticles({limit: limit, offset: (page - 1) * limit, tag: tag}), getTags()])
        articles.forEach(article => article.favoriteDisabled = false) // 点赞按钮防抖
      } catch(e) {
        console.error(e)
      }

      return {
        articles: articles || [],
        articlesCount: articlesCount || 0,
        tags: (tagData || []).slice(0,20),
        limit,
        page,
        tag,
        tab
      }
    },
    computed: {
      ...mapState(['user']),
      totalPage () {
        return Math.ceil(this.articlesCount /  this.limit)
      }
    },
    methods: {
      /** 点赞 */
      async onFavorite (article) {
        if(!this.user) {
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