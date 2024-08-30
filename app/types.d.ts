type City = {
    name: string
    lat: number
    lng: number
}

type Task = {
    name: string
    time: number
    attempts: number
}

type Progress = {
    level: number
    travel: Task
    task: Task
}

type Play = {
    name: string
    progress?: Progress[]
    start: number
    end: number
}

export {City, Task, Progress, Play}