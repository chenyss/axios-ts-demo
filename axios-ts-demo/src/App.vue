<script setup lang="ts">
import { getTestData } from '@/serve/module/home';
import { onMounted } from 'vue';
 onMounted(async()=>{
   const data = await getTestData()
   console.log(data);  
 })
</script>

<template>
</template>

<style scoped>
</style>
