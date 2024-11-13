import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const course = {
    name: "Half Stack Application Development",
    parts: [
      {
        title: "Fundamentals of React",
        exercises: 10
      },
      {
        title: "Using props to pass data",
        exercises: 7
      },
      {
        title: "State of a component",
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

function Header(course) {
  return (
    <h1>{course.name}</h1>
  )
}

function Content({ parts }) {
  return (
    <div>
      <Parts title={parts[0].title} exercise={parts[0].exercises} />
      <Parts title={parts[1].title} exercise={parts[1].exercises} />
      <Parts title={parts[2].title} exercise={parts[2].exercises} />
    </div>
  )
}

function Parts({ title, exercise }) {
  return (
    <p>{title} {exercise}</p>
  )
}

function Total({ parts }) {
  let total = 0;

  for (let i = 0; i < parts.length; i++) {
    total += parts[i].exercises;
  }

  return (
    <p>Number of exercises {total}</p>
  )
}

export default App
