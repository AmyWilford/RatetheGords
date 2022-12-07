export const getGords = () => {
  console.log("i work");
  return fetch("/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createVote = (gordData) => {
  return fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gordData),
  }).catch((error) => {
    console.log(error);
  });
};
