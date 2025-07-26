import { auth } from "@/auth";
import {
    ListObjectsCommand,
    S3Client
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

export const fetchObjectList = async ({ prefix, delimiter }: { prefix: string, delimiter?: string }) => {
    console.debug("START - Feching s3 object list ", prefix, delimiter);
    const session = await auth()
    if (!session?.user?.id_token) return null;

    const credentials = fromCognitoIdentityPool({
        clientConfig: { region: process.env.AWS_IDENTITY_POOL_REGION },
        identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
        logins: {
            [process.env.AUTH_COGNITO_ISSUER]: session.user.id_token
        },
    })

    try {
        const client = new S3Client({ region: process.env.S3_REGION, credentials: credentials });
        const command = new ListObjectsCommand({ Bucket: process.env.S3_BUCKET_NAME, Prefix: prefix, Delimiter: delimiter });
        const data = await client.send(command)
        console.debug("END - Feching s3 object list ", prefix, delimiter, " with data: ", data.Contents || []);
        return data.Contents || [];
    }
    catch (error) {
        console.error('Coudnt fetch s3 data', error);
        throw error;
    }
}