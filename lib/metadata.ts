import type { Metadata } from 'next';

export const SITE_NAME = 'ApplyTrack';
export const SITE_DESCRIPTION =
  'Track your job applications, statuses, and follow-up notes all in one place.';

export const OG_IMAGE = {
  url: '/nav-logo.webp',
  width: 1200,
  height: 630,
  alt: 'ApplyTrack — job application tracker',
};

export function createPageMetadata(
  title: string,
  description: string,
  noIndex = false,
): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
