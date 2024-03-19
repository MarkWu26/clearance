const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();

require("dotenv").config();
const jwt = require('jsonwebtoken');
const TokenService = require('./services/TokenService');
const corsOptions ={
  //origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}


const instance = axios.create({
  baseURL:"http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccToken();
    if(token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const origConfig = err.config;

    if(err.response){
      if(err.response.status === 403 && !origConfig._retry){
        origConfig._retry = true;

        try {
          const rs = await instance.post("/auth/tkn", {
            refreshToken: TokenService.getLocalRFToken()
          });
          console.log(rs);

          const { accessToken } = rs.data;

          console.log("updateNewAccessToken", accessToken);
          TokenService.updateNewAccessToken(accessToken);

          return instance(origConfig);
        }catch(_error){
          return Promise.reject(_error);
        }
      }
    }
  }
);


app.use(cors(corsOptions));
const session = require('express-session')
app.use(session({
  secret : 'cloudmine',
  resave : true,
  saveUninitialized : true
}));

const PORT = 3000;

//ROUTES
const clearanceRoutes = require('./Routes/ClearanceRoutes');
const periodRoutes = require('./Routes/ClearancePeriod');
const authRoutes = require('./Routes/Auth');
const userRoutes = require('./Routes/User');
const unitRoutes = require('./Routes/Unit');
const uploadRoutes = require('./Routes/UploadFile');
const formsRoutes = require('./Routes/Forms');
const officeRoutes = require('./Routes/Office');
const groupRoutes = require('./Routes/Groups')

//CONTROLLERS
//const loginController = require('./Controllers/AuthController');

app.listen(PORT, () => {
    console.log(`listening at port http://localhost:${PORT}`);
});



app.use(bodyParser.json());
app.use (bodyParser.urlencoded({extended:true}));

app.use(express.json());



app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(cors());
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/units', unitRoutes);
  app.use('/offices', officeRoutes);
  app.use('/forms', formsRoutes);
  app.use('/upload-and-parse', uploadRoutes);
  app.use('/clearance', clearanceRoutes);
  app.use('/clearance-period', periodRoutes);
  app.use('/groups', groupRoutes)
  app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
  });