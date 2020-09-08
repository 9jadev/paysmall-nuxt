<template>
    <div>
        <h1 class="text-center">{{ this.serial }}</h1>
        <p class="about my-2 text-center">
            {{ this.about }}
        </p>
        <div class="my-2 text-center">
            <v-btn color="success" class=" mb-2" @click="activatenow()" v-show="this.active == false" dark large>
                Activate now
                <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
            <!-- <v-btn color="error" class=" mb-2" v-if="this.active == true" dark large>
                Deactive now
                <v-icon dark right>mdi-cancel</v-icon>
            </v-btn> -->
            <v-btn color="primary" class=" mb-2" dark large>
                Print data
            </v-btn>
            <v-btn color="orange lighten-2" @click="fabdata()" large class="mr-1 mb-2"> 
                Edit Invoice
            </v-btn><br>
            <span> Share Now </span>
            <div class="my-2">
                <v-btn small color="primary">
                    <ShareNetwork style="color: white;"
                        network="email"
                        url="https://news.vuejs.org/issues/180"
                        title="Say hi to Vite! A brand new, extremely fast development setup for Vue"
                        description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You.">
                        Email
                    </ShareNetwork>
                </v-btn>
                <v-btn small color="primary">
                    <ShareNetwork style="color: white;"
                        network="sms"
                        url="https://news.vuejs.org/issues/180"
                        title="Say hi to Vite! A brand new, extremely fast development setup for Vue"
                        description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You.">
                        Sms
                    </ShareNetwork>
                </v-btn>
                <v-btn small color="primary">
                    <ShareNetwork style="color: white;"
                        network="whatsapp"
                        url="https://news.vuejs.org/issues/180"
                        title="Say hi to Vite! A brand new, extremely fast development setup for Vue"
                        description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You.">
                        WhatsApp
                    </ShareNetwork>
                </v-btn>
                <v-btn small color="primary">
                    <ShareNetwork style="color: white;"
                        network="facebook"
                        url="https://news.vuejs.org/issues/180"
                        title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                        description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                        quote="The hot reload is so fast it\'s near instant. - Evan You"
                        hashtags="vuejs,vite">
                        Facebook
                    </ShareNetwork>
                </v-btn>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    props: ["serial", "about", "active", "id"] ,
    methods: {
        fabdata(){
            this.$router.push(`EditInvoice/${this.id}`);
        },
        activatenow(){
            this.$axios.setHeader('Accept', 'application/json')  
            this.$axios.put(`invoice/activateInvoice/${this.id}`).then((res)=> {
                // this.indata =  res.data.invoices
                console.log(res.data)
                if (res.data.invoice.activate == true) {
                    location.reload();
                }else {
                    console.log(res.data.invoice.activate);
                }
            }).catch(( error ) => {
                console.log(error.response.data);
            }); 
        }
    }
}
</script>
<style scoped>
    p {
        text-align: justify;
        line-height: 1.9em;
    }
</style>