'use strict'
/**  подключаемый гибридный монолит */
/**  подключаем модуль express*/
import express from 'express';
/** Подключем работу с доменами*/
import cors from 'cors';
/** Подключаем рабоу с телом запроса */
import bodyParser from 'body-parser';
/** Подключаем рабоу с загрузкой файла */
import fileUpload from 'express-fileupload';
/** Подключаем рабоу путями */
import path from 'path';

/**
 *  В монолите нужно добавиь такие компоненты как :
 *  1. запуск сервиса API  используя коутинг  как вызов компонентов API
 *  2. запуск API в виде процессов с кластеризацией на одномс ервисе
 *  3. работа с базами данных
 *  4. работа с другими  API используя  некий прокси
 *  5. создание прокси
 *  6. возможно добавить работу через проекр сообщаний для API 
 */


/**
 *  Универсальный класс работы с API
 */
class Bapi {
    /**
     * Инициализация класса работы с API
     * @param  {...any} opt Параметры передаваемые при созданини класса
     */
    constructor(...opt){

    }

    /**
     * Класс запуска входящего API микросервиса
     * Даннаф вункция самостоятельно создаёт серверную часть микросервиса, и автоматически маштабируется
     * @param {*} name название микросервиса
     */

    start(name){
        // создаём эксезпляр приложения
        const app = express();
        app.disable('etag');
        app.use(bodyParser.json())
        // прописываем стандартный порт
        const PORT = process.env.PORT || 8888;
        app.use(express.json());
        app.use(fileUpload({
            createParentPath: true
        }));
        console.log('Тут типо старт апи микросервиса');
        app.listen(PORT, () => {
            console.log(`API is listening on port ${name} ${PORT}`);
        }); 
    }
 
}
/**
 *  Универсальный класс работы с базой данных
 */
class Bbd{

}




export { Bbd,Bapi }; 