<template>
    <v-container class="top" fluid>
            <v-row align="center" class="call" align-content="center">
                <p style="hieght: 10px;">

                </p>
                <v-col  align-self="center">
                    <div class="text-center">
                        <h4 class="font-weight-light display-2 mb-2"> Ready to get started? </h4>
                        <p class="font-weight-light body-1">Get in touch or create an account and start accepting payments within minutes.</p>
                        <v-btn x-large color="teal darken-4" class="mb-5 mr-3" dark>
                            Create Account 
                        </v-btn>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">      
                                <v-btn x-large color="success" v-on="on" class="mb-5 mr-3" dark> 
                                        Contact Sales 
                                </v-btn>
                            </template>
                            <span>We would answer your questions</span>
                        </v-tooltip>     
                    </div>
                </v-col>
            </v-row>
    </v-container>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.call{
    height: 400px;
    background: rgb(244, 248, 252);
    padding-top: 0px;
    padding-bottom: 0px;
}
.top{
    background: rgba(125, 197, 255, 0.97);
    padding-top: 0px;
    margin-top: px;
    margin-bottom: 200px;
    padding-bottom: 0px;
}
</style>