const db = require('../db/connection.js');
const request = require('supertest');
const app = require('../app.js');
const { articleData, commentData, topicData, userData } = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

describe('GET/api/topics', () => {
    it('GET 200: should respond with an array of topic objects that each should have slug and description properties', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body}) => {
                expect(body.topics).toHaveLength(topicData.length);
              body.topics.forEach((topic, index) => {
                    expect(topic).toHaveProperty('slug');
                    expect(topic).toHaveProperty('description');
                    expect(topic.slug).toBe(topicData[index].slug);
                    expect(topic.description).toBe(topicData[index].description);
                });
            });
    });

    it('GET 404: responds with "Route Not Found" for an unknown endpoint', () => {
        return request(app)
            .get('/api/nonexistent')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('Route Not Found');
            });
    });
});


describe('GET /api', () => {
    it('GET 200: should respons with descriptionf or each endpoint adn other specifications', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({body})=>{
            const endpointsJson = require('../endpoints.json');
            expect(body).toEqual(endpointsJson);
        })

        
    })

})


describe('GET/api/articles/article_id', () => {
    it('should respond with specific article', () => {
        return request(app)
        .get('/api/articles/5')
        .expect(200)
        .then(({body})=>{
            expect(body.article).toEqual([
                {
                  article_id: 5,
                  title: 'UNCOVERED: catspiracy to bring down democracy',
                  topic: 'cats',
                  author: 'rogersop',
                  body: 'Bastet walks amongst us, and the cats are taking arms!',
                  created_at: '2020-08-03T13:14:00.000Z',
                  votes: 0,
                  article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
                }
              ])
        })
    })

    it('GET 400: should respond with error of bad request when article id is not a number ', () => {
        return request(app)
        .get('/api/articles/NAN')
        .expect(400)
        .then((response)=>{
          
            expect(response.text).toBe('Bad Request')
        })
    })


    it('GET 404: should respond with error of not when article id is not in the articles ', () => {
        return request(app)
        .get('/api/articles/30')
        .expect(404)
        .then((response)=>{
          
            expect(response.text).toBe('Not Found')
        })
    })
})


describe('GET /api/articles', () => {
    it('should respond with array of articles GET : 200', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body})=>{
          
           body.articles.forEach((article)=>{
            expect(article).toEqual( 
                expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String),
                comment_count: expect.any(Number) 
              }))
           }) 
        })
    })
    
})



describe('GET/api/:article_id/comments', () => {
    it('GET 200: should respond with an array of comments ', () => {
        return request(app)
                .get('/api/3/comments')
                .expect(200)
                .then(({body})=>{
                    expect(body.comments).toEqual( [
                        {
                        comment_id: 11,
                          body: 'Ambidextrous marsupial',
                          article_id: 3,
                          author: 'icellusedkars',
                          votes: 0,
                          created_at: "2020-09-19T23:10:00.000Z"
                        },
                        {
                          comment_id: 10,
                          body: 'git push origin master',
                          article_id: 3,
                          author: 'icellusedkars',
                          votes: 0,
                          created_at: "2020-06-20T07:24:00.000Z"
                        }
                      ])
                })
    })

    it('GET 200:should check for the each key and their values  ', () => {
        return request(app)
                .get('/api/1/comments')
                .expect(200)
                .then(({body})=>{
                   body.comments.forEach((comment)=>{ expect(comment).toEqual(
                        expect.objectContaining(
                            {
                                comment_id : expect.any(Number),
                                body : expect.any(String),
                                article_id : expect.any(Number)&& 1,
                                author : expect.any(String),
                                votes : expect.any(Number),
                                created_at : expect.any(String)

                            }
                        )
                    )})
                })
    })

    it('GET 400: should return error of 400 with msg of bbad request when passong a non-exostent ID', () => {
        return request(app)
        .get('/api/non-existent/comments')
        .expect(400)
        .then(({text})=>{

            expect(text).toBe("bad request")
        })
    })

    it('GET 404 :should return error of 404 with msg of Not found when theirs no comments for that specific_id', () => {
        return request(app)
        .get('/api/20/comments')
        .expect(404)
        .then(({text})=>{

            expect(text).toBe("Not Found")
        })
    })
})