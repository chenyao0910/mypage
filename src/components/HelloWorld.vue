<script setup lang="ts">
import {useDark, useToggle} from '@vueuse/core'
import SvgIcon from "./SvgIcon.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>

<template>
  <div class="flex flex-col dark:bg-black bg-white h-screen">
    <div  class="flex flex-row-reverse h-10">
      <label class="inline-flex items-center cursor-pointer px-4">
        <input type="checkbox" @click="toggleDark()" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
    <div class="flex flex-1 justify-center items-center bg-white dark:bg-black">
      <div class="text-center text-black dark:text-white">
          I'm Yao Chen.
        <div class="flex flex-row gap-x-16">
          <a href="https://www.linkedin.com/in/yao-chen-937015168/">
            <svg-icon class="w-6 h-6" name="linkedin"></svg-icon>
          </a>
          <a href="https://github.com/chenyao0910">
            <svg-icon class="w-6 h-6" name="github2"></svg-icon>
          </a>
        </div>
      </div>
    </div>
  </div>

</template>

<style >

</style>
