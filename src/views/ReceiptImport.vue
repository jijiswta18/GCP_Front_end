<template>
    <div>
      
        <div class="receiptImport" id="uploaddiv" :class="{ import: isImport }">

            <h2 class="mb-3">อัพโหลดข้อมูลการชำระเงิน</h2> 
            <v-row justify="center">
                <v-col cols="12" md="10">
                    <p class="style-label">อัพโหลด</p>

                    <v-file-input
                        v-model="file"
                        label="เลือกไฟล์"
                        :prepend-icon="null"
                    
                        class="style-input-file"
                        clearable 
                        dense
                        solo
                    >
                        <template v-slot:append>
                        <div class="custom">
                            Browse
                        </div>
                        </template>
                    </v-file-input>
                    
                </v-col>
            </v-row>
            <v-row justify="center" class="box-submit">
                <v-btn class="btn-success" @click="uplaodFile">ยืนยัน</v-btn>
            </v-row>

            
            <!-- <div  class="button" @click="testSendMail">
                send mail
            </div> -->
        </div>
        <div id="showresult" :class="{ modified: isModified }" style="display: none;">
            <h4 class="mb-3">สำเร็จ</h4> 
            <div class="box-success">
                <p>สำเร็จ {{ success }} รายการ</p>
                <v-row>
                    <v-col
                        v-for="(item, index) in data_receipt" :key="index" cols="12">
                    <div>
                        <span>{{index+1}}.</span>
                        <span> {{ item.name_th }} {{ item.lastname_th }} </span>
                        <span>ราคา {{  item.course_price | formatNumber}} บาท</span>
                    </div>
                    </v-col>
                </v-row>
                
            </div>
            <br>
            <h4 class="mb-3">ไม่สำเร็จ</h4> 
            <div class="box-unsuccess">
                <p>ไม่สำเร็จ {{ unsuccess }} รายการ</p>
            </div>

            <div class="btn-import text-center">
                <div @click="clearClass" class="f-22 bg-gray box-import cursor-pointer">import อีกครั้ง</div>
            </div>

          
        </div>
    </div>
</template>


