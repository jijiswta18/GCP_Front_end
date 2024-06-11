<template>

 
  <div class="main-view">
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <p class="text-center mb-0 text-dark">โครงการจัดอบรม</p>
        <p class="text-center mb-0 text-dark">หลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP) " 2567</p>
        <p class="text-center mb-0 text-dark">ฝ่ายพัฒนางานวิจัยทางคลินิก</p>
        <p class="text-center mb-0 text-dark">ศูนย์การเรียนรู้และวิจัยเฉลิมพระเกียรติ 60 ปี เจ้าฟ้าจุฬาภรณ์ </p>
        <p class="text-center mb-0 text-dark">วันที่ 24-26 กรกฏาคม พ.ศ. 2567 เวลา 08.00 – 16.00 น.</p>
        <p class="text-center mb-0 text-dark">ณ โรงแรมอัศวิน แกรนด์ คอนเวนชั่น</p>
        <br>
        <p class="text-dark">ขอเชิญแพทย์ พยาบาล และบุคลากรทางการแพทย์ที่สนใจเข้าร่วมการอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567<br>
          และ ขอเชิญเข้าร่วมอบรม การอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming "
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6" class="main-image text-center">
        <img src="@/assets/images/GCP03.png"/>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <p class="mb-0 text-dark">📆 กำหนดการอบรม</p>
        <p class="text-dark">ในวันที่ 24-26 กรกฏาคม 2567 เวลา 08.00 – 16.00 น.</p>
        <!-- <br> -->
        <p  class="mb-0 text-dark">📍 สถานที่ฝึกอบรม</p>
        <p class="text-dark">ณ โรงแรมอัศวิน แกรนด์ คอนเวนชั่น</p>
        <table class="main-detail">
          <tbody>
            <tr>
              <td class="text-dark">วันที่ 24-25 กรกฏาคม 2567 
                <br>เวลา 08.00 – 16.00 น.
              </td>
              <td class="text-dark">ห้องพระวิษณุ  ชั้น 3 </td>
            </tr>
            <tr>
              <td class="text-dark">วันที่ 26 กรกฏาคม 2567 
                <br>เวลา 08.00 – 16.00 น.
              </td>
              <td class="text-dark">ห้องพระอินทร์ 1-2 ชั้น 2</td>
            </tr>
          </tbody>
        </table>
        <br>
        <p class="text-dark">🚩 รับสมัครเข้าร่วมอบรม Onsite จำกัด 80 ท่าน เท่านั้น</p>
        <p class="text-dark">💻 Online  > 🌐 Microsoft Team จะจัดส่งลิ้งค์อบรมทางอีเมลล์ที่ผู้เข้าร่วมอบรมได้ลงทะเบียนไว้</p>
        <br>
        <p class="text-dark"><span>บุคลากรภายใน : </span>ฟรี!!! ไม่มีค่าลงทะเบียน</p>
       
        <div class="d-flex">
          <p class="mr-5 mb-0 text-dark"><span>บุคลากรภายนอก : </span>อัตราค่าลงทะเบียน </p>
          <p class="mb-0 text-dark">Onsite	ท่านละ 1,500 บาท
            <br>Online	ท่านละ 1,000 บาท
          </p>
        </div>
        <br>
        <p class="text-dark">✅ ผู้เข้าร่วมการอบรมจะได้รับประกาศนียบัตร e-certificate</p>
        
        <p class="text-dark">🏢 จัดโดย ฝ่ายพัฒนางานวิจัยทางคลินิก</p>
        <p class="ml5 mb-0 text-dark">ศูนย์การเรียนรู้และวิจัยเฉลิมพระเกียรติ 60 ปี เจ้าฟ้าจุฬาภรณ์</p>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
    
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <img src="@/assets/images/GCP01.png"/>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <img src="@/assets/images/GCP02.png"/>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>


    <!-- <div class="button" @click="testSendMail">
      send mail
    </div> -->

  </div>

</template>

<script>
// import axios from 'axios';
export default {

  data:() =>({

  }),
  methods: {
 
    // async testSendMail(){
    //   try {
    //     const path = `/api_gcp/Register/sendMailRegister`
      
    //     const data = {
    //       "mail" : 'sawitta.sri@cra.ac.th',
    //       "name" : 'สวิตตา ศรีจันทร์'
    //     }
    //     const response = await axios.post(`${path}`, data)

    //     console.log(response);

    //   } catch (error) {
    //     console.log('testSendMail', error);
        
    //   }
    
    // }
  },

  mounted() {}
}
</script>
<style>
    img{
      width: 100%;
    }


  .main-detail table, td {
    border: 1px solid;
    padding: 0.5rem!important;
  }

  .main-detail table {
    width: 100%;
    border-collapse: collapse;
  }
  .ml5{
    margin-left: 5rem;
  }
  .main-image img{
    width: 70%;
  }
</style>

 


  
  