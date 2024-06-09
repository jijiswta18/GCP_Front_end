<template>
    <div class="registerview">
        <h2 class="mb-3">{{ formTitle  }}</h2> 
        <p class="text-required">* จำเป็นต้องระบุ / Required Fields</p>
        <v-form  ref="form" lazy-validation>
        <!-- <v-form  ref="form"  v-model="valid" lazy-validation> -->
            <div class="box-seminar">
                <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ลงทะเบียนเข้ารับการอบรม</div> 
                <v-row no-gutters>
                    <v-col cols="12">
                        <p class="style-label"><span>*</span> ประเภทผู้สมัคร</p>
                        <v-radio-group v-model="register_type"  ref="RegisterTypeField" :disabled="isEdit">
                            <v-radio v-for="option in filteredRegiterStatus" :key="option.id" :label="option.name" :value="option.select_code">
                            </v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <v-row  justify="center" class="mt-3" v-if="register_type">
                  
                    <v-col cols="10">
                        
                        <v-data-table
                            v-model="valueCheckboxCourse"
                            ref="ValueCourseField" 
                            :headers="headerCourses"
                            :items="filteredOptionCourses"
                            item-value="name"
                            item-key="id"
                            show-select
                            hide-default-header
                            hide-default-footer
                            :single-select="true"
                            class="table-regis"
                           :class="{'disabled' : isEdit}"
                            
                        >
                       
                      
                        <template v-slot:header>
                            <thead>
                                <tr>
                                    <th v-if="register_type === '40001'" colspan="4" class="text-center">
                                        อัตราค่าสมัครเข้าอบรม สำหรับบุคลากรภายใน <span>*</span>
                                    </th> 
                                    <th v-else colspan="4" class="text-center">
                                        อัตราค่าสมัครเข้าอบรม สำหรับบุคลากรภายนอก <span>*</span>
                                    </th> 
                                </tr>
                            </thead>
                        </template>
                     
                        <template v-slot:[`item.price`]="{ item }">
                            <span v-if="register_type === '40001'">ไม่มีค่าลงทะเบียน</span>
                            <span v-else>{{ item.price | formatNumber }} บาท</span>
                        
                        </template>
                                   
                               
                    </v-data-table>
    
                    <h4 v-if="checkLimitCourse" class="text-danger text-center mt-3">
                        ขณะนี้ระบบลงทะเบียนหลักสูตร "แนวทางปฏิบัติการวิจัยทางคลินิคที่ดี"2567 แบบ Onsite เต็มจำนวน 
                        <br/>อยู่ในระหว่างตรวจสอบสถานะชำระเงิน
                    </h4>
                    </v-col>
                </v-row>

               
                <v-row no-gutters v-if="valueCheckboxCourse.find(it => it.id === 1 || it.id === 4 || it.id === 2)" class="mt-7">
                    <v-col cols="12" class="px-2">
                        <v-card class="px-5 py-5">
                            <p class="style-label">ท่านสนใจเข้าร่วมอบรมอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming " วันที่ 26 กรกฏาคม 2567 ณ ห้องพระอินทร์ 1-2 ชั้น 2  <br> โรงแรมอัศวิน แกรนด์ คอนเวนชั่น หรือไม่ ? * Onsite จำกัด 80 ท่าน เท่านั้น <span>*</span></p>
                            <v-radio-group v-model="dataFrom.check_course_other" ref="CheckCourseOtherField" :disabled="isEdit || checkLimitCourseOther">
                                <v-radio label="เข้าร่วม" :value="true"></v-radio>
                                <v-radio label="ไม่เข้ารวม" :value="false"></v-radio>
                            </v-radio-group>
                            <h4 v-if="checkLimitCourseOther" class="text-danger text-center mt-3">
                                ขณะนี้ระบบลงทะเบียนอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming" เต็มจำนวน 
                                <br/>อยู่ในระหว่างตรวจสอบสถานะชำระเงิน
                            </h4>
                        </v-card>

                    </v-col>
                    <!-- <v-col cols="12" class="px-2" v-if="limitCourseOther">
                        <h4 v-if="limitCourseOther" class="text-danger text-center mt-3">ขณะนี้ระบบลงทะเบียนเต็มจำนวน อยู่ในระหว่างตรวจสอบสถานะชำระเงิน สามารถกดลงทะเบียนอีกครั้งได้</h4>
                    </v-col> -->
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
                            ref="titleNameField"
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
                                ref="titleNameOtherField"
                                label="คำนำหน้า"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                            ></v-text-field>
                        </div>
                    </v-col>
                </v-row>
                <v-row  no-gutters>              
                    <v-col cols="6" class="px-2">
                        <p class="style-label">ชื่อ (ภาษาไทย) : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.name_th"
                                ref="NameThField"
                                label="ชื่อ (ภาษาไทย)"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="px-2">
                        <p class="style-label">นามสกุล (ภาษาไทย) : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.lastname_th"
                                ref="LastNameThField"
                                label="นามสกุล (ภาษาไทย)"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                            ></v-text-field>
                    </v-col>
                </v-row>
                <v-row  no-gutters>              
                    <v-col cols="6" class="px-2">
                        <p class="style-label">ชื่อ (ภาษาอังกฤษ) : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.name_en"
                                ref="NameEnField"
                                label="ชื่อ (ภาษาอังกฤษ)"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="px-2">
                        <p class="style-label">นามสกุล (ภาษาอังกฤษ) : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.lastname_en"
                                ref="LastNameEnField"
                                label="นามสกุล (ภาษาอังกฤษ)"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                            ></v-text-field>
                    </v-col>
                </v-row>
                <v-row  no-gutters v-if="register_type === '40002'">
                    <v-col cols="12" class="px-2">
                        <p  class="style-label">คุณวุฒิการศึกษาสูงสุด  : <span>*</span></p>
                        <v-autocomplete
                            label="เลือก"
                            v-model="dataFrom.education"
                            ref="EducationField"
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
                <div v-if="register_type === '40001'" class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลการติดต่อ</div>
                <div v-else class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลการติดต่อ <span class="text-warning">(โปรดกรอกข้อมูลให้ถูกต้อง เพื่อระบุข้อมูลในใบเสร็จรับเงิน)</span></div>

                <v-row no-gutters v-if="register_type === '40002'" >
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ชื่อที่ใช้สำหรับออกใบเสร็จรับเงิน : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.receipt_name"
                            ref="ReceiptNameField"
                            label="ชื่อที่ใช้สำหรับออกใบเสร็จรับเงิน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                        ></v-text-field>
                        <p class="style-label text-danger mb-0">หมายเหตุ :</p>
                        <div class="mb-4">
                            <p class="mb-0 text-danger">1. กรณีที่ออกใบเสร็จในนามบุคคลทั่วไป ให้ระบุชื่อ-นามสกุล</p>
                            <p class="mb-0 text-danger">2. กรณีที่ออกใบเสร็จในนามองค์กร ให้ระบุชื่อองค์กร</p>
                        </div>
                    </v-col>
                </v-row>


             
                <v-row no-gutters v-if="register_type === '40002'" >
                    <v-col cols="12" class="px-2">
                        <p class="style-label">เลขบัตรประชาชน/เลขประจำตัวผู้เสียภาษีอากร : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.id_card_number"
                            ref="IdCardNumberField"
                            label="เลขบัตรประชาชน/เลขประจำตัวผู้เสียภาษีอากร"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            @keyup="handleInput('id_card_number')"
                        ></v-text-field>
                        <p class="style-label text-danger mb-0">หมายเหตุ :</p>
                        <div class="mb-4">
                            <p class="mb-0 text-danger">1. กรณีที่ออกใบเสร็จในนามบุคคลทั่วไป ให้ระบุชื่อ-นามสกุล</p>
                            <p class="mb-0 text-danger">2. กรณีที่ออกใบเสร็จในนามองค์กร ให้ระบุชื่อองค์กร</p>
                        </div>
                    </v-col>
                 
                </v-row>
            

                <!-- <v-row no-gutters v-if="register_type === '40002'" >
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ชื่อสถานที่ปฏิบัติงาน : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.company_name"
                            ref="CompanyNameField"
                            label="ชื่อสถานที่ปฏิบัติงาน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                        ></v-text-field>
                    </v-col>
                </v-row> -->

                <v-row no-gutters v-if="register_type === '40002'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ที่อยู่สถานที่ทำงานเลขที่ : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.company_address"
                            ref="CompanyAddressField"
                            label="ที่อยู่ (หมู่ / ซอย / ถนน)"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters v-if="register_type === '40002'">
                    <v-col cols="3" class="px-2">
                        <p class="style-label">จังหวัด : <span>*</span> </p>
                        <v-autocomplete
                            label="เลือก"
                            v-model="selectedProvince"
                            ref="ProvinceField"
                            :items="provinces"
                            item-text="name"
                            item-value="province_code"
                            solo
                            clearable 
                            return-object
                            single-line
                            class="style-select"
                            @change="onProvinceChange"
                        ></v-autocomplete>
                    </v-col>
                    
                    <v-col cols="3" class="px-2">
                        <p class="style-label">เขต/อำเภอ : <span>*</span></p>
                        <v-autocomplete 
                            label="เลือก"
                            v-model="selectedDistrict"
                            ref="DistrictField"
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
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="3" class="px-2">
                        <p class="style-label">แขวง/ตำบล : <span>*</span></p>
                        <v-autocomplete
                            label="เลือก"
                            v-model="selectedSubdistrict"
                             ref="SubdistrictField"
                            :items="subdistricts"
                            item-text="name"
                            item-value="sub_district_code"
                            solo
                            clearable 
                            return-object
                            single-line
                            :disabled="!selectedDistrict"
                            @change="onSubdistrictChange"
                            class="style-select"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="3" class="px-2">
                        <p class="style-label">รหัสไปรษณีย์ : <span>*</span></p>
                        <v-text-field
                            v-model="postcode"
                            ref="PostcodeField"
                            label="รหัสไปรษณีย์"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :disabled="!selectedSubdistrict"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col cols="12" class="px-2">
                        <p class="style-label"> เบอร์โทรศัพท์มือถือ : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.phone"
                            ref="PhoneField"
                            label="เบอร์โทรศัพท์มือถือ"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            maxlength="10"
                            @keyup="handleInput('phone')"
                        
                        ></v-text-field>
                    </v-col>
                </v-row>
                
                <v-row no-gutters>
                    <v-col cols="12" class="px-2">
                        <p class="style-label">เบอร์โทรศัพท์อื่น (กรณีติดต่อไม่ได้) : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.phone_other"
                            ref="PhoneOtherField"
                            label="หมายเลขโทรศัพท์"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            maxlength="10"
                            @keyup="handleInput('phone_other')"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <p v-if="errorMessage" class="error_message not-match">ข้อมูลไม่ตรงกัน</p>
                <v-row no-gutters v-if="register_type === '40002'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label">อีเมล : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.email1"
                            ref="EmailField"
                            label="อีเมล"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :rules="emailRules"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters v-if="register_type === '40002'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label"> ยืนยันอีเมล : <span>*</span></p>
                        
                        <v-text-field
                            v-model="dataFrom.email2"
                            ref="EmailConfirmField"
                            label="ยืนยันอีเมล"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :class="{ 'error-text': !handleEnter }"
                            :messages="!handleEnter ? ['ข้อมูลยืนยันอีเมลไม่ถูกต้อง'] : []"
                            :rules="emailRules"
                         
                        ></v-text-field>
                        <!-- <span v-if="!handleEnter" class="v-message text-red"> ข้อมูลไม่ตรงกัน</span> -->
                    </v-col>
                </v-row>

                <div v-if="register_type === '40002'" class="d-flex align-center justify-center mb-4">
                 
                    <v-checkbox
                        v-model="dataFrom.confirm_receipt"
                        ref="ConfirmReceiptField"
                        color="primary"
                        hide-details
                        class="pt-0 mt-0"
                        
                    ></v-checkbox>
                    <span class="h5 font-weight-bold text-dark"> ยืนยันว่าข้อมูลในใบเสร็จรับเงินถูกต้อง</span>
                </div>


            </div>

            <div class="box-job">
                <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลการทำงาน</div>
                <v-row  no-gutters v-if="register_type === '40001'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label">รหัสพนักงาน : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.employee_id"
                            :disabled="isEdit"
                            ref="EmployeeIdField"
                            label="รหัสพนักงาน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :class="{'disabled' : isEdit}"
                            required
                            maxlength="6"
                            @keyup="handleInput('employee_id')"
                           
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row  no-gutters v-if="register_type === '40001'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label">รหัสผ่านพนักงาน : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.password"
                            :disabled="isEdit"
                            ref="PasswordField"
                            label="รหัสผ่านพนักงาน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            :class="{'disabled' : isEdit}"
                            required
                            @input="checkEmployee"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword = !showPassword"
                            autocomplete="on"

                          
                        ></v-text-field>
                    </v-col>
                </v-row>

                <div v-if="check_employee" class="text-danger text-center">ข้อมูลรหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง</div> 
              

                <v-row  no-gutters>
                    <v-col cols="12" class="px-2">
                        <p  class="style-label">ตำแหน่งงาน : <span>*</span></p>
                        
                        <v-autocomplete
                            label="เลือก"
                            v-model="dataFrom.job_position"
                            ref="JobPositionField"
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
                                ref="JobPositionOtherField"
                                label="ตำแหน่งงานอื่น ๆ (โปรดระบุ)"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                                required
                            ></v-text-field>
                        </div>
                      
                    </v-col>
                </v-row>
                
                <v-row  no-gutters v-if="register_type === '40001'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ชื่อหน่วยงาน : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.company_name"
                            ref="CompanyNameField"
                            label="ชื่อหน่วยงาน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters v-if="register_type === '40002'">
                    <v-col cols="12" class="px-2">
                        <p class="style-label">ประสบการณ์ทำงาน (ปี) : <span>*</span></p>
                        <v-text-field
                            v-model="dataFrom.work_experience"
                            ref="WorkExperienceField"
                            label="ประสบการณ์ทำงาน"
                            dense
                            solo
                            single-line
                            clearable 
                            class="style-input"
                        ></v-text-field>
                    </v-col>
                </v-row>  
            </div>
            
            <div class="box-other">
                <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลอื่น ๆ</div>
                <v-row no-gutters>
                    <v-col cols="12">
                        <p class="style-label"> ท่านแพ้อาหารหรือไม่ : <span>*</span></p>
                        <v-radio-group v-model="dataFrom.food_allergy" ref="foodAllergyField">
                            <v-radio v-for="option in filteredOptionFoodAllergy" :key="option.id" :label="option.name" :value="option.select_code">
                            </v-radio>
                        </v-radio-group>
                        <!-- <RadioOption :options="filteredOptionFoodAllergy"  @selected="updateSelectFoodAllergy" /> -->
                     

                        <div v-if="dataFrom.food_allergy === '50001'">
                            <p class="style-label"> ระบุรายละเอียดอาหารที่มีอาการแพ้ : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.food_allergy_detail"
                                ref="FoodAllergyDetailField"
                                label="ระบุอาหารที่แพ้"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
                            ></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <p class="style-label"> เลือกประเภทอาหารของท่าน : <span>*</span></p>
                        <v-radio-group v-model="dataFrom.food"  ref="FoodField">
                            <v-radio v-for="option in filteredOptionFood"  :key="option.id" :label="option.name" :value="option.select_code">
                            </v-radio>
                        </v-radio-group>
                        <!-- <RadioOption ref="food" :options="filteredOptionFood"  @selected="updateSelectFood"/> -->

                        <div  v-if="dataFrom.food === '70004'">
                            <p class="style-label"> ระบุรายละเอียดประเภทอาหาร : <span>*</span></p>
                            <v-text-field
                                v-model="dataFrom.food_other"
                                ref="FoodOtherField"
                                label="ระบุรายละเอียดประเภทอาหาร"
                                dense
                                solo
                                single-line
                                clearable 
                                class="style-input"
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

            <div class="box-receipt mt-5" v-if="register_type === '40002'" >
                <div class="mb-3 h5 bg-blue py-4 px-4 text-white">ข้อมูลใบเสร็จรับเงิน</div>
                <v-row no-gutters>
                    <v-col cols="12">
                        <p class="style-label"> เลือกประเภทข้อมูลใบเสร็จรับเงิน : <span>*</span></p>
                        <v-radio-group v-model="dataFrom.receipt_order"  ref="SelectReceiptField">
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
                        ref="ConfirmRegisterField"
                        color="primary"
                        hide-details
                        class="pt-0 mt-0"
                    ></v-checkbox>
                    <span class="h5 font-weight-bold text-dark">ยืนยันว่าข้อมูลการลงทะเบียนถูกต้อง</span>
                </div>
                
                <v-btn class="bg-green btn-confirm font-weight-bold" @click="saveRegister">ยืนยัน</v-btn>
                <!-- <v-btn class="bg-green btn-confirm font-weight-bold" @click="sendEmail">เมล</v-btn> -->


            </div>
                
        </v-form>

    </div>
