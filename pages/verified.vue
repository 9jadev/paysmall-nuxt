<template>
    <div></div>
</template>
<script>
export default {
    created() {
        if (this.$store.state.auth.loggedIn) {
            this.$auth.fetchUser()
            window.location.assign('/user')
        }
        window.location.assign('/user')
    }
}
</script>