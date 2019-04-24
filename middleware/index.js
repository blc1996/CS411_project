// index.js

const Koa = require('koa');
const Router = require('koa-router');
const koaCors = require('koa-cors');
const mysql = require('mysql');
const util = require('util');

const app = new Koa();
const router = new Router();

const connection = mysql.createConnection({
  host: '172.22.148.161', // 填写你的mysql host
  user: 'root', // 填写你的mysql用户名
  password: '123456' // 填写你的mysql密码
})

connection.connect(err => {
  if(err) throw err;
  console.log('mysql connncted success!');
})

connection.query = util.promisify(connection.query);

var current_max_item_id = 0;
connection.query("SELECT MAX(id) FROM test.new_table", (err, result) => {
  if(err) throw err;
  current_max_item_id = result['0']['MAX(id)'];
  console.log("Market Id starting from: ", current_max_item_id);
})

var max_userID = 90000000000;
connection.query(`SELECT MAX(id) FROM test.users`, (err, result) => {
  if(err) throw err;
  max_userID = result['0']['MAX(id)'];
  console.log(max_userID)
  max_userID = Number(max_userID.slice(10, 21));
  console.log(max_userID)
})


router.get('/', ctx => {
  console.log(ctx)
  ctx.body = 'Visit index';
})

/***************************************
    Market Segment
***************************************/

// get the whole market table, modify name later
router.get('/fetchItems', ctx => {
  return new Promise(resolve => {
    const sql = `SELECT * FROM test.new_table`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        data: result
      }
      resolve();
    })
  })
})

// get the whole market table, modify name later
router.get('/fetchItem', ctx => {
  return new Promise(resolve => {
    const sql = `SELECT * FROM test.new_table WHERE id = ${ctx.query.id}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        data: result
      }
      resolve();
    })
  })
})

//post a new item
router.post('/insertItem', ctx => {
  return new Promise(resolve => {
    // get current time
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    // get info of inserting user
    var userName = "";
    var email = "";
    


    console.log(dateTime);
    const query = ctx.query;
    const sql = `INSERT INTO test.new_table(id, creater, image, description, price, create_time, title)
    VALUES( NULL , '${query.creater}', '${query.image}', '${query.description}', '${query.price}', '${dateTime}', '${query.title}')`;
    connection.query(sql, (err) => {
      if (err) throw err;
      ctx.body = {
        cde: 200,
        msg: `insert data to new_table success! '${query.id}', '${query.creater}', '${query.image}', '${query.description}', '${query.price}', '${query.create_time}'`
      }
      resolve();
    })
  })
})

//delete a market item
router.post('/deleteItem', ctx => {
  return new Promise(resolve => {
    const sql = `DELETE FROM test.new_table WHERE (id = '${ctx.query.id}');`
    connection.query(sql, (err) => {
      if (err){
        ctx.body = {
          cde: 400,
          msg: err
        }
      }else{
        ctx.body = {
          cde: 200,
          msg: `Delete item successful`
        }
      }
      resolve();
    })
  })
})


router.post('/editItem', ctx => {
  return new Promise(resolve => {
    const sql = `UPDATE test.new_table SET image = '${ctx.query.image}', description = '${ctx.query.description}', price = '${ctx.query.price}', title = '${ctx.query.title}' WHERE (id = '${ctx.query.id}');`
    connection.query(sql, (err) => {
      if (err){
        ctx.body = {
          cde: 400,
          msg: err
        }
      }else{
        ctx.body = {
          cde: 200,
          msg: `edit item successful`
        }
      }
      resolve();
    })
  })
})



/***************************************
    Course Segment
***************************************/

router.get('/getUserInfo', ctx => {
  return new Promise(resolve => {
    const sql = `SELECT * FROM test.users where id = '${ctx.query.id}'`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        data: result
      }
      resolve();
    })
  })
})


// get course comment
router.get('/getCourseComment', ctx => {
  return new Promise(resolve => {
    let query = ctx.query;
    const sql = `SELECT * FROM test.comment where courseid = '${query.courseid}'`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        data: result
      }
      resolve();
    })
  })
})

// post course course comment
router.post('/insertComment', ctx => {
  return new Promise(resolve => {
    let query = ctx.query;
    const sql = `INSERT INTO test.comment(user, time, difficulty, workload, comment, title, courseid)
    VALUES('${query.user}', '${query.time}', '${query.difficulty}', '${query.workload}', '${query.comment}', '${query.title}', '${query.courseid}')`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        msg: `insert data to fe_frame success!`
      }
      resolve();
    })
  })
})

router.get('/getCourseInfo', ctx => {
  return new Promise(resolve => {
    // let name = ctx.query.name;
    const sql = `SELECT * FROM test.gpa where Subject = '${ctx.query.Subject}' and Number = ${ctx.query.Number}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        data: result
      }
      resolve();
    })
  })
})


/***************************************
    User Segment
***************************************/

