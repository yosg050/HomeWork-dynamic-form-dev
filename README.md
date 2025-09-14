# Dynamic Form Generation – Homework (Peach)

This project is an implementation of **Dynamic Form System** as part of a homework assignment.

## Overview
The application dynamically generates form fields from a JSON schema.

It includes **Frontend (React + Material UI)** and **Backend (Node.js, AWS Serverless Ready)** components.

Key Features:

1. **Dynamic Form Generation**
- Form fields are generated based on JSON schema.
- Support for `text`, `email`, `password`, `date`, `number` and `droplist` fields.
- Design with **React + Material UI**.

2. **Validation**
- Each field is validated according to its type.
- Use of an external validation library on both the client and server.

3. **Form Submission**
- Data is sent to the backend API (`Node.js`).

- Submissions are saved in a database (**AWS DynamoDB** in this project).

4. **View Submissions**
- A list of previous submissions is displayed next to the form.

5. **Reset Form**
- Automatic reset after submission.

- Manual "reset" button included.

6. **Backend Extensions**
- Prevents duplicate submissions.

- Provides `/analytics` endpoint with:
- Total number of submissions
- Breakdown by gender
- Average age
- Graph of submissions by days
-Last submission

## Tech Stack
- **Frontend:** React, Material UI
- **Backend:** Node.js (Express), AWS Lambda ready

# AWS DynamoDB configuration
DYNAMO_TABLE=Submissions
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key

## Running Locally

### Prerequisites
- Node.js >= 18

### Clone the repository
```bash
git clone https://github.com/yosg050/HomeWork-dynamic-form-dev.git
cd HomeWork-dynamic-form-dev

# Frontend
cd front
npm install
npm run dev

# Backend
cd back
npm install
npm start

PORT=4000
DYNAMODB_TABLE=DynamicFormTable
AWS_REGION=us-east-1

- **Database:** AWS DynamoDB


