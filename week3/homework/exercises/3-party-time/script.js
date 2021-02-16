/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

const fetch = require("node-fetch");

async function makeReservation(person, participants) {
  // YOUR CODE GOES IN HERE
  const body = {
    "name": person,
    "numberOfPeople": participants,
  };

  try {
    const response = await fetch(
      "https://reservation100-sandbox.mxapps.io/api/reservations",
      {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );
    const json = await response.json();
    console.log(json.message);
  } catch (error) {
    console.log(error);
  }
}

const person = "John Doe";
const participants = 3;
makeReservation(person, participants);