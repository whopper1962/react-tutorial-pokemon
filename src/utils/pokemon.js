import axios from 'axios';

export const getAllPokemon = async (url) => {
  return axios.get(url)
  .then((res) => {
    return res.data;
  }).catch((err) => {
    throw new Error(err);
  });
}
