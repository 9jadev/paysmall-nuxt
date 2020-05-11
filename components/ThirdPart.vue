<template>
    <v-container class="top blue lighten-1" fluid>
        <p style="padding-top: 30px;"></p>
        <v-row class="ml-10 mr-10"> 
            <v-col cols="12" xs="12" sm="6" md="6" lg="6">
                <h4 class=" display-1 font-weight-bold">
                    Businesses we support.
                </h4>
                <p style="padding-top: 10px;"></p>
                <v-stepper v-model="e6" class="text-color box" style="" cycle vertical>
                    <v-stepper-step @click="e6 = 1" step="1">
                        <p class="text-color">Select an app</p>
                        <small style="color: white;">Summarize if needed</small>
                    </v-stepper-step>

                    <v-stepper-content step="1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sed sapiente atque quidem eligendi. Ad, corporis? Officia qui earum tenetur aliquam voluptates possimus! Aspernatur ipsam adipisci provident culpa, magni nobis!
                    </v-stepper-content>
                    <!-- step 1 ends -->

                    <v-stepper-step @click="e6 = 2" step="2">
                        <p class="text-color">Select an app 2</p>
                        <small style="color: white;">Summarize if needed</small>
                    </v-stepper-step>

                    <v-stepper-content step="2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sed sapiente atque quidem eligendi. Ad, corporis? Officia qui earum tenetur aliquam voluptates possimus! Aspernatur ipsam adipisci provident culpa, magni nobis!
                    </v-stepper-content>
                    <!-- step 2 ends -->

                    <v-stepper-step @click="e6 = 3" step="3">
                         <p class="text-color">Select an app 2</p>
                        <small style="color: white;">Summarize if needed</small>
                    </v-stepper-step>

                    <v-stepper-content step="3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda vitae inventore dolorum explicabo placeat fuga earum. Placeat laboriosam odio sit error explicabo, natus, consequuntur expedita pariatur aut illum alias temporibus.
                    </v-stepper-content>

                    <!-- step 3 ends -->

                    <v-stepper-step @click="e6 = 4" step="4">
                        <p class="text-color">Select an app 2</p>
                        <small style="color: white;">Summarize if needed</small>
                    </v-stepper-step>
                    <v-stepper-content step="4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, possimus aliquam dolor omnis consequatur ducimus atque nobis, incidunt quas ab odio repellat eum voluptas. Consectetur, laborum. Sequi omnis iste porro?
                    </v-stepper-content>
                </v-stepper>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="6" lg="6">
                <p class="d-none d-sm-flex" style="margin-top : 20px;"></p>
                <v-carousel :show-arrows="false" v-model="e6" reverse-transition="fade-transition" transition="fade-transition">
                    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" ></v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data () {
      return {
        e6: 1,
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          }
        ],
      }
    },
}
</script>
<style scoped>
     h4{
        line-height: 1.25;
        font-family: 'Bitter', serif !important;
        color: whitesmoke;
    }
    p{
        font-family: 'Open Sans', sans-serif;
        color: #2d4da9;
    }
    .box{
        background: inherit;
        border: 0px;
        box-shadow: none;
    }
    .top{
        margin-top: 0px;
        padding-top: 0px;
        padding-bottom: 30px;
        margin-bottom: 0px;
    }
    .text-color{
        color: #42a5f5;
    }
</style>