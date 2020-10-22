import { createPlugin } from '@backstage/core';
import WelcomePage from './components/WelcomePage';
import CreateRecordfood from './components/Recordfood';
 
export const plugin = createPlugin({
  id: 'welcome',
  register({ router }) {
    router.registerRoute('/', WelcomePage);
    router.registerRoute('/Recordfood', CreateRecordfood);
  },
});
