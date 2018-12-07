module.exports = {
  user: {
    add: 'insert into user (username, account, password, repeatPass, email, phone, card, birth, sex) values (?,?,?,?,?,?,?,?,?)',
    select_name: 'select * from user',
    update_user: 'update user set'
  }
}
