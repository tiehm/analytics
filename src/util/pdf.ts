import * as puppeteer from 'puppeteer';

export async function pdf() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitFor(10000);
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
