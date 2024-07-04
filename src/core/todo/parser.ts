export type Todo = {
  isDone: boolean;
  priority: Priority | null;
  body: string;
  createdAt: Date | null;
  completedAt: Date | null;
  projects: string[];
  contexts: string[];
  tags: [string, string][];
};

const todoParser =
  /^(?<d>(x )?)([(](?<p>[A-Z])[)] )?(((?<dd>\d{4}-\d{2}-\d{2}) )?(?<dc>\d{4}-\d{2}-\d{2}) )?(?<b>.+)/;

const projectParser = /\s\+(?<p>\w+)/g;
const contextParser = /\s@(?<c>\w+)/g;
const tagsParser = /\s(?<k>\w+):(?<v>\w+)/g;

export async function parseLine(line: string): Promise<Todo> {
  const matchTodo = todoParser.exec(line);

  // ignoring ts, we want to catch undefined groups and null matches as a parsing error
  try {
    // @ts-ignore
    let body = matchTodo.groups.b.trim();
    body = body.replaceAll(projectParser, '');
    body = body.replaceAll(contextParser, '');
    body = body.replaceAll(tagsParser, '');

    return {
      // @ts-ignore
      isDone: matchTodo.groups.d != '',
      // @ts-ignore
      priority: matchTodo.groups.p || null,
      body: body,
      // @ts-ignore
      createdAt: matchTodo.groups.dc ? new Date(matchTodo.groups.dc) : null,
      // @ts-ignore
      completedAt: matchTodo.groups.dd ? new Date(matchTodo.groups.dd) : null,
      // @ts-ignore
      projects: Array.from(line.matchAll(projectParser), m => m.groups.p),
      // @ts-ignore
      contexts: Array.from(line.matchAll(contextParser), m => m.groups.c),
      tags: Array.from(line.matchAll(tagsParser), m => [
        // @ts-ignore
        m.groups.k,
        // @ts-ignore
        m.groups.v,
      ]),
    };
  } catch (e) {
    throw new Error(`Failed to parse line: '${line}'`);
  }
}

export async function parseLines(lines: string[]): Promise<Todo[]> {
  return Promise.all(lines.map(parseLine));
}
