<template>
    <div class="regisDetail">
        <v-card class="pd-125">
            <!-- <pre>  {{ data }}</pre> -->
          
            <h2 class="mb-3 d-flex">ข้อมูลผู้ลงทะเบียน | <div class="text-warning ml-2 cursor-pointer" @click="editRegister"> แก้ไขข้อมูล</div></h2>
            <v-row>
                <v-col>
                    <!-- <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ลงทะเบียนเข้าร่วมประชุม</div>
                    <div class="box-meet">
                        <p><span class="text-warning">ประเภทผู้สมัคร : </span>{{ data.registerTypeName }}</p>  
                        <p><span class="text-warning">รายการที่ต้องการสมัคร : </span></p>  
                     
                    </div> -->
                    <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลรายละเอียดผู้สมัคร </div>
                    <div class="box-profile">
                        <p><span class="text-warning">คำนำหน้า : </span> {{  data.titleName  }}</p>   
                        <p><span class="text-warning">ชื่อ - นามสกุล (ภาษาไทย) : </span> {{ data.name_th }}</p>   
                        <p><span class="text-warning">ชื่อ - นามสกุล (ภาษาอังกฤษ): </span> {{ data.name_en }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">คุณวุฒิการศึกษาสูงสุด : </span> {{ data.educationName }}</p>   
                    </div>
                    <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลการติดต่อ</div>
                    <div class="box-contact">
                        <p v-if="data.register_type === '40002'"><span class="text-warning">ชื่อที่ใช้สำหรับออกใบเสร็จรับเงิน : </span> {{ data.phone }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">เลขบัตรประชาชน/เลขประจำตัวผู้เสียภาษีอากร : </span> {{ data.id_card_number }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">ที่อยู่สถานที่ทำงานเลขที่ : </span> {{ data.company_address }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">จังหวัด : </span> {{ data.provinceName }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">เขต/อำเภอ : </span> {{ data.districtName }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">แขวง/ตำบล : </span> {{ data.subdistrictName }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">รหัสไปรษณีย์ : </span> {{ data.postcode }}</p>   
                        <p><span class="text-warning">เบอร์โทรศัพท์มือถือ : </span> {{ data.phone }}</p>   
                        <p><span class="text-warning">เบอร์โทรศัพท์อื่น (กรณีติดต่อไม่ได้) : </span> {{ data.phone_other }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">อีเมล : </span> {{ data.email }}</p>   
                    </div>
                    
                    <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลการทำงาน</div>
                    <div class="box-datareceipt">
                        <p v-if="data.register_type === '40001'"><span class="text-warning">รหัสพนักงาน : </span> {{ data.employee_id }}</p>  
                        <p><span class="text-warning">ตำแหน่งงาน : </span> {{ data.jobPositionName }}</p>  
                        <p v-if="data.register_type === '40001'"><span class="text-warning">ชื่อหน่วยงาน : </span> {{ data.company_name }}</p> 
                        <p v-if="data.register_type === '40002'"><span class="text-warning">ประสบการณ์ทำงาน (ปี) : </span> {{ data.work_experience }}</p> 
                    </div>

                    <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลอื่น ๆ</div>
                    <div class="box-datareceipt">
                        <p><span class="text-warning">แพ้อาหาร</span> {{ data.foodAllergyName }}</p>  
                        <p  v-if="data.register_type === '50001'"><span class="text-warning">อาหารที่มีอาการแพ้ : </span> {{ data.food_allergy_detail }}</p>  
                        <p><span class="text-warning">ประเภทอาหาร : </span> {{ data.foodName }}</p>  
                    </div>

                    <div v-if="data.register_type === '40002'" class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลใบเสร็จรับเงิน</div>
                    <div v-if="data.register_type === '40002'" class="box-invoice">
                        <p><span class="text-warning">ประเภทข้อมูลใบเสร็จรับเงิน :</span></p>  
                        <div class="d-flex align-items-center">
                            <img v-if="data.confirm_receipt" class="w-30 pr-2" src="@/assets/images/checkbox-checked.svg"/>
                            <img v-else  class="w-30 pr-2" src="@/assets/images/checkbox-unchecked.svg"/>
                            
                            <span>มีความประสงค์ต้องการใบเสร็จรับเงิน</span>
                        </div>
                        <div class="d-flex align-items-center">
                            <img v-if="data.confirm_receipt" class="w-30 pr-2" src="@/assets/images/checkbox-unchecked.svg"/>
                            <img v-else class="w-30 pr-2" src="@/assets/images/checkbox-checked.svg"/>
                            <span>ไม่ต้องการใบเสร็จรับเงิน</span>
                        </div>
                    </div>
                </v-col>

                <v-col>
                    <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลการชำระเงิน</div>
                    <div class="box-receipt">
                        <div class="d-flex" v-if="data.register_type !== '40001'"><h1>พิมพ์ใบชำระเงิน : <img class="w-60" src="@/assets/images/pdf.png" @click="printPayment"/></h1></div>
                        <p><span>สถานะ : </span><span :class="getColorClass(data.status_register)">{{ data.statusRegisterName }}</span></p>   
                        <p  v-if="data.register_type === '40002'"><span class="text-warning">ค่าลงทะเบียน : </span> {{  data.course_price | formatNumber}} บาท</p> 
                        <p  v-else><span class="text-warning">ค่าลงทะเบียน : </span>{{  data.course_price }}</p>   
                        <p><span class="text-warning">ประเภทผู้สมัคร : </span>{{ data.registerTypeName }}</p>   
                        <p><span class="text-warning">รายการที่ต้องการสมัคร : </span>
                            <ul>
                                <li>{{data.course_name}}</li>
                                <li>อบรมเชิงปฏิบัติการ หัวข้อ "Data Analysis in Clinical Research Using R Programming  วันที่ 26 กรกฏาคม 2567 </li>
                            </ul>
                        </p>   
                        <p><span>เข้าร่วมอบรม : </span>{{ data.course_name }}</p>   
                        <p><span>กำหนดชำระเงินภายใน : </span><span class="text-danger">{{ data.end_date }}</span></p>     
                        <p><span>สถานะออกใบเสร็จรับเงิน : </span><span :class="getColorClass(data.status_receipt)">{{ data.statusReceiptName }}</span></p>   
                    </div>
                    <v-card class="pd-125 mb-6">
                        <h2   class="mb-3 text-center">เมนูอัพเดทสถานะ</h2>
                        <div v-if="data.register_type === '40001' && data.status_register === '12002'" class="btn-blue text-white text-center py-3 px-3 mb-3 f-22 cursor-pointer" @click="dialogApprove = true">อนุมัติ</div>
                        <div v-if="data.register_type === '40002' && data.register_type === '12001' " class="btn-success text-center py-3 px-3 mb-3 f-22 cursor-pointer" @click="updateStatusRegister('12003')">ยืนยันชำระเงิน</div>
                        <div v-if="data.register_type === '40002'" class="border-gray text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="dialogRefund = true">คืนค่าการยืนยันชำระเงิน</div>
                        <div class="btn-danger text-white text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="dialogCancelOrder = true">ยกเลิกการลงทะเบียน</div>
                    </v-card>
                    <v-card class="pd-125"  v-if="data.register_type === '40002'" >
                        <h2   class="mb-3 text-center">เมนูข้อมูลใบเสร็จรับเงิน</h2>
                        <div class="btn-blue text-white text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="previewReceipt">พรีวิวข้อมูลใบเสร็จรับเงิน</div>
                        <div class="btn-warning text-white text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="editReceipt">แก้ไขข้อมูลใบเสร็จรับเงิน</div>
                        <div class="btn-danger text-white text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="dialogCancelReceipt = true">ยกเลิกใบเสร็จรับเงิน</div>
                        <div v-if="data.status_register === '12003'" class="btn-success text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="dialogReceipt = true">ออกใบเสร็จรับเงิน</div>
                    </v-card>
                </v-col>

            </v-row>
        </v-card>   

            <!-- อนุมัติ -->
        <v-dialog
            v-model="dialogApprove"
            width="500"
            class="dialog-search"
            >
            <v-card>
                <v-toolbar class="head-toolbar">
                    <v-toolbar-title >ยืนยันอนุมัติ</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogApprove = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>


                  <v-container>
                    <v-row>
                      <v-col>
                        <h4 class="text-left pt-1 pb-1">ยืนยันอนุมัติ</h4>
                      </v-col>
                    </v-row>
                  </v-container>
                

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <div @click="dialogRefund = false" class="btn-gray  btn-receipt f-22 text-white mr-2">ปิด</div>
                
                  <div  class="btn-blue btn-receipt f-22 text-white mr-2" @click="updateStatusRegister('12004')">อนุมัติ</div>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <!-- คืนค่าการชำระเงิน -->
        <v-dialog
            v-model="dialogRefund"
            width="500"
            class="dialog-search"
            >
            <v-card>
                <v-toolbar class="head-toolbar">
                    <v-toolbar-title >ยืนยันคืนค่าการยืนยันชำระเงิน</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogRefund = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>


                  <v-container>
                    <v-row>
                      <v-col>
                        <h4 class="text-left pt-1 pb-1">ยืนยันคืนค่าการยืนยันชำระเงิน</h4>
                      </v-col>
                    </v-row>
                  </v-container>
                

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <div @click="dialogRefund = false" class="btn-gray  btn-receipt f-22 text-white mr-2">ปิด</div>
                
                  <div  class="border-gray btn-receipt f-22 text-drak mr-2">คืนค่าการยืนยันชำระเงิน</div>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <!-- ออกใบเสร็จ -->
        <v-dialog
            v-model="dialogReceipt"
            width="500"
            class="dialog-search"
            >
            <v-card>
                <v-toolbar class="head-toolbar">
                    <v-toolbar-title >ออกใบเสร็จรับเงิน</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogReceipt = false">
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

                  <div @click="dialogReceipt = false" class="btn-danger btn-receipt f-22 text-white mr-2">ยกเลิก</div>
                
                  <div class="btn-success btn-receipt f-22 text-drak mr-2" @click="createReceipt">ออกใบเสร็จรับเงิน</div>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- ยกเลิกลงทะเบียน -->
        <v-dialog
            v-model="dialogCancelOrder"
            width="500"
            class="dialog-search"
            >
            <v-card>
                <v-toolbar class="head-toolbar">
                    <v-toolbar-title >ยกเลิกการลงทะเบียน</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogCancelOrder = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>


                  <v-container>
                    <v-row>
                      <v-col>
                        <h4 class="text-left pt-1 pb-1">ยืนยันยกเลิกการลงทะเบียน</h4>
                      </v-col>
                    </v-row>
                  </v-container>
                

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <div @click="dialogCancelOrder = false" class="btn-gray btn-receipt f-22 text-white mr-2">ปิด</div>
                
                  <div @click="updateStatusRegister('11001')" class="btn-danger btn-receipt f-22 text-white mr-2">ยกเลิกลงทะเบียน</div>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- ยกเลิกใบเสร็จรับเงิน -->
        <v-dialog
            v-model="dialogCancelReceipt"
            width="500"
            class="dialog-search"
            >
            <v-card>
                <v-toolbar class="head-toolbar">
                    <v-toolbar-title >ยกเลิกใบเสร็จรับเงิน</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogCancelReceipt = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>


                  <v-container>
                    <v-row>
                      <v-col>
                        <h4 class="text-left pt-1 pb-1">ยืนยันยกเลิกใบเสร็จรับเงิน</h4>
                      </v-col>
                    </v-row>
                  </v-container>
                

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <div @click="dialogCancelReceipt = false" class="btn-gray btn-receipt f-22 text-white mr-2">ปิด</div>
                
                  <div  class="btn-danger btn-receipt f-22 text-white mr-2" @click="cancelReceipt">ยกเลิกใบเสร็จรับเงิน</div>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import store from '../store/index.js';


export default{
    data: () =>({
        data: {},
        user: store.getters.user,
        dialogApprove: false,
        dialogRefund: false,
        dialogReceipt: false,
        dialogCancelOrder: false,
        dialogCancelReceipt: false,
    }),
    filters: {
        formatNumber(value) {
        return new Intl.NumberFormat().format(value)
        }
    },
    mounted(){
        this.fechRegisterById();
    },
    methods:{
        async fechRegisterById(){

            try {

                // const formatter = new Intl.NumberFormat('en-US');
                const formattedEndDate          = moment(this.data.end_date).format('DD-MM-YYYY');
                const registerByIdPath          = `/api_gcp/Register/getRegisterById`
                const response                  = await axios.get(`${registerByIdPath}/` + this.$route.params.id)
                const datas                     = response.data.data[0]

                
                // const formattedAmount           = formatter.format(datas.course_price);

                this.data                       = datas
                this.data.name_th               = `${datas.name_th} ` + `${datas.lastname_th}`  
                this.data.name_en               = `${datas.name_en} ` + `${datas.lastname_en}`  
                this.data.titleName             = datas.title_name_other !== null ? datas.title_name_other : datas.titleName
                this.data.jobPositionName       = datas.job_position_other !== null ? datas.job_position_other : datas.jobPositionName
                this.data.foodName              = datas.food_other !== null ? datas.food_other : datas.foodName
                this.data.end_date              = formattedEndDate
                // this.data.course_price          = formattedAmount

            } catch (error) {
                console.log('fechRegisterById', error);
            }
         },

                
        async updateStatusRegister(status){
            try {
             
                let currentDate = moment();
            
                let fd = {
                    "register_id"       : this.data.id,
                    "status_register"   : status,
                    "modified_by"       : this.user.employee_id,
                    "modified_date"     : currentDate.format('YYYY-MM-DD HH:mm:ss')
                }

                console.log(fd);

                let updateStatusRegisterPath = `/api_gcp/Register/updateStatusRegister`

                await axios.post(`${updateStatusRegisterPath}`, fd)

                Swal.fire('บันทึกข้อมูลเรีบร้อยเเล้ว', '', 'success')

                this.dialogApprove = false

                this.$router.push({ name: 'RegisterListView' });

                } catch (error) {
                    console.log('updateStatusRegister', error);
                }
        },

        async createReceipt(){

            const fdCreateReceipt = {

                "master_id"     : "5",
                "project_code"  : "0041",
                "price"         : this.data.course_price,
                "reference_1"   : this.data.reference_no_1,
                "reference_2"   : this.data.reference_no_2,
                "name"          : this.data.receipt_name,    
                "id_card_number": this.data.id_card_number,
                "address"       : this.data.company_address,  
                "province"      : this.data.province_id,
                "district"      : this.data.district_id,
                "sub_district"  : this.data.subdistrict_id,
                "zip_code"      : this.postcode,
                "admin_id"      : this.user.employee_id
            
            }


            try {

            const createReceiptPath          = `/api/create_receipt`
            await axios.post(`${createReceiptPath}`, `${fdCreateReceipt}`)


            } catch (error) {
                console.log('createReceipt', error);   
            }
      
        },

        editReceipt(){
            const encryptedData = this.getreceiptData();
            this.$router.push({ name: 'receipt', params: { receiptData: encryptedData }});
        },


        async cancelReceipt(){

            const fdCencelReceipt = {
                "reference_1"           : this.data.reference_no_1,
                "reference_2"           : this.data.reference_no_2,
                "payment_type_code"     : "01",
                "admin_id"              : this.user.employee_id
            }

            try {
                const cancelReceiptPath  = `/api/cancel_receipt`
                await axios.post(`${cancelReceiptPath}`, `${fdCencelReceipt}`)
            
            } catch (error) {
                console.log('cacelReceipt', error);
            }
        },


        editRegister(){
            console.log(this.data.id);
            this.$router.push({name: 'registration-edit', params: { id: this.data.id}})
        },  
        printPayment(){

            const formattedStartDate    = moment(this.data.create_date).format('DD-MM-YYYY');
            const startDate             = formattedStartDate.replace(/-/g, "");
            const endDate               = this.data.end_date.replace(/-/g, "");
            const name                  = this.data.name_th
            const referenceOne          = this.data.reference_no_1
            const referencetwo          = this.data.reference_no_2
            const coursePrice           = this.data.course_price

            console.log(startDate);
            console.log(endDate);
            console.log(name);
            console.log(referenceOne);
            console.log(referencetwo);
            console.log(coursePrice);

            let url = `https://fsrx.cra.ac.th/CRAServices/payment/sis_payslip/16/${startDate}/${endDate}/${name}/${referenceOne}/${referencetwo}/${coursePrice}`;

            window.open(url, '_blank');

        },

  
        previewReceipt(){

            // const receiptData = { 
            //     id: this.data.id, 
            //     reference_no_1: this.data.reference_no_1, 
            //     reference_no_2: this.data.reference_no_1,   
            // };

            // const key = 'yourSecretKey'; // คีย์สำหรับการเข้ารหัส

            // // Encrypt the receipt data
            // const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(receiptData), key).toString();

            const encryptedData = this.getreceiptData();

            // Pass the encrypted data as a route parameter
            this.$router.push({ name: 'ReceiptDetail', params: { receiptData: encryptedData }});

        },

    

        getreceiptData(){
            
            const receiptData = { 
                id: this.data.id, 
                reference_no_1: this.data.reference_no_1, 
                reference_no_2: this.data.reference_no_1,   
            };

            const key = 'yourSecretKey'; // คีย์สำหรับการเข้ารหัส

            // Encrypt the receipt data
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(receiptData), key).toString();

            return encryptedData
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
                case '11001':
                return 'text-danger';
                case '11002':
                return 'text-gray';
                default:
                return '';
            }
        }


    }
}

</script>
<style>
    .pd-125{
     padding: 1.25rem;
    }
    .btn-danger{
        background-color: #dc3545!important;
        border-color: #dc3545!important;
    }
    .btn-blue{
        background-color: #243C7F;
        background-color: #243C7F;
    }
    .btn-warning{
        background-color: #F36C22!important;
        border-color: #F36C22!important;
    }
    .w-30{
        width: 30px;
    }
    .w-60{
        width: 60px;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .border-gray{
        border: 1px solid #cccccc;
    }


</style>