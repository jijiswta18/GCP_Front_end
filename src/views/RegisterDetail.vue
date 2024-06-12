<template>
    <div class="regisDetail">
        <v-card class="pd-125">

            <h2 class="mb-3 d-flex">ข้อมูลผู้ลงทะเบียน | <div class="text-warning ml-2 cursor-pointer" @click="editRegister"> แก้ไขข้อมูล</div></h2>
            <v-row>
            
                <v-col>
                    <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลรายละเอียดผู้สมัคร </div>
                    <div class="box-profile">
                        <p><span class="text-warning">คำนำหน้า : </span> {{  data.titleName  }}</p>   
                        <p><span class="text-warning">ชื่อ - นามสกุล (ภาษาไทย) : </span> {{ data.name_th }}</p>   
                        <p><span class="text-warning">ชื่อ - นามสกุล (ภาษาอังกฤษ): </span> {{ data.name_en }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">คุณวุฒิการศึกษาสูงสุด : </span> {{ data.educationName }}</p>   
                    </div>
                    <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลการติดต่อ</div>
                    <div class="box-contact">
                        <p v-if="data.register_type === '40002'"><span class="text-warning">ชื่อที่ใช้สำหรับออกใบเสร็จรับเงิน : </span> {{ data.receipt_name }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">เลขบัตรประชาชน/เลขประจำตัวผู้เสียภาษีอากร : </span> {{ data.id_card_number }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">ที่อยู่สถานที่ทำงานเลขที่ : </span> {{ data.company_address }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">จังหวัด : </span> {{ data.provinceName }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">เขต/อำเภอ : </span> {{ data.districtName }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">แขวง/ตำบล : </span> {{ data.subdistrictName }}</p>   
                        <p v-if="data.register_type === '40002'"><span class="text-warning">รหัสไปรษณีย์ : </span> {{ data.postcode }}</p>   
                        <p><span class="text-warning">เบอร์โทรศัพท์มือถือ : </span> {{ data.phone }}</p>   
                        <p><span class="text-warning">เบอร์โทรศัพท์อื่น (กรณีติดต่อไม่ได้) : </span> {{ data.phone_other }}</p>   
                        <p><span class="text-warning">อีเมล : </span> {{ data.email }}</p>   
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
                                <li v-if="data.check_course_other === 1">อบรมเชิงปฏิบัติการ หัวข้อ "Data Analysis in Clinical Research Using R Programming  วันที่ 26 กรกฏาคม 2567 </li>
                            </ul>
                        </p>   
                        <p><span>เข้าร่วมอบรม : </span>{{ data.course_name }}</p>   
                        <p v-if="data.register_type === '40002'"><span>กำหนดชำระเงินภายใน : </span><span class="text-danger">{{ data.end_date }}</span></p>     
                        <p v-if="data.register_type === '40002'"><span>สถานะออกใบเสร็จรับเงิน : </span><span :class="getColorClass(data.status_receipt)">{{ data.statusReceiptName }}</span></p>   
                    </div>
                    <v-card v-if="user != null" class="pd-125 mb-6">
                        <h2 class="mb-3 text-center">เมนูอัพเดทสถานะ</h2>
                        
                        
                        <div v-if="user?.approve_employee && data.status_register === '12002' && data.cancel_order === '11002'"  class="btn-blue text-white text-center py-3 px-3 mb-3 f-22 cursor-pointer" @click="dialogApprove = true">อนุมัติ</div>
                        <div v-if="user?.approve_receipt && data.status_register === '12001' && data.register_type === '40002'" class="btn-success text-center py-3 px-3 mb-3 f-22 cursor-pointer" @click="dialogConfirmReceipt = true">ยืนยันชำระเงิน</div>
                        <div v-if="user?.refund_receipt && data.register_type === '40002' && data.status_register === '12003'" class="border-gray text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="dialogRefund = true">คืนค่าการยืนยันชำระเงิน</div>
                        <div v-if="user?.cancel_register && data.cancel_order === '11002'" class="btn-danger text-white text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="dialogCancelOrder = true">ยกเลิกการลงทะเบียน</div>
                        <div v-if="user?.refund_register && data.cancel_order === '11001'" class="border-gray text-center py-3 px-3 mb-3 cursor-pointer f-22"  @click="dialogRefundOrder = true">คืนค่าการลงทะเบียน</div>
                    </v-card>
                    <v-card class="pd-125" v-if="user != null && data.register_type === '40002' && data.status_register === '12003'">
                        <h2  class="mb-3 text-center">เมนูข้อมูลใบเสร็จรับเงิน</h2>
                        <div v-if="user?.preview_receipt && data.status_receipt === '13002'" class="btn-blue text-white text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="previewReceipt">พรีวิวข้อมูลใบเสร็จรับเงิน</div>
                        <div v-if="user?.edit_receipt && data.status_receipt === '13002'" class="btn-warning text-white text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="editReceipt">แก้ไขข้อมูลใบเสร็จรับเงิน</div>
                        <div v-if="user?.cancel_receipt && data.status_receipt === '13002'" class="btn-danger text-white text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="dialogCancelReceipt = true">ยกเลิกใบเสร็จรับเงิน</div>
                        <div v-if="user?.receive_receipt && data.status_register === '12003' && data.status_receipt === '13001'" class="btn-success text-center py-3 px-3 mb-3 cursor-pointer f-22" @click="dialogReceipt = true">ออกใบเสร็จรับเงิน</div>
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
                
                  <div  class="btn-blue btn-receipt f-22 text-white mr-2" @click="updateStatusRegister('12004', data.cancel_order)">อนุมัติ</div>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <!-- ยืนยันชำระเงิน -->
        <v-dialog
            v-model="dialogConfirmReceipt"
            width="500"
            class="dialog-search"
            >
            <v-card>
                <v-toolbar class="head-toolbar">
                    <v-toolbar-title >ยืนยันชำระเงิน</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogConfirmReceipt= false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>


                  <v-container>
                    <v-row>
                      <v-col>
                        <h4 class="text-left pt-1 pb-1">ยืนยันชำระเงิน</h4>
                      </v-col>
                    </v-row>
                  </v-container>
                

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <div @click="dialogRefund = false" class="btn-gray  btn-receipt f-22 text-white mr-2">ปิด</div>
                
                  <div  class="btn-success btn-receipt f-22 text-dark mr-2" @click="updateStatusRegister('12003', data.cancel_order)">ยืนยันชำระเงิน</div>
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
                
                  <div @click="updateStatusRegister('12001', data.cancel_order)" class="border-gray btn-receipt f-22 text-drak mr-2">คืนค่าการยืนยันชำระเงิน</div>
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
                
                  <div @click="updateStatusRegister(0 ,'11001', data.register_type)" class="btn-danger btn-receipt f-22 text-white mr-2">ยกเลิกลงทะเบียน</div>
                </v-card-actions>
            </v-card>
        </v-dialog>

          <!-- คืนค่าการทะเบียน -->
          <v-dialog
            v-model="dialogRefundOrder"
            width="500"
            class="dialog-search"
            >
            <v-card>
                <v-toolbar class="head-toolbar">
                    <v-toolbar-title >คืนค่าการลงทะเบียน</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogRefundOrder = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>


                  <v-container>
                    <v-row>
                      <v-col>
                        <h4 class="text-left pt-1 pb-1">ยืนยันคืนค่าการลงทะเบียน</h4>
                      </v-col>
                    </v-row>
                  </v-container>
                

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <div @click="dialogRefundOrder = false" class="btn-gray  btn-receipt f-22 text-white mr-2">ปิด</div>
                
                  <div @click="updateStatusRegister(0 ,'11002', data.register_type)" class="border-gray btn-receipt f-22 text-drak mr-2">คืนค่าการลงทะเบียน</div>
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
        dialogConfirmReceipt: false,
        dialogRefund: false,
        dialogReceipt: false,
        dialogCancelOrder: false,
        dialogCancelReceipt: false,
        dialogRefundOrder: false,
        registerId: {},
        loading: false
    }),
    filters: {
        formatNumber(value) {
        return new Intl.NumberFormat().format(value)
        }
    },
    mounted(){
        const encryptedData     = this.$route.params.id; // รับค่า receiptData จากพารามิเตอร์ใน URL
        const key               = 'yourSecretKey'; // คีย์สำหรับถอดรหัส 
        const bytes             = CryptoJS.AES.decrypt(encryptedData, key); // ใช้ CryptoJS ในการถอดรหัส
        const decryptedData     = bytes.toString(CryptoJS.enc.Utf8); // เก็บข้อมูลที่ถอดรหัสไว้ในตัวแปร decryptedData
        this.registerId        = JSON.parse(decryptedData);
        this.fechRegisterById();
    },
    methods:{
        async fechRegisterById(){

            try {

                this.loading = true;
                const registerByIdPath          = `/api_gcp/Register/getRegisterById`
                const response                  = await axios.get(`${registerByIdPath}/` + this.registerId.id)
                const datas                     = response.data.data[0]
                const formattedEndDate          = moment(datas.end_date).format('DD-MM-YYYY');
                this.data                       = datas
                this.data.name_th               = `${datas.name_th} ` + `${datas.lastname_th}`  
                this.data.name_en               = `${datas.name_en} ` + `${datas.lastname_en}`  
                this.data.titleName             = `${datas.title_name_other  === '' || datas.title_name_other  === null ? datas.titleName : datas.title_name_other}`
                this.data.jobPositionName       = `${datas.job_position_other  === '' || datas.job_position_other  === null ? datas.jobPositionName : datas.job_position_other}`
                this.data.foodName              = `${datas.food_other  === '' || datas.food_other  === null ? datas.foodName : datas.food_other}`
                this.data.end_date              = formattedEndDate

            } catch (error) {
                console.log('fechRegisterById', error);
            }finally {
                this.loading = false;
            }
         },

         async updateStatusRegister(status, status_cancel, register_type){

            try {

                let newStatus = ""

                if(register_type === '40001'){
                    newStatus = "12002"
                }else if(register_type === '40002'){
                    newStatus = "12001"
                }else{
                    newStatus = status
                }

                // const newRegister = register_type === "40001" && register_type !== null ? "12002" : "12001";

                // const newStatus = register_type === null ? status : newRegister

                
                let currentDate = moment();
            
                let fd = {
                    "register_id"       : this.data.id,
                    "status_register"   : newStatus,
                    "cancel_order"      : status_cancel,
                    "modified_by"       : this.user.employee_id,
                    "modified_date"     : currentDate.format('YYYY-MM-DD HH:mm:ss')
                }

                console.log(fd);

                let updateStatusRegisterPath = `/api_gcp/Register/updateStatusRegister`

                await axios.post(`${updateStatusRegisterPath}`, fd)

                Swal.fire('บันทึกข้อมูลเรียบร้อยเเล้ว', '', 'success')

                this.dialogApprove = false

                // this.$router.push({ name: 'RegisterListView' });

                } catch (error) {
                    console.log('updateStatusRegister', error);
                }
        },
                
        //  async updateStatusRegister(status){
        //     try {
             
        //         let currentDate = moment();
            
        //         let fd = {
        //             "register_id"       : this.data.id,
        //             "status_register"   : status,
        //             "modified_by"       : this.user.employee_id,
        //             "modified_date"     : currentDate.format('YYYY-MM-DD HH:mm:ss')
        //         }

        //         let updateStatusRegisterPath = `/api_gcp/Register/updateStatusRegister`

        //         await axios.post(`${updateStatusRegisterPath}`, fd)

        //         Swal.fire('บันทึกข้อมูลเรีบร้อยเเล้ว', '', 'success')

        //         this.dialogApprove = false

        //         // this.$router.push({ name: 'RegisterListView' });

        //         } catch (error) {
        //             console.log('updateStatusRegister', error);
        //         }
        // },
  

        async updateStatusReceipt(status){
            try {
             
                let currentDate = moment();
            
                let fd = {
                    "register_id"       : this.data.id,
                    "status_receipt"    : status,
                    "modified_by"       : this.user.employee_id,
                    "modified_date"     : currentDate.format('YYYY-MM-DD HH:mm:ss')
                }

                let updateStatusRegisterPath = `/api_gcp/Register/updateStatusReceipt`

                await axios.post(`${updateStatusRegisterPath}`, fd)

                Swal.fire('บันทึกข้อมูลเรียบร้อยเเล้ว', '', 'success')

                this.dialogApprove = false

                this.$router.push({ name: 'RegisterListView' });

                } catch (error) {
                    console.log('updateStatusRegister', error);
                }
        },

        async createReceipt(){

            const fdCreateReceipt = {

                master_id             : this.data.id,
                project_code          : "0041",
                payment_type_code     : "01",
                price                 : this.data.course_price,
                reference_1           : this.data.reference_no_1,
                reference_2           : this.data.reference_no_2,
                name                  : this.data.receipt_name,    
                id_card_number        : this.data.id_card_number,
                address               : this.data.company_address,  
                province              : this.data.province_id,
                district              : this.data.district_id,
                sub_district          : this.data.subdistrict_id,
                zip_code              : this.data.postcode,
                admin_id              : this.user.employee_id
            
            }


            try {
                
                const response = await axios.post('/api/create_receipt', fdCreateReceipt, {
                    headers: {
                        'accept': '*/*',
                        'accept-language': 'en-US,en;q=0.8',
                        'content-type': 'application/json'
                    },
                    timeout: 10000
                });

                console.log(response);


                //true
                if(!response.data.data.response){

                    this.updateStatusReceipt('13002')
                    
                        await Swal.fire({
                        icon: 'success',
                        title: 'บันทึกสำเร็จ',
                        text: 'ระบบได้ทำการบันทึกข้อมูลของคุณแล้ว'
                    })
                        // this.fechRegisterById(this.dataFrom.id);

                    // return response.data;
                 
                }

             
            } catch (error) {

                await Swal.fire({
                        icon: 'warning',
                        title: 'ไม่พบข้อมูล',
                        // text: 'ระบบได้ทำการบันทึกข้อมูลของคุณแล้ว'
                    })
                    this.dialogReceipt = false
                console.log('========',error.message);

                // return error.message;
            }
      
        },

        async cancelReceipt(){

            const fdCencelReceipt = {
                
                admin_id:  this.user.employee_id,
                payment_type_code: "01",
                reference_1: this.data.reference_no_1,
                reference_2: this.data.reference_no_2,

            }
 
            try {
                const cancelReceiptPath  = `/api/cancel_receipt`

                const response = await axios.post(cancelReceiptPath, fdCencelReceipt, {
                    headers: {
                        'accept': '*/*',
                        'accept-language': 'en-US,en;q=0.8',
                        'content-type': 'application/json'
                    },
                    timeout: 10000
                });


             
            // true
            if(!response.data.response){
                this.updateStatusReceipt('13001')
            }

            } catch (error) {
                console.log('cacelReceipt', error);
            }
        },


        editReceipt(){
            const encryptedData = this.getreceiptData();
            this.$router.push({ name: 'receipt', params: { receiptData: encryptedData }});
        },

        editRegister(){

            const registerEditId = { id: this.registerId.id};

            const key = 'yourSecretKey'; // คีย์สำหรับการเข้ารหัส

            // Encrypt the receipt data
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(registerEditId), key).toString();

            this.$router.push({name: 'registration-edit', params: { id: encryptedData}})
        },  

        printPayment(){

            const formattedStartDate    = moment(this.data.create_date).format('DD-MM-YYYY');
            const startDate             = formattedStartDate.replace(/-/g, "");
            const endDate               = this.data.end_date.replace(/-/g, "");
            const name                  = this.data.name_th
            const referenceOne          = this.data.reference_no_1
            const referencetwo          = this.data.reference_no_2
            const coursePrice           = this.data.course_price

            let url = `https://fsrx.cra.ac.th/CRAServices/payment/sis_payslip/16/${startDate}/${endDate}/${name}/${referenceOne}/${referencetwo}/${coursePrice}`;

            window.open(url, '_blank');

        },

        previewReceipt(){

            const encryptedData = this.getreceiptData();

            // Pass the encrypted data as a route parameter
            this.$router.push({ name: 'ReceiptDetail', params: { receiptData: encryptedData }});

        },

        getreceiptData(){
            
            const receiptData = { 
                id: this.data.id, 
                name: this.data.name_th, 
                title_name: this.data.titleName, 
                reference_no_1: this.data.reference_no_1, 
                reference_no_2: this.data.reference_no_2,  
                payment_type_code: "01",  
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