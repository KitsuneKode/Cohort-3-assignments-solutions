/*Create the promisified versions of the 
1. SetTimeout 
2. fetch
3. fs.readFile*/

//1.Promisified setTimeout

let promisified_setTimeout = (user_input, time) => {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time);
  });

  return p;
};

let user_input = "Successful setTimeout";
let time = 1000;

promisified_setTimeout(user_input, time)
.then(() =>
  console.log(`${user_input} after ${time}ms`)
).catch((err) => console.error("somwthing went wrong with the setTimeout function", err));