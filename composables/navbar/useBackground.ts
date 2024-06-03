type UseBackgroundProps = {
  navbar: Ref<Element | null>;
};

type UseBackgroundReturn = {
  changeBackground: () => void;
  onScroll: () => void;
};

export const useBackground = ({
  navbar,
}: UseBackgroundProps): UseBackgroundReturn => {
  const route = useRoute();

  const changeBackground = (): void => {
    if (navbar.value) {
      if (document.documentElement.scrollTop > 0 || route.path !== "/") {
        navbar.value.classList.add("navbar-scrolled");
        return;
      }

      navbar.value.classList.remove("navbar-scrolled");
    }
  };

  const onScroll = (): void => {
    if (navbar.value && route.path === "/") {
      if (window.scrollY > 0) {
        navbar.value.classList.add("navbar-scrolled");
        navbar.value.classList.add(
          "animate__animated",
          "animate__fadeInDown",
          "animate__faster",
        );
      } else {
        navbar.value.classList.remove("navbar-scrolled");
        navbar.value.classList.remove(
          "animate__animated",
          "animate__fadeInDown",
          "animate__faster",
        );
      }
    }
  };

  return { changeBackground, onScroll };
};
