<template>
    <div>
     <v-navigation-drawer v-model="drawer" app>
      <v-list dense> 
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout" link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#fff">
        <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
        </v-avatar>   
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title> Paysmall</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
        </v-avatar> 
    </v-app-bar>


    </div>
</template>
<script>
export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    methods: {
        async logout (){
          this.$store.commit('RESET_BUSINESS')
          await this.$auth.logout()
        }
    }
}
</script>
<style scoped>
.top {
    background: rgb(244, 247, 250);
}
</style>