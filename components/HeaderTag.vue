<template>
    <div>
        <v-app-bar height="60" dense app fixed>
            <v-avatar>
                <img src="~/assets/MAIN.png" alt="John">
            </v-avatar> 
            <v-toolbar-title>Paysmall</v-toolbar-title>
            <div class="hidden-xs-only hidden-sm-only">
                <v-btn large text> How it works </v-btn>
                <v-btn large text> Tutorials </v-btn>
                <v-btn large text> Pricing</v-btn>
                <v-btn large text> FAQ </v-btn>
                <v-btn large text> Contact us </v-btn>
            </div>
            <v-spacer></v-spacer>
            <div class="hidden-xs-only hidden-sm-only hidden-md-only" v-if="this.$auth.loggedIn == false">
                <v-btn outlined color="indigo" class="ml-2 mr-2" :nuxt="true"> <nuxt-link to="/login" class="link">Login</nuxt-link> </v-btn>
                <v-btn color="success" :nuxt="true"><nuxt-link to="/register" class="link">REGISTER IT'S FREE</nuxt-link></v-btn>
            </div>
            <div class="hidden-xs-only hidden-sm-only hidden-md-only" v-else>
                <v-btn color="success" :nuxt="true"><nuxt-link to="/user" class="link" style="color : white;"> CLIENT AREA </nuxt-link></v-btn>
            </div>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click.native="rightDrawer = !rightDrawer"></v-app-bar-nav-icon>
        </v-app-bar>
        
        <v-navigation-drawer v-model="rightDrawer" class="hidden-md-and-up" :right="right" temporary fixed>
            <v-list>
                <v-list-item @click.native="right = !right">
                <v-list-item-action>
                    <v-icon light>
                    mdi-repeat
                    </v-icon>
                </v-list-item-action>
                <v-list-item-title>Switch drawer (click me)</v-list-item-title>
                </v-list-item>
                <v-list-item >
                    <v-list-item-action>
                    </v-list-item-action>
                    <v-list-item-title>
                        <nuxt-link to="/Login" class="link"> Login  </nuxt-link>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script>
export default {
    data(){
        return {
            clipped: false,
            drawer: false,
            items: [
                {
                icon: 'mdi-apps',
                title: 'Welcome',
                to: '/'
                },
                {
                icon: 'mdi-chart-bubble',
                title: 'Inspire',
                to: '/inspire'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js'
        }
    }
}
</script>
<style scoped>
.link{
    text-decoration: blink;
}
</style>