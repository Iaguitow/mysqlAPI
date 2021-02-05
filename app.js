const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({path:"./.env"});

const app = express();
app.use(express.json());


const db = mysql.createPool({
    connectionLimit : 100000,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: 3306
});

/*setInterval(function(){
  db.getConnection(function (err, connection) {
    console.log(err+" tttt "+ connection);
  });
},5000);*/

app.get('/managerDrivers/NextWeek', function g (req, res) {

  var sqlStr = " SELECT ADDDATE(MAX(ww.startdt),7) as dtStart, ADDDATE(MAX(ww.enddt),7) as dtEnd, ";
  sqlStr += " MAX(ww.weeknumber)+1 AS weekNumber, MAX(ww.enddt) as RealEndDT FROM workweek ww;";

  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
          
      // Executing the MySQL query
      connection.query(sqlStr.toString(), function (error, results, fields) {

        if (error != null){
          res.send(error);
          console.log(error+ "ahh");
          throw error
          
        } else if(results[0] != null) {
          res.send(results);

        } else {
          res.send("Not Found Data");

        }
      });
    });
  connection.release(); 
  });
});

app.post('/managerUsers/getListPeoples', function g (req, res) {

  var disabledUsers = JSON.stringify(req.body.disabledUsers);

  var sqlStr =  "SELECT "; 
      sqlStr += "p.idpeople, ";
      sqlStr += "p.name, "; 
      sqlStr += "p.email, "; 
      sqlStr += "p.phonenumber, "; 
      sqlStr += "p.password, "; 
      sqlStr += "p.fk_idcategory, "; 
      sqlStr += "p.active ";
      sqlStr += "FROM people p ";
      if(disabledUsers=="true"){
        sqlStr += "WHERE 0 = 0 ";
      }else{sqlStr += "WHERE p.active = 'S' ";}
      sqlStr += "ORDER BY p.active DESC, p.name ASC ";

  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
          
      // Executing the MySQL query
      connection.query(sqlStr.toString(), function (error, results, fields) {

        if (error != null){
          res.send(error);
          console.log(error+ "ahh");
          throw error
          
        } else if(results[0] != null) {
          res.send(results);

        } else {
          res.send("Not Found Data");

        }
      });
    });
  connection.release(); 
  });
});

app.get('/managerUsers/getListCategory', function g (req, res) {

  var sqlStr = "SELECT idpeoplecategory, namecategory FROM peoplecategory;";

  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
          
      // Executing the MySQL query
      connection.query(sqlStr.toString(), function (error, results, fields) {
        
        if (error != null){
          res.send(error);
          console.log(error+ "ahh");
          throw error
          
        } else if(results[0] != null) {
          res.send(results);

        } else {
          res.send("Not Found Data");

        }
      });
    });
  connection.release(); 
  });
});

app.get('/managerDrivers/Routes', function g (req, res) {

  var sqlStr = "SELECT r.routename, r.idroutes AS keyroute FROM route r ORDER BY r.idroutes ASC;";

  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
          
      // Executing the MySQL query
      connection.query(sqlStr.toString(), function (error, results, fields) {

        if (error != null){
          res.send(error);
          console.log(error+ "ahh");
          throw error
          
        } else if(results[0] != null) {
          res.send(results);

        } else {
          res.send("Not Found Data");

        }
      });
    });
  connection.release(); 
  });
});

