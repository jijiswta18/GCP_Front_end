<template>
    <div class="receiptImport">
        <h2 class="mb-3">อัพโหลดข้อมูลการชำระเงิน</h2> 
        <v-row justify="center">
            <v-col cols="10">
                <p class="style-label">อัพโหลด</p>

                <v-file-input
                    v-model="file"
                    label="เลือกไฟล์"
                    :prepend-icon="null"
                    @change="onFileChange"
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
        <v-row justify="center">
            <v-btn>ยืนยัน</v-btn>
        </v-row>
    </div>
</template>
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
</style>