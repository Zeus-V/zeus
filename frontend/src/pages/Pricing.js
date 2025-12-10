import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Pricing() {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState({});
  const [plans, setPlans] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/stripe/subscription-plans`);
      setPlans(response.data.plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast.error('Failed to load subscription plans');
    }
  };

  const handleSubscribe = async (planId) => {
    if (!isAuthenticated) {
      toast.error('Please login to subscribe');
      navigate('/login');
      return;
    }

    setLoading({ [planId]: true });

    try {
      const response = await axios.post(`${BACKEND_URL}/api/stripe/create-checkout-session`, {
        plan_id: planId,
        user_id: user.id.toString(),
        user_email: user.email,
        success_url: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/pricing`
      });

      // Redirect to Stripe Checkout or show success message for mock
      if (response.data.url) {
        if (response.data.url.includes('mock')) {
          toast.success('Mock subscription activated! (Replace Stripe keys for real payments)');
          setTimeout(() => navigate('/dashboard'), 2000);
        } else {
          window.location.href = response.data.url;
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setLoading({ [planId]: false });
    }
  };

  if (!plans) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const pricingTiers = [
    {
      id: 'free',
      name: 'Free',
      description: 'Get started for free',
      plan: 'free',
      isFree: true,
      highlighted: false,
      targetAudience: 'Starter'
    },
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for job seekers',
      monthlyPlan: 'basic_monthly',
      annualPlan: 'basic_annual',
      highlighted: false,
      targetAudience: 'Job Seekers'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For BIM professionals',
      monthlyPlan: 'professional_monthly',
      annualPlan: 'professional_annual',
      highlighted: true,
      targetAudience: 'BIM Professionals'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For companies',
      monthlyPlan: 'enterprise_monthly',
      annualPlan: 'enterprise_annual',
      highlighted: false,
      targetAudience: 'Companies'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Unlock premium features and accelerate your BIM career or business growth
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center glass-strong rounded-xl p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-smooth ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-smooth ${
                billingCycle === 'annual'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <span className="ml-2 px-2 py-0.5 text-xs rounded-md bg-success/20 text-success">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier) => {
            const planId = billingCycle === 'monthly' ? tier.monthlyPlan : tier.annualPlan;
            const plan = plans[planId];
            
            return (
              <div
                key={tier.id}
                className={`glass rounded-2xl p-8 hover:shadow-glass-lg transition-all duration-300 animate-fade-in ${
                  tier.highlighted ? 'ring-2 ring-primary scale-105' : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">{tier.targetAudience}</p>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ฿{(plan.price / (billingCycle === 'annual' ? 12 : 1)).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed ฿{plan.price.toLocaleString()} annually
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => handleSubscribe(planId)}
                  disabled={loading[planId]}
                  className={`w-full mb-6 ${
                    tier.highlighted
                      ? 'bg-primary hover:bg-primary/90'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  {loading[planId] ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Subscribe Now'
                  )}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="glass rounded-2xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-sm text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, debit cards, and Thai bank transfers through Stripe.
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                Is there a free trial?
              </h3>
              <p className="text-sm text-muted-foreground">
                You can use our platform with limited features for free. Upgrade anytime to unlock all features.
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel anytime. You'll retain access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by over 1,500+ BIM professionals and 120+ companies in Thailand
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
