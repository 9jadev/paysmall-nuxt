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
                        <v-btn rounded color="success" dark><v-icon dark>mdi-plus</v-icon>Create Invoice</v-btn>
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
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength , email } from 'vuelidate/lib/validators' 
import CheckVerified from '~/components/user/CheckVerified.vue'
import InvoiceList from '~/components/user/InvoiceList.vue'
export default {
    middleware: 'auth',
    layout: 'user',
    loading: {
        color: 'blue',
    },
    mixins: [validationMixin], 
    validations: {
        formData:{
            customer_name: {
                required
            },
            customer_email: {
                required,
                email
            }
        }
    },
    data(){
        return {
            dialog: false,
            valid: true,
            loading: false,
            formData: {
                customer_name: "",
                customer_email: "",
                customer_phone: "",
                business_id: this.$store.state.business.id,
            },
            movetobusiness: this.$store.state.business.id ? true : false,
            phone: {
                number: '',
                valid: false,
                country: '',
            },
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
    // async fetch({$axios, store, redirect }){
    //     // let business = this.$store.state.business.id;
    //     $axios.setHeader('Accept', 'application/json')
    //     let token = localStorage.getItem('auth._token.local')
    //     $axios.setHeader('Authorization', token)
    //     // console.log(token)
    //     await $axios.get('/businesses').then((res)=> {
    //     let result = res.data 
    //     if (result.status == false) {
    //            return redirect('/user/Createbusinesses')
    //         } else {
    //             // console.log(result.business);
    //             store.commit('SET_BUSINESS', result.business)
    //         }
    //     })
    // },
    methods: {
        submit(){
            this.$v.$touch();
            if (this.phone.valid && (!this.$v.formData.customer_name.$invalid && !this.$v.formData.customer_email.$invalid)) {
                console.log(this.formData);  
                this.loading = true
                this.$axios.setHeader('Accept', 'application/json')  
                this.$axios.post('/contact', {
                    email: this.formData.customer_email,
                    name: this.formData.customer_name,
                    phone: this.formData.customer_phone,
                    business_id: this.formData.business_id
                }).then((res)=> {
                    // console.log(res);
                    this.$store.dispatch('updateCon', res.data.contact);
                    this.loading = false
                    this.close()
                }).catch(( error ) => {
                    console.log(error.response.data);
                }); 
            }
            this.loading = false
        },
        close(){
            this.formData.customer_name = "";
            this.formData.customer_email = "";
            this.formData.customer_phone = "";
            this.phone.number = "";
            this.phone.valid = false;
            this.phone.country = "";
            this.dialog = false
        },
        onInput(formattedNumber, { number, valid, country }) {
            this.phone.number = number.international;
            this.phone.valid = valid;
            this.phone.country = country && country.name;
            if (valid == true) {
                this.disabled = false
            }
        }
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
    computed:{
        customer_nameErrors (){
            const errors = []
            if (!this.$v.formData.customer_name.$dirty) return errors
            !this.$v.formData.customer_name.required && errors.push(' Customer name is required')
            return errors
        },
        customer_emailErrors () {
            const errors = []
            if (!this.$v.formData.customer_email.$dirty) return errors
            !this.$v.formData.customer_email.email && errors.push('Must be valid e-mail')
            !this.$v.formData.customer_email.required && errors.push('E-mail is required')
            return errors
      }
    }
}
</script>
<style scoped>
.vue-tel-input{
    height: 58px;
    border-color: #9e9e9e;
}
</style>