import puppeteer from 'puppeteer';
/* import {JSDOM} from 'jsdom'*/
import { NextApiRequest, NextApiResponse } from 'next' 

const getDownloads = async ( req: NextApiRequest, res: NextApiResponse ) => {
/* const response = await fetch('https://www.npmjs.com/package/puppeteer')
const html = await response.text()
//console.log('html', html)
const dom = new JSDOM(html)
const document = dom.window.document
//console.log('document', document)

const downloads = document.querySelector('._9ba9a726')?.textContent

console.log('downloads', downloads)


//send downloads back to client
res.status(200).json({ downloads}) */

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://logigames.bet9ja.com/Games/Launcher?gameId=11000&provider=0&pff=1&skin=201');

//await page.screenshot({ path: 'example1.png'});
//await page.pdf({ path: 'example.pdf', format:'A4'});

const html = await page.evaluate(() =>
Array.from(document.querySelectorAll('.balls span'), (e) => e.textContent));

console.log(html);

//send downloads back to client
res.status(200).json(html)

await browser.close();

}
export default getDownloads;