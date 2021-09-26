
$(function () {
    console.log('fire it up');
    Connect.start();
});

const btnOpenWebsite = document.getElementById('btnOpenWebsite');
const btnActivateVoiceOver = document.getElementById('btnActivateVoiceOver');
const btnReadNext = document.getElementById('btnReadNext');
const btnReadPrev = document.getElementById('btnReadPrev');
const btnFocusdNext = document.getElementById('btnReadNext');
const btnFocusPrev = document.getElementById('btnFocusPrev');
const btnReadStop = document.getElementById('btnReadStop');
const btnEnter = document.getElementById('btnEnter');

/*btnOpenWebsite.addEventListener('click', function () {

    console.log('clicked btnOpenWebsite');
    // show control center, hide url box
    document.body.classList.add('is-website-opened');

    // TODO: add info for screenreader - state change
    boxControlCenter.querySelector('h2').focus();

    // Update status
    statusCurrentUrl.innerHTML = inputWebsiteUrl.value;

    Connect.sendMessage({
        'action': 'openWebsite',
        'url': inputWebsiteUrl.value
    });

}, false);*/
btnActivateVoiceOver.addEventListener('click',function(){
    Connect.sendMessage({
        'action': 'triggerActivateVoiceOver'
    });
},false);
btnFocusPrev.addEventListener('click',function(){
    Connect.sendMessage({
        'action': 'triggerFocusPrev'
    });
},false);
btnFocusNext.addEventListener('click',function(){
    Connect.sendMessage({
        'action': 'triggerFocusNext'
    });
},false);
btnEnter.addEventListener('click',function(){
    Connect.sendMessage({
        'action': 'triggerEnter'
    });
},false);
btnReadNext.addEventListener('click',function(){
    Connect.sendMessage({
        'action': 'triggerReadNext'
    });
},false);
btnReadPrev.addEventListener('click',function(){
    Connect.sendMessage({
        'action': 'triggerReadPrev'
    });
},false);
btnReadStop.addEventListener('click',function(){
    Connect.sendMessage({
        'action': 'triggerReadStop'
    });
},false);


$('.window .js-send-action').click(function (e) {
    e.preventDefault();

    Connect.sendMessage({
        'test': 'test data send!'
    });
});

