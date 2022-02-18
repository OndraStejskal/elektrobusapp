
const fs = require('fs');
const readline = require('readline');

function isHex(inputString) {
    var re = /[0-9A-Fa-f]{4}/g;

    if (re.test(inputString)) {
        return (1)
    } else {
        return (0)
    }
}
const dictionary = [

    { "SPN": 46, "type": "Pneumatic_Supply_Pressure", "PGN": 65198, "byte": 1, "bitStart": 1, "bitLength": 8, "rate": 8, "offset": 0, "unit": "kPa" },
    { "SPN": 70, "type": "Parking_Brake_Switch", "PGN": 65265, "byte": 1, "bitStart": 3, "bitLength": 2, "rate": { "00": "Parking_brake_not_set", "01": "Parking_brake_set", "10": "Error", "11": "Not_available" }, "offset": 0, "unit": "" },
    { "SPN": 80, "type": "Washer_Fluid_Level", "PGN": 65276, "byte": 1, "bitStart": 1, "bitLength": 8, "rate": 0.4, "offset": 0, "unit": "%" },
    { "SPN": 84, "type": "Wheel-Based_Vehicle_Speed", "PGN": 65265, "byte": [2, 3], "bitStart": 1, "bitLength": 16, "rate": 0.00390625, "offset": 0, "unit": "km/h" },
    { "SPN": 91, "type": "Accelerator_Pedal_Position_1", "PGN": 61443, "byte": 2, "bitStart": 1, "bitLength": 8, "rate": 0.4, "offset": 0, "unit": "%" },
    { "SPN": 92, "type": "Engine_Percent_Load_At_Current_Speed", "PGN": 61443, "byte": 3, "bitStart": 1, "bitLength": 8, "rate": 1, "offset": 0, "unit": "%" },
    { "SPN": 96, "type": "Fuel_Level_1", "PGN": 65276, "byte": 2, "bitStart": 1, "bitLength": 8, "rate": 0.4, "offset": 0, "unit": "%" },
    { "SPN": 109, "type": "Engine_Coolant_Pressure", "PGN": 65263, "byte": 7, "bitStart": 1, "bitLength": 8, "rate": 2, "offset": 0, "unit": "kPa" },
    { "SPN": 110, "type": "Engine_Coolant_Temperature", "PGN": 65262, "byte": 1, "bitStart": 1, "bitLength": 8, "rate": 1, "offset": -40, "unit": "degC" },
    { "SPN": 111, "type": "Engine_Coolant_Level", "PGN": 65263, "byte": 8, "bitStart": 1, "bitLength": 8, "rate": 0.4, "offset": 0, "unit": "%" },
    { "SPN": 114, "type": "Net_Battery_Current", "PGN": 65271, "byte": 1, "bitStart": 1, "bitLength": 8, "rate": 1, "offset": -125, "unit": "A" },
    { "SPN": 170, "type": "Cab_Interior_Temperature", "PGN": 65269, "byte": [2, 3], "bitStart": 1, "bitLength": 16, "rate": 0.03125, "offset": -273, "unit": "degC" },
    { "SPN": 171, "type": "Ambient_Air_Temperature", "PGN": 65269, "byte": [4, 5], "bitStart": 1, "bitLength": 16, "rate": 0.03125, "offset": -273, "unit": "degC" },
    { "SPN": 190, "type": "Engine_Speed", "PGN": 61444, "byte": [4, 5], "bitStart": 1, "bitLength": 16, "rate": 0.125, "offset": 0, "unit": "rpm" },
    { "SPN": 191, "type": "Transmission_Output_Shaft_Speed", "PGN": 61442, "byte": [2, 3], "bitStart": 1, "bitLength": 16, "rate": 0.125, "offset": 0, "unit": "rpm" },
    { "SPN": 235, "type": "Engine_Total_Idle_Hours", "PGN": 65244, "byte": [5, 8], "bitStart": 1, "bitLength": 32, "rate": 0.05, "offset": 0, "unit": "hr" },
    { "SPN": 241, "type": "Tire_Pressure", "PGN": 65268, "byte": 2, "bitStart": 1, "bitLength": 8, "rate": 4, "offset": 0, "unit": "kPa" },
    { "SPN": 244, "type": "Trip_Distance", "PGN": 65248, "byte": [1, 4], "bitStart": 1, "bitLength": 32, "rate": 0.125, "offset": 0, "unit": "km" },
    { "SPN": 245, "type": "Total_Vehicle_Distance", "PGN": 65248, "byte": [5, 8], "bitStart": 1, "bitLength": 32, "rate": 0.125, "offset": 0, "unit": "km" },
    { "SPN": 246, "type": "Total_Vehicle_Hours", "PGN": 65255, "byte": [1, 4], "bitStart": 1, "bitLength": 32, "rate": 0.05, "offset": 0, "unit": "hr" },
    { "SPN": 247, "type": "Engine_Total_Hours_of_Operation", "PGN": 65253, "byte": [1, 4], "bitStart": 1, "bitLength": 32, "rate": 0.05, "offset": 0, "unit": "hr" },
    { "SPN": 249, "type": "Engine_Total_Revolutions", "PGN": 65253, "byte": [5, 8], "bitStart": 1, "bitLength": 32, "rate": 1000, "offset": 0, "unit": "r" },
    { "SPN": 409, "type": "Axle_Group_Weight", "PGN": 64874, "byte": [2, 3], "bitStart": 1, "bitLength": 16, "rate": 2, "offset": 0, "unit": "kg" },
    { "SPN": 512, "type": "Driver's_Demand_Engine_-_Percent_Torque", "PGN": 61444, "byte": 2, "bitStart": 1, "bitLength": 8, "rate": 1, "offset": -125, "unit": "%" },
    { "SPN": 513, "type": "Actual_Engine_-_Percent_Torque", "PGN": 61444, "byte": 3, "bitStart": 1, "bitLength": 8, "rate": 1, "offset": -125, "unit": "%" },
    { "SPN": 521, "type": "Brake_Pedal_Position", "PGN": 61441, "byte": 2, "bitStart": 1, "bitLength": 8, "rate": 0.4, "offset": 0, "unit": "%" },
    { "SPN": 582, "type": "Axle_Weight", "PGN": 65258, "byte": [2, 3], "bitStart": 1, "bitLength": 16, "rate": 0.5, "offset": 0, "unit": "kg" },
    { "SPN": 904, "type": "Front_Axle_Speed", "PGN": 65215, "byte": [1, 2], "bitStart": 1, "bitLength": 16, "rate": 0.00390625, "offset": 0, "unit": "km/h" },
    { "SPN": 959, "type": "Seconds", "PGN": 65254, "byte": 1, "bitStart": 1, "bitLength": 8, "rate": 0.25, "offset": 0, "unit": "s" },
    { "SPN": 960, "type": "Minutes", "PGN": 65254, "byte": 2, "bitStart": 1, "bitLength": 8, "rate": 1, "offset": 0, "unit": "min" },
    { "SPN": 961, "type": "Hours", "PGN": 65254, "byte": 3, "bitStart": 1, "bitLength": 8, "rate": 1, "offset": 0, "unit": "hr" },
    { "SPN": 962, "type": "Day", "PGN": 65254, "byte": 5, "bitStart": 1, "bitLength": 8, "rate": 0.25, "offset": 0, "unit": "days" },
    { "SPN": 963, "type": "Month", "PGN": 65254, "byte": 4, "bitStart": 1, "bitLength": 8, "rate": 1, "offset": 0, "unit": "month" },
    { "SPN": 964, "type": "Year", "PGN": 65254, "byte": 6, "bitStart": 1, "bitLength": 8, "rate": 1, "offset": 1985, "unit": "year" },
    { "SPN": 1611, "type": "Vehicle_motion", "PGN": 65132, "byte": 1, "bitStart": 7, "bitLength": 2, "rate": { "00": "Vehicle_motion_not_detected", "01": "Vehicle_motion_detected", "10": "Error", "11": "Not_available" }, "offset": 0, "unit": "" },
    { "SPN": 1744, "type": "Door_Release", "PGN": 65114, "byte": 5, "bitStart": 5, "bitLength": 2, "rate": { "00": "Doors_may_not_be_opened", "01": "Doors_may_be_opened", "10": "Error", "11": "Not_available" }, "offset": 0, "unit": "" },
    { "SPN": 1821, "type": "Position_of_doors", "PGN": 65102, "byte": 1, "bitStart": 1, "bitLength": 4, "rate": { "0000": "At_least_1_door_is_open", "0001": "Closing_last_door", "0010": "All_doors_closed", "1110": "Error", "1111": "Not_available" }, "offset": 0, "unit": "" },
    { "SPN": 2432, "type": "Engine_Demand_–_Percent_Torque", "PGN": 61444, "byte": 8, "bitStart": 1, "bitLength": 8, "rate": 1, "offset": -125, "unit": "%" },
    { "SPN": 2600, "type": "Payload_Percentage", "PGN": 64996, "byte": 1, "bitStart": 1, "bitLength": 8, "rate": 1, "offset": 0, "unit": "%" },
    { "SPN": 4201, "type": "Engine_Speed_1", "PGN": 61473, "byte": [1, 2], "bitStart": 1, "bitLength": 16, "rate": 0.5, "offset": 0, "unit": "rpm" }
]

