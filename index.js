const fi = (function() {
    return {
        libraryMethod: function() {
            return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
        },

        each: function(collection, callback) {
            let newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

            for (let i = 0; i < newCollection.length; i++)
                callback(newCollection[i])

            return collection
        },

        map: function(collection, callback) {
            let arrayValues = !collection.isArray ? Object.values(collection) : collection.slice(0)
            let newArray = []
            for (let i = 0; i < arrayValues.length; i++) {
                newArray.push(callback(arrayValues[i], i, arrayValues))
            }
            return newArray
        },

        reduce: function(collection, callback, initialValue) {
            let acc;
            if (!initialValue) {
                acc = collection[0]
                for (let i = 1; i < collection.length; i++) {
                    acc = callback(acc, collection[i], collection)
                }
            } else {
                acc = initialValue;
                for (let i = 0; i < collection.length; i++) {
                    acc = callback(acc, collection[i], collection)
                }
            }
            return acc
        },

        find: function(collection, predicate) {
            if (!(collection.isArray)) {
                collection = Object.values(collection)
            }
            for (let i = 0; i < collection.length; i++)
                if (predicate(collection[i])) return collection[i]
            return undefined
        },

        filter: function(collection, predicate) {
            let filteredArray = []
            if (!(collection instanceof Array))
                collection = Object.values(collection)

            for (let i = 0; i < collection.length; i++)
                if (predicate(collection[i])) {
                    filteredArray.push(collection[i])
                }
            return filteredArray
        },

        size: function(collection) {
            let arrayValues = !collection.isArray ? Object.values(collection) : collection
            return arrayValues.length
        },

        first: function(array, n = 0) {
            return (n) ? array.slice(0, n) : array[0]
        },

        last: function(array, n = 0) {
            return (n) ? array.slice(array.length - n) : array[array.length - 1]
        },

        compact: function(collection) {
            const allBad = new Set([false, null, 0, "", undefined, NaN])
            return collection.filter(el => !allBad.has(el))
        },

        sortBy: function(array, callback) {
            const newArr = [...array]
            return newArr.sort(function(a, b) {
                return callback(a) - callback(b)
            })
        },

        unpack: function(receiver, arr) {
            for (let val of arr)
                receiver.push(val)
        },

        flatten: function(collection, shallow, newArr = []) {
            if (!Array.isArray(collection)) return newArr.push(collection)
            if (shallow) {
                for (let val of collection)
                    Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
            } else {
                for (let val of collection) {
                    this.flatten(val, false, newArr)
                }
            }
            return newArr
        },

        uniq: function(collection, sorted = false, iteratee = false) {
            if (sorted) {
                return fi.uniqSorted(collection, iteratee)
            } else if (!iteratee) {
                return Array.from(new Set(collection))
            } else {
                const modifiedVals = new Set()
                const uniqVals = new Set()
                for (let val of collection) {
                    const moddedVal = iteratee(val)
                    if (!modifiedVals.has(moddedVal)) {
                        modifiedVals.add(moddedVal)
                        uniqVals.add(val)
                    }
                }
                return Array.from(uniqVals)
            }
        },

        keys: function(obj) {
            // Using for loop
            const keys = []
            for (let key in obj) {
                keys.push(key)
            }
            return keys
        },

        values: function(obj) {
            // Using for loop
            const values = []
            for (let key in obj) {
                values.push(obj[key])
            }
            return values

            // Using the custom 'map' method from above
            // return this.map(obj, (value) => value)

        },

        functions: function(obj) {
            const functionNames = []

            for (let key in obj) {
                if (typeof obj[key] === "function") {
                    functionNames.push(key)
                }
            }

            return functionNames.sort()
        },

    }
})()

fi.libraryMethod()