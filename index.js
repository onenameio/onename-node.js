'use strict'

var request = require('request'),
    hasprop = require('hasprop')

function OnenameClient(appID, appSecret) {
    this.appID = appID
    this.appSecret = appSecret
    this.baseURL = 'https://api.onename.com/v1'
}

OnenameClient.prototype.authHeader = function() {
    var credentialsBuffer = new Buffer(this.appID + ':' + this.appSecret),
        authorizationHeader = 'Basic ' + credentialsBuffer.toString('base64')
    return authorizationHeader
}

OnenameClient.prototype.getRequest = function(url, callback) {
    request({
        url: url,
        headers: {'Authorization': this.authHeader()}
    }, function(error, response, body) {
        if (error) {
            callback(error)
        } else if (response.statusCode !== 200) {
            body = JSON.parse(body)
            if (hasprop(body, 'error')) {
                callback(body.error)
            } else {
                callback('unknown error with status code: ' + response.statusCode)
            }
        } else {
            body = JSON.parse(body)
            callback(null, body)
        }
    })
}

OnenameClient.prototype.postRequest = function(url, payload, callback) {
    request({
        url: url,
        method: 'POST',
        json: payload,
        headers: {'Authorization': this.authHeader()}
    }, function(error, response, body) {
        if (error) {
            callback(error)
        } else if (response.statusCode !== 200) {
            body = JSON.parse(body)
            if (hasprop(body, 'error')) {
                callback(body.error)
            } else {
                callback('unknown error with status code: ' + response.statusCode)
            }
        } else {
            body = JSON.parse(body)
            callback(null, body)
        }
    })
}

OnenameClient.prototype.getUsers = function(usernames, callback) {
    var url = this.baseURL + '/users/' + usernames.join(',')
    this.getRequest(url, callback)
}

OnenameClient.prototype.searchUsers = function(query, callback) {
    var url = this.baseURL + '/search?query=' + query
    this.getRequest(url, payload, callback)
}

OnenameClient.prototype.getAllUsers = function(callback) {
    var url = this.baseURL + '/users'
    this.getRequest(url, callback)
}

OnenameClient.prototype.registerUser = function(username, recipientAddress, callback) {
    var url = this.baseURL + '/users',
        payload = {passname: username, recipient_address: recipientAddress}
    this.postRequest(url, payload, callback)
}

OnenameClient.prototype.getUnspents = function(address, callback) {
    var url = this.baseURL + '/addresses/' + address + '/unspents'
    this.getRequest(url, callback)
}

OnenameClient.prototype.getNamesOwned = function(address, callback) {
    var url = this.baseURL + '/addresses/' + address + '/names'
    this.getRequest(url, callback)
}

OnenameClient.prototype.broadcastTransaction = function(signedHex, callback) {
    var url = this.baseURL + '/transactions',
        payload = {signed_hex: signedHex}
    this.postRequest(url, payload, callback)
}

OnenameClient.prototype.getDKIMInfo = function(domain, callback) {
    var url = this.baseURL + '/domains/' + domain + '/dkim'
    this.getRequest(url, callback)
}

OnenameClient.prototype.getUserStats = function(callback) {
    var url = this.baseURL + '/stats/users'
    this.getRequest(url, callback)
}

module.exports = {
    OnenameClient: OnenameClient
}
