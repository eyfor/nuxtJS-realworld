<!-- 用户设置 -->
<template>
    <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="onUpdate">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>

        <hr />

        <button class="btn btn-outline-danger" @click="onLoginOut">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import {getUser, editUser} from '@/api/user'
const Cookie = process.client ? require('js-cookie'):undefined

export default {
    name: 'SettingsIndex',
    middleware: ['authenticated'],
    data () {
      return {
        user: {
          image: null,
          username: null,
          bio: null,
          email: null,
          password: null
        }
      }
    },
    async mounted () {
      const {data: {user}} = await getUser()
      this.user.image = user.image
      this.user.username = user.username
      this.user.bio = user.bio
      this.user.email = user.email
    },
    methods: {
      /** 更新用户信息- test */
      async onUpdate () {
        let updateParams = {
          image: this.user.image,
          username: this.user.username,
          bio: this.user.bio,
          email: this.user.email
        }
        if(this.user.password) {
          updateParams.password = this.user.password
        }
        const {data:{user}} = await editUser({user: updateParams})
        if(this.user.password) {
          this.onLoginOut()
          return 
        }
        this.$store.commit('setUser', user)
        this.$router.push('/')
      },
      /** 退出登录 */
      async onLoginOut () {
        this.$store.commit('setUser', null)
        Cookie.remove('user')
        this.$router.push('/login')
      }
    }
}
</script>