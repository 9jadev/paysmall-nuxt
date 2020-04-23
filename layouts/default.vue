<template>
  <v-app light>
    <header-tag></header-tag>

    <v-content>
        <nuxt /> 
    </v-content>

    <footer-tag></footer-tag>
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
