export interface Deck {
    ID: number;
    OwnerId: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string|null;
    Description: string;
    FlashCards: Array<FlashCard>|null;
}

export interface FlashCard {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt?: string|null;
    Question: string;
    DeckId: number;
    Answers?: Array<Answer>
}

export interface Answer {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt?: string|null;
    name: string;
    value: string;
    isCorrect: boolean;
    flashCardId: number;
}
