<template>
    <div class="select-list">
     
     
        <v-autocomplete
            label="เลือก"
            v-model="selectOptionValue"
            :items="options"
            item-text="name"
            :item-value="itemValue"
            solo
            clearable 
            class="style-select"
            required
        ></v-autocomplete>
    </div>

</template>
<script>
    export default{
        props: ['options', 'selectValue', 'itemValue'],
    
        data: () => ({
            selectOptionValue: null
        }),
        watch:{
            selectValue(){
                if(this.selectValue){
                    console.log('options',this.selectValue);
                    this.selectOptionValue = this.selectValue
                }
            },
            selectOptionValue(newValue) {
              
                this.$emit('selected', newValue);
            },

        }, 
       
    }
</script>