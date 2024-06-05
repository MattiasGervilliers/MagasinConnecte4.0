<script setup lang="ts">
definePageMeta({
  auth: false,
});

export type TechnoInfos = {
  title: string;
  shortDescription: string;
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
    image: "screenshots/LIFI.png",
    shortDescription:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.",
    functioningImage: "screenshots/LIFI.png",
    installImage: "/screenshots/acoustique.png",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "lifi",
  },
  {
    title: "VLC",
    shortDescription:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.",
    functioningImage: "screenshots/VLC.png",
    installImage: "/screenshots/acoustique.png",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "vlc",
    image: "screenshots/VLC.png",
  },
  {
    title: "Drones",
    shortDescription:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.",
    functioningImage: "screenshots/drone.jpg",
    installImage: "/screenshots/acoustique.png",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "drones",
    image: "screenshots/drone.jpg",
  },
  {
    title: "CSO",
    shortDescription:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.",
    functioningImage: "/screenshots/CSO.jpg",
    installImage: "/screenshots/acoustique.png",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "cso",
    image: "/screenshots/CSO.jpg",
  },
  {
    title: "RFID",
    shortDescription:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.",
    functioningImage: "/screenshots/RFID.png",
    installImage: "/screenshots/acoustique.png",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "rfid",
    image: "/screenshots/RFID.png",
  },
  {
    title: "Acoustique",
    shortDescription:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.",
    functioningImage: "/screenshots/acoustique.png",
    installImage: "/screenshots/acoustique.png",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "acoustique",
    image: "/screenshots/acoustique.png",
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
      id="navigation"
      v-if="isNavigationVisible"
      :links="technoInfos.map((info) => info.link)"
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
</style>
