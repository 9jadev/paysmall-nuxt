<template>
    <v-row>
        <v-col cols="12">
            <v-chip class="ma-2" color="green" v-if="success" text-color="white">
                update on firstname and lastname successfully 
            </v-chip>
        </v-col>
        <v-col cols="12" style="color: red;">
            <v-chip class="ma-2" color="red"  v-if="errormess" text-color="white">
                {{errormess}}
            </v-chip>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
            <v-text-field label="First name" v-model.trim="formData.firstname" placeholder="firstname" color="success" :error-messages="firstnameErrors" required @input="$v.formData.firstname.$touch()" @blur="$v.formData.firstname.$touch()" :loading="loading" :success="success" :disabled="togglestate" outlined clearable></v-text-field>
            <div class="errors" v-if="errors">
                <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.firstname">{{error}} </p>
            </div>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
            <v-text-field label="Last name" v-model.trim="formData.lastname" placeholder="lastname" :error-messages="lastnameErrors" required @input="$v.formData.lastname.$touch()" @blur="$v.formData.lastname.$touch()" color="success" :loading="loading" :success="success" :disabled="togglestate" outlined clearable></v-text-field>
            <div class="errors" v-if="errors">
                <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.lastname">{{error}} </p>
            </div>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
            <v-btn large class="ma-2" v-if="!togglestate" :loading="loading" @click="submit()" outlined color="indigo">submit</v-btn>
        </v-col>
    </v-row>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email , sameAs } from 'vuelidate/lib/validators'
export default {
    data(){
        return {
            formData: {
                firstname: this.$store.state.auth.user.firstname,
                lastname: this.$store.state.auth.user.lastname
            },
            loading: false,
            disabled: true,
            errors: null,
            success: false,
            first: false,
            last: false,
            errormess: ''
        }
    },
    mixins: [validationMixin],  
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
       }
    },
    props: ['togglestate'],
    methods: {
        async submit(){
            this.first = false
            this.last = false
            this.success = false
            this.errors = null
            this.errormess = ''

            this.loading = true
            this.$v.$touch();
            if (this.$v.formData.firstname.$invalid || this.$v.formData.lastname.$invalid) {
                this.loading = false
                return   
            }
               this.$axios.setHeader('Accept', 'application/json')  
                await this.$axios.post('/EditUserNames', this.formData).then((res)=> {
                    if (res.data.status == "success") {
                        this.$auth.fetchUser()
                        this.first = true
                        this.last = true
                        this.success = true
                    }
                    this.loading = false
                }).catch(( error ) => {
                    console.log(error.response.data);
                    this.errors = error.response.data
                    this.errormess = error.response.data.message
                    this.loading = false
                });
            this.loading = false
        }
    },
    async refresh (){
        await this.$auth.fetchUser()
    }
}
</script>
<style scoped>

</style>