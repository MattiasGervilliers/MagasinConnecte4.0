<script setup lang="ts">
definePageMeta({
  auth: false,
});

export type TechnoInfos = {
  title: string;
  shortDescription: string;
  icon?: string;
  image?: string;
  link: string;
  functioningDescription: string;
  functioningImage?: string;
  installDescription: string;
  installImage?: string;
};

const isNavigationVisible = ref<boolean>(false);

const onScroll = () => {
  if (window.scrollY > 100) {
    isNavigationVisible.value = true;
  } else {
    isNavigationVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);

  return () => {
    window.removeEventListener("scroll", onScroll);
  };
});

const technoInfos: TechnoInfos[] = [
  {
    title: "LI-FI",
    icon: "i-heroicons-wifi-16-solid",
    image: "technologies/lifi.png",
    shortDescription:
      "Utilise la lumière pour transmettre des données, offrant une alternative rapide et sécurisée au Wi-Fi traditionnel.",
    functioningImage: "screenshots/LIFI.png",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "lifi",
  },
  {
    title: "VLC",
    icon: "i-heroicons-light-bulb-16-solid",
    shortDescription:
      "Le VLC (Visible Light Communication) est une technologie de transmission de données unidirectionnelle via la lumière LED.",
    functioningImage: "screenshots/VLC.png",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "vlc",
    image: "technologies/vlc.png",
  },
  {
    title: "Drones",
    icon: "i-heroicons-rocket-launch-16-solid",
    shortDescription:
      "Les drones sont des appareils sans équipage, pilotés automatiquement ou à distance, utilisés dans le civil ou par les forces armées et de sécurité.",
    functioningImage: "screenshots/drone.jpg",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "drones",
    image: "technologies/drone.png",
  },
  {
    title: "Diffuseur de Parfum",
    icon: "i-heroicons-arrow-up-on-square-16-solid",
    shortDescription:
      "Crée une ambiance olfactive agréable dans le magasin, enrichissant l'expérience des visiteurs.",
    functioningImage: "/technologies/diffuseur_parfum.png",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "cso",
    image: "/technologies/diffuseur_parfum.png",
  },
  {
    title: "RFID",
    icon: "i-heroicons-circle-stack-16-solid",
    shortDescription:
      "Facilitent la gestion et le suivi des stocks grâce à l'identification par radiofréquence, améliorant ainsi l'efficacité logistique.",
    functioningImage: "/screenshots/RFID.png",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "rfid",
    image: "/technologies/rfid.png",
  },
  {
    title: "Acoustique",
    icon: "i-heroicons-megaphone-16-solid",
    shortDescription:
      "Améliorent l'acoustique de l'espace, réduisant les nuisances sonores et créant un environnement propice à la concentration et à l'apprentissage.",
    functioningImage: "/screenshots/acoustique.png",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "acoustique",
    image: "/technologies/acoustique.png",
  },
];
</script>

<template>
  <GlobalWrapper>
    <MainTitle text="Nos technologies" />

    <div class="content-techno">
      <TechnologiesCardInfo
        v-for="technoInfo in technoInfos"
        :techno-infos="technoInfo"
      />
    </div>

    <div class="content-description">
      <TechnologiesDescription
        v-for="technoInfo in technoInfos"
        :techno-info="technoInfo"
      />
    </div>

    <TechnologiesNavigation
      :techno-infos="technoInfos"
      :class="isNavigationVisible ? 'is-visible' : 'is-hidden'"
    />
  </GlobalWrapper>
</template>

<style>
.content-techno {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 50px;
}

.content-description {
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 150px;
}

.is-visible {
  opacity: 1;
  transition: 0.3s ease-in-out;
}

.is-hidden {
  opacity: 0;
  transition: 0.3s ease-in-out;
}
</style>
