#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const translateMessages = require('./index.js');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .option('sourceLang', {
    alias: 's',
    type: 'string',
    default: 'zh-CN',
    description: 'Source language',
  })
  .option('targetLang', {
    alias: 't',
    type: 'string',
    default: 'en',
    description: 'Target language',
  })
  .option('messagesPath', {
    alias: 'm',
    type: 'string',
    default: path.join(__dirname, 'locales', 'zh.json'),
    description: 'Messages file path',
  })
  .option('proxy', {
    alias: 'p',
    type: 'string',
    description: 'Proxy server address (including port)',
  })
  .option('delay', {
    alias: 'd',
    type: 'number',
    default: 500,
    description: 'Delay between translation requests (in milliseconds), as frequent requests will be IP-limited',
  })
  .example('$0 -s zh-CN -t en', 'Translate Chinese content in messages.json into English')
  .example('$0 -s zh-CN -t ja -m ./src/locales/messages.json', 'Translate Chinese content in messages.json into Japanese')
  .example('$0 -s zh-CN -t fr -p http://proxy.example.com:8080', 'Translate Chinese content in messages.json into French through a proxy server')
  .epilogue('Supported language list: https://cloud.google.com/translate/docs/languages')
  .alias('h', 'help')
  .help()
  .argv;

if (process.argv.length <= 2){
  console.log("Usage: --help")
  process.exit();
}

const messagesPath = path.resolve(argv.messagesPath);
const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));


async function main() {
  const translatedMessages = await translateMessages({
    messages,
    options: {
      ...argv
    },
    onProcess: ({ translatedCount, totalCount }) => {
      process.stdout.write(`\rTranslation progress: ${translatedCount}/${totalCount} (${((translatedCount / totalCount) * 100).toFixed(2)}%)`);
    }
  });
  const jsonFile = `${argv.targetLang}.json`
  const outputPath = path.join(path.dirname(messagesPath), jsonFile);
  fs.writeFileSync(outputPath, JSON.stringify(translatedMessages, null, 2), 'utf-8');
  console.log(`Generated ${jsonFile} file successfully!`);
}

main();

