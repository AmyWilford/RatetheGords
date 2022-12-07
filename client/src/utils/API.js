export const getGords = () => {
    console.log('i work');
    return fetch('/api/gords', {
      headers: {
        'Content-Type': 'application/json',
      },
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