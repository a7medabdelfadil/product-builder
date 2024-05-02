import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
    product: IProduct;
}

const Card = ({ product }: IProps) => {
    const { description, imageURL, price, title, category } = product;
    return (
        <>
            <div className='max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col' >
                <Image
                    imgaeURL={imageURL}
                    alt={title}
                    className="rounded-md h-52 w-full lg:object-cover" />
                <h1>{title}</h1>
                <p>{txtSlicer(description)}</p>
                <div className='flex items-center my-4 space-x-2'>
                    <span className='w-5 h-5 bg-indigo-600 rounded-full cursor-pointer' />
                    <span className='w-5 h-5 bg-yellow-600 rounded-full cursor-pointer' />
                    <span className='w-5 h-5 bg-red-600 rounded-full cursor-pointer' />
                </div>
                <div className='flex items-center space justify-between'>
                    <span>${price}</span>
                    <Image
                        imgaeURL={category.imageURL}
                        alt={category.name}
                        className="w-10 h-10 rounded-full object-bottom" />
                </div>
                <div className='flex items-center space justify-between space-x-2 mt-5 transition'>
                    <Button className='bg-indigo-700 hover:bg-indigo-800 transition'>Edit</Button>
                    <Button className='bg-red-700 hover:bg-red-800'>Delete</Button>
                </div>
            </div>
        </>
    )
}

export default Card;