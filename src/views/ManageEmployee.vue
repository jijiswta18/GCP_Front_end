<template>
    <div class="manageemployee">
        <h2 class="mb-3">จัดการข้อมูลผู้ใช้งาน</h2> 
        <v-form ref="formEmployee" v-model="valid" lazy-validation>
            <v-row  no-gutters>
                <v-col cols="6" class="px-2">
                    <p class="style-label"><span>*</span> รหัสพนักงาน</p>
                    <v-text-field
                        v-model="employee.employee_id"
                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                        label="รหัสพนักงาน"
                        dense
                        solo
                        single-line
                        clearable 
                        class="style-input"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" class="px-2">
                    <p class="style-label"><span>*</span> สิทธิ์การใช้งาน</p>
                    <v-autocomplete
                        label="เลือก"
                        v-model="employee.employee_roles"
                        :items="selectRoles"
                        item-text="value"
                        item-value="id"
                        :rules="[v => !!v || 'กรุณาเลือกรายการ']"
                        solo
                        clearable 
                        class="style-select"
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <v-row  justify="center">
                <v-col cols="3">
                    <v-btn class="btn-green" @click="saveDataEmployee">บันทึก</v-btn>
                </v-col>  
            </v-row>
        </v-form>
    </div>
</template>
<script>
    import store from '../store/index.js'

    export default {
        data: () => ({

            valid: true,
            employee : {},
            selectRoles: [
                {value: 'admin', id: "admin"},
                {value: 'finance', id: "finance"},
                {value: 'officer', id: "officer"},
                {value: 'general', id: "general"}
            ], 
            check_roles: store.getters.user,

        }),
        
        methods:{
            async saveDataEmployee(){
                if(this.$refs.formEmployee.validate()){
                    try {

                        let fd =  {
                                "employee_id"            : this.employee.employee_id,
                                "roles"                  : this.employee.employee_roles,
                                "create_by"              : this.check_roles.employee_id,
                                "create_date"            : this.$moment().format('YYYY-MM-DD HH:mm:ss'),
                                "modified_by"            : this.check_roles.employee_id,
                                "modified_date"          : this.$moment().format('YYYY-MM-DD HH:mm:ss'),
                        }


                        let createEmployeePath = `/api_gcp/ManageEmployee/createEmployee`

                        await this.$axios.post(`${createEmployeePath}`, fd)


                    } catch (error) {
                        console.log('createEmployee', error);
                    }
                }
            }


        }
    }
</script>