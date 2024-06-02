<template>
    <div class="receipt_print">
        <div class="page">
            <table>
                <tr>
                    <td style="width: 50%; padding: 12% 2% 0% 2%;">
                        <table>
                            <tr>
                                <td colspan="3" style="text-align: center !important;">
                                    <h3><b>ใบเสร็จรับเงิน (Receipt)</b></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td style="width: 70%; text-align: right;"><b>เลขที่ (Receipt No.)</b></td>
                                            <!-- <td style="padding-left: 25px;">{{ $data->receipt_no }}</td> -->
                                        </tr>
                                        <tr>
                                            <td style="width: 70%; text-align: right;"><b>วันที่ (Date)</b></td>
                                            <!-- <td style="padding-left: 25px;">{{ App\Http\Controllers\Controller::date_format_thai($data->create_datetime) }}</td> -->
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td style="width: 35%;"><b>ได้รับเงินจาก (Received)</b></td>
                                            <td>
                                            <!-- {{ $data->name }} -->
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="width: 35%;"><b>ชื่อผู้เข้าอบรม (Name)</b></td>
                                            <td>
                                                <!-- {{ (!empty($data->title_th_other) ? $data->title_th_other : $data->title_th)." ".$data->firstname_th." ".$data->lastname_th }} -->
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b>ที่อยู่ (Address)</b></td>
                                            <!-- <td>{{ $data->address.(!empty($data->sub_district) ? " แขวง/ตำบล $data->sub_district " : NULL).(!empty($data->district) ? " เขต/อำเภอ $data->district " : NULL).(!empty($data->province) ? " จังหวัด $data->province " : NULL).(!empty($data->zip_code) ? " รหัสไปรษณีย์ $data->zip_code " : NULL) }}</td> -->
                                        </tr>
                                        <tr>
                                            <td><b>รหัสประจำตัวผู้เสียภาษี (Tax ID)</b></td>
                                            <!-- <td>{{ $data->id_card_number }}</td> -->
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <th style="width: 25%;">ลำดับที่<br>(No.)</th>
                                            <th style="width: 70%;">รายการ<br>(Description)</th>
                                            <th>จำนวนเงิน/บาท<br>(Amount/Baht)</th>
                                        </tr>
                                        <tr>
                                            <td colspan="3"></td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center;">1</td>
                                            <td style="padding-left: 8%;">ค่าลงทะเบียนงานประชุมวิชาการด้านการแพทย์ภัยพิบัติและฉุกเฉิน ประจำปี 2567  The First CRA Disasters and Emergencies Management Conference. “Time To Move Forward” ระหว่างวันที่ 29-31 กรกฎาคม 2567</td>
                                            <!-- <td style="text-align: center;">{{ number_format($data->price) }}</td> -->
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td style="border-bottom: 1px solid #000000;"></td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center;">รวม</td>
                                            <!-- <td style="padding-left: 8%;">{{ App\Http\Controllers\Controller::convertToBahtText($data->price) }}</td> -->
                                            <!-- <td style="text-align: center; border-bottom: 3px double #000000;">{{ number_format($data->price) }}</td> -->
                                        </tr>
                                        <tr>
                                            <td style="text-align: center; padding-top: 0px;">(Total Amount)</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                    <tr>
                                            <td>
                                                <!-- {{ $data->note }} -->
                                            </td>
                                    </tr>

                                        <tr>
                                            <td>



                                                    <!-- <img src="{{ URL::asset('/image/check.jpg') }}" class="checkbox-display"/> -->
                                                    เงินโอน

                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td style="width: 60%;"></td>
                                            <td style="width: 30%; text-align: center; border-bottom: 1px solid #000000;"></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td style="text-align: center;">
                                                <p>
                                                    เจ้าหน้าที่การเงิน
                                                    <br>
                                                    <!-- ({{ $data->firstname_admin." ".$data->lastname_admin }}) -->
                                                </p>
                                            </td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td>
                                                <p>
                                                    *หมายเหตุ* ใบเสร็จรับเงินฉบับนี้จะสมบูรณ์เมื่อ
                                                    <br>
                                                    เช็คหรือตราสารที่ได้รับนั้นผ่านธนาคารและมีลายมือชื่อผู้รับเงิน
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width: 50%; padding: 12% 2% 0% 2%;">
                        <table>


                            <tr>
                                <td colspan="3" style="text-align: center !important;">
                                    <h3><b>ใบเสร็จรับเงิน (Receipt)</b></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td style="width: 70%; text-align: right;"><b>เลขที่ (Receipt No.)</b></td>
                                            <!-- <td style="padding-left: 25px;">{{ $data->receipt_no }}</td> -->
                                        </tr>
                                        <tr>
                                            <td style="width: 70%; text-align: right;"><b>วันที่ (Date)</b></td>
                                            <!-- <td style="padding-left: 25px;">{{ App\Http\Controllers\Controller::date_format_thai($data->create_datetime) }}</td> -->
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td style="width: 35%;"><b>ได้รับเงินจาก (Received)</b></td>
                                            <!-- <td>{{ $data->name }}</td> -->
                                        </tr>

                                        <tr>
                                            <td style="width: 35%;"><b>ชื่อผู้เข้าอบรม (Name)</b></td>
                                            <td>
                                                <!-- {{ (!empty($data->title_th_other) ? $data->title_th_other : $data->title_th)." ".$data->firstname_th." ".$data->lastname_th }} -->
                                            </td>
                                        </tr>


                                        <tr>
                                            <td><b>ที่อยู่ (Address)</b></td>
                                            <!-- <td>{{ $data->address.(!empty($data->sub_district) ? " แขวง/ตำบล $data->sub_district " : NULL).(!empty($data->district) ? " เขต/อำเภอ $data->district " : NULL).(!empty($data->province) ? " จังหวัด $data->province " : NULL).(!empty($data->zip_code) ? " รหัสไปรษณีย์ $data->zip_code " : NULL) }}</td> -->
                                        </tr>
                                        <tr>
                                            <td><b>รหัสประจำตัวผู้เสียภาษี (Tax ID)</b></td>
                                            <!-- <td>{{ $data->id_card_number }}</td> -->
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <th style="width: 25%;">ลำดับที่<br>(No.)</th>
                                            <th style="width: 70%;">รายการ<br>(Description)</th>
                                            <th>จำนวนเงิน/บาท<br>(Amount/Baht)</th>
                                        </tr>
                                        <tr>
                                            <td colspan="3"></td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center;">1</td>
                                            <td style="padding-left: 8%;">ค่าลงทะเบียนงานประชุมวิชาการด้านการแพทย์ภัยพิบัติและฉุกเฉิน ประจำปี 2567  The First CRA Disasters and Emergencies Management Conference. “Time To Move Forward” ระหว่างวันที่ 29-31 กรกฎาคม 2567</td>
                                            <!-- <td style="text-align: center;">{{ number_format($data->price) }}</td> -->
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td style="border-bottom: 1px solid #000000;"></td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center;">รวม</td>
                                            <!-- <td style="padding-left: 8%;">{{ App\Http\Controllers\Controller::convertToBahtText($data->price) }}</td> -->
                                            <!-- <td style="text-align: center; border-bottom: 3px double #000000;">{{ number_format($data->price) }}</td> -->
                                        </tr>
                                        <tr>
                                            <td style="text-align: center; padding-top: 0px;">(Total Amount)</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                    <tr>
                                            <td>
                                                <!-- {{ $data->note }} -->
                                            </td>
                                    </tr>

                                        <tr>
                                            <td>

                                                    <!-- <img src="{{ URL::asset('/image/check.jpg') }}" class="checkbox-display"/> -->
                                                    เงินโอน

                                            </td>
                                        </tr>



                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td style="width: 60%;"></td>
                                            <td style="width: 30%; text-align: center; border-bottom: 1px solid #000000;"></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td style="text-align: center;">
                                                <p>
                                                    เจ้าหน้าที่การเงิน
                                                    <br>
                                                    <!-- ({{ $data->firstname_admin." ".$data->lastname_admin }}) -->
                                                </p>
                                            </td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td>
                                                <p>
                                                    *หมายเหตุ* ใบเสร็จรับเงินฉบับนี้จะสมบูรณ์เมื่อ
                                                    <br>
                                                    เช็คหรือตราสารที่ได้รับนั้นผ่านธนาคารและมีลายมือชื่อผู้รับเงิน
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import CryptoJS from 'crypto-js';
    export default{
        data: () => ({
           data: {},
           receiptPrintData: {}
        }),
        created(){
            const encryptedData         = this.$route.params.receiptPrintData; // รับค่า receiptData จากพารามิเตอร์ใน URL
            const key                   = 'yourSecretKey'; // คีย์สำหรับถอดรหัส 
            const bytes                 = CryptoJS.AES.decrypt(encryptedData, key); // ใช้ CryptoJS ในการถอดรหัส
            const decryptedData         = bytes.toString(CryptoJS.enc.Utf8); // เก็บข้อมูลที่ถอดรหัสไว้ในตัวแปร decryptedData
            this.receiptPrintData       = JSON.parse(decryptedData);

        },
        mounted(){
            this.fechReceiptById()
            console.log(this.decryptedData.reference_no_1);
        },

         methods:{
            async fechReceiptById(){
                try {

                    const reference_no_1    = this.receiptPrintData.reference_no_1;
                    const reference_no_2    = this.receiptPrintData.reference_no_2;
                    const id                = this.receiptPrintData.id

                    const receiptDetailPath = `/api_gcp/detail_receipt/${reference_no_1}/${reference_no_2}/${id}`
                    
                    const response          =  await axios.post(`${receiptDetailPath}`)

                    this.data               = await response.data.data

                    console.log(this.decryptedData.reference_no_1);
                    console.log(reference_no_2);
                    console.log( id);

                  
                    window.print();
                    
                    this.$router.push({ path: '/' }); 

                } catch (error) {
                    console.log("fechReceiptById", error);   
                }

             
            },
        }
    }
