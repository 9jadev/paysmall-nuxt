<template>
  <v-app light>
    <Header></Header>  
    <v-content class="wrap">
        <nuxt /> 
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '~/components/user/Header.vue';
import Footer from '~/components/user/Footer.vue';
export default {
  
    components: {
      Header , Footer
    }  
}
</script>
<style scoped>
.wrap{
    background: #f4f7fa;
}
</style>
