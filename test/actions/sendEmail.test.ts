import { handler } from '../../src/actions/sendEmail';
import { Novu } from '@novu/node';

// Mock the Novu class and its trigger method
jest.mock('@novu/node', () => {
  const triggerMock = jest
    .fn()
    .mockResolvedValueOnce({
      // First call - resolved value
      status: 201,
      data: {
        data: {
          transactionId: '12345',
        },
      },
    })
    .mockRejectedValueOnce(new Error('Failed to send email: 400')); // Second call - rejected value

  return {
    Novu: jest.fn().mockImplementation(() => {
      return {
        trigger: triggerMock,
      };
    }),
  };
});

describe('sendEmail action', () => {
  let novuInstance: any;

  beforeEach(() => {
    // Reset the Novu instance before each test
    novuInstance = new Novu('fake-api-key');
  });

  it('should send an email and return transactionId on success', async () => {
    // Arrange
    const inputParameters = {
      subscriberId: 'sub-id',
      recipient: 'test@example.com',
      subject: 'Test Subject',
      body: 'Test Body',
    };
    const configurationParameters = {
      novuEmailTrigger: 'trigger-id',
      novuApiKey: 'fake-api-key',
    };

    // Act
    const result = await handler({ inputParameters, configurationParameters });

    // Assert
    expect(result).toEqual({
      transactionId: '12345',
    });
    expect(novuInstance.trigger).toHaveBeenCalledWith('trigger-id', {
      to: {
        subscriberId: 'sub-id',
        email: 'test@example.com',
      },
      payload: {
        subject: 'Test Subject',
        bodyContent: 'Test Body',
      },
    });
  });

  it('should return an error message on failure', async () => {
    // Arrange
    const inputParameters = {
      subscriberId: 'sub-id',
      recipient: 'test@example.com',
      subject: 'Test Subject',
      body: 'Test Body',
    };
    const configurationParameters = {
      novuEmailTrigger: 'trigger-id',
      novuApiKey: 'fake-api-key',
    };

    // Act
    const result = await handler({ inputParameters, configurationParameters });

    // Assert
    expect(result).toEqual({
      errorMessage: 'Failed to send email: 400',
    });
  });
});
