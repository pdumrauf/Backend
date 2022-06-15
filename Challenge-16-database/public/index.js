
const socket = io();
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
        <td>${data.product}</td>
        <td>$${data.price}</td>
        <td><img src=${data.thumbnail} /></td>
    </tr>`;
});

//chat

const loginInputGroup = document.getElementById("loginInputGroup");
const emailBtn = document.getElementById("emailBtn");
const emailInput = document.getElementById("emailInput");

const chatInputGroup = document.getElementById("chatInputGroup");
const chatBtn = document.getElementById("chatBtn");
const chatInput = document.getElementById("chatInput");
const messages = document.querySelector("#messages");
const notifications = document.getElementById("notifications");
let email;

emailBtn.addEventListener("click", (e) => {
    email = emailInput.value;
    socket.emit("login", email);
});

socket.on("success", (data) => {
    loginInputGroup.style.display = "none";
    chatInputGroup.style.display = "flex";
    messages.style.display = "block";

    data.forEach((el) => {
        messages.innerHTML += `
        <span style="color:blue;font-weight:bold">${el.email}</span> 
        <span style="color:brown;font-size:12px">[${el.time}]</span>: 
        <span style="color:green;font-style:italic">${el.message}</span>
        <br>`;
    });
});

socket.on("newMessage", (data) => {
    if (email) {
        const message = `
        <span style="color:blue;font-weight:bold">${data.email}</span> 
        <span style="color:brown;font-size:12px">[${data.time}]</span>: 
        <span style="color:green;font-style:italic">${data.message}</span>
        <br>`;
        messages.innerHTML += message;
    }
});

const enableBtn = (e, btn) => {
    e.target.value === "" ? (btn.disabled = true) : (btn.disabled = false);
};

emailInput.addEventListener("input", (e) => enableBtn(e, emailBtn));
chatInput.addEventListener("input", (e) => enableBtn(e, chatBtn));

chatBtn.addEventListener("click", (e) => {
    const message = chatInput.value;
    chatInput.value = "";
    chatBtn.disabled = true;
    socket.emit("addMessage", { message, email });
});

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
            <td>{{this.product}}</td>
            <td>$ {{this.price}}</td>
            <td><img src="{{this.thumbnail}}" /></td>
        </tr>
    {{/each}}
`);
