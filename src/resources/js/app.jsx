// Galvene un kājene – strukturālas komponentes bez funkcijām vai datiem
function Header() {
    return (
        <header className="bg-green-500 mb-8 py-2 sticky top-0">
            <div className="px-2 py-2 font-serif text-green-50 text-xl leading-6
            md:container md:mx-auto">
                2. Praktiskais Darbs
            </div>
        </header>
    )
}

// Galvenā lietotnes komponente
export default function App() {
    return (
        <>
            <Header />
            <main className="mb-8 px-2 md:container md:mx-auto">
                <h1>Hello, World!</h1>
            </main>
            <Footer />
        </>
    )
}

function Footer() {
    return (
        <footer className="bg-neutral-300 mt-8">
            <div className="py-8 md:container md:mx-auto px-2">
                K. Immers, VeA, 2025
            </div>
        </footer>
    )
}
