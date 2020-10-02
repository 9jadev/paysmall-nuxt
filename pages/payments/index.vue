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

                    <v-text-field label="Enter Code" v-model="content" class="mt-2 inp" outlined ></v-text-field>
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
    methods: {
        searchingway(){
            if (this.content == '') {
                swal("Error", "Enter Your Code ", "error", {
                  button: "Close",
                });
                return;    
            }
            this.$axios.get(`/invoice/checkInvoice/${this.content}`).then((res) => {
                if (res.data.result == true) {
                    this.$router.push(`/payments/${this.content}`)
                    return;
                }
                swal("Error", "Code not correct", "error", {
                    button: "Close",
                });
            
            }).catch((err) => {
                swal("Error", "Network Errors ", "error", {
                  button: "close",
                });
            });
        }
    }
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