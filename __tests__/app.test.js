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



    
