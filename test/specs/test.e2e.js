const { expect } = require('@wdio/globals');
const { browser } = require('wdio-electron-service');

describe('App', () => {
    it('should launch the application', async () => {
        const title = await browser.getTitle();
        expect(title).toEqual('electron-vue');
    });
});