import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { chargebeeService } from '../../services/chargebee';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function CustomerBilling({ customer }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customer?.id) {
      loadBillingData();
    }
  }, [customer]);

  const loadBillingData = async () => {
    try {
      setLoading(true);
      const [subs, invs] = await Promise.all([
        chargebeeService.getCustomerSubscriptions(customer.id),
        chargebeeService.getCustomerInvoices(customer.id)
      ]);
      setSubscriptions(subs);
      setInvoices(invs);
    } catch (error) {
      toast.error('Failed to load billing data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPortal = async () => {
    try {
      const session = await chargebeeService.createCustomerPortalSession(customer.id);
      window.open(session.accessUrl, '_blank');
    } catch (error) {
      toast.error('Failed to open customer portal');
    }
  };

  const handleCreateSubscription = async () => {
    try {
      const session = await chargebeeService.createCheckoutSession('your-plan-id', customer.id);
      window.open(session.url, '_blank');
    } catch (error) {
      toast.error('Failed to create subscription');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Loading billing information...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Subscriptions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Subscriptions</h2>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleOpenPortal}>
                Customer Portal
              </Button>
              <Button onClick={handleCreateSubscription}>
                New Subscription
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {subscriptions.length === 0 ? (
            <p className="text-gray-500">No active subscriptions</p>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800"
                >
                  <div>
                    <p className="font-medium">{subscription.planName}</p>
                    <p className="text-sm text-gray-500">
                      {subscription.status} • Renews {format(new Date(subscription.currentTermEnd), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <p className="font-medium">${subscription.planAmount / 100}/mo</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Billing History</h2>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <p className="text-gray-500">No invoices found</p>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800"
                >
                  <div>
                    <p className="font-medium">Invoice #{invoice.id}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(invoice.date), 'MMM d, yyyy')} • {invoice.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${invoice.total / 100}</p>
                    <button 
                      onClick={() => window.open(invoice.downloadUrl, '_blank')}
                      className="text-sm text-primary hover:underline"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}