import axios from 'axios';
import * as  cheerio from 'cheerio';

export const detectHiddenScripts = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const hiddenScripts = [];

    $('script').each((_, el) => {
      const content = $(el).html();
      if (content && /eval|document\.write|setTimeout|setInterval/.test(content)) {
        hiddenScripts.push(content.slice(0, 100)); // preview
      }
    });

    return { found: hiddenScripts.length > 0, samples: hiddenScripts };
  } catch (err) {
    return { error: 'Error detecting hidden scripts', details: err.message };
  }
};