<script>
    import store from "@/store";
    export default {
        data:() => ({
            file: null,
            user: store.getters.user,
            success: null,
            unsuccess: null,
            isModified: false,
            isImport: false,
            data_success : [],
            data_receipt : []
        }),
       
        methods: {
            async uplaodFile() {
               
                if(this.file === null){

                    this.$swal.fire({
                        title: "กรุณาเลือกไฟล์",
                        icon: "warning"
                    });
                }else{
                    this.loading = true;
             
                this.$swal.fire({
                    title: 'Loading',
                    html: 'Please wait while data is being loaded...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        this.$swal.showLoading();
                    }
                });


                const file = this.file

                const reader = new FileReader();

                reader.onload = async() => {
                    const content = reader.result;

                    // อ่านไฟล์และแปลงรหัสอักขระของสตริงให้เป็น UTF-8

                    const utf8Content = this.decodeUnicode(content);

                                    // Simulate loading data from an API
                    try {
                        // Replace this with actual data loading code
                        const digitPath = `/CRAServices/payment/get_format_256`

                        const response = await this.$axios.post(`${digitPath}`, utf8Content, {
                            headers: {
                                    "Accept": "text/html",
                                    "Content-Type": "text/html"   
                                }
                        })

                        let success = [];
                        let data_receipt_success = [];
                        let unsuccess = [];
                        const dataFormat256 = response.data[0].detail

                        for(let i = 0; i<dataFormat256.length; i++){


                            const reference_1 = dataFormat256[i].reference_1;
                            const reference_2 = dataFormat256[i].reference_2;
                            const amount = dataFormat256[i].amount;

                            // const replaceReference_1 = reference_1.replace(/\D/g, "")
                            // const replaceReference_2 = reference_2.replace(/\D/g, "")
                            // const replaceAmount      = amount.replace(/\D/g, "")

                            const data = {
                                "reference_no_1"    : reference_1,
                                "reference_no_2"    : reference_2,
                                "course_price"      : amount,
                                "status_register"   : 12003,
                                "modified_by"       :  this.user.employee_id,
                                "modified_date"     :  this.$moment().format('YYYY-MM-DD HH:mm:ss'),
                            }

                            try {
                                const mapStatusReceiptPath = `/api_gcp/Register/MapStatusReceipt`

                                const response = await this.$axios.post(`${mapStatusReceiptPath}`, data)

                            
                                if(parseInt(response.data.dataSUCCESS.SUCCESS) >= 1)
                                {
                                    success.push(dataFormat256[i]);
                                    data_receipt_success.push( response.data.receiptData[0]);
                                }else {
                                    unsuccess.push(dataFormat256[i]);
                                }

                                
                            } catch (error) {
                                console.log('mapStatusReceipt', error);
                            }

                            
                          
                        }
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        // After data is loaded
                        this.data_receipt = data_receipt_success

                        this.data_success = success
                        this.success = success.length
                        this.unsuccess = unsuccess.length
                        this.dataLoaded = true;
                    } catch (error) {
                        console.error('Error loading data:', error);
                        this.dataLoaded = false;
                    } finally {
                        // Close loading message using SweetAlert2
                        this.$swal.close();
                        this.loading = false;

                        await this.$swal.fire({
                            icon: 'success',
                            title: 'บันทึกสำเร็จ',
                            text: 'ระบบได้ทำการบันทึกข้อมูลของคุณแล้ว'
                        })
                        this.isModified = true;
                        this.isImport = true;
                    }
                },

                await reader.readAsText(file);

                }
   
            },

            async mapStatusRegister(value){

                

                const reference_1 = value.reference_1;
                const reference_2 = value.reference_2;
                const amount = value.amount;

                // const replaceReference_1 = reference_1.replace(/\D/g, "")
                // const replaceReference_2 = reference_2.replace(/\D/g, "")
                // const replaceAmount      = amount.replace(/\D/g, "")

                const data = {
                    "reference_no_1"    : reference_1,
                    "reference_no_2"    : reference_2,
                    "course_price"      : amount,
                    "status_register"   : 12003,
                    "modified_by"       :  this.user.username,
                    "modified_date"     :  this.$moment().format('YYYY-MM-DD HH:mm:ss'),
                }

                try {
                    const mapStatusReceiptPath = `/api_gcp/Register/MapStatusReceipt`
                    await this.$axios.post(`${mapStatusReceiptPath}`, data)

                    
                } catch (error) {
                    console.log('mapStatusReceipt', error);
                }


            },

            decodeUnicode(content) {

                return content.replace(/\\u[\dA-F]{4}/gi, (match) => {
                    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
                });
            },

            clearClass() {
                // Set isModified to false when the clear button is clicked
                this.isImport = false;
                this.isModified = false;
                this.file = null;
            },
            
    
        }
    }
</script>
<style>

    .style-input-file .v-input__slot {
        padding-right: 0!important;
        height: 42px;
        background: transparent;
        box-shadow: none!important;
        border: 1px solid #ced4da;
    }
    .style-input-file .v-input__slot .custom{
        margin-top: 0!important;
        height: 40px;
        align-items: center;
        color: #495057;
        text-align: center;
        white-space: nowrap;
        background-color: #e9ecef;
        /* border: 1px solid #ced4da; */
        padding: 10px;
    }
    .box-submit button{
  
        height: 45px!important;
        width: 270px!important;
    }
    .box-submit span {
        font-size: 18px;
    }
    .modified{
        display: block!important;
    }
    .import{
        display: none;
    }
    .box-import{
        padding: 0.5rem 4rem;
        color: white !important;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 2rem;
        display: inline-block;

    }
    .box-success{
        border: 1px solid gray;
        border-radius: 5px;
        padding: 1rem;
        min-height: 300px;
    }
    .box-success p{
       color: green;
    }
    .box-unsuccess{
        border: 1px solid gray;
        border-radius: 5px;
        padding: 1rem;
        min-height: 300px;
    }
    .box-unsuccess p{
        color: red;
    }

</style>