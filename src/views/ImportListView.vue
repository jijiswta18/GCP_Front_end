<template>
    <div class="ImportListView">

        <h4 class="mb-3">สำเร็จ</h4> 
        <v-textarea size="l" outlined></v-textarea>
        <h4 class="mb-3">ไม่สำเร็จ</h4> 
        <v-textarea size="l" outlined></v-textarea>


        <div class="btn-import text-center">
            <router-link to="/receipt-import" class="f-22 bg-gray">import อีกครั้ง</router-link>
        </div>
     
     
    </div>
</template>
<style>
    .btn-import a{
        padding: 0.5rem 4rem;
        border: 1px solid #545b62;
        color: white!important;
        text-decoration: none;
        border-radius: 4px;
    }
</style>