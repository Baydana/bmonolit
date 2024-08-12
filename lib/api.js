'use strict'
/**   подключаем системный модуль крпито */

import * as bcrypto from "bcryptos";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import serialize from "w3c-xmlserializer";
import moment from 'moment';


class Tag {
    // буферная переменная для компиляции dom
    bufdom = {};
    // буферная вспомогательная переменная, для сохранения адресации элементов DOM
    bufxml = {};
    // буферная переменная для компиляции ssl элементов
    bufssl = {};
    // объявляем понструктор класса
    constructor() {
        //! пока определяем по умолчанию всегда тип html5 
        //! потом добавить возможность указывать его при вызове класса
        this.tip = 'html5f';
        // инициализирумем пременную класса по умолчанию
        let vart = bcrypto.bid4();
        this.tagmap = {
            "sta": vart,
            "tip": "html5",
            "cha": moment().format(),
            "tag": {
                [vart]: {
                    "typ": "blok",
                    "cha": moment().format(),
                }
            }
        }
    }

    /**
     * 
     * @param {*} data переменная с данными тега
     * @returns возвразает список ID созданных тегов
     */
    tag(data) {
        let id = {};
        // если создался один элемент то возвращаем его
        if (id.length = 1) {
            return id[0];
        } else {
            // если создался массив то возвращаем массив
            return id;
        }
    }

    /**
     * Функция добавления тега в массив.
     * @param {*} opt перенеммея со значениямитега,  и с  адресом его позиционирования
     */
    addtag(opt = {}) {
        var err = false; // переменная со статусом ошибки
        // проверяем указан ли родительский тег
        if (opt['pid'] == undefined) {
            console.log('Не указан родительский тег');
            err = true;
        } else {
            // проверяем существует ли родительский тег
            if (this.tagmap['tag'][opt['pid']] == undefined) {
                console.log('Не найден родительский тег');
                err = true;
            }
        }
        if (!err) {
            console.log('Ошибок не найдено');
        }

    }

    /**
     * Функция для внесения изменений в тег
     * @param {*} opt переменная с параметрами изменения тега
     * ! добавить, если у тега не указан родитель то просто двигать в нутри уже существующего родителя
     */
    editag(opt = {}) {
        var err = false; // переменная со статусом ошибки
        var id = opt['id']; // получаем id тега который нужно зименить
        // проверяем указан ли ID тега 
        if (id == undefined) {
            err = true;
        } else if (this.tagmap['tag'][id] == undefined) { // проверяем  существует ли тег
            err = true;
        }
        if (!err) {
            this.tagmap['tag'][id]['cha'] = moment().format();
            // Если указан родительский элемент то меняем родителя
            if (opt['par'] != undefined && this.tagmap['tag'][opt['par']] != undefined && opt['id'] != this.tagmap['sta']) {
                // определяем позицию в родительском теге
                let did = this.tagmap['tag'][opt['par']]['chi'].indexOf(id);
                // по определённой позиции удаляем из родительсвого тега
                this.tagmap['tag'][opt['par']]['chi'].splice(did, 1);
                // меняем в теге  ID родительского тега
                this.tagmap['tag'][id]['par'] = opt['par'];
                // проверяем, указана ли позиция перемещения
                if (opt['poz'] == undefined) {
                    // если позиция не указана то ставим  параметр ставить в конец
                    opt['poz'] = 'end';
                } else {
                    // проверяем, корректность указания  позиций
                    if (opt['poz'] != 'end' && opt['poz'] != 'top' && isNaN(parseInt(opt['poz']))) {
                        // если позиция не указана то ставим  параметр ставить в конец
                        opt['poz'] = 'end';
                    }
                }
                // проверяем существует ли параметр дети у родительского тега, если нет то создаём его
                if (this.tagmap['tag'][opt['par']]['chi'] == undefined) {
                    this.tagmap['tag'][opt['par']]['chi'] = [];
                }
                // добавляем элемент в родителя с указанием места добавления
                switch (opt['poz']) {
                    case 'end': { // добавляем тег в конец массива
                        this.tagmap['tag'][opt['par']]['chi'].push(id);
                    } break;
                    case 'top': { // добавляем тег в начало массива
                        this.tagmap['tag'][opt['par']]['chi'].unshift(id);
                    } break;
                    default: { // добавляем элемент в указанное место
                        this.tagmap['tag'][opt['par']]['chi'].splice(opt['poz'], 0, id);
                    } break;
                }
            }
            console.log('Ошибок не найдено');
        }
    }

    /**
    * функция определения названия типа тега 
    * @param {*} id идентификатор тега
    * @param {*} opt  опции для сборки тега
    * @returns  на выхоте название типа тега
    */
    gtype(id = '', opt = {}) {
        // создаём тип тега по умолчанию
        let type = 'tag';
        // если  сбока html5 то тип тега по умолчанию div
        switch (this.tagmap['tip']) {
            case 'html': {
                if (this.tagmap['tag'][id] == undefined) { // если  тип тега не указан то по умолчанию div
                    type = 'div';
                } else {
                    if (this.tagmap['tag'][id]['typ'] == 'blok') {
                        switch (this.tagmap['tag'][id]['pty']) {
                            case 'lin': { type = 'a'; } break;
                            case 'htm': { type = 'html'; } break;
                            case 'hea': { type = 'head'; } break;
                            case 'bod': { type = 'body'; } break;
                            case 'but': { type = 'but'; } break;
                            default: { type = 'div'; } break;
                        }

                    } else {
                        type = this.tagmap['tag'][id]['typ']; // если тип тега указан, то ставим его
                    }
                }
            } break;
            default: { // по умолчанию ставим XML
                if (this.tagmap['tag'][id] == undefined) { // если  тип тега не указан то по умолчанию xml
                    type = 'xml';
                } else {
                    type = this.tagmap['tag'][id]['typ']; // если тип тега указан, то ставим его
                }
            } break;
        }
        return type;
    }

