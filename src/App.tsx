import { v4 as uuid } from "uuid";
import Card from './components/Card'
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Modal from './components/ui/Modal';
import { categories, colors, formInputsList, productList } from './data';
import { ChangeEvent, useState, FormEvent } from 'react';
import { IProduct } from './interfaces';
import { productValidation } from './validation';
import ErrorMsg from './components/ErrorMsg';
import CircleColor from './components/CircleColor';
import Select from './components/ui/Select';

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
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [tempColors, setTempColors] = useState<string[]>([]);

  // ** Handler **
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    })
  }
  const onCancel = (): void => {
    setProduct(defaultProductObj);
    closeModal();
  }
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;

    const errors = productValidation({
      title,
      description,
      price,
      imageURL,

    });

    const hasErrorMsg = Object.values(errors).every(value => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts(prev => [{
      ...product,
      id: uuid(),
      colors: tempColors,
      category: selectedCategory,
    }, ...prev]);

    setProduct(defaultProductObj);
    setTempColors([]);
    closeModal();
  };
  const [selectedCategory, setSelectedCategory] = useState(categories[0])


  // ** Render **
  const renderProductList = products.map(product => <Card key={product.id} product={product} />)
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
      <ErrorMsg msg={errors[input.name]} />
    </div>
  )
  const renderProductColors = colors.map(color => <CircleColor key={color} color={color}
    onClick={() => {
      if (tempColors.includes(color)) {
        setTempColors(prev => prev.filter(item => item !== color));
        return;
      }
      setTempColors(
        (prev) => [...prev, color]
      )
    }} />);

  // ** return **
  return (
    <main className='container'>
      <Button
        className='block bg-indigo-700 hover:bg-indigo-800 transition mx-auto my-10 px-10 font-medium'
        onClick={openModal}
        width='w-fit'
      >ADD Product

      </Button>
      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md' >
        {renderProductList}
      </div >

      <Modal isOpen={isOpen} closeModal={closeModal} title='ADD A NEW PRODUCT' >
        <form className='space-y-3' onSubmit={submitEditHandler} >
          {renderFormInputsList}
          <Select selected={selectedCategory} setSelected={setSelectedCategory}/>

          <div className='flex items-center my-4 space-x-1'>
            {renderProductColors}
          </div>
          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.map(color => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className='flex items-center space-x-3'>
            <Button className='bg-indigo-700 hover:bg-indigo-800 transition' onSubmit={submitEditHandler}>Submit</Button>
            <Button className='bg-gray-300 hover:bg-gray-400 transition' onClick={onCancel} >Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}


export default App;