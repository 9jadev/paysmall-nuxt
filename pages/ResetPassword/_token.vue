<template>
  <v-container class="pad wrap">
    <v-row cols="12">
        <v-col xs="12" sm="12" md="12" lg="12" xl="12" class="logo_header" @click="home"> 
            <v-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-avatar> 
        </v-col>
    </v-row>
     <v-row>
        <v-col xs="12" sm="12" md="12" lg="6" xl="6"> 
            <h4 class="display-1 font-weight-bold" style="color: rgb(2, 43, 105);"> Reset Password  </h4>
            <p class="font-weight-bold display-1 under_test"> Fill form get access </p>
        </v-col>
        <v-col xs="12" sm="12" md="12" lg="6" xl="6"> 
            <v-form>
                <v-card outlined>
                   <v-container>
                       <v-row class="padder">
                            <v-col cols="12" sm="12" xs="12"  v-if="errormess" >
                               <div class="errors">
                                    <p class="red--text text--lighten-1 mb-1" >{{ errormess }} </p>
                                </div>
                           </v-col>
                           <!-- <v-col cols="12" sm="12" xs="12"  v-if="errors" >
                               <div class="errors">
                                    <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.token">{{error}} </p>
                                </div>
                           </v-col> -->
                            <v-col cols="12" sm="12" xs="12">
                                <v-text-field label="Email" v-model="formData.email" :error-messages="emailErrors" required @input="$v.formData.email.$touch()" @blur="$v.formData.email.$touch()" color="success" :loading="loading" :disabled="loading" outlined clearable></v-text-field>
                                <!-- <div class="errors" v-if="errors">
                                    <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.email">{{error}} </p>
                                </div> -->
                            </v-col>
                            <v-col cols="12" sm="12" xs="12">
                                <v-text-field label="Password" v-model="formData.password" required :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" @input="$v.formData.password.$touch()" @blur="$v.formData.password.$touch()" hint="At least 8 characters" :error-messages="passwordErrors" @click:append="show1 = !show1" color="success" :loading="loading" :disabled="loading" outlined clearable></v-text-field>
                                <!-- <div class="errors" v-if="errors">
                                    <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.password">{{error}} </p>
                                </div> -->
                            </v-col>
                            <v-col cols="12" sm="12" xs="12">
                                <v-text-field label="Confirm Password" v-model="formData.password_confirmation" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" hint="same as password" @input="$v.formData.password_confirmation.$touch()" @blur="$v.formData.password_confirmation.$touch()" @click:append="show2 = !show2" :error-messages="password_confirmationErrors" color="success" :loading="loading" :disabled="loading" required outlined clearable></v-text-field>
                                <!-- <div class="errors" v-if="errors">
                                    <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.password_confirmation">{{error}} </p>
                                </div> -->
                            </v-col>
                            
                            <v-col cols="12" sm="12" xs="12">
                                <v-alert :value="alert" outlined type="success" text>
                                    Congratulation's {{ successmessage }} <v-btn class="ma-2" tile color="success" @click="login" dark > Login </v-btn>
                                </v-alert>
                                <v-card-actions>
                                    <span class="font-weight-font-weight-medium caption">Got an account? </span> &nbsp;
                                    <nuxt-link to="/Login" class="link font-weight-bold caption">Sign in</nuxt-link>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" :elevation="18" :loading="loading" @click="submit" large dark>Continue</v-btn>
                                </v-card-actions>
                            </v-col>
                       </v-row>
                       <v-snackbar v-model="phonesnackbar" :timeout="timeout" color="red"> Invalid phone  <v-btn color="black" text @click="phonesnackbar = false"> Close </v-btn></v-snackbar>

                       <v-snackbar v-model="snackbar" :timeout="timeout" color="red"> Clear errors above  <v-btn color="black" text @click="snackbar = false"> Close </v-btn></v-snackbar>

                       <v-snackbar v-model="errorsnackbar" color="red"> {{errormess}} <v-btn color="black" text @click="snackbar = false"> Close </v-btn></v-snackbar>
                   </v-container>
                </v-card>
            </v-form>
        </v-col>
     </v-row>
     <p style="hieght: 30px;"> </p>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email , sameAs } from 'vuelidate/lib/validators'

