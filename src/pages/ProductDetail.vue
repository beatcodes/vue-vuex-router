<template>
  <div>
    <span>获取用户信息</span>
    <span>{{ userInfo }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: ''
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      let info = store.getters.getUserInfo()
      console.log('## info = ' + JSON.stringify(info))
      this.userInfo = info
    }
  }
}
</script>

<style></style>
