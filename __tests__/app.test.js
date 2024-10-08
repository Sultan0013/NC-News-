const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");
const endpointsJson = require("../endpoints.json");
require("jest-sorted");
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

describe("GET/api/topics", () => {
  it("GET 200: should respond with an array of topic objects that each should have slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toHaveLength(topicData.length);
        body.topics.forEach((topic, index) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
          expect(topic.slug).toBe(topicData[index].slug);
          expect(topic.description).toBe(topicData[index].description);
        });
      });
  });

  it('GET 404: responds with "Route Not Found" for an unknown endpoint', () => {
    return request(app)
      .get("/api/nonexistent")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route Not Found");
      });
  });
});

describe("GET /api", () => {
  it("GET 200: should respons with descriptionf or each endpoint adn other specifications", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(endpointsJson);
      });
  });
});

describe("GET/api/articles/article_id", () => {
  it("should respond with specific article including comment_count", () => {
    return request(app)
      .get("/api/articles/5")
      .expect(200)
      .then(({ body }) => {
        expect(body.article[0]).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number) && 5,
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          })
        );
      });
  });

  it("GET 400: should respond with error of bad request when article id is not a number ", () => {
    return request(app)
      .get("/api/articles/NAN")
      .expect(400)
      .then((response) => {
        expect(response.text).toBe("Bad Request");
      });
  });

  it("GET 404: should respond with error of not when article id is not in the articles ", () => {
    return request(app)
      .get("/api/articles/30")
      .expect(404)
      .then((response) => {
        expect(response.text).toBe("Not Found");
      });
  });
});

describe("GET /api/articles", () => {
  it("should respond with array of articles GET : 200", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  describe("GET /api/articles sorting queries", () => {
    it("GET 200: responds with the articles where the sort by and order is default ", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });

    it("GET 200: responds with the articles array where they are in sort of author and ascending order", () => {
      return request(app)
        .get("/api/articles?sort_by=author&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("author", { descending: false });
        });
    });

    it("GET 400: responds with error 400 when the passed sortby value is not included in the sort_by columns array", () => {
      return request(app)
        .get("/api/articles?sort_by=body&order=asc")
        .expect(400)
        .then((resp) => {
          expect(resp.text).toBe("Invalid sort_by column");
        });
    });

    it("GET 400: responds with error 400 when the passed order value is not included in the order array", () => {
      return request(app)
        .get("/api/articles?sort_by=created_at&order=invalid_order")
        .expect(400)
        .then((resp) => {
          expect(resp.text).toBe("Invalid order value");
        });
    });
  });

  describe("GET/api/articles topic query", () => {
    it("GET 200: responds with the article with the specific topic ", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0]).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String) && "cats",
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
    });

    it("GET 200: responds with the articles with the specific topic  sorted and ordered", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order=asc&topic=mitch")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("title", { descending: false });
          body.articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String) && "mitch",
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String),
                comment_count: expect.any(Number),
              })
            );
          });
        });
    });

    it("GET 400: responds with error 400 when the passed topic is not in the article", () => {
      return request(app)
        .get("/api/articles?topic=123")
        .expect(404)
        .then((resp) => {
          expect(resp.text).toBe("Not Found");
        });
    });
  });
});

