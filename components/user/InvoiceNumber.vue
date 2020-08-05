<template>
   <span class="button"> ₦ {{ format_amount }} </span>    
</template>
<script>
export default {
    props: ['amount'],
    computed: {
        format_amount(){
            return new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(this.amount)
            // return 10000;
        }
    },
}
</script>