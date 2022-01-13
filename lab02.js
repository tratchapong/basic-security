
let pw = "CodeCamp9"
let dbHashed1 = "$2a$12$tdH7jcT5xZFZEnAgkO7nDOHGyj7JduTv3YKczYVnoZIOm72fdgx2W"
let dbHashed2 = "$2a$12$KL9LLNY3OVNu0NH3eNQdOOYhpe43.HW4.2nRLoXIeFP4WAG1U1vlK"

const run = async () => {
  // let hpw = await bcrypt.hash(pw, 12)
  let checkPw1 = await bcrypt.compare(pw, dbHashed1)
  let checkPw2 = await bcrypt.compare(pw, dbHashed2)
  console.log(checkPw1)
  console.log(checkPw2)
}

run()