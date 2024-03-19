import Button from "./components/button"

function App() {
return( 
  <div> 
<h1 className='text-red-400'>hello world</h1>
          <Button
            width='10rem'
            color="primary"
            label={'yes'}
            size="small"
            hasonclick={true}
            handleclick={() => console.log('yes')}
            customclassname="rounded-base"
          />
  </div>
)
}

export default App
