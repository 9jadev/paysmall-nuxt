<template>
    <v-container class="top" fluid>
            <v-row class="ml-2 mr-2">
                <v-col cols="12" sm="4" md="4" xs="12" class="item">
                    <v-card class="pa-2 card-item" shaped>
                        <v-card-title>
                            <v-img src="https://picsum.photos/510/300?random"  height="150" width="150"></v-img>

                        </v-card-title>
                        <p style="margin-top: 30px;"></p>
                        <v-card-text class="text-content">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga minus sit exercitationem voluptas suscipit minima rem deleniti, vitae eveniet, illum numquam cum unde autem culpa quisquam quas voluptate, eligendi obcaecati!
                        </v-card-text>
                        <p style="margin-top: 20px;"></p>
                        <v-card-actions>
                            Find more
                           <v-spacer></v-spacer>
                            <div class="hidden-xm-and-sm">
                                <v-icon large color="cyan teal-2 ">mdi-account-plus</v-icon>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        <p style="margin-top: px;"></p>
    </v-container>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.top{
    background: rgba(125, 197, 255, 0.97);
    padding-top: 30px;
    padding-bottom: 30px;
}
</style>