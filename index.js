const express = require('express');
const cors = require('cors');
const news2 = require('./news2.json')
const news3 = require('./news3.json')
const app = express();
const Database = require("@replit/database")
const { getRandomNews, generateId } = require('./Util.js')

// Permite que se puedan hacer peticiones desde el frontal (el otro server)
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

//Crear la base de datos
const db = new Database()


app.get('/', (req, res) => {
  res.send('SEVER STATUS [OK]')
});

let loggedInEmails = [{
  email: 'javiceballosmateo@gmail.com',
  password: '123'
}]

db.set('users', loggedInEmails)
app.post('/check/login', (req, res) => {

  let validation = {
    loggedIn: false
  }

  const email = req.body.email
  const pass = req.body.password


  db.get("users").then(users => {
    users.map(user => {
      if (user.email == email && user.password == pass) {
        validation.loggedIn = true;
        return user;
      }
    })

    console.log('Intento de inicio de sesion: ' + JSON.stringify(validation))
    res.json(validation)
  })
});

app.post('/signin', (req, res) => {

  const email = req.body.email
  const pass = req.body.password

  db.get("users").then(users => {
    const alreadyExists = users.map(user => {
      if (user.email == email && user.password == pass) {
        return true;
      } else {
        return false
      }
    }).filter(a => a)

    let signInresult = {
      signed: false,
      reason: 'User already exist'
    }

    if (!alreadyExists || alreadyExists.length <= 0) {
      console.log('User added')
      users.push({ email: email, password: pass })
      db.set("users", users)
      signInresult.signed = true
      signInresult.reason = 'Added successfully'
    } else {
      console.log('User already exists', 'totalUsers: ' + users.length)
    }

    res.json(signInresult)
  })
})

app.get('/new/:articleid', (req, res) => {
  //Se obtiene el id del articulo/de la noticia
  const articleid = req.params.articleid
  //Se busca en todo el array de noticias, la noticia que coincida en id con el id de la noticia recibido
  const searchedNew = news2.articles.filter(article => article.id == articleid)[0]
  //Se envía la respuesta
  res.json(searchedNew)
});

app.get('/news', (req, res) => {
  //Se filtran las noticias cuya urlImagen sea distinta de nulo
  const filteredNews = news2.articles.filter(article => article.urlToImage != null)
  //Del total de noticias se devuelve el 20% de forma aleatoria llamando a la clase Util
  const randomNews = getRandomNews(filteredNews)
  console.log(`Returning ${randomNews.length}/${filteredNews.length} news`)
  //Se envía la respuesta
  res.json(randomNews)
})

app.get('/makeid', (req, res) => {
  //Se envía la respuesta añadiendo un id ALEATORIO de cada vez
  res.json(news3.articles.map(article => {
    article.id = generateId()
    return article;
  }))

})




app.listen(3000, () => {
  console.log('Server started');
});



