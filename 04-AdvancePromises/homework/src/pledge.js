"use strict";

/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
  if (typeof executor !== "function") {
    throw new TypeError(
      "cualquier mensaje de error  conteniendo executor y function"
    );
  }
  this.value = undefined;
  this._state = "pending";
  this._handlerGroups = [];

  executor(
    (data) => this._internalResolve(data),
    (data) => this._internalReject(data)
  );
}

/*-------------------------------------------------------*/

$Promise.prototype._internalResolve = function (data) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = data;
    this._callHandlers();
  }
};

$Promise.prototype._internalReject = function (data) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = data;
    this._callHandlers();
  }
};

$Promise.prototype.then = function (successCb, errorCb) {
  const downstreamPromise = new $Promise(() => {});
  this._handlerGroups.push({
    successCb: typeof successCb === "function" ? successCb : false,
    errorCb: typeof errorCb === "function" ? errorCb : false,
    downstreamPromise,
  });

  this._callHandlers();
  return downstreamPromise;
};

$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
};

$Promise.prototype._callHandlers = function () {
  if (this._state !== "pending") {
    while (this._handlerGroups.length) {
      const handlersGroup = this._handlerGroups.shift();
      if (this._state === "fulfilled") {
        if (handlersGroup.successCb) {
          try {
            const result = handlersGroup.successCb(this._value);
            if (result instanceof $Promise) {
              result.then(
                (data) => {
                  handlersGroup.downstreamPromise._internalResolve(data);
                },
                (error) => {
                  handlersGroup.downstreamPromise._internalReject(error);
                }
              );
            } else {
              handlersGroup.downstreamPromise._internalResolve(result);
            }
          } catch (e) {
            handlersGroup.downstreamPromise._internalReject(e);
          }
        } else {
          handlersGroup.downstreamPromise._internalResolve(this._value);
        }
      } else {
        if (handlersGroup.errorCb) {
          try {
            const result = handlersGroup.errorCb(this._value);
            if (result instanceof $Promise) {
              result.then(
                (data) => {
                  handlersGroup.downstreamPromise._internalResolve(data);
                },
                (error) => {
                  handlersGroup.downstreamPromise._internalReject(error);
                }
              );
            } else {
              handlersGroup.downstreamPromise._internalResolve(result);
            }
          } catch (e) {
            handlersGroup.downstreamPromise._internalReject(e);
          }
        } else {
          handlersGroup.downstreamPromise._internalReject(this._value);
        }
      }
    }
  }
};

$Promise.resolve = function (value) {
  if (value instanceof $Promise) {
    return value;
  }
  const promise = new $Promise(() => {});
  promise._internalResolve(value);
  return promise;
};

$Promise.all = function (array) {
  if (!Array.isArray(array)) {
    throw new TypeError("deberia ser un array");
  }
  const promise = new $Promise((resolve, reject) => {
    const promiseArray = array.map((p) => $Promise.resolve(p));
    const result = Array(array.length);
    let pendingCount = array.length;
    promiseArray.forEach((e, i) =>
      e.then(
        (value) => {
          result[i] = value;
          pendingCount--;
          if (pendingCount === 0) {
            resolve(result);
          }
        },
        (error) => {
          reject(error);
        }
      )
    );
  });

  return promise;
};

module.exports = $Promise;

/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
