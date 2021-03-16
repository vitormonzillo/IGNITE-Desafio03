const express = require("express");
const { v4: uuidv4, validate } = require("uuid");
const app = express();
app.use(express.json());

const repositories = [];


//criando repo
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuidv4(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

//vendo repo
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

//atualizando titulo,url e techs
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find(repository => repository.id === id)

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  };

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.json(repository);
});

//deletando repositórios
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json(repositories);
});

//dando like
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id)
  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  };

  ++repository.likes;

  return response.json(repository);
});

module.exports = app;
