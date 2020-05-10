<template>
    <div class="iCountUp">
        <ICountUp
        :delay="delay"
        :endVal="upval"
        :options="options"
        @ready="onReady"
        />
   </div>
</template>
<script>
 import ICountUp from 'vue-countup-v2';
  export default {
    name: 'demo',
    components: {
      ICountUp
    },
    data() {
      return {
        delay: 1000,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      };
    },
    methods: {
      onReady: function(instance, CountUp) {
        const that = this;
        instance.update(that.endVal + 100);
      }
    },
    props: ["upval"]
  };
</script>
<style scoped>
 .iCountUp {
    font-size: 12px;
    margin: 0;
    color: #4d63bc;
  }
</style>