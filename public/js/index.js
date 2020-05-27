
const animeSelected = id => {
    document.cookie = "animeId=" + id;
    window.location = '/anime_detail';
};

const checkAuth = () => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert('please Login to add to WatchList!')
            window.location.href = "/users/login"
        }
    }
    xhr.open("GET", "/list");
    xhr.send(null);
}

const sendData = () => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
        const serverResponse = document.getElementsByClassName('anime-title');
        serverResponse.innerHTML = this.resposneText;
    };

    xhr.open("POST", "/list");
    xhr.setRequestHeader("Content-type", "application/json");
    const title = document.getElementsByClassName('anime-title')[0].innerText;
    const src = document.getElementsByClassName('cover-image')[0].src;
    
    const data = {title: title, src: src};
    const json = JSON.stringify(data);
    
    xhr.send(json)
    }


    const deleteData = (title, src) => {
        const xhr = new XMLHttpRequest();
    
        xhr.open("DELETE", "/list");
        xhr.setRequestHeader("Content-type", "application/json");
        
        const data = {title: title, src: src};
        const json = JSON.stringify(data);        
        xhr.send(json);

        setTimeout(function(){    
            window.location.reload();    
        },100);
        }
    