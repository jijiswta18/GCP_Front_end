<template>
    <div>

        <div class="box-excel d-flex mt-3">
          <h3>ทั้งหมด {{ datas.length }} รายการ | </h3>
          <div class="ml-2"  @click="exportToExcel"><img src="@/assets/images/excel.webp"/></div>
        </div>

        <br>
        
        <v-data-table
            :headers="headers"
            :items="datas"
            item-key="id"
            v-model="selectedItems"
            :search="search"
            :footer-props="{itemsPerPageOptions: [5, 10, 20]}"
            class="table-regislist"
        >
       
            <template v-slot:[`item.name`]="{ item }">{{ item.name_th }}  {{  item.lastname_th  }}</template>
            <template v-slot:[`item.create_date`]="{ item }">{{ formatDate(item.create_date) }}</template>
            <template v-slot:[`item.statusRegisterName`]="{ item }" ><span :class="getColorClass(item.status_register)">{{ item.statusRegisterName }}</span></template>
            <template v-slot:[`item.detail`]="{ item }">
                <div @click="checkRegister(item, type)" class="btn-detail">ข้อมูลการลงทะเบียน</div>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import moment from 'moment';
    import CryptoJS from 'crypto-js';
    import * as XLSX from 'xlsx';
    export default {
    props: ['headers', 'datas', 'type', 'search'],
    data: () => ({
        // search: '',
        selectedItems: [],
    }),
    create(){
    
    },
    computed:{
        formTitle () {
            return this.type === 'employee' ? 'อีเมล (ไม่ต้องเว้นวรรค), ชื่อ, นามสกุล, Reference N0 1, Reference N0 2' : 'อีเมล (ไม่ต้องเว้นวรรค)'
        },
    },
    watch: {},
    methods: {
        exportToExcel() {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(this.datas);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            /* generate XLSX file and send to client */
            XLSX.writeFile(wb, 'รายงานข้อมูลผู้ลงทะเบียน.xlsx');
        },
        async checkRegister(value, type){

            let check = ''
            if(value.register_type === '40001'){
                check = value.employee_id
            }else{
                check = value.email
            }

  
            if(type === 'employee'){

                    const registerId = { id: value.id};

                    const key = 'yourSecretKey'; // คีย์สำหรับการเข้ารหัส

                    // Encrypt the receipt data
                    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(registerId), key).toString();

                    this.$router.push({ name: 'registration-detail', params: { id: encryptedData }})
            }else{
                try {
                    const { value: checkPhone } = await Swal.fire({
                        title: "ยืนยันเบอร์โทรศัพท์มือถือ",
                        input: "text",
                        inputAttributes: {
                            autocapitalize: "off"
                        },
                        showCancelButton: true,
                        confirmButtonText: "ยืนยัน",
                        cancelButtonText: "ยกเลิก",
                        showLoaderOnConfirm: true,
                        preConfirm: async (checkPhone) => {
                            try {
                                const CheckPhonepath = `/api_gcp/Register/checkPhone`;
                                const response = await axios.get(CheckPhonepath, { params: { phone: checkPhone, email : check } });
                                
                            
                                // console.log(response.exists.success);
                                if (!response.data.success) {
                                    return Swal.showValidationMessage("ข้อมูลไม่ถูกต้อง");
                                }
                                
                                return response.data;
                            } catch (error) {
                                throw new Error(`Request failed: ${error}`);
                            }
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                    });

                    if (checkPhone) {

                        const id = checkPhone.data[0].id

                        const registerId = { id: id};

                        const key = 'yourSecretKey'; // คีย์สำหรับการเข้ารหัส

                        // Encrypt the receipt data
                        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(registerId), key).toString();

                        this.$router.push({ name: 'registration-detail', params: { id: encryptedData }})
                        

                        // this.$router.push({ name: 'registration-detail', params: { id: id}})
                
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: error.message
                    });
                } 
            }
       
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
                default:
                return '';
            }
        },
    },
    
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
        /* border: 1px solid #ced4da; */
        margin-right: .375rem;
        padding: .375rem .75rem;
    }
    .btn-detail{
        background-color: #243C7F;
        border-radius: 5px;
        padding: 0.5rem;
        color: white;
        display: inline-block;
    }
    .table-regislist th {
        border: 1px solid #ddd!important;
        padding: 8px;
        font-size: 16px!important;
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
 

</style>

