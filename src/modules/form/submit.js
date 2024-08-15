import dayjs from "dayjs"
import { scheduleNew } from "../../service/schedule-new"
import { schedulesDay } from "../schedules/load"

// Elementos do form
const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Data atual
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e define a data minima como sendo a data atual
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  // Previne o comportamento padrão de recarregar a pagina
  event.preventDefault()

  try {
    // Recuperar o nome do cliente 
    const name = clientName.value

    if (!name) {
      return alert("Informe o nome do cliente")
    }


    // Recupera o horario selecionado
    const hourSelected = document.querySelector(".hour-selected")

    if (!hourSelected) {
      return alert("Selecione uma Hora")
    }

    // Recupera somente a hora 
    const [hour] = hourSelected.innerText.split(":")

    // Inserir a hora na data do input da data
    const when = dayjs(selectedDate.value).add(hour, "hour") 

    // Gerar um id
    const id = new Date().getTime()
    
    // Chama a função para agendar um corte
    await scheduleNew({ id, name, when })

    //Recarrgar os horarios e agendamentos 
    await schedulesDay()

    // Limpa o nome do input
    clientName.value = ""

  } catch (error) {
    alert("Não foi possivel agendar, tente novamente mais tarde")
    console.log(error);
  }
}