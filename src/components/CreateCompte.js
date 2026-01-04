import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_COMPTE } from "../graphql/mutations";
import { GET_ALL_COMPTES } from "../graphql/queries";
import { TypeCompte } from "../graphql/types";

const CreateCompte = () => {
    const [solde, setSolde] = useState("");
    const [type, setType] = useState(TypeCompte.COURANT);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [saveCompte] = useMutation(SAVE_COMPTE, {
        refetchQueries: [{ query: GET_ALL_COMPTES }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await saveCompte({
                variables: {
                    compte: {
                        solde: parseFloat(solde),
                        type,
                    },
                },
            });
            setSolde("");
            setType(TypeCompte.COURANT);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error("Erreur lors de la création du compte :", error);
            alert("Erreur lors de la création du compte : " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="glass rounded-2xl p-6 card-hover">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-7 h-7 mr-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Créer un Compte
            </h2>

            {showSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center animate-fade-in">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-400">Compte créé avec succès !</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                        Solde Initial
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">€</span>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={solde}
                            onChange={(e) => setSolde(e.target.value)}
                            required
                            placeholder="0.00"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                        Type de Compte
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setType(TypeCompte.COURANT)}
                            className={`p-4 rounded-xl border transition-all ${type === TypeCompte.COURANT
                                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                                    : "bg-gray-800/50 border-white/10 text-gray-400 hover:border-white/20"
                                }`}
                        >
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Courant
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setType(TypeCompte.EPARGNE)}
                            className={`p-4 rounded-xl border transition-all ${type === TypeCompte.EPARGNE
                                    ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                                    : "bg-gray-800/50 border-white/10 text-gray-400 hover:border-white/20"
                                }`}
                        >
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Épargne
                            </div>
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !solde}
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${isSubmitting || !solde
                            ? "bg-gray-700 cursor-not-allowed"
                            : "btn-gradient hover:shadow-lg"
                        }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Création en cours...
                        </span>
                    ) : (
                        "Créer le Compte"
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateCompte;
