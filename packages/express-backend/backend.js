import express from "express";

const app = express();
const port = 8000;

app.use(express.json());


const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// const findUserByName = (name) => {
//     return users["users_list"].filter(
//       (user) => user["name"] === name
//     );
// };

// app.get("/users", (req, res) => {
//     const name = req.query.name;
//     if (name != undefined) {
//       let result = findUserByName(name);
//       result = { users_list: result };
//       res.send(result);
//     } else {
//       res.send(users);
//     }
// });

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});


const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  // Check if both name and job are provided
  if (name !== undefined && job !== undefined) {
    let result = findUsersByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } 
  // If only name is provided
  else if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } 
  // If no query is provided, return all users
  else {
    res.send(users);
  }
});


const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});


const deleteUserById = (id) => {
    const initLength = users["users_list"].length;
    users["users_list"] = users["users_list"].filter(
        (user) => user["id"] !== id
    );
    return users["users_list"].length < initLength;
};

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const userDeleted = deleteUserById(id);

    if(userDeleted) {
        res.status(200).send();
    } else {
        res.status(404).send();
    }
})

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});