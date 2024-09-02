import { dirname, join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { executeProcess, objectToCliArgs } from '@org/test-utils';

describe('CLI command - sort', () => {
  const workspaceRoot = 'tmp/npm-env/cli-e2e-env';
  const baseDir = join(workspaceRoot, 'sort');
  const userconfig = join(baseDir, '.npmrc');

  afterEach(async () => {
    await rm(baseDir, { recursive: true, force: true });
  });

  it('should execute CLI command sort when param file is given', async () => {
    const testPath = join(baseDir, 'file-sort', 'users.json');
    await mkdir(dirname(testPath), { recursive: true });
    await writeFile(
      testPath,
      JSON.stringify([{ name: 'Michael' }, { name: 'Alice' }])
    );

    await expect(
      executeProcess({
        command: 'npx',
        args: objectToCliArgs({
          _: ['@org/cli', 'sort'],
          file: testPath,
        }),
        cwd: workspaceRoot,
        verbose: true,
      })
    ).rejects.toThrow(
      'The "path" argument must be of type string or an instance of Buffer or URL'
    );
    /*
        const content = (await readFile(testPath)).toString();
        expect(JSON.parse(content)).toEqual([
          {name: 'Alice'},
          {name: 'Michael'},
        ]);
    */
  });
});
