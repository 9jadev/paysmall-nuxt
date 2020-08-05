<template>
    <div>
        <h1 class="text-center mb-2">Latest pay</h1>
        <v-card class="mx-auto" max-width="400">
            <v-list>
                <v-list-item-group v-if="count != 0" v-model="model" active-class="border" color="indigo">
                    <v-list-item  v-for="(amounts, i) in plist" :key="i">
                        <v-list-item-icon>
                            <v-icon color="success" dark right>mdi-checkbox-marked-circle</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title >₦ {{ amounts.amount }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
                 <v-list-item-group v-else v-model="model" active-class="border" color="indigo">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color="success" dark right>mdi-cancel</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title >No amount payed. </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>
<script>
export default {
    props: ["plist"],
    data(){
        return {
            count: this.plist.length
        }
    }
}
</script>
<style scoped>

</style>