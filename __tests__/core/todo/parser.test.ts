import { parseLine, parseLines, Todo } from '../../../src/core/todo/parser.ts';
import { test, describe, expect, it } from '@jest/globals';

const defaultTodo: Todo = {
  isDone: false,
  priority: null,
  body: 'test',
  createdAt: null,
  completedAt: null,
  projects: [],
  contexts: [],
  tags: [],
};

const creationDate = new Date('2024-07-03');
const completionDate = new Date('2024-07-04');

describe('parseLine function', () => {
  test.concurrent.each([
    // basic body
    ['test', defaultTodo],
    ['test with spaces', { ...defaultTodo, body: 'test with spaces' }],
    // isDone
    ['x test', { ...defaultTodo, isDone: true }],
    ['X test', { ...defaultTodo, body: 'X test' }],
    ['xtest', { ...defaultTodo, body: 'xtest' }],
    ['Xtest', { ...defaultTodo, body: 'Xtest' }],
    // priority
    ['(A) test', { ...defaultTodo, priority: 'A' }],
    ['(B) test', { ...defaultTodo, priority: 'B' }],
    ['(C) test', { ...defaultTodo, priority: 'C' }],
    ['x (A) test', { ...defaultTodo, priority: 'A', isDone: true }],
    // createdAt
    ['2024-07-03 test', { ...defaultTodo, createdAt: creationDate }],
    [
      '(B) 2024-07-03 test',
      { ...defaultTodo, createdAt: creationDate, priority: 'B' },
    ],
    [
      'x 2024-07-03 test',
      { ...defaultTodo, createdAt: creationDate, isDone: true },
    ],
    [
      'x (C) 2024-07-03 test',
      { ...defaultTodo, createdAt: creationDate, isDone: true, priority: 'C' },
    ],
    // completedAt
    [
      '2024-07-04 2024-07-03 test',
      { ...defaultTodo, createdAt: creationDate, completedAt: completionDate },
    ],
    [
      '(B) 2024-07-04 2024-07-03 test',
      {
        ...defaultTodo,
        createdAt: creationDate,
        completedAt: completionDate,
        priority: 'B',
      },
    ],
    [
      'x 2024-07-04 2024-07-03 test',
      {
        ...defaultTodo,
        createdAt: creationDate,
        completedAt: completionDate,
        isDone: true,
      },
    ],
    [
      'x (C) 2024-07-04 2024-07-03 test',
      {
        ...defaultTodo,
        createdAt: creationDate,
        completedAt: completionDate,
        isDone: true,
        priority: 'C',
      },
    ],
    // projects
    ['test +p1', { ...defaultTodo, projects: ['p1'] }],
    ['test +p1 +p2', { ...defaultTodo, projects: ['p1', 'p2'] }],
    ['test+p1', { ...defaultTodo, body: 'test+p1' }],
    // contexts
    ['test @c1', { ...defaultTodo, contexts: ['c1'] }],
    ['test @c1 @c2', { ...defaultTodo, contexts: ['c1', 'c2'] }],
    ['test@c1', { ...defaultTodo, body: 'test@c1' }],
    // tags
    ['test k1:vv', { ...defaultTodo, tags: [['k1', 'vv']] }],
    [
      'test k1:ff k2:gg',
      {
        ...defaultTodo,
        tags: [
          ['k1', 'ff'],
          ['k2', 'gg'],
        ],
      },
    ],
  ])(
    'parses a todo-txt conform string into a Todo object',
    // @ts-ignore TS2345
    async (given: string, expected: Todo) => {
      expect(await parseLine(given)).toStrictEqual(expected);
    },
  );
});

describe('parseLines function', () => {
  it('should parse a list of todo strings', async () => {
    const qty = 1e2;
    const given: string[] = Array(qty).fill(
      'x (A) 2024-07-04 2024-07-03 this is a test +testing +app @home due:now id:42',
    );
    const expected: Todo[] = Array(qty).fill({
      isDone: true,
      priority: 'A',
      body: 'this is a test',
      createdAt: creationDate,
      completedAt: completionDate,
      projects: ['testing', 'app'],
      contexts: ['home'],
      tags: [
        ['due', 'now'],
        ['id', '42'],
      ],
    });

    expect(await parseLines(given)).toStrictEqual(expected);
  });
});
