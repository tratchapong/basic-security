const bcrypt = require('bcryptjs')

let pw = "CodeCamp9"

const run = async () => {
  let hpw = await bcrypt.hash(pw, 12)
  console.log(hpw)
}

run()
