import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. Please connect to Supabase using the "Connect to Supabase" button.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Customer service
export const customerService = {
  async getCustomers() {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  },

  async getCustomerById(id) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      return null;
    }
  },

  async createCustomer(customer) {
    try {
      // Set created_at if not provided
      if (!customer.created_at) {
        customer.created_at = new Date().toISOString();
      }
      
      const { data, error } = await supabase
        .from('customers')
        .insert([customer])
        .select();
      
      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  async updateCustomer(id, updates) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },

  async deleteCustomer(id) {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
};

// Campaigns service
export const campaignService = {
  async getCampaigns() {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      return [];
    }
  },

  async createCampaign(campaign) {
    try {
      if (!campaign.created_at) {
        campaign.created_at = new Date().toISOString();
      }
      
      const { data, error } = await supabase
        .from('campaigns')
        .insert([campaign])
        .select();
      
      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  },

  async updateCampaign(id, updates) {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  },

  async deleteCampaign(id) {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting campaign:', error);
      throw error;
    }
  }
};

// Deals/Pipeline service
export const dealService = {
  async getDeals() {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching deals:', error);
      return [];
    }
  },

  async createDeal(deal) {
    try {
      if (!deal.created_at) {
        deal.created_at = new Date().toISOString();
      }
      
      const { data, error } = await supabase
        .from('deals')
        .insert([deal])
        .select();
      
      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error creating deal:', error);
      throw error;
    }
  },

  async updateDeal(id, updates) {
    try {
      const { data, error } = await supabase
        .from('deals')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error updating deal:', error);
      throw error;
    }
  },

  async deleteDeal(id) {
    try {
      const { error } = await supabase
        .from('deals')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting deal:', error);
      throw error;
    }
  }
};