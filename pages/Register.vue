<template>
  <v-container class="pad wrap">
    <v-row cols="12">
        <v-col xs="12" sm="12" md="12" lg="12" xl="12" class="logo_header" @click="home"> 
            <v-avatar>
                <img src="~/assets/MAIN.png" alt="John">
            </v-avatar> 
        </v-col>
    </v-row>
     <v-row>
        <v-col xs="12" sm="12" md="12" lg="6" xl="6"> 
            <h4 class="display-1 font-weight-bold" style="color: rgb(2, 43, 105);"> Create an account </h4>
            <p class="font-weight-bold display-1 under_test"> Let's get to know you </p>
        </v-col>
        <v-col xs="12" sm="12" md="12" lg="6" xl="6"> 
            <v-form>
                <v-card outlined>
                   <v-container>
                       <v-row class="padder">
                            <v-col cols="12" sm="6" xs="12">
                                <v-text-field label="First name" v-model.trim="formData.firstname" :error-messages="firstnameErrors" :counter="12" required @input="$v.formData.firstname.$touch()" @blur="$v.formData.firstname.$touch()" color="success" :loading="loading" :disabled="loading" outlined clearable></v-text-field>
                                <div class="errors" v-if="errors">
                                    <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.firstname">{{error}} </p>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6" xs="12">
                                <v-text-field label="Last name" v-model="formData.lastname" :error-messages="lastnameErrors" :counter="12" required @input="$v.formData.lastname.$touch()" @blur="$v.formData.lastname.$touch()" color="success" :loading="loading" :disabled="loading" outlined clearable></v-text-field>
                                <div class="errors" v-if="errors">
                                    <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.lastname">{{error}} </p>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="12" xs="12">
                                <!-- <v-text-field label="Phone" v-model="formData.phone" outlined clearable></v-text-field> -->
                                <no-ssr placeholder="loading...">
                                    <vue-tel-input v-model="formData.phone"  @input="onInput" :valid-characters-only="true" mode="international" required></vue-tel-input>
                                </no-ssr>    
                                <div class="errors" v-if="errors">
                                    <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.phone">{{error}} </p>
                                </div>
                                <div class="space" > 
                                    <p v-if="phone.country != '' ">
                                        <span class="subtitle-2">country: {{ phone.country }} </span> <br> 
                                        <span class="subtitle-2">validations:
                                            <span v-if="phone.valid == true ">
                                                <v-icon color="success">mdi-check-bold</v-icon> Correct
                                            </span>
                                            <span v-if="phone.valid == false ">
                                                <v-icon color="red">mdi-close-thick</v-icon> Incorrect
                                            </span>
                                        </span>
                                    </p>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="12" xs="12">
                                <v-text-field label="Email" v-model="formData.email" :error-messages="emailErrors" required @input="$v.formData.email.$touch()" @blur="$v.formData.email.$touch()" color="success" :loading="loading" :disabled="loading" outlined clearable></v-text-field>
                                <div class="errors" v-if="errors">
                                    <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.email">{{error}} </p>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="12" xs="12">
                                <v-text-field label="Password" v-model="formData.password" required :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" @input="$v.formData.password.$touch()" @blur="$v.formData.password.$touch()" hint="At least 8 characters" :error-messages="passwordErrors" @click:append="show1 = !show1" color="success" :loading="loading" :disabled="loading" outlined clearable></v-text-field>
                                <div class="errors" v-if="errors">
                                    <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.password">{{error}} </p>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="12" xs="12">
                                <v-text-field label="Confirm Password" v-model="formData.password_confirmation" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" hint="same as password" @input="$v.formData.password_confirmation.$touch()" @blur="$v.formData.password_confirmation.$touch()" @click:append="show2 = !show2" :error-messages="password_confirmationErrors" color="success" :loading="loading" :disabled="loading" required outlined clearable></v-text-field>
                                <div class="errors" v-if="errors">
                                    <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.password_confirmation">{{error}} </p>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="12" xs="12">
                                <v-checkbox
                                v-model="formData.checkbox"
                                :error-messages="checkboxErrors"
                                label="Do you agree?"
                                required
                                @change="$v.formData.checkbox.$touch()"
                                @blur="$v.formData.checkbox.$touch()"
                                ></v-checkbox>
                                <v-btn text small> <nuxt-link to="/terms">Read terms</nuxt-link>  </v-btn>
                            </v-col>
                            <v-col cols="12" sm="12" xs="12">
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
          firstname: '',
          lastname: '',
          phone: '',
          email: '',
          password: '',
          password_confirmation: '',
          checkbox: false,
      },
      phone: {
        number: '',
        valid: false,
        country: '',
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
      errors: null,
      errormess: '',
    }
  },
  validations: {
      formData: {
          firstname: {
              required,
              minLength: minLength(3),
              maxLength: maxLength(25)
          },
          lastname: {
              required,
              minLength: minLength(3),
              maxLength: maxLength(25)
          },
          email: {
              required,
              email
          },
          password: {
              required,
              minLength: minLength(8)
          },
          password_confirmation: {
              required,
              minLength: minLength(8),
              sameAsPassword: sameAs('password')
          },
          checkbox: {
            checked (val) {
            return val
            },
        },
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
    // window.location.assign("/");
       this.$router.push('/')
    },
    onInput(formattedNumber, { number, valid, country }) {
      this.phone.number = number.international;
      this.phone.valid = valid;
      this.phone.country = country && country.name;
      if (valid == true) {
        this.disabled = false
      }
    },
    async submit( {store} ){
        this.$v.$touch();
        this.phone.valid 
        if (this.$v.formData.firstname.$invalid || this.$v.formData.lastname.$invalid || this.$v.formData.email.$invalid || this.$v.formData.password_confirmation.$invalid || this.$v.formData.password.$invalid || this.$v.formData.checkbox.$invalid) {
            this.snackbar = true
            this.loading = false
        } else {
            if (this.phone.valid){
                this.loading = true
                // // console.log(this.formData);
                this.$axios.setHeader('Accept', 'application/json')  
                await this.$axios.post('/register', this.formData).then((res)=> {
                    if(res.data.status == true) {
                        this.$router.push('/login')
                    }                    
                    this.loading = false
                }).catch(( error ) => {
                    console.log(error);
                    this.errors = error.response.data
                    this.errorsnackbar = true
                    this.errormess = error.response.data.message
                    this.loading = false
                });
            }else{
                this.phonesnackbar = true
            }
        }
    }
  },
  computed: {
      firstnameErrors () {
        const errors = [] 
        if (!this.$v.formData.firstname.$dirty) return errors
        !this.$v.formData.firstname.maxLength && errors.push(`first name must be at most 25 characters long`)
        !this.$v.formData.firstname.minLength && errors.push(`first name must be at least 3 characters long`)
        !this.$v.formData.firstname.required && errors.push('first name is required.')
        return errors
      },
      lastnameErrors () {
        const errors = []
        if (!this.$v.formData.lastname.$dirty) return errors
        !this.$v.formData.lastname.maxLength && errors.push(`last name must be at most 25 characters long`)
        !this.$v.formData.lastname.minLength && errors.push(`last name must be at least 3 characters long`)
        !this.$v.formData.lastname.required && errors.push('last name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.formData.email.$dirty) return errors
        !this.$v.formData.email.email && errors.push('Must be valid e-mail')
        !this.$v.formData.email.required && errors.push('E-mail is required')
        return errors
      },
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
      checkboxErrors () {
        const errors = []
        if (!this.$v.formData.checkbox.$dirty) return errors
        !this.$v.formData.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      }
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
.vue-tel-input{
    height: 60px;
    border: 1px solid #9e9e9e;
}
.space{
    margin-top: 28px;
}
</style>