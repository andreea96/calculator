describe('Ecosia.org Demo', function() {

    before(browser => browser.navigateTo('file:///C:/Users/Andreea/OneDrive/Documents/dad%20projects/calculator/bar_lenghts.html'));
    const profile1 = {
        noPieces: 5,
        code: 'cod profil 1',
        leftAngle: 135,
        rightAngle: 90,
        length: 900,
        color: 'anodizat',
        material: 'simax_aripa_cercevea.dxf',
    };
    const profile2 = {
        noPieces: 9,
        code: 'cod profil 2',
        leftAngle: 90,
        rightAngle: 90,
        length: 1000,
        color: 'anodizat',
        material: 'simax_aripa_cercevea.dxf',
    };
    const profile3 = {
        noPieces: 1,
        code: 'cod profil 3',
        leftAngle: 90,
        rightAngle: 135,
        length: 5000,
        color: 'anodizat',
        material: 'simax_aripa_cercevea.dxf',
    };

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
            .sendKeys('#custom_pieces', profile1.noPieces)
            // .waitUntil(()=>false, 6000)
            .setValue('#custom_code', profile1.code)
            .click('select#custom_left')
            .click(`select#custom_left option[value="${profile1.leftAngle}"]`)
            .setValue('#custom_dimension', profile1.length)
            .updateValue('input[name=mat]', ['simax_aripa_cercevea.dxf', browser.keys.ENTER])
            //expected defaults + filled values
            .assert.valueContains('#custom_height', 100)
            .assert.valueContains('#custom_width', 50)
            .assert.valueContains('#custom_color', 'anodizat')
            .assert.valueContains('#custom_pieces', 5)
            //add piece
            .click('button[name=add_custom_pieces]')
            //expected new fields
            .assert.valueContains('input[class=profile_code_1]', 'cod profil')
            .assert.valueContains('input[class=profile_color_1]', 'anodizat')
            .assert.valueContains('input[class=profile_height_1]', 100)
            .assert.valueContains('input[class=profile_width_1]', 50)
            .assert.valueContains('input[class="profile_mat_1 profile_mat"]', 'simax_aripa_cercevea.dxf')
            .assert.valueContains('input[class=no_input__1]', 5)
            .assert.valueContains('#profileTypeLeft1', 135)
            .assert.valueContains('#profileTypeRight1', 90)
            .assert.valueContains('input[class=length_input__1]', 900)
        ;
    });

    test('optimal cutting', function(browser) {
        //profile 2 cut
        browser
            .click('#custom_pieces').sendKeys('#custom_pieces', profile2.noPieces)
            .setValue('#custom_code', profile2.code)
            .click(`select#custom_left option[value="${profile2.leftAngle}"]`)
            .click(`select#custom_right option[value="${profile2.rightAngle}"]`)
            .setValue('#custom_dimension', profile2.length)
            .click('button[name=add_custom_pieces]');
        //profile 3 cut
        browser
            .click('#custom_pieces').sendKeys('#custom_pieces', profile3.noPieces)
            .setValue('#custom_code', profile3.code)
            .click(`select#custom_right option[value="${profile3.rightAngle}"]`)
            .setValue('#custom_dimension', profile3.length)
            .click('button[name=add_custom_pieces]');
            //set raw cutting bar
        browser
            .setValue('input[class=bar_length]', 9000)
            .click("button#custom_result_calculate")
        //assertions - 1st bar
            .assert.textContains("b#bars_no_result", 3)
            .assert.textContains('div#results > ul > li', `1 bucata de 5000 mm | 90 ---- 135 | cod profil 3`)
            .assert.textContains('#results > ul > li:nth-of-type(2)', '3 bucati de 1000 mm | 90 ---- 90 | cod profil 2')
            .assert.textContains('#results > ul > li:nth-of-type(3)', '1 bucata de 900 mm | 135 ---- 90 | cod profil 1')
        //assertions - 2nd bar
            .assert.textContains('div#results > ul:nth-of-type(2) > li', `6 bucati de 1000 mm | 90 ---- 90 | cod profil 2`)
            .assert.textContains('#results > ul:nth-of-type(2) > li:nth-of-type(2)', '3 bucati de 900 mm | 135 ---- 90 | cod profil 1')
        //assertions - 3rd bar
            .assert.textContains('div#results > ul:nth-of-type(3) > li', `1 bucata de 900 mm | 135 ---- 90 | cod profil 1`)
    });


    after(browser => browser.end());
});
