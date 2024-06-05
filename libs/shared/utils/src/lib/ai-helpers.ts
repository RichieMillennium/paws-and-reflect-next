import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import {IBreed} from '@paws-and-reflect-next/shared-types';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    quote: z.string().describe(
      'A one sentence quotation enclosed in quotation marks that imagines what the dog in the photo might be saying or thinking. Pretend that the dog is able to speak english and has a wry sense of humor and a quick wit.'
    ),
    hero: z.string().describe(
      'A brief one sentence imaginative description of a dog who could be the hero of the dog shown in the photo. The hero dog should be the same breed as the dog in the photo, and the description of the hero dog should allude to behaviors that are typical of that breed. Make up a name for this hero dog, and describe a memorable achievement the the hero dog would have accomplished in a heroic epic tale that was told in honor of the hero dog.'
    ),
    hobbies: z.string().describe(
      'A list of five hobbies that the pictured dog would have. Use your imagination to make up these hobbies, and create descriptions of these hobbies that make it sound like the dog thinks it is a person instead of a dog. Format the list by beginning each item with a number and delimiting the items with a semicolon character.'
    ),
    origin: z.string().describe(
      'A one sentence description of the origin of this breed of dog.'
    ),
    characteristics: z.string().describe(
      'A one sentence summary of the most interesting characteristics of this breed of dog. Include at least two interesting characteristics, but no more than four characteristics.'
    ),
    activity: z.string().describe(
      'A two sentence description of what the dog appears to be doing in this photo. In the first sentence be very literal in your description, presenting only the visible facts. In the second sentence, use your vibrant imagination to dream up a fun story about the dog that could describe what the dog was doing before and after the photo was taken.'
    ),
    history: z.string().describe(
      'A one sentence summary of the historical significance of this breed of dog.'
    ),
    culture: z.string().describe(
      'A one sentence summary of the cultural significance of this breed of dog. The summary should consider the breed in the context of the culture that is most associated with this dog breed.'
    ),
    myth: z.string().describe(
      'A two or three sentence description of popular myths about this breed of dog. Include an explanation of whether the myths are true, and why those myths are true or false.'
    )
  })
)

const getPrompt = async (imageUrl: string) => {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template: `You are a canine expert who is a beloved speaker because you always have engaging stories and fun facts about dogs. Analyze the photo image located at the following url and then use your imaginative storytelling skills to create your responses. Provide responses that are unique to the dog pictured in the photo and find fun ways to include other items in the photo in your answers. Follow the instructions and format your response to match the format instructions, no matter what!\n{format_instructions}\n{imageUrl}`,
    inputVariables: ['imageUrl'],
    partialVariables: { format_instructions }
  });
  return prompt.format({
    imageUrl
  });
};

const processEnvSecrets = JSON.parse(process.env['SECRETS'] || process.env['secrets'] || '{}')

export const analyze = async (imagePrompt: string) => {
  const apiKey = processEnvSecrets['OPENAI_API_KEY'] || process.env['OPENAI_API_KEY'];
  const input = await getPrompt(imagePrompt);
  const model = new OpenAI({
    temperature: 0.6,
    modelName: 'gpt-4o', // 'gpt-3.5-turbo',
    openAIApiKey: apiKey
  }, {
    apiKey
  });
  const result = await model.invoke(input);
  try {
    return parser.parse(result);
  } catch (e) {
    console.log('analysis error', e);
    return {};
  }
};

export const createNameParam = (breed: IBreed, imageIndex: number): string =>
  encodeURIComponent(`${breed.name},${breed.parentBreed || ''},${imageIndex}`);

const decodeNameParam = (nameParam: string): [string, string, number] => {
  const decoded = decodeURIComponent(nameParam);
  const [breedName, parentName, index] = decoded.split(',');
  const imageIndex = index ? parseInt(index, 10) : 0;
  return [breedName, parentName, imageIndex];
};

export const getBreedByParam = (nameParam: string, breeds?: IBreed[]) => {
  const [breedName, parentName, imageIndex] = decodeNameParam(nameParam);
  if (breeds) {
    const hit = breeds.find(breed => {
      return breed.name === breedName && (breed.parentBreed === parentName || !parentName);
    });
    if (hit) {
      return {
        ...hit,
        galleryImageUrl: hit.imageUrls?.[imageIndex] || hit.galleryImageUrl
      };
    }
  }
  return null;
};
