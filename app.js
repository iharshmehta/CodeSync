const urlParams = new URLSearchParams(location.search);

let roomId = urlParams.get("id");
//To generate unique URL id
if (!roomId) {
    roomId = Math.floor(Math.random() * 100000 + 100000);
    window.location.search = `id=${roomId}`;
}

//Get WebSocket APIs
const wsurl = `wss://s4287.nyc3.piesocket.com/v3/${roomId}?api_key=FBNWDiIv2CzDLLZ4ykNRcdT71tF2mRbQ1BQWvd67&notify_self=1`;

const socket = new WebSocket(wsurl);

const debounce = (func, timer = 1000) => {
    let timeId = null;
    return (...args) => {
        if (timeId) {
            clearTimeout(timeId);
        }
        timeId = setTimeout(() => {
            func(...args);
        }, timer);
    };
};

//Getting the text from textarea
const textArea = document.querySelector("textarea");

socket.onopen = () => { };

socket.onmessage = (e) => {
    textArea.value = e.data;
};

textArea.addEventListener("input", debounce((e) => {
    socket.send(e.target.value);
})
);


//To copy the url
function copyToClipboard(text) {
    var input = document.body.appendChild(document.createElement("input"));
    input.value = window.location.href;
    input.focus();
    input.select();
    document.getElementById("copymsg").style.display = "inline";
    document.execCommand('copy');
    setTimeout(function () {
        document.getElementById("copymsg").style.display = "none";
    }, 700);
    input.parentNode.removeChild(input);
}

//To use "tab" key in textbox
document.getElementById('textbox').addEventListener('keydown', function (e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

        // put caret at right position again
        this.selectionStart =
            this.selectionEnd = start + 1;
    }
});
