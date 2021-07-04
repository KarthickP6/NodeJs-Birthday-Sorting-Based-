const request = require("supertest");
const app = require("../src/app");
const Birthday = require("../src/mongoose/models/birthdays");
const { birthdays, setUpDatabase } = require("./utils/testDB");

beforeEach(setUpDatabase);

//adding a new birthday card
test("Adding birthday card", async () => {
    await request(app).post("/birthdays").send({
        name: "dummy_data_new",
        dob: "1993-05-23T00:00:00.000Z",
        relationship: "Cousin"
    }).expect(201);
    const birthdays_length = await Birthday.find().count();
    expect(birthdays_length).toBe(11);
});

//adding a new birthday card with name length lesser than 3 characters
test("Adding birthday card with invalid name", async () => {
    await request(app).post("/birthdays").send({
        name: "du",
        dob: "1993-05-23T00:00:00.000Z",
        relationship: "Cousin"
    }).expect(400);
    const birthdays_length = await Birthday.find().count();
    expect(birthdays_length).toBe(10);
});

//adding a new birthday card with name length lesser than 3 characters
test("Adding birthday card with invalid name", async () => {
    await request(app).post("/birthdays").send({
        name: "dummy_wrong_data",
        dob: "1993-05-23T00:00:00.000Z",
        relationship: "Cousin"
    }).expect(400);
    const birthdays_length = await Birthday.find().count();
    expect(birthdays_length).toBe(10);
});

//getting all the data form birthday collection
test("Viewing birthday cards", async () => {
    const response = await request(app).get("/birthdays").expect(200);
    expect(response.body.length).toBe(10);
    for(let i = 0; i < response.body.length; i++) {
        if(!(response.body[i].dob === birthdays[i].dob && response.body[i].relationship === birthdays[i].relationship && response.body[i].name === birthdays[i].name))
        expect(false).tobeTruthy();
    }
});

//getting birthdays sorted in ascending order of names
test("Viewing birthday cards based on the names", async () => {
    const response = await request(app).get("/birthdays?name=asc").expect(200);
    expect(response.body.length).toBe(10);
    expect(response.body[0].name).toBe(birthdays[7].name);
    expect(response.body[3].name).toBe(birthdays[8].name);
    expect(response.body[6].name).toBe(birthdays[5].name);
    expect(response.body[9].name).toBe(birthdays[1].name);
});

//getting birthdays sorted in descending order of names
test("Viewing birthday cards based on the names", async () => {
    const response = await request(app).get("/birthdays?name=desc").expect(200);
    expect(response.body.length).toBe(10);
    expect(response.body[0].name).toBe(birthdays[1].name);
    expect(response.body[2].name).toBe(birthdays[9].name);
    expect(response.body[5].name).toBe(birthdays[0].name);
    expect(response.body[9].name).toBe(birthdays[7].name);
});

//getting birthdays sorted in ascending order of dob
test("Viewing birthday cards based on the dob", async () => {
    const response = await request(app).get("/birthdays?dob=asc").expect(200);
    expect(response.body.length).toBe(10);
    expect(response.body[0].name).toBe(birthdays[7].name);
    expect(response.body[3].name).toBe(birthdays[0].name);
    expect(response.body[6].name).toBe(birthdays[4].name);
    expect(response.body[9].name).toBe(birthdays[3].name);
});

//getting birthdays sorted in descending order of dob
test("Viewing birthday cards based on the dob", async () => {
    const response = await request(app).get("/birthdays?dob=desc").expect(200);
    expect(response.body.length).toBe(10);
    expect(response.body[0].name).toBe(birthdays[3].name);
    expect(response.body[2].name).toBe(birthdays[5].name);
    expect(response.body[5].name).toBe(birthdays[1].name);
    expect(response.body[9].name).toBe(birthdays[7].name);
});

//getting birthdays filterd based on relationship
test("Viewing birthday cards based on the relationship", async () => {
    const response = await request(app).get("/birthdays?type=Friend").expect(200);
    expect(response.body.length).toBe(5);
    expect(response.body[0].name).toBe(birthdays[3].name);
    expect(response.body[1].name).toBe(birthdays[5].name);
    expect(response.body[2].name).toBe(birthdays[7].name);
    expect(response.body[3].name).toBe(birthdays[8].name);
    expect(response.body[4].name).toBe(birthdays[9].name);
});

//getting birthdays filterd based on relationship and sorted by name ascending
test("Viewing birthday cards based on the relationship and name", async () => {
    const response = await request(app).get("/birthdays?type=Sister&name=asc").expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe(birthdays[2].name);
    expect(response.body[1].name).toBe(birthdays[1].name);
});

//getting birthdays filterd based on relationship and sorted by name descending
test("Viewing birthday cards based on the relationship and name", async () => {
    const response = await request(app).get("/birthdays?type=Sister&name=desc").expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe(birthdays[1].name);
    expect(response.body[1].name).toBe(birthdays[2].name);
});

//getting birthdays filterd based on relationship and sorted by dob ascending
test("Viewing birthday cards based on the relationship and dob", async () => {
    const response = await request(app).get("/birthdays?type=Brother&dob=asc").expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe(birthdays[0].name);
    expect(response.body[1].name).toBe(birthdays[4].name);
});

//getting birthdays filterd based on relationship and sorted by dob descending
test("Viewing birthday cards based on the relationship and dob", async () => {
    const response = await request(app).get("/birthdays?type=Brother&dob=desc").expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe(birthdays[4].name);
    expect(response.body[1].name).toBe(birthdays[0].name);
});