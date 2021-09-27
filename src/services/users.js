import axios from "axios";
// const baseUrl = "/api/notes";
const baseUrl = "https://jsonplaceholder.typicode.com/posts";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get("http://localhost:3003/clients");
  return request.then((response) => {
    const ref = response.data.map((client) => {
      const ui = {
        ...client,
        ["id"]: client._id.toString(),
      };
      return ui;
    });
    return ref;
  });
};
// const getAll = () => {
//   const request = axios.get(baseUrl);
//   return request.then((response) => response.data);
// };
const getOne = (id) => {
  console.log("se entro en la funcion getOne y el ID es", id);
  const request = axios.get("http://localhost:3003/clients" + "/" + id);
  return request.then((response) => {
    console.log("este es el response", response);
    return response.data;
  });
};

const create = (newObject) => {
  console.log("este el el objeto a crear", newObject);
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then((response) => response.data);
};

export default { getAll, getOne, create, update, setToken };
