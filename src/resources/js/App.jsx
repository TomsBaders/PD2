import { useEffect, useState } from "react";

export default function App() {
    const [selectedBookID, setSelectedBookID] = useState(null);
    
    // funkcija Book ID saglabāšanai stāvoklī
    function handleBookSelection(bookID) {
        setSelectedBookID(bookID);
    }
    // funkcija grāmatas izvēles atcelšanai
    function handleGoingBack() {
        setSelectedBookID(null);
    }

    return (
        <>
            <Header />
            <main className="mb-8 px-2 md:container md:mx-auto">
                {
                    selectedBookID ? <BookPage selectedBookID={selectedBookID} handleBookSelection={handleBookSelection}
                    handleGoingBack={handleGoingBack}
                    />
                    : <Homepage handleBookSelection={handleBookSelection} />
                }
            </main>
            <Footer />
        </>
    )
}

// Galvene un kājene – strukturālas komponentes bez funkcijām vai datiem
function Header() {
    return (
        <header className="bg-green-500 mb-8 py-2 sticky top-0">
            <div className="px-2 py-2 font-serif text-green-50 text-xl leading-6
            md:container md:mx-auto">
                Grāmatas
            </div>
        </header>
    )
}

function Footer() {
    return (
        <footer className="bg-neutral-300 mt-8">
            <div className="py-8 md:container md:mx-auto px-2">
                Toms Bāders, VeA, 2026
            </div>
        </footer>
    )
}

