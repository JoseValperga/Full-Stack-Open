sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server->>browser: HTTP status code 201 Created
    deactivate server
    
    
    Note: 
    browser: The form does not have action or method attributes.
             The event handler then creates a new note, adds it to the note list with the notes.push(note) command, re-renders the note list on the page, and sends the new note to the server.
             The data is sent to the server as JASON data.
             The Content-Type header of the request tells the server that the included data is represented in JSON format.



    
    