import { init, initModel } from './modelair.mjs'

function testInitModel (model) {
    return initModel(model)

}

const model1 = {
    capacity: {type: Array, default: [], maxlength: 100},
    capacity2: [{type: Number, default: 0, max: 100}]
}
const model3 = {
    capacity: {type: Number, default: 1},
    creator: {type: Number, default: 0},
    date: {type: Date, default: () => new Date()},
    distance: {type: Number, default: 0}, // meters
    description: {type: String, default: '', maxlength: 2048},
    duration: {
        type: Number,
        default: 0
    }, // hours
    guides: [],
    geo: {
        starts: {type: String, default: ''},
        ends: {type: String, default: ''},
        coverage: [] // array of coverage localities
    },
    likes: {type: Number, default: 0},
    method: {type: Number, default: 0},
    path: [],
    places: [],
    points: [],
    price: {
        currency: {type: Number, default: 0},
        from: {type: Number, default: 0},
        to: {type: Number, default: 0},
    },
    rating: {type: Number, default: 0},
    supplier: {type: Number, default: 0},
    tags: [],
    title: {
        type: String,
        default: '',
        minlength: 8,
        maxlength: 128
    },
    user: {type: Number, default: 0},
}
const model2 = {
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
    three: [],
    three2: [],

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
const test1 = testInitModel(model1)
const test2 = testInitModel(model2)
const test3 = testInitModel(model3)
const test4 = init(model3)
// console.log(test.functionDefaults('ok'))
console.log(test1)
console.log(test2)
console.log(test3)
console.log(test4)
