import { NextRequest, NextResponse } from 'next/server';
import chromium from 'chrome-aws-lambda'; // Usado para o ambiente serverless
import puppeteer from 'puppeteer-core'; // puppeteer-core para serverless

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { language } = await req.json();

    const options = process.env.AWS_LAMBDA_FUNCTION_VERSION
      ? {
          args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath,
          headless: chromium.headless,
        }
      : {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          headless: true,
        };

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    // Construir a URL completa para a renderização
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host');
    const url = `${protocol}://${host}/pdf?lang=${language}`;

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

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
