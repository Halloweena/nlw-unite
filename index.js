let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 1, 5, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 3, 15, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 2, 10, 15),
    dataCheckIn: new Date(2024, 1, 6, 12, 30)
  },
  {
    nome: "Carlos Souza",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 2, 2, 11, 45),
    dataCheckIn: new Date(2024, 1, 7, 9, 45)
  },
  {
    nome: "Juliana Lima",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 2, 3, 14, 10),
    dataCheckIn: null
  },
  {
    nome: "Rafael Santos",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 2, 3, 16, 30),
    dataCheckIn: new Date(2024, 1, 9, 14, 50)
  },
  {
    nome: "Fernanda Oliveira",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 2, 4, 8, 20),
    dataCheckIn: null
  },
  {
    nome: "Lucas Almeida",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 4, 9, 45),
    dataCheckIn: new Date(2024, 1, 11, 11, 15)
  },
  {
    nome: "Maria Costa",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 13, 55),
    dataCheckIn: new Date(2024, 1, 12, 15, 25)
  },
  {
    nome: "Pedro Oliveira",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 16, 10),
    dataCheckIn: new Date(2024, 1, 13, 18, 30)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  // condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      Confirmar check-in
    </button>
    `
  }
  
  return `
  <tr>
    <td>
      <strong>
          ${participante.nome}
        </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )
 
  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

participantes = [participante, ...participantes]
atualizarLista(participantes)

// limpar o formulario
event.target.querySelector('[name="nome"]').value = ""
event.target.querySelector('[name="email]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que quer fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}