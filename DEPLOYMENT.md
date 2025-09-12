# Deployment Guide

This guide will help you deploy My LMS to various platforms.

## 🚀 Quick Start

1. **Run the setup script**
   ```bash
   npm run setup
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🌐 Production Deployment

### Backend Deployment (Heroku)

1. **Create a Heroku app**
   ```bash
   heroku create my-lms-app
   ```

2. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-atlas-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set STRIPE_SECRET_KEY=your-stripe-secret-key
   heroku config:set STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   heroku config:set STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Netlify)

1. **Build the project**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `client/build`
   - Add environment variables in Netlify dashboard

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd client
   vercel
   ```

## 🗄️ Database Setup

### MongoDB Atlas

1. **Create a MongoDB Atlas account**
2. **Create a new cluster**
3. **Get connection string**
4. **Update MONGODB_URI in environment variables**

### Local MongoDB

1. **Install MongoDB**
2. **Start MongoDB service**
3. **Use local connection string**: `mongodb://localhost:27017/my-lms`

## 💳 Payment Setup (Stripe)

1. **Create Stripe account**
2. **Get API keys from dashboard**
3. **Set up webhooks**
4. **Update environment variables**

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (client/.env)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

## 📱 Mobile Deployment

### React Native (Future Enhancement)
- Use React Native CLI
- Implement native features
- Deploy to App Store and Google Play

## 🔒 Security Considerations

1. **Use HTTPS in production**
2. **Set secure JWT secrets**
3. **Enable CORS properly**
4. **Use environment variables for secrets**
5. **Implement rate limiting**
6. **Validate all inputs**

## 📊 Monitoring

### Backend Monitoring
- Use Heroku metrics
- Implement logging with Winston
- Set up error tracking with Sentry

### Frontend Monitoring
- Use Vercel/Netlify analytics
- Implement error boundaries
- Track user interactions

## 🚀 Performance Optimization

### Backend
- Enable gzip compression
- Use Redis for caching
- Optimize database queries
- Implement CDN for static files

### Frontend
- Enable code splitting
- Optimize images
- Use lazy loading
- Implement service workers

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
```

## 📝 Troubleshooting

### Common Issues

1. **CORS errors**
   - Check FRONTEND_URL in backend
   - Verify CORS configuration

2. **Database connection issues**
   - Check MONGODB_URI
   - Verify network access

3. **Payment issues**
   - Verify Stripe keys
   - Check webhook configuration

4. **Build failures**
   - Check Node.js version
   - Clear npm cache
   - Delete node_modules and reinstall

### Support
- Check logs in deployment platform
- Use browser developer tools
- Monitor network requests
- Check environment variables

## 🎯 Next Steps

1. **Set up monitoring**
2. **Implement backups**
3. **Add SSL certificates**
4. **Configure custom domain**
5. **Set up staging environment**
6. **Implement automated testing**

---

**Happy Deploying! 🚀**
