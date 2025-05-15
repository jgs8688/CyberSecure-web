import axios from 'axios';

export const checkSecurityHeaders = async (url) => {
  try {
    const response = await axios.get(url);
    const headers = response.headers;
    const requiredHeaders = ['content-security-policy', 'strict-transport-security', 'x-frame-options'];
    const missing = requiredHeaders.filter(h => !headers[h]);
    return { found: missing.length > 0, missing };
  } catch (err) {
    return { error: 'Error checking headers', details: err.message };
  }
};
