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
