import os
import stripe
from fastapi import APIRouter, HTTPException, Request, Header
from pydantic import BaseModel
from typing import Optional
import logging

# Configure Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY', 'sk_test_placeholder_replace_with_real_key')
STRIPE_WEBHOOK_SECRET = os.getenv('STRIPE_WEBHOOK_SECRET', 'whsec_placeholder_replace_with_real_key')

router = APIRouter()
logger = logging.getLogger(__name__)

# Subscription Plans Configuration for Thailand Market
SUBSCRIPTION_PLANS = {
    'basic_monthly': {
        'name': 'Basic Plan - Monthly',
        'description': 'Perfect for job seekers',
        'price': 499,  # Thai Baht
        'currency': 'thb',
        'interval': 'month',
        'features': [
            'Create professional profile',
            'Apply to unlimited jobs',
            'Save up to 10 jobs',
            'Basic portfolio (5 projects)',
            'Email support'
        ]
    },
    'basic_annual': {
        'name': 'Basic Plan - Annual',
        'description': 'Perfect for job seekers (Save 17%)',
        'price': 4990,  # Thai Baht
        'currency': 'thb',
        'interval': 'year',
        'features': [
            'All Basic Monthly features',
            'Save ฿998 per year',
            'Priority support'
        ]
    },
    'professional_monthly': {
        'name': 'Professional Plan - Monthly',
        'description': 'For BIM professionals',
        'price': 999,  # Thai Baht
        'currency': 'thb',
        'interval': 'month',
        'features': [
            'All Basic features',
            'Featured profile listing',
            'Unlimited portfolio projects',
            'Advanced analytics',
            'Priority job applications',
            'Direct messaging with employers',
            'Profile badge',
            'Priority support'
        ]
    },
    'professional_annual': {
        'name': 'Professional Plan - Annual',
        'description': 'For BIM professionals (Save 17%)',
        'price': 9990,  # Thai Baht
        'currency': 'thb',
        'interval': 'year',
        'features': [
            'All Professional Monthly features',
            'Save ฿1,998 per year',
            '24/7 priority support'
        ]
    },
    'enterprise_monthly': {
        'name': 'Enterprise Plan - Monthly',
        'description': 'For companies',
        'price': 2999,  # Thai Baht
        'currency': 'thb',
        'interval': 'month',
        'features': [
            'Post unlimited jobs',
            'Featured company profile',
            'Advanced candidate screening',
            'Team collaboration tools',
            'Company portfolio showcase',
            'Analytics dashboard',
            'API access',
            'Dedicated account manager',
            '24/7 premium support'
        ]
    },
    'enterprise_annual': {
        'name': 'Enterprise Plan - Annual',
        'description': 'For companies (Save 17%)',
        'price': 29990,  # Thai Baht
        'currency': 'thb',
        'interval': 'year',
        'features': [
            'All Enterprise Monthly features',
            'Save ฿5,988 per year',
            'Custom integrations',
            'Onboarding assistance'
        ]
    }
}


class CheckoutSessionRequest(BaseModel):
    plan_id: str
    user_id: str
    user_email: str
    success_url: str
    cancel_url: str


class SubscriptionResponse(BaseModel):
    subscription_id: Optional[str]
    status: str
    plan: str
    current_period_end: Optional[int]


@router.get("/subscription-plans")
async def get_subscription_plans():
    """Get all available subscription plans"""
    return {
        "plans": SUBSCRIPTION_PLANS,
        "publishable_key": os.getenv('STRIPE_PUBLISHABLE_KEY', 'pk_test_placeholder_replace_with_real_key')
    }


@router.post("/create-checkout-session")
async def create_checkout_session(request: CheckoutSessionRequest):
    """Create a Stripe checkout session for subscription"""
    try:
        # Validate plan exists
        if request.plan_id not in SUBSCRIPTION_PLANS:
            raise HTTPException(status_code=400, detail="Invalid plan ID")
        
        plan = SUBSCRIPTION_PLANS[request.plan_id]
        
        # Check if we're using placeholder keys
        if stripe.api_key.startswith('sk_test_placeholder'):
            logger.warning("Using placeholder Stripe keys - returning mock session")
            return {
                "session_id": "mock_session_id_replace_with_real_stripe_keys",
                "url": f"{request.success_url}?session_id=mock_session_success",
                "message": "Mock checkout session created. Replace Stripe keys with real ones for production."
            }
        
        # Create Stripe checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': plan['currency'],
                    'product_data': {
                        'name': plan['name'],
                        'description': plan['description'],
                    },
                    'unit_amount': plan['price'] * 100,  # Convert to smallest currency unit
                    'recurring': {
                        'interval': plan['interval'],
                    },
                },
                'quantity': 1,
            }],
            mode='subscription',
            success_url=request.success_url + '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=request.cancel_url,
            client_reference_id=request.user_id,
            customer_email=request.user_email,
            metadata={
                'user_id': request.user_id,
                'plan_id': request.plan_id,
            }
        )
        
        return {
            "session_id": session.id,
            "url": session.url
        }
    
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating checkout session: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create checkout session")


