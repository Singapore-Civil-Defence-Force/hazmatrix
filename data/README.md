# Data
- Directory to store all matrix data needed in seperate JSON files
- Data is split up into different JSON files so that dont need to load all data when just using a subset of the data to make each page's experience snappier

## Files
- chemicals.json
    - Store all the name, formula and UN number of chemicals
    - Used for searching for a specific chemical by name or un number
    - Root object keyed with chemical ID
- detection_equipments.json
    - Store the equipments' name, operating pressure and addtional information if any
    - Showned in 
    - Root object keyed with detection equipment ID
- mitigation_equipments.json
    - Store the equipments' name, mitigating limitation, operating pressure, working temperature and if it can be used in a flammable environment
    - Showned in 
    - Root object keyed with mitigation equipment ID
    - Schema
        ```js
        {
            mitigationEquipmentID: {
                "name": String,
                "Mitigation Limitations": Array<String>,
                "Operating Pressure": String,
                "Working Temperature": String,
                // Could be Boolean | String, where Bool gets converted to Yes/No, but it just adds complexity to the UI
                "flammable environment": String
            },
        }
        ```
- mitigation.json
    - Mapping from chemical ID to equipment ID
    - Root object keyed with chemical ID