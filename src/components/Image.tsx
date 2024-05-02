interface IProps {
    imgaeURL : string;
    alt: string;
    className: string;
}

const Image = ({imgaeURL, alt, className}: IProps) => {
    return (
        <>
            <img src={imgaeURL} alt={alt} className={className} />
        </>
    )
}

export default Image;