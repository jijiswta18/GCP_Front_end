<template>
    <div class="receipt">
        <h2 class="mb-3">แก้ไขข้อมูลใบเสร็จรับเงิน</h2> 
    
      
        <v-form  ref="formReceipt"  v-model="valid" lazy-validation>
            <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลใบเสร็จรับเงิน <span class="text-danger">** โปรดตรวจสอบข้อมูลเนื่องจากข้อมูลในใบเสร็จรับเงินไม่สามารถแก้ไขได้</span></div>
            
            <v-row no-gutters>              
                    <v-col cols="12" class="px-2">
                        <p class="style-label">Receipt No : <span>*</span></p>
                            <v-text-field
                                v-model="dataForm.receipt_no"
                                label="Receipt No"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input disabled"
                                disabled
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters>  
                    <v-col cols="12" class="px-2">
                        <p class="style-label">จำนวนเงิน (บาท) : <span>*</span></p>
                            <v-text-field
                                v-model="dataForm.price"
                                label=""
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input disabled"
                                disabled
                            ></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters>  
                    <v-col cols="12" md="6" class="px-2">
                        <p class="style-label">วันที่ออกใบเสร็จ : <span>*</span></p>
                            <v-text-field
                                v-model="dataForm.receipt_date"
                                label=""
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                type="date"
                            ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="px-2">
                        <p class="style-label">เวลาที่ออกใบเสร็จ  : <span>*</span></p>
                            <v-text-field
                                v-model="dataForm.receipt_time"
                                label=""
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                            ></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters>  
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ชื่อที่ใช้สำหรับออกใบเสร็จรับเงิน : <span>*</span></p>
                            <v-text-field
                                v-model="dataForm.name"
                                label=""
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                            ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters >
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ที่อยู่ : <span>*</span></p>
                        <v-text-field
                            v-model="dataForm.address"
                            label="ที่อยู่ (หมู่ / ซอย / ถนน)"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col cols="12" md="3" class="px-2">
                        <p class="style-label">จังหวัด : <span>*</span> </p>
                        <v-autocomplete
                            label="เลือก"
                            v-model="selectedProvince"
                            :items="provinces"
                            item-text="name"
                            item-value="province_code"
                            solo
                            clearable 
                            return-object
                            single-line
                            class="style-select"
                            @change="onProvinceChange"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-autocomplete>
                    </v-col>
                    
                    <v-col cols="12" md="3" class="px-2">
                        <p class="style-label">เขต/อำเภอ : <span>*</span></p>
                        <v-autocomplete
                            label="เลือก"
                            v-model="selectedDistrict"
                            :items="districts"
                            item-text="name"
                            item-value="district_code"
                            solo
                            clearable 
                            return-object
                            single-line
                            class="style-select"
                            :disabled="!selectedProvince"
                            @change="onDistrictChange"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-autocomplete>
                    </v-col>
                    <v-col  cols="12" md="3"  class="px-2">
                        <p class="style-label">แขวง/ตำบล : <span>*</span></p>
                        <v-autocomplete
                            label="เลือก"
                            v-model="selectedSubdistrict"
                            :items="subdistricts"
                            item-text="name"
                            item-value="sub_district_code"
                            solo
                            clearable 
                            return-object
                            single-line
                            :disabled="!selectedDistrict"
                            @change="onSubdistrictChange"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                            class="style-select"
                        ></v-autocomplete>
                    </v-col>
                    <v-col  cols="12" md="3" class="px-2">
                        <p class="style-label">รหัสไปรษณีย์ : <span>*</span></p>
                        <v-text-field
                            v-model="postcode"
                            label="รหัสไปรษณีย์"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :disabled="!selectedSubdistrict"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters>  
                    <v-col cols="12" class="px-2">
                        <p class="style-label">หมายเหตุ : </p>
                        <v-textarea
                            label="หมายเหตุ"
                            v-model="dataForm.note"
                            dense
                            solo
                            auto-grow
                            class="style-input"
                            rows="2"
                        ></v-textarea>
                    </v-col>
                </v-row>

                <v-row  no-gutters>  
                    <v-col cols="12" class="px-2">
                        <p class="style-label">เจ้าหน้าที่ออกใบเสร็จ : <span>*</span></p>
                        <v-autocomplete
                            label="เลือก"
                            v-model="dataForm.admin_id"
                            :items="receiptEmployees"
                            item-text="name"
                            item-value="employee_id"
                            solo
                            clearable 
                            class="style-select"
                            required
                        ></v-autocomplete>
                    </v-col>
                </v-row>

                <div class="text-center">
                <v-btn class="bg-green btn-confirm" @click="saveEditReceipt">ยืนยัน</v-btn>
                </div>
              

       
        </v-form>
        
    </div>
