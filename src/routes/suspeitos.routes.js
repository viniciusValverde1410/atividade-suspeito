import { Router } from "express";

const suspeitosRoutes = Router();

let suspeitos = []
  
// Rota para buscar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
  return res.status(200).send(suspeitos);
});

// Rota para cadastrar um novo suspeito
suspeitosRoutes.post("/", (req, res) => {
  const { nome, profissao, envolvimento, nivelSuspeita } = req.body;

  // Validação dos campos obrigatórios
  if (!nome || !profissao || !nivelSuspeita ) {
    return res.status(400).send({
      message: "Campo obrigatório não preenchido!",
    });
  }

  // Validação do nivel de suspeita
  if (nivelSuspeita.toLowerCase() != "baixo" && nivelSuspeita.toLowerCase() != "médio" && nivelSuspeita.toLowerCase() != "alto") {
    return res.status(404).send({
        message: "O campo de nível de suspeita deve ser preenchido!."
    });
  }
    if(envolvimento.toLowerCase() != "sim" && envolvimento.toLowerCase() != "não"){
      return res.status(400).send({
          message: "Campo obrigatório de envolvimento não preenchido."
      });
  }

  // Criação de um novo suspeito
  const novoSuspeito = {
    id: Math.floor(Math.random() * 1000000),
    nome,
    profissao,
    envolvimento,
    nivelSuspeita,
  };

  // Adiciona ao array de suspeitos
  suspeitos.push(novoSuspeito);

  return res.status(201).send({
    message: "Suspeito cadastrado!",
    novoSuspeito,
  });
});

// Rota para buscar um suspeito pelo id
suspeitosRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

const suspeito = suspeitos.find((suspect) => suspect.id == id);
if (!suspeito) {
  return res.status(404).send ({
    message: "O ID fornecido não corresponde a nenhum suspeito."
  });
};

return res.status(200).send ({
  message: `Suspeito com id ${id} encontrado!`
});
});

// Rota para atualizar um suspeito pelo id
suspeitosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const suspeito = suspeitos.find((suspect) => suspect.id == id);

 // Validação

 if (!suspeito) {
  return res.status(400).send({
    message: `Suspeito com id ${id} não encontrado!` 
  });
 };


  // Validação dos campos obrigatórios
  if (!nome || !profissão || !nivelSuspeita) {
    return res.status(400).send({
      message: "Campos obrigatórios não preenchidos",
    });
  }

  if (nivelSuspeita.toLowerCase() != "baixo" && nivelSuspeita.toLowerCase() != "médio" && nivelSuspeita.toLowerCase() != "alto") {
    return res.status(404).send({
        message: "O campo de nível de suspeita deve ser preenchido!."
    });
  }
    if(envolvimento.toLowerCase() != "sim" && envolvimento.toLowerCase() != "não"){
      return res.status(400).send({
          message: "Campo obrigatório de envolvimento não preenchido."
      });
  }

  suspeito.nome = nome;
  suspeito.profissao = profissao;
  suspeito.envolvimento = envolvimento;
  suspeito.nivelSuspeita = nivelSuspeita;

  return res.status(200).send({
    message: "Suspeito atualizado com sucesso!",
    suspeito,
  });
});

suspeitosRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;
  const suspeito = suspeitos.find((suspect) => suspect.id == id);

// Validação
if(!suspeitos) {
  return res.status(404).send ({
    message: `Suspeito com id ${id} não encontrado!`
  });
};

suspeitos = suspeitos.filter((suspect) => suspect.id != id);

return res.status(200).send({
  message: "O seguinte suspeito foi deletado:", suspeito,
});
});

export default suspeitosRoutes;
