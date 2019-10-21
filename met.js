const request = require('request')

const getObjectID = function(q, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + q

    request({ url, json: true }, function (error, response) {
        if (error) {
            callback ('Service unavailable', undefined)
        }
        else if (response.body == 'false') {
            callback (response.body.Error, undefined)
        }
        else {
            const data = response.body

            if (data.total == 0) {
            callback ('No objects found :(', undefined)
            } else {
            const info = {
                objectID: data.objectIDs[0]
            }
            
            callback (undefined, info)
            }
        }  
    })
}

const getObjectInfo = function(objectID, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID

    request({ url, json: true }, function (error, response) {
        if (error) {
            callback ('Service unavailable', undefined)
        }
        else if (response.body == 'false') {
            callback (response.body.Error, undefined)
        }
        else {
            const data = response.body
            const info = {
                searchTerm: "",
                artist: data.constituents ? data.constituents[0].name : "",
                title: data.title,
                year: data.objectEndDate,
                technique: data.medium,
                metUrl: data.objectURL
            }
            
            callback (undefined, info)
        } 
    })
}

module.exports = {
  getObjectID: getObjectID,
  getObjectInfo: getObjectInfo
}