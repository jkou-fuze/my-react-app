

const Button = ({color, text, clickAddButton} )=> {
  return (
    <button style={{backgroundColor : color}} className='btn' onClick={clickAddButton} >
      {text}
    </button>
  )
}



export default Button
