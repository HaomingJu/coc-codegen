import {CompletionList, commands, CompleteResult, ExtensionContext, languages, listManager, sources, window, workspace } from 'coc.nvim';
import CodeGenList from './codegen_lists';

async function getCompletionItems(): Promise<CompletionList> {
  return {
    isIncomplete: false,        
    items: [
      {
        label: 'xietianpwi 1',
        data: '[coc-codegen]',
      },
      {
        label: 'xietianpwi 2',
        data: '[coc-codegen]',
      },
    ],
  };
}

export async function activate(context: ExtensionContext): Promise<void> {
  const configuration = workspace.getConfiguration('codegen')
  const api_base = configuration.get<string>('api_base', "127.0.0.1:8978")
  const api_key = configuration.get<string>('api_key', "dummy")
  const engine = configuration.get<string>('engine', "codegen")
  const shortcut = configuration.get<string>('shortcut', "NLP")
  const filetypes = configuration.get<string[] | null>('filetypes', ['cpp', 'c', 'python'])
  const priority = configuration.get<number>('priority', undefined)
  const { subscriptions, logger } = context

  window.showMessage(api_base);

  const codeGen = new CodeGenList();

  subscriptions.push(

    languages.registerCompletionItemProvider("codegen", shortcut, filetypes,  {
        async provideCompletionItems(): Promise<CompletionList | undefined | null> {
            // TODO: 如何连接到后端
            let ret: CompletionList = getCompletionItems();
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

