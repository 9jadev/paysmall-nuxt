<template>

   <v-data-table :headers="headers" :items="getinvoices" :single-expand="singleExpand"
    :expanded.sync="expanded"
    show-expand item-key="serialcode" class="elevation-1">
   
   <template #item.paid="{item}">
       <invoice-number :amount="item.paid"></invoice-number>
   </template>
   <template #item.amount="{item}">
       <invoice-number :amount="item.amount"></invoice-number>
   </template>
   <template #item.completed="{item}">
       <invoice-completed :completed="item.completed"></invoice-completed>
   </template>
   <template #item.payable="{item}">
       <invoice-number :amount="item.payable"></invoice-number>
   </template>
   <template #expanded-item="{headers, item}">
       <td :colspan="headers.length">
        <v-row>
          <v-col lg="6" md="6" sm="12" xm="12">
            <invoice-about :serial="item.serialcode" :about="item.about_invoice" :id="item.id" :active="item.activate"></invoice-about>
          </v-col>
          <v-col lg="6" md="6" sm="12" xm="12">
            <invoice-latest :plist="listamount"></invoice-latest>
          </v-col>
        </v-row>
       </td>
   </template>
  </v-data-table>
  
</template>
<script>
import InvoiceNumber from '~/components/user/InvoiceNumber.vue'
import InvoiceCompleted from '~/components/user/InvoiceCompleted.vue'
import InvoiceAbout from '~/components/user/InvoiceAbout.vue'
import InvoiceLatest from '~/components/user/InvoiceLatest.vue'
 export default {
    components: {InvoiceLatest, InvoiceNumber , InvoiceCompleted , InvoiceAbout},
    data () {
      return {
        listamount: [{amount: 10000}, {amount: 10000}, {amount: 10000}, {amount: 10000}],
        singleExpand: true,
        expanded: [],
        headers: [
          {
            text: 'Serial',
            align: 'start',
            sortable: false,
            value: 'serialcode'
          },
          { text: 'Customer name', value: 'contact_name' , sortable: true},
          { text: 'Customer email', value: 'contact_email' , sortable: true},
          { text: 'Customer phone', value: 'contact_phone' , sortable: true},
          { text: 'Amount', value: 'amount' , sortable: true},
          { text: 'Payable', value: 'payable' , sortable: true},
          { text: 'Paid', value: 'paid' , sortable: true},
          { text: 'Times paid', value: 'timespaid' , sortable: true},
          { text: 'Threshold', value: 'threshold' , sortable: true},
          { text: 'Completed', value: 'completed' , sortable: true},
          { text: 'Time Created', value: 'created_at' , sortable: true},

        //   { text: 'Iron (%)', value: 'iron' },
        ],
        indata: []
      }
    },
    methods: {
      getdata(){
        this.$axios.setHeader('Accept', 'application/json')  
        this.$axios.get('/invoice').then((res)=> {
            this.indata =  res.data.invoices
        }).catch(( error ) => {
            console.log(error.response.data);
        }); 
      }
    },
    computed: {
      getinvoices () {
       
        return this.indata
      },
  },
    props: ["dname"],
    mounted(){
    //   console.log(this.$store.state.contacts);
    this.indata = this.getdata();
    }
  }
</script>
<style scoped>
  .vue-tel-input{
      height: 58px;
      border-color: #9e9e9e;
  }
</style>
