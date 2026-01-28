const topBooks = [
    { "id": 1, "name": ""},
    { "id": 2, "name": "",},
];

const selectedBook = {
    "id": 3,
    "name": "",
};

const relatedBooks = [
    { "id": 4, "name": ""},
    { "id": 5, "name": ""},
];

export default function App() {
    // funkcija Book ID saglabāšanai stāvoklī
    function handleBookSelection(bookID) {
        alert("Izvēlēts ID " + bookID);
    }

    return (
        <>
            <Header />
            <main className="mb-8 px-2 md:container md:mx-auto">
                <Homepage handleBookSelection={handleBookSelection} />
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
    return (
        <>
            {topBooks.map((book, index) => (
                <TopBookView
                    book={book}
                    key={book.id}
                    index={index}
                    handleBookSelection={handleBookSelection}
                />
            ))}
        </>
    )
}

// Top grāmatas skats- attēlo sākumlapas grāmatas
function TopBookView({ book, index, handleBookSelection }) {
    return (
        <div className="bg-neutral-100 rounded-lg mb-8 py-8 flex flex-wrap md:flex-row">
            <div className=
                {`order-2 px-12 md:basis-1/2
                    ${ index % 2 === 1 ? "md:order-1 md:text-right" : ""}
                `}
            >
                <h2 className="mb-4 text-3xl leading-8 font-light text-neutral-900">
                    {book.name}
                </h2>
                <p className="mb-4 text-xl leading-7 font-light text-neutral-900 mb-4">
                    { book.description
                    ? (book.description.split(' ').slice(0, 16).join(' ')) + '...' : '' }
                </p>
                <SeeMoreBtn
                    bookID={book.id}
                    handleBookSelection={handleBookSelection}
                />
            </div>
            <div className={`order-1 md:basis-1/2 ${ index % 2 === 1 ? "md:order-2" : ""}`}>
                <img
                src={ book.image }
                alt={ book.name }
                className="p-1 rounded-md border border-neutral-200 w-2/4 aspect-auto
                mx-auto" />
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