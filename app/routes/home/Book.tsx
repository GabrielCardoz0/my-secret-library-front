import { Book } from "."

interface BookItemProps {
    book: Book;
}

export default function BookItem({ book }: BookItemProps) {
    
    return (
        <div className="flex justify-center">
            <div className="w-[160px] h-[230px]">
                <img src={book.img_url} alt="book" />
            </div>
        </div>
    )
}