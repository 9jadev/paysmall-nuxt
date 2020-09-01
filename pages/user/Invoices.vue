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
                        <v-btn rounded color="success" to="CreateInvoice" dark><v-icon dark>mdi-plus</v-icon>Create Invoice</v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                    <invoice-list dname="Contact List"></invoice-list>
                </v-col>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
import CheckVerified from '~/components/user/CheckVerified.vue'
import InvoiceList from '~/components/user/InvoiceList.vue'
export default {
    middleware: 'auth',
    layout: 'user',
    loading: {
        color: 'blue',
    },
    data(){
        return {
            
            movetobusiness: this.$store.state.business.id ? true : false,
      
        }
    },
    watch:{
        phone(){
            this.phone.number = this.customer_phone;
        }
    },
    loadingIndicator: {
        name: 'circle',
        color: '#3B8070',
        background: 'white'
    },
    methods: {
        
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 500000)
        }) 
    },
    created(){
        console.log(this.$store.state.business.id);
        let bid = this.$store.state.business.id;
        if (bid == undefined) {
            this.$router.push('/user/Createbusinesses');
        }
    },
    components: {
        CheckVerified , InvoiceList 
    },
    
}
</script>
<style scoped>
.vue-tel-input{
    height: 58px;
    border-color: #9e9e9e;
}
</style>