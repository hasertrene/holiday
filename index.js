const express = require('express')
const app = express()

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening to port ${port}`))

app.use(express.static("public"));
app.set("view engine", "ejs"); 

function render(nameInput, peopleInput, yearInput, statusInput, amountInput){
  const burglar = amountInput > 1 
  ? 's, your vacation won\'t be too long (burglars)...' 
  : ', bring it along!'

  const background = yearInput < 1990 ? 'calm' : 'sahara'

  const birth = background === 'calm' 
  ? "We\'ve thought of a calm and cool vacation for you, since you're not that young anymore..."
  : "We figured you like it hot!" 

  function partyOf(people, status){
    if(people == 2 && status == ('married' || 'relationship')){
    return `You seem to be going on a romantic holiday. Here are some activities:\n
    <ul>
    <li>Have sex</li>
    <li>Have dinner, with candle light</li>
    <li>Make a baby</li>
    </ul>`
    } else if (people >=2){
    return `We have some group activities lined up for you:\n
    <ul>
    <li>Throw a ball to the person next to you</li>
    <li>Sit in a circle</li>
    <li>Smile at each other</li>
    </ul>`
    } else if (people == 1){
    return `Going solo! Here are some activities for your lonesome trip:\n
    <ul>
    <li>Masturbate</li>
    <li>Throw a ball to the wall</li>
    <li>Masturbate again, maybe</li>
    </ul>`
    }
  }

  function pic(people, status){
    if(people == 2 && status == ('married' || 'relationship')){
      return 'romance'
    } else if(people >=2){
      return 'group'
    } else if(people == 1){
      return 'solo'
    }
  }  

  const page = `
  <html>
  <head>
      <title>Holiday plans</title>
    </head>
    <link href="css/style.css" rel="stylesheet">
    <body style="background-image: url('images/${background}.jpeg');">
      <h1>Welcome ${nameInput}</h1>
      <h2>This your personalised holiday plan!</h2>
      <h3>Since you own ${amountInput} computer${burglar}</h3>
      <p>input:name&amountOfPeople&birthYear&maritalStatus&computerAmount</p>
      <div id="content">
        <div class="col1">
          <h2>Activities</h2>
          <p>${partyOf(peopleInput, statusInput)}</p>
        </div>
        <div class="col2">
          <img src="images/${pic(peopleInput, statusInput)}.png"
        </div>
      </div>
      </body>
  </html>
  `
  return page
}

app.get('/:name&:people&:year&:status&:amount', (req, res) =>{
  
  const {name, people, year, status, amount} = req.params
  res.send(render(name, people, year, status, amount))

  
})