//ZPROCESUJE JEDEN RADEK V ASC FILE
function processLine(InputString) {
    let InputStringList = InputString.split(/\s+/)
    if (InputStringList[0].length == 0) {
        InputStringList.shift()
    }

    //VYRAZOVANI NEPOUZITELNYCH RADKU:
    let HEXName = InputStringList[2]
    let HexPGN = 0
    if (HEXName.length == 9) {
        HexPGN = HEXName.substring(2, 6)
    }
    else {
        HexPGN = HEXName.substring(1, 5);
    }
    //CHYBNE RADKY
    if (!isHex(HexPGN)) {
        return ("");
    }

    DecPGN = parseInt(HexPGN, 16);

    SPNinPGNList = dictionary.filter(variable => variable['PGN'] == DecPGN)

    if (SPNinPGNList.length == 0) {
        return null
        //return ("neni pozadovan preklad teto promenne")
    }
    //##########################################################################################################
    //#DALSI HODNOTY Z RADKU:
    Time = InputStringList[0]
    BytesList = InputStringList.slice(6, 14)
    //##########################################################################################################
    //#ZPRACOVANI JEDNOHO SPN:
    for (const SPN of SPNinPGNList) {
        //####PODMINKA PRO SPN VE VICE NEZ JEDNOM BYTU:
        if (Array.isArray(SPN["byte"])) {
            HEXBytesList = BytesList.slice(SPN["byte"][0] - 1, SPN["byte"][-1]) //#vybere vsechny byty v SPN
            HEXBytesListReversed = HEXBytesList.reverse() //# Obrati jejich poradi (ctu zprava doleva)

            BinBytesListReversed = []
            for (i of HEXBytesListReversed) { //#list bitů v pořadí poslední byt- první byt
                BinBytesListReversed.push(parseInt(i, 16).toString(2).padStart(8, '0'))
            }
            BinByte = (BinBytesListReversed.join(''))

        }
        else {
            HexByte = BytesList.slice(SPN["byte"] - 1)
            BinByte = (parseInt(HexByte, 16).toString(2)).padStart(8, '0')
        }
        //#####PODMINKA PRO BITY ZACINAJICI 1. POZICI (PROBLEMY S RANGE)
        if (SPN["bitStart"] == 1) {
            BinBits = BinByte.slice(-SPN["bitStart"] - SPN["bitLength"] + 1)
        }
        else {
            BinBits = BinByte.slice(-SPN["bitStart"] - SPN["bitLength"] + 1, -SPN["bitStart"] + 1)
        }
        //#PODMINKA PRO SLOVNI VYSLEDKY
        if (parseInt(BinBits, 2).toString(16).slice(0, 2) == "fe") {
            return (Time + " " + SPN["type"] + " " + "Error_indicator") //# VIZ STR 6 NORMA 71
        }
        else if (parseInt(BinBits, 2).toString(16).slice(0, 2) == "ff") {
            return (Time + " " + SPN["type"] + " " + "Not_available_or_not_requested")//# VIZ STR 6 NORMA 71
        }
        else {
            if (typeof SPN["rate"] === 'object') {
                Value = SPN["rate"][BinBits.toString()]
            }
            else {
                Value = parseInt(BinBits, 2) * SPN["rate"] + SPN["offset"]
                Value = Math.round(Value * 100) / 100
            }
            return (Time + " " + SPN["SPN"] + " " + SPN["type"] + " " + Value + " " + SPN["unit"])
        }
    }
}

function parseTimestamp(line){
    const months = {
        Jan: '01',
        Feb: '02',
        Mar: '03',
        Apr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Aug: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dec: '12',
      }
    let lineList = line.split(/\s+/)
    return lineList[6] + "-" + months[lineList[2]] + "-" + lineList[3] + "T" + lineList[4].slice(0,-3)
}

//PRECTE VSECHNY RADKY V ASC FILE A APLIKUJE ProccessLine
async function processLineByLine(filePath) {
    
    const fileStream = fs.createReadStream(filePath)
    const fileStreamWrite = fs.createWriteStream("data/translated/" + filePath.slice(0,-4) +  "_out.txt")

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    content = 0

    for await (const line of rl) {
        if (content == 1) {
            pL = processLine(line)
            if (pL) {
                fileStreamWrite.write(pL + "\n")
            }
        }
        if (content == 0 && line.includes("0.000000 Start of measurement")) {
            content = 1
        }
        if (content == 0 && line.includes("date"))
        {
            let lineList = line.split(/\s+/)
            fileStreamWrite.write(parseTimestamp(line) + "\n")
        }

    }
}


processLineByLine("2021_05_10_07_42_28.asc")

module.exports = {
};