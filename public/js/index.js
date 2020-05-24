
const animeSelected = id => {
    document.cookie = "animeId=" + id;
    window.location = '/anime_detail';
};

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


