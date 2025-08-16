![PentadevIX Logo](./public/logo/Logo.webp)

PentadevIX is a robust platform designed for analyzing and managing the performance and scalability of your software projects. It provides insights into bottlenecks, resource utilization, and optimization opportunities across different environments. Users can monitor projects to ensure efficient and high-performing development workflows.

## Features

- **Performance Analysis:** Identify and optimize performance bottlenecks in your project.
- **Resource Monitoring:** Track resource utilization and scalability metrics.
- **Environment Insights:** Analyze and compare performance across different environments.

## Branching Strategy

- **Test Branch:** Used for internal testing.
- **Beta Branch:** Used for client testing.
- **Development Branch:** Uses the naming convention `pentadevix-client-vX.00.00X`, where X changes based on iteration.

## Configuration

- The backend URLs and important keys/tokens are stored in the `.env` file.
- After modifying the `.env` file, export the values from `config.ts` for proper integration.
- An `.env.example` file is provided to illustrate the `.env` file structure.

## Technologies Used

- **Framework:** Next.js
- **Forms & Validation:** React Hook Form, Yup
- **UI Components:** Material UI
- **Networking:** Axios
- **State Management:** Redux Toolkit
- **Icons:** FontAwesome
- **Authentication:** Firebase Auth
- **Testing:** Cypress, Jest
- **Code Quality Monitoring:** SonarQube

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Deployment

The recommended deployment platform is **Netlify**. Refer to the [Netlify Deployment Guide](https://docs.netlify.com/) for more details.

### Deploying with Netlify CLI

1. Install Netlify CLI if you haven’t already:
   
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   
   ```bash
   netlify login
   ```

   Follow the prompts to authenticate with your Netlify account.

3. Navigate to your project directory and deploy:
   
   ```bash
   netlify deploy
   ```

   This will initialize the deployment process and prompt you with options.

4. For deploying updates to production, use:
   
   ```bash
   netlify deploy --prod
   ```

### Deploying to Development and Preview Environments

- **Development Environment:**
  
  ```bash
  netlify deploy --env development
  ```
  
  This helps in testing changes before pushing them to production.

- **Preview Deployment:**
  
  ```bash
  netlify deploy --branch preview
  ```
  
  This will deploy the branch as a preview, which can be shared and tested before going live.

### Assigning a Custom Domain

- **Add your domain to Netlify:**
  
  ```bash
  netlify domains:add yourdomain.com
  ```

- **Update your DNS settings** by following the instructions provided by Netlify.

- **Set the domain for production:**
  
  ```bash
  netlify domains:set yourdomain.com
  ```

- **Verify the domain:**
  
  ```bash
  netlify domains:inspect yourdomain.com
  ```

### Logging Out

To log out of the Netlify CLI:

```bash
netlify logout
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Firebase Documentation](https://firebase.google.com/docs) - Authentication setup.
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/) - State management.
- [Netlify Documentation](https://docs.netlify.com/) - Deployment and configuration guidance.

PentadevIX aims to provide seamless performance monitoring and optimization for modern software development workflows.