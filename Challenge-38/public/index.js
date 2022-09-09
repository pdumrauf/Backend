const socket = io();
const schema = normalizr.schema;

//products

const submitBtn = document.getElementById("submitBtn");
const table = document.getElementById("productsTable");
const tableBody = document.getElementById("tableBody");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const thumbnail = document.getElementById("thumbnail");
    const newProduct = {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value,
    };

    socket.emit("addProduct", newProduct);
});

socket.on("newProduct", (data) => {
    tableBody.innerHTML += `
    <tr>
        <th scope="row">${data.id}</th>
        <td>${data.title}</td>
        <td>$ ${data.price}</td>
        <td><img src=${data.thumbnail} /></td>
    </tr>`
});

//chat

const authorSchema = new schema.Entity("author");
const messageSchema = new schema.Entity(
    "messages",
    {
        author: authorSchema,
    },
    { idAttribute: "time" }
);

const fileSchema = new schema.Entity("file", {
    messages: [messageSchema],
});

const loginInputGroup = document.getElementById("loginInputGroup");
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("emailInput");
const nameInput = document.getElementById("nameInput");
const lastnameInput = document.getElementById("lastnameInput");
const ageInput = document.getElementById("ageInput");
const aliasInput = document.getElementById("aliasInput");
const avatarInput = document.getElementById("avatarInput");

const chatInputGroup = document.getElementById("chatInputGroup");
const chatBtn = document.getElementById("chatBtn");
const chatInput = document.getElementById("chatInput");
const messages = document.querySelector("#messages");
const notifications = document.getElementById("notifications");
let user;

loginBtn.addEventListener("click", (e) => {
    user = {
        id: emailInput.value,
        name: nameInput.value,
        lastname: lastnameInput.value,
        age: ageInput.value,
        alias: aliasInput.value,
        avatar: avatarInput.value,
    };
    socket.emit("login", user);
});

socket.on("success", (data) => {
    loginInputGroup.style.display = "none";
    chatInputGroup.style.display = "flex";
    messages.style.display = "block";

    const denormalizedData = normalizr.denormalize(
        data.result,
        fileSchema,
        data.entities
    )

    denormalizedData.messages.forEach((el) => {
        messages.innerHTML += `
        <span style="color:blue;font-weight:bold">${el.author.alias}</span> 
        <span style="color:brown;font-size:12px">[${el.time}]</span>: 
        <span style="color:green;font-style:italic">${el.text}</span>
        <br>`;
    });
});

socket.on("newMessage", (data) => {
    if (user) {
        const message = `
        <span style="color:blue;font-weight:bold">${data.author.alias}</span> 
        <span style="color:brown;font-size:12px">[${data.time}]</span>: 
        <span style="color:green;font-style:italic">${data.text}</span>
        <br>`;
        messages.innerHTML += message;
    }
});

const enableBtn = (e, btn) => {
    e.target.value === "" ? (btn.disabled = true) : (btn.disabled = false);
};

emailInput.addEventListener("input", (e) => enableBtn(e, loginBtn));
chatInput.addEventListener("input", (e) => enableBtn(e, chatBtn));

chatBtn.addEventListener("click", (e) => {
    const message = chatInput.value;
    chatInput.value = "";
    chatBtn.disabled = true;
    socket.emit("addMessage", { message, user });
});

//fetch initial products

fetch("http://localhost:8080/products/")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        const tableBody = template({ data });
        document.querySelector("#tableBody").innerHTML = tableBody;
    })
    .catch((e) => console.error(e));

const template = Handlebars.compile(`
    {{#each data}}
        <tr>
            <th scope="row">{{this.id}}</th>
            <td>{{this.title}}</td>
            <td>$ {{this.price}}</td>
            <td><img src="{{this.thumbnail}}" /></td>
        </tr>
    {{/each}}
`);