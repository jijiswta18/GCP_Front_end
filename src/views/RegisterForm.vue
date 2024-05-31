<template>
    <div class="registerview">
        <h2 class="mb-3">{{ formTitle  }}</h2> 
        <p class="text-required">* จำเป็นต้องระบุ / Required Fields</p>
        <v-form  ref="form"  v-model="valid" lazy-validation>
            <div class="box-seminar">
                <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ลงทะเบียนเข้ารับการอบรม</div> 
                <v-row no-gutters>
                    <v-col cols="12">
                        <p class="style-label"><span>*</span> ประเภทผู้สมัคร</p>
                        <v-radio-group v-model="dataFrom.register_type"  :disabled="isEdit">
                            <v-radio v-for="option in filteredRegiterStatus" :key="option.id" :label="option.name" :value="option.select_code">
                            </v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <v-row  justify="center" class="mt-3" v-if="dataFrom.register_type">
                  
                    <v-col cols="10">

                        <v-data-table
                            v-model="valueCheckboxCourse"
                            :headers="headerCourses"
                            :items="filteredOptionCourses"
                            item-value="name"
                            item-key="id"
                            show-select
                            hide-default-header
                            hide-default-footer
                            :single-select="true"
                            class="table-regis"
                        >
                      
                        <template v-slot:header>
                            <thead>
                                <tr>
                                    <th v-if="dataFrom.register_type === '40001'" colspan="4" class="text-center">
                                        อัตราค่าสมัครเข้าอบรม สำหรับบุคลากรภายใน <span>*</span>
                                    </th> 
                                    <th v-else colspan="4" class="text-center">
                                        อัตราค่าสมัครเข้าอบรม สำหรับบุคลากรภายนอก <span>*</span>
                                    </th> 
                                </tr>
                            </thead>
                        </template>
                     
                        <template v-slot:[`item.price`]="{ item }">
                            <span v-if="dataFrom.register_type === '40001'">ไม่มีค่าลงทะเบียน</span>
                            <span v-else>{{ item.price }} บาท</span>
                        
                        </template>
                                   
                               
                    </v-data-table>
                    </v-col>
                </v-row>
                
                <v-row no-gutters v-if="valueCheckboxCourse.find(it => it.id === 1 || it.id === 2) " class="mt-7">
                    <v-col cols="12" class="px-2">
                        <v-card class="px-5 py-5">
                            <p class="style-label">ท่านสนใจเข้าร่วมอบรมอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming " วันที่ 26 กรกฏาคม 2567 ณ ห้องพระอินทร์ 1-2 ชั้น 2  <br> โรงแรมอัศวิน แกรนด์ คอนเวนชั่น หรือไม่ ? * Onsite จำกัด 80 ท่าน เท่านั้น <span>*</span></p>
                            <v-radio-group v-model="dataFrom.check_course_other" :disabled="isEdit">
                                <v-radio label="เข้าร่วม" :value="true"></v-radio>
                                <v-radio label="ไม่เข้ารวม" :value="false"></v-radio>
                            </v-radio-group>
                        </v-card>
                    </v-col>
                </v-row>

            </div>

            <div class="box-register mt-7">

                <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลรายละเอียดผู้สมัคร <span class="text-warning">(โปรดกรอกข้อมูลให้ถูกต้อง เพื่อระบุข้อมูลในใบประกาศนียบัตร)</span></div>
                <v-row  no-gutters>              
                    <v-col cols="12" class="px-2">
                        <p  class="style-label"> คำนำหน้า : <span>*</span></p>
                        <v-autocomplete
                            label="เลือก"
                            v-model="dataFrom.title_name"
                            :items="filteredTitleName"
                            item-text="name"
                            item-value="select_code"
                            solo
                            clearable 
                            class="style-select"
                            required
                        ></v-autocomplete>
                        <div v-if="dataFrom.title_name === '10013'">
                            <p  class="style-label"> คำนำหน้าอื่น ๆ (โปรดระบุ) : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.title_name_other"
                                label="คำนำหน้า"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                                :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                            ></v-text-field>
                        </div>
                    </v-col>
                </v-row>
                <v-row  no-gutters>              
                    <v-col cols="6" class="px-2">
                        <p class="style-label">ชื่อ (ภาษาไทย) : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.name_th"
                                label="ชื่อ (ภาษาไทย)"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                                :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="px-2">
                        <p class="style-label">นามสกุล (ภาษาไทย) : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.lastname_th"
                                label="นามสกุล (ภาษาไทย)"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                                :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                            ></v-text-field>
                    </v-col>
                </v-row>
                <v-row  no-gutters>              
                    <v-col cols="6" class="px-2">
                        <p class="style-label">ชื่อ (ภาษาอังกฤษ) : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.name_en"
                                label="ชื่อ (ภาษาอังกฤษ)"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                                :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="px-2">
                        <p class="style-label">นามสกุล (ภาษาอังกฤษ) : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.lastname_en"
                                label="นามสกุล (ภาษาอังกฤษ)"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                                :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                            ></v-text-field>
                    </v-col>
                </v-row>
                <v-row  no-gutters v-if="dataFrom.register_type === '40002'">
                    <v-col cols="12" class="px-2">
                        <p  class="style-label">คุณวุฒิการศึกษาสูงสุด  : <span>*</span></p>
                        <v-autocomplete
                            label="เลือก"
                            v-model="dataFrom.education"
                            :items="filteredEducation"
                            item-text="name"
                            item-value="select_code"
                            solo
                            clearable 
                            class="style-select"
                            required
                        ></v-autocomplete>
                    </v-col>
                </v-row>   
            </div>

            <div class="box-contact">
                <div v-if="dataFrom.register_type === '40001'" class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลการติดต่อ</div>
                <div v-else class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลการติดต่อ <span class="text-warning">(โปรดกรอกข้อมูลให้ถูกต้อง เพื่อระบุข้อมูลในใบเสร็จรับเงิน)</span></div>

                <v-row no-gutters v-if="dataFrom.register_type === '40002'" >
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ชื่อที่ใช้สำหรับออกใบเสร็จรับเงิน : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.receipt_name"
                            label="ชื่อที่ใช้สำหรับออกใบเสร็จรับเงิน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                        <p class="style-label text-danger mb-0">หมายเหตุ :</p>
                        <div class="mb-4">
                            <p class="mb-0 text-danger">1. กรณีที่ออกใบเสร็จในนามบุคคลทั่วไป ให้ระบุชื่อ-นามสกุล</p>
                            <p class="mb-0 text-danger">2. กรณีที่ออกใบเสร็จในนามองค์กร ให้ระบุชื่อองค์กร</p>
                        </div>
                    </v-col>
                </v-row>


             
                <v-row no-gutters v-if="dataFrom.register_type === '40002'" >
                    <v-col cols="12" class="px-2">
                        <p class="style-label">เลขบัตรประชาชน/เลขประจำตัวผู้เสียภาษีอากร : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.id_card_number"
                            label="ชื่อที่ใช้สำหรับออกใบเสร็จรับเงิน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                        <p class="style-label text-danger mb-0">หมายเหตุ :</p>
                        <div class="mb-4">
                            <p class="mb-0 text-danger">1. กรณีที่ออกใบเสร็จในนามบุคคลทั่วไป ให้ระบุชื่อ-นามสกุล</p>
                            <p class="mb-0 text-danger">2. กรณีที่ออกใบเสร็จในนามองค์กร ให้ระบุชื่อองค์กร</p>
                        </div>
                    </v-col>
                 
                </v-row>
            

                <v-row no-gutters v-if="dataFrom.register_type === '40002'" >
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ชื่อสถานที่ปฏิบัติงาน : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.company_name"
                            label="ชื่อสถานที่ปฏิบัติงาน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters v-if="dataFrom.register_type === '40002'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ที่อยู่สถานที่ทำงานเลขที่ : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.company_address"
                            label="ที่อยู่ (หมู่ / ซอย / ถนน)"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters v-if="dataFrom.register_type === '40002'">
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

                <v-row no-gutters>
                    <v-col cols="12" class="px-2">
                        <p class="style-label"> เบอร์โทรศัพท์มือถือ : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.phone"
                            label="เบอร์โทรศัพท์มือถือ"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                </v-row>
                
                <v-row no-gutters>
                    <v-col cols="12" class="px-2">
                        <p class="style-label">เบอร์โทรศัพท์อื่น (กรณีติดต่อไม่ได้) : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.phone_other"
                            label="หมายเลขโทรศัพท์"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters v-if="dataFrom.register_type === '40002'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label">อีเมลล์ : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.email"
                            label="อีเมลล์ "
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters v-if="dataFrom.register_type === '40002'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label"> ยืนยันอีเมลล์ : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.confirm_email"
                            label="ยืนยันอีเมลล์"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <div v-if="dataFrom.register_type === '40002'" class="d-flex align-center justify-center mb-4">
                    <v-checkbox
                        v-model="dataFrom.confirm_receipt"
                        color="primary"
                        hide-details
                        class="pt-0 mt-0"
                    ></v-checkbox>
                    <span class="h5 font-weight-bold text-dark"> ยืนยันว่าข้อมูลในใบเสร็จรับเงินถูกต้อง</span>
                </div>


            </div>

            <div class="box-job">
                <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลการทำงาน</div>
                <v-row  no-gutters v-if="dataFrom.register_type === '40001'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label">รหัสพนักงาน : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.employee_id"
                            label="รหัสพนักงาน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            required
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                </v-row>
              

                <v-row  no-gutters>
                    <v-col cols="12" class="px-2">
                        <p  class="style-label">ตำแหน่งงาน : <span>*</span></p>
                        
                        <v-autocomplete
                            label="เลือก"
                            v-model="dataFrom.job_position"
                            :items="filteredPotionJob"
                            item-text="name"
                            item-value="select_code"
                            solo
                            clearable 
                            class="style-select"
                            required
                        ></v-autocomplete>

                        <div v-if="dataFrom.job_position === '20008'">
                            <p class="style-label">ตำแหน่งงานอื่น ๆ (โปรดระบุ) : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.job_position_other"
                                label="รหัสพนักงาน"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                                :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                            ></v-text-field>
                        </div>
                      
                    </v-col>
                </v-row>
                
                <v-row  no-gutters v-if="dataFrom.register_type === '40001'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ชื่อหน่วยงาน : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.company_name"
                            label="ชื่อหน่วยงาน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            required
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters v-if="dataFrom.register_type === '40002'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ประสบการณ์ทำงาน (ปี) : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.work_experience"
                            label="ประสบการณ์ทำงาน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        ></v-text-field>
                    </v-col>
                </v-row>  
            </div>
            
            <div class="box-other">
                <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลอื่น ๆ</div>
                <v-row no-gutters>
                    <v-col cols="12">
                        <p class="style-label"> ท่านแพ้อาหารหรือไม่ : <span>*</span></p>
                        <v-radio-group v-model="dataFrom.food_allergy" >
                            <v-radio v-for="option in filteredOptionFoodAllergy" :key="option.id" :label="option.name" :value="option.select_code">
                            </v-radio>
                        </v-radio-group>
                        <!-- <RadioOption :options="filteredOptionFoodAllergy"  @selected="updateSelectFoodAllergy" /> -->
                     

                        <div v-if="dataFrom.food_allergy === '50001'">
                            <p class="style-label"> ระบุรายละเอียดอาหารที่มีอาการแพ้ : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.food_allergy_detail"
                                label="ระบุอาหารที่แพ้"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                            ></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <p class="style-label"> เลือกประเภทอาหารของท่าน : <span>*</span></p>
                        <v-radio-group v-model="dataFrom.food" >
                            <v-radio v-for="option in filteredOptionFood" :key="option.id" :label="option.name" :value="option.select_code">
                            </v-radio>
                        </v-radio-group>
                        <!-- <RadioOption ref="food" :options="filteredOptionFood"  @selected="updateSelectFood"/> -->

                        <div  v-if="dataFrom.food === '70004'">
                            <p class="style-label"> ระบุรายละเอียดประเภทอาหาร : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.food_other"
                                label="ระบุอาหารที่แพ้"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                            ></v-text-field>
                        </div>

                    </v-col>
                </v-row>

                <!-- <v-row no-gutters>
                    <v-col cols="12">
                        <p class="style-label"><span>*</span> แสดงความยินยอม</p>
                        <CheckboxOption :options="filteredOption"/>
                    </v-col>
                </v-row> -->

            </div>

            <div class="box-receipt mt-5" v-if="dataFrom.register_type === '40002'" >
                <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลใบเสร็จรับเงิน</div>
                <v-row no-gutters>
                    <v-col cols="12">
                        <p class="style-label"> เลือกประเภทข้อมูลใบเสร็จรับเงิน : <span>*</span></p>
                        <v-radio-group v-model="dataFrom.select_receipt" >
                            <v-radio v-for="option in filteredOptionReceipt" :key="option.id" :label="option.name" :value="option.select_code">
                            </v-radio>
                        </v-radio-group>
                        
                    </v-col>
                </v-row>  
            </div>
            
            <div class="box-coment">
                    
                <v-row no-gutters>
                    <v-col cols="12">
                        <p class="style-label">หมายเหตุ *</p>
                        <div>
                            <p class="mb-0">1. ผู้สมัครเข้าร่วมอบรมกรุณาชำระค่าสมัครผ่านระบบลงทะเบียนได้ที่ https://daa/gcp2024</p>
                            <p class="mb-0">2. ผู้สมัครต้องชำระเงินด้วยตนเองเท่านั้น เพื่อให้ชื่อผู้ชำระเงินตรงกับใบชำระเงินในระบบลงทะเบียน <span class="text-danger">(ไม่สามารถชำระเงินแทนผู้อื่นได้)</span></p>
                            <p class="mb-0">3. หากมีข้อสงสัยในการลงทะเบียนหรือการเข้าร่วมอบรม ติดต่อได้ที่เบอร์โทร 093-4172747 หรือติดต่อ Email : daraporn.dua@cra.ac.th</p>
                        </div>
                    </v-col>
                </v-row>
                <br>
                <v-row no-gutters>
                    <v-col cols="12">
                        <p class="style-label"><span class="text-danger">*</span>ผู้สมัครที่ทำการชำระเงิน ในระหว่างวันจันทร์ – วันพฤหัสบดี จะได้รับการยืนยันสถานะการชำระเงินในภายในวันศุกร์</p>
                        <p class="style-label"><span class="text-danger">*</span>ผู้สมัครที่ทำการชำระเงิน ในระหว่างวันศุกร์ – วันอาทิตย์ จะได้รับการยืนยันการชำระเงินในภายในวันจันทร์</p>
                    
                    </v-col>
                </v-row>
                          
            </div>

            <div class="box-confirm text-center mt-7">
            
                <p class="h5 text-danger font-weight-bold">โปรดตรวจสอบข้อมูลการลงทะเบียนของท่าน ก่อนทำการยืนยันการลงทะเบียน</p>
                <div class="d-flex align-center justify-center mb-4">
                    <v-checkbox
                        v-model="dataFrom.confirm_register"
                        color="primary"
                        hide-details
                        class="pt-0 mt-0"
                    ></v-checkbox>
                    <span class="h5 font-weight-bold text-dark">ยืนยันว่าข้อมูลการลงทะเบียนถูกต้อง</span>
                </div>
                
                <v-btn class="bg-green btn-confirm font-weight-bold" @click="saveRegister">ยืนยัน</v-btn>


            </div>
                
        </v-form>

    </div>
