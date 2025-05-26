import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";

const user = {
    first_name: "Fayzillo",
    last_name:"Ummatov",
    email:"fayzillo@gmail.com",
    password:"12345678",
    r_password:"12345678",
    birth_day:"1995-12-29"
};

async function post() {
    const formdat = new FormData();

    for (let key in user){
        formdat.append(key, user[key]);
    }

    formdat.append("img", fs.createReadStream("./test.png"));

    try {
        const request = await fetch("http://localhost:15975/api/users/v1/register", {
            method: "POST",
            body: formdat,
            headers: formdat.getHeaders()  // FormData ning o‘z headers ni qo‘shish kerak!
        });

        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
}

// post();
async function getAll() {

    try {
        const request = await fetch("http://localhost:15975/api/users/v5/all");

        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
}
getAll()