const axios = require("axios");

const apiURL = "http://localhost:8080/products";

const checkIfProductObject = (product) => {
  const requiredKeys = ["title", "price", "thumbnail", "id"];
  const checkAllKeys = requiredKeys.every((el) => product.hasOwnProperty(el));
  if (checkAllKeys) {
    console.log("OK - product has correct properties");
  } else {
    console.log(`FAIL - product doesn't have correct properties
      CORRECT PROPERTIES:
    `);
      for (const el of requiredKeys) {
        console.log(`${el}`);
      }
      console.log("PRODUCT PROPERTIES:");
      for (const key in product) {
        console.log(`${key}: ${product[key]}`);
      }
    }
};

const checkStatus = (status, required) => {
  if (status === required) {
      console.log(`status: ${status} - OK`);
  } else {
      console.log(`status: ${status} - FAIL`);
  }
};

const getAll = () =>
  axios
  .get(apiURL)
  .then((res) => {
    console.log("GET ALL");
    checkStatus(res.status, 200);
    Array.isArray(res.data)
      ? console.log("OK - data is an array")
      : console.log(`FAIL - data is not an array ${typeof res.data}`);
  })
  .catch((err) =>
    console.log(`error in get all products:
      message: ${err.message}
    `)
  );

const getOne = () =>
  axios
  .get(`${apiURL}/35`)
  .then((res) => {
    console.log("GET ONE");

    checkStatus(res.status, 200);
    checkIfProductObject(res.data);

    console.log("");
  })
  .catch((err) =>
    console.log(`error in get one product:
      message: ${err.message}
    `)
  );

const product = {
  title: "Created in axios",
  price: 100,
  thumbnail: "an-url.com",
};
const createProduct = () =>
  axios
  .post(apiURL, product)
  .then((res) => {
    console.log("CREATED PRODUCT");

    checkStatus(res.status, 201);
    checkIfProductObject(res.data);
    res.data.title === product.title
      ? console.log(`OK- title:${res.data.title}`)
      : console.log(`FAIL - title: ${res.data.title}`);
    console.log("");
  })
  .catch((err) =>
    console.log(`error in create product:
      message: ${err.message}
    `)
  );

const deleteProduct = () =>
  axios
  .delete(`${apiURL}/33`)
  .then((res) => {
    console.log("DELETE PRODUCT");

    checkStatus(res.status, 204);
  })
  .catch((err) =>
    console.log(`error in delete product:
      message: ${err.message}
    `)
  );

Promise.all([getAll(), getOne(), createProduct()])
  .then(() => deleteProduct())
  .then(() => console.log("finish"));