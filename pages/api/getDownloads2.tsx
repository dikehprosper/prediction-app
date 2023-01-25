import chromium from "chrome-aws-lambda";
import { NextApiRequest, NextApiResponse } from "next";

async function getBrowserInstance() {
  const executablePath = await chromium.executablePath;

  if (!executablePath) {
    const puppeteer = require("puppeteer");
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

const getDownloads2 = async (req: NextApiRequest, res: NextApiResponse) => {
  let result = null;
  let browser = null;

  try {
    browser = await getBrowserInstance();

    let page = await browser.newPage();

    await page.goto(
      "https://logigames.bet9ja.com/Games/Launcher?gameId=11000&provider=0&pff=1&skin=201"
    );

    const html = await page.evaluate(() =>
Array.from(document.querySelectorAll('.statistics> tbody> tr> td'), (e) => e.textContent));

    console.log(html);

    //send downloads back to client
    res.status(200).json(html);
  } catch (error) {
    //return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

export default getDownloads2;

/* import puppeteer from 'puppeteer';
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
 */
