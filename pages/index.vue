<template>
  <div>
     
        <first-part></first-part> 
        <second-part></second-part>
        <third-part></third-part>
        <forth-part></forth-part>
        <!-- <fifth-part></fifth-part> -->
  </div>
</template>

<script>
import FirstPart from '~/components/FirstPart.vue'
import SecondPart from '~/components/SecondPart.vue'
import ThirdPart from '~/components/ThirdPart.vue'
import ForthPart from '~/components/ForthPart.vue'
import FifthPart from '~/components/FifthPart.vue'
export default {
  data(){
    return{
      textcenter: this.$vuetify.breakpoint.xsAndsm ? "text-center" : " " 
    }
  },
  head(){
    return {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=Open+Sans:ital@1&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=Open+Sans:ital@1&display=swap' }
      ]
    }
  },
  components: {
    FirstPart , SecondPart , ThirdPart , ForthPart , FifthPart
  }
}
</script>
<style scoped>
.pad{
  padding: 0px;
}
</style>