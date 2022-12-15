import Handlebars from 'handlebars';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IHandlebarMailTemplate {
  template: string;
  variables: ITemplateVariables;
}

class HandlebarMailTemplate {
  public async parse({
    template,
    variables,
  }: IHandlebarMailTemplate): Promise<string> {
    const parseTemplate = Handlebars.compile(template);
    return parseTemplate(variables);
  }
}

export default new HandlebarMailTemplate();
