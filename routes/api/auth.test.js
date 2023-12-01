const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../../app");

const { User } = require("../../models/users");

const { DB_HOST_TEST, PORT } = process.env;

describe("test routes", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test login route", async () => {
    const password = await bcrypt.hash("123456", 10);

    const newUser = {
      email: "test@gmail.com",
      password: password,
      subscription: null,
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "test@gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/api/users/login").send(loginUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(res.body.token).toBe(token);
  });

  test("test register route with correct data", async () => {
    const registerData = {
      email: "test@gmail.com",
      password: "123456",
    };

    const res = await request(app)
      .get("/api/users/register")
      .send(registerData);
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(registerData.email);

    const user = await User.findOne({ email: registerData.email });
    expect(user.email).toBe(registerData.email);
  });
});
