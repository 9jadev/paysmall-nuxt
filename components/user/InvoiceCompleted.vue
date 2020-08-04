<template>
    <span class="button">
        <v-btn v-if="this.completed == true" color="green lighten-2" x-small class="mr-1 mb-2"> 
            Completed
        </v-btn>
        <v-btn v-else color="orange lighten-2" x-small class="mr-1 mb-2"> 
            Not Completed
        </v-btn>
        
    </span>    
</template>
<script>
export default {
    props: ['completed'],
    computed: {
        format_amount(){
            return new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(0)
            // return 10000;
        }
    },
}
</script>