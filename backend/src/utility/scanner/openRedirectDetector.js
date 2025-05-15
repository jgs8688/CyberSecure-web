import axios from 'axios';

export const detectOpenRedirects = async (url) => {
  try {
    const { data } = await axios.get(url);
    const hasRedirects = /(http|https):\/\/[^\"']+/g.test(data);
    return { found: hasRedirects };
  } catch (err) {
    return { error: 'Error detecting open redirects', details: err.message };
  }
};
