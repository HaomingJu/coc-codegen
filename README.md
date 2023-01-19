# coc-codegen

CodeGen for OpenAI NLP

## Install

`:CocInstall coc-codegen`

## Keymaps

`nmap <silent> <C-l> <Plug>(coc-coc-codegen-keymap)`

## Lists

`:CocList demo_list`

## License

MIT

---

> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)



```
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "YOUR_ORG_ID",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
```
ref: https://beta.openai.com/docs/api-reference/authentication
