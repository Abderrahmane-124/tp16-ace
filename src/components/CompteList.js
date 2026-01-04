import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";
import { DELETE_COMPTE } from "../graphql/mutations";

const CompteList = () => {
    const { loading, error, data, refetch } = useQuery(GET_ALL_COMPTES);
    const [deleteCompte] = useMutation(DELETE_COMPTE);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
            try {
                await deleteCompte({ variables: { id } });
                refetch();
            } catch (err) {
                console.error("Erreur lors de la suppression :", err);
            }
        }
    };

    const getTypeColor = (type) => {
        return type === "COURANT"
            ? "from-cyan-500 to-blue-500"
            : "from-purple-500 to-pink-500";
    };

    const getTypeBadge = (type) => {
        return type === "COURANT"
            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
            : "bg-purple-500/20 text-purple-300 border-purple-500/30";
    };

    if (loading) {
        return (
            <div className="glass rounded-2xl p-8">
                <div className="flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-300 text-lg">Chargement des comptes...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass rounded-2xl p-8 border border-red-500/30">
                <div className="flex items-center space-x-3">
                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-400">Erreur : {error.message}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="glass rounded-2xl p-6 card-hover">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <svg className="w-7 h-7 mr-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Liste des Comptes
                </h2>
                <button
                    onClick={() => refetch()}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    title="Rafraîchir"
                >
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            {data?.allComptes?.length === 0 ? (
                <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <p className="text-gray-400">Aucun compte disponible</p>
                    <p className="text-gray-500 text-sm mt-1">Créez votre premier compte ci-dessus</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data?.allComptes?.map((compte, index) => (
                        <div
                            key={compte.id}
                            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-white/5 p-5 transition-all hover:border-white/10 animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${getTypeColor(compte.type)}`}></div>

                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <span className="text-gray-400 text-sm">#{compte.id}</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeBadge(compte.type)}`}>
                                            {compte.type}
                                        </span>
                                    </div>

                                    <div className="text-3xl font-bold text-white mb-2">
                                        {parseFloat(compte.solde).toLocaleString("fr-FR", {
                                            style: "currency",
                                            currency: "EUR",
                                        })}
                                    </div>

                                    <div className="flex items-center text-gray-400 text-sm">
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(compte.dateCreation).toLocaleDateString("fr-FR", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDelete(compte.id)}
                                    className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all group"
                                    title="Supprimer"
                                >
                                    <svg className="w-5 h-5 text-red-400 group-hover:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompteList;
