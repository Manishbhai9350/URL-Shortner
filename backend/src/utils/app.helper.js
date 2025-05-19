




export const GetRedirectUrl = ({ slug }) => {
  const serverUrl = process.env.SERVER_URL;

  // Ensure SERVER_URL exists in .env
  if (!serverUrl) {
    throw new Error('SERVER_URL is not defined in environment variables.');
  }

  // Validate the slug (basic check for empty or malformed strings)
  if (!slug || typeof slug !== 'string' || slug.trim() === '') {
    throw new Error('Invalid slug provided.');
  }

  // Ensure the server URL ends with a slash and concatenate the slug properly
  const normalizedServerUrl = serverUrl.endsWith('/')
    ? serverUrl
    : `${serverUrl}/`;

  const finalUrl = `${normalizedServerUrl}${slug}`;

  // Validate the final URL structure (check if it's a valid URL)
  try {
    new URL(finalUrl); // Throws an error if it's not a valid URL
  } catch (e) {
    throw new Error('The final URL is malformed.');
  }

  return finalUrl;
};


export  const NormalizeToHttps = (url) => {
  if (typeof url !== 'string' || url.trim() === '') {
    throw new Error('Invalid URL input.');
  }

  let normalizedUrl = url.trim();

  // If URL doesn't have a protocol, assume https
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  try {
    const parsed = new URL(normalizedUrl);
    parsed.protocol = 'https:'; // Force HTTPS
    return parsed.toString();
  } catch (err) {
    throw new Error('Malformed URL');
  }
};
