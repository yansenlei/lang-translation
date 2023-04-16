const assert = require('assert');
const { execSync } = require('child_process');

const exitsFile = () => {
    // Check if the file exists
    const filePath = './test/en.json';
    assert.ok(fs.existsSync(filePath), 'File does not exist');

    // Check if the file content is correct
    const expectedContent = {
        key1: {
            hello: 'Hello'
        }
    };
    const actualContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    assert.deepEqual(actualContent, expectedContent, 'File content does not match expected');
}

describe('bin.js', () => {

  it(`should translate messages from zh-CN to en`, () => {
    // Run the script that generates the file
    execSync(`node ./src/bin.js -s zh-CN -t en -m ./test/zh.json -p ${process.env.PROXY}`);
    exitsFile()
  });

  it('should use the specified delay if one is specified', () => {
    execSync(`node ./src/bin.js -s zh-CN -t en -m ./test/zh.json`);
    exitsFile()
  });
});
