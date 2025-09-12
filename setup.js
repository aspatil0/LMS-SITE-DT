const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up My LMS...\n');

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  const envContent = `NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/my-lms
JWT_SECRET=your-super-secret-jwt-key-here-please-change-this
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file with default values');
  console.log('⚠️  Please update the .env file with your actual values');
}

// Create client/.env file if it doesn't exist
const clientEnvPath = path.join(__dirname, 'client', '.env');
if (!fs.existsSync(clientEnvPath)) {
  const clientEnvContent = `REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here`;

  fs.writeFileSync(clientEnvPath, clientEnvContent);
  console.log('✅ Created client/.env file');
}

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Update the .env files with your actual values');
console.log('2. Make sure MongoDB is running');
console.log('3. Install dependencies: npm run install-all');
console.log('4. Start the development server: npm run dev');
console.log('\nHappy coding! 🚀');
