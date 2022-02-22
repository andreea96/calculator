describe('Ecosia.org Demo', function() {

    before(browser => browser.navigateTo('file:///C:/Users/Andreea/OneDrive/Documents/dad%20projects/calculator/bar_lenghts.html'));

    test('W and H autocompletes on materials', function(browser) {
        // Toc Single VISION 2019.dxf
        browser
            .waitForElementVisible('body')
            .setValue('input[name=mat]', 'Toc Single VISION 2019.dxf')
            .mouseButtonClick()
            .assert.valueContains('#custom_height', 55.2)
            .assert.valueContains('#custom_width', 50);

        // Toc 2 Vision 2019.dxf
        browser
            .updateValue('input[name=mat]', ['Toc 2 Vision 2019.dxf', browser.keys.ENTER])
            .mouseButtonClick()
            .assert.valueContains('#custom_height', 100)
            .assert.valueContains('#custom_width', 50);

    });

    test('Custom profiles added', function(browser) {
        browser
            .click('#custom_pieces')
            .sendKeys('#custom_pieces', 5)
            // .waitUntil(()=>false, 6000)
            .setValue('#custom_code', 'cod profil')
            .click('select#custom_left')
            .click('select#custom_left option[value="135"]')
            .setValue('#custom_dimension', 900)
            .updateValue('input[name=mat]', ['simax_aripa_cercevea.dxf', browser.keys.ENTER])
            //expected defaults + filled values
            .assert.valueContains('#custom_height', 100)
            .assert.valueContains('#custom_width', 50)
            .assert.valueContains('#custom_color', 'anodizat')
            .assert.valueContains('#custom_pieces', 5)
            .click('button[name=add_custom_pieces]')
        ;
    });


        after(browser => browser.end());
});