app.get('/list/managerDriversWeek', function g (req, res) {

  var sqlStr = " SELECT ";
  sqlStr += " CONCAT('WEEK: ',ww.weeknumber,' ( ',DATE_FORMAT(ww.startdt,'%d/%m/%Y'), ";
  sqlStr += " ' - ',DATE_FORMAT(ww.enddt,'%d/%m/%Y'),' )') AS WeekDate, ";
  sqlStr += " Concat('DAY: ', ";
  sqlStr += " Date_format(wd.date, '%d/%m/%Y')) AS ";
  sqlStr += " dayDate, ";
  sqlStr += " p.phonenumber, ";
  sqlStr += " wd.idworkday as keySectionDay, ";
  sqlStr += " ww.idworkweek as keySectionWeek, ";
  sqlStr += " pwd.idpeopleworkday KeyItemDriver, ";  
  sqlStr += " pwd.fk_route as KeyRouteDriver, ";
  sqlStr += " ifnull(wd.drivers_amount,0) "; 
  sqlStr += " AS driverAmountAccepted, "; 
  sqlStr += " CONCAT(Upper(SUBSTRING(p.name,1,1)),'.'";
  sqlStr += " ,' ',UPPER(SUBSTRING(substring_index(p.name,' ',-1),1,1)),SUBSTRING(substring_index(p.name,' ',-1),2)) as name,"; 
  sqlStr += " pwd.worked, "; 
  sqlStr += " IFNULL((SELECT Count(1) "; 
  sqlStr += " FROM   peopleworkday pp, "; 
  sqlStr += " workday wd2, "; 
  sqlStr += " workweek ww2 "; 
  sqlStr += " WHERE  pp.fk_workday = wd2.idworkday "; 
  sqlStr += "  AND wd2.fk_workweek = ww2.idworkweek "; 
  sqlStr += "  AND pp.worked = 'S' "; 
  sqlStr += "  AND pwd.fk_people = pp.fk_people "; 
  sqlStr += "  AND ww2.weeknumber = ww.weeknumber "; 
  sqlStr += "  GROUP  BY pp.fk_people),0) AS workedWeekDays "; 
  sqlStr += " FROM   people p, "; 
  sqlStr += "  peoplecategory pc, "; 
  sqlStr += "  workday wd, "; 
  sqlStr += "  workweek ww, "; 
  sqlStr += "  peopleworkday pwd "; 
  sqlStr += " WHERE  p.fk_idcategory = pc.idpeoplecategory  ";
  sqlStr += " AND p.idpeople = pwd.fk_people "; 
  sqlStr += " AND wd.idworkday = pwd.fk_workday "; 
  sqlStr += " AND ww.idworkweek = wd.fk_workweek ";
  sqlStr += " AND YEAR(ww.enddt) = YEAR(CURDATE()) ";
  //sqlStr += " AND wd.idworkday in (22,20,10) ";
  sqlStr += " ORDER BY wd.date DESC, p.name ASC; ";

  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
          
      // Executing the MySQL query
      connection.query(sqlStr.toString(), function (error, results, fields) {

        if (error != null){
          res.send(error);
          console.log(error+ "ahh");
          throw error
          
        } else if(results[0] != null) {
          res.send(results);

        } else {
          res.send("Nott Found Data");

        }
      });
    });
  connection.release(); 
  });
});

app.get('/list/managerDrivers', function g (req, res) {

  var sqlStr = " SELECT Concat('DAY: ', ";
  sqlStr += " Date_format(wd.date, '%d/%m/%Y'), ' - WEEK: ', ww.weeknumber) AS ";
  sqlStr += " dayDate, ";
  sqlStr += " p.phonenumber, ";
  sqlStr += " wd.idworkday as keySectionDay, ";
  sqlStr += " pwd.idpeopleworkday KeyItemDriver, ";  
  sqlStr += " pwd.fk_route as KeyRouteDriver, ";
  sqlStr += " wd.drivers_amount "; 
  sqlStr += " AS driverAmountAccepted, "; 
  sqlStr += " CONCAT(Upper(SUBSTRING(p.name,1,1)),'.'";
  sqlStr += " ,' ',UPPER(SUBSTRING(substring_index(p.name,' ',-1),1,1)),SUBSTRING(substring_index(p.name,' ',-1),2)) as name,"; 
  sqlStr += " pwd.worked, "; 
  sqlStr += " IFNULL((SELECT Count(1) "; 
  sqlStr += " FROM   peopleworkday pp, "; 
  sqlStr += " workday wd2, "; 
  sqlStr += " workweek ww2 "; 
  sqlStr += " WHERE  pp.fk_workday = wd2.idworkday "; 
  sqlStr += "  AND wd2.fk_workweek = ww2.idworkweek "; 
  sqlStr += "  AND pp.worked = 'S' "; 
  sqlStr += "  AND pwd.fk_people = pp.fk_people "; 
  sqlStr += "  AND ww2.weeknumber = ww.weeknumber "; 
  sqlStr += "  GROUP  BY pp.fk_people),0) AS workedWeekDays "; 
  sqlStr += " FROM   people p, "; 
  sqlStr += "  peoplecategory pc, "; 
  sqlStr += "  workday wd, "; 
  sqlStr += "  workweek ww, "; 
  sqlStr += "  peopleworkday pwd "; 
  sqlStr += " WHERE  p.fk_idcategory = pc.idpeoplecategory  ";
  sqlStr += " AND p.idpeople = pwd.fk_people "; 
  sqlStr += " AND wd.idworkday = pwd.fk_workday "; 
  sqlStr += " AND ww.idworkweek = wd.fk_workweek ";
  sqlStr += " AND ww.weeknumber = (SELECT Max(weeknumber) FROM workweek www ";
  sqlStr += " INNER JOIN workday wod ON (wod.fk_workweek = www.idworkweek)) ";
  sqlStr += " ORDER BY wd.date DESC, p.name ASC; ";

  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
          
      // Executing the MySQL query
      connection.query(sqlStr.toString(), function (error, results, fields) {

        if (error != null){
          res.send(error);
          console.log(error+ "ahh");
          throw error
          
        } else if(results[0] != null) {
          res.send(results);

        } else {
          res.send("Nott Found Data");

        }
      });
    });
  connection.release(); 
  });
});

