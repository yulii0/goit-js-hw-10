import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ofZPnPiNzWb6hnco4BifD7wDrFoIkVMiEy8q9RNC0VTM1LMSjhRX5fLB71gaQ3DP';

export const apithecatApi = axios.create({
  baseURL: 'https://api.thecatapi.com',
});

export const getCatBreeds = () => {
  return apithecatApi
    .get('/v1/breeds')
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }

      return response.data;
    })
    .catch(error => console.log(error))
};

export const createCatByBreed = breedId => {
  return apithecatApi
    .get(`/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    })
    .catch(error => console.log(error))
};