// Sākumlapa- ielādē datus no API un attēlo top grāmatas
function Homepage({ handleBookSelection }) {
    const [topBooks, setTopBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(function () {
        async function fetchTopBooks() {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch('http://localhost/data/get-top-books');
                if (!response.ok) {
                    throw new Error("Datu ielādes kļūda. Lūdzu, pārlādējiet lapu!");
                }
                const data = await response.json();
                console.log('top books fetched', data);
                setTopBooks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTopBooks();
    }, []);
    return (
        <>
            {isLoading && <Loader />}
            {error && <ErrorMessage msg={error} />}
            {!isLoading && !error && (
                topBooks.map((book, index) => (
                    <TopBookView
                        book={book}
                        key={book.id}
                        index={index}
                        handleBookSelection={handleBookSelection}
                    />
                ))
            )}
        </>
    )
}

// Top grāmatas skats- attēlo sākumlapas grāmatas
function TopBookView({ book, index, handleBookSelection }) {
    return (
        <div className="bg-white rounded-xl mb-10 shadow-md border border-neutral-300 overflow-hidden flex flex-col md:flex-row">
            <div className=
                {`order-2 px-8 py-8 md:basis-1/2 flex flex-col justify-center
                    ${index % 2 === 1 ? "md:order-1 md:text-right" : ""}
                `}
            >
                <h2 className="mb-4 text-3xl leading-8 font-light text-neutral-900">
                    {book.name}
                </h2>
                <p className="mb-6 text-lg leading-7 font-light text-neutral-700">
                    { book.description
                    ? (book.description.split(' ').slice(0, 16).join(' ')) + '...' : '' }
                </p>
                <div className={index % 2 === 1 ? "md:self-end" : ""}>
                    <SeeMoreBtn
                        bookID={book.id}
                        handleBookSelection={handleBookSelection}
                    />
                </div>
            </div>
            <div className={`order-1 md:basis-1/2 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <img
                src={ book.image }
                alt={ book.name }
                className="w-full h-64 md:h-80 object-contain p-6" />
            </div>
        </div>
    )
}

// Poga “Rādīt vairāk”
function SeeMoreBtn({ bookID, handleBookSelection }) {
    return (
        <button
            className="inline-block rounded-full py-2 px-4 bg-sky-500 hover:bgsky-400 text-sky-50 cursor-pointer"
            onClick={() => handleBookSelection(bookID)}
        >Rādīt vairāk</button>
    )
}

// Poga “Uz sākumu”
function GoBackBtn({ handleGoingBack }) {
    return (
        <button
            className="inline-block rounded-full py-2 px-4 bg-neutral-500
            hover:bg-neutral-400 text-neutral-50 cursor-pointer"
            onClick={handleGoingBack}
        >Uz sākumu</button>
    )
}

// Grāmatas lapa – strukturāla komponente, kas satur grāmatas lapas daļas
function BookPage({ selectedBookID, handleBookSelection, handleGoingBack }) {
    return (
        <>
            <SelectedBookView
                selectedBookID={selectedBookID}
                handleGoingBack={handleGoingBack}
            />
            <RelatedBookSection
                selectedBookID={selectedBookID}
                handleBookSelection={handleBookSelection}
            />
        </>
    )
}

// Izvēlētās grāmatas skats- attēlo datus
function SelectedBookView({ selectedBookID, handleGoingBack }) {
    const [selectedBook, setSelectedBook] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchSelectedBook() {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch('http://localhost/data/get-book/' +
                selectedBookID);
                if (!response.ok) {
                    throw new Error("Datu ielādes kļūda. Lūdzu, pārlādējiet lapu!");
                }
                const data = await response.json();
                console.log('book ' + selectedBookID + ' fetched', data);
                setSelectedBook(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSelectedBook();
    }, [selectedBookID]);

    return (
        <>
            {isLoading && <Loader />}
            {error && <ErrorMessage msg={error} />}
            {!isLoading && !error && <>
                <div className="rounded-lg flex flex-wrap md:flex-row">
                    <div className="order-2 md:order-1 md:pt-12 md:basis-1/2">
                        <h1 className="text-3xl font-light text-neutral-900 mb-2">
                            {selectedBook.name}
                        </h1>
                        <p className="text-lg font-light text-neutral-700 mb-4">
                            {selectedBook.author}
                        </p>
                        <p className="text-base leading-7 text-neutral-800 mb-6">
                            {selectedBook.description}
                        </p>
                        <dl className="grid grid-cols-2 gap-y-2 text-sm">
                            <dt className="font-bold">
                                Izdošanas gads
                            </dt>
                            <dd>
                                {selectedBook.year}
                            </dd>
                            <dt className="font-bold">
                                Cena
                            </dt>
                            <dd>
                                &euro; {selectedBook.price}
                            </dd>
                            <dt className="font-bold">
                                Žanrs
                            </dt>
                            <dd>
                                {selectedBook.genre}
                            </dd>
                        </dl>
                    </div>
                    <div className="md:basis-1/3 flex justify-center items-center mt-6 md:mt-0">
                        <img
                            src={selectedBook.image}
                            alt={selectedBook.name}
                            className="max-h-80 object-contain rounded-lg border border-neutral-300"
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <GoBackBtn handleGoingBack={handleGoingBack} />
                </div>
            </>}
        </>
    )
}

// Līdzīgo grāmatu sadaļa
function RelatedBookSection({ selectedBookID, handleBookSelection }) {
    const [relatedBooks, setRelatedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRelatedBooks() {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(
                    'http://localhost/data/get-related-books/' + selectedBookID
                );
                if (!response.ok) {
                    throw new Error("Neizdevās ielādēt līdzīgās grāmatas");
                }
                const data = await response.json();
                setRelatedBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchRelatedBooks();
    }, [selectedBookID]);

    return (
        <>
            <div className="flex flex-wrap">
                <h2 className="text-3xl leading-8 font-light text-neutral-900 mb-4">
                    Līdzīgas grāmatas
                </h2>
            </div>
            {isLoading && <Loader />}
            {error && <ErrorMessage msg={error} />}
            <div className="flex flex-wrap md:flex-row md:space-x-4 md:flex-nowrap">
                {relatedBooks.map(book => (
                    <RelatedBookView
                        key={book.id}
                        book={book}
                        handleBookSelection={handleBookSelection}
                    />
                ))}
            </div>
        </>
    );
}

// Līdzīgās grāmatas skats
function RelatedBookView({ book, handleBookSelection }) {
    return (
        <div className="bg-white rounded-xl shadow-md border border-neutral-300 overflow-hidden md:basis-1/3 flex flex-col">
            <div className="h-56 flex items-center justify-center p-4">
                <img
                    src={book.image}
                    alt={book.name}
                    className="max-h-full object-contain"
                />
            </div>
            <div className="p-4 mt-auto flex items-center justify-between border-t border-neutral-200">
                <h3 className="text-lg font-light text-neutral-900 truncate">
                    { book.name }
                </h3>
                <SeeMoreBtn
                    bookID={book.id}
                    handleBookSelection={handleBookSelection}
                />
            </div>
        </div>
    )
}

// Ielādes indikators un kļūdas
function Loader() {
    return (
        <div className="my-12 px-2 md:container md:mx-auto text-center clear-both">
            <p>Loading</p>
        </div>
    )
}

function ErrorMessage({ msg }) {
    return (
        <div className="md:container md:mx-auto bg-red-300 my-8 p-2">
            <p className="text-black">{ msg }</p>
        </div>
    )
}
