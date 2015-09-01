'use strict'

var index = require('./index'),
    OnenameClient = index.OnenameClient,
    test = require('tape'),
    hasprop = require('hasprop')

var onenameAppID = process.env.ONENAME_APP_ID,
    onenameAppSecret = process.env.ONENAME_APP_SECRET,
    onenameClient = new OnenameClient(onenameAppID, onenameAppSecret)

test('testGetUsers', function(t) {
    t.plan(2)

    var usernames = ['albertwenger']

    onenameClient.getUsers(usernames, function(err, users) {
        t.ok(users)

        var profile = null
        if (hasprop(users, usernames[0] + '.profile')) {
            profile = users[usernames[0]].profile
        }
        t.ok(profile)
    })

})

test('testGetDKIMInfo', function(t) {
    t.plan(2)

    var domain = 'onename.com'

    onenameClient.getDKIMInfo(domain, function(err, data) {
        t.ok(data)

        var publicKey = null
        if (hasprop(data, 'public_key')) {
            publicKey = data.public_key
        }
        t.ok(publicKey)
    })
})
