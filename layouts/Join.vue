<template>
  <v-app light>
    <v-content class="wrap">
        <nuxt /> 
    </v-content>
  </v-app>
</template>

<script>
import HeaderTag from '~/components/HeaderTag.vue';
import FooterTag from '~/components/FooterTag.vue';
export default {
  
  components: {
      HeaderTag , FooterTag
  }
}
</script>
<style scoped>
.wrap{
    background: #f4f7fa;
}
</style>
