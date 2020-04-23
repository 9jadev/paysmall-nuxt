<template>
  <v-footer dark absolute :fixed="fixed" padless>
    <v-card flat tile  class="blue lighten-1 white--text text-center">
      <v-card-text>
        <v-btn  class="mx-4 white--text" icon>
          <v-icon large color="white">mdi-facebook</v-icon>
        </v-btn>
        <v-btn  class="mx-4 white--text" icon>
          <v-icon large color="white">mdi-twitter</v-icon>
        </v-btn>
        <v-btn  class="mx-4 white--text" icon>
          <v-icon large color="white">mdi-instagram</v-icon>
        </v-btn>
        <v-btn  class="mx-4 white--text" icon>
          <v-icon large color="white">mdi-linkedin</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
       <strong> &copy; Paysmall</strong> {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    data(){
        return {
            fixed: true
        }
    }
  }
</script>
<style scoped>

</style>