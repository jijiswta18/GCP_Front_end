<template>
    <div>
        <v-text-field
            v-model="search"
            label="อีเมล (ไม่ต้องเว้นวรรค)"
            solo
            class="style-input-search"
            single-line
            hide-details="auto"
            clearable 
            dense
        >
            <template v-slot:prepend-inner>คำค้นหา / Keyword</template>
        </v-text-field>
        <br>

        <v-data-table
            :headers="headers"
            :items="datas"
            :search="search"
            density="compact"
            item-key="name"
            :footer-props="{ 'items-per-page-options': [10, 25, 50, 100] }"
            class="table-regislist"
            >
          
            <template v-slot:[`item.detail`]="{ item }">
                <div @click="detailRegister(item)" class="btn-detail">ข้อมูลการลงทะเบียน</div>
            </template>
            <template v-slot:[`item.selected`]="{ item }">
                <v-checkbox
                    v-model="item.selected"
                    :label="`Checkbox : ${item.id}`"
                ></v-checkbox>
            </template>
        </v-data-table>
        

    </div>
  
</template>

<script>
    export default {
    props: ['headers', 'datas'],
    data: () => ({
        search: '',
      
    //     headers: [
    //   { text: '', align: '', value: '' },
    //   { text: 'ID', align: 'left', value: 'name' },
    //   { text: 'วันเวลาที่ลงทะเบียน', align: 'left', value: 'light' },
    //   { text: 'ชื่อ', align: 'left', value: 'height' },
    //   { text: 'สถานะ', align: 'left', value: 'petFriendly' },
    //   { text: 'Reference No 1', align: 'left', value: 'price' },
    //   { text: 'Reference No 2', align: 'left', value: 'price' },
    // ],
    // plants: [
    //   {
    //     name: 'Fern',
    //     light: 'Low',
    //     height: '20cm',
    //     petFriendly: 'Yes',
    //     price: 20,
    //   },
    //   {
    //     name: 'Snake Plant',
    //     light: 'Low',
    //     height: '50cm',
    //     petFriendly: 'No',
    //     price: 35,
    //   },
    //   {
    //     name: 'Monstera',
    //     light: 'Medium',
    //     height: '60cm',
    //     petFriendly: 'No',
    //     price: 50,
    //   },
    //   {
    //     name: 'Pothos',
    //     light: 'Low to medium',
    //     height: '40cm',
    //     petFriendly: 'Yes',
    //     price: 25,
    //   },
    //   {
    //     name: 'ZZ Plant',
    //     light: 'Low to medium',
    //     height: '90cm',
    //     petFriendly: 'Yes',
    //     price: 30,
    //   },
    //   {
    //     name: 'Spider Plant',
    //     light: 'Bright, indirect',
    //     height: '30cm',
    //     petFriendly: 'Yes',
    //     price: 15,
    //   },
    //   {
    //     name: 'Air Plant',
    //     light: 'Bright, indirect',
    //     height: '15cm',
    //     petFriendly: 'Yes',
    //     price: 10,
    //   },
    //   {
    //     name: 'Peperomia',
    //     light: 'Bright, indirect',
    //     height: '25cm',
    //     petFriendly: 'Yes',
    //     price: 20,
    //   },
    //   {
    //     name: 'Aloe Vera',
    //     light: 'Bright, direct',
    //     height: '30cm',
    //     petFriendly: 'Yes',
    //     price: 15,
    //   },
    //   {
    //     name: 'Jade Plant',
    //     light: 'Bright, direct',
    //     height: '40cm',
    //     petFriendly: 'Yes',
    //     price: 25,
    //   },
    // ],
    }),
    create(){
    
    },
    methods: {
        detailRegister(value){
            this.$router.push({ name: 'registration-detail', params: { id: value.id },})
            console.log(value);
        }
    },
    
}
</script>
<style>
    .style-input-search .v-input__slot {
        padding-left: 0!important;
        height: 42px;
        background: transparent;
        box-shadow: none!important;
        border: 1px solid #ced4da;
    }
    .style-input-search .v-input__slot .v-input__prepend-inner{
        margin-top: 0!important;
        height: 40px;
        align-items: center;
        color: #495057;
        text-align: center;
        white-space: nowrap;
        background-color: #e9ecef;
        /* border: 1px solid #ced4da; */
        margin-right: .375rem;
        padding: .375rem .75rem;
    }
    .btn-detail{
        background-color: #243C7F;
        border-radius: 5px;
        padding: 0.5rem;
        color: white;
        display: inline-block;
    }

</style>

