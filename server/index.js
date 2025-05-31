require('dotenv').config(); 
const models = require('./models/models');
const express = require('express');
const sequelize = require('./db');
const PORT = process.env.PORT || 8081;
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index')  // Подключаем роуты
const ErrorHandler = require('./middleware/ErrorHandlerMidlware');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/staticCard', express.static(path.join(__dirname, 'staticCard')));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true })); // Включаем обработку файлов
app.use('/api', router);  // Указываем префикс для всех маршрутов
app.use(ErrorHandler)

const start = async () => {
    try {
        

        await sequelize.authenticate();  // Проверка подключения
        await sequelize.sync();          // Синхронизация с базой данных
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
};

start();
