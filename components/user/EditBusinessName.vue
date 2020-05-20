<template>
    <v-form>
        <!-- <v-card> -->
            <v-container>
                <v-row align="center" justify="center">
                    <h1 class="title">{{ this.$store.state.business.business_name }}</h1>
                </v-row>
                <v-row>
                    <v-col cols="8" sm="8" xs="8">
                        <v-text-field label="Business name" :error-messages="business_nameErrors"  required @input="$v.formData.business_name.$touch()" @blur="$v.formData.business_name.$touch()" :loading="loading" color="success" value="" v-model.trim="formData.business_name"  outlined clearable></v-text-field>
                        <div class="errors" v-if="errors">
                            <p class="red--text text--lighten-1 mb-1" :key="index" v-for="(error , index) in errors.errors.business_name">{{error}} </p>
                        </div>
                    </v-col>
                    <v-col cols="4" sm="4" xs="4">
                        <v-card-actions>
                            <v-btn color="primary" :elevation="6" :disabled="loading"  :loading="loading" @click="editname" large dark>Submit</v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>

                <v-dialog v-model="dialog" max-width="290">
                        <v-card>
                            <v-card-title class="headline"></v-card-title>
                            <v-card-text>
                                Dear {{ this.$store.state.auth.user.firstname }} {{ this.$store.state.auth.user.lastname }} , You have successfully updated your business name.
                                </v-card-text>
                        </v-card>
                </v-dialog>
            </v-container>
        <!-- </v-card> -->
    </v-form>
</template>
<script>
import Axios from 'axios';
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength , numeric } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
export default {
    mixins: [validationMixin],  
     validations: {
        formData: {
            business_name: {
                required,
                maxLength: maxLength(200)
            }
        }
    },
    data(){
        return {
            dialog: false,
            loading: false,
            formData: {
                id: this.$store.state.business.id,
                user_id: this.$store.state.auth.user.id,
                business_name: this.$store.state.business.business_name,
            },
            erroraccount: '',
            errors: null,
            errormess: '',
            status: null   
        }
    },
    methods: {
        editname({store , params}){
            this.erroraccount = ''
            this.snackbartext = ''
            this.errors = null
            this.loading = true
            this.$v.$touch(); 
            if(this.$v.formData.business_name.$invalid) {
                this.loading = false
            } else {
                this.$axios.setHeader('Accept', 'application/json') 
                this.$axios.put(`/busnesses/updateBusinesName/${this.formData.id}`, this.formData).then((res)=> {
                    console.log(res.data.business)
                    this.$store.dispatch('updateBusness', res.data.business);
                    this.dialog = true
                    this.loading = false
                }).catch((error) => {
                    console.log(error.response.data);
                    this.errors = error.response.data
                    this.errorsnackbar = true
                    this.errormess = error.response.data.message
                    this.loading = false
                })
            }
        }
    },
    computed: {
      business_nameErrors () {
        const errors = []
        if (!this.$v.formData.business_name.$dirty) return errors
        !this.$v.formData.business_name.required && errors.push('Buiness name is required')
        return errors
      }
    },
}
</script>
<style scoped>

</style>