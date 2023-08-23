import { Color, Mark } from "./enums";

export type Deck = NormalCard[]

export type NormalCard = {
    color: Color
    mark: Mark
}