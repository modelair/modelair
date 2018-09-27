const patterns = require('./patterns')
const address = {type: String, match: patterns.address}
const defaultString = {type: String, default: ''}
const defaultNumber = {type: Number, default: 0}
const defaultBoolean = {type: Boolean, default: false}
const defaultNatural = {type: Number, default: 0, min: 0}
const defaultDate = {
  type: Date, default: function () {
    return Date.now()
  }
}

const stringDefaults = {
  maxlength: {type: Number},
  minlength: {type: Number},
  required: Boolean,
  // default: false,
  match: {type: RegExp, default: /.*/}
}
const numberDefaults = {
  max: {type: Number},
  min: {type: Number},
  required: Boolean
  // default: false,f

}
const ObjectID = 'mongoose-id'
const phone = {type: String, match: patterns.phone, default: ''}
const email = {
  type: String,
  default: '',
  match: patterns.email
}
const http = {type: String, match: patterns.http, default: ''}
const date = {
  created: defaultDate,
  edited: defaultDate
}
const photo = {
  name: defaultString,
  title: defaultString,
  type: defaultString,
  role: defaultString,
  date: date
}
const title = {
  type: String,
  default: '',
  required: true,
  match: patterns.title,
  maxlength: 512,
  minlength: 5
}
const about = {
  type: String,
  default: '',
  required: [true, 'aboutRequired'],
  match: patterns.text,
  maxlength: 4096
}
const image = {
  data: {type: Buffer},
  contentType: defaultString
}

const objects = {
  users: [{type: ObjectID}],
  requests: [{type: ObjectID}]
}
const tag = {
  type: String,
  default: '',
  match: patterns.tag,
  maxlength: 16
}
const contact = {
  country: {type: Number, default: 0},
  state: {type: Number, default: 0},
  city: {type: Number, default: 0},
  phones: [phone],
  address: address,
  email: [email],
  http: [http],
  title: defaultString,
  geo: {
    longitude: {type: Number, default: 53.04433407042824},
    latitude: {type: Number, default: 158.6530367450214},
    zoom: {type: Number, default: 12}
  },
  schedule: {
    open: {
      day: {type: Number, default: 1},
      time: {type: Date, default: new Date(2016, 1, 1, 9, 0, 0, 0)}
    },
    close: {
      day: {type: Number, default: 6},
      time: {type: Date, default: new Date(2016, 1, 1, 18, 0, 0, 0)}
    },
    break: {
      count: {type: Number, default: 0},
      from: {type: Date, default: new Date(2016, 1, 1, 13, 0, 0, 0)}
    }

  }

}
const code = {
  type: String, // тип String
  default: '',
  maxlength: 6,
  minlength: 5,
  match: patterns.code
}
const hexCode = {
  type: String, // тип String
  default: '',
  maxlength: [64, 'maxlength'],
  match: patterns.hex
}
const username = {
  type: String,
  required: [true, 'usernameRequired'],
  maxlength: 64,
  default: '',
  minlength: 4,
  match: patterns.login,
  unique: true
}
const password = {
  type: String,
  default: '',
  minlength: [6, 'tooShort'],
  required: [true, 'passwordRequired'],
  match: /.*/
}
const permissions = {
  type: Number,
  default: 2
}
const wallet = {type: String, minlength: 7}
const uri = {
  type: String,
  match: patterns.uri,
  maxlength: 32,
  unique: true,
  required: [true, 'uriRequired'],
  default: ''
}
module.exports = {
  about,
  code,
  contact,
  date,
  defaultString,
  defaultDate,
  defaultNatural,
  defaultNumber,
  defaultBoolean,
  email,
  image,
  http,
  hexCode,
  numberDefaults,
  objects,
  password,
  permissions,
  photo,
  phone,
  stringDefaults,
  tag,
  title,
  uri,
  username,
  wallet
}
