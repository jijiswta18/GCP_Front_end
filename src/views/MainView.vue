<template>
  <div class="main-view">
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <img src="@/assets/images/GCP03.png"/>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
 
    <v-row>
      <v-col cols="6">
        <img src="@/assets/images/GCP01.png"/>
      </v-col>
      <v-col cols="6">
        <img src="@/assets/images/GCP02.png"/>
      </v-col>
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
    //     const path = `/api_gcp/Register/sendMail`

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
</style>

 


  
  