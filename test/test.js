import * as btag from "../lib/api.js";

import * as bcryptos from "bcryptos";


import * as fs from 'fs';
const data = JSON.parse(fs.readFileSync('./test/etalonhtml5.json'));

var tegs = new btag.Tag();

tegs.fromArray(data);
let dat = {
    'id': "sU-NcpQBSbquqQZexiV-IA",
    /* 'par': "mZwNdvE-QfqYjhCv9VYEhw",*/
    'poz': 1
};
tegs.editag(dat);



console.log(tegs.toArray());
console.log(tegs.sborka());

