<template>
    <v-layout justify-center style="background: #42A5F5;">
        <v-container style="background: #42A5F5;">
            <div style="height: 10%;"></div>
            <v-row align="center" justify="center" class="position"> 
                <v-col cols="12" xs="12" sm="2" md="2" lg="2"></v-col>
                <v-col cols="12" xs="12" sm="8" md="8" lg="8"  class="content">
                    <div class="pl-5 pr-5 ">
                        <img src="~/assets/MAIN.png" class="center" width="250px" alt="John"><br>
                        <span class="text-xl-h2 text-md-h2 text-sm-h3 text-xs-h4 text-center"> {{ this.business.business_name }} </span>
                        <div class="text--secondary body-2" style="padding: 10px;">
                            Billed to  {{ this.invoice.contact_name }} <br>
                            {{ this.invoice.contact_email }}, {{ this.invoice.contact_phone }}                             
                        </div>
                    </div>
                    <div class="page-container">
                        <h4 class="text-center mystyle mb-2"> ₦ {{ this.moneyformat(this.invoice.amount) }} <br> Created on {{ this.invoice.created_at }}</h4>
                        <p class="about_invoice">
                            {{  this.invoice.about_invoice }}
                        </p>
                        <div class="mt-5">
                            <p class="unpaid">
                                <sup>Unpaid</sup>
                                <span class="h3"> ₦{{ this.moneyformat(this.invoice.payable) }}</span>
                            </p>
                            <p class="unpaid">
                                <sup>Paid</sup>
                                <span class="h3"> ₦{{ this.moneyformat(this.invoice.paid) }}</span>
                            </p>
                        </div>
                    </div>

                    <div class="my-2 text-center">
                        <span class="h4"> Threshold: ₦{{ this.moneyformat(this.invoice.threshold) }} </span>
                        <v-col cols="12" sm="6" style="margin: auto;">
                            <v-text-field label="Amount" v-model="amount" type="number" max="this.invoice.amount" single-line outlined></v-text-field>
                            <span style="color: green; font-size: 13px; font-weight: bold;">Amount  ₦{{ this.moneyformat(this.amount_evaluate) }}</span><br>
                            <span style="color: green; font-size: 13px; font-weight: bold;">Service Charge ₦50.00</span><br>
                            <span style="color: green; font-size: 13px; font-weight: bold;">Total  ₦{{ this.moneyformat(this.total) }}</span>
                        </v-col>
                        <v-btn color="success" @click="makePayment()" dark large>Pay Now</v-btn>
                    </div>
                    <div class="my-2 text-center">
                         <span class="h4" > Payment Completed</span>
                         <br>
                        <v-btn class="ma-2" text icon color="success">
                            <v-icon large>mdi-thumb-up</v-icon>
                        </v-btn>
                    </div>
                       
                    <a style="text-decoration: none;"> print data </a>
                </v-col>
                <v-col cols="12" xs="12" sm="2" md="2" lg="2"></v-col>
            </v-row>
            <div style="height: 10%;"></div>
    
        </v-container>
    </v-layout>
</template>
<script>
import Axios from 'axios';
import swal from 'sweetalert';
export default {
    layout: 'pay',
    loading: {
        color: 'blue',
    },
    data() {
        return {
          token: '',
          amount: 0,
          total: 0,
          amount_evaluate: 0,
          invoice: {},
          business: {}
        }
    },
    watch: {
        amount: function(val) {
            this.amount = Number(this.amount);
            if (this.amount > this.invoice.payable) {
                this.amount_evaluate = this.invoice.payable;
            } else {
                this.amount_evaluate = this.amount;
            }
        },
        amount_evaluate: function(val) {
            this.total = this.amount_evaluate+50;
        }

    },
    mounted(){
        this.loaddata();
    },
    methods: {
        loaddata(){
            // this.getdata();
            this.$axios.get(`/invoice/getInvoice/${this.$route.params.serial}`).then((res) => {        
                if (res.data.result == false) {
                    this.$router.push('/payments')
                }
                // console.log(res.data)
                this.business = res.data.business
                this.invoice = res.data.invoice
            }).catch((err) => {
                // console.log(err);
                this.$router.push('/payments')
            });
        },
        payment(){
            console.log(" formation ");
        },
        moneyformat(amount){
            var formatter = new Intl.NumberFormat('en-US');
            var result = formatter.format(amount);
            if (result == 'NAN') {
                return 0.00
            } 
            return result;
        },
        
        rave(amount,tranx,id,invoiceId){
            this.$launchFlutterwave({
                tx_ref: tranx,
                amount: amount,
                currency: 'NGN',
                payment_options: 'card,mobilemoney,ussd',
                customer: {
                    email: this.invoice.contact_email,
                    phonenumber: this.invoice.contact_phone,
                    name: this.invoice.contact_name
                },
                callback: function(data) {
                    // specified callback function
                    console.log(data.status)
                    if (data.status == 'successful') {
                        // this.$router.push(`/payments/${this.content}`)
                        window.location.href = `/payments/${id}/${invoiceId}`;
                        // this.$router.push(`/payements/${id}/${invoiceId}`)
                    } else {
                        swal("Error", "A Payment compilcation occured contact invoice creator for verifications", "error", {
                            button: "Close",
                        });
                        return;
                    }
                },
                customizations: {
                    title: this.invoice.contact_name,
                    description: this.invoice.about_invoice,
                    logo: this.business.business_image
                }
            });
        },
        makePayment() {
            let time = Date.now().toString();
            let payable = 50; 
            // console.log(" fofd ");
            if (this.amount == 0 || this.amount_evaluate == 0) {
                swal("Error", "Enter Your Amount", "error", {
                  button: "Close",
                });
                return;
            } else {
                this.$axios.post(`/payment`, {
                    business_id: this.invoice.business_id,
                    invoices_id: this.invoice.id,
                    tran_x: time,
                    amount: this.amount,
                    payment_status: false
                }).then(res => {
                    // console.log(res);
                // if (res.data.result == true) {
                //     this.$router.push(`/payments/${this.content}`)
                //     return;
                // }
                // swal("Error", "Code not correct", "error", {
                //     button: "Close",
                // });
                console.log(res.data.Payment.id)
                this.rave(res.data.Payment.amount+payable,res.data.Payment.tran_x,res.data.Payment.id,this.invoice.id)
            
            }).catch((err) => {
                swal("Error",'Some error occoured try again later', "error", {
                  button: "close",
                });
            });

                // swal("Good job!", "You clicked the button!", "success", {
                //     button: "Aww yiss!",
                // });
            }
            
        }
    },
    
}
</script>
<style scoped>
.content {
    text-align: center;
    background: white;
    border: 2px solid #0d83e21a;
}
.page-container {
    height: 255px;
    background: #F4F7FA;
    color: black;
}
.postion {
    margin:auto;
    height: 80%;
}
.mystyle {
    padding-top: 30px;
    color: rgb(0 0 0 / 66%);
}
.about_invoice {
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    font-size: small;
}
.unpaid {
    font-size: 20px;
}
</style>