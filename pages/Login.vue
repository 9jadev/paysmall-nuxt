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
            <h4 class="display-1 font-weight-bold" style="color: rgb(2, 43, 105);"> Welcome back,</h4>
            <p class="font-weight-bold display-1 under_test"> Sign in to continue </p>
        </v-col>
        <v-col xs="12" sm="12" md="12" lg="6" xl="6"> 
            <v-form>
                <v-card outlined>
                   <v-container>
                       <v-row class="padder">
                           <!-- <h5>{{$auth.user.email}}</h5> -->
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
                            <v-snackbar v-model="snackbar" :timeout="timeout" color="red"> {{ snackbartext }}<v-btn color="black" text @click="snackbar = false"> Close </v-btn></v-snackbar>

                            <v-col cols="12" sm="12" xs="12">
                                <div class="ml-5"> 
                                    <nuxt-link to="/Resetlink" class="link font-weight-bold caption">Reset password</nuxt-link><br/>
                                </div>
                                <v-card-actions>
                                    <span class="font-weight-font-weight-medium caption">New User? </span> &nbsp;
                                    <nuxt-link to="/Register" class="link font-weight-bold caption">Create Account</nuxt-link><br/>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" :elevation="18" :loading="loading" @click="submit" large dark>Continue</v-btn>
                                </v-card-actions>
                            </v-col>
                       </v-row>
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
import { mapMutations } from 'vuex'
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
          email: '',
          password: ''
      },
      invalid: true,
      disabled: true,
      loading: false,
      show1: false,
      show2: false,
      datadisabled: false,
      errors: null,
      errormess: '',
      snackbar: false,
      timeout: 3000,
      snackbartext: ""
    }
  },
  validations: {
    formData: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
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
    async submit( {redirect} ){
        this.loading = true
        this.$v.$touch(); 
        if(this.$v.formData.email.$invalid || this.$v.formData.password.$invalid) {
            this.snackbartext = " Some error's occoured "
            this.timeout = 3000
            this.snackbar = true
            this.loading = false
        } else {
            try {
                let response = await this.$auth.loginWith('local', { data: this.formData })
               // console.log(response)
                this.loading = false
                window.location.assign("/user");
                // this.$router.push('/user')
                
            } catch (err) {
                // console.log(err);
                this.timeout = 6000
                this.snackbartext = " An error occured please check your credential and try again "
                this.snackbar = true
                this.loading = false
            }
        } 
    },
  },
  computed: {
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
      }
  },
  created(){
    //   if (this.$auth.loggedIn) {
    //       this.$router.push('/user')
    //   }
    console.log('am in');
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