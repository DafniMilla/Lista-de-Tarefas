import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {

  const api = axios.create({
    baseURL: "http://localhost:8000"
  });

  const [lista, setLista] = useState([]);
  const [novoItem, setNovoItem] = useState("");
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const response = await api.get("/tarefas");
      console.log(response.data);
      setLista(response.data);
    } catch (error) {
      console.log("erro ao carregar")
    }
  }


  return (
    <div className='container'>
      <h1 className='titulo'>Lista de Tarefas</h1>
      <div className='inputBotao'>
        <input id='input' placeholder="Adicione uma tarefa" value={novoItem} onChange={value => setNovoItem(value.target.value)} type="text" />
        <button className='btn' onClick={() => {

          editando ? editarItem(editando)
            : adicionarItem()

        }}>
          {editando ? "Salvar" : "Adicionar"}
        </button>
      </div>
      <ul className='lista'>
        {lista.map((item, index) => (



         <li key={item.id} className='item'>

  <span>{item.texto}</span>

  <div className="acoes">

    <button
      className="btnEditar"
      onClick={()=>{
        setEditando(item.id);
        setNovoItem(item.texto);
      }}
    >
      Editar
    </button>

    <button
      className="btnDelete"
      onClick={()=>deletarItem(item.id)}
    >
      Deletar
    </button>

  </div>

</li>



        ))}
      </ul>
    </div>
  );

  async function adicionarItem() {
    if (novoItem.length <= 0) {
      alert("Digite algo no campo 'tarefa'")
      return;
    }
    try {
      await api.post("/tarefas", {
        texto: novoItem
      });

      setNovoItem("")
      await carregar();
    } catch (error) {
      console.log("sem api");
    }


  }


  async function deletarItem(id) {

    try {
      await api.delete(`/tarefas/${id}`);

      await carregar();
    } catch (error) {
      console.log("sem api");
    }

  }

  async function editarItem(id) {

    if (novoItem.length <= 0) {
      alert("Digite algo");
      return;
    }

    try {

      await api.patch(`/tarefas/${id}`, {
        texto: novoItem
      });

      setNovoItem("");
      setEditando(null);

      await carregar();

    } catch (error) {
      console.log("sem api")
    }
  }
}

export default App;
