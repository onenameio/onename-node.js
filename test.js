'use strict'

var index = require('./index'),
    OnenameClient = index.OnenameClient,
    test = require('tape'),
    hasprop = require('hasprop')

var onenameAppID = process.env.ONENAME_APP_ID,
    onenameAppSecret = process.env.ONENAME_APP_SECRET,
    onenameClient = new OnenameClient(onenameAppID, onenameAppSecret)

test('testGetUsers', function(t) {
    t.plan(3)

    var usernames = ['fredwilson'],
        referenceName = 'Fred Wilson'

    onenameClient.getUsers(usernames, function(err, users) {
        t.ok(users)

        var profile = null,
            name = null
        if (hasprop(users, usernames[0] + '.profile')) {
            profile = users[usernames[0]].profile
        }
        if (hasprop(profile, 'name.formatted')) {
            name = profile.name.formatted
        }

        t.ok(profile)
        t.equal(name, referenceName)
    })

})

test('testGetDKIMInfo', function(t) {
    t.plan(3)

    var domain = 'onename.com',
        samplePublicKey = '027d28f9951ce46538951e3697c62588a87f1f1f295de4a14fdd4c780fc52cfe69'

    onenameClient.getDKIMInfo(domain, function(err, data) {
        t.ok(data)

        var publicKey = null
        if (hasprop(data, 'public_key')) {
            publicKey = data.public_key
        }
        t.ok(publicKey)
        t.equal(publicKey, samplePublicKey)
    })
})
