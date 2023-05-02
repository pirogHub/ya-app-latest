
const debug_log_superPromise = false

export function superPromise(debugOfRandomPromises, curName) {
    var resolvingFunctions;
    var promise = new Promise(function (resolve, reject) {
        resolvingFunctions = { resolve, reject };
    });

    if (curName) promise.myName = curName

    promise.resolve = (name) => {
        if (debugOfRandomPromises && curName) {
            if (debug_log_superPromise) console.log("======= resolve", curName, "debugOfRandomPromises", debugOfRandomPromises);
            resolvingFunctions.resolve(curName)
        }
        resolvingFunctions.resolve("error")
    };
    promise.reject = resolvingFunctions.reject;

    return promise;
}

export function SuperPromiseTimeout(ms = 1000, valForRes = 0, valForRej = 0) {
    var resolvingFunctions;
    let timeout
    var promise = new Promise(function (resolve, reject) {
        resolvingFunctions = { resolve, reject };
        timeout = setTimeout(() => {
            resolve(valForRes)
        }, ms)
    });

    promise.resolve = () => {
        resolvingFunctions.resolve(valForRes)
    }
    promise.reject = () => {
        if (timeout) clearTimeout(timeout)
        resolvingFunctions.reject(valForRej)
    }

    return promise;
}