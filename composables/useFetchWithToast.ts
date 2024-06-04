export const useFetchWithToast = async <T>(
  url: string,
  toastOpts: {
    successMessage?: {
      title: string;
      description: string;
    };
    success?: () => void;
    errorMessage?: {
      title: string;
      description: string;
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
        title: `${toastOpts.successMessage?.title || "Success"}`,
        description: `${toastOpts.successMessage?.description || "Success"}`,
      });

      if (toastOpts.success) toastOpts.success();
    })
    .catch((error) => {
      toast.add({
        title: `${toastOpts.errorMessage?.title || "Error"} : ${error}`,
        description: `${toastOpts.errorMessage?.description || "Error occured"}`,
      });

      if (toastOpts.error) toastOpts.error();

      throw new Error(error);
    });

  return data;
};
