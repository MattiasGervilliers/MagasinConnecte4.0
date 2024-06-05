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
    .then(() => {
      toast.add({
        title: `${toastOpts.successMessage?.title || "Succès"}`,
        description: `${toastOpts.successMessage?.description}`,
      });

      if (toastOpts.success) toastOpts.success();
    })
    .catch((error) => {
      toast.add({
        title: `${toastOpts.errorMessage?.title || "Erreur"} : ${error}`,
        description: `${toastOpts.errorMessage?.description}`,
      });

      if (toastOpts.error) toastOpts.error();

      throw new Error(error);
    });

  return data;
};
