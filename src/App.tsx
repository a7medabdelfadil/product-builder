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
import { TProductNames } from "./types";
import toast, { Toaster } from 'react-hot-toast';
import LandingPage from "./components/LandingPage/LandingPage";

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
  const [testColor, setTestColor] = useState(1);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditInx] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);


  // ** Handler **
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  const openEditModal = () => setIsOpenEditModal(true);
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
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    })
  }
  const onCancel = () => {
    setProduct(defaultProductObj);
    closeEditModal();
    closeModal();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;

    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    const hasErrorMsg =
      Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "") && !(tempColors.length === 0);
    if (hasErrorMsg === false) {
      setErrors(errors);
      setTestColor(0);
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
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = productToEdit;

    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    const hasErrorMsg =
      Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = { ...productToEdit, colors: tempColors.concat(productToEdit.colors) };
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditModal();

    toast("Product has been updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const removeProductHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };

  // ** Render **
  const renderProductList = products.map((product, idx) =>
    <Card key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      setProductToEditIdx={setProductToEditInx}
      idx={idx}
      openConfirmModal={openConfirmModal}

    />)
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
      if (productToEdit.colors.includes(color)) {
        setTempColors(prev => prev.filter(item => item !== color));
        return;
      }
      setTempColors(
        (prev) => [...prev, color]
      )
      setTestColor(1);
    }} />
  );
  const renderProductEditWithErrorMsg = (id: string, label: string, name: TProductNames) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-[2px] text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input type="text" id={id} name={name} value={productToEdit[name]} onChange={onChangeEditHandler} />
        <ErrorMsg msg={errors[name]} />
      </div>
    );
  };

  // ** return **

  return (
    <>
      <LandingPage />
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

        {/* Add Product Modal */}
        <Modal isOpen={isOpen} closeModal={closeModal} title='ADD A NEW PRODUCT' >
          <form className='space-y-3' onSubmit={submitHandler} >
            {renderFormInputsList}
            <Select selected={selectedCategory} setSelected={setSelectedCategory} />

            <div className='flex items-center my-4 space-x-1'>
              {renderProductColors}
            </div>
            {testColor ? "" : <ErrorMsg msg="You must choose color" />}
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


        {/* Edit Product Modal */}
        <Modal isOpen={isOpenEditModal} closeModal={closeEditModal} title="EDIT THIS PRODUCT">
          <form className="space-y-3" onSubmit={submitEditHandler}>
            {renderProductEditWithErrorMsg("title", "Product Title", "title")}
            {renderProductEditWithErrorMsg("description", "Product Description", "description")}
            {renderProductEditWithErrorMsg("imageURL", "Product Image URL", "imageURL")}
            {renderProductEditWithErrorMsg("price", "Product Price", "price")}

            <Select
              selected={productToEdit.category}
              setSelected={value => setProductToEdit({ ...productToEdit, category: value })}
            />

            <div className="flex items-center flex-wrap space-x-1">{renderProductColors}</div>
            <div className="flex items-center flex-wrap space-x-1">
              {tempColors.concat(productToEdit.colors).map(color => (
                <span
                  key={color}
                  className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
              <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
        {/* DELETE PRODUCT CONFIRM MODAL */}
        <Modal
          isOpen={isOpenConfirmModal}
          closeModal={closeConfirmModal}
          title="Are you sure you want to remove this Product from your Store?"
          description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
        >
          <div className="flex items-center space-x-3">
            <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
              Yes, remove
            </Button>
            <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
              Cancel
            </Button>
          </div>
        </Modal>
        <Toaster />
      </main>
    </>

  )
}


export default App;