app.post('/managerUsers/updateUser', function s (req, res) {

  var userName = JSON.stringify(req.body.userName);
  var userMail = JSON.stringify(req.body.userMail);
  var userPassword = JSON.stringify(req.body.userPassword);
  var userCategory = JSON.stringify(req.body.userCategory);
  var userActive = JSON.stringify(req.body.userActive);
  var userPhonenumber = JSON.stringify(req.body.userPhonenumber);
  var idpeople = JSON.stringify(req.body.idpeople);
      
  var sqlStr = " UPDATE people ";
      sqlStr += " set name = "+userName+", ";
      sqlStr += " email = "+userMail+", ";
      sqlStr += " phonenumber = "+userPhonenumber+", ";
      sqlStr += " password = "+userPassword+", ";
      sqlStr += " fk_idcategory = "+userCategory+", ";
      sqlStr += " active = "+userActive+" ";
      sqlStr += " WHERE idpeople = "+idpeople+" ";
  
  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
    // Executing the MySQL
      connection.query(sqlStr.toString(), function (error, result, fields) {
 
        if (error != null){
          res.send(error);
          console.log(error);

        } else if(result.affectedRows != 0) {
          res.send("Sucessfully Update.");

        } else {
          res.send("Error, E-mail already exist.");

        }
      });
    });
    connection.release();
  });
});

app.post('/managerUsers/insertNewUser', function s (req, res) {

  var userName = JSON.stringify(req.body.userName);
  var userMail = JSON.stringify(req.body.userMail);
  var userPassword = JSON.stringify(req.body.userPassword);
  var userCategory = JSON.stringify(req.body.userCategory);
  var userActive = JSON.stringify(req.body.userActive);
  var userPhonenumber = JSON.stringify(req.body.userPhonenumber);
      
  var sqlStr = " INSERT INTO people (NAME, email, phonenumber, PASSWORD, fk_idcategory, active) ";
      sqlStr += " (SELECT ";
      sqlStr += userName+", ";
      sqlStr += userMail+", ";
      sqlStr += userPhonenumber+", ";
      sqlStr += userPassword+", ";
      sqlStr += userCategory+", ";
      sqlStr += userActive+" ";
      sqlStr += " FROM people p ";
      sqlStr += " WHERE (SELECT count(email) FROM people pp where pp.email = "+userMail+")=0 LIMIT 1) ";
  
  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
    // Executing the MySQL
      connection.query(sqlStr.toString(), function (error, result, fields) {
 
        if (error != null){
          res.send(error);
          console.log(error);

        } else if(result.affectedRows != 0) {
          res.send("Sucessfully Update.");

        } else {
          res.send("Error, E-mail already exist.");

        }
      });
    });
    connection.release();
  });
});

