import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_COMPTES, GET_ALL_TRANSACTIONS } from "../graphql/queries";
import { ADD_TRANSACTION } from "../graphql/mutations";
import { TypeTransaction } from "../graphql/types";

const TransactionForm = () => {
    const [compteId, setCompteId] = useState("");
    const [montant, setMontant] = useState("");
    const [type, setType] = useState(TypeTransaction.DEPOT);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const { data: comptesData } = useQuery(GET_ALL_COMPTES);
    const [addTransaction] = useMutation(ADD_TRANSACTION, {
        refetchQueries: [{ query: GET_ALL_TRANSACTIONS }, { query: GET_ALL_COMPTES }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addTransaction({
                variables: {
                    transactionRequest: {
                        compteId,
                        montant: parseFloat(montant),
                        type,
                    },
                },
            });
            setMontant("");
            setCompteId("");
            setType(TypeTransaction.DEPOT);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la transaction :", error);
            alert("Erreur : " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="glass rounded-2xl p-6 card-hover">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-7 h-7 mr-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Nouvelle Transaction
            </h2>

            {showSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center animate-fade-in">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-400">Transaction effectuée avec succès !</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                        Compte
                    </label>
                    <select
                        value={compteId}
                        onChange={(e) => setCompteId(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer"
                    >
                        <option value="">Sélectionnez un compte</option>
                        {comptesData?.allComptes?.map((compte) => (
                            <option key={compte.id} value={compte.id}>
                                #{compte.id} - {compte.type} ({parseFloat(compte.solde).toLocaleString("fr-FR")} €)
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                        Type de Transaction
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setType(TypeTransaction.DEPOT)}
                            className={`p-4 rounded-xl border transition-all ${type === TypeTransaction.DEPOT
                                    ? "bg-green-500/20 border-green-500/50 text-green-300"
                                    : "bg-gray-800/50 border-white/10 text-gray-400 hover:border-white/20"
                                }`}
                        >
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Dépôt
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setType(TypeTransaction.RETRAIT)}
                            className={`p-4 rounded-xl border transition-all ${type === TypeTransaction.RETRAIT
                                    ? "bg-red-500/20 border-red-500/50 text-red-300"
                                    : "bg-gray-800/50 border-white/10 text-gray-400 hover:border-white/20"
                                }`}
                        >
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                                Retrait
                            </div>
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                        Montant
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">€</span>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={montant}
                            onChange={(e) => setMontant(e.target.value)}
                            required
                            placeholder="0.00"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !compteId || !montant}
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${isSubmitting || !compteId || !montant
                            ? "bg-gray-700 cursor-not-allowed"
                            : type === TypeTransaction.DEPOT
                                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:shadow-green-500/25"
                                : "bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-lg hover:shadow-red-500/25"
                        }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Traitement en cours...
                        </span>
                    ) : (
                        `Effectuer le ${type === TypeTransaction.DEPOT ? "Dépôt" : "Retrait"}`
                    )}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
