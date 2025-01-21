import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';

export function AIAssistant({ deal }) {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (deal) {
      setLoading(true);
      // Simulate AI suggestion generation
      setTimeout(() => {
        setSuggestion({
          nextAction: getNextAction(deal),
          opportunity: getOpportunityScore(deal),
          tips: getSalesTips(deal)
        });
        setLoading(false);
      }, 1000);
    } else {
      setSuggestion(null);
    }
  }, [deal]);

  if (!deal) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          Select a deal to get AI suggestions
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Sales Assistant</h2>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          </div>
        ) : suggestion ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Next Best Action
              </h3>
              <p className="text-sm">{suggestion.nextAction}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Opportunity Score
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${suggestion.opportunity}, 100`}
                    />
                    <text
                      x="18"
                      y="20.35"
                      className="text-xs font-medium"
                      textAnchor="middle"
                      fill="currentColor"
                    >
                      {suggestion.opportunity}%
                    </text>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${suggestion.opportunity}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Likelihood to close</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tips & Insights
              </h3>
              <ul className="space-y-2">
                {suggestion.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-emerald-500">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function getNextAction(deal) {
  const actions = {
    qualified: "Schedule an initial discovery call to understand their needs better.",
    contact_made: "Follow up with a detailed product presentation.",
    demo_scheduled: "Prepare personalized demo focusing on their key pain points.",
    proposal: "Send a follow-up email to address any concerns about the proposal.",
    negotiation: "Schedule a meeting to discuss contract terms.",
    closed: "Start onboarding process and schedule kick-off meeting."
  };
  return actions[deal.stage] || "Review deal status and plan next steps.";
}

function getOpportunityScore(deal) {
  const baseScores = {
    qualified: 20,
    contact_made: 40,
    demo_scheduled: 60,
    proposal: 75,
    negotiation: 85,
    closed: 100
  };
  return baseScores[deal.stage] || 0;
}

function getSalesTips(deal) {
  const tips = {
    qualified: [
      "Research the company's recent news and developments",
      "Identify key decision makers and stakeholders",
      "Prepare relevant case studies from similar companies"
    ],
    contact_made: [
      "Document key pain points discussed",
      "Share relevant content and resources",
      "Set clear next steps and timeline"
    ],
    demo_scheduled: [
      "Customize demo to address specific needs",
      "Prepare answers to common objections",
      "Follow up with meeting summary and materials"
    ],
    proposal: [
      "Highlight ROI and value proposition",
      "Include customer testimonials",
      "Be ready to negotiate terms"
    ],
    negotiation: [
      "Focus on value over price",
      "Have alternative proposals ready",
      "Get legal team involved early"
    ],
    closed: [
      "Start planning implementation",
      "Introduce customer success team",
      "Set up regular check-ins"
    ]
  };
  return tips[deal.stage] || [];
}