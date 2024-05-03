<template>
    <div class="regisDetail">
        <v-card class="pd-125">
            <h2 class="mb-3">ข้อมูลผู้ลงทะเบียน | <span class="text-warning">แก้ไขข้อมูล</span></h2>

            <v-row>
                <v-col>
                    <div class="mb-3 h5">ข้อมูลส่วนตัว</div>
                    <div class="box-profile">
                        <p><span class="text-warning">คำนำหน้า</span></p>   
                        <p><span class="text-warning">ชื่อ</span></p>   
                        <p><span class="text-warning">นามสกุล</span></p>   
                        <p><span class="text-warning">ตำแหน่งปัจจุบัน</span></p>   
                        <p><span class="text-warning">ต้นสังกัด/หน่วยงาน</span></p>   
                        <p><span class="text-warning">เบอร์โทรศัพท์</span></p>   
                        <p><span class="text-warning">เบอร์โทรศัพท์มือถือ</span></p>   
                        <p><span class="text-warning">อีเมล</span></p>   
                    </div>
                    <div class="mb-3 h5">ข้อมูลใบเสร็จรับเงิน</div>
                    <div class="box-datareceipt">
                        <p><span class="text-warning">ชื่อที่ใช้สำหรับออกใบเสร็จรับเงิน</span></p>  
                        <p><span class="text-warning">เลขบัตรประชาชน/เลขประจำตัวผู้เสียภาษีอากร</span></p>  
                        <p><span class="text-warning">ที่อยู่</span></p>  
                        <p><span class="text-warning">จังหวัด</span></p>  
                        <p><span class="text-warning">อำเภอ/เขต</span></p>  
                        <p><span class="text-warning">ตำบล/แขวง</span></p>  
                        <p><span class="text-warning">รหัสไปรษณีย์</span></p>  
                    </div>
                    <div class="mb-3 h5">ลงทะเบียนเข้าร่วมประชุม</div>
                    <div class="box-meet">
                        <p><span class="text-warning">ประเภทผู้สมัคร</span></p>  
                        <p><span class="text-warning">รายการที่ต้องการสมัคร</span></p>  
                     
                    </div>
                    <div class="mb-3 h5">ข้อมูลอื่น ๆ</div>
                </v-col>
                <v-col>
                    <div class="mb-3 h5">ข้อมูลการชำระเงิน</div>
                    <div class="box-receipt">
                        <p><span>สถานะ</span></p>   
                        <p><span class="text-warning">ค่าลงทะเบียน</span></p>   
                        <p><span class="text-warning">ประเภทผู้สมัคร</span></p>   
                        <p><span class="text-warning">รายการที่ต้องการสมัคร</span></p>   
                        <p><span>เข้าร่วมอบรม</span></p>   
                        <p><span>กำหนดชำระเงินภายใน</span></p>   
                        <p><span>เบอร์โทรศัพท์มือถือ</span></p>   
                        <p><span>สถานะออกใบเสร็จรับเงิน</span></p>   
                    </div>
                    <v-card class="pd-125 mb-6">
                        <h2 class="mb-3 text-center">เมนูอัพเดทสถานะ</h2>
                        <div class="btn-danger text-white text-center py-3 px-3 mb-3">พรีวิวข้อมูลใบเสร็จรับเงิน</div>
                    </v-card>
                    <v-card class="pd-125">
                        <h2 class="mb-3 text-center">เมนูข้อมูลใบเสร็จ</h2>
                        <div class="btn-blue text-white text-center py-3 px-3 mb-3">พรีวิวข้อมูลใบเสร็จรับเงิน</div>
                        <div class="btn-warning text-white text-center py-3 px-3 mb-3">แก้ไขข้อมูลใบเสร็จรับเงิน</div>
                        <div class="btn-danger text-white text-center py-3 px-3 mb-3">ยกเลิกใบเสร็จรับเงิน</div>
                    </v-card>
                </v-col>
            </v-row>
           
        </v-card>
        
    </div>
   
</template>
<style>
    .pd-125{
     padding: 1.25rem;
    }
    .btn-danger{
        background-color: #dc3545!important;
        border-color: #dc3545!important;
        /* width: 100%;
        padding: .5rem 1rem!important;
        font-size: 1.25rem!important; */
    }
    .btn-blue{
        background-color: #243C7F;
        background-color: #243C7F;
    }
    .btn-warning{
        background-color: #F36C22!important;
        border-color: #F36C22!important;
    }
    /* .btn-danger span{
        color: white;
    } */

</style>