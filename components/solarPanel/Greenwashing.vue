<script setup lang="ts">
import type { Benefit } from "~/models/solarPanel/benefit";
const toast = useToast();
let benefit: Benefit = {
  gasEmissionSaved: {
    co2: 0,
    so2: 0,
    nox: 0,
    units: "",
  },
  treesPlanted: 0,
  lightBulbs: 0,
};

try {
  const benefits = await $fetch('/api/solarPanel/v1/benefit', {
    method: 'GET',
  });
  benefit = benefits.envBenefits;
} catch (error) {
  console.error(error);
  toast.add({
    title: "Une erreur est survenue lors de la récupération de données. Veuillez réessayer plus tard.",
    icon: "i-heroicons-information-circle",
    color: "red",
  });
}
</script>

<template>
  <div class="greenwashing">
    <h2 class="font-extrabold text-4xl text-center">Bénéfices environmentaux</h2>
    <section class="emissions mt-28">
      <h3 class="font-bold text-2xl text-center">Réduction des émissions de CO<sub>2</sub> (en kg)</h3>
      <div class="emissions-data mt-10">
        <div class="single-data">
          <h4 class="font-bold text-xl">{{benefit.gasEmissionSaved.co2}} CO<sub>2</sub></h4>
        </div>

        <div class="single-data">
          <h4 class="font-bold text-xl">{{benefit.gasEmissionSaved.so2}} SO<sub>2</sub></h4>
        </div>

        <div class="single-data">
          <h4 class="font-bold text-xl">{{benefit.gasEmissionSaved.nox}} NOX</h4>
        </div>
      </div>
    </section>

    <section class="equivalent mt-10">
      <h3 class="font-bold text-2xl text-center">C'est comme si...</h3>
      <div class="equivalent-data mt-10">
        <div class="single-data">
          <h4 class="text-lg font-medium">On avait planté</h4>
          <div class="flex items-center gap-2">
            <p>{{benefit.treesPlanted}}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M378.3 378.5L298.4 288h30.6c9 0 17-5 20.8-13.1 3.8-8 2.6-17.3-3.3-24.1L268.4 160h28.9c9.1 0 17.3-5.4 20.9-13.6 3.5-8.1 1.9-17.6-4.2-24.1L203.7 4.8c-6-6.5-17.3-6.5-23.3 0L70.1 122.3c-6.1 6.5-7.8 16-4.2 24.1C69.4 154.7 77.6 160 86.7 160h28.9l-78.1 90.9c-5.8 6.8-7.1 16-3.3 24C38 283 45.9 288 55 288h30.6L5.7 378.5c-6 6.8-7.4 16.1-3.6 24.3 3.8 8.1 12 13.3 21 13.3H160v24.5l-30.3 48.4c-5.3 10.6 2.4 23.2 14.3 23.2h96c11.9 0 19.6-12.5 14.3-23.2L224 440.5V416h136.9c9 0 17.3-5.2 21-13.3 3.8-8.2 2.4-17.5-3.6-24.3z"/></svg>
          </div>
        </div>

        <div class="single-data">
          <h4 class="text-lg font-medium">On avait allumé pendant une journée</h4>
          <div class="flex items-center gap-2">
            <p>{{benefit.lightBulbs}}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-lg">
              <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
              <path fill-rule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.greenwashing {
  padding: 24px;
  width: 100% !important;
  //background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(9, 121, 9, 1) 25%, rgba(9, 121, 9, 1) 75%, rgba(255, 255, 255, 0) 100%);
  //color: theme('colors.white');
  color: rgb(9, 121, 9);
}

.greenwashing {
  padding: 110px 15%;
  transition: 0.3s ease-in-out;
}

@media screen and (max-width: 1264px) {
  .greenwashing {
    padding: 110px 10%;
  }
}

@media screen and (max-width: 1000px) {
  .greenwashing {
    padding: 110px 5%;
  }
}

h2 {
}

.emissions-data {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.equivalent {
  .equivalent-data {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;

    .single-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      p {
        font-size: 1.25em;
      }
      svg {
        width: 1.125em;
        fill: theme('colors.white');
      }
    }
  }
}
</style>