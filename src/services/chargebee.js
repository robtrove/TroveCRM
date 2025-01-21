// Mock Chargebee service for development
class ChargebeeService {
  constructor() {
    this.site = import.meta.env.VITE_CHARGEBEE_SITE;
    this.apiKey = import.meta.env.VITE_CHARGEBEE_API_KEY;
  }

  async testConnection(apiKey) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate API key format
      if (!apiKey || apiKey.length < 32) {
        throw new Error('Invalid API key format');
      }

      return { success: true, message: 'Connection successful' };
    } catch (error) {
      console.error('Error testing Chargebee connection:', error);
      throw new Error(error.message || 'Failed to connect to Chargebee');
    }
  }

  async createCustomerPortalSession(customerId) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        accessUrl: 'https://example.chargebee.com/portal/123',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
    } catch (error) {
      console.error('Error creating portal session:', error);
      throw error;
    }
  }

  async createCheckoutSession(planId, customerId = null) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        url: 'https://example.chargebee.com/checkout/123',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  async getCustomerSubscriptions(customerId) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return [
        {
          id: 'sub_123',
          planId: 'plan_basic',
          planName: 'Basic Plan',
          status: 'active',
          currentTermStart: new Date().toISOString(),
          currentTermEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          planAmount: 2900
        }
      ];
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  }

  async getCustomerInvoices(customerId) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return [
        {
          id: 'inv_123',
          date: new Date().toISOString(),
          total: 2900,
          status: 'paid',
          downloadUrl: '#'
        }
      ];
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  }
}

export const chargebeeService = new ChargebeeService();