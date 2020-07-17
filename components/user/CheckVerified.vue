<template>
    <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
            <v-card-title class="headline"></v-card-title>
            <v-card-text>
                Dear {{ this.$store.state.auth.user.firstname }} {{ this.$store.state.auth.user.lastname }} , You need to verify your account to continue. 
                <p class="subtitle-2" style="color: teal;" v-if="status"> An email verify link has been sent to you.  </p>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text :loading="loading" v-if="!status" :disabled="loading" @click="verify">Verify Now</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import Axios from 'axios';
export default {
    data  () {
        return {
            dialog: true,
            loading: false,
            status: false
        }
    },
    methods: {
        verify (){
            this.loading = true
            this.$axios.setHeader('Accept', 'application/json')
            let token = localStorage.getItem('auth._token.local')
            this.$axios.setHeader('Authorization', token)
            this.$axios.get('/email/resend', this.$store.state.auth.user.email).then((res) => {
                let reponse = res.data.state
                if (Response == "sent") {
                    this.dialog = false
                }
                this.status = true
                this.loading = false
            }).catch((err) => {
                this.loading = false
            })
            this.loading = true
            
            // await this.$axios.post();
        }
    },
}
</script>
