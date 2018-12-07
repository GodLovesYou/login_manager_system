const express = require('express')
const router = express.Router()
const models = require('../db/db')
const mysql = require('mysql')
const sqlMap = require('../db/sqlMap')

const conn = mysql.createConnection(models.mysql)

conn.connect()

let jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.send('err')
  } else {
    res.send(ret)
  }
}

let dateStr = function (str) {
  return new Date(str.slice(0, 7))
}

router.post('/addUser', (req, res) => {
  let sql = sqlMap.user.add
  let params = req.body
  conn.query(sql, [params.name, params.account, params.pass, params.checkPass,
    params.email, params.phone, params.card, dateStr(params.birth), params.sex], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

/* GET home page. */
router.post('/login', function (req, res) {
  let sqlName = sqlMap.user.select_name
  let params = req.body
  let keywords = JSON.parse(Object.keys(params)[0])
  if (keywords.name) {
    sqlName += " where username ='" + keywords.name + "'"
    console.log(sqlName)
  }
  conn.query(sqlName, keywords.name, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      res.send('-1')
    } else {
      let resultArray = result[0]
      if (resultArray.password === keywords.password) {
        jsonWrite(res, result)
      } else {
        res.send('0')
      }
    }
  })
})

module.exports = router
