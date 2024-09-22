import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core'; // Usado tanto no serverless quanto localmente
import chromium from '@sparticuz/chromium'; // Usado apenas para o ambiente serverless
import { execPath } from 'process'; // Para identificar local ou serverless

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { language } = await req.json();

    // Verifica se está rodando no ambiente da Vercel (serverless)
    const isServerless = !!process.env.AWS_LAMBDA_FUNCTION_VERSION;

    console.log(isServerless)

    let browser;
    if (isServerless) {
      // No ambiente serverless (Vercel), usar @sparticuz/chromium
      const executablePath = await chromium.executablePath();
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath, // Caminho do Chromium para serverless
        headless: chromium.headless,
      });
    } else {
      // No ambiente local, usar o Puppeteer completo
      browser = await puppeteer.launch({
        executablePath: execPath, // Usar o caminho do Puppeteer instalado localmente
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      });
    }

    const page = await browser.newPage();

    // Construir a URL completa para a renderização
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host');
    const url = `${protocol}://${host}/pdf?lang=${language}`;

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    // Gerar o PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '10mm',
        right: '10mm',
      },
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=curriculum.pdf',
      },
    });
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return NextResponse.json({ error: 'Erro ao gerar PDF' }, { status: 500 });
  }
}
