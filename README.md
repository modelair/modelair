modelair - schema utils
```js
import { initModel } from 'modelair'

const model =  {
    numberDefaults: {type: Number, default: 110},
    numberType: Number,
    numberNoDefaults: {type: Number},
    stringDefaults: {type: String, default: 'hello world'},
    stringNoDefaults: {type: String},
    booleanDefaults: {type: Boolean, default: true},
    booleanNoDefaults: {type: Boolean},

    sometrash: {sometrash: 1, sometrash2: 110},

    functionDefaults: {type: Function, default: x => console.log(x) },
    dateDefaults: {type: Date, default: new Date()},
    inline: {
        hello: {type: Number, default: 0},
        hello2: {type: String, default: ''},
        hello3:{type: String, default: 'hello world'},
    },
    three: []
}
/*
initModel(model) // => 
{
    numberDefaults: 110,
    numberType: undefined,
    numberNoDefaults: undefined,
    stringDefaults: 'hello world',
    stringNoDefaults: undefined,
    booleanDefaults: true,
    booleanNoDefaults: undefined,
    sometrash: { sometrash: 1, sometrash2: 110 },
    functionDefaults: [Function: default],
    dateDefaults: 'Fri Sep 16 2022 16:43:37 GMT+1200 (Petropavlovsk-Kamchatski Standard Time)',
        inline: { hello: 0, hello2: '', hello3: 'hello world' },
    three: [],
        three2: [],
    array: [ [], {}, [], 2 ],
    arrayWith: [ { type: [Function: String], default: '' } ],
    object: { one: 1, tow: [ [Object] ], another: 'defaulttto' }
}
*/

```