</template>
<script>
    import axios from 'axios';
    import moment from "moment";
    import Swal from 'sweetalert2';
    export default {
        data: () => ({
            isEdit: false,
            valid: true,
            dataFrom: {},
            postcode: '',
            provinces: [],
            districts: [],
            subdistricts: [],
            options: [],
            optionsCourses: [],
            valueCheckboxCourse: [],
            selectedItems: [],
            selectedProvince: null,
            selectedDistrict: null,
            selectedSubdistrict: null,
            selectedPostcode: null,
            headerCourses: [
                { text: 'name', align: 'left', value: 'name' },
                { text: 'type_register', align: 'left', value: 'type_seminar' },
                { text: 'price', align: 'left', value: 'price' },

            ],
        }),
        computed: {
            formTitle () {
                return this.$route.params.id  ? 'แก้ไขข้อมูลลงทะเบียน' : 'ลงทะเบียน'
            },
            filteredTitleName() {
                return this.options.filter(option => option.select_catagory === 1);
            },
            filteredEducation() {
            return this.options.filter(option => option.select_catagory === 3);
        },
            filteredRegiterStatus() {
                return this.options.filter(option => option.select_catagory === 4);
            },
            filteredPotionJob() {
                return this.options.filter(option => option.select_catagory === 2);
            },
            filteredOptionFoodAllergy() {
                return this.options.filter(option => option.select_catagory === 5);
            },
            filteredOptionFood() {
                return this.options.filter(option => option.select_catagory === 7);
            },
            filteredOptionReceipt(){
                return this.options.filter(option => option.select_catagory === 9);
            },
            filteredOptionCourses() {
            
            let optionsCourses = []
            if(this.dataFrom.register_type === '40001'){
                optionsCourses = this.optionsCourses.filter(option => option.name === 'Onsite');
            }else{
                optionsCourses = this.optionsCourses.filter(option => option.name === 'Onsite' || option.name === 'Online');

            }

            return optionsCourses;
        },


        },
        watch: {
          
        },
        mounted(){
            this.fetchProvinces();
            this.fetchSelectList();
            this.fetchCourses();
            if (this.$route.name === 'registration-edit') {
            this.isEdit = true;
            this.isHidden = !this.isHidden;
            this.fechRegisterById(this.$route.params.id);
                // Load data based on this.$route.params.id for editing
            }
        },
        methods: {
            async saveRegister(){
                if(this.$refs.form.validate()){
                    if(this.isEdit === false){
                        console.log('=======');
                        try {
                            // รับวันที่ปัจจุบัน
                            let currentDate = moment();

                            // เพิ่ม 3 วัน
                            currentDate.add(3, 'days');

                            // รูปแบบใหม่ (YYYY-MM-DD HH:mm:ss)
                            let start_date = moment.format('YYYY-MM-DD HH:mm:ss');
                            let end_date = currentDate.format('YYYY-MM-DD HH:mm:ss');

                            const fd = {
                    
                            "register_type"             : this.dataFrom.register_type,
                            "course_id"                 : this.valueCheckboxCourse[0].id,
                            "course_name"               : this.valueCheckboxCourse[0].name,
                            "course_price"              : this.valueCheckboxCourse[0].price,
                            "check_course_other_other"        : this.dataFrom.check_course_other,
                            "title_name"                : this.dataFrom.title_name,
                            "title_name_other"          : this.dataFrom.title_name_other,
                            "name_th"                   : this.dataFrom.name_th,
                            "lastname_th"               : this.dataFrom.lastname_th,
                            "name_en"                   : this.dataFrom.name_en,
                            "lastname_en"               : this.dataFrom.lastname_en,
                            "education"                 : this.dataFrom.education,
                            "receipt_name"              : this.dataFrom.receipt_name,
                            "id_card_number"            : this.dataFrom.id_card_number,
                            "confirm_receipt"           : this.dataFrom.confirm_receipt,
                            "company_name"              : this.dataFrom.company_name,
                            "company_address"           : this.dataFrom.company_address,
                            "province_id"               : this.selectedProvince === null ? "" : this.selectedProvince.province_code,
                            "district_id"               : this.selectedDistrict === null ? "" : this.selectedDistrict.district_code,
                            "subdistrict_id"            : this.selectedSubdistrict === null ? "" : this.selectedSubdistrict.sub_district_code,
                            "postcode"                  : this.postcode,
                            "email"                     : this.dataFrom.email,
                            "phone"                     : this.dataFrom.phone,
                            "phone_other"               : this.dataFrom.phone_other,
                            "employee_id"               : this.dataFrom.employee_id,
                            "job_position"              : this.dataFrom.job_position,
                            "job_position_other"        : this.dataFrom.job_position_other,
                            "work_experience"           : this.dataFrom.work_experience,
                            "food_allergy"              : this.dataFrom.food_allergy,
                            "food_allergy_detail"       : this.dataFrom.food_allergy_detail,
                            "food"                      : this.dataFrom.food,
                            "food_other"                : this.dataFrom.food_other,
                            "receipt_order"             : this.dataFrom.select_receipt, 
                            "confirm_register"          : this.dataFrom.confirm_register,
                            "create_date"               : start_date,
                            "status_register"           : this.dataFrom.register_type === "40001" ? "12002" : "12001",
                            "end_date"                  : end_date,
                            "cance_oreder"              : 11002,
                        }

                        console.log(fd);
                        console.log(this.dataFrom);
                        console.log(this.valueCheckboxCourse);
                        const registerPath = `/api_gcp/Register/addRegister`

                        let response =  await axios.post(`${registerPath}`, fd)

                        console.log(response);

                        if(response.data.data){
                            this.getDigit(response.data.data) 
                        }

                        
                        await Swal.fire({
                            icon: 'success',
                            title: 'บันทึกสำเร็จ',
                            text: 'ระบบได้ทำการบันทึกข้อมูลของคุณแล้ว'
                        }).then( function(){


                        });

                        await this.$router.push({ name: 'registration-detail', params: { id: response.data.data }})

                        } catch (error) {
                            console.error('Error Insert register:', error);
                        }
                    }else{

                        const date = moment();
                        const formattedDate = date.format('YYYY-MM-DD HH:mm:ss'); 

                        const fdEdit = {
                            "register_id"               : this.dataFrom.id,
                            "title_name"                : this.dataFrom.title_name,
                            "title_name_other"          : this.dataFrom.title_name_other,
                            "name_th"                   : this.dataFrom.name_th,
                            "lastname_th"               : this.dataFrom.lastname_th,
                            "name_en"                   : this.dataFrom.name_en,
                            "lastname_en"               : this.dataFrom.lastname_en,
                            "education"                 : this.dataFrom.education,
                            "receipt_name"              : this.dataFrom.receipt_name,
                            "id_card_number"            : this.dataFrom.id_card_number,
                            "confirm_receipt"           : this.dataFrom.confirm_receipt,
                            "company_name"              : this.dataFrom.company_name,
                            "company_address"           : this.dataFrom.company_address,
                            "province_id"               : this.selectedProvince === null ? "" : this.selectedProvince.province_code,
                            "district_id"               : this.selectedDistrict === null ? "" : this.selectedDistrict.district_code,
                            "subdistrict_id"            : this.selectedSubdistrict === null ? "" : this.selectedSubdistrict.sub_district_code,
                            "postcode"                  : this.postcode,
                            "email"                     : this.dataFrom.email,
                            "phone"                     : this.dataFrom.phone,
                            "phone_other"               : this.dataFrom.phone_other,
                            "employee_id"               : this.dataFrom.employee_id,
                            "job_position"              : this.dataFrom.job_position,
                            "job_position_other"        : this.dataFrom.job_position_other,
                            "work_experience"           : this.dataFrom.work_experience,
                            "food_allergy"              : this.dataFrom.food_allergy,
                            "food_allergy_detail"       : this.dataFrom.food_allergy !== "50001" ?  null : this.dataFrom.food_allergy_detail,
                            "food"                      : this.dataFrom.food,
                            "food_other"                : this.dataFrom.food !== "70004" ? null : this.dataFrom.food_other,
                            "receipt_order"           : this.dataFrom.select_receipt, 
                            "confirm_register"          : this.dataFrom.confirm_register,
                            "modified_by"               : this.dataFrom.id,
                            "modified_date"             : formattedDate
                        }

                        console.log(fdEdit);

                        const registerEditPath = `/api_gcp/Register/editRegister`
                        await axios.post(`${registerEditPath}`, fdEdit)

                        await Swal.fire({
                            icon: 'success',
                            title: 'บันทึกสำเร็จ',
                            text: 'ระบบได้ทำการบันทึกข้อมูลของคุณแล้ว'
                        }).then( function(){


                        });


                    }
                 
                }else{
                    await Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                    });
                }
            },
            async getDigit(id){

                let idProject           = '0041'
                let formatPaymentDate   = moment().format('DD-MM-YY')
                let paymentDate         = formatPaymentDate.replace(/-/g, "");

                var string              = "" + id;
                var pad1                = "000000";
                let running_no_1        = pad1.substring(0, pad1.length - string.length) + string;
                var pad2                = "00000000";
                let running_no_2        = pad2.substring(0, pad2.length - string.length) + string;

                const reference_no_1    = idProject + paymentDate + running_no_1
                const reference_no_2    = idProject + running_no_2 + paymentDate

                const fd = {
                    "reference_no_1"    : reference_no_1,
                    "reference_no_2"    : reference_no_2,
                    "cost"              : this.valueCheckboxCourse[0].price,
                }

                const digitPath = `/CRAServices/payment/get_digit`
                let response =  await axios.post(`${digitPath}`, fd)

                if(response.data){

                    const lastDigit             = response.data.last_2_digit
                    const FormatReference_no_1  = reference_no_1 + lastDigit

                    const fd = {
                        "reference_no_1"    : FormatReference_no_1,
                        "reference_no_2"    : reference_no_2,
                        "id"                : id,
                    }

                    const updateReferencePath = `/api_gcp/Register/updateReferenceRegister`

                    await axios.post(`${updateReferencePath}`, fd)

                }

            },
            async fechRegisterById(id){

                try {


                const registerByIdPath          = `/api_gcp/Register/getRegisterById`
                const response                  = await axios.get(`${registerByIdPath}/${id}`)
                const datas                     = response.data.data[0]

                this.dataFrom                   = datas
                
                this.valueCheckboxCourse.id  = datas.course_id

                console.log(this.valueCheckboxCourse.value);


                console.log(datas);
                // setTimeout(async ()  => {

                        // this.dataFrom.name_th                 = datas.name_th, 
                        // this.dataFrom.lastname_th             = datas.lastname_th, 
                        // this.dataFrom.name_en                 = datas.name_th, 
                        // this.dataFrom.lastname_en             = datas.lastname_en, 
                        // this.dataFrom.phone                   = datas.phone,
                        // this.dataFrom.phone_other             = datas.phone_other,
                        // this.dataFrom.employee_id             = datas.employee_id,
                        // this.dataFrom.company_name            = datas.company_name,
                        // this.dataFrom.company_address         = datas.company_address,
                        // this.dataFrom.selectedProvince        = datas.province_id,
                        // this.dataFrom.selectedDistrict        = datas.district_id,
                        // this.dataFrom.selectedSubdistrict     = datas.subdistrict_id,
                        // this.valueRegisterStatus              = datas.register_type,
                        // this.valueTitleName                   = datas.title_name,
                        // this.dataFrom.title_name_other        = datas.title_name_other,
                        // this.valuePositionJob                 = datas.job_position,
                        // this.dataFrom.job_position_other      = datas.job_position_other,
                        // this.valueEducation                   = datas.education
                        // this.confirm_register                 = datas.confirm_register
                        // this.selectOptionFoodb                = datas.check_course_other_other

                } catch (error) {
                    console.log('fechRegisterById', error);
                }

            },
            async fetchSelectList(){
                try {
                    const response = await axios.get('/api_gcp/getSelectList');

                    const selectList = await response.data.data

                    this.options = selectList;

                    this.selectedOption = this.options.length > 0 ? this.options[0].id : null;

                } catch (error) {
                    console.error('Error fetching provinces:', error);
                }
            },
            async fetchCourses(){
                try {
                    const response = await axios.get('/api_gcp/getSelectCourses');

                    const selectcourses = await response.data.data

                    this.optionsCourses = selectcourses;
                    
                    console.log(this.optionsCourses);


                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            },
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
            clearEditData() {
                this.dataFrom = {}; // เคลียร์ข้อมูลการแก้ไข
                this.isEdit = false; // สลับโหมดกลับไปยังโหมดการเพิ่มข้อมูล
            }

        },
        beforeRouteLeave(to, from, next) {
            // ตรวจสอบว่ากำลังออกจากหน้าแก้ไขไปยังหน้าลงทะเบียนหรือไม่
            if (from.name === 'registration-edit' && to.name === 'registration') {
                console.log('==========test');
            this.clearEditData(); // เรียกใช้เมื่อกำลังออกจากหน้าแก้ไขไปยังหน้าลงทะเบียน
            }
            next(); // ดำเนินการต่อไป
        }
    }
</script>
<style>
     .text-required{
        font-size: 1.25em;
        color: #dc3545;
    }
    .h5{
        font-size: 1.25rem;
    }

    .style-input .v-input__slot{
        height: 42px;
        background: transparent;
        box-shadow: none!important;
        border: 1px solid #ced4da;

    }
    .table-regis td{
        border: 1px solid #ddd;
        padding: 8px!important;
        font-size: 18px!important;
        color: #000!important;
    }
    .table-regis th {
        border: 1px solid #ddd;
        padding: 16px!important;
        font-size: 18px!important;
        color: #000!important;
    }
</style>