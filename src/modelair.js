const ObjectID = 'mongoose-id'
const __Buffer = 'mongoose-buffer'
const defaultFields = [
  'type',
  'default',
  'required'
]

const isPrimitive = function (obj) {
  return obj instanceof String ||
    obj instanceof Number ||
    obj instanceof Boolean ||
    obj instanceof Date
}
const defaultByClass = function (obj) {
  let out
  switch (obj) {
    case String: {
      out = ''
      break
    }
    case Number: {
      out = 0
      break
    }
    case Boolean: {
      out = false
      break
    }
    case Date: {
      out = Date.now()
      break
    }
    case Array: {
      out = []
    }
  }
  return out
}
const eraseArrays = function (scheme = {}) {
  for (let field in scheme) {
    let type = typeof scheme[field]
    if (type === 'object') {
      if (scheme[field] instanceof Array) {
        if (scheme[field][0] === ObjectID || scheme[field][0] === '') {
          scheme[field] = []
        }
        if (typeof scheme[field][0] === 'object') {
          let mod = 'default' in scheme[field][0] && 'type' in scheme[field][0]
          mod ? scheme[field] = [] : eraseArrays(scheme[field][0])
        }
      }
    }
  }
}
const ignoredFields = {
  '$data': '-1',
  'min': -1,
  'max': -1,
  'maxlength': -1,
  'minlength': -1,
  'required': false,
  'unique': false,
  'default': undefined,
  'type': '-1',
  'match': /.*/,
  'index': -1,
  'trim': false,
  'lowercase': false,
  'uppercase': false
}
const clone = function (model) {
  let out = {}
  for (let i in model) {
    let type = typeof model[i]
    if (type === 'object') {
      model[i] instanceof Object && (out[i] = clone(model[i]))
      // else тут нет, так как массивы длиной больше 1 не предполагаются Mongoose-like моделью
      if (model[i] instanceof Array) {
        let _f = model[i][0]
        if (typeof _f === 'object') {
          for (_f in defaultFields) {
            if (_f in model[i]) {
              out[i] = model[i]
              continue
            }
          }
          if (isPrimitive(_f)) {
            out[i] = model[i]
          }
          if (_f === ObjectID) {
            out[i] = []
          }
          if (_f === __Buffer) {
            out[i] = []
          }
        }
      } else {
        out[i] = model[i]
      }
    }
    type === 'string' && (out[i] = model[i].toString())
    type === 'boolean' && (out[i] = !!model[i])
    type === 'number' && (out[i] = +model[i])
    type === 'function' && (out[i] = model[i])
  }
  return out
}

// cleaned ref or copy model from standard mongoose-model definitions like // foo: {type: Number, default: 22} => { foo: 22 }
const init = scheme => {
  // console.log('INIT CALLED', scheme)
  let obj = clone(scheme)
  return initModel(obj)
}
const initModelField = field => {
  if (typeof field === 'function') return field()
  if (field === ObjectID) {
    return field
  }
  if (field === __Buffer) {
    return field
  }
  if (field instanceof RegExp) {
    return field
  }

  if (typeof field === 'object') {
    if (field instanceof Array) {
      if (field[0] === ObjectID) {
        return [ObjectID]
      }
      if (typeof field[0] === 'object') {
        return [initModelField(field[0])]
      }
      if (typeof field[0] === 'function') {
        return [field[0]()]
      }
    }
    if (field['type']) {
      if (field['type'] === __Buffer) {
        return []
      }
      if (field['default']) {
        if (typeof field.default === 'function') {
          return field.default()
        } else {
          return field['type'](field.default)
        }
      } else {
        if (field['type'] === __Buffer) {
          return []
        }
        if (typeof field['type'] === 'function') {
          return field.type()
        } else {
          return field
        }
      }
    } else {
      return init(field)
    }
  }
  return field
}
const initModel = scheme => {
  let out = {}
  for (let field in scheme) {
    let type = typeof scheme[field]
    let initField = initModelField(scheme[field])
    if (type === 'object') {
      if (typeof initField === 'object') {
        out[field] = Object.keys(initField).length ? initModel(scheme[field]) : init(scheme[field])
      } else {
        out[field] = initField
      }
    } else {
      out[field] = initField
    }
  }
  return out
}
// add to object every undefined model properties

const initMissing = (scheme, target) => initMissingWith(scheme, target, true)

