// Import required modules
const { base64encode } = require('nodejs-base64');
const Route = use('Route');


// CAR adonis
Route.get('/cars', async ({ response }) => {
  try {
    const cars = await Database.select('*').from('cars');
    response.send(cars);
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// Specific CAR adonis
Route.get('/cars/:id', async ({ params, response }) => {
  try {
    const { id } = params;
    const car = await Database.select('*').from('cars').where('id', id).first();
    response.send(car);
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// GET SERVICES adonis
Route.get('/getservices', async ({ response }) => {
  try {
    const services = await Database.select('*').from('services');
    response.send(services);
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// UPDATE SERVICES adonis
Route.put('/updateservices/:id', async ({ params, request, response }) => {
  try {
    const { id } = params;
    const { services } = request.post();
    await Database.table('services').where('id', id).update('services', services);
    response.send('Services updated successfully');
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// DELETE SERVICES adonis
Route.delete('/deleteservices/:id', async ({ params, response }) => {
  try {
    const { id } = params;
    await Database.table('services').where('id', id).delete();
    response.send('Services deleted successfully');
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// POST SERVICES adonis
Route.post('/postservices', async ({ request, response }) => {
  try {
    const { services } = request.post();
    await Database.table('services').insert({ services });
    response.send('Services created successfully');
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// GET FEEDBACKS adonis
Route.get('/getfeedback', async ({ response }) => {
  try {
    const feedbacks = await Database.select('*').from('feedbacks');
    response.send(feedbacks);
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// POST FEEDBACK adonis
Route.post('/postfeedback', async ({ request, response }) => {
  try {
    const { name, message, rating, isVerified } = request.post();
    await Database.table('feedbacks').insert({ name, message, rating, isVerified });
    response.send('Feedback created successfully');
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// Schedule adonis
Route.get('/schedule', async ({ response }) => {
  try {
    const schedule = await Database.select('*').from('schedule');
    response.send(schedule);
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// Employee adonis
Route.get('/employe', async ({ response }) => {
  try {
    const employees = await Database.select('*').from('users');
    response.send(employees);
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// LOGIN adonis
Route.post('/login', async ({ request, response }) => {
  try {
    const { email, password } = request.post();
    const user = await Database.select('*').from('users').where('email', email).first();

    if (!user) {
      response.status(401).json({ error: 'Incorrect email' });
    } else {
      if (password === user.password) {
        // Generate token or set cookie
        const token = base64encode(email + ':' + password);
        response.cookie('token', token);
        response.send('Login successful');
      } else {
        response.status(401).json({ error: 'Incorrect password' });
      }
    }
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// GET CONTACT adonis
Route.get('/getcontact', async ({ response }) => {
  try {
    const contact = await Database.select('*').from('contact');
    response.send(contact);
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// POST CONTACT adonis
Route.post('/postcontact', async ({ request, response }) => {
  try {
    const { subject, name, phone, email, message } = request.post();
    await Database.table('contact').insert({ subject, name, phone, email, message });
    response.send('Contact created successfully');
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

// Start Adonis server
const port = 3307;
const host = 'localhost';
Route.listen(port, host, () => {
  console.log(`Adonis server started on http://${host}:${port}`);
});

 
// // settings to connect to sql database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'azer',
//   database: 'ecf'
// });



// // and connect to it
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connecté à la base de données MySQL');
// });

// // ignore restriction of cors
// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// /***  BACKEND adonisS ***/

// // CAR adonis
// adonisr.get('/cars', (req, res) => {
//   const query = 'SELECT * FROM cars';
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//     } else {
//       res.send(results);
//     }
//   });
// });

// // specific CAR adonis
// adonisr.get('/cars/:id', (req, res) => {
//   const carId = req.params.id;
//   const query = 'SELECT * FROM cars WHERE id = ?';
//   connection.query(query, [carId], (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//     } else {
//       res.send(results);
//     }
//   });
// });

// // GET SERVICES adonis
// adonisr.get('/getservices', (req, res) => {
//   const query = 'SELECT * FROM services';
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//     } else {
//       res.send(results);
//     }
//   });
// });

// // UPDATE SERVICES adonis
// adonisr.put('/updateservices/:id', (req, res) => {
//    const servicesId = req.params.id;
//    const msg = req.body.services;
//    const query = 'UPDATE services SET services = ? WHERE id = ?';
//    connection.query(query, [msg, servicesId], (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//     } else {
//       console.log(results);
//       res.sendStatus(200);
//     }
//   });
// });

// // DELETE SERVICES adonis
// adonisr.delete('/deleteservices/:id', (req, res) => {
//   const serviceId = req.params.id;
//   const query = 'DELETE FROM services WHERE id = ?';
//   connection.query(query, [serviceId], (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// // POST SERVICES adonis
// adonisr.post('/postservices', (req, res) => {
//   try {
//     const service = req.body.services;
//     console.log(req);
//     const query = 'INSERT INTO services (services) VALUES (?)';
//     connection.query(query, [service], (error, results) => {
//       if (error) {
//         console.log(error);
//         res.sendStatus(500);
//       } else {
//         res.sendStatus(200);
//       }
//     });
//   } catch (error) {
//       console.error(error);
//       res.sendStatus(500);
//     }
// });

// // GET FEEDBACKS adonis
// adonisr.get('/getfeedback', (req, res) => {
//   const query = 'SELECT * FROM feedbacks';
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//     } else {
//       res.send(results);
//     }
//   });
// });

// // POST FEEDBACK adonis
// adonisr.post('/postfeedback', (req, res) => {
//   try {
//     const { name, message, rating, isVerified } = req.body;
//     const query = 'INSERT INTO feedbacks (name, message, rating, isVerified) VALUES (?, ?, ?, ?)';
//     connection.query(query, [name, message, rating, isVerified], (error, results) => {
//       if (error) {
//         res.sendStatus(500);
//       } else {
//         console.log(results);
//         res.sendStatus(200);
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });


// // schedule adonis
// adonisr.get('/schedule', (req, res) => {
//   const query = 'SELECT * FROM schedule';
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//     } else {
//       res.send(results);
//     }
//   });
// });

// // employe adonis 
// adonisr.get('/employe', (req, res) => {
//   const query = "SELECT * FROM users";
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//     } else {
//       res.send(results);
//     }
//   })
// });

// // LOGIN adonis
// adonisr.post('/login', (req, res) => {
//   console.log(req.body);
//   const { email, password } = req.body.input;
//   const query = 'SELECT * FROM users WHERE email = ?';
//   connection.query(query, [email], (error, results) => {
//     if (error) {
//       res.sendStatus(500);
//     } else {
//       if (results.length === 0) {
//         res.status(401).json({ error: 'Email incorrect' });
//       } else {
//         // get user and compare password
//         const user = results[0];
//         try {
//           if(password === user.password) {
//             // const id = user.id
//             // res.cookie('sessionID', 'cookie value', { maxAge: 900000, httpOnly: true });
//             // res.send('Cookie crée');
//           } else {
//             res.status(401).json({ success: false, error: 'Mot de passe incorrect' });
//           }
//         } catch (error) {
//           console.log(error);
//         }
//         // bcrypt.compare(password, user.password, (err, passwordMatch) => {
//         //   console.log(password + " " + user.password);
//         //   if (err) {
//         //     console.log(err);
//         //     res.sendStatus(500);
//         //   } else {
//         //     if (passwordMatch) {
//         //       res.status(200).json({ success: true });
//         //     } else {
//         //       res.status(401).json({ success: false, error: 'Mot de passe incorrect' });
//         //     }
//         //   }
//         // });
//       }
//     }
//   });
// });

// adonisr.get('/get-cookie', (req, res) => {
//   // Récupérer la valeur du cookie nommé "cookie_name"
//   const cookieValue = req.cookies.cookie_name;
//   console.log(cookieValue);

//   // Envoyer la valeur du cookie dans la réponse
//   res.send(`Valeur du cookie : ${cookieValue}`);
// });

// // log out 
// // app.get("/logout", authorization, (req, res) => {
// //   return res
// //     .clearCookie("access_token")
// //     .status(200)
// //     .json({ message: "Successfully logged out 😏 🍀" });
// // });

// // GET CONTACT adonis
// adonisr.get('/getcontact', (req, res) => {
//   const query = 'SELECT * FROM contact';
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//     } else {
//       res.send(results);
//     }
//   });
// });

// // POST CONTACT adonis
// adonisr.post('/postcontact', (req, res) => {
//   try {
//     const { subject, name, phone, email, message } = req.body;
//     const query = 'INSERT INTO contact (subject, name, phone, email, message) VALUES (?, ?, ?, ?, ?)';
//     connection.query(query, [subject, name, phone, email, message], (error, results) => {
//       if (error) {
//         res.sendStatus(500);
//       } else {
//         res.sendStatus(200);
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });



// // start backend server
// app.use('/api', adonisr);

// const port = 3307; 
// app.listen(port, () => {
//   console.log(`Serveur backend démarré sur le port ${port}`);
// });
