import axios from "axios";

describe("Rating tests", () => {
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

  it("should create a rating", async () => {
    const rating = await axios.post(
      "http://localhost:5000/api/rating/create",
      {
        id_user: "628fbedb9f042be7be577bca",
        id_place: "628fa6bb9f07b8bfd65350fb",
        photo_url: "photo",
        rating: 5,
        comment: "Comentario 2",
        date: "11/05/2022",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(rating.status).toEqual(201);
    expect(rating.data.comment).toEqual("Comentario 2");
  });

  it("should get all ratings", async () => {
    const ratings = await axios.get("http://localhost:5000/api/rating", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(ratings.status).toEqual(200);
  });

  it("should get ratings by place", async () => {
    const ratings = await axios.get(
      "http://localhost:5000/api/rating/628fa6bb9f07b8bfd65350fb",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(ratings.status).toEqual(200);
  });

  it("Should delete one rating", async () => {
    const deletedRating = await axios.delete(
      "http://localhost:5000/api/rating/delete/628fc6f1f252be9be5cd329c",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(deletedRating.status).toEqual(200);
  });

  it("Shouldn't delete a non-existing rating", async () => {
    const deletedRating = await axios
      .delete("http://localhost:5000/api/rating/delete/628fc6f1f252be9be5cd3", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });
});
