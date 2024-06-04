<script setup lang="ts">

</script>

<template>

  <div class="parteners__container">
    <div class="parteners__description">
      <h2 class="text-xl font-bold text-primary-500">Nos partenaires</h2>
      <h3 class="italic">lorem ipsum lorem ipsum lorem </h3>
      <UDivider size="sm" />
      <p>lorem ipsum lorem ipum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum</p>
    </div>

    <UDivider size="sm" orientation="vertical" icon="i-heroicons-chevron-right-16-solid"/>


    <div class="parteners__images">
      <div class="image">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/2560px-Ikea_logo.svg.png" alt="Les petits français"/>
      </div>
      <div class="image">
        <img src="https://lucibel.com/wp-content/uploads/2019/11/logo-lucibel-215x65px-3.png" alt="Les petits français" />
      </div>
      <div class="image">
        <img src="https://www.murati-merchandising.com/wp-content/uploads/2018/04/Logo-murati-1.png" alt="Les petits français"/>
      </div>
      <div class="image">
        <img src="https://www.auchan-retail.com/themes/bootstrap/assets/images/logo.svg" alt="Les petits français"/>
      </div>
      <div class="image">
        <img src="https://stid-security.com/us/stid.svg" alt="Les petits français" />
      </div>
      <div class="image">
        <img src="https://www.connectwave.fr/wp-content/uploads/2018/06/logo-connectwave-footer.png" alt="Les petits français"/>
      </div>
      <div class="image">
        <img src="https://dracula-technologies.com/wp-content/uploads/2020/02/Logo-dracula.svg" alt="Les petits français" />
      </div>
      <div class="image">
        <img src="https://static.wixstatic.com/media/56d08e_ab16ff6998d14c19a5eb2f0d4673df5e~mv2.png/v1/fill/w_161,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-quadri.png" alt="Les petits français" />
      </div>
    </div>
  </div>

</template>

<style scoped>
.parteners__container {
  display: flex;
  gap: 20px;
  padding-top: 80px;
}

.parteners__description {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}
.parteners__description > p {
  text-align: right;
}

.parteners__images {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.image img {
  height: 100px;
  width: 200px;
  object-fit: contain;
}

</style>