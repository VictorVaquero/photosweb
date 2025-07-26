declare namespace NodeJS {
    interface ProcessEnv {
        AUTH_SECRET: string,
        AUTH_COGNITO_ID: string,
        AUTH_COGNITO_SECRET: string,
        AUTH_COGNITO_ISSUER: string,
        AWS_IDENTITY_POOL_ID: string,
        AWS_IDENTITY_POOL_REGION: string,
        S3_REGION: string,
        S3_BUCKET_NAME: string,
    }
}