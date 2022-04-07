
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const App =() => {
  const [tasks, setTasks] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)


  // useEffect(()=>{
  //   const getTasks = async ()=> {
  //     const tasksFromServer = await fetchTasks()
  //     setTasks(tasksFromServer)
  //   }
  //   getTasks()
  // }, [])

  //why not
  useEffect(() => {

    fetchTasks().then((data)=>{
      setTasks(data)});
  }, [])

  const fetchTasks = async () => {

    const res = await fetch ('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    // console.log("hello2")
    const res = await fetch (`http://localhost:5000/tasks/${id}`)

    const data = await res.json()
    return data
  }


 const onDelete = async (id)=>{
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })

  res.status ===200 ? setTasks(tasks.filter((task) => task.id !== id)) : alert('error deleting the task. id:'+ id)
  
     
  }


  const onAdd = async (task)=>{
    // const id = Math.floor(Math.random() *10000)+1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

  }

  const clickAddButton = ()=>{

    setShowAddForm( !showAddForm)
  }

  const toggleReminder = async (id)=> {
    console.log("hello1", id)
    const taskToToggle = await fetchTask(id)
    console.log("hello2", taskToToggle)
    const toggleTask = {...taskToToggle, reminder: !taskToToggle.reminder};
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(toggleTask),
    })
    const data =await res.json()
    console.log('hi', data)
    setTasks(tasks.map(task=> task.id ===id ? { ...task, reminder: data.reminder } : task));
  }

  return (
    <Router>
    <div className="container">
      <Header text = {showAddForm ? 'Close' : 'Add'} color = {showAddForm ? 'red' : 'green'}  clickAddButton ={()=>  setShowAddForm( !showAddForm) } />
      <Routes>
        <Route path ='/'
        element ={
          <>
          {showAddForm ? <AddTask onAdd={ onAdd}/> : <></>}
          <Tasks tasks = {tasks}
                 onDelete = {onDelete}
                 toggleReminder ={toggleReminder}/>
       
        </>
        }
        />

        <Route path='/about' element={<About />} />
        </Routes>
      <Footer />
    </div>
    </Router>
  )
}

export default App;
