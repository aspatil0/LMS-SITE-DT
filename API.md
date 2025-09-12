# API Documentation

This document provides comprehensive information about the My LMS API endpoints.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📚 Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student" // or "teacher"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Get Current User
```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "enrolledCourses": [],
    "createdCourses": []
  }
}
```

## 📖 Course Endpoints

### Get All Courses
```http
GET /courses
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `level` (optional): Filter by level
- `search` (optional): Search term
- `sortBy` (optional): Sort field (default: createdAt)
- `sortOrder` (optional): Sort order (asc/desc, default: desc)

**Response:**
```json
{
  "success": true,
  "courses": [
    {
      "_id": "course-id",
      "title": "React Fundamentals",
      "description": "Learn React from scratch",
      "price": 99.99,
      "category": "Web Development",
      "level": "Beginner",
      "thumbnail": "thumbnail-url",
      "instructor": {
        "name": "Jane Smith",
        "avatar": "avatar-url"
      },
      "rating": {
        "average": 4.5,
        "count": 120
      },
      "totalStudents": 500,
      "totalLessons": 25
    }
  ],
  "pagination": {
    "current": 1,
    "pages": 5,
    "total": 50
  }
}
```

### Get Single Course
```http
GET /courses/:id
```

**Response:**
```json
{
  "success": true,
  "course": {
    "_id": "course-id",
    "title": "React Fundamentals",
    "description": "Learn React from scratch",
    "shortDescription": "Complete React course",
    "price": 99.99,
    "category": "Web Development",
    "level": "Beginner",
    "thumbnail": "thumbnail-url",
    "instructor": {
      "name": "Jane Smith",
      "avatar": "avatar-url",
      "bio": "Expert React developer"
    },
    "lessons": [
      {
        "_id": "lesson-id",
        "title": "Introduction to React",
        "order": 1,
        "type": "video",
        "isFree": true,
        "duration": 1200
      }
    ],
    "reviews": [
      {
        "user": {
          "name": "Student Name",
          "avatar": "avatar-url"
        },
        "rating": 5,
        "comment": "Great course!",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "whatYouWillLearn": [
      "React fundamentals",
      "Component lifecycle",
      "State management"
    ],
    "requirements": [
      "Basic JavaScript knowledge",
      "HTML/CSS understanding"
    ],
    "tags": ["react", "javascript", "frontend"]
  }
}
```

### Create Course (Teacher Only)
```http
POST /courses
```

**Headers:**
```
Authorization: Bearer <teacher-token>
```

**Request Body:**
```json
{
  "title": "New Course",
  "description": "Course description",
  "shortDescription": "Short description",
  "category": "Web Development",
  "level": "Beginner",
  "price": 99.99,
  "whatYouWillLearn": [
    "Learn this",
    "Learn that"
  ],
  "requirements": [
    "Requirement 1",
    "Requirement 2"
  ],
  "tags": ["tag1", "tag2"]
}
```

**Response:**
```json
{
  "success": true,
  "course": {
    "_id": "course-id",
    "title": "New Course",
    "description": "Course description",
    "instructor": "teacher-id",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Course (Teacher Only)
```http
PUT /courses/:id
```

**Headers:**
```
Authorization: Bearer <teacher-token>
```

**Request Body:** Same as create course

### Delete Course (Teacher Only)
```http
DELETE /courses/:id
```

**Headers:**
```
Authorization: Bearer <teacher-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

### Enroll in Course (Student Only)
```http
POST /courses/:id/enroll
```

**Headers:**
```
Authorization: Bearer <student-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Enrolled in course successfully",
  "enrollment": {
    "_id": "enrollment-id",
    "student": "student-id",
    "course": "course-id",
    "enrolledAt": "2024-01-01T00:00:00.000Z",
    "progress": 0
  }
}
```

## 💳 Payment Endpoints

### Create Payment Intent
```http
POST /payments/create-payment-intent
```

**Headers:**
```
Authorization: Bearer <student-token>
```

**Request Body:**
```json
{
  "courseId": "course-id"
}
```

**Response:**
```json
{
  "success": true,
  "clientSecret": "pi_xxx_secret_xxx",
  "amount": 99.99
}
```

### Confirm Payment
```http
POST /payments/confirm-payment
```

**Headers:**
```
Authorization: Bearer <student-token>
```

**Request Body:**
```json
{
  "paymentIntentId": "pi_xxx",
  "courseId": "course-id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment successful! You are now enrolled in the course.",
  "enrollment": {
    "_id": "enrollment-id",
    "student": "student-id",
    "course": "course-id",
    "payment": {
      "amount": 99.99,
      "currency": "usd",
      "status": "completed"
    }
  }
}
```

## 👤 User Endpoints

### Get Student Dashboard
```http
GET /users/student/dashboard
```

**Headers:**
```
Authorization: Bearer <student-token>
```

**Response:**
```json
{
  "success": true,
  "dashboard": {
    "totalEnrolled": 5,
    "completedCourses": 2,
    "inProgressCourses": 2,
    "newCourses": 1,
    "enrollments": [
      {
        "_id": "enrollment-id",
        "course": {
          "_id": "course-id",
          "title": "React Fundamentals",
          "thumbnail": "thumbnail-url",
          "price": 99.99,
          "instructor": {
            "name": "Jane Smith",
            "avatar": "avatar-url"
          },
          "totalLessons": 25
        },
        "progress": 60,
        "enrolledAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### Get Teacher Dashboard
```http
GET /users/teacher/dashboard
```

**Headers:**
```
Authorization: Bearer <teacher-token>
```

**Response:**
```json
{
  "success": true,
  "dashboard": {
    "totalCourses": 3,
    "publishedCourses": 2,
    "draftCourses": 1,
    "totalStudents": 150,
    "totalEarnings": 15000,
    "courses": [
      {
        "_id": "course-id",
        "title": "React Fundamentals",
        "thumbnail": "thumbnail-url",
        "price": 99.99,
        "totalStudents": 100,
        "isPublished": true
      }
    ],
    "recentEnrollments": [
      {
        "_id": "enrollment-id",
        "student": {
          "name": "Student Name",
          "email": "student@example.com"
        },
        "course": {
          "title": "React Fundamentals"
        },
        "payment": {
          "amount": 99.99
        },
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### Get User Certificates
```http
GET /users/certificates
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "certificates": [
    {
      "_id": "certificate-id",
      "course": {
        "title": "React Fundamentals",
        "thumbnail": "thumbnail-url",
        "instructor": {
          "name": "Jane Smith"
        }
      },
      "certificateNumber": "CERT-1234567890-ABC123",
      "issuedAt": "2024-01-01T00:00:00.000Z",
      "certificateUrl": "certificate-pdf-url",
      "verificationCode": "verify-code-123"
    }
  ]
}
```

### Verify Certificate
```http
GET /users/certificates/:verificationCode
```

**Response:**
```json
{
  "success": true,
  "certificate": {
    "certificateNumber": "CERT-1234567890-ABC123",
    "studentName": "John Doe",
    "courseName": "React Fundamentals",
    "instructorName": "Jane Smith",
    "issuedAt": "2024-01-01T00:00:00.000Z",
    "verificationCode": "verify-code-123",
    "isVerified": true
  }
}
```

## 📊 Error Responses

All endpoints may return error responses in the following format:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🔒 Rate Limiting

API endpoints are rate limited to 100 requests per 15 minutes per IP address.

## 📝 Notes

- All timestamps are in ISO 8601 format
- File uploads are limited to 100MB
- JWT tokens expire after 7 days
- All monetary values are in USD
- Image URLs are relative paths that need to be prefixed with your domain

---

**API Version: 1.0.0**
