<template>
    <div>
     <v-navigation-drawer v-model="drawer" app>
      <v-list dense> 
        <v-list-item link>
          <v-list-item-action @click="home">
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
            <img src="~/assets/MAIN.png" alt="John">
        </v-avatar>   
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title> Paysmall</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-avatar>
          <span class="success--text headline" v-if="!this.$store.state.business.business_image">NA</span>  
          <img :src="this.$store.state.business.business_image" v-else alt="Logo">
        </v-avatar> 
        <div class="text-center">
          <v-menu open-on-hover buttom offset-y>
            <template v-slot:activator="{ on }">
              <v-icon  v-on="on">mdi-chevron-down</v-icon>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title> 
                  <nuxt-link to="/user" class="link"> Home  </nuxt-link>
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <v-list>
              <v-list-item>
                <v-list-item-title>
                 <nuxt-link to="/user/profile" class="link"> Profile  </nuxt-link>
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <v-list>
              <v-list-item>
                <v-list-item-title  @click="logout"> Logout </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
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
        },
        profile () {
          this.$router.push('user/profile')
        },
        home () {
          this.$router.push('user')
        }
    }
}
</script>
<style scoped>
.top {
    background: rgb(244, 247, 250);
}
.link{
  text-decoration: none;
  color: black;
}
</style>