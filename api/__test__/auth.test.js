import axios from "axios";

describe("Auth tests", () => {
  it("should login user", async () => {
    const login = await axios.post("http://localhost:5000/api/login", {
      email: "test@test.com",
      password: "12345678",
    });
    expect(login.data.token).toBeDefined();
  });
  it("should not find the email", async () => {
    const login = await axios
      .post("http://localhost:5000/api/login", {
        email: "test0@test.com",
        password: "12345678",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(403);
      });
  });

  it("Invalid Password", async () => {
    const login = await axios
      .post("http://localhost:5000/api/login", {
        email: "test@test.com",
        password: "1234567",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(403);
      });
  });

  it("should login admin", async () => {
    const login = await axios.post("http://localhost:5000/api/admin/login", {
      email: "admin@test.com",
      password: "12345678",
    });
    expect(login.data.token).toBeDefined();
  });
  it("should not find the email", async () => {
    const login = await axios
      .post("http://localhost:5000/api/admin/login", {
        email: "admin0@test.com",
        password: "12345678",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(403);
      });
  });

  it("Invalid Password", async () => {
    const login = await axios
      .post("http://localhost:5000/api/admin/login", {
        email: "admin@test.com",
        password: "1234567",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(403);
      });
  });
});
