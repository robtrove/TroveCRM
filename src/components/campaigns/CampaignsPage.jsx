import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { CampaignsList } from './CampaignsList';
import { CampaignModal } from './CampaignModal';
import { CampaignStats } from './CampaignStats';
import { campaignService } from '../../services/supabase';
import toast from 'react-hot-toast';

export function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    search: ''
  });

  // Fetch campaigns on component mount
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const data = await campaignService.getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (campaign) => {
    try {
      // Map the campaign data to match the database schema
      const newCampaign = {
        name: campaign.name,
        status: campaign.status,
        type: campaign.type,
        audience: campaign.audience,
        start_date: campaign.startDate,
        end_date: campaign.endDate,
        budget: campaign.budget,
        spent: 0,
        metrics: campaign.metrics || { sent: 0, opened: 0, clicked: 0, converted: 0 }
      };

      // Create campaign in the database
      const savedCampaign = await campaignService.createCampaign(newCampaign);

      // Format the returned campaign object to match the app's format
      const formattedCampaign = {
        ...savedCampaign,
        startDate: savedCampaign.start_date,
        endDate: savedCampaign.end_date
      };

      setCampaigns([formattedCampaign, ...campaigns]);
      toast.success('Campaign created successfully');
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign');
    }
  };

  const handleUpdateCampaign = async (updatedCampaign) => {
    try {
      // Map the campaign data to match the database schema
      const updates = {
        name: updatedCampaign.name,
        status: updatedCampaign.status,
        type: updatedCampaign.type,
        audience: updatedCampaign.audience,
        start_date: updatedCampaign.startDate,
        end_date: updatedCampaign.endDate,
        budget: updatedCampaign.budget,
        metrics: updatedCampaign.metrics,
        updated_at: new Date().toISOString()
      };

      // Update campaign in the database
      const savedCampaign = await campaignService.updateCampaign(updatedCampaign.id, updates);

      // Format the returned campaign object to match the app's format
      const formattedCampaign = {
        ...savedCampaign,
        startDate: savedCampaign.start_date,
        endDate: savedCampaign.end_date
      };

      setCampaigns(campaigns.map(c => c.id === updatedCampaign.id ? formattedCampaign : c));
      toast.success('Campaign updated successfully');
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast.error('Failed to update campaign');
    }
  };

  const handleDeleteCampaign = async (id) => {
    try {
      await campaignService.deleteCampaign(id);
      setCampaigns(campaigns.filter(c => c.id !== id));
      toast.success('Campaign deleted successfully');
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast.error('Failed to delete campaign');
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filters.status !== 'all' && campaign.status !== filters.status) return false;
    if (filters.type !== 'all' && campaign.type !== filters.type) return false;
    if (filters.search && !campaign.name?.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  // Calculate total metrics
  const totalMetrics = campaigns.reduce((acc, campaign) => {
    if (campaign.type === 'email') {
      acc.emailsSent += campaign.metrics?.sent || 0;
      acc.conversions += campaign.metrics?.converted || 0;
    }
    acc.spent += campaign.spent || 0;
    return acc;
  }, { emailsSent: 0, conversions: 0, spent: 0 });

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h1 className="text-gray-900 dark:text-white text-2xl md:text-3xl font-bold">Campaigns</h1>
          <Button onClick={() => {
            setSelectedCampaign(null);
            setIsModalOpen(true);
          }}>
            Create Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <CampaignStats
            title="Total Emails Sent"
            value={totalMetrics.emailsSent.toLocaleString()}
            trend="+12.5%"
            description="Compared to last month"
          />
          <CampaignStats
            title="Total Conversions"
            value={totalMetrics.conversions.toLocaleString()}
            trend="+8.2%"
            description="Compared to last month"
          />
          <CampaignStats
            title="Total Spent"
            value={`$${totalMetrics.spent.toLocaleString()}`}
            trend="+15.3%"
            description="Compared to last month"
          />
        </div>

        <div className="p-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-4">
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                </select>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="all">All Types</option>
                  <option value="email">Email</option>
                  <option value="social">Social</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">
                  <p>Loading campaigns...</p>
                </div>
              ) : (
                <CampaignsList
                  campaigns={filteredCampaigns}
                  onEdit={(campaign) => {
                    setSelectedCampaign(campaign);
                    setIsModalOpen(true);
                  }}
                  onDelete={handleDeleteCampaign}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCampaign(null);
        }}
        onSubmit={selectedCampaign ? handleUpdateCampaign : handleCreateCampaign}
        campaign={selectedCampaign}
      />
    </main>
  );
}