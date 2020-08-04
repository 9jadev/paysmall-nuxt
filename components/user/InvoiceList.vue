<template>
   <v-data-table :headers="headers" :items="getinvoices" sort-by="calories" :single-expand="singleExpand"
    :expanded.sync="expanded"
    show-expand class="elevation-1">
   
   <template #item.paid="{item}">
       <invoice-number :amount="item.paid"></invoice-number>
   </template>
   <template #item.amount="{item}">
       <invoice-number :amount="item.amount"></invoice-number>
   </template>
   <template #item.completed="{item}">
       <invoice-completed :completed="item.completed"></invoice-completed>
   </template>
   <template #expanded-item="{headers, item}">
       <td :colspan="headers.length">
           <h1>{{item.customer_name }}</h1>
       </td>
   </template>
    <!-- <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2">mdi-heart</v-icon>
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small  @click="deleteItem(item)"> mdi-delete</v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
    <!-- <template v-slot:item="row">
        <tr>
            <td>1</td>
            <td>fosasias </td>
            <td>
                <v-btn class="mx-2" fab dark small color="pink" @click="onButtonClick(row.item)">
                    <v-icon dark>mdi-heart</v-icon>
                </v-btn>
            </td>
        </tr>
    </template> -->
  </v-data-table>
  
</template>
<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength , email } from 'vuelidate/lib/validators' 
import InvoiceNumber from '~/components/user/InvoiceNumber.vue'
import InvoiceCompleted from '~/components/user/InvoiceCompleted.vue'
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
      },
      dialog (val) {
        val || this.close()
      }
    },
    components: {InvoiceNumber , InvoiceCompleted },
    data () {
      return {
        search: '',
        dialog: false,
        singleExpand: false,
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
            value: 'serialcode'
          },
          { text: 'Customer name', value: 'customer_name' },
          { text: 'Customer email', value: 'customer_email' },
          { text: 'Customer phone', value: 'customer_phone' },
          { text: 'Amount', value: 'amount' },
          { text: 'Paid', value: 'paid' },
          { text: 'Times paid', value: 'timespaid' },
          { text: 'Threshold', value: 'threshold'},
          { text: 'Completed', value: 'completed'},
          { text: 'Time Created', value: 'created_at'},

        //   { text: 'Iron (%)', value: 'iron' },
        ],
      }
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.contactlist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.formData.customer_name = this.editedItem.name
        this.formData.customer_email = this.editedItem.email
        this.formData.customer_phone = this.editedItem.phone
        this.dialog = true
        // console.log(this.editedItem, this.dialog);
      },
      deleteItem (item) {
        const index = this.contactlist.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.deletedata(item)
      },
      deletedata(item) {
        this.$axios.setHeader('Accept', 'application/json')  
        this.$axios.delete('/contact/'+item.id).then((res)=> {
            this.$store.dispatch('deleteContacts',item.id);
            // console.log(res)
            this.loading = false
            this.close()
        }).catch(( error ) => {
            console.log(error.response.data);
        });
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
          // Object.assign(this.contactlist[this.editedIndex], this.editedItem)
          this.$v.$touch();
          if (this.phone.valid && (!this.$v.formData.customer_name.$invalid && !this.$v.formData.customer_email.$invalid)) {
            console.log(this.formData);  
            this.loading = true
            this.$axios.setHeader('Accept', 'application/json')  
            this.$axios.patch('/contact/'+this.editedItem.id, {
                email: this.formData.customer_email,
                name: this.formData.customer_name,
                phone: this.formData.customer_phone,
                business_id: this.formData.business_id
            }).then((res)=> {
                this.$store.dispatch('updateContacts',res.data.contact);
                this.loading = false
                this.close()
            }).catch(( error ) => {
                console.log(error.response.data);
            }); 
            this.loading = false
          }
        } else {
          this.$v.$touch();
          if (this.phone.valid && (!this.$v.formData.customer_name.$invalid && !this.$v.formData.customer_email.$invalid)) {
            console.log(this.formData);  
            this.loading = true
            this.$axios.setHeader('Accept', 'application/json')  
            this.$axios.post('/contact', {
                email: this.formData.customer_email,
                name: this.formData.customer_name,
                phone: this.formData.customer_phone,
                business_id: this.formData.business_id
            }).then((res)=> {
                // console.log(res.data.contact);
                this.$store.dispatch('updateCon', res.data.contact);
                this.loading = false
                this.close()
            }).catch(( error ) => {
                console.log(error.response.data);
            }); 
          }
          this.loading = false
        }
        this.close()
      },
    },
    computed: {
      ...mapGetters(['contactlist']),
      getinvoices () {
        return [
            {   serialcode: '#ddci073232',
                customer_name : 'Ahamba solomon',
                customer_email: 'ahambasolomo800@gmail.com',
                customer_phone: '2349034426192',
                amount: 10000,
                threshold: 100000,
                type: 'One',
                paid: 10000,
                completed: false,
                created_at: '2020-07-27 20:03:32'
            },
            {   serialcode: '#ddci081232',
                customer_name : 'Ahamba solomon',
                customer_email: 'ahambasolomo800@gmail.com',
                customer_phone: '2349034426192',
                amount: 10000,
                threshold: 100000,
                type: 'One',
                paid: 10000,
                completed: true,
                created_at: '2020-07-27 20:03:32'
            },
            {   serialcode: '#ddci083282',
                customer_name : 'Allen walker',
                customer_email: 'ahambasolomo800@gmail.com',
                customer_phone: '2349034426192',
                amount: 10000,
                threshold: 100000,
                type: 'One',
                paid: 10000,
                completed: false,
                created_at: '2020-07-27 20:03:32'
            },

        ];
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Contact' : 'Edit Contact'
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
    //   console.log(this.$store.state.contacts);
    }
  }
</script>
<style scoped>
.vue-tel-input{
    height: 58px;
    border-color: #9e9e9e;
}
</style>
