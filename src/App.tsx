import Card from './components/Card'
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Modal from './components/ui/Modal';
import { formInputsList, productList } from './data';
import { ChangeEvent, useState, FormEvent } from 'react';
import { IProduct } from './interfaces';
import { productValidation } from './validation';

function App() {

  const defaultProductObj = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: '',
    }
  }

  // ** State **
  const [product, setProduct] = useState<IProduct>(defaultProductObj)
  const [isOpen, setIsOpen] = useState(false)


  // ** Handler **
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value
    })
    console.log(value)
  }
  const onCancel = ():void => {
    setProduct(defaultProductObj);
    closeModal();
  }
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = productToEdit;

    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });


  // ** Render **
  const renderProductList = productList.map(product => <Card key={product.id} product={product} />)
  const renderFormInputsList = formInputsList.map(input =>
    <div className='flex flex-col' key={input.id}>
      <label
        htmlFor={input.name}
        className='mb-[2px] text-sm font-medium text-gray-700'
      >
        {input.label}
      </label>
      <Input
        type='text'
        id={input.id}
        name={input.name}
        value={product[input.name]} onChange={onChangeHandler}
      />
    </div>
  )
  return (
    <main className='container'>
      <Button className='bg-indigo-700 hover:bg-indigo-800 transition' onClick={openModal}>Add</Button>
      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md' >
        {renderProductList}
      </div >

      <Modal isOpen={isOpen} closeModal={closeModal} title='ADD A NEW PRODUCT' >
        <form className='space-y-3' onSubmit={submitEditHandler} >
          {renderFormInputsList}
          <div className='flex items-center space-x-3'>
            <Button className='bg-indigo-700 hover:bg-indigo-800 transition'>Submit</Button>
            <Button className='bg-gray-300 hover:bg-gray-400 transition' onClick={onCancel} >Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}
}

export default App;