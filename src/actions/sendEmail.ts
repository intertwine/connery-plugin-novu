import { ActionDefinition, ActionContext, OutputParametersObject } from '@connery-io/sdk';
import { Novu } from '@novu/node';

const action: ActionDefinition = {
  key: 'sendEmail',
  title: 'Send Email',
  description: 'Send an Email via Novu',
  type: 'create',
  inputParameters: [
    {
      key: 'subscriberId',
      title: 'Subscriber ID',
      description: 'Subscriber ID to associate with this email invocation.',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'recipient',
      title: 'Email Recipient',
      description: 'Email address of the email recipient.',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'subject',
      title: 'Email Subject',
      description: 'Subject of the email.',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'body',
      title: 'Email Body',
      description: 'Body of the email.',
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
  const { subscriberId, recipient, subject, body } = inputParameters;
  const { novuEmailTrigger, novuApiKey } = configurationParameters;

  const options = {
    to: {
      subscriberId,
      email: recipient,
    },
    payload: {
      subject,
      bodyContent: body,
    },
  };

  const novu = new Novu(novuApiKey);

  try {
    const { status, data } = await novu.trigger(novuEmailTrigger, options);

    if (status !== 201) {
      throw new Error(`Failed to send email: ${status}`);
    }

    console.log(`Successfully sent email: %o`, data);

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
