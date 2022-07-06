export interface Deck {
    ID: number;
    OwnerId: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string | null;
    Description: string;
    FlashCards: Array<FlashCard> | null;
}

export const copyDeck = (old: Deck): Deck => {
    return {
        ID: old.ID,
        OwnerId: old.OwnerId,
        CreatedAt: old.CreatedAt,
        UpdatedAt: old.CreatedAt,
        DeletedAt: old.DeletedAt,
        Description: old.Description,
        FlashCards: copyFlashcards(old.FlashCards),
    };
};

export const copyFlashcard = (old: FlashCard | null): FlashCard => {
    if (old === null || old === undefined) {
        return {
            ID: 0,
            Answers: [],
            CreatedAt: "",
            DeckId: 0,
            DeletedAt: undefined,
            Question: "",
            UpdatedAt: ""
        };
    }
    const newCard: FlashCard = {
        ID: old.ID,
        DeckId: old.DeckId,
        Question: old.Question,
        CreatedAt: old.CreatedAt,
        DeletedAt: old.DeletedAt,
        UpdatedAt: old.UpdatedAt,
        Answers: copyAnswers(old.Answers),
    }

    return newCard;
}


export const copyFlashcards = (old: Array<FlashCard> | null): Array<FlashCard> | null => {
    if (old == null) {
        return null;
    }
    const newCards: Array<FlashCard> = [];
    for (let i = 0; i < old.length; i++) {
        const temp = old[i];
        const newCard: FlashCard = {
            ID: temp.ID,
            DeckId: temp.DeckId,
            Question: temp.Question,
            CreatedAt: temp.CreatedAt,
            DeletedAt: temp.DeletedAt,
            UpdatedAt: temp.UpdatedAt,
            Answers: copyAnswers(temp.Answers),
        }
        newCards.push(newCard);
    }

    return newCards;
}

export const copyAnswers = (old: Array<Answer> | undefined): Array<Answer> => {
    if (old === null || old === undefined) {
        return [];
    }
    const newAnswers: Array<Answer> = [];
    for (let i = 0; i < old.length; i++) {
        const temp = old[i];
        const newAnswer: Answer = {
            ID: temp.ID,
            CreatedAt: temp.CreatedAt,
            UpdatedAt: temp.UpdatedAt,
            DeletedAt: temp.DeletedAt,
            name: temp.name,
            value: temp.value,
            isCorrect: temp.isCorrect,
            flashCardId: temp.flashCardId
        }
        newAnswers.push(newAnswer);
    }

    return newAnswers;
}

export interface FlashCard {
    ID: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string | null;
    Question: string;
    DeckId: number;
    Answers: Array<Answer>
}

export interface Answer {
    ID: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string | null;
    name: string;
    value: string;
    isCorrect: boolean;
    flashCardId: number;
}
