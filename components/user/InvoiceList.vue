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
            <invoice-about :serial="item.serialcode" :about="item.about" :active="item.active"></invoice-about>
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
          { text: 'Customer name', value: 'customer_name' , sortable: true},
          { text: 'Customer email', value: 'customer_email' , sortable: true},
          { text: 'Customer phone', value: 'customer_phone' , sortable: true},
          { text: 'Amount', value: 'amount' , sortable: true},
          { text: 'Payable', value: 'payable' , sortable: true},
          { text: 'Paid', value: 'paid' , sortable: true},
          { text: 'Times paid', value: 'timespaid' , sortable: true},
          { text: 'Threshold', value: 'threshold' , sortable: true},
          { text: 'Completed', value: 'completed' , sortable: true},
          { text: 'Time Created', value: 'created_at' , sortable: true},

        //   { text: 'Iron (%)', value: 'iron' },
        ],
      }
    },
    methods: {
      
    },
    computed: {
      getinvoices () {
        return [
          {   serialcode: '#ddci073992',
              customer_name : 'Ahamba',
              customer_email: 'ahambasolomo800@gmail.com',
              customer_phone: '2349026192',
              amount: 10000,
              payable: 10000,
              about: " uae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur ",
              threshold: 100,
              active: true,
              type: 'One',
              paid: 10000,
              completed: false,
              created_at: '2020-07-27 20:03:32'
          },
          {   serialcode: '#ddc1232994',
              customer_name : 'A solomon',
              customer_email: 'asolomo800@gmail.com',
              customer_phone: '2349034426192',
              amount: 10000,
              payable: 10000,
              about: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
              threshold: 100000,
              active: false,
              type: 'One',
              paid: 10000,
              completed: true,
              created_at: '2020-07-27 20:03:32'
          },
          {   serialcode: '#ddci083282',
              customer_name : 'Allen walker',
              customer_email: 'ahamomo800@gmail.com',
              customer_phone: '2349034423392',
              amount: 10000,
              payable: 10000,
              about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              threshold: 100000,
              active: false,
              type: 'One',
              paid: 10000,
              completed: false,
              created_at: '2020-07-27 20:03:32'
          },
        ];
      },
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
