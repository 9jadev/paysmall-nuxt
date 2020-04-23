<template>
<div>
    <h1>FUCK OFF</h1>
    <p v-if="this.$auth.loggedIn"> {{ this.$store.state.auth.user.email }}</p>
    <v-btn color="primary" :elevation="18" :loading="loading" @click="logout" large dark>Logout</v-btn>
</div>
</template>
<script>
export default {
    middleware: 'auth',
    loading: {
        color: 'blue',
    },
    data(){
        return {
            loading: false,
        }
    },
    methods: {
        async logout (){
            this.loading = true
            await this.$auth.logout()
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()

            setTimeout(() => this.$nuxt.$loading.finish(), 500000)
        })

        // let token = localStorage.getItem('auth._token.local')
        // this.$axios.setHeader('Authorization', token);
        // this.$axios.get('/user').then((res) =>{
            
        //     if (this.$auth.setUser(res.data.user)) {
        //         console.log(res.data.user)
        //     }
        // }).catch((err) => {
        //     console.log(err)
        // })  
    }
}
</script>