describe("GET/api/:article_id/comments", () => {
  it("GET 200: should respond with an array of comments ", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([
          {
            comment_id: 11,
            body: "Ambidextrous marsupial",
            article_id: 3,
            author: "icellusedkars",
            votes: 0,
            created_at: "2020-09-19T23:10:00.000Z",
          },
          {
            comment_id: 10,
            body: "git push origin master",
            article_id: 3,
            author: "icellusedkars",
            votes: 0,
            created_at: "2020-06-20T07:24:00.000Z",
          },
        ]);
      });
  });

  it("GET 200:should check for the each key and their values  ", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: expect.any(String),
              article_id: expect.any(Number) && 1,
              author: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
      });
  });

  /*need to include a test for an article which has no associated comments (find one in your db)
In this case we would expect 200 returns an empty array
Please note: Once you add this test and get it to pass, your 404 test will then no longer pass and will require additional logic to get it to go green */

  it("GET 200: should respond with an empty array for an article which exists with no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });

  it("GET 400: should return error of 400 with msg of bad request when passong a non-exostent ID", () => {
    return request(app)
      .get("/api/articles/non-existent/comments")
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("bad request");
      });
  });

  it("GET 404 :should return error of 404 with msg of Not found when theirs no comments for that specific_id or there is no article by that Id", () => {
    return request(app)
      .get("/api/articles/20/comments")
      .expect(404)
      .then(({ text }) => {
        expect(text).toBe("Not Found");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  it("POST 201: should respond with the new comment", () => {
    const newComment = {
      username: "rogersop",
      body: "This is a test comment",
      testProperty: "test-value",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.Comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            body: expect.any(String) && "This is a test comment",
            article_id: expect.any(Number) && 1,
            author: expect.any(String) && "rogersop",
            votes: expect.any(Number),
            created_at: expect.any(String),
          })
        );
      });
  });

  it("POST 201: should ignore any additional property and return the new comment  ", () => {
    const newComment = {
      username: "rogersop",
      body: "This is a test comment",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.Comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            body: expect.any(String),
            article_id: expect.any(Number),
            author: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
          })
        );
      });
  });

  it('POST 400 "Not-and-id": should respond with an erroe status of 400 and message of bad request for string of "not-and-ud"', () => {
    const newComment = {
      username: "rogersop",
      body: "This is a test comment",
    };

    return request(app)
      .post("/api/articles/not-and-id/comments")
      .send(newComment)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Bad Request");
      });
  });

  it('POST 404 "not-existent-id": should respond with error message of 404 and message of Not Found when there is no article with the speceifc ID ', () => {
    const newComment = {
      username: "rogersop",
      body: "This is a test comment",
    };

    return request(app)
      .post("/api/articles/100/comments")
      .send(newComment)
      .expect(404)
      .then(({ text }) => {
        expect(text).toBe("Not Found");
      });
  });

  it("POST 404: should return with error message of 404 and message of UserName not found when the passed username does not exist  ", () => {
    const newComment = {
      username: "non-exist username",
      body: "This is a test comment",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then(({ text }) => {
        expect(text).toBe("Not Found");
      });
  });
  it("POST 400:should respond with error of 400 and message of bad request when the username or body key os not string ", () => {
    const newComment = {
      username: 1,
      body: [],
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Bad Request");
      });
  });

  it("POST 400:should respond with error of 400 and message of bad request when the newcomment does not contain the username or body key ", () => {
    const newComment = {
      testProperty: "test-value",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Bad Request");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  it("PATCH 201 :decrements the article and responds with the updated article with the votes decremented by the given votes key ", () => {
    const voteInfo = {
      inc_votes: -10,
    };
    return request(app)
      .patch("/api/articles/1")
      .send(voteInfo)
      .expect(201)
      .then(({ body }) => {
        expect(body.article).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number) && 90,
            article_img_url: expect.any(String),
          })
        );
      });
  });

  it("PATCH 201 : increments the article votes  and responds with the updated article votes ", () => {
    const voteInfo = {
      inc_votes: 10,
    };
    return request(app)
      .patch("/api/articles/5")
      .send(voteInfo)
      .expect(201)
      .then(({ body }) => {
        expect(body.article).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number) && 10,
            article_img_url: expect.any(String),
          })
        );
      });
  });

  it("PATCH 201 : increments the article votes  and responds with the updated article votes and ignores any extra property of voteInfo", () => {
    const voteInfo = {
      inc_votes: 10,
      extraProperty: "test-value",
    };
    return request(app)
      .patch("/api/articles/5")
      .send(voteInfo)
      .expect(201)
      .then(({ body }) => {
        expect(body.article).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number) && 10,
            article_img_url: expect.any(String),
          })
        );
      });
  });

  it("PATCH 400: should respond with an erroe status of 400 and message of bad request for non-exist id", () => {
    const voteInfo = {
      inc_votes: -10,
    };
    return request(app)
      .patch("/api/articles/nan")
      .send(voteInfo)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Bad Request");
      });
  });

  it("PATCH 404: should respond with error message of 404 and message of Not Found when there is no article with the speceifc ID ", () => {
    const voteInfo = {
      inc_votes: -10,
    };
    return request(app)
      .patch("/api/articles/100")
      .send(voteInfo)
      .expect(404)
      .then(({ text }) => {
        expect(text).toBe("Not Found");
      });
  });

  it("PATCH 400: should respond with an error status of 400 and message of bad request when value of passed votes is nan", () => {
    const voteInfo = {
      inc_votes: "nan",
    };
    return request(app)
      .patch("/api/articles/nan")
      .send(voteInfo)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Bad Request");
      });
  });

  it("PATCH 400: should respond with an error status of 400 and message of bad request the sended object does not has the property pf inc_votes", () => {
    const voteInfo = {
      anythingElse: "test-value",
    };
    return request(app)
      .patch("/api/articles/nan")
      .send(voteInfo)
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Bad Request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  it("DELETE 204 : No content - drops the specifc comment specifed by comment-id", () => {
    return request(app).delete("/api/comments/2").expect(204);
  });

  it("DELETE 400 :bad request - responds with error for invalid ids", () => {
    return request(app)
      .delete("/api/comments/nan")
      .expect(400)
      .then((resp) => {
        expect(resp.text).toBe("Bad Request");
      });
  });

  it("DELETE 404 :Not Found - responds with error for non-esxistent_id", () => {
    return request(app)
      .delete("/api/comments/100")
      .expect(404)
      .then((resp) => {
        expect(resp.text).toBe("Not Found");
      });
  });
});

describe("Get /api/users", () => {
  it("GET 200 : responds with an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toEqual(userData);
        body.users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });

  describe("/api/users/login", () => {
    it("GET 200 :should respond with an object of username , avatar_url and name", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({
              username: expect.any(String) && "rogersop",
              avatar_url: expect.any(String),
              name: expect.any(String),
            })
          );
        });
    });

    it("POST 201 : should create a new user ", () => {
      const newUser = {
        username: "sultan2023",
        name: "Sultan Dara",
        avatar_url:
          "https://gravatar.com/avatar/884264e01b4357925cac33546a477af6?s=400&d=robohash&r=g",
      };

      return request(app)
        .post("/api/users/signup")
        .send(newUser)
        .expect(201)
        .then(({ body }) => {
          expect(body.user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
    });
  });
});
