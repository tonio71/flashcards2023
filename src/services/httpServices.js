import axios from 'axios'

const axiosInstance = axios.create({
        //baseURL:'http://localhost:3001',
        baseURL:process.env.BACKEND_URL,
        timeout:10000
})

export async function getAllElements(url){
    const {data} = await axiosInstance.get(url)
    return data
} 

export async function deleteOne(url){
    await axiosInstance.delete(url)
} 

export async function create(url, flashcard){
    const {data} = await axiosInstance.post(url, flashcard)
    return data
}

export async function edit(url, flashcard){
    const {data} = await axiosInstance.put(url, flashcard)
    return data
}
