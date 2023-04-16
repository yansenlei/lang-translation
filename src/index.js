const HttpsProxyAgent = require('https-proxy-agent');
const { translate } = require('@vitalets/google-translate-api');


let translatedCount = 0;
let totalCount = 0;

function countTotalKeys(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      countTotalKeys(obj[key]);
    } else {
      totalCount++;
    }
  }
}

/**
 * translate messages
 * 
 * @param {*} messages 
 * @param {*} options 
 * @returns 
 */
async function translateMessages({ messages, options, onProcess }) {
  countTotalKeys(messages);
  const translatedMessages = {};
  for (const key in messages) {
    if (typeof messages[key] === 'object') {
      translatedMessages[key] = await translateMessages({
        messages: messages[key],
        options,
        onProcess
      });
    } else {
      const fetchOptions = options.proxy ? { agent: new HttpsProxyAgent(options.proxy) } : undefined;
      try {
        const res = await translate(messages[key], { from: options.sourceLang, to: options.targetLang, fetchOptions });
        translatedMessages[key] = res.text;
      } catch (error) {
        console.error(error);
        throw error
      }
      
      translatedCount++;
      onProcess && onProcess({ translatedCount, totalCount, key });
      await sleep(options.delay); // 等待毫秒
    }
  }

  return translatedMessages;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// CommonJS module export
module.exports = translateMessages;

// ES module export
// export default translateMessages;
