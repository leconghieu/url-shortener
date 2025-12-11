# URL Shortener Service (AWS Serverless / Terraform / Typescript)

A simple URL shortener built with Typescript, Terraform, AWS.

## Tech Stack
- **TypeScript**
- **AWS Lambda**
- **API Gateway**
- **DynamoDB**
- **Terraform (IaC)**

## Features
- Shorten long URLs to short unique codes
- Automatic redirection using `GET /{code}`
- Infrastructure as Code with **Terraform**
- Fully serverless, highly scalable & low-cost
- Built with **Node.js + TypeScript**

## Prerequisite
- Nodejs
- NPM
- Terraform
- AWS account
- AWS CLI **and credentials configured**


> Terraform requires valid AWS credentials.  
> Run `aws configure` or export environment variables before running any Terraform commands.

## Installation & Deployment 
Clone the repo
> git clone https://github.com/leconghieu/url-shortener.git

Install dependencies
> npm install

Build and zip lambda functions
> npm run build

Deploy
```bash
npm tf:init
npm tf:plan
npm tf:apply
```

## How to test
> 💡 If you don’t want to deploy the infrastructure, you can test using the example `api_endpoint` below.

After successfully running `npm tf:apply`, the api endpoint would be shown as below:
![plot](./images/api_endpoint.png)

Then you can use Postman to send a POST request like this to the endpoint `https://<api_key>.execute-api.eu-central-1.amazonaws.com/shorten` and get this reponse.
![plot](./images/postman_result.png)

You can now access the `short_url`, It will automatically redirect to the real `url` you created above.

API endpoint: https://9x1xu4ptka.execute-api.eu-central-1.amazonaws.com/shorten
