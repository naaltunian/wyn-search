const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/typedefs');
const { resolvers } = require('./graphql/resolvers');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Image upload middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// JWT token middleware
app.use(async (req, res, next) => {
  const bearerToken = req.headers['authorization'];
  if (bearerToken) {
    try {
      const token = bearerToken.split(' ')[1];
      const currentUser = await jwt.verify(token, process.env.SECRET);
      console.log('middleware', currentUser);
      req.currentUser = currentUser;
    } catch (err) {
      console.log('middlware error', err);
    }
  }
  next();
});

// database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

const conn = mongoose.connection;

// Init gridfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create Storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const fileName = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          fileName: fileName,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// upload route
app.post('/', upload.single('file'), (req, res, err) => {
  if (err) throw err;
  res.json({ file: req.file });
  res.status(201).send();
});

// get all files
app.get('/files', (req, res) => {
  gfs.files.find().toArray((error, files) => {
    // Check if files exist
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
    // Files exist
    return res.json(files);
  });
});

// get route for one file
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    return res.json(file);
  });
});

// get route for an image
app.get('/images/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

app.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id });
});

// graphQL server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = req.currentUser;
    return user;
  }
});
// apply graphQL middleware
server.applyMiddleware({ app, cors: false });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
