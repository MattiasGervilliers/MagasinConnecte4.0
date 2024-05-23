<script setup lang="ts">
import type { CardInfos } from "~/components/card/Default.vue";
import type { CardNavigationInfos } from "~/components/card/Navigation.vue";
import { parseCommandNumber, parseStation } from "~/models/parser";

import {
  type CommandNumberDto,
  type StationDto,
  type CommandNumber,
} from "~/models/weatherReport";

const cardsNavigationInfos: CardNavigationInfos[] = [
  {
    title: "Technologies",
    description: "Découvrez les dernières technologies",
    path: "/technologies",
    iconUrl: "i-heroicons-camera-solid",
  },
  {
    title: "Photovoltaïque",
    description: "Découvrez les panneaux solaires",
    path: "/photovoltaique",
    iconUrl: "i-heroicons-camera-solid",
  },
  {
    title: "Epicerie-solidaire",
    description: "Découvrez notre épicerie solidaire",
    path: "/epicerie-solidaire",
    iconUrl: "i-heroicons-camera-solid",
  },
  {
    title: "Epicerie-solidaire",
    description: "Découvrez notre épicerie solidaire",
    path: "/epicerie-solidaire",
    iconUrl: "i-heroicons-camera-solid",
  },
];

const cardsInfos: CardInfos[] = [
  {
    title: "Lorem ipsum dolor sit amet",
    subTitle: "Hic nisi repellat sed voluptatem consequatur",
    description:
      "Qui temporibus rerum et cumque quod et iure officia est doloribus aspernatur sit nihil quia. In eius cumque et consequatur exercitationem qui pariatur Quis! Est placeat consequatur ut animi sapiente aut voluptatem molestias sed dolorem fugit et sunt maiores aut quia tempore.",
    publicImage: "test.jpg",
    isReversed: false,
  },

  {
    title: "Lorem ipsum dolor sit amet",
    subTitle: "Hic nisi repellat sed voluptatem consequatur",
    description:
      "Qui temporibus rerum et cumque quod et iure officia est doloribus aspernatur sit nihil quia. In eius cumque et consequatur exercitationem qui pariatur Quis! Est placeat consequatur ut animi sapiente aut voluptatem molestias sed dolorem fugit et sunt maiores aut quia tempore.",
    publicImage: "test.jpg",
    isReversed: true,
  },
];

const apiKey =
  "eyJ4NXQiOiJZV0kxTTJZNE1qWTNOemsyTkRZeU5XTTRPV014TXpjek1UVmhNbU14T1RSa09ETXlOVEE0Tnc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJBbGVzc2lvcGx0QGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoiQWxlc3Npb3BsdCIsInRpZXJRdW90YVR5cGUiOm51bGwsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoiRGVmYXVsdEFwcGxpY2F0aW9uIiwiaWQiOjEzMTU3LCJ1dWlkIjoiYjNjNjAzY2UtNmRkMy00NmU3LThkYTEtMmI4MjgyNDhkNmQxIn0sImlzcyI6Imh0dHBzOlwvXC9wb3J0YWlsLWFwaS5tZXRlb2ZyYW5jZS5mcjo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyI1MFBlck1pbiI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IkRvbm5lZXNQdWJsaXF1ZXNDbGltYXRvbG9naWUiLCJjb250ZXh0IjoiXC9wdWJsaWNcL0RQQ2xpbVwvdjEiLCJwdWJsaXNoZXIiOiJhZG1pbl9tZiIsInZlcnNpb24iOiJ2MSIsInN1YnNjcmlwdGlvblRpZXIiOiI1MFBlck1pbiJ9XSwiZXhwIjoxNzE3MDU5MTIyLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzE2NDU0MzIyLCJqdGkiOiI2NDI3YjdiZi1jYWMxLTQ1MzctOGMyZC0xYzlmNTM2ZTM3YzcifQ==.oH201iOtcWgC_cAiyzgda0MUsByNLWKylaV0VHtlWWlHuppxVS6C7paouvtyGQrWqs7X9oQwpX3yH4D9jk5sbSRZWopozEfwDH6J49H7rYMJ8n6IWRHiQfn2klUCV7T0Ew3Sd8kt4B2sypagtcn5ge3EbIt2SUOc_N0NliOFe8_EXORdcVQsHBmZHpp5ahA-7lR4fF93pH3ZK1g6SNca3d03srhhLtiBB0sDMeFVIlz1MNiLiT4EE8Z42gXBlXIVNJNZbLowwnHIFTZESGYboGXxbTBqHL8cwXvUMe03I-dWWtxDAqUnDVH2sURED5xLRcEPyhZ6hfohGlSbBF7hBw==";

const commandNumber = ref<CommandNumber>();
const weatherReport = ref();

const { data: stationDto } = await useAsyncData(
  () =>
    $fetch<StationDto[]>(
      `https://public-api.meteofrance.fr/public/DPClim/v1/liste-stations/quotidienne?id-departement=13`,
      {
        method: "GET",
        headers: {
          accept: "*/*",
          apikey: apiKey,
        },
      },
    ),
  {
    server: false,
  },
);

watch(stationDto, async (newValue) => {
  const stations = newValue?.map((station) => parseStation(station));
  const stationId = findClosestStation(stations ?? []).id;

  const { data: commandNumberData } = await useAsyncData(
    () =>
      $fetch<CommandNumberDto>(
        `https://public-api.meteofrance.fr/public/DPClim/v1/commande-station/quotidienne?id-station=${stationId}&date-deb-periode=${"2024-03-01T00:00:00Z"}&date-fin-periode=${"2024-03-01T23:59:59Z"}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            apikey: apiKey,
          },
        },
      ),
    {
      server: false,
    },
  );

  commandNumber.value = parseCommandNumber(commandNumberData.value);
});

watch(commandNumber, async (newValue) => {
  const { data: weatherReport } = await useAsyncData(
    () =>
      $fetch(
        `https://public-api.meteofrance.fr/public/DPClim/v1/commande/fichier?id-cmde=${newValue?.value}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            apikey: apiKey,
          },
        },
      ),
    { server: false },
  );

  weatherReport.value = weatherReport.value;
});

watch(weatherReport, (newValue) => {
  console.log(newValue);
});
</script>

<template>
  <DefaultBackground />

  <ScrollButton hash="#content" />

  <div id="content" class="content">
    <CardDefault v-for="cardInfos in cardsInfos" :card-infos="cardInfos" />

    <div class="card-navigation-container">
      <CardNavigation
        v-for="cardNavigationInfos in cardsNavigationInfos"
        :card-navigation-infos="cardNavigationInfos"
      />
    </div>
  </div>
</template>

<style>
@import url("~/assets/css/homepage.css");
</style>
