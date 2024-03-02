import mysql from 'mysql2/promise';

// export async function query({ query, values = [] }) {
    
//     // const dbconnection = await mysql.createConnection(
//     //   process.env.MYSQL_DATABASE_URL
//     // );

//     const dbconnection = await mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     });

// try {
//     const [results] = await dbconnection.execute(query, values);
//     dbconnection.end();
//     return results;
//   } catch (error) {
//     throw Error(error.message);
//     return { error };
//   }
// }

export async function query(query, data = []) {
    try {
    const db = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    });

        const [result] = await db.execute(query, data);
        await db.end();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}


//in a separate node js file you can use this wrapper like this:
  // const productName = req.body.product_name;
    // const addProducts = await query({
    //   query: "INSERT INTO products (product_name) VALUES (?)",
    //   values: [productName],
    // });


// import mysql from 'mysql2/promise';

// export async function callProducts(query, data = []) {

// try {
//     const db = await mysql.createConnection({
//         host: process.env.MYSQL_HOST,
//         database: process.env.MYSQL_DATABASE,
//         user: process.env.MYSQL_USER,
//         password: process.env.MYSQL_PASSWORD,
//     });

//         const [result] = await db.execute(query, data);
//         await db.end();
//         return result;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }