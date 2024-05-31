<template>
    <div class="checkbox-option">
        <v-checkbox class="mt-0" v-for="option in options" :key="option.id" :label="option.name" v-model="selectedOption" :value="option.select_code"></v-checkbox>
    </div>

</template>
<script>
    export default{
        props: ['options'],
     

        data: () => ({
            selectedOption: null
        }),
       
    }
</script>