const initMissingWith = (scheme, target, skipDefaults) => {
  if (scheme === undefined) {
    console.error('[undefined model @ initMissing]')
  }
  // console.log('initMissingWith', `scheme ${scheme}`, `target ${target}`, skipDefaults)
  for (let x in scheme) {
    let item = x
    if (item in target) {
      if (skipDefaults) {
        for (let field in ignoredFields) {
          if (field === item) {
            target[item] = ignoredFields[field]
            break
          }
        }
      }
      if (scheme[item] === ObjectID) target[item] = ObjectID
      if (scheme[item] === __Buffer && item !== 'type') {
        target[item] = Buffer
        if (Buffer.isBuffer(target[item])) continue
        else target[item] = {}
      }
      if (typeof target[item] === 'object') {
        if (scheme[item].type === __Buffer) {
          target[item] = []
        } else if (scheme[item] instanceof Array) {
          if (target[item] instanceof Array) {
            if (typeof target[item][0] === 'object') {
              'type' in target[item][0]
                ? target[item] = [] : initMissing(scheme[item], target[item])
            }
          }
          if (target[item][0] === ObjectID) {
            target[item] = []
          }
        } else {
          initMissing(scheme[item], target[item])
        }
      }
    } else {
      //  console.log("MISSING " + item, model[item], initModelField(model[item]), " for ",model )
      target[item] = initModelField(scheme[item])
    }
  }
  return target
}
// const addMissing = (schema, target = false) => {
//   if (!schema || !target) return console.error('[undefined model in initMissing]')
//   for (let s in schema) {
//     if (s in target) {
//       if (
//         schema[s] === ObjectID &&
//         (target[s] = -1) &&
//         ignoredFields.find((i) => i === s)
//       ) continue
//     }
//   }
// }
/* removes all $-signed fields */

const ___validate = (value, model, deep) => {
  if (value === '' && 'required' in model) {
    return false
  }
  let out = ''
  if ('type' in model) {
    switch (model.type) {
      case String: {
        out = ''
        break
      }
      case Number: {
        if (Number.isNaN(+value)) {
          return false
        }
        if ('min' in model) {
          if (value < model.min) {
            return false
          }
        }
        if ('max' in model) {
          if (value < model.max) {
            return false
          }
        }
        break
      }
      case Boolean: {
        if (value !== true && value !== false) {
          return false
        }
        break
      }
    }
  }
  return out
}
const ___validateModel = (schema, model, showErrors) => {
  let errors = []
  for (let item in schema) {
    if (item in model) { // check for same schemas field in inner model with data
      const type = 'type' in item // check for type prop in field
      const match = 'match' in item
      const required = 'required' in item
      const value = model[item]
      if (type) {
        switch (model.type) {
          case String: {
            if (match) {
              if (match.test(value)) {
                continue
              } else {
                if (showErrors) {
                  errors.push({field: value})
                  continue
                } else {
                  return false
                }
              }
            }
            if (required) {
              if (value.trim() !== '') {
                continue
              } else {
                if (showErrors) {
                  errors.push({field: value})
                  continue
                } else {
                  return false
                }
              }
            }
            break
          }
          case Number: {
            if (Number.isNaN(+value)) {
              return false
            }
            if ('min' in model) {
              if (value < model.min) {
                return false
              }
            }
            if ('max' in model) {
              if (value < model.max) {
                return false
              }
            }
            break
          }
          case Boolean: {
            if (value !== true && value !== false) {
              return false
            }
            break
          }
        }
      }
    }
  }
  return errors.length > 0 ? errors : true
}

const validate = (schema, value) => {
  let error = false
  let message = ''
  let type = typeof schema
  if (!value || !schema) return {error: 400}
  if (type === 'function') {
    error = false
  }
  if (type === 'object') {
    let maxLength = false
    let minLength = false
    let max = false
    let min = false
    let match = false
    let type = false
    if ('maxlength' in schema) {
      if (schema.maxlength > -1) {
        maxLength = schema.maxlength instanceof Array ? value.length > schema.maxlength[0] : value.length > schema.maxlength
      }
    }
    if ('minlength' in schema) {
      if (schema.minLength > -1) {
        minLength = schema.minlength instanceof Array ? value.length < schema.minlength[0] : value.length < schema.minlength
      }
    }
    if ('max' in schema) {
      if (schema.max > -1) {
        max = schema.maxlength instanceof Array ? value.length > schema.max[0] : value.length > schema.maxlength
      }
    }
    if ('min' in schema) {
      if (schema.min > -1) {
        min = schema.minlength instanceof Array ? value.length < schema.min[0] : value.length < schema.minlength
      }
    }
    if ('match' in schema) {
      match = schema.match instanceof Array ? !schema.match[0].test(value) : !schema.match.test(value)
    }
    if ('type' in schema) {
      // type = !this.checkValue(schema.type, value)
    }
    if (maxLength || minLength || type || match || max || min) {
      error = true
    }
    if (maxLength) message = 'maxLength'
    if (max) message = 'max'
    if (min) message = 'min'
    if (type) message = 'type'
    if (minLength) message = 'minLength'
    if (match) message = 'match'
  }
  return {error, message}
}

module.exports = {
  clone,
  defaultByClass,
  eraseArrays,
  init,
  initMissing,
  initMissingWith,
  initModel,
  initModelField,
  validate,
  ___validate,
  ___validateModel
}
