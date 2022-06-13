export interface Deck {
    ID: number;
    OwnerId: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    Description: string;
    FlashCards?: Array<FlashCard>;
}

export interface FlashCard {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt?: string;
    Question: string;
    DeckId: number;
    Answers?: Array<Answer>
}

export interface Answer {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt?: string;
    name: string;
    value: string;
    isCorrect: boolean;
    flashCardId: number;
}
