isLocal = /localhost/.test location.host

module.exports =
    baseUrl: location.protocol + '//' + location.host
    isLocal: isLocal
    isRemote: not isLocal