    /**
     * Функция сборки xml по заданным параметрам
     * @param {*} opt переменная с параметрами сборки
     * @returns результат сборки в виде сереализованного дом элемента
     */
    sborka(opt = {}) {
        // Для начала сборки, определяемся со стартовым root тегом
        // по умолчанию, стартовым тегом назначем стартовый тег блока
        let sta = this.tagmap['sta'];
        // Выставляем флаг этоговой сборки по умолчинию на ВКЛ
        let fas = true;
        // Если указан стартовый тек для сборки, то  пробуем получить его 
        if (opt['sta'] != undefined && this.tagmap['tag'][opt['sta']] != undefined && this.tagmap['sta'] != opt['sta']) {
            // указываем стартовый тег для сборки
            sta = opt['sta'];
            // если сборка не со стартового тега блока, то указываем фрагментарную сборку
            fas = false;
        }
        // получаем тип стартового тега
        let typ = this.gtype(sta);
        //! Если идёт сборка конечного элемента, то собираем html страницу, если требуется собрать часть кода то определяемся с частью кода
        //this.bufdom = new JSDOM(`<${typ} class="${sta}{{${sta}}}"/>`, { contentType: "text/xml", storageQuota: 10000000 });
        if (this.tagmap['tip'] == 'html') {
            let doc = '';

            // если тип стартового блока html то добавляем признак документа
            // ! добавить так же вызов документа, при  передаче параметра о  генерации с признаками документа
            if (typ == 'html') {
                switch (this.tagmap['pti']) {
                    case '5': doc = '<!DOCTYPE html>'; break;
                    case '4.01': doc = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">'; break;
                    case '1.0': doc = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'; break;
                    case '3.2': doc = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">'; break;
                    default: doc = ''; break;
                }
            }
            this.bufdom = new JSDOM(`${doc}<${typ}/>`, { contentType: "text/xml", storageQuota: 10000000 });
        } else {
            this.bufdom = new JSDOM(`<${typ}/>`, { contentType: "text/xml", storageQuota: 10000000 });
        }

        this.bufxml[sta] = this.bufdom.window.document.querySelector(typ);
        this.perebor();


        return this.bufdom.serialize();
    }
    /**
     *  функция создания эдемента
     * @param {*} id  идентификатор тега который нужно создать
     */
    newtag(id = null) {
        // получаем тип тега
        let typ = this.gtype(id);
        // проверяем не создан ли уже тег, что бы повторно его не создавать
        if (this.bufxml[id] == undefined) {
            // создаём тег в документе тегов
            this.bufxml[id] = this.bufdom.window.document.createElement(typ);
            // присваиваем тегу класс
            // если тип сборки html то добавляем класс, для построения стилей
            //! добавить теги , к которым не нужно создавать класс
            if (this.tagmap['tip'] == 'html' && ['html', 'head'].includes(typ) == false) {
                this.bufxml[id].setAttribute('class', `${id} {{C_${id}}}`);
            }
        }
    }

    /**
    *  Функция перебора тегов, для сбора DOM делева и SSL
    * @param {*} id идентификатор собираемого элемента 
    * @param {*} opt опции сборки
    */
    perebor(id = null, opt = {}) {
        // если ID не указан, то начинаем сборку со стартового тега
        if (id == undefined || id == null) {
            id = this.tagmap['sta'];
        }
        // проверяем передан ли ID и существует ли он undefined и существует ли тег
        if (id != undefined && id != null && this.tagmap['tag'][id] != undefined) {
            // получаем тип тега
            let typ = this.gtype(id);
            // устанавливаем id родительсого тега
            let pid = this.tagmap['tag'][id]['par'];
            // если тип тега текст и у него есть родительский тег то просто вставляем его как вставку
            if (this.tagmap['tag'][pid] != undefined && typ == 'text') {

                this.bufxml[pid].innerHTML += `{{T_${id}}}`;
            } else {
                // проверяем есть ли у тега родительский тег и создан ли он в тедеве тегов
                if (this.tagmap['tag'][pid] != undefined || id == this.tagmap['sta']) {
                    // обнуляем указатель родительского элемента
                    this.newtag(id);
                }
                // проверяем не равен ли ID стартовому тегу, что бы не добавить тег сам в себя
                if (id != this.tagmap['sta']) {
                    // добсвляем созданный тег в родительский
                    this.bufxml[pid].append(this.bufxml[id]);
                }
                //! тут добавить  добавление текста или  тегов детей, пока что вставляем текст
                this.bufxml[id].innerHTML += `{{T_${id}}}`;
                // если у тега есть дочерние теги то проходим и по ним
                if (this.tagmap['tag'][id]['chi'] != undefined && this.tagmap['tag'][id]['chi'].length > 0) {
                    // начинаем перебор дочерних элементов
                    console.log(this.tagmap['tag'][id]['chi']);
                    this.tagmap['tag'][id]['chi'].forEach(cid => {
                        console.log(cid + ';');
                        this.perebor(cid);
                    });

                }
            }
        }
    }

    /**
    * Функия выгрузки  данных в виде массива
    */
    toArray() {
        return this.tagmap;
    }

    /**
    *  Функцуия загрузки xml из массива
    */
    fromArray(arr) {
        if (arr) {
            this.tagmap = arr;
        }
    }

    /**
     * Функция печати массива тегов  на экан
     */
    print() {
        // выводим содержимое 
        //console.log(this.tagmap);
    }
}


export { bcrypto, Tag }; 