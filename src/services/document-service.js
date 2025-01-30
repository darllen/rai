const fs = require("fs");
const puppeteer = require('puppeteer');

async function generateHtml(requirementsText) {
    const htmlContent = `
    <html>
    <head>
        <title>Requisitos do Projeto</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <h1>Requisitos do Projeto</h1>
        <pre>${requirementsText}</pre>
    </body>
    </html>
    `;
    
    fs.writeFileSync("public/requisitos.html", htmlContent);
    return htmlContent;
}

async function convertHtmlToPdf(htmlContent, outputPdfPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    await page.pdf({ path: outputPdfPath, format: 'A4' });

    await browser.close();
}

module.exports = { generateHtml, convertHtmlToPdf };
