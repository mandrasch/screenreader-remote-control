
$(function () {
    console.log('fire it up');
    Connect.start();
});

const btnOpenWebsite = document.getElementById('btnOpenWebsite');
const btnReadNext = document.getElementById('btnReadNext');

btnOpenWebsite.addEventListener('click', function () {

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

}, false);

btnReadNext.addEventListener('click',function (e) {
    e.preventDefault();
    console.log('clicked',this);
    Connect.sendMessage({
        'action': 'readNext'
    });
});

$('.window .js-send-action').click(function (e) {
    e.preventDefault();

    Connect.sendMessage({
        'test': 'test data send!'
    });
});

