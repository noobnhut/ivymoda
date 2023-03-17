// Kết nối với cơ sở dữ liệu MySQL
const mysql = require('mysql2');

class Connect {
  constructor(host,user,password,database) {
      this.host=host;
      this.user=user;
      this.password=password;
      this.database=database;
    }
  
    Connected() {
      const connection = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database
      });
      
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL', err);
          return;
        }
        console.log('Connected to MySQL');
      });
    }
  }

  module.exports = Connect;