import React from 'react'
import { Presentation } from './Presentation';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import { TimeCicle } from './TimeCicle';
import './App.css'

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el Curso de Introducción a React.js', completed: false },
//   { text: 'Llorar con la Llorona', completed: false },
//   { text: 'LALALALALA', completed: false },
//   { text: 'Usar estados derivados', completed: true }
// ];

// localStorage.setItem('TaskList', defaultTodos)

function App() {
  const startStatements = {
    Tutorial: true,
    TaskList: [],
    CatMissions: [],
    Gifts: [],
    Neighbors: []
  };

  const getStatements = (statement, defaultValue) => {
    const setStatement = localStorage.getItem(statement);
    return setStatement ? JSON.parse(setStatement) : defaultValue;
  };

  const setStatements = (statement, value) => {
    localStorage.setItem(statement, JSON.stringify(value));
  }

  const checkStatements = Object.entries(startStatements);

  React.useEffect(() => {
    checkStatements.forEach(([statement, defaultValue]) => {
      getStatements(statement, defaultValue);
      const value = localStorage.getItem(statement)
      if (value === null) {
        setStatements(statement, defaultValue);
      }
    });
  }, []);

  const [todos, setTodos] = React.useState(getStatements('TaskList', startStatements.TaskList));
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter(todo => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const saveTasks = newTodos => {
    localStorage.setItem('TaskList', JSON.stringify(newTodos));

    setTodos(newTodos)
  };

  const checkTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      todo => todo.text === text
    );
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTasks(newTodos);
  }

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      todo => todo.text === text
    );
    newTodos.splice(todoIndex, 1);
    saveTasks(newTodos);
  }

  return (
    <>
      <Presentation />
      <TodoCounter
        completed={completedTodos}
        total={totalTodos}
      />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchedTodos.map(({ text, completed }) => (
          <TodoItem
            key={text}
            text={text}
            completed={completed}
            onComplete={() => checkTodo(text)}
            onDelete={() => deleteTodo(text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
      <TimeCicle />
    </>
  );
}

export default App;
