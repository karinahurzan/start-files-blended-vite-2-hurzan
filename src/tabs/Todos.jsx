import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import TodoList from '../components/TodoList/TodoList';
import EditForm from '../components/EditForm/EditForm';
import { useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const Todos = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    const currentTasks = window.localStorage.getItem('tasks');
    if (currentTasks) {
      try {
        setTasks(JSON.parse(currentTasks));
      } catch (error) {
        console.error('Error parsing tasks from localStorage', error);
      }
    }
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const newTaskDescription = event.target.elements.search.value.trim();

    if (newTaskDescription == '') {
      toast.error('Please enter a task description!');
      return;
    }
    const newTask = {
      id: uuidv4(),
      text: newTaskDescription,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    window.localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    if (formRef.current) {
      formRef.current.reset();
    }
    toast.success('Task added successfully!');
  };

  const handleRemoveItem = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    window.localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const findTodo = text => {
    return tasks.some(task => task.text.toLowerCase() === text.toLowerCase());
  };

  const handleEditTodo = task => {
    setIsEditing(true);
    setCurrentTodo(task);
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setCurrentTodo({});
  };

  const updateTodo = newText => {
    if (findTodo(newText)) {
      toast.error('Task with this description already exists!');
      return;
    }

    const updatedTasks = tasks.map(task =>
      task.id === currentTodo.id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    window.localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setIsEditing(false);
    setCurrentTodo({});
    toast.success('Task updated successfully!');
  };

  return (
    <>
      {isEditing ? (
        <EditForm
          updateTodo={updateTodo}
          cancelUpdate={cancelUpdate}
          defaultValue={currentTodo.text}
        />
      ) : (
        <Form onSubmit={handleSubmit} ref={formRef} />
      )}{' '}
      {tasks.length === 0 ? (
        <Text textAlign="center">There are no any todos ...</Text>
      ) : (
        <TodoList
          tasks={tasks}
          handleEditTodo={handleEditTodo}
          handleRemoveItem={handleRemoveItem}
        />
      )}
      <Toaster reverseOrder={false} />
    </>
  );
};

export default Todos;
