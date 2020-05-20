<template>
    <v-form>
        <v-card outlined>
            <v-container>
                <v-row align="center" justify="center">
                    <v-img
                    :src="this.$store.state.business.business_image"
                    aspect-ratio="1"
                    max-width="300"
                    max-height="300"
                    >
                    <template v-slot:placeholder>
                        <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                        >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                    </template>
                    </v-img>
                </v-row>
                <edit-business-name></edit-business-name>
                <v-row>
                    <v-col cols="12" sm="12" xs="12">
                        <v-select :items="['ol','or']" v-model.trim="formData.business_type" :error-messages="business_typeErrors" required @input="$v.formData.business_type.$touch()" @blur="$v.formData.business_type.$touch()" label="Business type" color="success" height="55" value="" :disabled="toggler" :loading="loading" dense clearable outlined></v-select>
                        <div class="errors" v-if="errors">
                            <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.business_type">{{error}} </p>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="12" xs="12">
                        <v-select :items="banks" item-text="Name" item-value="Code" v-model="bank" label="Business Bank" height="55" :error-messages="bank_nameErrors" required @input="$v.formData.bank_name.$touch()" @blur="$v.formData.bank_name.$touch()" color="success" :loading="loading" :disabled="toggler" dense return-object clearable outlined></v-select>
                        <div class="errors" v-if="errors">
                            <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.bank_name">{{error}} </p>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="12" xs="12">
                        <v-text-field label="Business Account Number" required color="success" v-model.trim="formData.account_number" :error-messages="account_numberErrors" @input="$v.formData.account_number.$touch()" :disabled="toggler" @blur="$v.formData.account_number.$touch()" :loading="loading" outlined clearable></v-text-field>
                        <div class="errors" v-if="erroraccount">
                            <p class="red--text text--lighten-1 mb-1">{{erroraccount}} </p>
                        </div>
                        <div class="errors" v-if="errors">
                            <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.account_number">{{error}} </p>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="12" xs="12">
                        <v-file-input v-model="image" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an logo" prepend-icon="mdi-camera" :loading="loading || loadingimg" @change="cloudnary()" label="Logo" :error-messages="business_imageErrors" :disabled="toggler" @input="$v.formData.business_image.$touch()" @blur="$v.formData.business_image.$touch()" outlined color="success" :show-size="1000">
                        <template v-slot:selection="{ index, text }">
                            <v-chip v-if="index < 2" color="success accent-4" dark label small>{{ text }} </v-chip>
                            <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                                +{{ files.length - 2 }} File(s)
                            </span>
                        </template>
                        </v-file-input>  
                        <div class="errors" v-if="errors">
                            <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.business_image">{{error}} </p>
                        </div>  
                    </v-col>
                    <v-col cols="12" sm="12" xs="12">
                        <v-textarea label="About Your Business" outlined dense v-model.trim="formData.business_about" :error-messages="business_aboutErrors" @input="$v.formData.business_about.$touch()" :counter="500" @blur="$v.formData.business_about.$touch()" :disabled="toggler" :loading="loading" color="success" required clearable></v-textarea>
                        <div class="errors" v-if="errors">
                            <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.business_about">{{error}} </p>
                        </div>
                    </v-col>
                    <v-snackbar v-model="snackbar" :timeout="timeout" color="red"> {{ snackbartext }}<v-btn color="black" text @click="snackbar = false"> Close </v-btn></v-snackbar>

                    <v-col cols="12" sm="12" xs="12">
                        <v-card-actions>
                            <v-btn color="primary" :elevation="6" v-if="!toggler" :disabled="loading"  :loading="loading || loadingimg" @click="submit" large dark>Submit</v-btn>

                            <v-btn color="green" :elevation="18" v-if="toggler" @click="toggler = false" large dark> EDIT </v-btn>
                            <v-btn color="green" :elevation="18" v-else @click="toggler = true" large dark> Read Only </v-btn>
                        </v-card-actions>
                    </v-col>
                    <v-dialog v-model="dialog" max-width="290">
                        <v-card>
                            <v-card-title class="headline"></v-card-title>
                            <v-card-text>
                                Dear {{ this.$store.state.auth.user.firstname }} {{ this.$store.state.auth.user.lastname }} , You have successfully updated your business.
                                </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-container>
        </v-card>
    </v-form>
