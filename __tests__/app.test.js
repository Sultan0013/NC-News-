const db = require('../db/connection.js');
const request = require('supertest');
const app = require('../app.js');
const { articleData, commentData, topicData, userData } = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

describe('ENDPoints', () => {
    it('GET 200: should respond with an array of topic objects that each should have slug and description properties', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                expect(response.body.topics).toHaveLength(topicData.length);
                response.body.topics.forEach((topic, index) => {
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
            .then((response) => {
                expect(response.body.msg).toBe('Route Not Found');
            });
    });
});
