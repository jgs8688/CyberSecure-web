import axios from 'axios';

export const detectPhishingPages = async (url) => {
  try {
    const { data } = await axios.get(url);
    const suspicious = /login|password|credit/i.test(data);
    return { found: suspicious };
  } catch (err) {
    return { error: 'Error scanning for phishing pages', details: err.message };
  }
};
