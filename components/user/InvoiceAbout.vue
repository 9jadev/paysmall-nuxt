<template>
    <div>
        <h1 class="text-center">{{ this.serial }}</h1>
        <p class="about my-2">
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
            </v-btn>
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