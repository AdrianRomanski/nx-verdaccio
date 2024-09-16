import { CoreConfig } from '@code-pushup/models';
import nxPerformancePlugin from './tooling/measures/nx-performance/nx-performance.plugin';

const taskTimeTasks = [
  'cli-e2e:e2e',
  'core-e2e:e2e',
  'utils-e2e:e2e',
  'models-e2e:e2e',
  // 'cli-e2e-original:original-e2e'
];
const cacheSizeTasks = [
  'models-e2e:setup-env',
  'utils-e2e:setup-env',
  'core-e2e:setup-env',
  'cli-e2e:setup-env',
  'playground-e2e:setup-env',
];
export default {
  plugins: [
    nxPerformancePlugin({
      taskTimeTasks,
      cacheSizeTasks,
    }),
  ],
} satisfies CoreConfig;