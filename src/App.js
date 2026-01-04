import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import CompteList from "./components/CompteList";
import CreateCompte from "./components/CreateCompte";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./index.css";

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="min-h-screen py-8 px-4">
                {/* Header */}
                <div className="max-w-7xl mx-auto mb-12">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold gradient-text mb-4">
                            Gestion des Comptes Bancaires
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Application moderne de gestion de comptes et transactions avec React, GraphQL et Apollo Client
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Comptes */}
                        <div className="space-y-6">
                            <CreateCompte />
                            <CompteList />
                        </div>

                        {/* Right Column - Transactions */}
                        <div className="space-y-6">
                            <TransactionForm />
                            <TransactionList />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="max-w-7xl mx-auto mt-16 text-center">
                    <div className="glass rounded-2xl p-6">
                        <p className="text-gray-400">
                            TP 16 - Architecture des Composants d'Entreprise
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            React • GraphQL • Apollo Client • Tailwind CSS
                        </p>
                    </div>
                </footer>
            </div>
        </ApolloProvider>
    );
}

export default App;
