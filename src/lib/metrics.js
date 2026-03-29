import { track } from '@vercel/analytics';

const normalizeValue = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'unknown';

const withContext = (payload = {}) => ({
  ...payload,
  path: typeof window !== 'undefined' ? window.location.pathname : '/',
});

export const metricValue = normalizeValue;

export const trackEvent = (eventName, payload = {}) => {
  try {
    track(eventName, withContext(payload));
  } catch (_error) {
    // Ignore tracking failures to avoid blocking UI flows.
  }
};

export const trackWebVital = (metric) => {
  if (!metric) return;
  trackEvent('web_vital', {
    name: metric.name,
    rating: metric.rating,
    value: Number(metric.value?.toFixed?.(2) ?? metric.value ?? 0),
    delta: Number(metric.delta?.toFixed?.(2) ?? metric.delta ?? 0),
  });
};

