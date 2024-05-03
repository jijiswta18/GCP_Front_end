<template>
     <div class="receiptlist">
        <h2 class="mb-3">ตรวจสอบการลงทะเบียน</h2>
        <RegisterList :headers="headers" :datas="datas"/>
     </div>
    
</template>
<script>
import RegisterList from '@/components/RegisterList.vue';
export default {
    components: { RegisterList},
    data: () => ({
    headers: [

        { text: '', align: 'center', value: 'selected' },
        { text: 'สถานะออกใบเสร็จรับเงิน', align: 'center', value: 'status' },
        { text: '', align: 'center', value: 'detail' },
        { text: 'ID', align: 'left', value: 'name' },
        { text: 'วันเวลาที่ลงทะเบียน', align: 'left', value: 'light' },
        { text: 'ชื่อ', align: 'left', value: 'height' },
        { text: 'สถานะ', align: 'left', value: 'petFriendly' },
        { text: 'Reference No 1', align: 'left', value: 'price' },
        { text: 'Reference No 2', align: 'left', value: 'price' },
    ],
    datas: [
      {
        id: 1,
        status: 'Yes',
        name: 'Fern',
        light: 'Low',
        height: '20cm',
        petFriendly: 'Yes',
        price: 20,
      },
      {
        id: 2,
        status: 'No',
        name: 'Snake Plant',
        light: 'Low',
        height: '50cm',
        petFriendly: 'No',
        price: 35,
      },
      {
        id: 3,
        status: 'Yes',
        name: 'Monstera',
        light: 'Medium',
        height: '60cm',
        petFriendly: 'No',
        price: 50,
      }, 
      {
        id: 4,
        status: 'No',
        name: 'Pothos',
        light: 'Low to medium',
        height: '40cm',
        petFriendly: 'Yes',
        price: 25,
      },
    ],
    }),
}

</script>