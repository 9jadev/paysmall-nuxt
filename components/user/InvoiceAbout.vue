<template>
    <div>
        <h1 class="text-center">{{ this.serial }}</h1>
        <p class="about my-2">
            {{ this.about }}
        </p>
        <div class="my-2 text-center">
            <v-btn color="success" class=" mb-2" v-if="this.active == false" dark large>
                Activate now
                <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
            <v-btn color="error" class=" mb-2" v-if="this.active == true" dark large>
                Deactive now
                <v-icon dark right>mdi-cancel</v-icon>
            </v-btn>
            <v-btn color="primary" class=" mb-2" dark large>
                Print data
            </v-btn>
        </div>
    </div>
</template>
<script>
export default {
    props: ["serial", "about", "active"]
}
</script>
<style scoped>
    p {
        text-align: justify;
        line-height: 1.9em;
    }
</style>