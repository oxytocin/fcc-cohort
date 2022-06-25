import React from "react";
import {Deck} from "../types/BackendModels";

type deckId = number;

interface DeckList {
    decks: Map<deckId, Deck> | null,
    deckKeys: Array<number>,
    refresh: Function,
    chooseDeck: Function,
    updateSearchParams: Function
}

export const DeckList: React.FC<DeckList> = ({decks, deckKeys, refresh, chooseDeck, updateSearchParams}) => {
    const getDeckOutput = (decks: Map<deckId, Deck> | null, id: number): JSX.Element => {
        if (decks) {
            let deck = decks.get(id);
            if (deck) {
                return (
                    <div key={id}>
                        <button onClick={() => {
                            chooseDeck(deck);
                            updateSearchParams({"id": id});
                        }}>
                            {deck.ID} -- {deck.Description}
                        </button>
                    </div>
                )
            }
        }
        return <></>
    }

    let output: JSX.Element[] = [];

    if (decks != null) {
        deckKeys.map(id => {
            output.push(getDeckOutput(decks, id))
        })
    }
    return (
        <>
            <button onClick={() => refresh()}>REFRESH</button>
            <h2>Flashcard Questions</h2>
            <br/>
            {output}
        </>
    )
}
