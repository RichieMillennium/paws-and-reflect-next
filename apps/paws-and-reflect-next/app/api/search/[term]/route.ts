import {NextResponse} from 'next/server';
import { searchBreeds } from '@paws-and-reflect-next/shared-api';

interface ISearchParams {
  params: {
    term: string;
  }
}

export async function GET(request: Request, { params }: ISearchParams) {
  return NextResponse.json({
    data: await searchBreeds(params.term)
  });
}
