const express = require('express')
const app = express()
const path = require('path')
const puppeteer = require('puppeteer')
const port = process.env.PORT
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/home.html'));
})

app.get('/crawler', (req, res) => {
    (async () => {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    await page.goto(req.query.url, {
        waitUntil: 'networkidle2',
      });
    const imgLinks = await page.evaluate(() => {
        let imgElements = document.querySelectorAll('.dlv3wnog.enqfppq2.lhclo0ds.j83agx80 .datstx6m.bixrwtb6.k4urcfbm');
        imgElements = [...imgElements];
        let imgLinks = imgElements.map(i => {return i.currentSrc});
        return imgLinks;
    });
    await res.json(imgLinks)
    await browser.close()
    })();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