app.post('/managerDrivers/insertNewDay', function s (req, res) {

  var dayToday = JSON.stringify(req.body.dayToday);
      
  var sqlStr = " INSERT INTO workday (date, fk_workweek) ";   
  sqlStr += " (SELECT "+dayToday+" AS newDate, ww.idworkweek FROM workweek ww ";
  sqlStr += " WHERE "+dayToday+" BETWEEN ww.startdt AND ww.enddt ";
  sqlStr += " AND (SELECT COUNT(DATE) FROM workday wd WHERE wd.date = "+dayToday+") = 0 LIMIT 1); ";
  
  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
    // Executing the MySQL
      connection.query(sqlStr.toString(), function (error, result, fields) {
 
        if (error != null){
          res.send(error);
          console.log(error);

        } else if(result.affectedRows != 0) {
          res.send("Sucessfully Update.");

        } else {
          res.send("Error, Register a Week for this day.");

        }
      });
    });
    connection.release();
  });
});

app.post('/managerDrivers/insertNewWeek', function s (req, res) {

  var dateStart = JSON.stringify(req.body.dateStart);
  var dateEnd = JSON.stringify(req.body.dateEnd);
  var weekNumber = JSON.stringify(req.body.weekNumber);
      
  var sqlStr = " INSERT INTO workweek (startdt,enddt,weeknumber) ";   
  sqlStr += " VALUES ("+dateStart+","+dateEnd+","+weekNumber+") ";
  
  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
    // Executing the MySQL
      connection.query(sqlStr.toString(), function (error, result, fields) {
 
        if (error != null){
          res.send(error);
          console.log(error);

        } else if(result.affectedRows != 0) {
          res.send("Sucessfully Update.");

        } else {
          res.send("Error, Register a Week for this day.");

        }
      });
    });
    connection.release();
  });
});

app.post('/managerDrivers/DriversWorkedWeek', function s (req, res) {

  var idWorkWeek = JSON.stringify(req.body.idWorkWeek);
      
  var sqlStr = " SELECT ";
	sqlStr += " ww.weeknumber AS 'Week Number', ";
	sqlStr += " ww.startdt AS 'Week Started', ";
	sqlStr += " ww.enddt AS 'Week Ended', ";
  sqlStr += " wd.date AS 'Route Day', ";
  sqlStr += " IF(pwd.worked IS NULL,'Without Answer',IF(pwd.worked='S','YES','NO')) AS 'Worked', ";
	sqlStr += " IFNULL(wd.drivers_amount,0) AS 'Total Drivers Worked', ";
	sqlStr += " p.name AS 'Driver', ";
	sqlStr += " p.email AS 'Driver Email', ";
	sqlStr += " p.phonenumber AS 'Driver Number', ";
	sqlStr += " ifnull(r.routename,'Was not Selected') AS 'Driver Route', ";
	sqlStr += " ifnull(r.price,'Was not Selected') AS 'Driver Pay' ";
  sqlStr += " FROM peopleworkday pwd ";
  sqlStr += " INNER JOIN workday wd ON (pwd.fk_workday = wd.idworkday) ";
  sqlStr += " INNER JOIN workweek ww ON (wd.fk_workweek = ww.idworkweek) ";
  sqlStr += " INNER JOIN people p ON (pwd.fk_people = p.idpeople) ";
  sqlStr += " LEFT JOIN route r ON (pwd.fk_route = r.idroutes) ";
  sqlStr += " WHERE ww.idworkweek = "+idWorkWeek;
  sqlStr += " AND IFNULL(pwd.worked,'N') IN ('S','N') ";
  sqlStr += " ORDER BY wd.date DESC ";

  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
    // Executing the MySQL
      connection.query(sqlStr.toString(), function (error, result, fields) {
        if (error != null){
          res.send(error);
          console.log(error);

        } else if(result[0] != null) {
          res.send(result);

        } else {
          res.send("Error, Check out your internet or check if there is any driver who worked this week.");

        }
      });
    });
    connection.release();
  });
});

