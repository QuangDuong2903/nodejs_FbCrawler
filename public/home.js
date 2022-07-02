const btn = document.querySelector('button');
const insUrl = document.querySelector('input');
const gallery = document.querySelector('.img-container');

btn.addEventListener('click', () => {
    let url = new URL(window.location.protocol + '//' + window.location.host + '/crawler')
    url.searchParams.append('url', insUrl.value);
    htmlsrc = `<p>Loading....</p>`
    gallery.innerHTML = htmlsrc;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        htmlsrc = ``;
        data.forEach(imgsrc => {
           htmlsrc += `<img src="${imgsrc}" alt=""></img> `
        });
        gallery.innerHTML = htmlsrc;
    })
})