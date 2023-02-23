export const getGords = () => {
  return fetch("/api/gords", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getSingleGord = (id) => {
  return fetch(`/api/gords/ranks`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  }).catch((err) => {
    console.error(err);
    return;
  });
};

export const createVote = (gordData) => {
  return fetch("/api/gords", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gordData),
  }).catch((error) => {
    console.log(error);
  });
};
