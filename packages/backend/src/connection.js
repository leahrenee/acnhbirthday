const { Client } = require('pg')

const client = new Client()
 
// clients will also use environment variables
// for connection information
const connection = async () =>  {
    await client.connect()
}

// const addVillager = () => {
//     client.query(
//         `
//             INSERT INTO villagers (id, name, birthday) VALUES
//             (2, 'muffy', '2002-02-04'),
//             (3, 'bob', '2002-01-01');
//         `
//     )

// }

connection()
// addVillager()
