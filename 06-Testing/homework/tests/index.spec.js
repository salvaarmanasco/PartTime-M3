const session = require("supertest-session");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("test");
      }));
  });

  describe("POST /sum", () => {
    it("responds with 200", () => agent.post("/sum").expect(200));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
  });

  describe("POST /product", () => {
    it("responds with 200", () => agent.post("/product").expect(200));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe("POST /sumArray", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it("Que dé false", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 14034 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
    it("Que no se sume el mismo num 2 veces", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 10 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
  });

  describe("POST /numString", () => {
    it("responds with 200", () =>
      agent.post("/numString").send({ mensaje: "hola" }).expect(200));
    it("responds with 4 if you send hola", () =>
      agent
        .post("/numString")
        .send({ mensaje: "hola" })
        .then((res) => {
          expect(res.body.result).toBe(4);
        }));
    it("responds with 400", () =>
      agent.post("/numString").send({ mensaje: 45 }).expect(400));
    it("responds with 400", () =>
      agent.post("/numString").send({ mensaje: "" }).expect(400));
  });

  describe("POST /pluck", () => {
    it("responds with 200", () => agent.post("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent
        .post("/pluck")
        .send({
          array: [
            { nombre: "Salva", apodo: "Salvatore" },
            { nombre: "Martin", apodo: "Titino" },
          ],
          arrayRespuesta: "nombre",
        })
        .then((res) => {
          expect(res.body.result).toEqual(["Salva", "Martin"]);
        }));
  });
});
