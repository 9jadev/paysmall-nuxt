<template>
    <v-layout justify-center>
        <v-container fluid>
            <v-row>
                <v-col class="mb-5 mt-5">
                    <h2 class="text-center"> Create Invoice </h2>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                    <div class="text-right">
                        <v-text-field :label="moneyformat(this.formData.amount)" v-model.trim="formData.amount" :error-messages="amountErrors"  required @input="$v.formData.amount.$touch()" @blur="$v.formData.amount.$touch()" color="success" :loading="loading" placeholder="Amount (₦)" type="number"></v-text-field>
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
                <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                    <v-select :items="items" item-text="name" :error-messages="contact_nameErrors" required @input="$v.formData.contact_name.$touch()" @blur="$v.formData.contact_name.$touch()" v-model="contact" item-value="id" :loading="loading" return-object clearable label="Contacts"></v-select>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                    <v-textarea clearable :error-messages="aboutErrors" required @input="$v.formData.about.$touch()" @blur="$v.formData.about.$touch()" v-model.trim="formData.about" :counter="3000" :loading="loading" label="Description of invoice"></v-textarea>
                </v-col>
                <v-col class="text-center">
                    <v-btn color="success" class="mr-4" :disabled="loading" :loading="loading" @click="submit" large> Create Invoice </v-btn>
                    <v-btn color="info" to="contact"  class="mr-4" large> Add Contact </v-btn>
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
            this.$axios.get('/contact').then((res)=> {
                // console.log();
                this.items = res.data['All Contact'];
                // this.$store.dispatch('updateCon', res.data.contact);
                // this.loading = false
                // this.close()
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
            this.$axios.post('/invoice', this.formData).then((res)=> {
                console.log(res);
                // this.$store.dispatch('updateCon', res.data.contact);
                this.loading = false
                // this.close()
            }).catch(( error ) => {
                console.log(error.response.data);
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
    }
}
</script>

<style scoped>

</style>