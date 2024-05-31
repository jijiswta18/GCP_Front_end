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
                                class="style-input"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters>  
                    <v-col cols="12" class="px-2">
                        <p class="style-label">จำนวนเงิน (บาท) : <span>*</span></p>
                            <v-text-field
                                v-model="dataForm.course_price"
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
                    <v-col cols="6" class="px-2">
                        <p class="style-label">วันที่ออกใบเสร็จ : <span>*</span></p>
                            <v-text-field
                                v-model="dataForm.receipt_date"
                                label=""
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                            ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="px-2">
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
                                v-model="dataForm.receipt_name"
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
                            v-model="dataForm.company_address"
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
                    <v-col cols="3" class="px-2">
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
                    
                    <v-col cols="3" class="px-2">
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
                    <v-col cols="3" class="px-2">
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
                    <v-col cols="3" class="px-2">
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
                            v-model="dataForm.detail"
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
                            v-model="dataForm.receipt_employee"
                            :items="filteredReceiptEmployee"
                            item-text="name"
                            item-value="select_code"
                            solo
                            clearable 
                            class="style-select"
                            required
                        ></v-autocomplete>
                    </v-col>
                </v-row>

                <div class="text-center">
                <v-btn class="bg-green btn-confirm font-weight-bold" @click="saveEditReceipt">ยืนยัน</v-btn>
                </div>
              

       
        </v-form>
        
    </div>
</template>
<script>
   import axios from 'axios';
   import Swal from 'sweetalert2';
   import CryptoJS from 'crypto-js';
   import store from '../store/index.js';
export default{
    data: () => ({
        valid: true,
        // dataRegister: {},
        dataForm: {},
        provinces: [],
        districts: [],
        subdistricts: [],
        postcode: '',
        selectedProvince: null,
        selectedDistrict: null,
        selectedSubdistrict: null,
        optionsReceiptRegister: [],
        user: store.getters.user,
        receiptData: {},
        decryptedData: {}
    }),
    computed: {
        filteredReceiptEmployee(){
            return this.optionsReceiptRegister
        }
    },
    created(){
        const encryptedData     = this.$route.params.receiptData; // รับค่า receiptData จากพารามิเตอร์ใน URL
        const key               = 'yourSecretKey'; // คีย์สำหรับถอดรหัส 
        const bytes             = CryptoJS.AES.decrypt(encryptedData, key); // ใช้ CryptoJS ในการถอดรหัส
        const decryptedData     = bytes.toString(CryptoJS.enc.Utf8); // เก็บข้อมูลที่ถอดรหัสไว้ในตัวแปร decryptedData
        this.receiptData        = JSON.parse(decryptedData);

        console.log(this.receiptData );

    },
    mounted(){
        this.fetchProvinces();
        // this.fetchReceiptById();
        // this.fetchRegisterById();
    },
    methods: {
        async saveEditReceipt(){
            if(this.$refs.formReceipt.validate()){
                try {
                    
                    const fdReceipt = {
                        "reference_1"       : this.dataForm.reference_no_1,
                        "reference_2"       : this.dataForm.reference_no_2,
                        "payment_type_code" : "01",
                        "name"              : this.dataForm.receipt_name,  
                        "id_card_number"    : this.dataForm.id_card_number,
                        "address"           : this.dataForm.company_address,
                        "province"          : this.dataForm.province_id,
                        "district"          : this.dataForm.district_id,
                        "sub_district"      : this.dataForm.subdistrict_id,
                        "zip_code"          : this.dataForm.postcode,
                        "note"              : "",
                        "create_datetime"   : "",
                        "admin_id"          : this.user.employee_id
                    }

                    const updateReceiptPath = `/api/update_receipt`

                    await axios.put(`${updateReceiptPath}`, fdReceipt)

                    await Swal.fire({
                            icon: 'success',
                            title: 'บันทึกสำเร็จ',
                            text: 'ระบบได้ทำการบันทึกข้อมูลของคุณแล้ว'
                        }).then( function(){


                        });


                } catch (error) {
                   console.log("updateReceipt", error); 
                }
                console.log(this.dataForm);
            }
            
        },

        async fechReceiptById(){
            try {
                const reference_no_1    = this.receiptData.reference_no_1;
                const reference_no_2    = this.receiptData.reference_no_2;
                const id                = this.receiptData.id

                const receiptDetailPath = `/api_gcp/detail_receipt/${reference_no_1}/${reference_no_2}/${id}`
                
                const response          =  await axios.post(`${receiptDetailPath}`)

                this.data               = await response.data.data

            } catch (error) {
                console.log("fechReceiptById", error);   
            }
        },



        // async fetchRegisterById(){
        //     try {
        //         const registerByIdPath          = `/api_gcp/Register/getRegisterById`
        //         const response                  = await axios.get(`${registerByIdPath}/` + this.$route.params.id)
        //         const datas                     = response.data.data[0]
        //         console.log(datas);
        //         this.dataRegister               = datas

        //     } catch (error) {
        //         console.log('get register Page Receipt', error);
        //     }
        // },
        async fetchProvinces() {
                try {
                    const response = await axios.get('/api_gcp/getProvince');
                    this.provinces = response.data.data;
                } catch (error) {
                    console.error('Error fetching provinces:', error);
                }
        },
        async fetchDistricts(provinceId) {
            try {
                const response = await axios.get(`/api_gcp/getDistricts?provinceId=${provinceId}`);
                const districts = response.data.data; // Adjust this according to your API response structure
                this.districts = Array.isArray(districts) ? districts : []; 
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        },
        async fetchSubdistricts(provinceId,districtId) {
            try {
                const response = await axios.get(`/api_gcp/getSubdistricts?provinceId=${provinceId}&districtId=${districtId}`);
                const subdistricts = response.data.data; // Adjust this according to your API response structure
                this.subdistricts = Array.isArray(subdistricts) ? subdistricts : []; 
            } catch (error) {
                console.error('Error fetching subdistricts:', error);
            }
        },
        onProvinceChange() {
            this.selectedDistrict = null;
            this.selectedSubdistrict = null;
            this.selectedPostcode = null;
            this.postcode = '';
            if (this.selectedProvince) {
                this.fetchDistricts(this.selectedProvince.province_code);
    
            }
        },
        onDistrictChange() {
            this.selectedSubdistrict = null;
            this.selectedPostcode = null;
            this.postcode = '';
            if (this.selectedDistrict) {
                this.fetchSubdistricts(this.selectedProvince.province_code, this.selectedDistrict.district_code);
            }
        },
        onSubdistrictChange() {
            this.selectedPostcode = null;
            this.postcode = '';
            if (this.selectedSubdistrict) {
                this.postcode = this.selectedSubdistrict.zip_code
            }
        },
    }
}
</script>