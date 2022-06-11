import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
vus: 1000, //stimulate how many virtual users
duration: "30s", //how long you want it to run
rps:1000
};
//Below randomize the endpoints

let randomNum = Math.floor(Math.random() * 100000);
export default function () {
http.get(`http://localhost:3000/products`);
}
