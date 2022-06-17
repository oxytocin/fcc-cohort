import React from "react";
import {Deck} from "../types/BackendModels";

export const DeckList: React.FC<{ decks: Array<Deck> | null, refresh: Function }> = ({decks, refresh}) => (
    <>
        <button onClick={() => refresh()}>REFRESH</button>
        <h2>Flashcard Questions</h2>
        {decks?.map((value, index) => (
            <div key={value.ID}>
                {value.Description} - {value.ID} -- {index}
                <br/>
                {value.FlashCards?.map((card, idx) =>(
                    <div key="{card.ID}">
                        {card.Question}
                    </div>
                ))}
            </div>
        ))}
    </>
)