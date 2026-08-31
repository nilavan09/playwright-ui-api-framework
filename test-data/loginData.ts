/**
 * Login Test Data Module
 * 
 * Centralized test data for authentication scenarios.
 * Credentials are loaded from environment variables for security.
 * 
 * Usage: Import loginData and use loginData.validUser for test scenarios.
 */

export const loginData = {

    // Valid user credentials loaded from environment variables.
    validUser: {

        // Email address of the test user.
        email: process.env.EMAIL!,

        // Password of the test user.
        password: process.env.PASSWORD!

    }

};