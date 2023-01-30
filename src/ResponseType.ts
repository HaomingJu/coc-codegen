type Choice = {
  text: string;
  index: number;
  finish_reason: string;
};

type Usage = {
  completion_tokens: string;
  prompt_tokens: string;
  total_tokens: string;
};

type CodeCompletionResponse = {
  id: string;
  model: string;
  object: string;
  created: string;
  choices: Choice[];
  usage: Usage;
};
