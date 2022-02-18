const ClientConfig = require("mindsphere-sdk-node-core").ClientConfig;
const AppCredentials = require("mindsphere-sdk-node-core").AppCredentials;
const TimeSeriesClient = require("timeseries-sdk").TimeSeriesClient;
const AssetsClient = require("assetmanagement-sdk").AssetsClient;
const StructureClient = require("assetmanagement-sdk").StructureClient;


const fs = require('fs');
const readline = require('readline');
const config = new ClientConfig();
const credentials = new AppCredentials(JSON.parse(fs.readFileSync("vpapp_credentials.json")));///myConfig.certificatesPath)));
const time_series_client = new TimeSeriesClient(config, credentials);

function concentrateData(payload){
    let newPayload = []
    let prevRecord = payload[0]
    for(let i = 1; i < payload.length; i++){
        let currTime = payload[i]["_time"]
        if(currTime === prevRecord["_time"]){
            for (const [key, value] of Object.entries(payload[i])) {
                prevRecord[key] = value
            }
        }
        else{
            newPayload.push(prevRecord)
            prevRecord = payload[i]
        }
    }
    newPayload.push(prevRecord)
    return newPayload
}

async function sendPayload(payload){
    /*
    try {

        const request_object = {
            entity: "a1d2fb187b9142e7956a3b214a5e01c3",
            propertysetname: "Elektromotor",
            timeseries: payload
        };

        await time_series_client.putTimeseries(request_object);
    } catch (ex) {
        console.log(ex)
    }
    
    */
    
    
    const newPayload = concentrateData(payload)    
    const data = JSON.stringify(newPayload);

    // write JSON string to a file
    fs.writeFile('elektromotor3.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
}

function processLine(line, timestamp){
    const timestampcp = timestamp
    let obj = {}
    let lineList = line.split(/\s+/)
    
    if(isNaN(lineList[3])){
        return null
    }
    const newTimestamp = new Date(timestampcp.getTime() + parseInt(1000 * parseFloat(lineList[0])));
    //console.log(newTimestamp.toISOString());
    obj["_time"] = newTimestamp.toISOString()
    obj["SPN" + lineList[1]] = lineList[3]
    return obj
}

async function sendFile(fileName){
    const fileStream = fs.createReadStream(fileName)
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });


    let payload = []
    let payloadDict = {}
    let first = 1
    let time = null
    let counter = 0
    for await (const line of rl) {
        counter += 1
        /*if(counter == 100){
            sendPayload(payload)
            counter = 0
            payload = []
        }*/
        if(first){
            first = 0
            time = new Date(line);
            //console.log(time.toISOString());
        }
        else{
            
/*
            let lineList = line.split(/\s+/)
            if(isNaN(lineList[3])){
                return null
            }
            const newTimestamp = new Date(timestampcp.getTime() + parseInt(1000 * parseFloat(lineList[0])));
            //console.log(newTimestamp.toISOString());
            payloadDict["newTimestamp"] = newTimestamp.toISOString()
            obj["SPN" + lineList[1]] = lineList[3]

*/


            let record = processLine(line, time)
            if(record){
                payload.push(record)
            }
        }
    }
    sendPayload(payload)

}

sendFile("data/translated/2021_05_10_07_42_28_out.txt")
/*let timestamp = new Date("2021-05-05T05:42:37.000Z")
let newTimestamp = new Date(timestamp.setMilliseconds(timestamp.getMilliseconds() + 1000));
console.log(newTimestamp);*/