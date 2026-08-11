import { Metadata } from 'next';
import { APP_CONSTANTS } from '@/constants';

/**
 * Root Next.js Application Metadata Configuration.
 */
export const appMetadata: Metadata = {
  title: APP_CONSTANTS.METADATA.TITLE,
  description: APP_CONSTANTS.METADATA.DESCRIPTION,
};