</template>
<script>
import Axios from 'axios';
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength , numeric } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
import EditBusinessName from '~/components/user/EditBusinessName.vue'
export default {
    mixins: [validationMixin],  
    props: ['banks'],
    validations: {
        formData: {
            business_name: {
                required
            },
            business_type: {
                required
            },
            business_about: {
                required,
                maxLength: maxLength(500)
            },
            business_image: {
                required
            },
            account_number: {
                required,
                minLength: minLength(10),
            },
            bank_name: {
                required
            }
        }
    },
    data(){
        return {
            dialog: false,
            loading: false,
            loadingimg: false,
            bank: { Name: this.$store.state.business.bank_name, Code: this.$store.state.business.bank_code },
            timeout: 4000,
            toggler: true,
            image: ' ',
            formData: {
                id: this.$store.state.business.id,
                user_id: this.$store.state.auth.user.id,
                business_name: this.$store.state.business.business_name,
                business_type: this.$store.state.business.business_type,
                business_about: this.$store.state.business.business_about,
                business_image: this.$store.state.business.business_image,
                bank_name: this.$store.state.business.bank_name,
                bank_code: this.$store.state.business.bank_code,
                account_number: this.$store.state.business.account_number,
            },
            snackbartext: '',
            snackbar: false,
            erroraccount: '',
            errors: null,
            errormess: '',
            status: null   
        }
    },
    methods: {
        ...mapActions([
            'updateBusness',
        ]),
        async submit({store , params}){
            this.erroraccount = ''
            this.snackbartext = ''
            this.errors = null
            this.loading = true
            this.$v.$touch(); 
            if(this.$v.formData.business_name.$invalid || this.$v.formData.business_type.$invalid || this.$v.formData.business_about.$invalid || this.$v.formData.bank_name.$invalid || this.$v.formData.business_image.$invalid || this.$v.formData.account_number.$invalid) {
                this.snackbartext = " Some error's occoured "
                this.timeout = 3000
                this.snackbar = true
                this.loading = false
            } else {
                
                Axios.post(process.env.accountVerify, {
                    "recipientaccount": this.formData.account_number,
                    "destbankcode": this.formData.bank_code,
                    "PBFPubKey": process.env.PBFPubKey,
                    "currency":"NGN",
                    "country":"NG"
                }).then( res => {
                    if (res.data.data.data.accountnumber != null) {
                        this.commited(this.formData);
                        this.loading = false;
                    } else {
                        this.snackbartext = `Account number ${this.formData.account_number} does'nt exist for ${this.formData.bank_name}`
                        this.erroraccount = `Account number ${this.formData.account_number} does'nt exist for ${this.formData.bank_name}`
                        this.timeout = 3000
                        this.snackbar = true
                        this.loading = false
                    }  
                }).catch((err) => {
                    this.snackbartext = " Some error's occoured with account verification please retry."
                    this.erroraccount = " Some error's occoured with account verification please retry."
                    this.timeout = 3000
                    this.snackbar = true
                    this.loading = false
                });

                if (this.status != null) {
                    
                    // this.loading = false
                }
            }
        },  
        update(dar){
            console.log("fu")
        },
        cloudnary(){
            this.loadingimg = true
            const form = new FormData();
            form.append('file', this.image);
            form.append('upload_preset', process.env.upload_preset);
            form.append('api_key', process.env.cloudapi_key); 
            let response = Axios.post(process.env.cloudUrl, form).then( res => {
                // console.log(res.data.secure_url)
                // this.formData.business_image = res.data.secure_url 
                this.image = res.data.secure_url 
                this.loadingimg = false   
            }).catch((err) => {
                this.snackbartext = " Some error's occoured with image upload "
                this.timeout = 3000
                this.snackbar = true
                this.loadingimg = false
            });
        },
        home(){
            this.$router.push("/user")
        },
        toggling () {
            this.toggler = !this.toggler
        },
        commited(payload){
            this.$axios.setHeader('Accept', 'application/json') 
            this.$axios.put(`/businesses/${payload.id}`, payload).then((res)=> {
                console.log(res.data.business)
                this.$store.dispatch('updateBusness', res.data.business);
                this.dialog = true
            }).catch((error) => {
                console.log(error.response.data);
                this.errors = error.response.data
                this.errorsnackbar = true
                this.errormess = error.response.data.message
                this.loading = false
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()

            setTimeout(() => this.$nuxt.$loading.finish(), 500000)
        })
    },
    computed: {
      business_nameErrors () {
        const errors = []
        if (!this.$v.formData.business_name.$dirty) return errors
        !this.$v.formData.business_name.required && errors.push('Buiness name is required')
        return errors
      },
      business_typeErrors () {
        const errors = []
        if (!this.$v.formData.business_type.$dirty) return errors
        !this.$v.formData.business_type.required && errors.push('Buiness type is required.')
        return errors
      },
      bank_nameErrors(){
        const errors = []
        if (!this.$v.formData.bank_name.$dirty) return errors
        !this.$v.formData.bank_name.required && errors.push('Bank name is required.')
        return errors
      },
      account_numberErrors(){
        const errors = []
        if (!this.$v.formData.account_number.$dirty) return errors
        !this.$v.formData.account_number.minLength && errors.push(`Bank account number must be at least 10 characters.`)
        !this.$v.formData.account_number.required && errors.push('Bank account number is required.')
        return errors
      },
       business_aboutErrors(){
         const errors = [] 
        if (!this.$v.formData.business_about.$dirty) return errors
        !this.$v.formData.business_about.maxLength && errors.push(`This must be at most 12 characters long`)
        !this.$v.formData.business_about.required && errors.push('This is required.')
        return errors
      },
       business_imageErrors(){
        const errors = []
        if (!this.$v.formData.business_image.$dirty) return errors
        !this.$v.formData.business_image.required && errors.push(' Business logo is required. ')
        return errors
      },
    },
    watch: {
        bank: function (){
            this.formData.bank_name = this.bank.Name
            this.formData.bank_code = this.bank.Code
        },
        image: function (){
            this.formData.business_image = this.image
        }
    },
    components: {
        EditBusinessName
    }
}
</script>