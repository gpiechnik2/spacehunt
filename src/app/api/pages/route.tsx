import { NextResponse } from 'next/server'
import { promises as fs } from 'fs';
import path from 'path'


export async function GET(request: Request) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const itemsPerPage = 9; 

    const filePath = path.join(process.cwd(), 'data', 'pages.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(jsonData).pages;
  
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const pageData = parsedData.slice(start, end);
    const hasMore = end < parsedData.length;

  return NextResponse.json({
    data: pageData,
    hasMore
  }, {
    status: 200,
  })
}
