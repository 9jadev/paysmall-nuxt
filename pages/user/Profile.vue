<template>
    <v-layout justify-center>
        <v-container fluid>
            <v-card>
                <v-tabs background-color="#42a5f5" v-model="tab" center-active dark>
                    <v-tab>User</v-tab>
                    <v-tab>Business</v-tab>
                    <v-tab-item>
                        <v-card flat>
                            <v-card-text>
                                <v-card outlined>
                                    <v-container>
                                        <edit-username :togglestate="edit"></edit-username>
                                        <edit-email :togglestate="edit"></edit-email>
                                        <edit-phone :togglestate="edit"></edit-phone>
                                        <v-divider inset></v-divider>
                                        <v-btn block color="primary" @click="edit = !edit" v-if="edit" dark>EDIT</v-btn>
                                        <v-btn block color="primary" @click="edit = !edit" v-else dark>SHOW</v-btn>
                                    </v-container>
                                </v-card>    
                            </v-card-text>    
                        </v-card>    
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <v-card-text>
                                <edit-buisness :banks="banks"></edit-buisness>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card>
        </v-container>
    </v-layout>
</template>
<script>
import CheckVerified from '~/components/user/CheckVerified.vue'
import EditUsername from '~/components/user/EditUsername.vue'
import EditEmail from '~/components/user/EditEmail.vue'
import EditPhone from '~/components/user/EditPhone.vue'
import EditBuisness from '~/components/user/EditBuisness.vue'
export default {
    middleware: 'auth',
    layout: 'user',
    loading: {
        color: 'blue',
    },
     async asyncData (context) {
        let res = await context.$axios.get(`https://api.ravepay.co/v2/banks/NG?public_key=${process.env.PBFPubKey}`)
        let banks = res.data.data.Banks
        return {
            banks
        }
    },
    async fetch({$axios, store, redirect }){
        $axios.setHeader('Accept', 'application/json')
        let token = localStorage.getItem('auth._token.local')
        $axios.setHeader('Authorization', token)
        // console.log(token)
        await $axios.get('/businesses').then((res)=> {
        let result = res.data 
        if (result.status == false) {
               return redirect('/user/Createbusinesses')
            } else {
                // console.log(result.business);
                store.commit('SET_BUSINESS', result.business)
            }
        })
    },
    data () {
        return {
            tab: null,
            edit: true
        }
    },
    toggle(){
        this.edit = !this.edit
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()

            setTimeout(() => this.$nuxt.$loading.finish(), 500000)
        }) 
    },
    components: {
        CheckVerified , EditUsername , EditEmail , EditPhone , EditBuisness 
    }
}
</script>
<style scoped>

</style>