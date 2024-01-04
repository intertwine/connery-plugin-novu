import { handler } from '../../src/actions/sendSms';
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
    .mockRejectedValueOnce(new Error('Failed to send SMS: 400')); // Second call - rejected value

  return {
    Novu: jest.fn().mockImplementation(() => {
      return {
        trigger: triggerMock,
      };
    }),
  };
});

describe('sendSms action', () => {
  let novuInstance: any;

  beforeEach(() => {
    // Reset the Novu instance before each test
    novuInstance = new Novu('fake-api-key');
  });

  it('should send an SMS and return transactionId on success', async () => {
    // Arrange
    const inputParameters = {
      subscriberId: 'sub-id',
      recipient: '+15555555555',
      body: 'Test Body',
    };
    const configurationParameters = {
      novuSmsTrigger: 'trigger-id',
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
        phone: '+15555555555',
      },
      payload: {
        bodyContent: 'Test Body',
      },
    });
  });

  it('should return an error message on failure', async () => {
    // Arrange
    const inputParameters = {
      subscriberId: 'sub-id',
      recipient: '+15555555555',
      body: 'Test Body',
    };
    const configurationParameters = {
      novuSmsTrigger: 'trigger-id',
      novuApiKey: 'fake-api-key',
    };

    // Act
    const result = await handler({ inputParameters, configurationParameters });

    // Assert
    expect(result).toEqual({
      errorMessage: 'Failed to send SMS: 400',
    });
  });
});

