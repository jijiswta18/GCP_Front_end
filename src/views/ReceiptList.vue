<template>
     <div class="receiptlist">
  
        <h2 class="mb-3">ตรวจสอบการลงทะเบียน</h2>
        <div>
          <v-text-field
            v-model="search"
            label="อีเมล (ไม่ต้องเว้นวรรค), ชื่อ, นามสกุล, Reference N0 1, Reference N0 2"
            solo
            class="style-input-search"
            single-line
            hide-details="auto"
            clearable 
            dense
          
        >
            <template v-slot:prepend-inner>คำค้นหา / Keyword</template>
        </v-text-field>
        <br>
  
        <v-data-table
          :headers="headers"
          :items="datas"
          item-key="id"
          v-model="selectedItems"
          show-select
          :search="search"
          :footer-props="{itemsPerPageOptions: [5, 10, 20]}"
          class="table-regislist"
        >
       
        <template v-slot:[`item.select`]="{ item }">
            <v-checkbox
                v-model="selectedItems"
                :value="item"
                :input-value="item.id"
            ></v-checkbox>
            </template>
            <template v-slot:[`item.statusReceipt`]="{ item }" ><span :class="getColorClass(item.status_receipt)">{{ item.statusReceipt }}</span></template>
            <template v-slot:[`item.name`]="{ item }">{{ item.name_th }}  {{  item.lastname_th  }}</template>
            <template v-slot:[`item.create_date`]="{ item }">{{ formatDate(item.create_date) }}</template>
            <template v-slot:[`item.statusRegister`]="{ item }" ><span :class="getColorClass(item.status_register)">{{ item.statusRegister }}</span></template>
            <template v-slot:[`item.detail`]="{ item }">
                <div @click="detailRegister(item)" class="btn-detail">ข้อมูลการลงทะเบียน</div>
            </template>
        </v-data-table>
        
        </div>
        <!-- <RegisterList :headers="headers" :datas="datas" type="receipt"/> -->
        <v-row justify="center">
            <v-btn class="bg-green" @click="dialog = true">ออกใบเสร็จรับเงิน</v-btn>
        </v-row>

        <v-dialog
            v-model="dialog"
            width="500"
            class="dialog-search"
            >
            <v-card>
                <v-toolbar class="head-toolbar">
                    <v-toolbar-title >ออกใบเสร็จรับเงิน</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>


                  <v-container>
                    <v-row>
                      <v-col>
                        <h4 class="text-left pt-1 pb-1">ยืนยันออกใบเสร็จรับเงิน</h4>
                      </v-col>
                    </v-row>
                  </v-container>
                

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <div @click="dialog = false" class="btn-gray border-gray btn-receipt f-22 text-white mr-2">ปิด</div>
                  <!-- <v-btn
                 
                    variant="plain"
                    @click="dialog = false"
                    class="btn-gray"
                  >ปิด</v-btn> -->

                  <div  class="btn-success btn-receipt f-22 text-gray mr-2">ออกใบเสร็จรับเงิน</div>
                  <!-- <v-btn class="btn-success pt-2 pb-2"><span class="f-22 text-white">ออกใบเสร็จรับเงิน</span></v-btn>
                  <v-btn class="btn-success pt-2 pb-2"><span class="f-22 text-white">ออกใบเสร็จรับเงิน</span></v-btn> -->
                </v-card-actions>
            </v-card>
        </v-dialog>

     </div>
    
</template>
<script>
// import RegisterList from '@/components/RegisterList.vue';
import axios from 'axios';
import moment from 'moment';


export default {
    // components: {RegisterList},
    data: () => ({

      search: '',
      selectedItems: [],
      selectAll: false,
      headers: [

          // { text: '', align: 'center', value: 'select' },
          { text: 'สถานะออกใบเสร็จรับเงิน', align: 'center', value: 'statusReceipt' },
          { text: '', align: 'center', value: 'detail' },
          { text: 'ID', align: 'center', value: 'id' },
          { text: 'วันเวลาที่ลงทะเบียน', align: 'center', value: 'create_date' },
          { text: 'ชื่อ', align: 'left', value: 'name' },
          { text: 'สถานะ', align: 'center', value: 'statusRegister' },
          { text: 'Reference No 1', align: 'center', value: 'reference_no_1' },
          { text: 'Reference No 2', align: 'center', value: 'reference_no_2' },
      ],
      datas: [],
      dialog: false
    }),
    watch: {
    selectAll(value) {
     
      if (value) {
        this.selectedItems = [...this.datas];
        console.log(this.selectedItems );
      } else {
        this.selectedItems = [];
      }
    },
    selectedItems() {
      if (this.selectedItems.length === this.datas.length) {
        console.log(this.selectedItems);
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
  },
    mounted(){
      this.fechstatusRegisterReceipt()
    },
    methods: {
      
      async fechstatusRegisterReceipt(){

        try {
          const statusRegisterReceiptPath = `/api_gcp/Register/statusRegisterReceipt`

          const response = await axios.get(`${statusRegisterReceiptPath}`)

          console.log(response.data.data);

          this.datas = response.data.data
        


        } catch (error) {
            console.log('register', error);
        }

      },
      detailRegister(value){
            this.$router.push({ name: 'registration-detail', params: { id: value.id }})
        },
        formatDate(value) {
            return moment(value).format("YYYY-MM-DD HH:mm:ss")
        },
        getColorClass (value) {

            switch (value) {
                case '12001':
                return 'text-gray';
                case '12002':
                return 'text-gray';
                case '12003':
                return 'text-success';
                case '12004':
                return 'text-success';
                case '13001':
                return 'text-gray';
                case '13002':
                return 'text-success';
                default:
                return '';
            }
        },
        dialogReceipt(){
          this.dialog = true
        }
    }
}

</script>

<style>
 .style-input-search .v-input__slot {
  padding-left: 0!important;
  height: 42px;
  background: transparent;
  box-shadow: none!important;
  border: 1px solid #ced4da;
}
.style-input-search .v-input__slot .v-input__prepend-inner{
    margin-top: 0!important;
    height: 40px;
    align-items: center;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    margin-right: .375rem;
    padding: .375rem .75rem;
}
.table-regislist th {
    border: 1px solid #ddd!important;
    padding: 8px;
    font-size: 16px!important;
}
.table-regislist th span{
  color: #000;
}
.table-regislist td{
    border: 1px solid #ddd!important;
    padding: 8px;
    font-size: 16px!important;
    vertical-align: middle;

}


.table-regislist tr:hover {background-color: #ddd;}

.table-regislist th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #f8f9fa;
    color: white;
}
.receiptlist  button span{
font-size: 18px;
}
.head-toolbar{
  box-shadow: none!important;
  border-bottom: 1px solid #cccccc!important;
}
.btn-receipt{
    border-radius: 3px;
    padding: 0.25rem 1rem;
    cursor: pointer;
}
</style>