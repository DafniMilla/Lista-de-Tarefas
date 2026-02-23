import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {

  const api = axios.create({
    baseURL: ""
  });

  const [lista, setLista] = useState([]);
  const [novoItem, setNovoItem] = useState("");
  const [editando, setEditando] = useState(null);

  useEffect(() => {

       carregar();


  },[]);

  async function carregar() {
    try{
      const response = await api.get("");
      setLista(response.data);
    }catch(error){
      console.log("erro ao carregar")
    }
   
  }

 
  return (
    <div className='container'>
      <h1 className='titulo'>Lista de tarefas</h1>
      <div className='inputBotao'>
        <input id='input' placeholder="Adicione uma tarefa" value={novoItem} onChange={value => setNovoItem(value.target.value)} type="text" />
        <button className='btn' onClick={() => adicionarItem()}>Adicionar </button>
      </div>
      <ul className='lista'>
        {lista.map((item, index) => (
          <li key={index} className='item'>
            {item}
            <button className='btnDelete' onClick={() => deletarItem(index)}>
              Deletar
            </button>
            <button className="btnEditar" onClick={() => editarItem(item, index)}>
              Editar
            </button>
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
    try{
      await api.post(" ",{
        descricao:novoItem
      });

      await carregar();
    }catch(error){
      console.log("sem api");
    }

      setLista([...lista, novoItem]);
      setEditando("");
  }


  async function deletarItem(index) {

    try{
      await api.delete(`   {index}`);

      await carregar();
    }catch(error){
      console.log("sem api");
    }
    let tmpArray = [...lista];
    tmpArray.splice(index, 1);

    setLista(tmpArray);
  }

  async function editarItem(item, index){
    try{
      await api.put(``,{
        descricao:novoItem
      });
    }catch(error){
      console.log("sem api")
    }
  }
}

export default App;
