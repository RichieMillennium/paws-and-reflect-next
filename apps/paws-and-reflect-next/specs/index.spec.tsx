import React from 'react';
import { render } from '@testing-library/react';

jest.mock('@langchain/openai', () => ({
  OpenAI: class {
    invoke() {
      return 'test';
    }
  }
}));

jest.mock('@langchain/core/output_parsers', () => ({
  StructuredOutputParser: {
    fromZodSchema: () => {
      return {
        getFormatInstructions: jest.fn(),
        parse: jest.fn(),
      }
    }
  }
}));

jest.mock('@langchain/core/prompts', () => ({
  PromptTemplate: class {
    format() {
      return Promise.resolve(null);
    }
  }
}));

import Page from '../app/page';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Page />);
    expect(baseElement).toBeTruthy();
  });
});