//user sign up
router.post('/signUpUser', ctx => {
  return new Promise(resolve => {
    const query = ctx.query;
    //first, check if the email has already been signed up
    connection.query(`SELECT COUNT(id) FROM test.users WHERE email='${query.email}'`, (err, result) => {
      if(err) {
        console.log(err);
        throw err;}
      const count = result['0']['COUNT(id)'];
      if(count !== 0){
        ctx.body = {
          cde: 400,
          msg: "email already in use!"
        }
        resolve();
      }else{
        // generate a unique id, 21 digits
        // const current_userID = query.id === "NULL" ? ++max_userID : query.id;
        console.log(max_userID)
        max_userID = max_userID + 1;
        console.log(max_userID)
        const ImageUrl = "https://res.cloudinary.com/dsrkgfv4x/image/upload/v1549593676/aph5hno3tovc3yisusfx.jpg";
        // query to insert
        const sql = `INSERT INTO test.users(id, userName, ImageUrl, email, password)
          VALUES('9999999999${max_userID.toString()}', '${query.userName}', '${ImageUrl}', '${query.email}', '${query.password}')`;
        connection.query(sql, (err) => {
          if (err){
            console.log(err)
            ctx.body = {
              cde: 400,
              msg: "unknown errer"
            }
          }else{
            ctx.body = {
              cde: 200,
              msg: `insert data to fe_frame success! '${query.id}', '${query.userName}', '${query.ImageUrl}'`
            }
          }
          resolve();
        })
      }
    })
  })
})

//record new users
router.get('/loginUser', ctx => {
  return new Promise(resolve => {
    const query = ctx.query;
    console.log(query);
    const sql = `SELECT * FROM test.users WHERE email='${query.email}'`;
    connection.query(sql, (err, result) => {
      if (err){
        ctx.body = {
          cde: 400,
          msg: err
        }
        resolve();
      }else{
        console.log(result['0']);
        console.log(result['0']['id']);
        if(query.password === result['0']['password']){
          console.log("good!!")
          ctx.body = {
            cde: 200,
            msg: {userName: result['0']['username'], userId: result['0']['id'], imageUrl: result['0']['ImageUrl']}
          }
          resolve();
        }else{
          console.log("bad!!", query.password, result['0']['password']);
          ctx.body = {
            cde: 400,
            msg: `wrong passwaord!`
          }
          resolve();
        }
      }
    })
  })
})

//record new users
router.get('/insertUser', ctx => {
  return new Promise(resolve => {
    const query = ctx.query;
    console.log(query);
    const sql = `INSERT INTO test.users(id, userName, ImageUrl, email, password)
    VALUES('${query.id}', '${query.userName}', '${query.ImageUrl}', '${query.email}', '123456')`;
    connection.query(sql, (err) => {
      if (err){
        console.log("error in inserting user: ", err);
        ctx.body = {
          cde: 400,
          msg: err
        }
      }else{
        ctx.body = {
          cde: 200,
          msg: `insert data to fe_frame success! '${query.id}', '${query.userName}', '${query.ImageUrl}'`
        }
      }
      resolve();
    })
  })
})


//search user by name
router.get('/searchUser', ctx => {
  return new Promise(resolve => {
    const query = ctx.query;
    const sql = `SELECT * FROM test.users where username = "${query.username}"`;
    connection.query(sql, (err, result) => {
      if (err){
        ctx.body = {
          cde: 400,
          msg: "user not found!"
        }
      }else{
        ctx.body = {
          cde: 200,
          data: result
        }
      }
      resolve();
    })
  })
})


/***************************************
    Chat Segment
***************************************/

//subscribe a topic
router.post('/subscribeTopic', ctx => {
  return new Promise(resolve => {
    const query = ctx.query;
    const sql = `INSERT INTO mqtt.mqtt_sub(clientid, topic, qos)
    VALUES('${query.id}', '${query.topic}', 1)`;
    connection.query(sql, (err, result) => {
      if (err){
        ctx.body = {
          cde: 400,
          msg: "subscribe failed!"
        }
      }else{
        ctx.body = {
          cde: 200,
          data: result
        }
      }
      resolve();
    })
  })
})

//fetch chat list
//http://localhost:9999/fetchChatList?id=114848845387331973050
router.get('/fetchChatList', (ctx) => {
  return new Promise(resolve => {
    const query = ctx.query;
    const sql = `SELECT topic FROM mqtt.mqtt_sub WHERE clientid=${query.id}`;
    connection.query(sql, async (err, result) => {
      if (err){
        ctx.body = {
          cde: 400,
          msg: []
        }
        resolve();
      }else{
        const IDs = result.map(item => {
          return item['topic']
        })
        console.log(IDs);
        var ret = [];
        for(var i = 0; i < IDs.length; i++){
          var id;
          if(IDs[i].substr(0,21) === query.id){
            id = IDs[i].substr(21,42);
          }else{
            id = IDs[i].substr(0,21);
          }
          const sql2 = `SELECT * FROM test.users WHERE id=${id}`;
          var userInfo;
          try{
            userInfo = await connection.query(sql2);
          }catch(err){
            continue;
          }
          ret.push(userInfo['0']);
        }
        console.log(ret);
        ctx.body = {
          cde: 200,
          msg: ret
        }
        resolve();
      }
    })
  })
})


// fetch all the subscribed chat content
router.get('/fetchChatContent', ctx => {
  return new Promise(resolve => {
    const query = ctx.query;
    const sql = `SELECT CONVERT(payload USING utf8) FROM mqtt.mqtt_msg WHERE topic=${query.topic}`;
    connection.query(sql, (err, result) => {
      if (err){
        ctx.body = {
          cde: 400,
          msg: "No such topic"
        }
        resolve();
      }else{
        result = result.map(item => {
          const splited = item['CONVERT(payload USING utf8)'].split("|@&*&@|");
          return {sender: splited[0], message: splited[1]};
        })
        ctx.body = {
          cde: 200,
          data: result
        }
        console.log(result);
      }
      resolve();
    })
  })
})


app.use(koaCors());
app.use(router.routes());

app.listen(9999);
