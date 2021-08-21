<template>
    <div class="article-page">

  <div class="banner">
    <div class="container">

      <!-- 标题 -->
      <h1>{{ article.title }}</h1>

      <ArticleMeta :article="article" />

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body"></div>
    </div>

    <hr />

    <div class="article-actions">
      <ArticleMeta :article="article" />
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <!-- 评论 -->
        <ArticleComment :article="article" />

      </div>

    </div>

  </div>

</div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta.vue'
import ArticleComment from './components/article-comment.vue'

export default {
    name: 'articleIndex',
    components: {ArticleMeta, ArticleComment},
    head () {
      return {
        title: `${this.article.title} - RealWrold`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ]
      }
    },
    async asyncData ({params}) {
      // 获取文章内容
      const {data: {article}} = await getArticle(params.slug)
      // md 格式转化为 html文本
      const md = new MarkdownIt()
      article.body = md.render(article.body) 

      return {
        article: article || {}
      } 
    },
}
</script>