<template>
  <v-footer color="primary lighten-1" padless >
    <v-row justify="center" no-gutters>
      <!-- <v-btn
        v-for="link in links"  :key="link"  color="white"  text  rounded  class="my-2">
        {{ link }}
      </v-btn> -->
      <p class="white--text pt-0 pl-4 pr-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime itaque saepe at similique quas mollitia
          id, quidem nemo minima perspiciatis, ea earum consequuntur ratione dolorum nobis modi cupiditate
          autem aspernatur?
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro eligendi a repellat corporis, dignissimos corrupti voluptas minus odit officiis nihil vitae eveniet culpa inventore architecto recusandae ab similique dicta delectus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime itaque saepe at similique quas mollitia
          id, quidem nemo minima perspiciatis, ea earum consequuntur ratione dolorum nobis modi cupiditate
          autem aspernatur?
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro eligendi a repellat corporis, dignissimos corrupti voluptas minus odit officiis nihil vitae eveniet culpa inventore architecto recusandae ab similique dicta delectus.
      </p>
      <v-col  class="primary lighten-2 py-4 text-center white--text"  cols="12">
        {{ new Date().getFullYear() }} — <strong>Paysmall</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  export default {
    data(){
        return {
            links: [
            'Home',
            'About Us',
            'Team',
            'Services',
            'Blog',
            'Contact Us',
          ]
        }
    }
  }
</script>
<style scoped>

</style>