</template>

<script>
    import axios from 'axios';
    import CryptoJS from 'crypto-js';
    import moment from "moment";
    import Swal from 'sweetalert2';
    export default {
        data: () => ({
            register_type : null,
            check_employee : false,
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
            errorMessage:'',
            headerCourses: [
                { text: 'name', align: 'left', value: 'name' },
                { text: 'type_register', align: 'left', value: 'type_seminar' },
                { text: 'price', align: 'left', value: 'price' },

            ],
            numberRules: [
                value => /^\d+$/.test(value) || 'โปรดป้อนตัวเลขเท่านั้น'
            ],
            emailRules: [
                v => /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v) || 'รูปแบบอีเมล์ไม่ถูกต้อง'
            ],
            limitCourse: '',
            limitCourseOther: '',
            checkLimitCourseOther: false,
            checkLimitCourse: false,
            emailErrors: [],
            emailType: 'text',
            showPassword: false,
        }),
        watch: {
            'register_type': function(newValue) {
                if (newValue && !this.isEdit) {
                    this.valueCheckboxCourse    = []
                    this.selectedProvince       = null,
                    this.selectedDistrict       = null,
                    this.selectedSubdistrict    = null,
                    this.postcode               = ''
                    this.dataFrom               = {}
                
                }
            },
            'dataFrom.title_name': function(newValue) {
                if (newValue !== '10013') {
                    this.dataFrom.title_name_other = ''; // Clear title_name_other
                }
            },
            'dataFrom.job_position': function(newValue) {
                if (newValue !== '20008') {
                    this.dataFrom.job_position_other = ''; // Clear title_name_other
                }
            },
            'dataFrom.food_allergy': function(newValue) {
                if (newValue !== '50001') {
                    this.dataFrom.food_allergy_detail = ''; // Clear title_name_other
                }
            },
            'dataFrom.food': function(newValue) {
                if (newValue !== '70004') {
                    this.dataFrom.food_other = ''; // Clear title_name_other
                }
            }
        },
        filters: {
            formatNumber(value) {
            return new Intl.NumberFormat().format(value)
            }
        },
        computed: {
            handleEnter: function() {
                return this.dataFrom.email1 === this.dataFrom.email2;
            },
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
                if(this.register_type === '40001'){
                    optionsCourses = this.optionsCourses.filter(option => option.type_register === '40001' );
                }else{
                    optionsCourses = this.optionsCourses.filter(option =>  option.type_register != '40001' );

                }
                return optionsCourses;
            },
            // limitRegisterOnsite(){
            //     return this.limitRegister.filter(option => option.select_catagory === 15);

            // }




        },
        mounted(){
            this.fetchProvinces();
            this.fetchSelectList();
            this.fetchCourses();
            this.getCountRegister();
            if (this.$route.name === 'registration-edit') {
            this.isEdit = true;
            this.isHidden = !this.isHidden;
            const encryptedData     = this.$route.params.id; // รับค่า receiptData จากพารามิเตอร์ใน URL
            const key               = 'yourSecretKey'; // คีย์สำหรับถอดรหัส 
            const bytes             = CryptoJS.AES.decrypt(encryptedData, key); // ใช้ CryptoJS ในการถอดรหัส
            const decryptedData     = bytes.toString(CryptoJS.enc.Utf8); // เก็บข้อมูลที่ถอดรหัสไว้ในตัวแปร decryptedData
            const registerEditId    = JSON.parse(decryptedData);
            this.fechRegisterById(registerEditId.id);
                // Load data based on this.$route.params.id for editing
            }
        },
        methods: {
            handleInput(field) {
            // Replace non-numeric characters with an empty string
            this.dataFrom[field] = this.dataFrom[field].replace(/[^0-9]/g, '');
            },

            async checkEmployee (){
                try {
                    const data = {
                        "username": this.dataFrom.employee_id,
                        "password": this.dataFrom.password,
                    }
                    const adPath = `/active_directory/login`
                    const response = await axios.post(adPath, data);


                    if(response.data.code === '200'){
                        this.check_employee = false;
                    }else{
                        this.check_employee = true;
                    }

                    if(!this.check_employee){
                        await Swal.fire({
                            icon: 'success',
                            title: 'ยืนยันตัวตนสำเร็จ',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                } catch (error) {
                    console.log('checkEmployee', error);
                }
              
            },
            async getCountRegister(){
                try {
                    const countRegisterPath          = `/api_gcp/Register/CounterRegister`
                    const response                  = await axios.get(`${countRegisterPath}`)
        
                    // let full = false;

                 

            if(response.data.sum_check_course_other >= parseInt(this.limitCourseOther)){
                //เต็ม
                this.checkLimitCourseOther = true;
                console.log("onsite_other ==== <", this.limitCourseOther)
            }else{ 
                //สามารถสมัครได้
                this.checkLimitCourseOther = false;
                console.log("onsite_other ==== >", this.limitCourseOther)
            }
            
         

            if(response.data.COUNT >= parseInt(this.limitCourse)){
                 //เต็ม
                // full = true;
                this.checkLimitCourse = true;
                console.log("onsite ==== <", this.limitCourse)
            }else{
                 //สามารถสมัครได้
                // full = false;    
                this.checkLimitCourse = false;           
                console.log("onsite ==== >", this.limitCourse)
            }


            if(this.checkLimitCourse){
                Swal.fire({
                    icon: 'warning',
                    html: 'ขณะนี้ระบบลงทะเบียนหลักสูตร "แนวทางปฏิบัติการวิจัยทางคลินิคที่ดี"2567 แบบ Onsite เต็มจำนวน  <br/>อยู่ในระหว่างตรวจสอบสถานะชำระเงิน',  
            
                });
            }
          
                        
                } catch (error) {
                    console.log('getCountRegister', error);
                }
             
            },
     
            textMatch() {
                return this.dataFrom.email1 === this.dataFrom.email2
            },

            showError(message, fieldRef) {
                Swal.fire({
                    icon: 'warning',
                    title: message,
                    // text: message
                }).then(() => {
                    const tableContainer = fieldRef.$el.querySelector('.v-data-table');
                    const input = fieldRef.$el.querySelector('input');
                    const firstRadioButton = fieldRef.$el.querySelector('input[type="radio"]');
                    const firstCheckboxButton = fieldRef.$el.querySelector('input[type="checkbox"]');
                    if(input){
                        input.focus();
                    }
                    if (tableContainer) {
                        tableContainer.focus();
                    }
                    if (firstRadioButton) {
                    firstRadioButton.focus();
                    }
                    if (firstCheckboxButton) {
                        firstCheckboxButton.focus();
                    }
                });
            },

            // Validation functions
            validateRequiredField(field, errorMessage, ref) {
                if (!field) {
                    return this.showError(errorMessage, ref);
                }
            },

            validateConditionalField(condition, field, errorMessage, ref) {
                if (condition && !field) {
                    return this.showError(errorMessage, ref);
                }
            },
            async saveRegister(){

                const { 
                    title_name, title_name_other,
                    name_th, lastname_th, name_en, lastname_en, education,
                    receipt_name, id_card_number,  company_address, 
                    phone, phone_other, email1, email2, confirm_receipt,
                    employee_id, job_position, job_position_other, work_experience,
                    food_allergy, food_allergy_detail, food, food_other, receipt_order,
                    confirm_register
                 } = this.dataFrom;

                if (!this.register_type) return this.showError('กรุณาระบุประเภทผู้สมัคร', this.$refs.RegisterTypeField);
                //  if (this.valueCheckboxCourse) return this.showError('กรุณาระบุอัตราค่าสมัครเข้าอบรม', this.$refs.ValueCourseField);
                //  if (this.valueCheckboxCourse.find(it => it.id === 1 || it.id === 2) && !check_course_other) return this.showError('กรุณาระบุการเข้าร่วมอบรมอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming"', this.$refs.CheckCourseOtherField);
                 if (!title_name) return this.showError('กรุณาระบุคำนำหน้า', this.$refs.titleNameField);
                 if (title_name === '10013' && !title_name_other) return this.showError('กรุณาระบุคำนำหน้าอื่น ๆ', this.$refs.titleNameOtherField);
                 if (!name_th) return this.showError('กรุณาระบุชื่อ', this.$refs.NameThField);
                 if (!lastname_th) return this.showError('กรุณาระบุนามสกุล', this.$refs.LastNameThField);
                 if (!name_en) return this.showError('กรุณาระบุชื่อภาษาอังกฤษ', this.$refs.NameEnField);
                 if (!lastname_en) return this.showError('กรุณาระบุนามสกุลภาษาอังกฤษ', this.$refs.LastNameEnField);
                 if (this.register_type === '40002' && !education) return this.showError('กรุณาระบุคุณวุฒิการศึกษาสูงสุด', this.$refs.EducationField);
                 if (this.register_type === '40002' && !receipt_name) return this.showError('กรุณาระบุชื่อที่ใช้สำหรับออกใบเสร็จรับเงิน', this.$refs.ReceiptNameField);
                 if (this.register_type === '40002' && !id_card_number) return this.showError('กรุณาระบุเลขบัตรประชาชน/เลขประจำตัวผู้เสียภาษีอากร ', this.$refs.IdCardNumberField);
                //  if (!company_name) return this.showError('กรุณาระบุชื่อสถานที่ปฏิบัติงาน', this.$refs.CompanyNameField);
                 if (this.register_type === '40002' && !company_address) return this.showError('กรุณาระบุที่อยู่สถานที่ทำงานเลขที่', this.$refs.CompanyAddressField);
                 if (this.register_type === '40002' && !this.selectedProvince) return this.showError('กรุณาเลือกจังหวัด', this.$refs.ProvinceField);
                 if (this.register_type === '40002' && !this.selectedDistrict) return this.showError('กรุณาเลือกเขต/อำเภอ', this.$refs.DistrictField);
                 if (this.register_type === '40002' && !this.selectedSubdistrict) return this.showError('กรุณาเลือกแขวง/ตำบล', this.$refs.SubdistrictField);
                 if (this.register_type === '40002' && !this.postcode) return this.showError('กรุณาระบุรหัสไปรษณีย์', this.$refs.PostcodeField);
                 if (!phone) return this.showError('กรุณาระบุเบอร์โทรศัพท์มือถือ', this.$refs.PhoneField);
                 if (!phone_other) return this.showError('กรุณาระบุเบอร์โทรศัพท์อื่น (กรณีติดต่อไม่ได้)', this.$refs.PhoneOtherField);
                 if (this.register_type === '40002' && !email1) return this.showError('กรุณาระบุอีเมล', this.$refs.EmailField);
                 if (this.register_type === '40002' && !email2) return this.showError('กรุณาระบุยืนยันอีเมล', this.$refs.EmailConfirmField);
                 if (this.register_type === '40002' && !confirm_receipt) return this.showError('กรุณายืนยันว่าข้อมูลในใบเสร็จรับเงินถูกต้อง', this.$refs.ConfirmReceiptField);
                 if (this.register_type === '40001' &&!employee_id) return this.showError('กรุณาระบุรหัสพนักงาน', this.$refs.EmployeeIdField);
                 if (!job_position) return this.showError('กรุณาระบุตำแหน่งงาน', this.$refs.JobPositionField);
                 if (job_position === '20008' && !job_position_other) return this.showError('กรุณาระบุตำแหน่งงานอื่น ๆ', this.$refs.JobPositionOtherField);
                 if (this.register_type === '40002' && !work_experience) return this.showError('กรุณาระบุประสบการณ์ทำงาน', this.$refs.WorkExperienceField);
                 if (!food_allergy) return this.showError('กรุณาระบุอาการการแพ้อาหาร', this.$refs.foodAllergyField);
                 if (food_allergy === '50001' && !food_allergy_detail) return this.showError('กรุณาระบุรายละเอียดอาหารที่มีอาการแพ้', this.$refs.FoodAllergyDetailField);
                 if (!food) return this.showError('กรุณาระบุรายละเอียดประเภทอาหาร', this.$refs.FoodField);
                 if (food === '70004' && !food_other) return this.showError('กรุณาระบุรายละเอียดประเภทอาหาร', this.$refs.FoodOtherField);
                 if (this.register_type === '40002' && !receipt_order) return this.showError('กรุณาระบุประเภทข้อมูลใบเสร็จรับเงิน', this.$refs.SelectReceiptField);
                 if (!confirm_register) return this.showError('กรุณายืนยันว่าข้อมูลการลงทะเบียนถูกต้อง', this.$refs.ConfirmRegisterField);
              

                if(this.isEdit === false){
                    try {

                        // let responseEmployee = ''
                        // if(this.register_type === "40001"){

                        //     const data = {
                        //         "username": this.dataFrom.employee_id,
                        //         "password": this.dataFrom.password,
                        //     }

                        //     const adPath = `/active_directory/login`
                    
                        //     responseEmployee = await axios.post(adPath, data);

                        // }

  
                        // console.log(responseEmployee);

                        // รับวันที่ปัจจุบัน
                        let currentDate = moment();

                        // เพิ่ม 3 วัน
                       

                        // รูปแบบใหม่ (YYYY-MM-DD HH:mm:ss)
                        let start_date = currentDate.format('YYYY-MM-DD HH:mm:ss');

                        currentDate.add(3, 'days');
                        let end_date = currentDate.format('YYYY-MM-DD HH:mm:ss');


                        const fd = {
                        "register_type"             : this.register_type,
                        "course_id"                 : this.valueCheckboxCourse[0].id,
                        "course_name"               : this.valueCheckboxCourse[0].name,
                        "course_price"              : this.valueCheckboxCourse[0].price,
                        "check_course_other"        : this.dataFrom.check_course_other,
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
                        "email"                     : this.dataFrom.email1,
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
                        "receipt_order"             : this.dataFrom.receipt_order, 
                        "confirm_register"          : this.dataFrom.confirm_register,
                        "create_date"               : start_date,
                        "status_register"           : this.register_type === "40001" ? "12002" : "12001",
                        "status_receipt"           : this.register_type === "40001" ? null : "13001",
                        "end_date"                  : end_date,
                        "cancel_order"              : 11002,
                    }

                    // let Action = false;
                    // if(responseEmployee === '' )
                    // {
                    //     Action = true;
                    // }
                    // else if(responseEmployee.data.code === '200')
                    // {
                    //     Action = true;
                    // }

                    if (this.register_type === "40001" && this.check_employee) return this.showError('ข้อมูลรหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง', this.$refs.PasswordField);

                    if( !this.check_employee ||  this.register_type === "40002"){

                        const registerPath = `/api_gcp/Register/addRegister`

                        let response =  await axios.post(`${registerPath}`, fd)

                        const registerId = { id: response.data.data };
                        
                        const key = 'yourSecretKey'; // คีย์สำหรับการเข้ารหัส

                        // Encrypt the receipt data
                        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(registerId), key).toString();
                        

                        if(response.data.data){
                            
                            this.getDigit(response.data.data)

                            const dataEmail = {

                            "register_type"         : this.register_type,
                            "course_name"           : this.valueCheckboxCourse[0].name,
                            "check_course_other"    : this.dataFrom.check_course_other,

                            }


                            const responseEmail = await axios.post('/api_gcp/Register/sendMailRegister', dataEmail)

                            console.log(responseEmail);
                        }

                    
                    await Swal.fire({
                        icon: 'success',
                        title: 'บันทึกสำเร็จ',
                        text: 'ระบบได้ทำการบันทึกข้อมูลของคุณแล้ว'
                    }).then( function(){

                    });

                    await this.$router.push({ name: 'registration-detail', params: { id: encryptedData }})
                    }
                

                    } catch (error) {
                        console.error('Error Insert register:', error);
                    }
                }else{
                    try {

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
                            "province_id"               : this.selectedProvince.length ? this.selectedProvince : this.selectedProvince.province_code,
                            "district_id"               : this.selectedDistrict.length ? this.selectedDistrict : this.selectedDistrict.district_code,
                            "subdistrict_id"            : this.selectedSubdistrict.length ? this.selectedSubdistrict : this.selectedSubdistrict.sub_district_code,
                            "postcode"                  : this.postcode,
                            "email"                     : this.dataFrom.email1,
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
                            "receipt_order"           : this.dataFrom.receipt_order, 
                            "confirm_register"          : this.dataFrom.confirm_register,
                            "modified_by"               : this.dataFrom.id,
                            "modified_date"             : formattedDate
                        }

                        const registerEditPath = `/api_gcp/Register/editRegister`
                        await axios.post(`${registerEditPath}`, fdEdit)

                        await Swal.fire({
                            icon: 'success',
                            title: 'บันทึกสำเร็จ',
                            text: 'ระบบได้ทำการบันทึกข้อมูลของคุณแล้ว'
                        }).then( function(){
                        

                        });
                        this.fechRegisterById(this.dataFrom.id);
                    } catch (error) {
                        console.log('editRegister',error);
                    }

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

                const registerByIdPath              = `/api_gcp/Register/getRegisterById`
                const response                      = await axios.get(`${registerByIdPath}/${id}`)
                const datas                         = response.data.data[0]
                
                this.dataFrom                       = datas

                this.register_type                  = datas.register_type

                this.dataFrom.check_course_other    = datas.check_course_other === 1 ? true : false

                this.selectedProvince               = datas.province_id

                this.selectedDistrict               = datas.district_id

                this.selectedSubdistrict            = datas.subdistrict_id
                
                this.postcode                       = datas.postcode
                
                this.dataFrom.email1                = datas.email
                
                this.dataFrom.email2                = datas.email

                let course                          = {"id": datas.course_id };
        
                this.valueCheckboxCourse.push(course);

                
                if (this.selectedProvince) {
                    this.fetchDistricts(this.selectedProvince);
                }

                if (this.selectedDistrict) {
                    this.fetchSubdistricts( this.selectedProvince, this.selectedDistrict);
                }


                } catch (error) {
                    console.log('fechRegisterById', error);
                }

            },

            async fetchSelectList(){
                try {
                    const response          = await axios.get('/api_gcp/getSelectList');

                    const selectList        = await response.data.data

                    this.options            = selectList;

                    const limitCourse       = selectList.filter(option => option.select_catagory === 14);

                    const limitCourseOther  = selectList.filter(option => option.select_catagory === 15);

                    this.limitCourse        =  limitCourse[0].limit
                    
                    this.limitCourseOther   =  limitCourseOther[0].limit

                } catch (error) {
                    console.error('Error fetching provinces:', error);
                }
            },

            async fetchCourses(){
                try {
                    const response = await axios.get('/api_gcp/getSelectCourses');

                    const selectcourses = await response.data.data

                    this.optionsCourses = selectcourses;
                    

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
             
                if (this.selectedDistrict ) {
                  
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
                this.dataFrom               = {}; // เคลียร์ข้อมูลการแก้ไข
                this.isEdit                 = false; // สลับโหมดกลับไปยังโหมดการเพิ่มข้อมูล
                this.valueCheckboxCourse    = []
                this.register_type          = null
            }

        },
        beforeRouteLeave(to, from, next) {
            // ตรวจสอบว่ากำลังออกจากหน้าแก้ไขไปยังหน้าลงทะเบียนหรือไม่
            if (from.name === 'registration-edit' && to.name === 'registration') {
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
    .error-text input{
        color: red!important;
    }
    .error-text {
        color: red;
    }
    .error-text .v-messages__message{
        color: red;
    }
  
    .disabled .v-data-table__checkbox{
        pointer-events: none;
    }
    
</style>