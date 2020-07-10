<template>
  <v-card>
    <v-card-title>
      {{dname}}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <client-only>
    <v-data-table
      :headers="headers"
      :items="contactlist"
      :search="search"
      :items-per-page="5"
    >
      
    <v-spacer></v-spacer>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Customer Name*" :error-messages="customer_nameErrors" :disabled="loading" :loading="loading" required @input="$v.formData.customer_name.$touch()" @blur="$v.formData.customer_name.$touch()"  color="success" v-model.trim="formData.customer_name"  outlined clearable></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                  <no-ssr placeholder="loading...">
                      <vue-tel-input  @input="onInput" :valid-characters-only="true" mode="international" :disabled="loading" v-model.trim="formData.customer_phone"  required></vue-tel-input>
                      <span v-if="!phone.valid" style="color: red;">Invalid Phone </span>
                  </no-ssr>
              </v-col>
              <v-col cols="12">
                  <v-text-field label="Customer Email*" :error-messages="customer_emailErrors" :disabled="loading" :loading="loading" @input="$v.formData.customer_email.$touch()" @blur="$v.formData.customer_email.$touch()" color="success" v-model.trim="formData.customer_email" outlined required></v-text-field>
              </v-col>    
          </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CONTACT</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->


    </v-data-table>
    </client-only>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength , email } from 'vuelidate/lib/validators' 

 export default {
   mixins: [validationMixin], 
    validations: {
      formData:{
        customer_name: {
          required
        },
        customer_email: {
          required,
          email
        }
      }
    },
    watch:{
      phone(){
        this.phone.number = this.customer_phone;
      }
    },

    data () {
      return {
        dialog: false,
        valid: true,
        loading: false,
        formData: {
          customer_name: "",
          customer_email: "",
          customer_phone: "",
          business_id: this.$store.state.business.id,
        },
        editedIndex: -1,
        editedItem: {
          customer_name: "",
          customer_email: "",
          customer_phone: "",
          business_id: this.$store.state.business.id,
        },
        phone: {
            number: '',
            valid: false,
            country: '',
        },
        sortBy: 'Name',
        sortDesc: true,
        search: '',
        headers: [
          {
            text: 'Serial',
            align: 'start',
            sortable: false,
            value: 'did'
          },
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Actions', value: 'actions', sortable: false },
        //   { text: 'Iron (%)', value: 'iron' },
        ],
      }
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.contactlist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        console.log(this.editedItem, this.dialog);
      },
      deleteItem (item) {
        const index = this.contactlist.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.contactlist.splice(index, 1)
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      onInput(formattedNumber, { number, valid, country }) {
        this.phone.number = number.international;
        this.phone.valid = valid;
        this.phone.country = country && country.name;
        if (valid == true) {
            this.disabled = false
        }
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.contactlist[this.editedIndex], this.editedItem)
        } else {
          this.contactlist.push(this.editedItem)
        }
        this.close()
      },
    },
    computed: {
      ...mapGetters(['contactlist']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    sslist(){
      return this.$store.state.contacts;
    },
    customer_nameErrors (){
      const errors = []
      if (!this.$v.formData.customer_name.$dirty) return errors
      !this.$v.formData.customer_name.required && errors.push(' Customer name is required')
      return errors
      },
    customer_emailErrors () {
      const errors = []
      if (!this.$v.formData.customer_email.$dirty) return errors
      !this.$v.formData.customer_email.email && errors.push('Must be valid e-mail')
      !this.$v.formData.customer_email.required && errors.push('E-mail is required')
      return errors
    }
  },
    props: ["dname"],
    mounted(){
      console.log(this.$store.state.contacts);
    }
  }
</script>
