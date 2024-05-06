interface IProps {
    imageURL: string;
    alt: string;
    className: string;
}

const Image = ({ imageURL: imgaeURL, alt, className }: IProps) => {
    return (
        <>
            <img src={imgaeURL} alt={alt} className={className} />
        </>
    )
}

export default Image;