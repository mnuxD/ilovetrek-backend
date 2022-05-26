import axios from "axios";

describe("Admin tests", () => {
  it.skip("should register admin", async () => {
    const admin = {
      email: "admin2@test.com",
      password: "12345678",
    };
    const result = await axios.post(
      "http://localhost:5000/api/admin/register",
      admin
    );
    expect(result.data).toBeDefined();
    expect(result.data.email).toEqual("admin2@test.com");
  });

  it("Email already exists", async () => {
    const result = await axios
      .post("http://localhost:5000/api/admin/register", {
        email: "admin2@test.com",
        password: "12345678",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("Password very short", async () => {
    const result = await axios
      .post("http://localhost:5000/api/admin/register", {
        email: "test20@test.com",
        password: "12345",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("should get all admins", async () => {
    const login = await axios.post("http://localhost:5000/api/admin/login", {
      email: "admin@test.com",
      password: "12345678",
    });

    const admins = await axios.get("http://localhost:5000/api/admin", {
      headers: {
        Authorization: `Bearer ${login.data.token}`,
      },
    });
    expect(admins.status).toEqual(200);
  });

  it("should get one admin", async () => {
    const login = await axios.post("http://localhost:5000/api/admin/login", {
      email: "admin@test.com",
      password: "12345678",
    });

    const admin = await axios.get(
      "http://localhost:5000/api/admin/628f9ecc36180f198dc91e3c",
      {
        headers: {
          Authorization: `Bearer ${login.data.token}`,
        },
      }
    );
    expect(admin.status).toEqual(200);
    expect(admin.data.email).toEqual("admin@test.com");
  });
});
