<template>
  <div
    class="absolute -bottom-64 lg:-bottom-20 flex flex-col lg:flex-row bg-white gap-y-4 gap-x-12 px-8 pt-8 pb-12 rounded-md"
  >
    <!-- flex Item #1 -->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">IP Address</h3>
      <span class="text-2xl">{{ iPInfo.address }}</span>
    </div>
    <!-- flex Item #2 -->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">Location</h3>
      <span class="text-2xl">{{ iPInfo.state }}</span>
    </div>
    <!-- flex Item #3 -->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">Timezone</h3>
      <span class="text-2xl">UTC {{ iPInfo.timezone }}</span>
    </div>
    <!-- flex Item #4 -->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">Isp</h3>
      <span class="text-2xl">{{ iPInfo.isp }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["iPInfo"],
};
</script>
