// setting window.location.href asynchronously triggers a reload
// https://www.linkedin.com/mynetwork/invite-connect/connections/

document.getElementById('test').textContent = 'working JS!'

const gotoLocation = url => {
    // console.log(`Opened ${url}`);
    let windowRef = window.open(url, '_blank');
    setTimeout(() => {
        // console.log(`Closed ${url}`);
        windowRef.close();
    }, 2000);
};

const links = Array.from(document.querySelectorAll('.mn-connection-card__link'));
const entries = links.map(link => ({
    name: link.querySelector('.mn-connection-card__name').innerText,
    occupation: link.querySelector('.mn-connection-card__occupation').innerText,
    link: link.href
}));
// console.log(entries); // debug

// Go to each page
entries.forEach(entry => {
    gotoLocation(entry.link);
});