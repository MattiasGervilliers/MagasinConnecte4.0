export const generateHeader = ({ ...params }: HeadersInit) => {
  return {
    accept: "*/*",
    ...params,
  };
};
