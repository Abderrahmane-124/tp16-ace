import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRANSACTIONS, GET_TRANSACTION_STATS } from "../graphql/queries";

const TransactionList = () => {
    const { loading, error, data, refetch } = useQuery(GET_ALL_TRANSACTIONS);
    const { data: statsData } = useQuery(GET_TRANSACTION_STATS);

    if (loading) {
        return (
            <div className="glass rounded-2xl p-8">
                <div className="flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-300 text-lg">Chargement des transactions...</span>
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
                    <svg className="w-7 h-7 mr-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Historique des Transactions
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

            {/* Statistics */}
            {statsData?.transactionStats && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">
                            {statsData.transactionStats.count}
                        </div>
                        <div className="text-gray-400 text-sm">Total</div>
                    </div>
                    <div className="bg-green-500/10 rounded-xl p-4 text-center border border-green-500/20">
                        <div className="text-2xl font-bold text-green-400">
                            +{parseFloat(statsData.transactionStats.sumDepots || 0).toLocaleString("fr-FR")} €
                        </div>
                        <div className="text-gray-400 text-sm">Dépôts</div>
                    </div>
                    <div className="bg-red-500/10 rounded-xl p-4 text-center border border-red-500/20">
                        <div className="text-2xl font-bold text-red-400">
                            -{parseFloat(statsData.transactionStats.sumRetraits || 0).toLocaleString("fr-FR")} €
                        </div>
                        <div className="text-gray-400 text-sm">Retraits</div>
                    </div>
                </div>
            )}

            {data?.allTransactions?.length === 0 ? (
                <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-400">Aucune transaction disponible</p>
                    <p className="text-gray-500 text-sm mt-1">Effectuez votre première transaction ci-dessus</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {data?.allTransactions?.map((transaction, index) => (
                        <div
                            key={transaction.id}
                            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-white/5 p-4 transition-all hover:border-white/10 animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${transaction.type === "DEPOT"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
                                            }`}
                                    >
                                        {transaction.type === "DEPOT" ? (
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">
                                            {transaction.type === "DEPOT" ? "Dépôt" : "Retrait"}
                                        </div>
                                        <div className="text-gray-400 text-sm flex items-center">
                                            <span className="mr-2">Compte #{transaction.compte?.id}</span>
                                            <span className="text-gray-600">•</span>
                                            <span className="ml-2">
                                                {new Date(transaction.date).toLocaleDateString("fr-FR", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`text-xl font-bold ${transaction.type === "DEPOT" ? "text-green-400" : "text-red-400"
                                        }`}
                                >
                                    {transaction.type === "DEPOT" ? "+" : "-"}
                                    {parseFloat(transaction.montant).toLocaleString("fr-FR")} €
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;
