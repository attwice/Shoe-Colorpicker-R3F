export const shareLink = ({ title, text, url }) => {
  console.log({ title });
  navigator
    .share({
      title,
      text,
      url
    })
    .then((_) => {
      console.log("Thanks for sharing");
    })
    .catch(() => {
      console.log("Sharing failed :(");
    });
};

export const getColors = () => {
  const params = getUrlParams();
  let shoeColors = {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff"
  };

  if (params.length !== 0 && params[0].key === "shoe") {
    shoeColors = JSON.parse(atob(params[0].value));
  }

  return shoeColors;
};

export const getUrlParams = () => {
  let params = [];
  if (process.browser && window) {
    const queryString = window.location.search;

    if (queryString[0] === "?") {
      params = queryString
        .slice(1)
        .split("&")
        .map((paramPair) => {
          let key, value;
          [key, value] = paramPair.split("=");
          return {
            key,
            value
          };
        });
    }
  }

  return params;
};
