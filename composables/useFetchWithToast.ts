export const useFetchWithToast = async <T>(
  url: string,
  toastOpts: {
    successMessage?: string;
    success?: () => void;
    errorMessage?: string;
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
        title: `${toastOpts.successMessage || "Success"}`,
      });

      if (toastOpts.success) toastOpts.success();
    })
    .catch((error) => {
      toast.add({
        title: `${toastOpts.errorMessage || "Error"} : ${error}`,
      });

      if (toastOpts.error) toastOpts.error();

      throw new Error(error);
    });

  return data;
};
