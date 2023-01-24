import puppeteer from 'puppeteer';
/* import {JSDOM} from 'jsdom'*/
import { NextApiRequest, NextApiResponse } from 'next' 

const getDownloads = async ( req: NextApiRequest, res: NextApiResponse ) => {


const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://logigames.bet9ja.com/Games/Launcher?gameId=11000&provider=0&pff=1&skin=201');



const html = await page.evaluate(() =>
Array.from(document.querySelectorAll('.balls span'), (e) => e.textContent));

console.log(html);

//send downloads back to client
res.status(200).json(html)

await browser.close();

}
export default getDownloads;