</template>
<script>
export default{
    data: () => ({
        valid: true,
        dataForm: {},
        optionsReceiptRegister: [],
        receiptData: {},
        decryptedData: {},
        receiptEmployees: []
    }),
    computed: {
        filteredReceiptEmployee(){
            return this.optionsReceiptRegister
        }
    },
    created(){
        const encryptedData     = this.$route.params.receiptData; // รับค่า receiptData จากพารามิเตอร์ใน URL
        const key               = 'gCpI2eigt0r041'; // คีย์สำหรับถอดรหัส 
        const bytes             = this.$cryptoJS.AES.decrypt(encryptedData, key); // ใช้ CryptoJS ในการถอดรหัส
        const decryptedData     = bytes.toString(this.$cryptoJS.enc.Utf8); // เก็บข้อมูลที่ถอดรหัสไว้ในตัวแปร decryptedData
        this.receiptData        = JSON.parse(decryptedData);
    },
    mounted(){
        this.fetchProvinces();
        this.fetchReceiptById();
        this.getEmployeeFinance();
    },
    methods: {
        async getEmployeeFinance(){

            try {
            const EmployeeFinancePath = `/api_gcp/ManageEmployee/EmployeeFinance`

            const response = await this.$axios.get(`${EmployeeFinancePath}`)

            this.receiptEmployees = response.data.data

            this.receiptEmployees.forEach(employee => {
                employee.name = `${employee.employee_id} ${employee.first_name} ${employee.last_name}`;
            });

            } catch (error) {
                console.log('EmployeeFinancegister', error);
            }

        },
        async saveEditReceipt(){
            if(this.$refs.formReceipt.validate()){
                try {

                    const date = this.dataForm.receipt_date + ' ' + this.dataForm.receipt_time
                    
                    const fdReceipt = {
                        "reference_1"       : this.dataForm.reference_1,
                        "reference_2"       : this.dataForm.reference_2,
                        "payment_type_code" : "01",
                        "name"              : this.dataForm.name,  
                        "id_card_number"    : this.dataForm.id_card_number,
                        "address"           : this.dataForm.address,
                        "province"          : this.selectedProvince.province_code,
                        "district"          : this.selectedDistrict.district_code,
                        "sub_district"      : this.selectedSubdistrict.sub_district_code,
                        "zip_code"          : this.postcode,
                        "note"              : this.dataForm.note,
                        "create_datetime"   : date,
                        "admin_id"          : this.dataForm.admin_id
                    }

                    const updateReceiptPath = `/api/update_receipt`

                    await this.$axios.put(`${updateReceiptPath}`, fdReceipt)

                    await this.$swal.fire({
                            icon: 'success',
                            title: 'บันทึกสำเร็จ',
                            text: 'ระบบได้ทำการบันทึกข้อมูลของคุณแล้ว'
                        }).then( function(){


                        });


                } catch (error) {
                   console.log("updateReceipt", error); 
                }

            }
            
        },
        async fetchReceiptById(){
            try {
                const reference_no_1        = this.receiptData.reference_no_1;
                const reference_no_2        = this.receiptData.reference_no_2;
                const payment_type_code     = this.receiptData.payment_type_code

                const receiptDetailPath = `/api/detail_receipt/${reference_no_1}/${reference_no_2}/${payment_type_code}`
                
                const response          =  await this.$axios.get(`${receiptDetailPath}`)

                const data              = response.data.data

                const receipt_date      = data.create_datetime
                
                var dateParts           = receipt_date.split(" ")

                this.dataForm           = data
                this.dataForm.receipt_date      = dateParts[0]
                this.dataForm.receipt_time      = dateParts[1]
                this.selectedProvince           = data.province_code
                this.selectedDistrict           = data.district_code
                this.selectedSubdistrict        = data.sub_district_code
                this.postcode                   = data.zip_code

                if (this.selectedProvince) {
                    this.fetchDistricts(this.selectedProvince);
                }

                if (this.selectedDistrict) {
                    this.fetchSubdistricts( this.selectedProvince, this.selectedDistrict);
                }
             


            } catch (error) {
                console.log("fechReceiptById", error);   
            }
        },
    }
}
</script>
<style>
 .btn-confirm{
    height: 45px!important;
        width: 270px!important;
 }
 .btn-confirm span{
    font-size: 18px;
 }
 .disabled .v-input__slot{
    background-color: #e9ecef!important;
 }
 .disabled input{
    color: #333!important;

 }
</style>