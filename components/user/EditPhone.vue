<template>
    <div>
        <v-col cols="12"  v-if="success">
            <v-chip class="ma-2" color="green" text-color="white">
                update on phone number successfully 
            </v-chip>
        </v-col>
        <v-col cols="12" style="color: red;"  v-if="errormess">
            <v-chip class="ma-2" color="red" text-color="white">
                {{errormess}}
            </v-chip>
        </v-col>
        <v-col cols="12" xs="12" md="6" sm="6" lg="6">
            <vue-tel-input  @input="onInput" v-model="phone.number" :disabled="togglestate" :valid-characters-only="true" mode="international" required></vue-tel-input>
        </v-col>  
        
        <v-col cols="12" xs="12" sm="6" md="6" lg="6" v-if="!togglestate">
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
            <v-btn large class="ma-2" :loading="loading" @click="submit()" outlined color="indigo">submit</v-btn>
        </v-col>
    </div>
</template>
<script>
export default {
    data () {
        return {
            phone: {
                number: this.$store.state.auth.user.phone,
                valid: false,
                country: '',
            },
            errors: null,
            loading: false,
            success: false,
            errormess: ''
        }
    },
    methods: {
        onInput(formattedNumber, { number, valid, country }) {
            this.phone.number = number.international;
            this.phone.valid = valid;
            this.phone.country = country && country.name;
            if (valid == true) {
                this.disabled = false
            }
        },
        async submit(){
            this.loading = true
            if (this.phone.valid) {
                this.errormess = ''
                this.$axios.setHeader('Accept', 'application/json')  
                await this.$axios.post('/EditUserPhone', { phone: this.phone.number }).then((res)=> {
                    if (res.data.status == "success") {
                        this.$auth.fetchUser()
                        this.success = true
                    }
                    this.loading = false
                }).catch(( error ) => {
                    console.log(error.response.data);
                    this.errors = error.response.data
                    this.errormess = error.response.data.message
                    this.loading = false
                });

            }
            return
        }
    },
    computed: {
        no(){
            return Number(this.$store.state.auth.user.phone)
        }
    },
    props: ["togglestate"]
}
</script>
<style scoped>
.space{
    margin-top: 28px;
}
.vue-tel-input{
    height: 60px;
    border: 1px solid #9e9e9e;
}
</style>