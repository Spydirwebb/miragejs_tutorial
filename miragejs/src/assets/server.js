import {createServer, Model} from 'miragejs'

export function makeServer({environment='test'}={}) {
    let server = createServer({
        models: {
            notes: Model,
        },
        seeds(server) {
            server.create('note', {
                title: 'Nula sit amet',
                body: 'Body of note 1'
            })
            server.create('note', {
                title: 'Note 2',
                body: 'Body of note 2'
            }) 
            server.create('note', {
                title: 'Note 3',
                body: 'Body of note 3'
            }) 
        },
        routes() {
            this.namespace = 'api/notes';
            this.get('/', (schema, request) => {
              return schema.notes.all();
            });
            this.get('/:id', (schema, request) => {
              let id = request.params.id;
              return schema.notes.find(id);
            });
            this.post('/', (schema, request) => {
              let attrs = JSON.parse(request.requestBody);
              return schema.notes.create(attrs);
            });
            this.patch('/:id', (schema, request) => {
              let newAttrs = JSON.parse(request.requestBody);
              let id = request.params.id;
              let note = schema.notes.find(id);
              return note.update(newAttrs);
            });
            this.delete('/:id', (schema, request) => {
              let id = request.params.id;
              return schema.notes.find(id).destroy();
            });
          },
      
    })
    return server
}