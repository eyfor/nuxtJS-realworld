<!-- 文章编辑 -->
<template>
    <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" v-model="formData.title" placeholder="Article Title" required>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" v-model="formData.description" placeholder="What's this article about?" required>
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" rows="8" v-model="formData.body" placeholder="Write your article (in markdown)" required></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" v-model="formData.tags" placeholder="Enter tags" required><div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { addArticles } from '@/api/article'

export default {
    middlware: ['authenticated'],
    name: 'EditorIndex',
    data () {
      return {
        formData: {
          title: '', 
          description: '',
          body: '',
          tags: '',
        }
      }
    },
    methods: {
      async onSubmit () {
        const {data: {article}} = await addArticles({article: {title: this.formData.title, description: this.formData.description, body: this.formData.body, tagList: this.formData.tags.split(' ')}})
        this.$router.push(`/article/${article.slug}`)
      }
    }
}
</script>