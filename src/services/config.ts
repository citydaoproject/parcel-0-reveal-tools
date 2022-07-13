import dotenv from 'dotenv';

dotenv.config();

export const moralisServerUrl = process.env.MORALIS_SERVER_URL || '';
export const moralisApplicationId = process.env.MORALIS_APP_ID || '';

export const prettyJSONFiles = (process.env.PRETTY_JSON_FILES || 'false').toLowerCase() === 'true';
