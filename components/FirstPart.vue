<template>
    <v-container fluid class="pad">
        <v-parallax dark src="https://image.shutterstock.com/image-photo/large-window-into-white-office-600w-143411113.jpg">
            <v-row style="margin-top: 30px;"  align-content="center">
                <v-col cols="12" md="12" lg="12" sm="12" xs="12" xl="12" >
                    <div class="text-center mt-60">
                        <h4 class="font-weight-light display-2 mb-2">Recieve Pay,
                        <br>Make Pay <br> Instulmentally</h4>
                        <p class="text--secondary font-weight-light mt-10 pl">
                          give you customer the flexiblity to pay for your produce or service instumentally , <br />  Paysmall is the smartest way to get instulmental payment. 
                        </p>
                      <div v-if="!this.$auth.loggedIn">
                        <v-btn outlined color="indigo" class="ml-2 mr-2" @click="login"> Login </v-btn>
                        <v-btn color="success" @click="register"> Register it's free </v-btn>
                      </div>
                      <div v-else>
                        <v-btn color="success" @click="clientarea" large> Client Area </v-btn>
                      </div>
                    </div>
                </v-col>
                
                <!-- <v-col md="6" lg="6" sm="6" xs="12" xl="6"> -->
                    <!-- <v-img src="https://res.cloudinary.com/eden-life-inc/image/upload/q_auto,f_auto/hero_qyhyqg.png"></v-img> -->
                <!-- </v-col> -->
            </v-row> 
        </v-parallax>
    </v-container>     
</template>
<script>
export default {
    data(){
        return {
            videoid : 'hib63bdSypU'
        }
    },
    methods: {
        login(){
            this.$router.push('/login')
        },
        register(){
            this.$router.push('/register')
        },
        clientarea (){
            this.$router.push('/user')
        }
    }
}
</script>
<style scoped>
    h4{
        line-height: 1.25;
        font-family: 'Bitter', serif !important;
        color: #2d4da9;
    }
    p{
        font-family: 'Open Sans', sans-serif;
        color: #2d4da9;
    }
    
    @media only screen and (min-width: 600px) {
        .mt-60{
            margin-top:50px;
        }
        h4{
            padding-top: 10px;
        }
    }
    @media only screen and (max-width: 1440px) {
        .mt-60{
            margin-top:50px;
        }
        h4{
            padding-top: 10px;
        }
    }
</style>