@router.get("/subscription/{user_id}")
async def get_user_subscription(user_id: str):
    """Get user's current subscription status"""
    try:
        # Check if we're using placeholder keys
        if stripe.api_key.startswith('sk_test_placeholder'):
            return {
                "subscription_id": None,
                "status": "none",
                "plan": "free",
                "current_period_end": None,
                "message": "Using mock subscription data. Replace Stripe keys with real ones."
            }
        
        # In production, query your database for the user's subscription
        # For now, return mock data
        return {
            "subscription_id": None,
            "status": "none",
            "plan": "free",
            "current_period_end": None
        }
    
    except Exception as e:
        logger.error(f"Error fetching subscription: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch subscription")


@router.post("/cancel-subscription")
async def cancel_subscription(user_id: str, subscription_id: str):
    """Cancel a user's subscription"""
    try:
        # Check if we're using placeholder keys
        if stripe.api_key.startswith('sk_test_placeholder'):
            return {
                "status": "canceled",
                "message": "Mock subscription canceled. Replace Stripe keys with real ones."
            }
        
        # Cancel the subscription
        subscription = stripe.Subscription.modify(
            subscription_id,
            cancel_at_period_end=True
        )
        
        return {
            "status": "canceled",
            "cancel_at": subscription.cancel_at
        }
    
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error canceling subscription: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to cancel subscription")


@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    """Handle Stripe webhook events"""
    try:
        payload = await request.body()
        
        # Check if we're using placeholder keys
        if STRIPE_WEBHOOK_SECRET.startswith('whsec_placeholder'):
            logger.warning("Using placeholder webhook secret - skipping signature verification")
            return {"status": "mock_webhook_received"}
        
        # Verify webhook signature
        try:
            event = stripe.Webhook.construct_event(
                payload, stripe_signature, STRIPE_WEBHOOK_SECRET
            )
        except ValueError as e:
            logger.error(f"Invalid payload: {str(e)}")
            raise HTTPException(status_code=400, detail="Invalid payload")
        except stripe.error.SignatureVerificationError as e:
            logger.error(f"Invalid signature: {str(e)}")
            raise HTTPException(status_code=400, detail="Invalid signature")
        
        # Handle the event
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            user_id = session.get('client_reference_id')
            subscription_id = session.get('subscription')
            
            # Update user's subscription in database
            logger.info(f"Subscription created for user {user_id}: {subscription_id}")
            # TODO: Update database with subscription info
        
        elif event['type'] == 'customer.subscription.updated':
            subscription = event['data']['object']
            logger.info(f"Subscription updated: {subscription['id']}")
            # TODO: Update subscription status in database
        
        elif event['type'] == 'customer.subscription.deleted':
            subscription = event['data']['object']
            logger.info(f"Subscription canceled: {subscription['id']}")
            # TODO: Mark subscription as canceled in database
        
        elif event['type'] == 'invoice.payment_failed':
            invoice = event['data']['object']
            logger.warning(f"Payment failed for invoice: {invoice['id']}")
            # TODO: Handle failed payment (notify user, etc.)
        
        return {"status": "success"}
    
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=500, detail="Webhook processing failed")


@router.post("/portal-session")
async def create_portal_session(user_id: str, customer_id: str, return_url: str):
    """Create a Stripe customer portal session for managing subscriptions"""
    try:
        # Check if we're using placeholder keys
        if stripe.api_key.startswith('sk_test_placeholder'):
            return {
                "url": f"{return_url}?mock_portal=true",
                "message": "Mock portal session. Replace Stripe keys with real ones."
            }
        
        # Create portal session
        session = stripe.billing_portal.Session.create(
            customer=customer_id,
            return_url=return_url,
        )
        
        return {"url": session.url}
    
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating portal session: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create portal session")
