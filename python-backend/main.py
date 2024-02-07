from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import nltk
from nltk import ngrams

app = FastAPI()

origins = [
    "http://localhost:3000/new",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8000/getNgrams",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/submit-data")
async def submit_data(text: str = Form(...)):
    try:
        
        # Tokenize the text into words
        words = nltk.word_tokenize(text)

        # Generate bigrams using NLTK
        bigrams = list(ngrams(words, 2))

        # You can do further processing or comparisons with the generated ngrams here

        # Return a JSON response with the result
        return JSONResponse(content={'message': 'Ngrams comparison successful', 'data': bigrams}, status_code=200)

    except Exception as e:
        return JSONResponse(content={'error': str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
