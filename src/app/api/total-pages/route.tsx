import { NextResponse } from 'next/server'
import { promises as fs } from 'fs';
import path from 'path'
import { Page } from '@/lib/types';


export async function GET(request: Request) {
  const filePath = path.join(process.cwd(), 'data', 'pages.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const parsedData = JSON.parse(jsonData).pages;

  let totalResults: number = 0
  let totalResultsFree: number = 0
  let totalResultsPaid: number = 0
  
  await parsedData.forEach((data: Page) => {
    if (data.productType === "free") {
      totalResultsFree += 1
    }

    if (data.productType === "paid") {
      totalResultsPaid += 1
    }

    if (data.productType === "both") {
      totalResultsFree += 1
      totalResultsFree += 1
    }

    totalResults += 1
  })

  return NextResponse.json({
    totalResults: totalResults,
    totalResultsFree: totalResultsFree,
    totalResultsPaid: totalResultsPaid
  }, {
    status: 200,
  })
}
