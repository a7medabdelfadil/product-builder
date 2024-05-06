import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
    product: IProduct;
    setProductToEdit: (product: IProduct) => void;
    openEditModal: () => void;
}

const Card = ({ product, setProductToEdit, openEditModal }: IProps) => {
    const { description, imageURL, price, title, colors, category } = product;

    // ** Handler **
    const onEdit = () => {
        setProductToEdit(product);
        openEditModal();
    };

    // ** Render **
    const renderProductColors = colors.map(color => <CircleColor key={color} color={color}/>)
    
    return (
        <>
            <div className='max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col' >
                <Image
                    imgaeURL={imageURL}
                    alt={title}
                    className="rounded-md h-52 w-full lg:object-cover" />
                <h1>{title}</h1>
                <p>{txtSlicer(description)}</p>
                <div className='flex items-center my-4 space-x-1'>
                    {renderProductColors}
                </div>
                <div className='flex items-center space justify-between'>
                    <span>${price}</span>
                    <Image
                        imgaeURL={category.imageURL}
                        alt={category.name}
                        className="w-10 h-10 rounded-full object-bottom" />
                </div>
                <div className='flex items-center space justify-between space-x-2 mt-5 transition'>
                    <Button className='bg-indigo-700 hover:bg-indigo-800 transition' onClick={onEdit} >Edit</Button>
                    <Button className='bg-red-700 hover:bg-red-800'>Delete</Button>
                </div>
            </div>
        </>
    )
}

export default Card;