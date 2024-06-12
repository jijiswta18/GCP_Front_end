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

            <template v-slot:[`item.statusRegisterName`]="{ item }" >
                <span :class="getColorClass(item.cancel_order === '11001' ? item.cancel_order : item.status_register)">
                    {{ item.cancel_order === '11001' ? item.cancelOrderName : item.statusRegisterName }}
                </span>
                <!-- <span :class="getColorClass(item.status_register)">{{ item.statusRegisterName }}</span> -->
            </template>
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
        datasExcel: [],
    }),
    create(){
    
    },
    computed:{
        formTitle () {
            return this.type === 'employee' ? 'อีเมล (ไม่ต้องเว้นวรรค), ชื่อ, นามสกุล, Reference N0 1, Reference N0 2' : 'อีเมล (ไม่ต้องเว้นวรรค)'
        },
    },
    watch: {
          datas(){
            this.datasExcel = this.datas
            console.log('==========>',this.datasExcel);
          }
        },
    methods: {
        exportToExcel() {

            const dataArray = this.datas

            // Extract only name and age from data array
            const extractedDataArray = dataArray.map(item => {
                const address               = item.company_address === null || item.company_address === '' ? '' : item.company_address 
                const subdistrictName       = item.subdistrict_id === null || item.subdistrict_id === '' ? '' : ' แขวง/ตำบล ' + item.subdistrictName 
                const districtName          = item.district_id === null || item.districtName === '' ? '' :  ' เขต/อำเภอ ' + item.districtName
                const provinceName          = item.province_id === null || item.province_id === '' ? '' : ' จังหวัด ' + item.provinceName 
                const postcode              = item.postcode === null || item.postcode === '' ? '' : 'รหัสไปรษณีย์' + item.postcode 
          
                const company_address       = address + subdistrictName + districtName + provinceName + postcode
                const check_course_other    = item.check_course_other === 1 ? 'เข้าร่วม' : 'ไม่เข้าร่วม'
                const name_th               = item.title_name === '10013' ? item.title_name_other : item.titleName + item.name_th + item.lastname_th
                const job_position          = item.job_position === '20008' ? item.job_position_other : item.jobPositionName
                const food_allergy          = item.food_allergy === '50001' ? item.food_allergy_detail : item.foodAllergyName
                const food                  = item.food === '70004' ? item.food_other : item.foodName
                const create_date           = moment(item.create_date).format("YYYY-MM-DD HH:mm:ss")
 
                
                return{ 
                    "ID": item.id, 
                    "วันเวลาที่ลงทะเบียน": create_date,
                    "ประเภทผู้สมัคร": item.registerTypeName,
                    "ประเภทหลักสูตร": item.course_name,
                    "ค่าลงทะเบียน": item.course_price,
                    "สนใจเข้าร่วมอบรมอบรมเชิงปฏิบัติการ หัวข้อ Data Analysis in Clinical Research Using R Programming": check_course_other,
                    "ชื่อภาษาไทย": name_th,
                    "คุณวุฒิการศึกษาสูงสุด": item.educationName,
                    "เบอร์โทรศัพท์": item.phone,
                    "เบอร์โทรศัพท์อื่น (กรณีติดต่อไม่ได้)": item.phone_other,
                    "อีเมล": item.email,
                    "รหัสพนักงาน": item.employee_id,
                    "ตำแหน่งงาน": job_position,
                    "ชื่อหน่วยงาน": item.company_name,
                    "ประสบการณ์ทำงาน (ปี)": item.work_experience,
                    "แพ้อาหาร": food_allergy,
                    "ประเภทอาหาร": food,
                    "ชื่อที่ใช้สำหรับออกใบเสร็จรับเงิน": item.receipt_name,
                    "เลขบัตรประชาชน/เลขประจำตัวผู้เสียภาษีอากร": item.id_card_number,
                    "ที่อยู่สถานที่ทำงานเลขที่":company_address,
                    "Reference No 1": item.reference_no_1,
                    "Reference No 2": item.reference_no_2,
                    "สถานะ": item.statusRegisterName,
                    "สถานะการออกใบเสร็จรับเงิน": item.statusReceiptName,
                };
            });

        

            const wb = XLSX.utils.book_new();

         
            const ws = XLSX.utils.json_to_sheet(extractedDataArray);


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
                case '11001':
                return 'text-danger';
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
        /* padding: 8px; */
        font-size: 16px!important;
        padding: 1rem 0.5rem!important;
        text-align: center !important;
    }
    .table-regislist td{
        border: 1px solid #ddd!important;
        padding: 1rem 0.5rem!important;
        font-size: 16px!important;
        vertical-align: middle;
    }
    .table-regislist thead{
        vertical-align: text-top;
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

