// index.js

const Koa = require('koa');
const Router = require('koa-router');
const koaCors = require('koa-cors');
const mysql = require('mysql');

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

var current_max_item_id = 0;
connection.query("SELECT MAX(id) FROM test.new_table", (err, result) => {
  if(err) throw err;
  current_max_item_id = result['0']['MAX(id)'];
  console.log("Market Id starting from: ", current_max_item_id);
})

router.get('/', ctx => {
  console.log(ctx)
  ctx.body = 'Visit index';
})

/***************************************
    Market Segment
***************************************/
// get the whole market table
router.get('/getItems', ctx => {
  return new Promise(resolve => {
    console.log(ctx.query.page);
    const sql = `SELECT test.new_table.title as title, test.new_table.price as price, 
    test.new_table.description as description,test.new_table.create_time as create_time,
    test.users.username as username,test.users.email as email,test.new_table.image as image,
    test.new_table.id as id, test.new_table.creater as creater
    FROM test.new_table
    INNER JOIN test.users ON test.new_table.creater=test.users.id
    ORDER BY test.new_table.id LIMIT ${ctx.query.page},4`;
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

router.get('/getItem', ctx => {
  return new Promise(resolve => {
    const sql = `SELECT test.new_table.title as title, test.new_table.price as price, 
    test.new_table.description as description,test.new_table.create_time as create_time,
    test.users.username as username,test.users.email as email,test.new_table.image as image,
    test.new_table.id as id, test.new_table.creater as creater
    FROM test.new_table
    INNER JOIN test.users ON test.new_table.creater=test.users.id
    WHERE test.new_table.id = ${ctx.query.id}
    ORDER BY test.new_table.id LIMIT 0,4`;
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

// get specific market table, modify name later
router.get('/fetchItems', ctx => {
  return new Promise(resolve => {
    const sql =`SELECT test.new_table.title as title, test.new_table.price as price, 
    test.new_table.description as description,test.new_table.create_time as create_time,
    test.users.username as username,test.users.email as email,test.new_table.image as image,
    test.new_table.id as id, test.new_table.creater as creater
    FROM test.new_table
    INNER JOIN test.users ON test.new_table.creater=test.users.id
    WHERE test.new_table.title LIKE '%${ctx.query.title}%'
    ORDER BY test.new_table.id LIMIT ${ctx.query.page},4`;
/*    `SELECT test.new_table.title, test.new_table.price, test.new_table.description,test.new_table.create_time,
    test.users.username
    FROM test.new_table
    INNER JOIN test.users ON test.new_table.creater=test.users.id
*/  
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
    const sql = `SELECT test.new_table.title as title, test.new_table.price as price, 
    test.new_table.description as description,test.new_table.create_time as create_time,
    test.users.username as username,test.users.email as email,test.new_table.image as image,
    test.new_table.id as id, test.new_table.creater as creater
    FROM test.new_table
    INNER JOIN test.users ON test.new_table.creater=test.users.id
    WHERE test.new_table.id = ${ctx.query.id} AND test.new_table.title LIKE '%${ctx.query.title}%'`;
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

//get the size of data
router.get('/getSize', ctx => {
  return new Promise(resolve => {
    const sql = `SELECT COUNT(*) AS SIZE FROM test.new_table`
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

//get the size of specific data
router.get('/fetchSize', ctx => {
  return new Promise(resolve => {
    const sql = `SELECT COUNT(*) AS SIZE FROM test.new_table WHERE test.new_table.title LIKE '%${ctx.query.title}%'`;
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
    const query = ctx.query;
    const sql = `INSERT INTO test.new_table(id, creater, image, description, price, create_time, title)
    VALUES( NULL , '${query.creater}', '${query.image}', '${query.description}', '${query.price}', '${query.create_time}', '${query.title}')`;
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

//record new users
router.get('/insertUser', ctx => {
  return new Promise(resolve => {
    const query = ctx.query;
    const sql = `INSERT INTO test.users(id, userName, ImageUrl)
    VALUES('${query.id}', '${query.userName}', '${query.ImageUrl}')`;
    connection.query(sql, (err) => {
      if (err){
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
          msg: err
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



app.use(koaCors());
app.use(router.routes());

app.listen(9999);
