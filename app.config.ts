/*
  button color: primary-500
  button color on dark theme: primary-600
*/
export default defineAppConfig({
  ui: {
    primary: "_primary",
    gray: "_secondary",

    breadcrumb: {
      active: "text-primary dark:text-primary-600",
      inactive:
        "text-neutral-700 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-neutral-300 hover:underline transition-all",
    },

    divider: {
      border: {
        base: "flex border-gray-500 dark:border-gray-500",
      },
    },

    tabs: {
      list: {
        background: "bg-transparent dark:bg-transparent",
        padding: "p-0",
        tab: {
          inactive:
            "bg-white text-dark border-2 border-primary-500 dark:border-primary-600 dark:text-primary-600",
          active: "bg-primary-500 text-white",
          font: "font-bold",
        },
      },
    },

    card: {
      ring: "ring-0",
    },

    slideover: {
      overlay: {
        background: "bg-black/75 dark:bg-black/75",
      },
    },

    button: {
      color: {
        prim: {
          solid:
            "text-white dark:text-black bg-primary-600 hover:bg-primary-700 disabled:bg-primary-200 dark:bg-primary-600 dark:hover:bg-primary-700 dark:disabled:bg-primary-900 transition-all",
          outline:
            "text-primary dark:text-primary-600 bg-white hover:bg-primary-600 hover:text-white hover:ring-0 ring-1 ring-inset ring-current disabled:bg-primary-200 dark:bg-white dark:hover:bg-primary-600 dark:hover:text-white dark:disabled:bg-primary-900 transition-all",
          link: "text-primary dark:text-primary-600 hover:underline transition-all",
        },
      },
      default: {
        size: "sm",
        variant: "solid",
        color: "prim",
      },
    },
  },
});
