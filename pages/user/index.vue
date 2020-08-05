<template>
    <v-layout justify-center>
        <v-container fluid>
            <v-row align="start" >
                <v-col cols="12" xs="12" sm="8" md="8" lg="8">
                    <h2 class="title">
                        Welcome {{ this.$store.state.auth.user.firstname }}
                    </h2>
                </v-col>
                <v-col cols="12" xs="12" sm="4" md="4" lg="4">
                    <div class="text-right">
                        <v-btn rounded color="success" to="user/invoices" dark><v-icon dark>mdi-plus</v-icon>Invoice</v-btn>
                        <v-btn rounded color="primary" dark><v-icon dark>mdi-plus</v-icon>Contact</v-btn>
                    </div>
                </v-col>
            </v-row>
            <check-verified v-if="this.$store.state.auth.user.email_verified_at == null"></check-verified>
            <v-row>
                <v-col cols="12" xs="12" sm="3" md="3" lg="3">
                   <v-card class="mx-auto" max-height="150">
                        <v-card-text>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="headline mb-4">Account Balance</div>
                                    <v-list-item-title class="headline mb-1">
                                        <!-- <countup :upval="numbersss"></countup> -->
                                        ${{ this.$store.state.business.account_balance }}</v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-avatar tile>
                                    <v-icon color="primary" size="50">mdi-star</v-icon>
                                </v-list-item-avatar>
                            </v-list-item>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" xs="12" sm="3" md="3" lg="3">
                    <v-card class="mx-auto" max-height="150">
                        <v-card-text>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="headline mb-4">Total Invoices</div>
                                    <v-list-item-title class="headline mb-1">$0</v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-avatar tile>
                                    <v-icon color="primary" size="50">mdi-star</v-icon>
                                </v-list-item-avatar>
                            </v-list-item>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" xs="12" sm="3" md="3" lg="3">
                    <v-card class="mx-auto" max-height="150">
                        <v-card-text>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="headline mb-4">Total Funds Recieved</div>
                                    <v-list-item-title class="headline mb-1">$0</v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-avatar tile>
                                    <v-icon color="primary" size="50">mdi-star</v-icon>
                                </v-list-item-avatar>
                            </v-list-item>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" xs="12" sm="3" md="3" lg="3">
                    <v-card class="mx-auto" max-height="150">
                        <v-card-text>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="headline mb-4">Total Withdrawals</div>
                                    <v-list-item-title class="headline mb-1">$0</v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-avatar tile>
                                    <v-icon color="primary" size="50">mdi-star</v-icon>
                                </v-list-item-avatar>
                            </v-list-item>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" xs="12" sm="6" md="6" lg="6">
                    <invoices-table dname="Invoices"></invoices-table>
                </v-col>
                <v-col cols="12" xs="12" sm="6" md="6" lg="6">
                    <invoices-table dname="Withdrawals"></invoices-table>
                </v-col>
            </v-row>
        </v-container>
    </v-layout>
</template>
<script>
import CheckVerified from '~/components/user/CheckVerified.vue'
import InvoicesTable from '~/components/user/InvoicesTable.vue'
import Countup from '~/components/user/Countup.vue'
export default {
    middleware: 'auth',
    layout: 'user',
    loading: {
        color: 'blue',
    },
    data(){
        return {
            loading: false,
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
                store.commit('SET_CONTACT', result.contacts)
            }
        })
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
    },
    components: {
        CheckVerified , InvoicesTable , Countup
    },computed: {
        numbersss() {
        //   return Number(this.$store.state.business.account_balance)
        return 200000;
        }
    }
}
</script>