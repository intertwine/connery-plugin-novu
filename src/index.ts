import { PluginDefinition } from '@connery-io/sdk';
import sendSms from './actions/sendSms';
import sendEmail from './actions/sendEmail';

const plugin: PluginDefinition = {
  title: 'Novu',
  description: 'Plugin for the Novu API',
  actions: [sendSms, sendEmail],
  configurationParameters: [
    {
      key: 'novuEmailTrigger',
      title: 'Novu email trigger',
      description: 'Name of Novu email send trigger.',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'novuSmsTrigger',
      title: 'Novu SMS trigger',
      description: 'Name of Novu SMS send trigger.',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'novuApiKey',
      title: 'Novu API Key',
      description: 'API Key for your Novu account.',
      type: 'string',
      validation: {
        required: true,
      },
    },
  ],
  maintainers: [
    {
      name: 'Intertwine AI',
      email: 'support@intertwinesys.com',
    },
  ],
  connery: {
    runnerVersion: '0',
  },
};
export default plugin;
