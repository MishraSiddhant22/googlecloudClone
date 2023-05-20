import { Server } from "socket.io";
import Connection from "./database/db.js";
import { getDocument, updateDocuments} from "./controller/document-controller.js";

const PORT = 9000;
const URL = process.env.MONGODB_URI || `mongodb://$usercode:$usercode@ac-kvlcdoq-shard-00-00.yhg2wav.mongodb.net:27017,ac-kvlcdoq-shard-00-01.yhg2wav.mongodb.net:27017,ac-kvlcdoq-shard-00-02.yhg2wav.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-55rz0o-shard-0&authSource=admin&retryWrites=true&w=majority`;

Connection(URL);
const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
   socket.on("get-document", async documentId => {
    
    const document= await getDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {                            //changes received from client
      socket.broadcast.to(documentId).emit("receive-changes", delta); //broadcasting changes to all the users
    });

    socket.on('save-document',async data=>{
        await updateDocuments(documentId,data);
    })
  });
});
