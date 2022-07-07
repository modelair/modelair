import { initModel  } from './modelair.mjs'

function testInitModel (model) {
    return initModel(model)

}

const model1 = {
    some: {type: String, default: 'ok'}
}
const model2 = {
    numberDefaults: {type: Number, default: 110},
    numberDefaults2: {sometrash: 1, sometrash2: 110},
    numberType: Number,
    numberNoDefaults: {type: Number},
    stringDefaults: {type: String, default: 'hello world'},
    stringNoDefaults: {type: String},
    booleanDefaults: {type: Boolean, default: true},
    functionDefaults: {type: Function, default: x => console.log(x) },
    dateDefaults: {type: Date, default: new Date()},
    some1: {type: Number, default: 0},
    three: [],

    array: [
        [],{},[],2
    ],
    arrayWith: [{type: String, default: ''}],
    object: {
        one: 1,
        tow: [{type: Boolean}],
        another: {type: String, default: 'defaulttto'}
    }
}
const test = testInitModel(model1)
const test2 = testInitModel(model2)
// console.log(test.functionDefaults('ok'))
console.log(test, test2)
