export function fetchCars(){
    return fetch(import.meta.env.VITE_API_URL)
    .then(response => {
        if (!response.ok)
            throw new Error("Error in fetch: " + response.statusText);

        return response.json();
    })
}
    
export function deleteCar(url) {
    return fetch(url, {method: 'DELETE' })
    .then(response =>{
        if(!response.ok)
            throw new Error("Error in fetch: " + response.statusText);
        return response.json();
    })
}