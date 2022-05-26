import axios from "axios";

describe("Place tests", () => {
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

  it("should create a place", async () => {
    const place = await axios.post(
      "http://localhost:5000/api/place/create",
      {
        id_user: "628f9e7936180f198dc91e36",
        name: "Lugar 3",
        photos: ["photo1", "photo2"],
        difficulty: "Facil",
        capacity: 20,
        time: [1, 2],
        city: "Lima",
        time_city: 5,
        description: "Descripcion",
        how_to_get: "Como llegar",
        tips: "Recomendaciones",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(place.status).toEqual(201);
    expect(place.data.name).toEqual("Lugar 3");
  });

  it("should get all places", async () => {
    const places = await axios.get("http://localhost:5000/api/place");
    expect(places.status).toEqual(200);
  });

  it("should get one place", async () => {
    const place = await axios.get(
      "http://localhost:5000/api/place/628fa6ae9f07b8bfd65350f8",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(place.status).toEqual(200);
    expect(place.data.name).toEqual("Lugar 1");
  });

  it("should don´t get a nonexistent place", async () => {
    const place = await axios
      .get("http://localhost:5000/api/place/628fa6ae9f07b8bfd65350", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("should change verified status", async () => {
    const place = await axios.put(
      "http://localhost:5000/api/place/verified/628fa6ae9f07b8bfd65350f8",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(place.status).toEqual(200);
    expect(place.data.verified).toEqual(false);
  });

  it("shouldn´t change verified status of nonexistent place", async () => {
    const place = await axios
      .put(
        "http://localhost:5000/api/place/verified/628fa6ae9f07b8bfd65350",
        {},
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

  it("should update place", async () => {
    const place = await axios.put(
      "http://localhost:5000/api/place/update/628fa6ae9f07b8bfd65350f8",
      { name: "Lugar 10" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(place.status).toEqual(200);
    expect(place.data.name).toEqual("Lugar 10");
  });

  it("shouldn´t update a nonexistent place", async () => {
    const place = await axios
      .put(
        "http://localhost:5000/api/place/update/628fa6ae9f07b8bfd65350",
        { name: "Lugar 10" },
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

  it("Should delete one place", async () => {
    const deletedList = await axios.delete(
      "http://localhost:5000/api/place/delete/628fa6dbf09454b673a36bcb",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(deletedList.status).toEqual(200);
  });

  it.only("Shouldn't delete a non-existing place", async () => {
    const deletedList = await axios
      .delete(
        "http://localhost:5000/api/place/delete/628fa6dbf09454b673a36bcb",
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
