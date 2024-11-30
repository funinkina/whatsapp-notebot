from fastapi import FastAPI, Request
import uvicorn

app = FastAPI()


@app.post("/receive-message")
async def receive_message(request: Request):
    """
    Endpoint to receive WhatsApp webhook messages
    """
    try:
        # Parse the incoming JSON payload
        body = await request.json()

        # Print the received message details
        print("\n--- New WhatsApp Message Received ---")
        print(f"Message: {body.get('message', 'No message content')}")
        print(f"Timestamp: {body.get('timestamp', 'No timestamp')}")
        print(f"Type: {body.get('type', 'Unknown type')}")
        print("------------------------------------\n")

        return {"status": "success"}
    except Exception as e:
        print(f"Error processing webhook: {e}")
        return {"status": "error", "message": str(e)}


def main():
    """
    Run the FastAPI server
    """
    uvicorn.run("app:app", host="0.0.0.0", port=8080, reload=True)


if __name__ == "__main__":
    main()