</script>

<style>
    @media print {
        a[href]:after {
            content: none !important;
        }

        @page {
            margin: 0cm;
            size: A4 landscape;
        }


        .page {
            width: 297mm !important;
            height: 0mm !important;
            padding: 0cm !important;
            margin: 0cm !important;
            box-shadow: none !important;
        }

        .tool-container {
            display: none;
        }
    }

    .receipt_print{
        background: #cccccc;
        color: #000000;
        font-family: 'Chulabhorn Likit Fonts', serif;
        font-weight: normal;
        font-size: 10px !important;
    }
    .page {
        -webkit-touch-callout: none; /* prevent callout to copy image, etc when tap to hold */
        -webkit-text-size-adjust: none; /* prevent webkit from resizing text to fit */
        position: relative;
        background: #ffffff;
        size: A4;
        width: 297mm;
        height: 210mm;
        display: block;
        margin: 0 auto;
        padding-left: 1.15cm;
        padding-right: 1.15cm;
        margin-bottom: 0.50cm;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 0px;
        margin-bottom: 5px;
    }

    a {
        color: #000000;
        text-decoration: none;
    }

    td {
        vertical-align: top;
        padding: 3px;
        word-break: normal;
    }

    .tool-container {
        position: fixed;
        bottom: 35px;
        right: 35px;
        background-color: #fafafa;
        border: 3px solid #eeeeee;
        border-radius: 25px;
        z-index: 1;
    }

    .tool-container img {
        cursor: pointer;
        height: 60px;
    }

    .tool-container td {
        padding: 10px;
    }

    .checkbox-display {
        height: 15px;
    }

    .highlight-blue {
        color: #1f3d7d !important;
    }
</style>