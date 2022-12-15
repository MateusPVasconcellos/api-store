import fs from 'fs';
import Handlebars from 'handlebars';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IHandlebarMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

class HandlebarMailTemplate {
  public async parse({
    file,
    variables,
  }: IHandlebarMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = Handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

export default new HandlebarMailTemplate();
