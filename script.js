// Simulate user registration
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Simulate registration logic
    // Transition to login page
    window.location.href = 'login.html';
  });
  
  // Simulate user login
  document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Simulate login logic
    // Transition to plans page
    window.location.href = 'plans.html';
  });
  
  // Simulate plan selection
  document.querySelectorAll('.plan').forEach(function (plan) {
    plan.addEventListener('click', function () {
      // Simulate plan selection logic
      // Transition to payment page
      window.location.href = 'paymentpage.html';
    });
  });
  // Handle user registration
document.getElementById('registerBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Send registration data to the server
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    if (response.ok) {
      alert('Registration successful! Please log in.');
    } else {
      alert('Registration failed. Please try again.');
    }
  });
  
  // Handle user login
  document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Send login data to the server
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    if (response.ok) {
      alert('Login successful! Redirecting to plans page.');
      window.location.href = '/plans.html';
    } else {
      alert('Login failed. Please check your credentials.');
    }
  });
  
  // Fetch and display available plans
  async function fetchPlans() {
    const response = await fetch('/plans');
    const plans = await response.json();
    
    // Display plans in your HTML
  }
  
  // Handle plan selection and payment
  document.getElementById('subscribeBtn').addEventListener('click', async () => {
    const selectedPlan = document.querySelector('input[name="plan"]:checked').value;
    
    // Create subscription on the server
    const response = await fetch('/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ plan: selectedPlan })
    });
  
    if (response.ok) {
      alert('Subscription created successfully!');
      // Update UI to show selected plan details
    } else {
      alert('Subscription creation failed. Please try again.');
    }
  });
  
  // Handle subscription cancellation
  document.getElementById('cancelBtn').addEventListener('click', async () => {
    // Cancel subscription on the server
    const response = await fetch('/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      alert('Subscription cancelled successfully!');
      // Update UI to show cancelled state
    } else {
      alert('Subscription cancellation failed. Please try again.');
    }
  });
  
  // Call fetchPlans() to populate the plans on the plans.html page
  fetchPlans();
// Create a Stripe instance with your publishable key
const stripe = stripe('pk_test_51Ndt2WSDywHh5RIObqPh4mG6GKZnc6d4sHfpzh5nMrryy8gVkKTSm9p9IQ6zacGYKQn4LFW2qxff0ULUfzdb3U6t00uXMdmq3c');

// Handle payment button click
document.getElementById('payBtn').addEventListener('click', async () => {
  // Create a payment intent on the server and get a client secret
  const response = await fetch('/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  // Use Stripe.js to handle the payment
  const result = await stripe.confirmCardPayment(data.clientSecret, {
    payment_method: {
      card: elements.getElement('cardNumber'),
      billing_details: {
        name: 'John Doe'
      }
    }
  });

  if (result.error) {
    alert('Payment failed. Please try again.');
  } else {
    alert('Payment successful! Your subscription is active.');
    // Redirect to a confirmation page
  }
});
  