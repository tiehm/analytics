import * as puppeteer from 'puppeteer';

/**
 * Creates a PDF file from the index view and puts it in boot directory
 * @returns {Promise<boolean>}
 */
export async function pdf() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/', {waitUntil: 'networkidle0'});
    await page.emulateMedia('screen');
    const height = await page.evaluate(() => {
        const body = document.body,
            html = document.documentElement;
        return Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
    });
    await page.pdf({
        path: 'page.pdf',
        height: (parseInt(height) + 100).toString() + 'px'
    });
    await browser.close();
    return true;
}
