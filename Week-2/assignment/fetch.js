/*Create the promisified versions of the 
1. SetTimeout 
2. fetch
3. fs.readFile*/



// 2. fetch



//async await fetch

let async_fetch = async (url) => {

    let response = await fetch(url);

    if(!response.ok){
        throw new Error(`Response status : ${response.status}`);
    }

    let json;
    try {
        json = await response.json();
    } catch (error) {
        console.error(error.message);
    }
    //for the async await version
    console.log(json);
}

async_fetch("https://dummyjson.com/test");




//promisified fetch


let promisified_fetch =(url) => {

    
    return custom_fetch = new Promise((resolve, reject)=>{fetch(url)
        .then((response) => {
            if (!response.ok){
                reject(new Error(`Response status : ${response.status}`));
        }
        else{
            return response.json(); // Parse the JSON if the response is OK
        }})
        .then(content => resolve(content))
        .catch(error => {console.error("Fetch error:", error.message)});
        
    }
)
    
}


// without async await! 
promisified_fetch("https://dummyjson.com/test")
.then((contents_in_url)=>console.log(contents_in_url))
    .catch(err => console.error("Parsing error:", err.message));



