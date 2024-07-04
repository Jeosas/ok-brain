import { parseLines } from '../../../src/core/todo/parser.ts';
import { expect, it } from '@jest/globals';

it('should parse a file in an acceptable time', async () => {
  const qty = 1e5;
  const given: string[] = Array(qty).fill(
    'x (A) 2024-07-04 2024-07-03 this is a test +testing +app @home due:now id:42',
  );

  const start = performance.now();
  await parseLines(given);
  const enlapsed = performance.now() - start;

  expect(enlapsed).toBeLessThan(1000); // ms
});
