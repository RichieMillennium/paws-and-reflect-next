'use client'

import {FC} from 'react';
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from '@nextui-org/table';
import {TBreedTrivia, TTriviaTopics} from '@paws-and-reflect-next/shared-types';

interface IFields<T extends TTriviaTopics> {
  id: T;
  name: string;
  value?: TBreedTrivia[T];
  border: 'border-b-1' | 'border-b-0';
}

const getTriviaFields = (trivia: Partial<TBreedTrivia> = {} as TBreedTrivia): Array<IFields<TTriviaTopics>> => [
  { id: 'activity', name: 'What is Happening?', value: trivia.activity, border: 'border-b-1' },
  { id: 'quote', name: 'What are They Saying?', value: trivia.quote, border: 'border-b-1' },
  { id: 'origin', name: 'Origin', value: trivia.origin, border: 'border-b-1' },
  { id: 'characteristics', name: 'Characteristics', value: trivia.characteristics, border: 'border-b-1' },
  { id: 'history', name: 'Historical Significance', value: trivia.history, border: 'border-b-1' },
  { id: 'culture', name: 'Cultural Significance', value: trivia.culture, border: 'border-b-1' },
  { id: 'myth', name: 'Myths', value: trivia.myth, border: 'border-b-1' },
  { id: 'hero', name: 'Hero', value: trivia.hero, border: 'border-b-1' },
  { id: 'hobbies', name: 'Hobbies', value: trivia.hobbies, border: 'border-b-0' },
];

interface IProps {
  trivia: Partial<TBreedTrivia>;
}

export const TriviaTable: FC<IProps> = ({ trivia }) => {
  return (
    <Table hideHeader>
      <TableHeader>
        <TableColumn>Category</TableColumn>
        <TableColumn>Description</TableColumn>
      </TableHeader>
      <TableBody>
        {getTriviaFields(trivia).map(item => {
          const value =
            (item.id === 'hobbies' && (<ol>{item.value?.split(';').map(item => (<li>{item}</li>))}</ol>))
            || (item.id === 'quote' && (<blockquote>&#8220;{item.value}&#8221;</blockquote>))
            || (<span>{item.value}</span>);
          return (
            <TableRow key={item.name}>
              <TableCell className={`text-lg font-semibold align-text-top border-b-violet-200 ${item.border}`}>{item.name}</TableCell>
              <TableCell className={`border-b-violet-200 ${item.border}`}>{value}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>

  );
};
