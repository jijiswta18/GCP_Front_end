<template>


    <v-radio-group v-model="selectedValue" >

        <!-- <pre>{{ selectedValue }}</pre>
        <pre>{{ radioValue }}</pre> -->

        <v-radio v-for="option in options" :key="option.id" :label="option.name" :value="option.select_code">
        </v-radio>
    </v-radio-group>
</template>
<script>
    export default{
        // props: {
        //     options: Array,
        //     checked: String,
        // },
         props: ['options', 'radioValue'],
        //  props: {
        //         options: {
        //         type: Array,
        //         required: true
        //         },
        //         radioValue: {
        //             type: String,
        //             required: true
        //         }
        //         // checked: {
        //         //     type: [String, Number],
        //         //     required: true
        //         // }
        //     },
            data() {
                return {
                    selectedValue: this.radioValue // Initialize selectedValue with the prop value
                };
            },
        watch:{
            selectedValue(newValue) {
                console.log('1',newValue);
                this.$emit('selected', newValue);
            },
            // selected(){
            //     console.log(this.selected);
            //     console.log(this.selected);
            // }

        }, 
        
        mounted(){
            // if (!this.selectedValue && this.options.length > 0) {
            //     this.selectedValue = this.options[0].select_code;
            // }
        },
    

        methods: {
            // emitSelectedValue() {
            //     this.$emit('selected', this.selectedValue);
            // }
        }
        
       
    }
</script>