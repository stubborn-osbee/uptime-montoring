/*
*Create and export configration variables
*/

//Container for all environments
let environments = {}

// Staging (default) envirnment
environments.staging = {
    'port': 3000,
    'envName': 'staging'
}

//Production environment
environments.production = {
    'port':5000,
    'envName': 'production'
}

//Determine which environment should be esported out
 let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''

 //Check that the current environment is one of the enviroment above, if not, default to staging
 let environmentToExport = typeof(environments[currentEnvironment]) == 'object'? environments[currentEnvironment] : environments.staging

 //Export the module
 module.exports = environmentToExport