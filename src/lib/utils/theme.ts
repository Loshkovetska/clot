export const generateClerkTheme = (isLight: boolean) => {
  return {
    signIn: {
      variables: {
        colorPrimary: "#8E6CEF",
        colorText: isLight ? "#ffffff" : "#272727",
      },
    },
  };
};
