# from bot import chatbot
from pydantic import BaseModel
from fastapi import FastAPI, Form
from chatterbot import ChatBot
app = FastAPI()

# enabling cors 
from fastapi.middleware.cors import CORSMiddleware
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://uxairabbas.herokuapp.com",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chatbot = ChatBot("fypbotv4")   

class Data(BaseModel):
    message: str    
        
@app.post("/api/chatbot/")
async def root(query: Data):
    print(str(query.message))
    res = chatbot.get_response(str(query.message))
    return {"message": str(res)}