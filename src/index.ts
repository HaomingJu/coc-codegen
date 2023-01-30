import {CompletionList, commands, CompleteResult, ExtensionContext, languages, listManager, sources, window, workspace } from 'coc.nvim';

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

async function getCompletionItems(url_: string, prompt_: string, stream_: bool = false): Promise<CompletionList> {

    const response = await fetch(url_, {
      method: 'POST',
      body: JSON.stringify({
        prompt: prompt_,
        stream: stream_
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
        const result = (await response.json()) as CodeCompletionResponse;
        console.log(result.model);
        console.log(result.choices[0].text);
        var return_str = prompt_.concat(result.choices[0].text)

        return {
            isIncomplete: false,
            items: [
                {
                    label: return_str,
                    documentation: return_str
                }
            ]
        }
    }
}

export async function activate(context: ExtensionContext): Promise<void> {
  const configuration = workspace.getConfiguration('codegen')
  const api_base = configuration.get<string>('api_base', "127.0.0.1:8978")
  const api_key = configuration.get<string>('api_key', "dummy")
  const engine = configuration.get<string>('engine', "codegen")
  const shortcut = configuration.get<string>('shortcut', "NLP")
  const filetypes = configuration.get<string[] | null>('filetypes', ['cpp', 'c', 'python'])
  const priority = configuration.get<number>('priority', undefined)
  const post_url = "http://10.11.1.15:8978/v1/engines/codegen/completions"
  const { subscriptions } = context



  subscriptions.push(
    languages.registerCompletionItemProvider("codegen", shortcut, filetypes,  {
        async provideCompletionItems(): Promise<CompletionList | undefined | null> {
            // TODO: 如何连接到后端
            let ret: CompletionList = await getCompletionItems(post_url, "if __name__ == ")
            return ret;
        }}, [], priority),

    workspace.registerAutocmd({
      event: 'InsertLeave',
      request: true,
      callback: () => {
        logger.error('registerAutocmd on InsertLeave');
      },
    })
  );
}