app.post('/managerDrivers/DriversWorked', function s (req, res) {
  
  var idWorkDay = JSON.stringify(req.body.idWorkDay);
      
  var sqlStr = " SELECT ";
	sqlStr += " ww.weeknumber AS 'Week Number', ";
	sqlStr += " ww.startdt AS 'Week Started', ";
	sqlStr += " ww.enddt AS 'Week Ended', ";
  sqlStr += " wd.date AS 'Route Day', ";
  sqlStr += " IF(pwd.worked IS NULL,'Without Answer',IF(pwd.worked='S','YES','NO')) AS 'Worked', ";
	sqlStr += " IFNULL(wd.drivers_amount,0) AS 'Total Drivers Worked', ";
	sqlStr += " p.name AS 'Driver', ";
	sqlStr += " p.email AS 'Driver Email', ";
	sqlStr += " p.phonenumber AS 'Driver Number', ";
	sqlStr += " ifnull(r.routename,'Was not Selected') AS 'Driver Route', ";
	sqlStr += " ifnull(r.price,'Was not Selected') AS 'Driver Pay' ";
  sqlStr += " FROM peopleworkday pwd ";
  sqlStr += " INNER JOIN workday wd ON (pwd.fk_workday = wd.idworkday) ";
  sqlStr += " INNER JOIN workweek ww ON (wd.fk_workweek = ww.idworkweek) ";
  sqlStr += " INNER JOIN people p ON (pwd.fk_people = p.idpeople) ";
  sqlStr += " LEFT JOIN route r ON (pwd.fk_route = r.idroutes) ";
  sqlStr += " WHERE wd.idworkday = "+idWorkDay;
  sqlStr += " AND IFNULL(pwd.worked,'N') IN ('S','N'); ";

  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
    // Executing the MySQL
      connection.query(sqlStr.toString(), function (error, result, fields) {
  
        if (error != null){
          res.send(error);
          console.log(error);

        } else if(result[0] != null) {
          res.send(result);

        } else {
          res.send("Error, Check out your internet or check if there is any driver who worked this day.");

        }
      });
    });
    connection.release();
  });
});

app.post('/managerDrivers/setStatus', function s (req, res) {

  var idDriver = JSON.stringify(req.body.idDriver);
      
  var sqlStr = " UPDATE peopleworkday pwd  "; 
      sqlStr += " SET pwd.worked = if(pwd.worked='S','N','S') ";
      sqlStr += " WHERE pwd.idpeopleworkday = "+idDriver ;

  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
    // Executing the MySQL
      connection.query(sqlStr.toString(), function (error, result, fields) {
  
        if (error != null){
          res.send(error);
          console.log(error);

        } else if(result.affectedRows != null) {
          res.send("Sucessfully Update.");

        } else {
          res.send("Error! Try again.");

        }
      });
    });
    connection.release();
  });
});

app.post('/managerDrivers/setRoute', function s (req, res) {

  var idDriver = JSON.stringify(req.body.idDriver);
  var idRoute = JSON.stringify(req.body.idRoute);
      
  var sqlStr = " UPDATE peopleworkday pwd  "; 
      sqlStr += " SET pwd.fk_route = "+idRoute;
      sqlStr += " WHERE pwd.idpeopleworkday = "+idDriver ;

  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
    // Executing the MySQL
      connection.query(sqlStr.toString(), function (error, result, fields) {
  
        if (error != null){
          res.send(error);
          console.log(error);

        } else if(result.affectedRows != null) {
          res.send("Sucessfully Update.");

        } else {
          res.send("Error! Try again.");

        }
      });
    });
    connection.release();
  });
});

// LOGIN AUTHENTICATION //
app.post('/auth/login', function s (req, res) {

  var dtEmail = JSON.stringify(req.body.email);
  var dtPassword = JSON.stringify(req.body.password);
      
  var sqlStr = "SELECT p.idpeople, p.email, "; 
  sqlStr += " CONCAT(Upper(SUBSTRING(p.name,1,1)),substring((substring_index(p.name,' ',1)),2)";
  sqlStr += " ,' ',UPPER(SUBSTRING(substring_index(p.name,' ',-1),1,1)),SUBSTRING(substring_index(p.name,' ',-1),2)) as name,";
  sqlStr += " pc.namecategory FROM people p, peoplecategory pc "; 
  sqlStr += " where p.fk_idcategory = pc.idpeoplecategory and p.active = 'S' and p.email = "+ dtEmail;
  sqlStr += " and p.password = "+ dtPassword;

  db.getConnection(function (err, connection) {

    connection.connect(function (err) {
    // Executing the MySQL
      connection.query(sqlStr.toString(), function (error, results, fields) {
  
        if (error != null){
          res.send(error);
          console.log(error);

        } else if(results[0] != null) {
          res.send(results);

        } else {
          res.send("Incorrect Email or Password.");

        }
      });
    });
    connection.release();
  });
});         

// Starting 
// SUGESTÕES DE COLO
app.listen(3000, () => {
 console.log('Started.');
});