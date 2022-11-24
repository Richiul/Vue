<template>
  <div class="flex flex-col h-screen max-h-screen">
    <!-- Search / Results-->
    <div
      class="z-20 flex justify-center relative bg-hero-pattern bg-cover px-4 pt-8 pb-32"
    >
      <!-- Search Input -->
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4">IP Adress Tracker</h1>
        <div class="flex">
          <input
            v-model="queryIp"
            class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none"
            type="text"
            placeholder="Search for any IP adress"
          />
          <i
            @click="getIpInfo"
            class="cursor-pointer bg-black text-white px-4 rounded-tr-md rounded-br-md flex items-center fa-solid fa-chevron-right"
          ></i>
        </div>
      </div>
      <!-- IP Info -->
      <IPInfo v-if="iPInfo" v-bind:iPInfo="iPInfo" />
    </div>
    <div id="map" class="h-full z-10"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import IPInfo from "../components/IPInfo.vue";
import leaflet from "leaflet";
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";

export default {
  name: "HomeView",
  components: { IPInfo },
  setup() {
    let mymap;
    const queryIp = ref("");
    const iPInfo = ref(null);
    onMounted(() => {
      mymap = leaflet.map("map").setView([47.0555, 21.92803], 9);

      leaflet
        .tileLayer(
          `https://tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=${process.env.VUE_APP_API_KEY_MAPBOX}`,
          {
            maxZoom: 19,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            access_token: `${process.env.VUE_APP_API_KEY_MAPBOX}`,
          }
        )
        .addTo(mymap);
    });
    const getIpInfo = async () => {
      try {
        const data = await axios.get(`
https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${process.env.VUE_APP_API_KEY}&ipAddress=${queryIp.value}`);
        const result = data.data;
        console.log(result);
        iPInfo.value = {
          address: result.ip,
          state: result.location.region,
          timezone: result.location.timezone,
          isp: result.isp,
          lat: result.location.lat,
          lng: result.location.lng,
        };
        leaflet.marker([iPInfo.value.lat, iPInfo.value.lng]).addTo(mymap);
        mymap.setView([iPInfo.value.lat, iPInfo.value.lng], 13);
      } catch (err) {
        alert(err.message);
      }
    };
    return { queryIp, iPInfo, getIpInfo };
  },
};
</script>
