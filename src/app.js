import express from "express";
import userRoutes from './routes/users_routes'
import gruposRoutes from './routes/grupos_routes'
const cors = require('cors');
const morgan = require("morgan");
const config = require("../config/config");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// Routes
app.use(userRoutes);
app.use(gruposRoutes);

export default app