<template>
    <div>
     <v-navigation-drawer v-model="drawer" app>
      <v-list dense> 
        <v-list-item link>
          <!-- <nuxt-link to="/user">
          </nuxt-link> -->
          <v-list-item-action>
            <nuxt-link to="/user">
              <v-icon>mdi-home</v-icon>
            </nuxt-link>  
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/user">
              <v-list-item-title class="link-text"> Home</v-list-item-title>
            </nuxt-link>  
          </v-list-item-content>
        </v-list-item>

        <v-list-item nuxt to="/user/contact" link>
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
          <img :src="this.$store.state.business.business_image" v-if="this.$store.state.business.business_image" alt="Logo">
          <span class="success--text headline" v-else>NA</span>
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
      async logout({store}) {
        this.$store.commit('SET_BUSINESS', {})
        this.$store.commit('SET_CONTACT', {})
        await this.$auth.logout();
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
.nuxt-link-exact-active{
  text-decoration: none;
}
.nuxt-link-active{
  text-decoration: none;
}
.link-text{
  color:#474747;
}
</style>