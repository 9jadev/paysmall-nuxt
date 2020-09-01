<template>
    <v-layout justify-center>
        <v-container fluid>
            <v-row>
                <v-col class="mb-5 mt-5">
                    <h2 class="text-center"> Edit Invoice </h2>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" v-show="this.datagotten.activate == 0">
                    <div class="text-right" >
                        <v-text-field :label="moneyformat(this.formData.amount)" v-model.trim="formData.amount" :error-messages="amountErrors"  required @input="$v.formData.amount.$touch()" @blur="$v.formData.amount.$touch()" color="success" :loading="loading" placeholder="Amount (₦)" type="number"></v-text-field>
                    </div>
                    <div class="text-right" >
                        <h3  v-html="moneyformat(this.formData.amount)"></h3>
                    </div>
                </v-col> 
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" v-show="this.datagotten.activate != 0">
                    <div class="text-center" >
                        <h1 v-html="moneyformat(this.formData.amount)"></h1>
                    </div>
                </v-col> 

                <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                    <div class="text-right">
                        <p>
                            Threshold percentage <span style="color: black;">({{ this.percentage }}%)</span><br>
                            <small style="color: black;" v-html="moneyformat(this.formData.threshold)"></small>
                        </p>
                    </div>    
                    <v-slider v-model="min" min="0" :error-messages="thresholdErrors" required @input="$v.formData.threshold.$touch()" @blur="$v.formData.threshold.$touch()" :loading="loading" v-model.trim="percentage" max="100" ></v-slider>
                </v-col>     
                <v-col cols="12" xs="12" sm="12" md="12"  v-show="this.datagotten.activate == 1" lg="12">
                    <p class="subtitle-2 text-center" style="margin-bottom: 0px;">{{ this.contact.name }}, {{ this.contact.email }} , {{ this.contact.phone }} </p>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="12"  v-show="this.datagotten.activate == 0" lg="12">
                    <p class="subtitle-2" style="margin-bottom: 0px;">{{ this.contact.name }}, {{ this.contact.email }} , {{ this.contact.phone }} </p>
                    <v-select :items="items" item-text="name" :error-messages="contact_nameErrors" required @input="$v.formData.contact_name.$touch()" @blur="$v.formData.contact_name.$touch()" v-model="contact" item-value="id" :loading="loading" return-object clearable label="Contacts"></v-select>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                    <v-textarea clearable :error-messages="aboutErrors" required @input="$v.formData.about.$touch()" @blur="$v.formData.about.$touch()" v-model.trim="formData.about" :counter="3000" :loading="loading" label="Description of invoice"></v-textarea>
                </v-col>
                <v-col class="text-center">
                    <v-btn color="success" class="mr-4" :disabled="loading" :loading="loading" @click="submit" large> Edit Invoice </v-btn>
                    <v-btn color="info" to="/user/contact"  class="mr-4" large> Add Contact </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-layout>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength , numeric } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
export default {
    middleware: 'auth',
    layout: 'user',
    loading: {
        color: 'blue',
    },
    mixins: [validationMixin], 
    validations: {
        formData: {
            amount: {
                required,
                numeric
            },
            threshold: {
                required,
                numeric
            },
            contact_name: {
                required
            },
            about: {
                required,
                maxLength: maxLength(3000)
            }
        }
    }, 
    data(){
        return {
            min: true,
            items: [],
            id: '',
            formData: {
                amount: '',
                business_id: this.$store.state.business.id,
                contact_name: '',
                contact_email: '',
                contact_phone: '',
                threshold: '',
                type: 'one',
                about: '',
                paid: 0
            },
            datagotten: 0,
            loading: false,
            percentage: 0,
            watchedthreshold: 0,
            contact: {}
        }
    },
    watch : {
        percentage: function(val) {
            this.formData.threshold = this.formData.amount * (val / 100) ? this.formData.amount * (val / 100) : 0 ;  
        },
        contact: function(val) {
            this.formData.contact_name = this.contact.name  
            this.formData.contact_phone = this.contact.phone 
            this.formData.contact_email = this.contact.email
        }
    },
    methods: {
        gotten(){
            this.$axios.setHeader('Accept', 'application/json'); 
            this.$axios.get(`/invoice/${this.id}`).then((res)=> {
                // console.log(res)
                this.datagotten = res.data.invoice;
                this.formData.amount = res.data.invoice.amount
                this.formData.about = res.data.invoice.about_invoice
                this.formData.threshold = res.data.invoice.threshold
                this.contact.name = res.data.invoice.contact_name
                this.contact.phone = res.data.invoice.contact_phone
                this.contact.email = res.data.invoice.contact_email
                this.formData.contact_name = res.data.invoice.contact_name
                this.formData.contact_email = res.data.invoice.contact_email
                this.formData.contact_phone = res.data.invoice.contact_phone
                this.percentage = (res.data.invoice.threshold / res.data.invoice.amount) * 100
            }).catch(( error ) => {
                console.log(error.response.data);
            }); 
        },
        contactsget(){
            this.$axios.setHeader('Accept', 'application/json'); 
            this.$axios.get('/contact').then((res)=> {
                this.items = res.data['All Contact'];
            }).catch(( error ) => {
                console.log(error.response.data);
            }); 
        },
        moneyformat(number){
            return  "₦" + new Intl.NumberFormat().format(number)
        },
        
        submit(){
            this.loading = true
            this.$v.$touch(); 
            if (this.$v.formData.amount.$invalid || this.$v.formData.threshold.$invalid || this.$v.formData.contact_name.$invalid || this.$v.formData.about.$invalid) {
                this.loading = false
                return
            }
            this.$axios.setHeader('Accept', 'application/json')  
            this.$axios.put(`/invoice/${this.id}`, this.formData).then((res)=> {
                console.log(res);
                // this.$store.dispatch('updateCon', res.data.contact);
                this.loading = false
                // this.close()
            }).catch(( error ) => {
                // console.log(error.response.data);
                this.loading = false
            }); 
            
        }
    },
    computed: {
        
        amountErrors(){
            const errors = []
            if (!this.$v.formData.amount.$dirty) return errors
            !this.$v.formData.amount.required && errors.push('Amount is required')
            !this.$v.formData.amount.numeric && errors.push('Amount should be numeric')
            return errors
        },
        thresholdErrors(){
            const errors = []
            if (!this.$v.formData.threshold.$dirty) return errors
            !this.$v.formData.threshold.required && errors.push('Threshold is required')
            !this.$v.formData.threshold.numeric && errors.push('Threshold should be numeric')
            return errors
        },
        contact_nameErrors() {
            const errors = []
            if (!this.$v.formData.contact_name.$dirty) return errors
            !this.$v.formData.contact_name.required && errors.push('Contact is required')
            return errors 
        },
        aboutErrors() {
            const errors = []
            if (!this.$v.formData.about.$dirty) return errors
            !this.$v.formData.about.required && errors.push('About invoice is required')
            !this.$v.formData.about.maxLength && errors.push('About invoice should be a maximum of 3000')
            return errors
        }
    },
    mounted (){
        this.gotten();
        this.contactsget();
    },
    created(){
        if (this.$route.params.id == undefined){
            this.$router.push('/user/invoices')
        }
        this.id = this.$route.params.id
        // console.log(this.id)
   }
}
</script>

<style scoped>

</style>