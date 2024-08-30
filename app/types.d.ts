import { Role } from './service/variables';

type Room = {
    id: string
    name: string
    created_at: number
}

type Member = {
    sid: string
    name: string
    role: Role
    score: number
    level: number
}

type Game = {
    room: Room
    members: Member[]
    started: boolean
};

export {Room, Role, Member, Game}