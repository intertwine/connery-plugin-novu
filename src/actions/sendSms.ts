import { ActionDefinition, ActionContext, OutputParametersObject } from '@connery-io/sdk';
import { Novu } from '@novu/node';

const action: ActionDefinition = {
  key: 'sendSms',
  title: 'Send SMS',
  description: 'Send an SMS text message via Novu',
  type: 'create',
  inputParameters: [
    {
      key: 'subscriberId',
      title: 'Subscriber ID',
      description: 'Subscriber ID to associate with this SMS invocation.',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'recipient',
      title: 'SMS Recipient',
      description: 'E164 formatted phone number of the SMS recipient. (e.g. +15555555555)',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'body',
      title: 'SMS Body',
      description: 'Body of the SMS.',
      type: 'string',
      validation: {
        required: true,
      },
    },
  ],
  operation: {
    handler: handler,
  },
  outputParameters: [
    {
      key: 'transactionId',
      title: 'Novu Transaction ID',
      type: 'string',
      validation: {
        required: false,
      },
    },
    {
      key: 'errorMessage',
      title: 'Error Message',
      type: 'string',
      validation: {
        required: false,
      },
    },
  ],
};
export default action;

export async function handler({
  inputParameters,
  configurationParameters,
}: ActionContext): Promise<OutputParametersObject> {
  const { subscriberId, recipient, body } = inputParameters;
  const { novuSmsTrigger, novuApiKey } = configurationParameters;

  const options = {
    to: {
      subscriberId,
      phone: recipient,
    },
    payload: {
      bodyContent: body,
    },
  };

  const novu = new Novu(novuApiKey);

  try {
    const { status, data } = await novu.trigger(novuSmsTrigger, options);

    if (status !== 201) {
      throw new Error(`Failed to send SMS: ${status}`);
    }

    console.log(`Successfully sent SMS: %o`, data);

    const transactionId = data.data.transactionId ?? '';

    return {
      transactionId,
    };
  } catch (e: unknown) {
    const errorMessage = (e as Error).message ?? 'Unknown error';
    return {
      errorMessage,
    };
  }
}
