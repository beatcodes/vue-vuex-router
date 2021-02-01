<template>
    <div class="page">
        home
        <div>
            <span>set use info</span>
            <div class="btn" @click="setUserInfo">设置用户信息store</div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {}
    },
    methods: {
        setUserInfo() {
            this.$store.commit('SET_USER_INFO', {
                name: 'mm',
                age: '19',
                sex: 'wm'
            })
            this.$router.push({
                path: '/detail'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.btn {
    height: 80px;
    background-color: red;
    margin: 10px 20px;
    text-align: center;
    line-height: 80px;
}
</style>
