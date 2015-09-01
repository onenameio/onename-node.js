# onename-node

Node.JS client for Onename's API

### Installation 

```
$ npm install onename-api
```

### Setting up the API Client

```js
var onenameAPI = require('onename-api'),
    OnenameClient = onenameAPI.OnenameClient

onenameClient = new OnenameClient(process.env.ONENAME_APP_ID, process.env.ONENAME_APP_SECRET)
```

### API Calls

```js
onenameClient.getUsers(['fredwilson', 'naval'], function(err, data) {
})
```

```js
onenameClient.searchUsers('wenger', function(err, data) {
})
```

```js
registrationPayload = {'passname': 'fredwilson', 'recipient_address': 'N6zdUCKq1gJaps76gagBbC5Vc6xBxMdvHc'}
onenameClient.registerUser(registrationPayload, function(err, data) {
})
```

```js
onenameClient.getAllUsers(function(err, data) {
})
```

```js
var payload = {signed_hex: '00710000015e98119922f0b'}
onenameClient.broadcastTransaction(payload, function(err, data) {
})
```

```js
onenameClient.getUnspents('N8PcBQnL4oMuM6aLsQow6iG59yks1AtQX4', function(err, data) {
})
```

```js
onenameClient.getNames('N8PcBQnL4oMuM6aLsQow6iG59yks1AtQX4', function(err, data) {
})
```

```js
onenameClient.getDKIMInfo('onename.com', function(err, data) {
})
```

```js
onenameClient.getUserStats(function(err, data) {
})
```