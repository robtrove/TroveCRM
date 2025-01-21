import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { NewArticleModal } from './NewArticleModal';
import toast from 'react-hot-toast';

const faqCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using our platform',
    articles: [
      { id: 1, title: 'How to create your first project', views: 1250 },
      { id: 2, title: 'Understanding the dashboard', views: 980 },
      { id: 3, title: 'Setting up your profile', views: 756 }
    ]
  },
  {
    id: 'account-billing',
    title: 'Account & Billing',
    description: 'Manage your account and billing information',
    articles: [
      { id: 4, title: 'Subscription plans explained', views: 2100 },
      { id: 5, title: 'How to update billing information', views: 1580 },
      { id: 6, title: 'Cancellation and refunds', views: 890 }
    ]
  },
  {
    id: 'features',
    title: 'Features',
    description: 'Detailed guides for all platform features',
    articles: [
      { id: 7, title: 'Advanced search techniques', views: 1340 },
      { id: 8, title: 'Using the API', views: 2300 },
      { id: 9, title: 'Custom integrations', views: 1100 }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Common issues and their solutions',
    description: 'Troubleshooting guides and FAQs',
    articles: [
      { id: 10, title: 'Common error messages', views: 3200 },
      { id: 11, title: 'Connection issues', views: 1800 },
      { id: 12, title: 'Performance optimization', views: 950 }
    ]
  }
];

export function KnowledgeBase({ onSelectArticle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isNewArticleModalOpen, setIsNewArticleModalOpen] = useState(false);

  const handleAiSuggest = async () => {
    setIsAiGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('AI suggestion generated successfully');
    } catch (error) {
      toast.error('Failed to generate AI suggestion');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleCreateArticle = (articleData) => {
    console.log('New article:', articleData);
    toast.success('Article created successfully');
    setIsNewArticleModalOpen(false);
  };

  const filteredCategories = faqCategories.filter(category => {
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      return (
        category.title.toLowerCase().includes(search) ||
        category.description.toLowerCase().includes(search) ||
        category.articles.some(article => 
          article.title.toLowerCase().includes(search)
        )
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* FAQ Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {faqCategories.map(category => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">{category.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{category.description}</p>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => setSelectedCategory(category.id)}
              >
                View Articles
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
          />
          <svg
            className="absolute left-3 top-2.5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
        >
          <option value="all">All Categories</option>
          {faqCategories.map(category => (
            <option key={category.id} value={category.id}>{category.title}</option>
          ))}
        </select>
      </div>

      {/* Articles */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Knowledge Base</h2>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={handleAiSuggest}
                disabled={isAiGenerating}
              >
                {isAiGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    AI Suggest
                  </>
                )}
              </Button>
              <Button onClick={() => setIsNewArticleModalOpen(true)}>
                New Article
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredCategories.map((category) => (
              <div key={category.id} className="space-y-4">
                {(selectedCategory === 'all' || selectedCategory === category.id) && (
                  <>
                    <h3 className="font-medium text-lg">{category.title}</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {category.articles.map((article) => (
                        <button
                          key={article.id}
                          onClick={() => onSelectArticle(article)}
                          className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors text-left"
                        >
                          <h4 className="font-medium mb-2">{article.title}</h4>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">{article.views} views</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <NewArticleModal
        isOpen={isNewArticleModalOpen}
        onClose={() => setIsNewArticleModalOpen(false)}
        onSubmit={handleCreateArticle}
      />
    </div>
  );
}