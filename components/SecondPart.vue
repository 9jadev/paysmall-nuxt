<template>
    <v-container class=" top" fluid>
        <h4 class="text-center display-2 font-weight-bold" style="color: #022B69;">  Three easy steps for starting. </h4>
        <p style="margin-top: 44px;"></p>
        <v-row class="">
            <v-col cols="12" sm="4" md="4" xs="12" class="item">
                <v-card class="pa-2 card-item" shaped>
                    <v-card-title>
                        Create <br>
                        Account
                    </v-card-title>
                    <p style="margin-top: 30px;"></p>
                    <v-card-text class="text-content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga minus sit exercitationem voluptas suscipit minima rem deleniti, vitae eveniet, illum numquam cum unde autem culpa quisquam quas voluptate, eligendi obcaecati!
                    </v-card-text>
                    <p style="margin-top: 70px;"></p>
                    <v-card-actions>
                        Find more
                        <v-spacer></v-spacer>
                        <div class="hidden-xm-and-sm">
                            <v-icon large color="cyan teal-2 ">mdi-account-plus</v-icon>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4" md="4" xs="12" class="item">
                <v-card class="pa-2 card-item" shaped>
                    <v-card-title>
                        Make<br>
                        Transaction
                    </v-card-title>
                    <p style="margin-top: 30px;"></p>
                    <v-card-text class="text-content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga minus sit exercitationem voluptas suscipit minima rem deleniti, vitae eveniet, illum numquam cum unde autem culpa quisquam quas voluptate, eligendi obcaecati!
                    </v-card-text>
                    <p style="margin-top: 70px;"></p>
                    <v-card-actions>
                        Find more
                        <v-spacer></v-spacer>
                        <div class="hidden-xm-and-sm">
                            <v-icon large color="cyan teal-2 ">mdi-chart-line-stacked</v-icon>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4" md="4" xs="12" class="item">
                <v-card class="pa-2 card-item" shaped>
                    <v-card-title>
                        Accept <br>
                        Payement
                    </v-card-title>
                    <p style="margin-top: 30px;"></p>
                    <v-card-text class="text-content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga minus sit exercitationem voluptas suscipit minima rem deleniti, vitae eveniet, illum numquam cum unde autem culpa quisquam quas voluptate, eligendi obcaecati!
                    </v-card-text>
                    <p style="margin-top: 70px;"></p>
                    <v-card-actions>
                        Find more
                        <v-spacer></v-spacer>
                        <div class="hidden-xm-and-sm">
                            <v-icon large color="cyan teal-2 ">mdi-account-cash</v-icon>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <p style="margin-top: 90px;"></p>
    </v-container>    
</template>
<script>
export default {
    
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
    .top{
        background: #F4F8FC;
        padding-top: 30px;
        padding-bottom: 30px;
        margin-bottom: 0px;
    }
    .item{
        padding-left: 20px;
    }
    .card-item{
        border-width: thin;
        border-radius: 5px;
    }
    .text-content{
        text-rendering: geometricPrecision;
        color: #022B69;
    }
</style>
