module.exports = (Vue, options)->
    Vue.filter 'bytes', (bytes, precision)->
        if isNaN(parseFloat(bytes)) or not isFinite bytes
            return '-'
        if not precision?
            precision = 1
        units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB']
        number = Math.floor (Math.log bytes) / (Math.log 1024)
        ((bytes / Math.pow 1024, Math.floor number).toFixed precision) +  ' ' + units[number]
