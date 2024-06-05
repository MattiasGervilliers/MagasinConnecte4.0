export const useFetchWithToast = async <T>(
  url: string,
  toastOpts: {
    successMessage?: {
      title: string;
      description?: string;
    };
    success?: () => void;
    errorMessage?: {
      title: string;
      description?: string;
    };
    error?: () => void;
  },
  opts?: { method: "POST" | "PUT" | "GET"; body: string },
) => {
  const toast = useToast();

  const data = await $fetch<T>(url, {
    method: opts?.method,
    body: opts?.body,
  })
    .then((data) => {
      toast.add({
        title: `${toastOpts.successMessage?.title || "Succès"}`,
        description: `${toastOpts.successMessage?.description}`,
      });

      if (toastOpts.success) toastOpts.success();

      return data;
    })
    .catch((error) => {
      toast.add({
        title: `${toastOpts.errorMessage?.title || "Erreur"}`,
        description: `${toastOpts.errorMessage?.description}`,
        color: "red",
      });

      if (toastOpts.error) toastOpts.error();

    });

  return data;
};
