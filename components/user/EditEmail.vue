<template>
    <v-row>
        <v-col cols="12">
            <v-chip class="ma-2" color="green" v-if="success" text-color="white">
                update on email successfully 
            </v-chip>
        </v-col>
        <v-col cols="12" style="color: red;">
            <v-chip class="ma-2" color="red"  v-if="errormess" text-color="white">
                {{errormess}}
            </v-chip>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
            <v-text-field label="Email" v-model.trim="formData.email" placeholder="email" color="success" :error-messages="emailErrors" required @input="$v.formData.email.$touch()" @blur="$v.formData.email.$touch()" :loading="loading" :success="success" :disabled="togglestate" outlined clearable></v-text-field>
            <div class="errors" v-if="errors">
                <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.email">{{error}} </p>
            </div>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
            <v-btn large class="ma-2" v-if="!togglestate" :loading="loading" @click="submit()" outlined color="indigo">submit</v-btn>
        </v-col>
    </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
    data(){
        return {
            formData: {
                email: this.$store.state.auth.user.email
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
            email: {
              required,
              email
            },
        }
    },
    computed: {
        emailErrors () {
        const errors = []
            if (!this.$v.formData.email.$dirty) return errors
            !this.$v.formData.email.email && errors.push('Must be valid e-mail')
            !this.$v.formData.email.required && errors.push('E-mail is required')
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
            if (this.$v.formData.email.$invalid) {
                this.loading = false
                return   
            }
               this.$axios.setHeader('Accept', 'application/json')  
                await this.$axios.post('/EditUserEmail', this.formData).then((res)=> {
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
    }
}
</script>
<style scoped>

</style>