import { Book } from ".";
import BookItem from "./Book";

interface BooksListProps {
    books: Book[];
}

export default function BooksList({ books }: BooksListProps) {
    return (
        <div className="w-full max-w-[1600px] h-[600px] grid grid-cols-6 grid-rows-2">
            {books.length === 0 ? <div>Não há nada por aqui</div> : books.map((book) => <BookItem key={book.id} book={book} />)}
        </div>
    );
}
