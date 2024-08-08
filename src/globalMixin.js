import Vue from 'vue';

Vue.mixin({
    data: () => ({
        provinces: [],
        districts: [],
        subdistricts: [],
        postcode: '',
        selectedProvince: null,
        selectedDistrict: null,
        selectedSubdistrict: null,
        selectedPostcode: null,
        project_code: '',
    }),
    filters: {
        formatNumber(value) {
            return new Intl.NumberFormat().format(value)
        },
    },
    methods:{
        formatDate(value) {
            return this.$moment(value).format("YYYY-MM-DD HH:mm:ss")
        },
        getThaiDate(item){
            if (item){
            var d = new Date(item);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
            }else{
            return "";
            }            
        },
        getColorClass (value) {
            switch (value) {
                case '12001':
                return 'text-gray';
                case '12002':
                return 'text-gray';
                case '12003':
                return 'text-success';
                case '12004':
                return 'text-success';
                case '13001':
                return 'text-gray';
                case '13002':
                return 'text-success';
                case '11001':
                return 'text-danger';
                case '11002':
                return 'text-gray';
                default:
                return '';
            }
        },
        DecimalText(txt, unitName) {
            if(txt== undefined)
            {
                return;
            }
            var thaiBathText = "";

            var valueText = txt.toString(); //.split(".")
            var unitOrder = 1;

            
            // Manage Full Value
            for (var i = valueText.length; i >= 1; i--) {
                if (i !== 1) {                    
                    thaiBathText = this.GetValueName(unitOrder, parseInt(valueText.charAt(i - 1))) + this.GetUnitName(unitOrder, parseInt(valueText.charAt(i - 1))) + thaiBathText;
                } else {
                    thaiBathText = this.GetValueName(unitOrder, parseInt(valueText.charAt(i - 1)), true) + this.GetUnitName(unitOrder, parseInt(valueText.charAt(i - 1)), true) + thaiBathText;
                }

                if (unitOrder === 7) unitOrder = 1;
                unitOrder += 1;
            }

            

            return thaiBathText  + unitName;
        },

        GetUnitName(unitOrder, value) {
            var unitName = "";
            if (value === 0 && unitOrder < 7) return unitName;
            switch (unitOrder) {
                case 1:
                    break;
                case 2:
                    unitName = "สิบ";
                    break;
                case 3:
                    unitName = "ร้อย";
                    break;
                case 4:
                    unitName = "พัน";
                    break;
                case 5:
                    unitName = "หมื่น";
                    break;
                case 6:
                    unitName = "แสน";
                    break;
                case 7:
                    unitName = "ล้าน";
                    break;
            }

            return unitName;
        },

        GetValueName(unitOrder, value, lastOrder = false, isDecimal = false) {
            var valueName = "";
            switch (value) {
                case 0:
                    if (lastOrder || isDecimal) {
                        valueName = "ศูนย์";
                    }
                    break;
                case 1:
                    if (isDecimal) valueName = "หนึ่ง";
                    else {
                        if ((lastOrder && unitOrder !== 2) || (unitOrder > 2 && unitOrder < 7)) {
                            valueName = "หนึ่ง";
                        } else if (unitOrder !== 2) {
                            valueName = "เอ็ด";
                        }
                    }
                    break;
                case 2:
                    if (unitOrder === 2 && !isDecimal) {
                        valueName = "ยี่";
                    } else valueName = "สอง";
                    break;
                case 3:
                    valueName = "สาม";
                    break;
                case 4:
                    valueName = "สี่";
                    break;
                case 5:
                    valueName = "ห้า";
                    break;
                case 6:
                    valueName = "หก";
                    break;
                case 7:
                    valueName = "เจ็ด";
                    break;
                case 8:
                    valueName = "แปด";
                    break;
                case 9:
                    valueName = "เก้า";
                    break;
            }

            return valueName;
        },

        async fetchProvinces() {
            try {
                const response = await this.$axios.get('/api_gcp/getProvince');
                this.provinces = response.data.data;
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        },

        async fetchDistricts(provinceId) {
            try {
                const response = await this.$axios.get(`/api_gcp/getDistricts?provinceId=${provinceId}`);
                const districts = response.data.data; // Adjust this according to your API response structure
                this.districts = Array.isArray(districts) ? districts : []; 
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        },

        async fetchSubdistricts(provinceId,districtId) {
            try {
                const response = await this.$axios.get(`/api_gcp/getSubdistricts?provinceId=${provinceId}&districtId=${districtId}`);
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
            if (this.selectedDistrict) {
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

        async fetchSelectList(){
            try {
                const response      = await this.$axios.get('/api_gcp/getSelectList');

                const selectList        = await response.data.data

                this.options            = selectList;


                const limitCourse       = selectList.filter(option => option.select_catagory === 14);

                const limitCourseOther  = selectList.filter(option => option.select_catagory === 15);

                const projectCode       = selectList.filter(option => option.select_catagory === 16);

                this.project_code       = projectCode[0].project_code

                // console.log(projectCode[0].project_code);

                this.limitCourse        =  limitCourse[0].limit
                
                this.limitCourseOther   =  limitCourseOther[0].limit

                this.selectedOption     = this.options.length > 0 ? this.options[0].id : null;

            } catch (error) {
                console.error('Error fetching Select List:', error);
            }
        },
    
    }
})