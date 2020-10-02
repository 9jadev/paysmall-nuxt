<template>
    <v-layout justify-center>
        <v-container >
            <div style="height: 20%;"></div>
            <v-row align="center" justify="center" class="position"> 
                <v-col cols="12" xs="12" sm="3" md="3" lg="3"></v-col>
                <v-col cols="12" xs="12" sm="6" md="6" lg="6"  class="pl-5 pr-5 content">
                    <div class=" ">
                        <img src="~/assets/MAIN.png" class="center" width="250px" alt="John">
                        <div>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum officia exercitationem sed esse quae provident voluptate dicta minima, facilis quisquam, nisi dignissimos non, dolore cum vitae veniam dolorem porro illo?
                        </div>
                    </div>
                    <div class="my-2">
                        <v-btn color="#42A5F5" @click="searchingway()" dark large>Find Invoice</v-btn>
                    </div>
                </v-col>
                <v-col cols="12" xs="12" sm="3" md="3" lg="3"></v-col>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
import swal from 'sweetalert';
export default {
    layout: 'Join',
    loading: {
        color: 'blue',
    },
    data() {
        return {
            content: '',
        };
    },
    mounted(){
        // console.log(this.$route.params)
        this.$axios.setHeader('Accept', 'application/json') 
        this.$axios.get(`/payment/markpaid/${this.$route.params.payment}/${this.$route.params.invoice}`).then((res)=> {
            // console.log(res.data.status)
            if (res.data.status == false) {
                
                console.log('false')
            }
        }).catch((error) => {
            console.log(error.response.data);
            this.errors = error.response.data
            this.errorsnackbar = true
            this.errormess = error.response.data.message
            this.loading = false
        })      
    },
    // methods: {
        
    // }
}
</script>
<style scoped>
.content {
    text-align: center;
    background: white;
    border-radius: 13px;
    border: 2px solid #42a5f5;
}
.postion {
    margin:auto;
    height: 60%;
}
</style>