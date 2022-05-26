import axios from "axios";

describe("User tests", () => {
  let token;

  beforeAll(async () => {
    //login to get token
    const login = await axios.post("http://localhost:5000/api/login", {
      email: "test@test.com",
      password: "12345678",
    });
    const { token: tokenUser } = login.data;
    token = tokenUser;
  });

  it("should register user", async () => {
    const user = {
      email: "test10@test.com",
      password: "12345678",
      firstname: "Luis",
      lastname: "Perez",
    };
    const result = await axios.post("http://localhost:5000/api/register", user);
    expect(result.data).toBeDefined();
    expect(result.data.email).toEqual("test10@test.com");
    expect(result.data.firstname).toEqual("Luis");
  });

  it("Email already exists", async () => {
    const result = await axios
      .post("http://localhost:5000/api/register", {
        email: "test10@test.com",
        password: "12345678",
        firstname: "Juan",
        lastname: "Benites",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("Password very short", async () => {
    const result = await axios
      .post("http://localhost:5000/api/register", {
        email: "test15@test.com",
        password: "1234567",
        firstname: "Maria",
        lastname: "Juarez",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("should get all users", async () => {
    const users = await axios.get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(users.status).toEqual(200);
  });

  it("should get all requests", async () => {
    const requests = await axios.get(
      "http://localhost:5000/api/users/requests",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(requests.status).toEqual(204);
  });

  it("should get one user", async () => {
    const user = await axios.get(
      "http://localhost:5000/api/user/628f9e7936180f198dc91e36",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(user.status).toEqual(200);
    expect(user.data.firstname).toEqual("Andrea");
  });

  it("shouldn´t get a nonexistent user", async () => {
    const user = await axios
      .get("http://localhost:5000/api/user/628f9e7936180f198dc91e", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("should update one user", async () => {
    const user = await axios.put(
      "http://localhost:5000/api/user/update2/628f9e7936180f198dc91e36",
      {
        firstname: "Laura",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(user.status).toEqual(200);
    expect(user.data.firstname).toEqual("Laura");
  });

  it("shouldn´t update a nonexistent user", async () => {
    const user = await axios
      .put(
        "http://localhost:5000/api/user/update2/628f9e7936180f198dc91e",
        { firstname: "Laura" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });
});
