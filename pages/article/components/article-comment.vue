<!-- 评论组件 -->
<template>
    <div>
        <form class="card comment-form" v-if="$store.state.user" @submit.prevent="onComment">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="comment"></textarea>
          </div>
          <div class="card-footer">
            <img :src="$store.state.user.image" class="comment-author-img" />
            <button class="btn btn-sm btn-primary">
             Post Comment
            </button>
          </div>
        </form>
        
        <div class="card" v-for="comment in comments" :key="comment.id">
          <div class="card-block">
            <p class="card-text">{{comment.body}}</p>
          </div>
          <div class="card-footer">
            <nuxt-link :to="{name: 'profile', params: {username: comment.author.username}}" class="comment-author">
              <img :src="comment.author.image" class="comment-author-img" />
            </nuxt-link>
            &nbsp;
            <nuxt-link :to="{name: 'profile', params: {username: comment.author.username}}" class="comment-author">{{ comment.author.username }}</nuxt-link>
            <span class="date-posted">{{comment.createAt | date('MMM DD, YYY')}}</span>
          </div>
        </div>

    </div>
</template>

<script>
import { getComments, addComment, delComment } from '@/api/article'

export default {
    name: 'ArticleComment',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            comments: [],
            comment: ''
        }
    },
    async mounted () {
        try {
            const { data: {comments} } = await getComments(this.article.slug)
            this.comments = comments
        } catch (error) {
            
        }
    },
    methods: {
      /** 发表评论 */
      async onComment () {
        const {data} = await addComment(this.article.slug, {comment: {body: this.comment}})
      }
    }
}
</script>