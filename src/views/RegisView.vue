<template>
    <div class="regisview">
        <h2 class="mb-3">ลงทะเบียน</h2> 
        <p class="text-required">* จำเป็นต้องระบุ / Required Fields</p>
        <div class="box-one">
            <div class="mb-3 h5">ข้อมูลทั่วไป</div>
            <v-row no-gutters>
                <v-col cols="12">

                    <p class="style-label"><span>*</span> ประเภทผู้สมัคร</p>
                    <v-radio-group>
                        <v-radio label="นักศึกษาปริญญาตรี" value="one"></v-radio>
                        <v-radio label="นักศึกษาปริญญาโท ปริญญาเอก" value="two"></v-radio>
                        <v-radio label="พยาบาล บุคลากรทางการแพทย์และบุคคลทั่วไป" value="three"></v-radio>
                    </v-radio-group>

                </v-col>
            </v-row>
            <v-row  no-gutters>              
                <v-col cols="4" class="px-2">
                    <p class="style-label"><span>*</span> คำนำหน้า</p>
                    <v-autocomplete
                        label="เลือก"
                        v-model="dataFrom.name"
                        :items="selectName"
                        item-text="value"
                        item-value="id"
                        :rules="[v => !!v || 'กรุณาเลือกรายการ']"
                        solo
                        clearable 
                        class="style-select"
                    ></v-autocomplete>
                </v-col>
                <v-col cols="4" class="px-2">
                    <p class="style-label"><span>*</span> ชื่อ</p>
                        <v-text-field
                            v-model="dataFrom.name"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                            label="ชื่อ"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                    ></v-text-field>
                </v-col>
                <v-col cols="4" class="px-2">
                    <p class="style-label"><span>*</span> นามสกุล</p>
                        <v-text-field
                            v-model="dataFrom.lastname"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                            label="นามสกุล"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                        ></v-text-field>
                </v-col>
            </v-row>
            <v-row  no-gutters>
                <v-col cols="12">
                    <p class="style-label"><span>*</span> ต้นสังกัด/หน่วยงาน</p>
                    <v-text-field
                        v-model="dataFrom.organize"
                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        label="ต้นสังกัด/หน่วยงาน"
                        dense
                        solo
                        single-line
                        clearable 
                        class="style-input"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row  no-gutters>
                <v-col cols="12">
                    <p class="style-label"><span>*</span> เบอร์โทรศัพท์มือถือ</p>
                    <v-text-field
                        v-model="dataFrom.phone"
                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        label="เบอร์โทรศัพท์มือถือ"
                        dense
                        solo
                        single-line
                        clearable 
                        class="style-input"
                    ></v-text-field>
                </v-col>
            </v-row>
            
            <v-row  no-gutters>
                <v-col cols="12">
                    <p class="style-label"><span>*</span> Email</p>
                    <v-text-field
                        v-model="dataFrom.email"
                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        label="Email "
                        dense
                        solo
                        single-line
                        clearable 
                        class="style-input"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row  no-gutters>
                <v-col cols="12">
                    <p class="style-label"><span>*</span> ยืนยัน Email</p>
                    <v-text-field
                        v-model="dataFrom.check_email"
                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        label="ยืนยัน Email "
                        dense
                        solo
                        single-line
                        clearable 
                        class="style-input"
                    ></v-text-field>
                </v-col>
            </v-row>
               
        </div>
        <div class="box-two">
            <div class="mb-3 h5">ข้อมูลใบเสร็จรับเงิน ** <span class="text-warning">โปรดตรวจสอบข้อมูลเนื่องจากข้อมูลในใบเสร็จรับเงินไม่สามารถแก้ไขได้</span></div>
            <v-row no-gutters>
                <v-col cols="12">
                    <p class="style-label"><span>*</span> ชื่อที่ใช้สำหรับออกใบเสร็จ</p>
                    <v-text-field
                        v-model="dataReciept.name"
                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        label="ชื่อที่ใช้สำหรับออกใบเสร็จ"
                        dense
                        solo
                        single-line
                        clearable 
                        class="style-input"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12">
                    <div>หมายเหตุ :</div>
                    <div>1. กรณีที่ออกใบเสร็จในนามบุคคลทั่วไป ให้ระบุชื่อ-นามสกุล</div>
                    <div>2. กรณีที่ออกใบเสร็จในนามองค์กร ให้ระบุชื่อองค์กร</div>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12">
                    <p class="style-label"><span>*</span> เลขบัตรประชาชน/เลขประจำตัวผู้เสียภาษีอากร</p>
                    <v-text-field
                        v-model="dataReciept.id_card"
                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        label="เลขบัตรประชาชน/เลขประจำตัวผู้เสียภาษีอากร"
                        dense
                        solo
                        single-line
                        clearable 
                        class="style-input"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12">
                    <div>หมายเหตุ :</div>
                    <div>1. กรณีที่ออกใบเสร็จในนามบุคคลทั่วไป ให้ระบุเลขบัตรประชาชน</div>
                    <div>2. กรณีที่ออกใบเสร็จในนามองค์กร ให้ระบุเลขประจำตัวผู้เสียภาษีอากร</div>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12">
                    <p class="style-label"><span>*</span> ที่อยู่</p>
                    <v-text-field
                        v-model="dataReciept.id_card"
                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        label="ที่อยู่"
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
                    <p class="style-label"><span>*</span> จังหวัด</p>
                    <v-autocomplete
                        label="เลือก"
                        v-model="dataFrom.province"
                        :items="selectProvince"
                        item-text="value"
                        item-value="id"
                        :rules="[v => !!v || 'กรุณาเลือกรายการ']"
                        solo
                        clearable 
                        class="style-select"
                    ></v-autocomplete>
                </v-col>
                <v-col cols="3" class="px-2">
                    <p class="style-label"><span>*</span>  เขต/อำเภอ</p>
                    <v-autocomplete
                        label="เลือก"
                        v-model="dataFrom.district"
                        :items="selectDistrict"
                        item-text="value"
                        item-value="id"
                        :rules="[v => !!v || 'กรุณาเลือกรายการ']"
                        solo
                        clearable 
                        class="style-select"
                    ></v-autocomplete>
                </v-col>
                <v-col cols="3" class="px-2">
                    <p class="style-label"><span>*</span> แขวง/ตำบล</p>
                    <v-autocomplete
                        label="เลือก"
                        v-model="dataFrom.subdistrict"
                        :items="selectSubDistrict"
                        item-text="value"
                        item-value="id"
                        :rules="[v => !!v || 'กรุณาเลือกรายการ']"
                        solo
                        clearable 
                        class="style-select"
                    ></v-autocomplete>
                </v-col>
                <v-col cols="3" class="px-2">
                    <p class="style-label"><span>*</span> รหัสไปรษณีย์</p>
                    <v-text-field
                        v-model="dataReciept.postcode"
                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        label="รหัสไปรษณีย์"
                        dense
                        solo
                        single-line
                        clearable 
                        class="style-input"
                    ></v-text-field>
                </v-col>
            </v-row>


        </div>

        <div class="box-tree">
            <div class="mb-3 h5">ลงทะเบียนเข้าร่วมประชุม</div> 
            <div>
                ท่านมีความประสงค์สมัครเข้าร่วมอบรมโครงการ "แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" วันที่ 24 - 26 กรกฎาคม 2567 ณ โรงแรมอัศวิน แกรนด์ คอนเวนชั่น
            </div>
            <v-row  justify="center">
                <v-col cols="10">
                    <v-table class="table-regis">
                        <thead>
                        <tr>
                            <th colspan="4" class="text-center">
                                รายการที่ต้องการสมัคร <span>*</span>
                            </th> 
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>a</td>
                            <td>a</td>
                            <td>a</td>
                            <td>a</td>
                        </tr>
                        </tbody>
                    </v-table>
                </v-col>
            </v-row>
        </div>

        <div class="box-four">
            <div class="mb-3 h5">ข้อมูลอื่น ๆ</div>
        </div>
    </div>
</template>

<script>
export default {  
    data: () => ({
        dataFrom: {},
        dataReciept: {},
        selectName: [
            {value: 'นาย', id: "นาย"},
            {value: 'นาง', id: "นาง"},
            {value: 'นางสาว', id: "นางสาว"},
            {value: 'อื่น ๆ', id: "อื่น ๆ"}
     ], 
    }),
    methods: {
    },
    
}
</script>
<style>
    .text-required{
        font-size: 1em;
        color: #dc3545;
    }
    .h5{
        padding: 16px;
        background: #243C7F;
        color: white;
        font-size: 1.25rem;
    }

    .style-input .v-input__slot{
        height: 42px;
        background: transparent;
        box-shadow: none!important;
        border: 1px solid #ced4da;

    }
    .table-regis {
        border-collapse: collapse;
        width: 100%!important;
    }

    .table-regis td, .table-regis th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    .table-regis td{
        width: 3%;
    }
  
</style>