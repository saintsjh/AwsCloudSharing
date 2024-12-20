import json
import boto3

# connecting it to s3
s3 = boto3.client('s3')
BUCKET_NAME = 'file-sharing-project-armanijesse'

def lambda_handler(event, context):
    try:
        # Directly use the event['body'] as file content
        file_content = event['body']
        file_name = event['queryStringParameters']['filename']
        s3.put_object(Bucket=BUCKET_NAME, Key=file_name, Body=file_content)
        return {
            'statusCode': 200,
            'body': json.dumps('File uploaded successfully!')
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error uploading file' + str(e))
        }