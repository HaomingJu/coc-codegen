import { ListContext, ListItem, Neovim, window } from 'coc.nvim';

export default class CodeGenList {
  public readonly name = 'codegen_list';
  public readonly description = 'CocList for coc-codegen';
  public readonly defaultAction = 'open';

  constructor() {

  }

  public async loadItems(context: ListContext): Promise<ListItem[]> {
    return [
      {
        label: 'coc-codegen list item 1',
        data: { name: 'list item 1' },
      },
      {
        label: 'coc-codegen list item 2',
        data: { name: 'list item 2' },
      },
    ];
  }
}
