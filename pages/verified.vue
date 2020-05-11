<template>
    <!-- <no-ssr placeholder="loading..."> -->
        <div></div>
    <!-- </no-ssr>     -->
</template>
<script>
export default {
    created() {
        if (this.$store.state.auth.loggedIn) {
            this.$auth.fetchUser()
            this.$router.push('/user')
        }
        this.$router.push('/user')
    }
}
</script>