export default {
  middleware ({ store, redirect }) {
    // If the user is authenticated
    if (store.state.auth.loggedIn) {
      return redirect('/user')
    }
  },  
  mixins: [validationMixin],    
  layout: 'Join',
  data(){
    return{
      formData: {
          token: '',
          email: '',
          password: '',
          password_confirmation: ''
      },
      invalid: true,
      disabled: true,
      loading: false,
      show1: false,
      show2: false,
      datadisabled: false,
      phonesnackbar: false,
      timeout: 3000,
      snackbar: false,
      errorsnackbar: false,
      errors: '',
      errormess: '',
      alert: false,
      successmessage: ''
    }
  },
  validations: {
    formData: {
        password: {
            required,
            minLength: minLength(8)
        },
        password_confirmation: {
            required,
            minLength: minLength(8),
            sameAsPassword: sameAs('password')
        },
        email: {
            required,
            email
        }
    }
  },
  head(){
    return {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=Open+Sans:ital@1&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=Open+Sans:ital@1&display=swap' }
      ]
    }
  },
  methods: {
    home(){
    window.location.assign("/");
    },
    login(){
        window.location.assign("/login");
    },
    async submit(){
        this.$v.$touch();
        if (this.$v.formData.email.$invalid || this.$v.formData.password_confirmation.$invalid || this.$v.formData.password.$invalid) {
            this.snackbar = true
            this.loading = false
        } else {
                this.loading = true
                this.errormess = ''
                this.errorsnackbar = false 
                // // console.log(this.formData);
                this.$axios.setHeader('Accept', 'application/json')  
                await this.$axios.post('/password/reset', this.formData).then((res)=> {
                        console.log(res)
                        this.successmessage = res.data.message
                        this.alert = true
                        // this.$router.push("/login");
                    this.loading = false
                }).catch(( error )=> {
                    if (error.response.data) {
                       this.errors = error.response.data
                       this.errormess = error.response.data
                       this.errorsnackbar = true  
                       this.loading = false
                    }
                    if(error.response.data.error){
                      this.errormess = error.response.data.error
                      this.errorsnackbar = true
                      this.loading = false
                    }
                    
                });
        }
    }
  },
  computed: {
      passwordErrors() {
        const errors = []
        if (!this.$v.formData.password.$dirty) return errors
        !this.$v.formData.password.minLength && errors.push(`password must be at least 8 characters long`)
        !this.$v.formData.password.required && errors.push('password is required')
        return errors
      },
      password_confirmationErrors(){
        const errors = []
        if (!this.$v.formData.password_confirmation.$dirty) return errors   
        !this.$v.formData.password_confirmation.sameAsPassword && errors.push(`password confirmation should be same as password`)
        !this.$v.formData.password_confirmation.minLength && errors.push(`password confirmation name must be at least 8 characters long`)
        !this.$v.formData.password_confirmation.required && errors.push('password confirmation is required')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.formData.email.$dirty) return errors
        !this.$v.formData.email.email && errors.push('Must be valid e-mail')
        !this.$v.formData.email.required && errors.push('E-mail is required')
        return errors
      }

  },
  created(){
    if (this.$route.params.token == undefined){
        this.$router.push('/')
    }
    this.formData.token = this.$route.params.token
  }
}
</script>
<style scoped>
.pad{
    padding-top: 40px;
}
h4{
    line-height: 1.25;
    font-family: 'Bitter', serif !important;
}
.under_test{
    color: rgba(10,46,101,.3)!important;
}
.logo_header{
    margin-bottom: 50px;
}
.padder{
    padding: 30px;
}
.link{
 text-decoration: none;   
}
.space{
    margin-top: 28px;
}
</style>