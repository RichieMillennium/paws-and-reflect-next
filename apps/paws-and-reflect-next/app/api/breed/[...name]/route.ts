import {NextResponse} from 'next/server';
import { getImages } from '@paws-and-reflect-next/shared-api';

interface IBreedParams {
  params: {
    name: string[];
  }
}

export async function GET(request: Request, { params }: IBreedParams) {
  const [breedName, parentBreedName] = params.name;
  return NextResponse.json({
    data: await getImages(breedName, parentBreedName)
  });
}
