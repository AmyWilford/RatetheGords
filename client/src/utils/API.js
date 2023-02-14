export const getGords = () => {
    console.log('i work');
    return fetch('/api/gords', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  export const getSingleGord = (gordId) => {
    fetch("/api/gords/ranks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gordId),
    }).catch((err) => {
      console.error(err);
      return;
    });
  };
  


  export const createVote = (gordData) => {
    return fetch('/api/gords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gordData),
    }).catch((error) => {
      console.log(error);
    });
  };

