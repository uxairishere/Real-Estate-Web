from fastapi import FastAPI, Form
from pydantic import BaseModel
import pickle
import json
from sklearn.ensemble import RandomForestRegressor
import numpy as np
app = FastAPI()

# enabling cors 
from fastapi.middleware.cors import CORSMiddleware
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



    
def load_saved_model_items():
    print("Loading saved artifacts....start")
    global __data_columns
    global __locations
    global __model
    
    global __data_columns_islamabad
    global __locations_islamabad
    global __model_islamabad
    
    global __data_columns_rawalpindi
    global __locations_rawalpindi
    global __model_rawalpindi
    
    global __data_columns_faisalabad
    global __locations_faisalabad
    global __model_faisalabad


    # Karachi 
    with open('./karachi_location_json/data_column.json','r') as f:
        __data_columns = json.load(f)['data_columns']
       
        __locations = __data_columns[3:]

    with open('./karachi_location_json/karachi_home_prices_model.pickle','rb') as f:
        __model = pickle.load(f)
    print("loading model....lskdfdone")
    
    # Islamabad 
    with open('./Islamabad_model/data_column_islamabad.json','r') as f:
        __data_columns_islamabad = json.load(f)['data_columns']
       
        __locations_islamabad = __data_columns_islamabad[3:]

    with open('./Islamabad_model/decessiontreeregresser_islamabad.pickle','rb') as f:
       __model_islamabad = pickle.load(f)
    print("loading model....lskdfdone")
    
    # Rawalpindi 
    with open('./Rawalpindi_model/data_column_Rawalpindi.json','r') as f:
        __data_columns_rawalpindi = json.load(f)['data_columns']
       
        __locations_rawalpindi = __data_columns_rawalpindi[3:]

    with open('./Rawalpindi_model/decessiontreeregresser_Rawalpindi.pickle','rb') as f:
       __model_rawalpindi = pickle.load(f)
    print("loading model....lskdfdone")
    
    # Faisalabad 
    with open('./Faisalabad_model/data_column_Faisalabad.json','r') as f:
        __data_columns_faisalabad = json.load(f)['data_columns']
       
        __locations_faisalabad = __data_columns_faisalabad[3:]

    with open('./Faisalabad_model/decessiontreeregresser_Faisalabad.pickle','rb') as f:
       __model_faisalabad = pickle.load(f)
    print("loading model....lskdfdone")




def get_estimated_price(location, sqft, bedrooms, bath,data_column,model):
    try:
        loc_index = data_column.index(location)
        print(loc_index)
    except:
        loc_index=-1
        print("Could not find")

    x = np.zeros(len(data_column))
    x[0] = bath
    x[1] = sqft
    x[2] = bedrooms
    if loc_index >= 0:
        x[loc_index] = 1
    
    result = model.predict([x])[0]
    result_1 = result + (0.35 * result)
    return round(result_1 / 100000, 2)

load_saved_model_items()

class Msg(BaseModel):
    Location:str
    Total_sqr:float
    Bedroom:int
    Bath: int
    
class formdata(BaseModel):
    body: str

@app.post("/karachi")
async def root(Location: str = Form(), Total_sqr: str = Form(), Bedroom: str = Form(), Bath: str = Form()):
    print(Location + " " + Total_sqr)
    return {
        "Prediction": str(get_estimated_price(Location,Total_sqr,Bedroom,Bath,__data_columns,__model)),
        "status": "ok"
        }

# Islamabad 
@app.post("/islamabad")
async def root(Location: str = Form(), Total_sqr: str = Form(), Bedroom: str = Form(), Bath: str = Form()):
    print(Location + " " + Total_sqr)
    return {
        "status": "ok",
        "Prediction": str(get_estimated_price(Location,Total_sqr,Bedroom,Bath,__data_columns_islamabad,__model_islamabad))
        }

# Rawalpindi 
@app.post("/rawalpindi")
async def root(Location: str = Form(), Total_sqr: str = Form(), Bedroom: str = Form(), Bath: str = Form()):
    print(Location + " " + Total_sqr)
    return {
        "status": "ok",
        "Prediction": str(get_estimated_price(Location,Total_sqr,Bedroom,Bath,__data_columns_rawalpindi,__model_rawalpindi))
        }


# Faisalabad 
@app.post("/faisalabad")
async def root(Location: str = Form(), Total_sqr: str = Form(), Bedroom: str = Form(), Bath: str = Form()):
    print(Location + " " + Total_sqr)
    return {
        "status": "ok",
        "Prediction": str(get_estimated_price(Location,Total_sqr,Bedroom,Bath,__data_columns_faisalabad,__model_faisalabad))
        }
    
    