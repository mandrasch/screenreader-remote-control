"use strict";

/*if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    alert("Let's get this party started")
}
navigator.mediaDevices.getUserMedia({video: true})*/

let lastSuccessfulScan = null;
function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.

    if(lastSuccessfulScan != null && (Date.now() - lastSuccessfulScan < 3500)){
        // console.log('Scan result was too fast, we abort ...',Date.now() - lastSuccessfulScan);
        return;
    }

    console.log(`Scan result: ${decodedText}`, decodedResult);

    // save scan time for comparision
    lastSuccessfulScan = Date.now();

    if(decodedText == 'NEXT'){
        window.api.send("triggerActionRead", 'next');
    }

}

var html5QrcodeScanner = new Html5QrcodeScanner(
	"reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);


btnReadNextElement.addEventListener('click', function (e) {
    e.preventDefault();

    window.api.send("triggerActionRead", 'next');


    /*window.api.receive("fromMain", (data) => {
        console.log(`Received ${data} from main process`);
    });*/

}, false);